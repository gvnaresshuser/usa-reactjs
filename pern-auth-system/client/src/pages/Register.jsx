import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
//npm install sweetalert2

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

try {
  await axios.post("http://localhost:5000/api/auth/register", form);

  await Swal.fire({
    icon: "success",
    title: "Registration Successful!",
    text: "Your account has been created successfully.",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: "#ffffff",
    color: "#333333",
    iconColor: "#16a34a",
  });

  navigate("/login", { replace: true });
} catch (err) {
  await Swal.fire({
    icon: "error",
    title: "Registration Failed!",
    text: "Unable to register. Please try again.",
    confirmButtonText: "OK",
    confirmButtonColor: "#2563eb",
  });
} finally {
  setIsLoading(false);
}

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full
                               flex items-center justify-center gap-2
                               hover:bg-blue-600
                               disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                d="M12 2a10 10 0 0 1 10 10"
              />
            </svg>
          )}

          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
