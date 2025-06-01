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
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--primary-color, #2121ab)",
        paddingTop: "30px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--secondary-color, #16213e)",
          padding: "36px 38px 32px 38px",
          borderRadius: "11px",
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.14)",
          display: "flex",
          flexDirection: "column",
          minWidth: "335px",
          maxWidth: "95vw",
        }}
        autoComplete="off"
        aria-label={mode === "login" ? "Login form" : "Sign in form"}
      >
        <div style={{
          display: "flex",
          gap: 0,
          marginBottom: "24px",
          borderRadius: "7px",
          overflow: "hidden",
          boxShadow: "0 1px 9px 0 #0004"
        }}>
          <button
            type="button"
            onClick={() => handleModeSwitch("login")}
            disabled={mode === "login"}
            style={{
              flex: 1,
              background: mode === "login" ? "var(--kavia-orange, #E87A41)" : "transparent",
              color: mode === "login" ? "#fff" : "#c4abab",
              border: "none",
              fontWeight: 700,
              fontSize: "1.08rem",
              padding: "12px 0",
              cursor: mode === "login" ? "default" : "pointer",
              transition: "background 0.2s",
            }}
            aria-pressed={mode === "login"}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch("signin")}
            disabled={mode === "signin"}
            style={{
              flex: 1,
              background: mode === "signin" ? "var(--kavia-orange, #E87A41)" : "transparent",
              color: mode === "signin" ? "#fff" : "#c4abab",
              border: "none",
              fontWeight: 700,
              fontSize: "1.08rem",
              padding: "12px 0",
              cursor: mode === "signin" ? "default" : "pointer",
              transition: "background 0.2s",
            }}
            aria-pressed={mode === "signin"}
          >
            Sign In
          </button>
        </div>
        {mode === "login" && (
          <h3 style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: 600,
            margin: "0 0 10px 0"
          }}>Welcome Back!</h3>
        )}
        {mode === "signin" && (
          <h3 style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: 600,
            margin: "0 0 10px 0"
          }}>Create your Arcade Nexus account</h3>
        )}
        <label style={{ color: "#eee", fontWeight: 500, marginBottom: 2, fontSize: "1.01rem" }}>
          Gamer Name
          <input
            type="text"
            placeholder="Enter your gamer name"
            value={username}
            autoFocus
            required
            minLength={2}
            maxLength={16}
            onChange={e => setUsername(e.target.value.replace(/\s/g, ""))}
            style={{
              margin: "7px 0 18px 0",
              padding: "10px",
              fontSize: "1.09rem",
              borderRadius: "4px",
              border: "1px solid #444",
              outline: "none",
              background: "#25254a",
              color: "#fff"
            }}
            aria-label="Gamer name"
          />
        </label>
        {mode === "signin" && (
          <>
            <label style={{ color: "#eee", fontWeight: 500, marginBottom: 2 }}>
              Email
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                required
                maxLength={32}
                onChange={e => setEmail(e.target.value.trim())}
                style={{
                  margin: "7px 0 18px 0",
                  padding: "10px",
                  fontSize: "1.05rem",
                  borderRadius: "4px",
                  border: "1px solid #444",
                  outline: "none",
                  background: "#25254a",
                  color: "#fff"
                }}
                autoComplete="username"
                aria-label="Email"
              />
            </label>
            <label style={{ color: "#eee", fontWeight: 500, marginBottom: 2 }}>
              Password
              <input
                type="password"
                placeholder="Enter a password"
                value={password}
                required
                minLength={4}
                maxLength={24}
                onChange={e => setPassword(e.target.value)}
                style={{
                  margin: "7px 0 18px 0",
                  padding: "10px",
                  fontSize: "1.05rem",
                  borderRadius: "4px",
                  border: "1px solid #444",
                  outline: "none",
                  background: "#25254a",
                  color: "#fff"
                }}
                autoComplete="new-password"
                aria-label="Password"
              />
            </label>
          </>
        )}
        {error && (
          <div style={{
            background: "#b11b1bc2",
            color: "white",
            margin: "6px 0 12px 0",
            borderRadius: "5px",
            padding: "7px 0",
            fontSize: "1rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            background: "var(--kavia-orange, #E87A41)",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            padding: "11px 0",
            fontSize: "1.11rem",
            cursor: "pointer",
            marginTop: "10px",
            boxShadow: "0 2px 6px 0 #0006"
          }}
          aria-label={mode === "login" ? "Log in" : "Sign up"}
        >
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
        {mode === "login" ? (
          <div style={{
            color: "var(--text-secondary, #aaa)",
            fontSize: "0.96rem",
            textAlign: "center",
            marginTop: "18px"
          }}>
            New here?{" "}
            <button
              style={{
                color: "var(--kavia-orange, #E87A41)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
                outline: "none",
                fontSize: "1rem"
              }}
              type="button"
              onClick={() => handleModeSwitch("signin")}
              tabIndex={0}
            >
              Sign up instead
            </button>
          </div>
        ) : (
          <div style={{
            color: "var(--text-secondary, #aaa)",
            fontSize: "0.96rem",
            textAlign: "center",
            marginTop: "18px"
          }}>
            Already have an account?{" "}
            <button
              style={{
                color: "var(--kavia-orange, #E87A41)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
                outline: "none",
                fontSize: "1rem"
              }}
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
