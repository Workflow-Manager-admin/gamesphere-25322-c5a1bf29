import React from "react";

// PUBLIC_INTERFACE
function Header() {
  /** Header displayed at the top of every page. */
  return (
    <header
      style={{
        width: "100%",
        background: "var(--primary-color, #2121ab)",
        color: "var(--text-color, #fff)",
        padding: "24px 0 8px 0",
        textAlign: "center",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "2.25rem",
        letterSpacing: "1px",
        borderBottom: "1px solid var(--border-color, #282c34)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 200,
      }}
      role="banner"
    >
      Arcade Nexus
    </header>
  );
}

export default Header;
