import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;
const API_URL = "https://jsonplaceholder.typicode.com/users";

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// =========================
// Home
// =========================

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// =========================
// GET - All Users
// =========================

app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

// =========================
// POST - Add User
// =========================

app.post("/api/users", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    const user = await response.json();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add user",
    });
  }
});

// =========================
// PUT - Update User
// =========================

app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const user = await response.json();

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update user",
    });
  }
});

// =========================
// DELETE - Delete User
// =========================

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
});

// =========================
// Start Server
// =========================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/*
There is another important consequence

Your current backend is essentially a proxy around JSONPlaceholder:

React
  ↓
localhost:5000/api/users
  ↓
Express
  ↓
JSONPlaceholder
  ↓
Express
  ↓
React

The GET works:

GET /api/users
       ↓
JSONPlaceholder
       ↓
10 users

But POST doesn't really persist the new user.

For example:

POST Gaming Laptop
       ↓
JSONPlaceholder
       ↓
{id: 11, name: "Gaming Laptop"}

But if you subsequently do:

GET /api/users

JSONPlaceholder will still return its original 10 users.

So your Redux state might temporarily contain:

10 original users
+
Gaming Laptop

but after:

dispatch(fetchUsers());

your state gets replaced with the original JSONPlaceholder users:

state.users = action.payload;

and Gaming Laptop disappears.
*/
