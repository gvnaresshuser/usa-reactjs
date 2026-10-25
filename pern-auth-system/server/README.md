# PERN Auth System — Server

Express.js backend for the **PERN Auth System** application.

> **Note:** Confirm the commands, environment-variable names, database schema, and routes below against this folder's `package.json` and source code. Replace placeholders before publishing.

## Overview

The server exposes API endpoints used by the client and handles authentication-related business logic and database access.

## Technology Stack

- Node.js
- Express.js
- PostgreSQL
- A PostgreSQL client such as `pg` (confirm from `package.json`)
- Authentication library and strategy used by this project (for example, `jsonwebtoken`, sessions, or another approach)
- Password-hashing library used by this project (for example, `bcrypt`, `bcryptjs`, or `argon2`)

List only dependencies that are actually installed and used by the server.

## Prerequisites

- Node.js (a supported LTS version compatible with the project)
- npm
- PostgreSQL server and a database for this application

## Installation

From the repository root:

```bash
cd server
npm install
```

## Environment Variables

Create a local `.env` file if the application uses `dotenv` or another environment configuration mechanism. The names below are **examples only**; use the exact names read by your server code.

```env
PORT=5000
DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@localhost:5432/DB_NAME
JWT_SECRET=replace_with_a_long_random_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

If the code uses separate PostgreSQL variables (such as `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`) instead of `DATABASE_URL`, configure those names instead. `CLIENT_URL` and `JWT_SECRET` should only be included if the code expects them.

**Security requirements:**

- Never commit `.env` or real credentials.
- Add the environment file to `.gitignore`.
- Provide a safe `.env.example` containing placeholder values.
- Use a strong, randomly generated secret where JWT signing is used.
- Do not log passwords, JWTs, session identifiers, or signing secrets.

## Database Setup

1. Install and start PostgreSQL.
2. Create a database for the application.
3. Configure the connection values in the server environment.
4. Run the SQL schema, migrations, or setup script that belongs to this project.
5. Verify the server can connect to PostgreSQL.

The exact database name, table names, schema, and migration commands must be taken from the project files. Do not assume that tables are created automatically.

## Run the Server

Inspect `scripts` in `server/package.json` and use a command defined there. Common examples include:

```bash
npm run dev
```

or:

```bash
npm start
```

The server should print its listening address or port if startup logging is configured. The example port `5000` is not guaranteed to match your project.

## API Documentation

Document each endpoint from the actual Express route files. Use this table as a template:

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a user, if implemented | Public |
| `POST` | `/api/auth/login` | Log in, if implemented | Public |
| `POST` | `/api/auth/logout` | Log out, if implemented | Depends on implementation |
| `GET` | `/api/auth/me` | Return current user, if implemented | Protected |

The routes above are illustrative examples, not verified endpoints from this repository. Replace them with the exact routes, request bodies, response formats, status codes, and authentication requirements from the source code.

## Authentication and Password Security

Document the mechanism actually implemented by the server. For example:

- Validate and normalize incoming input as appropriate.
- Hash passwords with a dedicated password-hashing library before storing them.
- Verify submitted passwords against the stored password hash during login.
- Verify JWT signatures and expiration claims if JWTs are used.
- Protect private endpoints with authentication middleware.
- Check authorization on the server for actions that require specific permissions.
- Return appropriate HTTP status codes without leaking sensitive internal errors.

A valid JWT should have an expiration policy. If refresh tokens or sessions are implemented, explain how they are created, stored, rotated, expired, and revoked.

## Testing the API

Use Thunder Client, Postman, or another HTTP client to test the actual endpoints.

1. Start PostgreSQL.
2. Start the server.
3. Send requests to the configured local API base URL.
4. Test valid and invalid registration/login requests.
5. Test protected endpoints with missing, invalid, and expired credentials.
6. Verify that database changes and error responses are correct.

Add real request examples after confirming the route definitions and validation rules.

## Available Scripts

Run `npm run` inside the `server` directory to see the available scripts. Document the actual scripts here.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server, if configured |
| `npm start` | Start the server, if configured |
| `npm test` | Run tests, if configured |

## Troubleshooting

- **Database connection error:** Check that PostgreSQL is running and the connection settings are correct.
- **Missing environment variable:** Confirm the exact variable names used in the code and load the environment file before accessing them.
- **CORS error:** Confirm the allowed client origin and credential settings, if cookies are used.
- **401 Unauthorized:** Check the authentication header or cookie and token/session validity.
- **Token expired:** Follow the refresh or login flow implemented by the application.
- **Port already in use:** Change the configured port or stop the process using it.

## Production Checklist

- Use HTTPS.
- Set production-appropriate CORS and cookie settings.
- Keep secrets in the deployment environment, not in source control.
- Use secure password hashing and server-side authorization.
- Validate and safely handle request input.
- Avoid returning stack traces or sensitive details to clients.
- Apply database migrations and backups as appropriate.
- Configure logging and monitoring without recording credentials or tokens.

## Related Documentation

- [Parent PERN Auth System repository](../)
- [Node.js documentation](https://nodejs.org/docs/)
- [Express documentation](https://expressjs.com/)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
