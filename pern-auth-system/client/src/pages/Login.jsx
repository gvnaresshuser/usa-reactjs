import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; //npm install jwt-decode
import { useNavigate, Link } from "react-router-dom"; // <- Import Link
import { Toast } from "../toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );
      const token = res.data.token;
      const decoded = jwtDecode(token);
      console.log(decoded);

      localStorage.setItem("token", token);

      //--------------------- TOAST ----------------------------
      // ✅ Show Toast on success
      Toast.fire({
        icon: "success",
        title: "🎉 Logged in Successfully!",
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        color: "#fff",
        customClass: {
          popup: "colored-toast",
        },
      });
      //--------------------- TOAST ----------------------------

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed, Invalid credentials");
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
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
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
          className="bg-green-500 text-white px-4 py-2 rounded w-full
               flex items-center justify-center gap-2
               hover:bg-green-600
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
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}

          {isLoading ? "Logging..." : "Login"}
        </button>

        <p style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={() =>
              setForm({
                email: "test@gmail.com",
                password: "123456",
              })
            }
            className="inline-block px-3 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-mono cursor-pointer hover:opacity-80"
          >
            test@gmail.com / 123456
          </button>
        </p>
        <hr></hr>
        <p style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={() =>
              setForm({
                email: "admin@gmail.com",
                password: "123456",
              })
            }
            className="inline-block px-3 py-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-mono cursor-pointer hover:opacity-80"
          >
            admin@gmail.com / 123456
          </button>
        </p>

        <p className="text-center text-sm mt-4">
          Not registered?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
