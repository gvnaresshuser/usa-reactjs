import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

// ========================================
// API URL
// ========================================

const API_URL = "http://localhost:5000/api/users";

// ========================================
// USER TYPE
// ========================================

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  occupation: string;
  salary: number | null;
}

// ========================================
// REDUX STATE TYPE
// ========================================

interface UsersState {
  users: User[];

  userCount: number;

  loading: boolean;

  adding: boolean;

  updating: boolean;

  deletingId: number | null;

  error: string | null;
}

// ========================================
// INITIAL STATE
// ========================================

const initialState: UsersState = {
  users: [],

  userCount: 0,

  loading: false,

  adding: false,

  updating: false,

  deletingId: null,

  error: null,
};

// ========================================
// READ - Fetch Users
// ========================================

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  {
    rejectValue: string;
  }
>(
  "users/fetchUsers",

  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return (await response.json()) as User[];

    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch users",
      );
    }
  },
);

// ========================================
// CREATE - Add User
// ========================================

export const addUser = createAsyncThunk<
  User,
  Omit<User, "id">,
  {
    rejectValue: string;
  }
>(
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

      return (await response.json()) as User;

    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to add user",
      );
    }
  },
);

// ========================================
// UPDATE - Update User
// ========================================

export const updateUser = createAsyncThunk<
  User,
  User,
  {
    rejectValue: string;
  }
>(
  "users/updateUser",

  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${user.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(user),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return (await response.json()) as User;

    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to update user",
      );
    }
  },
);

// ========================================
// DELETE - Delete User
// ========================================

export const deleteUser = createAsyncThunk<
  number,
  number,
  {
    rejectValue: string;
  }
>(
  "users/deleteUser",

  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      return id;

    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to delete user",
      );
    }
  },
);

// ========================================
// SLICE
// ========================================

const usersSlice = createSlice({
  name: "users",

  initialState,

  // ====================================
  // NORMAL REDUCERS
  // ====================================

  reducers: {
    clearUsers: (state) => {
      state.users = [];

      state.userCount = 0;
    },
  },

  // ====================================
  // ASYNC REDUCERS
  // ====================================

  extraReducers: (builder) => {
    builder

      // ==================================
      // READ
      // ==================================

      .addCase(
        fetchUsers.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        },
      )

      .addCase(
        fetchUsers.fulfilled,
        (state, action) => {
          state.loading = false;

          state.users = action.payload;

          state.userCount =
            action.payload.length;
        },
      )

      .addCase(
        fetchUsers.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch users";
        },
      )

      // ==================================
      // CREATE
      // ==================================

      .addCase(
        addUser.pending,
        (state) => {
          state.adding = true;

          state.error = null;
        },
      )

      .addCase(
        addUser.fulfilled,
        (state, action) => {
          state.adding = false;

          state.users.push(action.payload);

          state.userCount =
            state.users.length;
        },
      )

      .addCase(
        addUser.rejected,
        (state, action) => {
          state.adding = false;

          state.error =
            action.payload ||
            "Failed to add user";
        },
      )

      // ==================================
      // UPDATE
      // ==================================

      .addCase(
        updateUser.pending,
        (state) => {
          state.updating = true;

          state.error = null;
        },
      )

      .addCase(
        updateUser.fulfilled,
        (state, action) => {
          state.updating = false;

          const index =
            state.users.findIndex(
              (user) =>
                user.id ===
                action.payload.id,
            );

          if (index !== -1) {
            state.users[index] =
              action.payload;
          }
        },
      )

      .addCase(
        updateUser.rejected,
        (state, action) => {
          state.updating = false;

          state.error =
            action.payload ||
            "Failed to update user";
        },
      )

      // ==================================
      // DELETE
      // ==================================

      .addCase(
        deleteUser.pending,
        (state, action) => {
          state.deletingId =
            action.meta.arg;

          state.error = null;
        },
      )

      .addCase(
        deleteUser.fulfilled,
        (state, action) => {
          state.deletingId = null;

          state.users =
            state.users.filter(
              (user) =>
                user.id !==
                action.payload,
            );

          state.userCount =
            state.users.length;
        },
      )

      .addCase(
        deleteUser.rejected,
        (state, action) => {
          state.deletingId = null;

          state.error =
            action.payload ||
            "Failed to delete user";
        },
      );
  },
});

// ========================================
// EXPORT ACTION
// ========================================

export const { clearUsers } =
  usersSlice.actions;

// ========================================
// EXPORT REDUCER
// ========================================

export default usersSlice.reducer;