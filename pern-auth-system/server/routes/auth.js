import express from "express";
import bcrypt from "bcryptjs"; //https://www.npmjs.com/package/bcryptjs
import jwt from "jsonwebtoken"; //https://www.npmjs.com/package/jsonwebtoken
import pool from "../db.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Register - http://localhost:5000/api/auth/regiter
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO usersauth(name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, hashed],
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login - http://localhost:5000/api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body; //Destructuring - ES6 feature
  try {
    const userResult = await pool.query(
      "SELECT * FROM usersauth WHERE email = $1",
      [email],
    );
    if (!userResult.rows.length)
      return res.status(401).json({ error: "Invalid email" }); //
    //401 is the HTTP status code for Unauthorized.
    const user = userResult.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
      //expiresIn: '10s' // ⏳ token valid for only 10 seconds
    });

    const decoded = jwt.decode(token);
    console.log("Generated JWT:", token);
    console.log("Decoded JWT:", decoded);

    res.json({ token, decoded });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
//router.get('/verify', (req, res),verifyToken => {
router.get("/verify", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Profile (Protected)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email FROM usersauth WHERE id = $1",
      [req.user.id],
    );
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin-only middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// Get all users (Admin only)
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, role, permissions FROM usersauth",
    );
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user (Admin only)
router.delete("/users/:id", verifyToken, isAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    await pool.query("DELETE FROM usersauth WHERE id = $1", [userId]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user (Admin only)
router.put("/users/:id", verifyToken, isAdmin, async (req, res) => {
  const userId = req.params.id;
  const { name, email, role, permissions } = req.body;

  try {
    await pool.query(
      "UPDATE usersauth SET name = $1, email = $2, role = $3, permissions = $4 WHERE id = $5",
      [name, email, role, permissions, userId],
    );
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

/*
LOGIN:
-----
The result returned by pg has this structure:
{
rows: [ { id: 1, name: "Naresh", email: "test@gmail.com", password: "hashed" } ],
rowCount: 1,
command: "SELECT",
...
}
*/
/*
REGISTER:
--------
The newUser object returned has this structure:
{
  command: 'INSERT',
  rowCount: 1,
  oid: null,
  rows: [
    {
      id: 5,
      name: 'Naresh',
      email: 'naresh@gmail.com',
      password: '$2b$10$abc123...'
    }
  ],
  fields: [ ... ],
  _parsers: [ ... ],
  RowCtor: null,
  rowAsArray: false
}
| Property         | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| **`command`**    | The SQL command executed (e.g., `'INSERT'`, `'SELECT'`, `'UPDATE'`, `'DELETE'`).   |
| **`rowCount`**   | Number of rows affected (e.g., 1 if one user was inserted).                        |
| **`rows`**       | Array of returned rows. For `RETURNING *`, it contains the inserted row(s).        |
| **`fields`**     | Metadata about the columns returned (column name, data type, etc.).                |
| **`oid`**        | Object ID of inserted row (mostly `null` for modern PostgreSQL).                   |
| **`rowAsArray`** | Boolean — whether rows are returned as arrays instead of objects (default: false). |

const newUser = await pool.query(
  'INSERT INTO usersauth(name, email, password) VALUES($1, $2, $3) RETURNING *',
  [name, email, hashed]
);

// Access the inserted row like this:
console.log(newUser.rows[0]);

Output:
{
  id: 5,
  name: 'Naresh',
  email: 'naresh@gmail.com',
  password: '$2b$10$abc123...'
}

Or destructure directly:
const createdUser = newUser.rows[0];
res.status(201).json(createdUser);

*/
/*
userResult.rows.length === 0   // true when 0 rows
!userResult.rows.length        // also true when 0 rows



 ✅ Example 1 — Basic behavior

```js
console.log(!true);   // false
console.log(!false);  // true
```

---

 ✅ Example 2 — With numbers

```js
console.log(!0);   // true   (0 is falsy)
console.log(!1);   // false  (1 is truthy)
console.log(!100); // false  (non-zero numbers are truthy)
```

---

 ✅ Example 3 — With strings

```js
console.log(!'');        // true   (empty string is falsy)
console.log(!'hello');   // false  (non-empty string is truthy)
```

---

 ✅ Example 4 — With arrays, objects, or null

```js
console.log(![]);       // false  (arrays are truthy)
console.log(!{});       // false  (objects are truthy)
console.log(!null);     // true   (null is falsy)
console.log(!undefined);// true   (undefined is falsy)
```

---

 ✅ Double NOT (!!)

If you want to explicitly convert any value to its boolean equivalent:

```js
console.log(!!'Hello');  // true
console.log(!!0);        // false
console.log(!!null);     // false
console.log(!![]);       // true
```

The first `!` flips the value,
the second `!` flips it back — giving you a pure boolean (`true` or `false`).

---

 💡 So in your case:

```js
if (!userResult.rows.length)
```

In JavaScript, all non-zero numbers — whether positive or negative — are considered truthy.
Only 0, -0, NaN, null, undefined, and "" (empty string) are falsy.

So for your examples:

```js
console.log(!-1);   // false
console.log(!-100); // false
console.log(!(-999)); // false
```

 Explanation:

 `-1`, `-100`, and other negative numbers are truthy values.
 The logical NOT (`!`) operator converts the value to a boolean and inverts it:

   `!truthy` → `false`
   `!falsy` → `true`

✅ Summary:

| Value  | Truthy/Falsy | `!value` |
| ------ | ------------ | -------- |
| `0`    | falsy        | `true`   |
| `1`    | truthy       | `false`  |
| `-1`   | truthy       | `false`  |
| `100`  | truthy       | `false`  |
| `-100` | truthy       | `false`  |

negative numbers are also truthy, just like positive non-zero numbers.

*/
