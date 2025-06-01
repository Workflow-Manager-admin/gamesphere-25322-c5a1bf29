import React, { useContext } from "react";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Format INR price or show "Free" for 0.
 */
function formatPriceINR(price) {
  return price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`;
}

// 12 placeholder games - name, price, all same placeholder cover. Free games have price = 0.
const GAMES = [
  { name: "Call of Duty: Black Ops 6", price: 3999 },
  { name: "FIFA 23", price: 3299 },
  { name: "Fortnite", price: 0 },
  { name: "Forza Horizon 6", price: 4599 },
  { name: "Genshin Impact", price: 0 },
  { name: "Gta V", price: 2499 },
  { name: "MINECRAFT", price: 1499 },
  { name: "Mortal Kombat", price: 3899 },
  { name: "Roblox", price: 0 },
  { name: "Black Myth: Wukong", price: 4999 },
  { name: "Elder Ring", price: 4799 },
  { name: "God of War: Ragnarök", price: 5499 },
];

// Use a local placeholder image for all cards
const PLACEHOLDER_IMAGE = require("../assets/placeholder_game_cover.png");

// PUBLIC_INTERFACE
function GamesPage() {
  /** Game store grid UI, always shows 12 visually styled cards. */
  const { user } = useContext(AuthContext);

  return (
    <div className="games-page-main">
      <section className="hero games-hero">
        <h1 className="games-page-main-title">Available Video Games</h1>
        <div className="games-page-main-description">
          Explore, choose your favorite, and buy instantly!
        </div>
      </section>
      <section className="games-grid-section">
        <div className="games-grid">
          {GAMES.map((game) => (
            <div key={game.name} className="game-card" tabIndex={0}>
              <img
                src={PLACEHOLDER_IMAGE}
                alt={`${game.name} cover`}
                className="game-card-cover"
                draggable={false}
                height={136}
                width={136}
              />
              <div className="game-card-title">{game.name}</div>
              <div className="game-card-price">{formatPriceINR(game.price)}</div>
              <div className="game-card-action">
                <button
                  className="game-card-buy-btn"
                  aria-label={`Buy ${game.name}`}
                  tabIndex={0}
                  // Demo disables button, purchase coming soon
                  disabled
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="copyright-bar">
        © {new Date().getFullYear()} Arcade Nexus &middot; GameSphere. All rights reserved.
      </footer>
    </div>
  );
}

export default GamesPage;
