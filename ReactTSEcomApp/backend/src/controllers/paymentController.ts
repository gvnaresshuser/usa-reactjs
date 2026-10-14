import { Request, Response } from "express";

import crypto from "crypto";

import { pool } from "../config/db.js";

import { env } from "../config/env.js";

/* import {
    createRazorpayOrder
} from "../models/orderModel.js"; */
import { createPendingOrderFromLocalCart } from "../models/orderModel.js";

import { AuthRequest } from "../middleware/authMiddleware.js";

export const createPaymentOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required",
      });
    }

    const result = await createPendingOrderFromLocalCart(userId, items);

    return res.status(201).json({
      success: true,
      message: "Payment order created successfully",
      order: result.order,
      razorpayOrder: result.razorpayOrder,
    });
  } catch (error) {
    console.error("Create payment order error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create payment order";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response) => {
  const client = await pool.connect();

  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    if (
      !orderId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are required",
      });
    }

    /*
     * 1. Find the order
     */

    const orderResult = await pool.query(
      `
      SELECT
        id,
        user_id,
        razorpay_order_id,
        payment_status,
        status

      FROM orders

      WHERE
        id = $1
        AND user_id = $2
      `,
      [orderId, userId],
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const order = orderResult.rows[0];

    /*
     * 2. Prevent duplicate verification
     */

    if (order.payment_status === "Paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    /*
     * 3. Make sure Razorpay order IDs match
     */

    if (order.razorpay_order_id !== razorpayOrderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay order",
      });
    }

    /*
     * 4. Create expected Razorpay signature
     */

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature = crypto
      .createHmac("sha256", env.razorpayKeySecret)
      .update(body)
      .digest("hex");

    /*
     * 5. Compare signatures safely
     */

    const expectedBuffer = Buffer.from(expectedSignature);
    const receivedBuffer = Buffer.from(razorpaySignature);

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    /*
     * 6. Start database transaction
     */

    await client.query("BEGIN");

    /*
     * 7. Lock the order
     *
     * This prevents two requests from processing
     * the same order simultaneously.
     */

    const lockedOrderResult = await client.query(
      `
      SELECT
        id,
        payment_status,
        status

      FROM orders

      WHERE
        id = $1
        AND user_id = $2

      FOR UPDATE
      `,
      [orderId, userId],
    );

    if (lockedOrderResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const lockedOrder = lockedOrderResult.rows[0];

    /*
     * 8. Double-check payment status
     */

    if (lockedOrder.payment_status === "Paid") {
      await client.query("ROLLBACK");

      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    /*
     * 9. Get order items
     */

    const orderItemsResult = await client.query(
      `
      SELECT
        product_id,
        quantity

      FROM order_items

      WHERE order_id = $1
      `,
      [orderId],
    );

    if (orderItemsResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Order has no items",
      });
    }

    /*
     * 10. Check and reduce stock
     */

    for (const item of orderItemsResult.rows) {
      const stockResult = await client.query(
        `
        SELECT
          id,
          name,
          stock

        FROM products

        WHERE id = $1

        FOR UPDATE
        `,
        [item.product_id],
      );

      if (stockResult.rows.length === 0) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          success: false,
          message: "Product no longer exists",
        });
      }

      const product = stockResult.rows[0];

      if (product.stock < item.quantity) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      await client.query(
        `
        UPDATE products

        SET stock = stock - $1

        WHERE id = $2
        `,
        [item.quantity, item.product_id],
      );
    }

    /*
     * 11. Mark order as Confirmed + Paid
     */

    const updateResult = await client.query(
      `
      UPDATE orders

      SET
        status = 'Confirmed',
        payment_status = 'Paid',
        razorpay_payment_id = $1,
        razorpay_signature = $2,
        updated_at = NOW()

      WHERE
        id = $3

      RETURNING
        id,
        total_amount,
        status,
        payment_status,
        razorpay_order_id,
        razorpay_payment_id,
        created_at,
        updated_at
      `,
      [
        razorpayPaymentId,
        razorpaySignature,
        orderId,
      ],
    );

    /*
     * 12. Commit everything together
     */

    await client.query("COMMIT");

    /*
     * 13. Send success response
     */

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: updateResult.rows[0],
    });

  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {}

    console.error("Payment verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });

  } finally {
    client.release();
  }
};
