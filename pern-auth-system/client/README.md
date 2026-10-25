# PERN Auth System — Client

React frontend for the **PERN Auth System** application.

> **Note:** Confirm the commands and environment-variable names below against this folder's `package.json` and source code. Replace any placeholders before publishing.

## Overview

The client provides the user interface and communicates with the backend API for authentication-related operations.

## Technology Stack

- React
- JavaScript or TypeScript (confirm from the project files)
- npm
- Backend API: Express.js server
- Database: PostgreSQL, accessed through the backend

Add any libraries actually used by this project, such as React Router, Axios, React Hook Form, or a UI framework.

## Prerequisites

- Node.js (use a currently supported LTS version compatible with the project)
- npm
- The PERN Auth System server running locally or at a configured API URL

## Installation

From the repository root:

```bash
cd client
npm install
```

## Environment Configuration

If the client uses environment variables, create the appropriate local environment file and configure the backend API URL.

For a Vite application, client-exposed variables usually begin with `VITE_`, for example:

```env
VITE_API_URL=http://localhost:5000
```

For Create React App, the prefix is usually `REACT_APP_` instead. **Use the prefix and variable name expected by your actual project code.** Never put database passwords, JWT secrets, or other server-only secrets in client-side environment variables.

## Run the Client

Check the `scripts` section of `client/package.json`. A common Vite command is:

```bash
npm run dev
```

A common Create React App command is:

```bash
npm start
```

Use only the command defined by your project's scripts. Open the local URL printed in the terminal.

## Authentication Flow

A typical client/server authentication flow is:

1. The user submits registration or login details through the client.
2. The client sends the request to the Express API.
3. The server validates the input and verifies or creates the user's credentials.
4. The server returns an authentication response or sets a session cookie, depending on the implementation.
5. The client handles the response and displays the appropriate result.
6. Protected requests are sent using the authentication mechanism implemented by the server.

Document the actual flow used in this project (for example, HTTP-only cookies or bearer tokens) and do not assume both are implemented.

## Connecting to the Backend

Make sure the server is running and that the client's API base URL matches the server address and port. If requests fail, check:

- The backend is running.
- The API URL is correct.
- The server's CORS configuration permits the client origin.
- Required cookies or authorization headers are sent as expected.
- Browser DevTools **Console** and **Network** tabs for errors and failed requests.

## Available Scripts

Run `npm run` inside the `client` directory to list the scripts available in this project. Document the actual scripts here, for example:

| Command | Purpose |
|---|---|
| `npm run dev` | Start a Vite development server, if configured |
| `npm start` | Start a Create React App development server, if configured |
| `npm run build` | Create a production build, if configured |
| `npm test` | Run tests, if configured |

These are common examples, not a confirmation that every script exists in this project.

## Troubleshooting

- **API request fails:** Verify the server URL and confirm the backend is running.
- **CORS error:** Check the allowed client origin in the server configuration.
- **Environment variable is undefined:** Check the variable name, required prefix, and restart the development server after changing environment files.
- **Login or registration fails:** Inspect the Network tab and the server logs; do not expose passwords, tokens, or secrets in screenshots or logs.

## Security Notes

- Do not store database credentials or JWT signing secrets in client code.
- Do not treat client-side route guards as the only authorization control; the server must protect private endpoints.
- Prefer secure, HTTP-only cookies when that matches the server's authentication design, and configure CSRF protection where appropriate.
- Never commit real credentials or `.env` files.

## Related Documentation

- [Parent PERN Auth System repository](../)
- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/) (if this project uses Vite)
