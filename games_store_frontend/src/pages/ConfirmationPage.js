import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * ConfirmationPage
 * Displays a thank you message after successful payment and provides a button to return to Home or Games.
 */
function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where user came from (could return to Games if logged in, else Home)
  const isGames = location.state && location.state.from === "payment";

  // Option: to show game info
  const game = location.state?.game;

  return (
    <div className="auth-center-container" style={{ minHeight: "calc(100vh - 128px)" }}>
      <div
        className="login-card"
        style={{
          maxWidth: 480,
          marginTop: 0,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            color: "#ffd780",
            marginBottom: 10,
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "0.01em"
          }}
        >
          Thank you for your purchase!
        </h2>
        <div style={{ color: "var(--accent-color, #c4abab)", fontSize: "1.18rem", marginBottom: 20 }}>
          {game ? (
            <>
              Your copy of <span style={{ fontWeight: "bold" }}>{game.name}</span> is ready.
              <br />
            </>
          ) : null}
          You can find the game copy in your device application completely installed.
        </div>
        <button
          className="btn btn-large"
          style={{
            maxWidth: 260,
            margin: "0 auto",
            marginBottom: 12,
            marginTop: 10,
            fontSize: "1.09rem"
          }}
          onClick={() => navigate(isGames ? "/games" : "/")}
        >
          {isGames ? "Back to Games" : "Return Home"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
