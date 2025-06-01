import React from "react";

// PUBLIC_INTERFACE
function HomePage() {
  /** The landing page with a welcome message. */
  return (
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--primary-color, #2121ab)",
        paddingTop: "60px"
      }}
    >
      <h2 style={{ fontSize: "2.5rem", margin: "0 0 18px 0", color: "#fff" }}>Welcome Gamers!</h2>
      <p style={{ fontSize: "1.1rem", color: "var(--accent-color, #c4abab)" }}>
        Welcome to Arcade Nexus – Your ultimate destination to discover the best games in a true arcade spirit.
      </p>
    </div>
  );
}

export default HomePage;
