import React from "react";

// PUBLIC_INTERFACE
function HomePage() {
  /** The landing page with a prominent, visually striking, centered welcome description. */
  return (
    <div
      className="homepage-center-container"
      style={{
        minHeight: "calc(100vh - 128px)",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--primary-color, #2121ab)",
        paddingTop: 0,
        paddingBottom: 0,
        position: "relative",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          className="homepage-title"
          style={{
            fontSize: "4rem",
            margin: "0 0 36px 0",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.02em",
            fontFamily: "'Inter','Arial',sans-serif"
          }}
        >
          Welcome&nbsp;Gamers!
        </h1>
        <div className="homepage-description">
          Arcade Nexus is your ultimate destination to discover, explore, and purchase the best games in a true arcade spirit.<br />
          Immerse yourself in a curated universe of top video games&mdash;all in one visually engaging store!
        </div>
      </div>
    </div>
  );
}

export default HomePage;
