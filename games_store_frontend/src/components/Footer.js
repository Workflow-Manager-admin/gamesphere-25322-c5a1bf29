import React from "react";

/**
 * Footer component: Sticky footer bar for copyright message.
 * Remains fixed at bottom, styled to fit arcade/gaming theme.
 */
// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer className="copyright-bar">
      © {new Date().getFullYear()} Arcade Nexus &middot; GameSphere. All rights reserved.
    </footer>
  );
}

export default Footer;
