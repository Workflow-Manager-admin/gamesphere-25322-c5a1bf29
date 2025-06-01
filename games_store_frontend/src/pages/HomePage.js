import React from "react";
 
// PUBLIC_INTERFACE
function HomePage() {
  /** The landing page with a prominent, visually striking, centered welcome description.
   * Now follows the global gaming-themed background applied via App.css.
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
        // No background override: let the global App.css set the gaming_bg_sample.jpg!
        position: "relative",
        textAlign: "center",
        paddingTop: 0,
        paddingBottom: 0,
        zIndex: 2,
        background: "transparent", // Ensures no color override, so background image shows
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
        <div
          className="homepage-description times-description"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontWeight: 600,
            fontSize: "2rem",
            lineHeight: 1.44,
            color: "var(--kavia-orange, #E87A41)",
            maxWidth: 740,
            margin: "0 auto",
            padding: "18px 12px 10px 12px",
            letterSpacing: "0.01em",
            borderRadius: "14px",
            background: "rgba(20,22,34,0.56)",
            boxShadow: "0 5px 30px 2px rgba(34,10,34,0.13), 0 1px 9px 0 rgba(255,164,80,0.06)",
            border: "1.5px solid var(--border-color, #fff1)",
            zIndex: 2
          }}
        >
          Arcade Nexus is your ultimate destination to discover, explore, and purchase the best games in a true arcade spirit.<br />
          Immerse yourself in a curated universe of top video games&mdash;all in one visually engaging store!
        </div>
      </div>
    </div>
  );
}

export default HomePage;
