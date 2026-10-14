import { pool } from "../config/db.js";
import { razorpay } from "../config/razorpay.js";

export const createOrderFromCart = async (userId: string) => {
  const client = await pool.connect();

  try {
    // ==========================================
    // START TRANSACTION
    // ==========================================

    await client.query("BEGIN");

    // ==========================================
    // GET USER'S CART
    // ==========================================

    const cartResult = await client.query(
      `
                    SELECT id
                    FROM carts
                    WHERE user_id = $1
                    `,

      [userId],
    );

    if (cartResult.rows.length === 0) {
      throw new Error("Cart not found");
    }

    const cartId = cartResult.rows[0].id;

    // ==========================================
    // GET CART ITEMS + PRODUCT INFORMATION
    // ==========================================

    const itemsResult = await client.query(
      `
                    SELECT
                        ci.product_id,
                        ci.quantity,
                        p.name,
                        p.price,
                        p.stock

                    FROM cart_items ci

                    INNER JOIN products p
                        ON p.id = ci.product_id

                    WHERE ci.cart_id = $1

                    FOR UPDATE OF p
                    `,

      [cartId],
    );

    const items = itemsResult.rows;

    // ==========================================
    // CHECK EMPTY CART
    // ==========================================

    if (items.length === 0) {
      throw new Error("Cart is empty");
    }

    // ==========================================
    // VALIDATE STOCK + CALCULATE TOTAL
    // ==========================================

    let totalAmount = 0;

    for (const item of items) {
      if (item.quantity > item.stock) {
        throw new Error(
          `Insufficient stock for ${item.name}. ` +
            `Available: ${item.stock}, ` +
            `Requested: ${item.quantity}`,
        );
      }

      const price = Number(item.price);

      const quantity = Number(item.quantity);

      const subtotal = price * quantity;

      totalAmount += subtotal;
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const orderResult = await client.query(
      `
                    INSERT INTO orders (
                        user_id,
                        total_amount,
                        status,
                        payment_status
                    )

                    VALUES (
                        $1,
                        $2,
                        'Pending',
                        'Pending'
                    )

                    RETURNING
                        id,
                        user_id,
                        total_amount,
                        status,
                        payment_status,
                        created_at,
                        updated_at
                    `,

      [userId, totalAmount],
    );

    const order = orderResult.rows[0];

    // ==========================================
    // CREATE ORDER ITEMS
    // ==========================================

    for (const item of items) {
      const price = Number(item.price);

      const quantity = Number(item.quantity);

      const subtotal = price * quantity;

      await client.query(
        `
                    INSERT INTO order_items (
                        order_id,
                        product_id,
                        product_name,
                        price,
                        quantity,
                        subtotal
                    )

                    VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6
                    )
                    `,

        [order.id, item.product_id, item.name, price, quantity, subtotal],
      );
    }

    // ==========================================
    // REDUCE PRODUCT STOCK
    // ==========================================

    for (const item of items) {
      await client.query(
        `
                    UPDATE products

                    SET
                        stock = stock - $1,
                        updated_at = NOW()

                    WHERE id = $2
                    AND stock >= $1
                    `,

        [item.quantity, item.product_id],
      );
    }

    // ==========================================
    // CLEAR CART
    // ==========================================

    await client.query(
      `
                DELETE FROM cart_items
                WHERE cart_id = $1
                `,

      [cartId],
    );

    // ==========================================
    // COMMIT TRANSACTION
    // ==========================================

    await client.query("COMMIT");

    return order;
  } catch (error) {
    // ==========================================
    // ROLLBACK
    // ==========================================

    await client.query("ROLLBACK");

    throw error;
  } finally {
    // ==========================================
    // RELEASE CONNECTION
    // ==========================================

    client.release();
  }
};

export const getOrdersByUser = async (userId: string) => {
  const ordersResult = await pool.query(
    `
                SELECT
                    id,
                    user_id,
                    total_amount,
                    status,
                    payment_status,
                    razorpay_order_id,
                    razorpay_payment_id,
                    created_at,
                    updated_at

                FROM orders

                WHERE user_id = $1

                ORDER BY created_at DESC
                `,

    [userId],
  );

  const orders = ordersResult.rows;

  for (const order of orders) {
    const itemsResult = await pool.query(
      `
                    SELECT
                        id,
                        product_id,
                        product_name,
                        price,
                        quantity,
                        subtotal,
                        created_at

                    FROM order_items

                    WHERE order_id = $1

                    ORDER BY created_at ASC
                    `,

      [order.id],
    );

    order.items = itemsResult.rows;
  }

  return orders;
};

export const getOrderById = async (userId: string, orderId: string) => {
  // ==========================================
  // GET ORDER
  // ==========================================

  const orderResult = await pool.query(
    `
                SELECT
                    id,
                    user_id,
                    total_amount,
                    status,
                    payment_status,
                    razorpay_order_id,
                    razorpay_payment_id,
                    created_at,
                    updated_at

                FROM orders

                WHERE
                    id = $1
                    AND user_id = $2
                `,

    [orderId, userId],
  );

  if (orderResult.rows.length === 0) {
    return null;
  }

  const order = orderResult.rows[0];

  // ==========================================
  // GET ORDER ITEMS
  // ==========================================

  const itemsResult = await pool.query(
    `
                SELECT
                    id,
                    product_id,
                    product_name,
                    price,
                    quantity,
                    subtotal,
                    created_at

                FROM order_items

                WHERE order_id = $1

                ORDER BY created_at ASC
                `,

    [orderId],
  );

  order.items = itemsResult.rows;

  return order;
};

export const getAllOrders = async () => {
  const ordersResult = await pool.query(
    `
                SELECT
                    o.id,
                    o.user_id,
                    u.name AS user_name,
                    u.email AS user_email,
                    o.total_amount,
                    o.status,
                    o.payment_status,
                    o.razorpay_order_id,
                    o.razorpay_payment_id,
                    o.created_at,
                    o.updated_at

                FROM orders o

                INNER JOIN users u
                    ON u.id = o.user_id

                ORDER BY o.created_at DESC
                `,
  );

  const orders = ordersResult.rows;

  for (const order of orders) {
    const itemsResult = await pool.query(
      `
                    SELECT
                        id,
                        product_id,
                        product_name,
                        price,
                        quantity,
                        subtotal,
                        created_at

                    FROM order_items

                    WHERE order_id = $1

                    ORDER BY created_at ASC
                    `,

      [order.id],
    );

    order.items = itemsResult.rows;
  }

  return orders;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const result = await pool.query(
    `
                UPDATE orders

                SET
                    status = $1,
                    updated_at = NOW()

                WHERE id = $2

                RETURNING
                    id,
                    user_id,
                    total_amount,
                    status,
                    payment_status,
                    razorpay_order_id,
                    razorpay_payment_id,
                    created_at,
                    updated_at
                `,

    [status, orderId],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

export const createRazorpayOrder = async (orderId: string, userId: string) => {
  const result = await pool.query(
    `
                SELECT
                    id,
                    total_amount,
                    razorpay_order_id

                FROM orders

                WHERE
                    id = $1
                    AND user_id = $2
                `,

    [orderId, userId],
  );

  if (result.rows.length === 0) {
    return null;
  }

  const order = result.rows[0];

  // Already created?

  if (order.razorpay_order_id) {
    return order;
  }

  // Razorpay expects amount
  // in the smallest currency unit.
  //
  // ₹139998.00
  // becomes
  // 13999800 paise

  const amount = Math.round(Number(order.total_amount) * 100);

  const razorpayOrder = await razorpay.orders.create({
    amount,

    currency: "INR",

    receipt: order.id,

    notes: {
      userId,

      orderId,
    },
  });

  const updateResult = await pool.query(
    `
                UPDATE orders

                SET
                    razorpay_order_id = $1,
                    updated_at = NOW()

                WHERE id = $2

                RETURNING
                    id,
                    total_amount,
                    razorpay_order_id
                `,

    [razorpayOrder.id, order.id],
  );

  return updateResult.rows[0];
};

// =====================================================
// CREATE PENDING ORDER FROM LOCAL CART
// =====================================================

export const createPendingOrderFromLocalCart = async (
  userId: string,
  items: { productId: string; quantity: number }[],
) => {
  if (!items || items.length === 0) throw new Error("Cart is empty");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const productIds = items.map((item) => item.productId);

    const result = await client.query(
      `
SELECT id,name,price,stock,is_active
FROM products
WHERE id=ANY($1::uuid[])
`,
      [productIds],
    );

    if (result.rows.length !== items.length) {
      throw new Error("One or more products are no longer available");
    }

    let totalAmount = 0;
    const orderItems: {
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      subtotal: number;
    }[] = [];

    for (const item of items) {
      const product = result.rows.find((row) => row.id === item.productId);

      if (!product) throw new Error("Product not found");
      if (!product.is_active)
        throw new Error(`${product.name} is no longer available`);
      if (!Number.isInteger(item.quantity) || item.quantity <= 0)
        throw new Error(`Invalid quantity for ${product.name}`);
      if (item.quantity > product.stock)
        throw new Error(`Insufficient stock for ${product.name}`);

      const price = Number(product.price);
      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        price,
        quantity: item.quantity,
        subtotal,
      });
    }

    // 👇 ADD DEBUG LOGS HERE

console.log("===== ORDER DEBUG =====");
console.log("User ID:", userId);
console.log("Items received:", items);
console.log("Calculated totalAmount:", totalAmount);
console.log("======================");

    const orderResult = await client.query(
      `
INSERT INTO orders(user_id,total_amount,status,payment_status)
VALUES($1,$2,'Pending','Pending')
RETURNING id,user_id,total_amount,status,payment_status,created_at
`,
      [userId, totalAmount],
    );

    const order = orderResult.rows[0];

    for (const item of orderItems) {
      await client.query(
        `
INSERT INTO order_items(order_id,product_id,product_name,price,quantity,subtotal)
VALUES($1,$2,$3,$4,$5,$6)
`,
        [
          order.id,
          item.productId,
          item.productName,
          item.price,
          item.quantity,
          item.subtotal,
        ],
      );
    }

   await client.query("COMMIT");

let razorpayOrder;

try {
  console.log("===== RAZORPAY DEBUG =====");
  console.log("Database order ID:", order.id);
  console.log("Total in rupees:", totalAmount);
  console.log(
    "Amount sent to Razorpay:",
    Math.round(totalAmount * 100),
  );
  console.log("==========================");

  razorpayOrder = await razorpay.orders.create({
    amount: Math.round(totalAmount * 100),
    currency: "INR",
    receipt: order.id,
    notes: {
      userId,
      orderId: order.id,
    },
  });
} catch (razorpayError) {
  console.error(
    "Razorpay order creation failed:",
    razorpayError,
  );

  // Razorpay rejected the payment order.
  // Mark our database order as failed/cancelled.
  await pool.query(
    `
    UPDATE orders
    SET
      status = 'Cancelled',
      payment_status = 'Failed',
      updated_at = NOW()
    WHERE id = $1
    `,
    [order.id],
  );

  throw new Error(
    "Payment could not be started. Please check the order amount and try again.",
  );
}

const updatedOrderResult = await pool.query(
  `
  UPDATE orders
  SET
    razorpay_order_id = $1,
    updated_at = NOW()
  WHERE id = $2
  RETURNING
    id,
    user_id,
    total_amount,
    status,
    payment_status,
    razorpay_order_id,
    created_at,
    updated_at
  `,
  [razorpayOrder.id, order.id],
);

    return {
      order: updatedOrderResult.rows[0],
      razorpayOrder,
    };
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {}
    throw error;
  } finally {
    client.release();
  }
};


