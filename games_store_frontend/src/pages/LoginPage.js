import React, { useState, useContext } from "react";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * LoginPage renders the login/sign-in form, manages mode switch (login/sign-in),
 * allows username entry (and mock email/password for sign-in), submits to global AuthContext,
 * and redirects to /games upon success.
 */
// PUBLIC_INTERFACE
function LoginPage() {
  // UI state: mode ("login" or "signin"), input fields, error states
  const [mode, setMode] = useState("login"); // "login" = returning user; "signin" = new user
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Only for "sign in"
  const [password, setPassword] = useState(""); // Only for "sign in"
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleModeSwitch(newMode) {
    setMode(newMode);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }
    if (mode === "signin") {
      if (!email.trim()) {
        setError("Please enter an email address.");
        return;
      }
      if (!password.trim()) {
        setError("Please enter a password.");
        return;
      }
      // All fields are filled for sign in.
      login(username.trim());
      navigate("/games");
      return;
    }
    // Login mode: Only user name required
    login(username.trim());
    navigate("/games");
  }

  return (
    <div className="auth-center-container">
      <form
        onSubmit={handleSubmit}
        className="login-card"
        autoComplete="off"
        aria-label={mode === "login" ? "Login form" : "Sign in form"}
      >
        <div className="login-mode-buttons">
          <button
            type="button"
            className={`login-mode-btn${mode === "login" ? " active" : ""}`}
            onClick={() => handleModeSwitch("login")}
            disabled={mode === "login"}
            aria-pressed={mode === "login"}
          >
            Login
          </button>
          <button
            type="button"
            className={`login-mode-btn${mode === "signin" ? " active" : ""}`}
            onClick={() => handleModeSwitch("signin")}
            disabled={mode === "signin"}
            aria-pressed={mode === "signin"}
          >
            Sign In
          </button>
        </div>
        <h3 className="auth-form-title">
          {mode === "login"
            ? "Welcome Back!"
            : "Create your Arcade Nexus account"}
        </h3>
        <label className="auth-form-label">
          Gamer Name
          <input
            type="text"
            className="auth-form-input"
            placeholder="Enter your gamer name"
            value={username}
            autoFocus
            required
            minLength={2}
            maxLength={16}
            onChange={e => setUsername(e.target.value.replace(/\s/g, ""))}
            aria-label="Gamer name"
          />
        </label>
        {mode === "signin" && (
          <>
            <label className="auth-form-label">
              Email
              <input
                type="email"
                className="auth-form-input"
                placeholder="Enter your email address"
                value={email}
                required
                maxLength={32}
                onChange={e => setEmail(e.target.value.trim())}
                autoComplete="username"
                aria-label="Email"
              />
            </label>
            <label className="auth-form-label">
              Password
              <input
                type="password"
                className="auth-form-input"
                placeholder="Enter a password"
                value={password}
                required
                minLength={4}
                maxLength={24}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                aria-label="Password"
              />
            </label>
          </>
        )}
        {error && (
          <div className="auth-form-error">{error}</div>
        )}
        <button
          type="submit"
          className="btn btn-large"
          aria-label={mode === "login" ? "Log in" : "Sign up"}
          style={{ marginTop: "12px" }}
        >
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
        {mode === "login" ? (
          <div className="auth-form-switch">
            New here?{" "}
            <button
              className="auth-form-switch-btn"
              type="button"
              onClick={() => handleModeSwitch("signin")}
              tabIndex={0}
            >
              Sign up instead
            </button>
          </div>
        ) : (
          <div className="auth-form-switch">
            Already have an account?{" "}
            <button
              className="auth-form-switch-btn"
              type="button"
              onClick={() => handleModeSwitch("login")}
              tabIndex={0}
            >
              Log in instead
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
