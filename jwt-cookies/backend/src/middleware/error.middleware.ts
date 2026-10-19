
import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error & { statusCode?: number },
  _req,
  res,
  _next,
): void => {
  const statusCode =
    typeof err.statusCode === "number" &&
    err.statusCode >= 400 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};
