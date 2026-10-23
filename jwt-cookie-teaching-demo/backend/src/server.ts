
import "dotenv/config";

import express, {
  type Request,
  type Response,
  type NextFunction,
  type CookieOptions,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { createHash } from "node:crypto";
import { Pool } from "pg";

// --------------------------------------------------
// 1. ENVIRONMENT CONFIGURATION
// --------------------------------------------------

const required = (name: string): string => {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
};

const PORT = Number(process.env.PORT || 5000);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT must be a valid port number");
}

const DATABASE_URL = required("DATABASE_URL");

const ACCESS_SECRET = required("JWT_ACCESS_SECRET");
const REFRESH_SECRET = required("JWT_REFRESH_SECRET");

if (
  ACCESS_SECRET === REFRESH_SECRET ||
  ACCESS_SECRET.length < 32 ||
  REFRESH_SECRET.length < 32
) {
  throw new Error(
    "Use two different JWT secrets, each at least 32 characters long"
  );
}

const ACCESS_EXPIRES =
  process.env.JWT_ACCESS_EXPIRES_IN || "10s";

const REFRESH_EXPIRES =
  process.env.JWT_REFRESH_EXPIRES_IN || "20s";

const CORS_ORIGIN =
  process.env.CORS_ORIGIN || "http://localhost:5173";

const isProduction = process.env.NODE_ENV === "production";

// --------------------------------------------------
// 2. COOKIE CONFIGURATION
// --------------------------------------------------

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

const readBoolean = (
  name: string,
  defaultValue: boolean
): boolean => {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  if (value === "true") return true;
  if (value === "false") return false;

  throw new Error(`${name} must be true or false`);
};

const COOKIE_HTTP_ONLY = readBoolean(
  "COOKIE_HTTP_ONLY",
  true
);

const COOKIE_SECURE = readBoolean(
  "COOKIE_SECURE",
  isProduction
);

const sameSiteValue = (
  process.env.COOKIE_SAME_SITE || "lax"
).toLowerCase();

if (!["strict", "lax", "none"].includes(sameSiteValue)) {
  throw new Error(
    "COOKIE_SAME_SITE must be strict, lax, or none"
  );
}

const COOKIE_SAME_SITE =
  sameSiteValue as NonNullable<CookieOptions["sameSite"]>;

if (COOKIE_SAME_SITE === "none" && !COOKIE_SECURE) {
  throw new Error("SameSite=None requires COOKIE_SECURE=true");
}

if (isProduction && !COOKIE_SECURE) {
  throw new Error(
    "Production requires COOKIE_SECURE=true"
  );
}

const COOKIE_DOMAIN =
  process.env.COOKIE_DOMAIN?.trim() || undefined;

const ACCESS_COOKIE_PATH =
  process.env.ACCESS_COOKIE_PATH || "/";

const REFRESH_COOKIE_PATH =
  process.env.REFRESH_COOKIE_PATH || "/api/auth";

const readPositiveNumber = (
  name: string,
  defaultValue: number
): number => {
  const rawValue = process.env[name];

  if (rawValue === undefined || rawValue === "") {
    return defaultValue;
  }

  const value = Number(rawValue);

  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return value;
};

const ACCESS_MAX_AGE = readPositiveNumber(
  "ACCESS_COOKIE_MAX_AGE",
  isProduction ? 15 * 60 * 1000 : 10 * 1000
);

const REFRESH_MAX_AGE = readPositiveNumber(
  "REFRESH_COOKIE_MAX_AGE",
  isProduction
    ? 7 * 24 * 60 * 60 * 1000
    : 20 * 1000
);

const commonCookieOptions: CookieOptions = {
  httpOnly: COOKIE_HTTP_ONLY,
  secure: COOKIE_SECURE,
  sameSite: COOKIE_SAME_SITE,
  ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

const accessCookieOptions: CookieOptions = {
  ...commonCookieOptions,
  path: ACCESS_COOKIE_PATH,
  maxAge: ACCESS_MAX_AGE,
};

const refreshCookieOptions: CookieOptions = {
  ...commonCookieOptions,
  path: REFRESH_COOKIE_PATH,
  maxAge: REFRESH_MAX_AGE,
};

// --------------------------------------------------
// 3. DATABASE CONNECTION
// --------------------------------------------------

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: true }
    : undefined,
});

