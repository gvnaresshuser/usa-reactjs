import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import { Pool } from "pg";

const required = (name: string): string => {
  const value = process.env[name];
  console.log(value);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const PORT = Number(process.env.PORT || 5000);
const DATABASE_URL = required("DATABASE_URL");
const ACCESS_SECRET = required("JWT_ACCESS_SECRET");
const REFRESH_SECRET = required("JWT_REFRESH_SECRET");
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || "10s";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || "15m";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const isProduction = process.env.NODE_ENV === "production";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";
const ACCESS_MAX_AGE = 10_000;
const REFRESH_MAX_AGE = 15 * 60 * 1000;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

type SafeUser = { id: number; name: string; email: string };
type AccessPayload = { userId: number; email: string; type: "access" };
type RefreshPayload = { userId: number; type: "refresh" };

const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

const signAccess = (user: SafeUser): string =>
  jwt.sign(
    { userId: user.id, email: user.email, type: "access" } satisfies AccessPayload,
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES as SignOptions["expiresIn"] }
  );

const signRefresh = (userId: number): string =>
  jwt.sign(
    { userId, type: "refresh" } satisfies RefreshPayload,
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES as SignOptions["expiresIn"] }
  );

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie(ACCESS_COOKIE, accessToken, {
    httpOnly: true, secure: isProduction, sameSite: "lax",
    path: "/", maxAge: ACCESS_MAX_AGE
  });
  res.cookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true, secure: isProduction, sameSite: "lax",
    path: "/api/auth", maxAge: REFRESH_MAX_AGE
  });
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie(ACCESS_COOKIE, {
    httpOnly: true, secure: isProduction, sameSite: "lax", path: "/"
  });
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true, secure: isProduction, sameSite: "lax", path: "/api/auth"
  });
};

const createRefreshSession = async (userId: number, token: string) => {
  const decoded = jwt.decode(token) as { exp?: number } | null;
  if (!decoded?.exp) throw new Error("Could not read refresh-token expiry");
  await pool.query(
    `INSERT INTO demo_refresh_sessions (user_id, token_hash, expires_at)
     VALUES ($1, $2, to_timestamp($3))`,
    [userId, hashToken(token), decoded.exp]
  );
};

const findSafeUser = async (id: number): Promise<SafeUser | null> => {
  const result = await pool.query<SafeUser>(
    "SELECT id, name, email FROM demo_users WHERE id = $1",
    [id]
  );
  return result.rows[0] ?? null;
};

const asyncRoute = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const authenticate = asyncRoute(async (req, res, next) => {
  const token = req.cookies[ACCESS_COOKIE] as string | undefined;
  if (!token) {
    res.status(401).json({ success: false, message: "Access token missing or expired" });
    return;
  }
  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as AccessPayload;
    if (payload.type !== "access") throw new Error("Wrong token type");
    const user = await findSafeUser(payload.userId);
    if (!user) {
      res.status(401).json({ success: false, message: "User no longer exists" });
      return;
    }
    res.locals.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Access token missing or expired" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "JWT cookie demo API is running" });
});

app.post("/api/auth/register", asyncRoute(async (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  if (name.length < 2 || !email.includes("@") || password.length < 8) {
    res.status(400).json({ success: false, message: "Enter a name, valid email, and password of at least 8 characters" });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query<SafeUser>(
      `INSERT INTO demo_users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, passwordHash]
    );
    res.status(201).json({ success: true, message: "Registration successful", data: { user: result.rows[0] } });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      res.status(409).json({ success: false, message: "Email is already registered" });
      return;
    }
    throw error;
  }
}));

app.post("/api/auth/login", asyncRoute(async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  const result = await pool.query<SafeUser & { password_hash: string }>(
    "SELECT id, name, email, password_hash FROM demo_users WHERE email = $1",
    [email]
  );
  const row = result.rows[0];
  if (!row || !(await bcrypt.compare(password, row.password_hash))) {
    res.status(401).json({ success: false, message: "Invalid email or password" });
    return;
  }
  const user: SafeUser = { id: row.id, name: row.name, email: row.email };
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user.id);
  await createRefreshSession(user.id, refreshToken);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ success: true, message: "Login successful", data: { user } });
}));

app.post("/api/auth/refresh", asyncRoute(async (req, res) => {
  const oldToken = req.cookies[REFRESH_COOKIE] as string | undefined;
  if (!oldToken) {
    clearAuthCookies(res);
    res.status(401).json({ success: false, message: "Refresh token missing" });
    return;
  }

  let payload: RefreshPayload;
  try {
    payload = jwt.verify(oldToken, REFRESH_SECRET) as RefreshPayload;
    if (payload.type !== "refresh") throw new Error("Wrong token type");
  } catch {
    clearAuthCookies(res);
    res.status(401).json({ success: false, message: "Refresh token expired or invalid" });
    return;
  }

  const oldHash = hashToken(oldToken);
  const session = await pool.query<{ id: number }>(
    `SELECT id FROM demo_refresh_sessions
     WHERE token_hash = $1 AND revoked_at IS NULL AND expires_at > NOW()`,
    [oldHash]
  );
  if (!session.rows[0]) {
    clearAuthCookies(res);
    res.status(401).json({ success: false, message: "Refresh session is no longer valid" });
    return;
  }

  const user = await findSafeUser(payload.userId);
  if (!user) {
    clearAuthCookies(res);
    res.status(401).json({ success: false, message: "User no longer exists" });
    return;
  }

  // Rotation: revoke the old refresh session before saving its replacement.
  await pool.query(
    "UPDATE demo_refresh_sessions SET revoked_at = NOW() WHERE id = $1 AND revoked_at IS NULL",
    [session.rows[0].id]
  );
  const newAccessToken = signAccess(user);
  const newRefreshToken = signRefresh(user.id);
  await createRefreshSession(user.id, newRefreshToken);
  setAuthCookies(res, newAccessToken, newRefreshToken);
  res.json({ success: true, message: "Tokens refreshed and refresh token rotated", data: { user } });
}));

app.post("/api/auth/logout", asyncRoute(async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE] as string | undefined;
  if (token) {
    await pool.query(
      "UPDATE demo_refresh_sessions SET revoked_at = NOW() WHERE token_hash = $1 AND revoked_at IS NULL",
      [hashToken(token)]
    );
  }
  clearAuthCookies(res);
  res.json({ success: true, message: "Logged out successfully" });
}));

app.get("/api/auth/me", authenticate, (_req, res) => {
  res.json({ success: true, data: { user: res.locals.user as SafeUser } });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: "Server error. Check the backend terminal." });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
