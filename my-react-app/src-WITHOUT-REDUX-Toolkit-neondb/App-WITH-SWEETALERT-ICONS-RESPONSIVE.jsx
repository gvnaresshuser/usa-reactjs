import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  Users,
  UserPlus,
  UserPen,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Hash,
  LoaderCircle,
  UserRound,
} from "lucide-react";

import "./sweetalert.css";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    occupation: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET - All Users
  // ==========================================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================================
  // Handle Input
  // ==========================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // POST - Add User
  // ==========================================
  const addUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();

      setUsers([...users, newUser]);

      await Swal.fire({
        icon: "success",
        title: "User Added Successfully!",
        text: `${newUser.name} has been added successfully.`,
        confirmButtonText: "Great!",
        customClass: {
          popup: "custom-success-popup",
        },
      });

      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Unable to Add User",
        text: "Something went wrong while creating the user. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // ==========================================
  // PUT - Update User
  // ==========================================
  const updateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      setUsers(
        users.map((user) =>
          user.id === editingId ? updatedUser : user
        )
      );

      await Swal.fire({
        icon: "info",
        title: "User Updated Successfully!",
        text: `${updatedUser.name} has been updated successfully.`,
        confirmButtonText: "Great!",
        customClass: {
          popup: "custom-update-popup",
        },
      });

      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Unable to Update User",
        text: "Something went wrong while updating the user. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // ==========================================
  // DELETE - Delete User
  // ==========================================
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== id));

      await Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "custom-delete-popup",
        },
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Unable to delete the user. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // ==========================================
  // Edit
  // ==========================================
  const startEdit = (user) => {
    setEditingId(user.id);

    setForm({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      city: user.city || "",
      occupation: user.occupation || "",
      salary: user.salary || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // Reset Form
  // ==========================================
  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      mobile: "",
      city: "",
      occupation: "",
      salary: "",
    });
  };

  // ==========================================
  // Submit
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateUser();
    } else {
      addUser();
    }
  };

  // ==========================================
  // Common Input Style
  // ==========================================
  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">

      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="mb-6 sm:mb-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-5 text-white shadow-lg sm:p-7">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="shrink-0 rounded-xl bg-white/15 p-2.5 backdrop-blur-sm sm:p-3">
                <Users
                  size={28}
                  className="sm:h-9 sm:w-9"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold sm:text-3xl">
                  User Management
                </h1>

                <p className="mt-1 text-xs text-blue-100 sm:mt-2 sm:text-base">
                  React CRUD Application using REST APIs
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="shrink-0 rounded-full bg-red-100 p-2">
                  <RefreshCw
                    size={18}
                    className="text-red-600"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Something went wrong
                  </p>

                  <p className="mt-1 text-sm">
                    {error}
                  </p>
                </div>

              </div>

              <button
                onClick={fetchUsers}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
              >
                <RefreshCw size={16} />
                Retry
              </button>

            </div>
          </div>
        )}

        {/* ==========================================
            LOADING
        ========================================== */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">

            <LoaderCircle
              size={40}
              className="animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading users...
            </p>

          </div>
        )}

        {/* ==========================================
            FORM CARD
        ========================================== */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:mb-8 sm:p-6"
        >

          {/* Form Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 sm:text-xl">

                {editingId ? (
                  <UserPen
                    size={21}
                    className="text-orange-500"
                  />
                ) : (
                  <UserPlus
                    size={21}
                    className="text-blue-600"
                  />
                )}

                {editingId
                  ? "Update User"
                  : "Add New User"}
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {editingId
                  ? "Update the user's information below."
                  : "Enter the details to create a new user."}
              </p>
            </div>

            {editingId && (
              <span className="flex w-fit items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                <Pencil size={13} />
                Editing User #{editingId}
              </span>
            )}

          </div>

          {/* ==========================================
              FORM FIELDS
          ========================================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">

            {/* Name */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Users
                  size={16}
                  className="text-blue-600"
                />
                Name
              </label>

              <input
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail
                  size={16}
                  className="text-blue-600"
                />
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone
                  size={16}
                  className="text-blue-600"
                />
                Mobile
              </label>

              <input
                name="mobile"
                placeholder="Enter mobile"
                value={form.mobile}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin
                  size={16}
                  className="text-blue-600"
                />
                City
              </label>

              <input
                name="city"
                placeholder="Enter city"
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Briefcase
                  size={16}
                  className="text-blue-600"
                />
                Occupation
              </label>

              <input
                name="occupation"
                placeholder="Enter occupation"
                value={form.occupation}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Salary */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <DollarSign
                  size={16}
                  className="text-blue-600"
                />
                Salary
              </label>

              <input
                name="salary"
                type="number"
                placeholder="Enter salary"
                value={form.salary}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

          </div>

          {/* ==========================================
              FORM BUTTONS
          ========================================== */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:flex">

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              {editingId ? (
                <>
                  <UserPen size={18} />
                  Update User
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Add User
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:w-auto"
              >
                <X size={18} />
                Cancel
              </button>
            )}

          </div>
        </form>

        {/* ==========================================
            USERS CARD
        ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">

          {/* Table / Card Header */}
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">

            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 sm:text-xl">
                <Users
                  size={21}
                  className="text-blue-600"
                />
                Users
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Manage registered users
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm">
              <Users size={15} />
              Total Users: {users.length}
            </div>

          </div>

          {/* ==========================================
              MOBILE VIEW
          ========================================== */}
          <div className="block p-4 sm:hidden">

            {users.length > 0 ? (
              <div className="space-y-4">

                {users.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                  >

                    {/* User Header */}
                    <div className="mb-4 flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <UserRound size={22} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-slate-800">
                            {user.name}
                          </h3>

                          <p className="flex items-center gap-1 text-xs text-slate-500">
                            <Hash size={12} />
                            {user.id}
                          </p>
                        </div>

                      </div>

                      <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        {user.occupation || "N/A"}
                      </span>

                    </div>

                    {/* User Details */}
                    <div className="space-y-3 rounded-lg bg-white p-3">

                      <div className="flex items-start gap-3">
                        <Mail
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Email
                          </p>

                          <p className="break-all text-sm text-slate-700">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Mobile
                          </p>

                          <p className="text-sm text-slate-700">
                            {user.mobile || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            City
                          </p>

                          <p className="text-sm text-slate-700">
                            {user.city || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <DollarSign
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Salary
                          </p>

                          <p className="text-sm font-semibold text-slate-700">
                            {user.salary || "-"}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Mobile Actions */}
                    <div className="mt-4 grid grid-cols-2 gap-2">

                      <button
                        onClick={() => startEdit(user)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div className="py-10 text-center">

                <UserRound
                  size={50}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-medium text-slate-500">
                  No users found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Add a new user using the form above.
                </p>

              </div>
            )}

          </div>

          {/* ==========================================
              DESKTOP / TABLET TABLE
          ========================================== */}
          <div className="hidden overflow-x-auto sm:block">

            <table className="w-full min-w-[900px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
                <tr>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Hash size={14} />
                      ID
                    </div>
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      Name
                    </div>
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Mail size={14} />
                      Email
                    </div>
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Phone size={14} />
                      Mobile
                    </div>
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      City
                    </div>
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      Occupation
                    </div>
                  </th>

                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={14} />
                      Salary
                    </div>
                  </th>

                  <th className="px-4 py-4 text-center font-semibold">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-blue-50/50"
                    >

                      <td className="px-4 py-4 font-medium text-slate-500">
                        #{user.id}
                      </td>

                      <td className="px-4 py-4 font-semibold text-slate-800">
                        {user.name}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {user.mobile || "-"}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {user.city || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                          {user.occupation || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-700">
                        {user.salary || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => startEdit(user)}
                            title="Edit User"
                            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            onClick={() => deleteUser(user.id)}
                            title="Delete User"
                            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-slate-500"
                    >

                      <UserRound
                        size={52}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-medium">
                        No users found
                      </p>

                      <p className="mt-1 text-sm">
                        Add a new user using the form above.
                      </p>

                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <Users size={13} />
          User Management System • React + REST API
        </p>

      </div>
    </div>
  );
}

export default App;