// --------------------------------------------------
// 4. EXPRESS CONFIGURATION
// --------------------------------------------------

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// --------------------------------------------------
// 5. TYPES
// --------------------------------------------------

type SafeUser = {
  id: number;
  name: string;
  email: string;
};

type AccessPayload = {
  userId: number;
  email: string;
  type: "access";
};

type RefreshPayload = {
  userId: number;
  type: "refresh";
};

// --------------------------------------------------
// 6. TOKEN UTILITIES
// --------------------------------------------------

const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

const signAccess = (user: SafeUser): string =>
  jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: "access",
    } satisfies AccessPayload,
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_EXPIRES as SignOptions["expiresIn"],
    }
  );

const signRefresh = (userId: number): string =>
  jwt.sign(
    {
      userId,
      type: "refresh",
    } satisfies RefreshPayload,
    REFRESH_SECRET,
    {
      expiresIn: REFRESH_EXPIRES as SignOptions["expiresIn"],
    }
  );

// --------------------------------------------------
// 7. COOKIE HELPERS
// --------------------------------------------------

const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  res.cookie(
    ACCESS_COOKIE,
    accessToken,
    accessCookieOptions
  );

  res.cookie(
    REFRESH_COOKIE,
    refreshToken,
    refreshCookieOptions
  );
};

const clearAuthCookies = (res: Response): void => {
  const {
    maxAge: _accessMaxAge,
    ...accessClearOptions
  } = accessCookieOptions;

  const {
    maxAge: _refreshMaxAge,
    ...refreshClearOptions
  } = refreshCookieOptions;

  res.clearCookie(ACCESS_COOKIE, accessClearOptions);

  res.clearCookie(REFRESH_COOKIE, refreshClearOptions);
};

// --------------------------------------------------
// 8. DATABASE HELPERS
// --------------------------------------------------

const createRefreshSession = async (
  userId: number,
  token: string
): Promise<void> => {
  const decoded = jwt.decode(token) as { exp?: number } | null;

  if (!decoded?.exp) {
    throw new Error("Could not read refresh-token expiry");
  }

  await pool.query(
    `INSERT INTO demo_refresh_sessions
       (user_id, token_hash, expires_at)
     VALUES ($1, $2, to_timestamp($3))`,
    [userId, hashToken(token), decoded.exp]
  );
};

