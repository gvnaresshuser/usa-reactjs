import { Router } from "express";

import {
  adminOnly,
  login,
  logout,
  me,
  refresh,
  register,
} from "../controllers/auth.controller.js";

import { validate } from "../middleware/validate.middleware.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator.js";
import { loginLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();


router.post(
  "/register",
  validate(registerSchema),
  register,
);

/* router.post(
  "/login",
  validate(loginSchema),
  login,
); */
router.post("/login", loginLimiter, validate(loginSchema), login);

router.post(
  "/refresh",
  refresh,
);

router.post(
  "/logout",
  logout,
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  adminOnly,
);

router.get(
  "/me",
  authenticate,
  me,
);
export default router;