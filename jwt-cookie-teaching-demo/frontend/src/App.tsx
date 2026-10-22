import { useEffect, useState } from "react";
import api from "./api";
import { resetLoginRedirect } from "./api";
type User = { id: number; name: string; email: string };
type Mode = "login" | "register";

export default function App() {
  const [mode, setMode] = useState<Mode>("login");
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Checking session...");
  const [busy, setBusy] = useState(false);

  const loadMe = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.data.user);
      setMessage("You are authenticated.");
    } catch {
      setUser(null);
      setMessage("Please log in to continue.");
    }
  };

useEffect(() => {
  void loadMe();

  const onExpired = () => {
    setUser(null);
    setMode("login");
    setPassword("");
    setMessage("Your session expired. Please log in again.");
  };

  window.addEventListener("auth-expired", onExpired);

  return () => {
    window.removeEventListener("auth-expired", onExpired);
  };
}, []);


  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      if (mode === "register") {
        await api.post("/auth/register", { name, email, password });
        setMessage("Registration successful. You can now log in.");
        setMode("login");
      } else {
        const response = await api.post("/auth/login", { email, password });
        resetLoginRedirect();
        setUser(response.data.data.user);
        setMessage("Login successful.");
      }
      setPassword("");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(err.response?.data?.message ?? "Request failed. Check the backend and database.");
    } finally {
      setBusy(false);
    }
  };

  const protectedCall = async () => {
    setBusy(true);
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.data.user);
      setMessage("Protected API succeeded. If the access token expired, Axios refreshed it and retried this request.");
    } catch {
      setMessage("Protected request failed. Please log in again.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      setMessage("Logged out. Cookies were cleared.");
    } catch {
      setMessage("Logout request failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="page">
      <section className="card">
        <div className="brand">🔐</div>
        <h1>JWT Cookie Demo</h1>
        <p className="subtitle">Access token · Refresh token · Rotation</p>
        <div className="message" role="status">{message}</div>

        {user ? (
          <div className="dashboard">
            <h2>Welcome, {user.name}</h2>
            <p>{user.email}</p>
            <div className="info">
              <strong>Protected dashboard</strong>
              <span>User ID: {user.id}</span>
              <span>Tokens are held in HTTP-only cookies—not localStorage.</span>
            </div>
            <button disabled={busy} onClick={() => void protectedCall()}>
              {busy ? "Please wait..." : "Call protected API"}
            </button>
            <button className="secondary" disabled={busy} onClick={() => void logout()}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="tabs">
              <button className={mode === "login" ? "tab active" : "tab"} onClick={() => setMode("login")}>Login</button>
              <button className={mode === "register" ? "tab active" : "tab"} onClick={() => setMode("register")}>Register</button>
            </div>
            <form onSubmit={(event) => void submit(event)}>
              {mode === "register" && (
                <label>
                  Full name
                  <input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} autoComplete="name" />
                </label>
              )}
              <label>
                Email
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
              </label>
              <label>
                Password
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={mode === "register" ? 8 : 1} autoComplete={mode === "register" ? "new-password" : "current-password"} />
              </label>
              <button type="submit" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Login" : "Create account"}</button>
            </form>
          </>
        )}
        <p className="footer">Teaching flow: Login → wait 10 seconds → Call protected API → refresh rotates → request retries.</p>
      </section>
    </main>
  );
}
