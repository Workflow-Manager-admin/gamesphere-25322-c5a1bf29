import React, { useContext } from "react";
import AuthContext from "../components/AuthContext";

const GAMES = [
  {
    name: "Call of Duty: Black Ops 6",
    price: 3999,
  },
  {
    name: "FIFA 23",
    price: 3299,
  },
  {
    name: "Fortnite",
    price: 0,
  },
  {
    name: "Forza Horizon 6",
    price: 4599,
  },
  {
    name: "Genshin Impact",
    price: 0,
  },
  {
    name: "Gta V",
    price: 2499,
  },
  {
    name: "MINECRAFT",
    price: 1499,
  },
  {
    name: "Mortal Kombat",
    price: 3899,
  },
  {
    name: "Roblox",
    price: 0,
  },
  {
    name: "Black Myth: Wukong",
    price: 4999,
  },
  {
    name: "Elden Ring",
    price: 4799,
  },
  {
    name: "God of War: Ragnarök",
    price: 5499,
  },
];

const PLACEHOLDER_IMAGE =
  require("../assets/placeholder_game_cover.png"); // Local asset, guaranteed available

function formatPriceINR(price) {
  return price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`;
}

// PUBLIC_INTERFACE
function GamesPage() {
  /** The Games listing page; only shown to logged-in users. */
  const { user } = useContext(AuthContext);

  return (
    <div className="games-page-container">
      <h2 className="games-grid-title">
        Hello, {user || "Gamer"}
      </h2>
      <div className="games-grid">
        {GAMES.map((game) => (
          <div key={game.name} className="game-card" tabIndex={0}>
            <img
              src={PLACEHOLDER_IMAGE}
              alt={`${game.name} cover`}
              className="game-card-cover"
            />
            <div className="game-card-title">{game.name}</div>
            <div className="game-card-price">{formatPriceINR(game.price)}</div>
            <div className="game-card-action">
              <button
                disabled
                className="game-card-buy-btn"
                aria-label={`Buy ${game.name}`}
                tabIndex={-1}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
