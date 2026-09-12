import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/users";

// ========================================
// READ - Fetch Users
// ========================================

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// CREATE - Add User
// ========================================

export const addUser = createAsyncThunk(
  "users/addUser",

  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// UPDATE - Update User
// ========================================

export const updateUser = createAsyncThunk(
  "users/updateUser",

  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// DELETE - Delete User
// ========================================

export const deleteUser = createAsyncThunk(
  "users/deleteUser",

  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Temporary delay to see the spinner
      ////await new Promise((resolve) => setTimeout(resolve, 2000));

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// Slice
// ========================================

const usersSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    adding: false,
    updating: false,
    deletingId: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==================================
      // READ
      // ==================================

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      })

      // ==================================
      // CREATE
      // ==================================

      .addCase(addUser.pending, (state) => {
        state.adding = true;
        state.error = null;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.adding = false;

        state.users.push(action.payload);
      })

      .addCase(addUser.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload || "Failed to add user";
      })

      // ==================================
      // UPDATE
      // ==================================

      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "Failed to update user";
      })

      // ==================================
      // DELETE
      // ==================================

      .addCase(deleteUser.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deletingId = null;

        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default usersSlice.reducer;