const findSafeUser = async (
  id: number
): Promise<SafeUser | null> => {
  const result = await pool.query<SafeUser>(
    `SELECT id, name, email
     FROM demo_users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};

// --------------------------------------------------
// 9. ASYNC ROUTE ERROR HANDLER
// --------------------------------------------------

const asyncRoute = (
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<unknown>
) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);

// --------------------------------------------------
// 10. AUTHENTICATION MIDDLEWARE
// --------------------------------------------------

const authenticate = asyncRoute(async (req, res, next) => {
  const token = req.cookies[ACCESS_COOKIE] as
    | string
    | undefined;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Access token missing or expired",
    });
    return;
  }

  try {
    const payload = jwt.verify(
      token,
      ACCESS_SECRET
    ) as AccessPayload;

    if (
      payload.type !== "access" ||
      !Number.isInteger(payload.userId)
    ) {
      throw new Error("Invalid access token");
    }

    const user = await findSafeUser(payload.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
      return;
    }

    res.locals.user = user;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Access token missing or expired",
    });
  }
});

// --------------------------------------------------
// 11. HEALTH CHECK
// --------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "JWT cookie demo API is running",
  });
});

// --------------------------------------------------
// 12. REGISTER
// --------------------------------------------------

app.post(
  "/api/auth/register",
  asyncRoute(async (req, res) => {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(req.body?.password ?? "");

    if (
      name.length < 2 ||
      !email.includes("@") ||
      password.length < 8
    ) {
      res.status(400).json({
        success: false,
        message:
          "Enter a name, valid email, and password of at least 8 characters",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const result = await pool.query<SafeUser>(
        `INSERT INTO demo_users
           (name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, name, email`,
        [name, email, passwordHash]
      );

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: { user: result.rows[0] },
      });
    } catch (error) {
      if (
        (error as { code?: string }).code === "23505"
      ) {
        res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
        return;
      }

      throw error;
    }
  })
);

// --------------------------------------------------
// 13. LOGIN
// --------------------------------------------------

app.post(
  "/api/auth/login",
  asyncRoute(async (req, res) => {
    const email = String(req.body?.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(req.body?.password ?? "");

    const result = await pool.query<
      SafeUser & { password_hash: string }
    >(
      `SELECT id, name, email, password_hash
       FROM demo_users
       WHERE email = $1`,
      [email]
    );

    const row = result.rows[0];

    if (
      !row ||
      !(await bcrypt.compare(password, row.password_hash))
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const user: SafeUser = {
      id: row.id,
      name: row.name,
      email: row.email,
    };

    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user.id);

    await createRefreshSession(user.id, refreshToken);

    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      success: true,
      message: "Login successful",
      data: { user },
    });
  })
);

// --------------------------------------------------
// 14. REFRESH TOKEN + ROTATION
// --------------------------------------------------

app.post(
  "/api/auth/refresh",
  asyncRoute(async (req, res) => {
    const oldToken = req.cookies[REFRESH_COOKIE] as
      | string
      | undefined;

    if (!oldToken) {
      clearAuthCookies(res);

      res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
      return;
    }

    let payload: RefreshPayload;

    try {
      payload = jwt.verify(
        oldToken,
        REFRESH_SECRET
      ) as RefreshPayload;

      if (
        payload.type !== "refresh" ||
        !Number.isInteger(payload.userId)
      ) {
        throw new Error("Invalid refresh token");
      }
    } catch {
      clearAuthCookies(res);

      res.status(401).json({
        success: false,
        message: "Refresh token expired or invalid",
      });
      return;
    }

    const oldHash = hashToken(oldToken);

    const session = await pool.query<{ id: number }>(
      `SELECT id
       FROM demo_refresh_sessions
       WHERE token_hash = $1
         AND revoked_at IS NULL
         AND expires_at > NOW()`,
      [oldHash]
    );

    if (!session.rows[0]) {
      clearAuthCookies(res);

      res.status(401).json({
        success: false,
        message: "Refresh session is no longer valid",
      });
      return;
    }

    const user = await findSafeUser(payload.userId);

    if (!user) {
      clearAuthCookies(res);

      res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
      return;
    }

    // Revoke the previous refresh-token session.
    await pool.query(
      `UPDATE demo_refresh_sessions
       SET revoked_at = NOW()
       WHERE id = $1
         AND revoked_at IS NULL`,
      [session.rows[0].id]
    );

    // Generate a new pair of tokens.
    const newAccessToken = signAccess(user);
    const newRefreshToken = signRefresh(user.id);

    await createRefreshSession(user.id, newRefreshToken);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({
      success: true,
      message: "Tokens refreshed and refresh token rotated",
      data: { user },
    });
  })
);

// --------------------------------------------------
// 15. LOGOUT
// --------------------------------------------------

app.post(
  "/api/auth/logout",
  asyncRoute(async (req, res) => {
    const token = req.cookies[REFRESH_COOKIE] as
      | string
      | undefined;

    if (token) {
      await pool.query(
        `UPDATE demo_refresh_sessions
         SET revoked_at = NOW()
         WHERE token_hash = $1
           AND revoked_at IS NULL`,
        [hashToken(token)]
      );
    }

    clearAuthCookies(res);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  })
);

// --------------------------------------------------
// 16. CURRENT USER
// --------------------------------------------------

app.get("/api/auth/me", authenticate, (_req, res) => {
  res.json({
    success: true,
    data: {
      user: res.locals.user as SafeUser,
    },
  });
});

// --------------------------------------------------
// 17. CENTRAL ERROR HANDLER
// --------------------------------------------------

app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    // Do not print secrets, request cookies, or tokens.
    console.error("Request failed:", err.message);

    res.status(500).json({
      success: false,
      message: "Server error. Check the backend terminal.",
    });
  }
);

// --------------------------------------------------
// 18. START SERVER
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