export const createOrderFromItems = async (
  userId: string,
  items: { productId: string; quantity: number }[],
) => {
  if (!items.length) throw new Error("Cart is empty");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    let total = 0;
    const orderItems: {
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      subtotal: number;
    }[] = [];
    for (const item of items) {
      const result = await client.query(
        `SELECT id,name,price,stock FROM products WHERE id=$1 AND is_active=true`,
        [item.productId],
      );
      if (!result.rows.length) throw new Error("Product not found");
      const product = result.rows[0];
      if (product.stock < item.quantity)
        throw new Error(`Insufficient stock for ${product.name}`);
      const subtotal = Number(product.price) * item.quantity;
      total += subtotal;
      orderItems.push({
        productId: product.id,
        productName: product.name,
        price: Number(product.price),
        quantity: item.quantity,
        subtotal,
      });
    }
    const orderResult = await client.query(
      `INSERT INTO orders(user_id,total_amount) VALUES($1,$2) RETURNING *`,
      [userId, total],
    );
    const order = orderResult.rows[0];
    for (const item of orderItems) {
      await client.query(
        `INSERT INTO order_items(order_id,product_id,product_name,price,quantity,subtotal) VALUES($1,$2,$3,$4,$5,$6)`,
        [
          order.id,
          item.productId,
          item.productName,
          item.price,
          item.quantity,
          item.subtotal,
        ],
      );
    }
    await client.query("COMMIT");
    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
