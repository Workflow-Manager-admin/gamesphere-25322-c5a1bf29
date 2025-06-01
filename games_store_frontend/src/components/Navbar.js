import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

/**
 * The navigation bar with Home, Games, and contextual login/user display.
 */
function Navbar() {
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
        {/* Left side: Only shows login icon if NOT logged in */}
        {!user && (
          <button
            aria-label="Login"
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
            🔐
          </button>
        )}
        {/* If logged in, left is just a spacer for layout alignment */}
        {user && (
          <div style={{ width: "44px", minWidth: "28px", marginRight: "28px" }} />
        )}
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
        {/* Username on the right if logged in; blank if not */}
        <div
          style={{
            minWidth: "90px",
            textAlign: "right",
            color: "var(--accent-color, #E87A41)",
            fontWeight: "bold",
            fontSize: "1.11rem",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {user ? user : ""}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
