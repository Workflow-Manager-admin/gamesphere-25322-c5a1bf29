import React, { useContext } from "react";
import AuthContext from "../components/AuthContext";

// PUBLIC_INTERFACE
function GamesPage() {
  /** The Games listing page; only shown to logged-in users. */
  const { user } = useContext(AuthContext);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        color: "#fff",
        background: "var(--primary-color, #2121ab)"
      }}
    >
      <h2 style={{ fontSize: "2rem" }}>Hello, {user || "Gamer"}</h2>
      <p>Browse the latest games below (coming soon)...</p>
    </div>
  );
}

export default GamesPage;
