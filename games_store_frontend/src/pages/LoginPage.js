import React, { useState, useContext } from "react";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function LoginPage() {
  /** Mock login/sign-in page. */
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate("/games");
    }
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--primary-color, #2121ab)"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--secondary-color, #16213e)",
          padding: "32px 36px",
          borderRadius: "9px",
          boxShadow: "0 2px 10px 0 rgba(0,0,0,0.13)",
          display: "flex",
          flexDirection: "column",
          minWidth: "300px",
        }}
      >
        <h3 style={{ color: "#fff", textAlign: "center", marginTop: 0 }}>Login / Sign In</h3>
        <input
          type="text"
          placeholder="Enter your gamer name"
          value={username}
          autoFocus
          required
          onChange={e => setUsername(e.target.value)}
          style={{
            margin: "18px 0",
            padding: "10px",
            fontSize: "1.1rem",
            borderRadius: "4px",
            border: "1px solid #444",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            background: "var(--accent-color, #E87A41)",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            padding: "10px 0",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
