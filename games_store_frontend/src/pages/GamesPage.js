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
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        color: "#fff",
        background: "var(--primary-color, #2121ab)",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>
        Hello, {user || "Gamer"}
      </h2>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "32px",
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        {GAMES.map((game, idx) => (
          <div
            key={game.name}
            style={{
              background: "var(--secondary-color, #16213e)",
              borderRadius: "15px",
              boxShadow: "0 6px 32px 0 rgba(0,0,0,0.23)",
              padding: "22px 18px 15px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              minHeight: "340px",
            }}
          >
            <img
              src={PLACEHOLDER_IMAGE}
              alt={`${game.name} cover`}
              style={{
                width: "128px",
                height: "170px",
                objectFit: "cover",
                borderRadius: "7px",
                boxShadow: "0 1px 7px 0 #0008",
                marginBottom: "18px",
                background: "rgba(48,48,59,0.58)",
              }}
            />
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.15rem",
                textAlign: "center",
                minHeight: "40px",
                color: "var(--accent-color, #c4abab)"
              }}
            >
              {game.name}
            </div>
            <div
              style={{
                margin: "12px 0 18px 0",
                fontWeight: 600,
                letterSpacing: "1.5px",
                color: "#f1f1f1"
              }}
            >
              {formatPriceINR(game.price)}
            </div>
            <button
              disabled
              className="btn btn-large"
              style={{
                width: "90%",
                opacity: 0.94,
                cursor: "not-allowed",
                background: "var(--kavia-orange, #E87A41)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 0",
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "auto",
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
