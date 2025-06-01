import React from "react";
import arcadeBg from "../assets/arcade_bg_unsplash.jpg";

// PUBLIC_INTERFACE
function HomePage() {
  /** The landing page with a prominent, visually striking, centered welcome description.
   * It uses a unique arcade background that visually distinguishes the homepage.
   */
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
        /* Override global background with the unique arcade background for homepage only */
        backgroundImage: `url(${arcadeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "var(--kavia-dark, #1A1A1A)",
        /* subtle overlay for readability: dark/blue-ish gradient */
        position: "relative",
        textAlign: "center",
        paddingTop: 0,
        paddingBottom: 0,
        zIndex: 2,
      }}
    >
      {/* Overlay for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(22,33,62,0.74) 0%, rgba(33,33,171,0.52) 60%, rgba(204,170,187,0.17) 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div style={{ position: "relative", zIndex: 2 }}>
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
