import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// PUBLIC_INTERFACE
function Navbar() {
  /** The navigation bar with Home, Games, Login/User display. */
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--secondary-color, #16213e)",
        borderBottom: "1px solid var(--border-color, #282c34)",
        height: "56px",
        position: "fixed",
        top: "72px", // header height
        left: 0,
        zIndex: 199,
      }}
      className="navbar"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        {/* Login/User Icon on the left */}
        <button
          aria-label={user ? "Account" : "Login"}
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent-color, #E87A41)",
            fontSize: "1.4rem",
            cursor: "pointer",
            marginRight: "28px",
            fontWeight: "bold",
            outline: "none"
          }}
        >
          {user ? "👤" : "🔐"}
        </button>
        {/* Nav center links */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link
            to="/"
            className="navbar-link"
            style={{
              textDecoration: "none",
              color: "var(--text-color, #fff)",
              fontWeight: "500",
              fontSize: "1.1rem",
              padding: "8px 18px",
              borderRadius: "5px",
              transition: "background 0.2s,color 0.2s",
            }}
          >
            Home
          </Link>
          <Link
            to="/games"
            className="navbar-link"
            style={{
              textDecoration: "none",
              color: "var(--text-color, #fff)",
              fontWeight: "500",
              fontSize: "1.1rem",
              padding: "8px 18px",
              borderRadius: "5px",
              transition: "background 0.2s,color 0.2s",
            }}
          >
            Games
          </Link>
        </div>
        {/* Username on the right if logged in */}
        <div style={{ minWidth: "90px", textAlign: "right", color: "var(--accent-color, #E87A41)", fontWeight: "bold" }}>
          {user ? user : ""}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
