import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "./app/hooks";

import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  clearUsers,
  type User,
} from "./features/users/usersSlice";

// ========================================
// FORM TYPE
// ========================================

interface UserForm {
  name: string;
  email: string;
  mobile: string;
  city: string;
  occupation: string;
  salary: string;
}

// ========================================
// INITIAL FORM
// ========================================

const initialForm: UserForm = {
  name: "",
  email: "",
  mobile: "",
  city: "",
  occupation: "",
  salary: "",
};

// ========================================
// APP
// ========================================

function App() {
  // ======================================
  // Redux
  // ======================================

  const dispatch = useAppDispatch();

  const { users, userCount, loading, adding, updating, deletingId, error } =
    useAppSelector((state) => state.users);

  // ======================================
  // Local State
  // ======================================

  const [form, setForm] = useState<UserForm>(initialForm);

  const [editingId, setEditingId] = useState<number | null>(null);

  // ======================================
  // READ
  // ======================================

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ======================================
  // FORM CHANGE
  // ======================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================
  // CREATE / UPDATE
  // ======================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      city: form.city,
      occupation: form.occupation,
      salary: form.salary ? Number(form.salary) : null,
    };

    if (editingId !== null) {
      dispatch(
        updateUser({
          id: editingId,
          ...userData,
        }),
      );

      setEditingId(null);
    } else {
      dispatch(addUser(userData));
    }

    setForm(initialForm);
  };

  // ======================================
  // EDIT
  // ======================================

  const handleEdit = (user: User) => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      city: user.city || "",
      occupation: user.occupation || "",
      salary: user.salary !== null ? String(user.salary) : "",
    });

    setEditingId(user.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================
  // CANCEL
  // ======================================

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  // ======================================
  // DELETE
  // ======================================

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  // ======================================
  // UI
  // ======================================

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =====================================
          HEADER
      ===================================== */}

      <header className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
                <span className="mr-2">⚡</span>
                React + TypeScript + Redux Toolkit
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                User Management
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Complete CRUD application using Redux Toolkit, TypeScript,
                Express and PostgreSQL.
              </p>
            </div>

            {/* HEADER STAT */}

            <div className="rounded-2xl bg-white/10 px-8 py-5 text-center shadow-xl backdrop-blur">
              <div className="text-4xl font-bold">{userCount}</div>

              <div className="mt-1 text-sm text-blue-100">Total Users</div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =====================================
            ACTION BAR
        ===================================== */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              CRUD Operations
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">Users</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* LOAD */}

            <button
              onClick={() => dispatch(fetchUsers())}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Loading...
                </>
              ) : (
                <>↻ Load Users</>
              )}
            </button>

            {/* CLEAR */}

            <button
              onClick={() => dispatch(clearUsers())}
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-100"
            >
              Clear Users
            </button>
          </div>
        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
            <span className="text-xl">⚠️</span>

            <div>
              <p className="font-semibold">Something went wrong</p>

              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* =====================================
            ADD / UPDATE CARD
        ===================================== */}

        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* CARD HEADER */}

          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                {editingId !== null ? "✎" : "＋"}
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId !== null ? "Edit User" : "Add New User"}
                </h2>

                <p className="text-sm text-slate-500">
                  {editingId !== null
                    ? "Update the user information below."
                    : "Enter user details to create a new user."}
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* MOBILE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mobile
                </label>

                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* CITY */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  City
                </label>

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* OCCUPATION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Occupation
                </label>

                <input
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* SALARY */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Salary
                </label>

                <input
                  name="salary"
                  type="number"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="Enter salary"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* FORM BUTTONS */}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={adding || updating}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {(adding || updating) && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}

                {editingId !== null
                  ? updating
                    ? "Updating..."
                    : "✓ Update User"
                  : adding
                    ? "Adding..."
                    : "+ Add User"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={updating}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* =====================================
            LOADING
        ===================================== */}

        {loading && (
          <div className="mb-6 flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-12 shadow-sm">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

              <p className="mt-4 font-medium text-slate-600">
                Loading users...
              </p>
            </div>
          </div>
        )}

        {/* =====================================
            USER LIST
        ===================================== */}

        {!loading && users.length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* LIST HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  User Directory
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-800">
                  All Users
                </h2>
              </div>

              <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
                {userCount} Users
              </div>
            </div>

            {/* USERS */}

            <div className="divide-y divide-slate-100">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                >
                  {/* USER INFORMATION */}

                  <div className="flex items-center gap-4">
                    {/* AVATAR */}

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-bold text-white shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* DETAILS */}

                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {user.name}
                      </h3>

                      <p className="text-sm text-slate-500">{user.email}</p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {user.mobile && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            📱 {user.mobile}
                          </span>
                        )}

                        {user.city && (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            📍 {user.city}
                          </span>
                        )}

                        {user.occupation && (
                          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                            💼 {user.occupation}
                          </span>
                        )}

                        {user.salary !== null && (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                            ₹ {user.salary}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-3 md:shrink-0">
                    {/* UPDATE */}

                    <button
                      onClick={() => handleEdit(user)}
                      disabled={updating || deletingId !== null}
                      className="rounded-xl bg-amber-50 px-4 py-2.5 font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      ✎ Update
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId !== null || updating}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === user.id ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                          Deleting...
                        </>
                      ) : (
                        <>🗑 Delete</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {!loading && users.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
              👥
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-800">
              No users found
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first user using the form above.
            </p>
          </div>
        )}
      </main>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        React + TypeScript + Redux Toolkit
        {" • "}
        Users CRUD
      </footer>
    </div>
  );
}

export default App;
