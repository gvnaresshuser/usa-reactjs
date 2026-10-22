# JWT Cookie Teaching Demo

A deliberately small React + TypeScript + Vite frontend and Express + TypeScript backend.

## Features
- Register and login with Neon PostgreSQL
- Access JWT in an HTTP-only cookie
- Refresh JWT in a separate HTTP-only cookie
- Refresh-token rotation: the old refresh session is revoked and a new one is stored
- Protected `/api/auth/me` endpoint
- Logout clears cookies and revokes the refresh session
- Axios retries a failed protected request once after refreshing

## 1. Database
Run `backend/schema.sql` in the Neon SQL Editor.

## 2. Backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`, then set your Neon `DATABASE_URL` and two new JWT secrets.
```bash
npm run dev
```
Backend: http://localhost:5000

## 3. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## 4. Demo flow
1. Register a user.
2. Log in.
3. Open Dashboard and click **Call protected API**.
4. For the expiry demonstration, wait longer than `JWT_ACCESS_EXPIRES_IN` (default `10s`) and click the protected API button again. Axios calls `/api/auth/refresh`, receives new cookies, and retries the original request.
5. Click Logout.

## Notes
- The refresh-token lifetime and cookie max age should agree. Defaults here are 10 seconds for access and 15 minutes for refresh.
- `secure=false` is for localhost HTTP only. Use HTTPS and `secure=true` in production.
- Never commit `.env`.
- The database URL and JWT secrets pasted into a chat should be considered exposed. Rotate the Neon database password and generate new JWT secrets before using this project.
