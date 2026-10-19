
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { pool } from "./db/pool.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";

import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import {
  apiLimiter,
  loginLimiter,
} from "./middleware/rate-limit.middleware.js";

const app = express();

// Security Middleware
app.use(helmet());

// CORS
/* app.use(
  cors({
    origin: env.corsOrigin,
    credentials: env.corsCredentials,
  }),
); */
app.use(corsMiddleware);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// General API rate limit
app.use("/api", apiLimiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Health Check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "JWT Cookies API is running",
  });
});

app.get("/api/health/db", async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time",
    );

    res.status(200).json({
      success: true,
      message: "PostgreSQL connection successful",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Not-found Middleware: after all routes
app.use(notFoundMiddleware);

// Error Middleware: always last
app.use(errorMiddleware);

export default app;
/*
Keep the order as follows:
1. helmet()
2. corsMiddleware
3. Body parsers
4. cookieParser()
5. API routes and health checks
6. notFoundMiddleware
7. errorMiddleware
*/