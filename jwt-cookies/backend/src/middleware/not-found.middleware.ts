
import type { RequestHandler } from "express";

export const notFoundMiddleware: RequestHandler = (
  req,
  res,
  _next,
): void => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
