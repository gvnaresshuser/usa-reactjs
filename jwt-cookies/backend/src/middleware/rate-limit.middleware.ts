
import rateLimit from "express-rate-limit";
//npm install express-rate-limit

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  //limit: 100, // Maximum 100 requests per IP per window
  limit: 10, // Maximum 100 requests per IP per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10, // Maximum 10 login attempts per IP per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});
