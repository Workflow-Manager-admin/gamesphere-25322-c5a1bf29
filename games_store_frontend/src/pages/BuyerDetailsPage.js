import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// The list of 12 games and their prices (should match GamesPage)
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

const GENDER_OPTIONS = ["Male", "Female", "Other"];

// PUBLIC_INTERFACE
function BuyerDetailsPage() {
  // If navigated from GamesPage, the game may be sent via state
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get preselected game name from location.state (optional)
  const initialGame =
    location.state && location.state.gameName
      ? location.state.gameName
      : "";

  // Form state
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [game, setGame] = useState(initialGame);
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  // Show price for selected game
  const selectedGame = useMemo(
    () => GAMES.find(g => g.name === game),
    [game]
  );

  // Validation logic for field
  const validateField = (field, value) => {
    if (!value) return "This field is required.";
    switch (field) {
      case "email":
        // Simple regex for email
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
          return "Please provide a valid email address.";
        }
        break;
      case "dob":
        // User must be 10+ years old
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Please enter a valid date.";
        const userDate = new Date(value);
        const now = new Date();
        const age = now.getFullYear() - userDate.getFullYear();
        if (isNaN(userDate.getTime()) || age < 10) {
          return "You must be at least 10 years old.";
        }
        break;
      case "name":
        if (value.length < 2) return "Name must be at least 2 characters.";
        break;
      default:
        return "";
    }
    return "";
  };

  // Aggregate form errors
  const errors = {
    name: touched.name ? validateField("name", name) : "",
    dob: touched.dob ? validateField("dob", dob) : "",
    email: touched.email ? validateField("email", email) : "",
    gender: touched.gender ? (!gender ? "Required" : "") : "",
    game: touched.game ? (!game ? "Required" : "") : "",
  };

  const isFormValid =
    name &&
    !validateField("name", name) &&
    dob &&
    !validateField("dob", dob) &&
    email &&
    !validateField("email", email) &&
    gender &&
    game;

  // PUBLIC_INTERFACE
  function handleProceedToPay(e) {
    e.preventDefault();
    setTouched({
      name: true,
      dob: true,
      email: true,
      gender: true,
      game: true,
    });

    // Check again before submit
    if (!isFormValid) {
      setFormError("Please fill all fields correctly.");
      return;
    }
    setFormError("");
    // Example: pass form data to PaymentPage (use state, context, or query params as needed)
    navigate("/payment", {
      state: {
        buyer: { name, dob, email, gender },
        game: selectedGame,
      },
    });
  }

  // For dynamic price display
  const formatPrice = price =>
    price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="auth-center-container" style={{ minHeight: "calc(100vh - 128px)" }}>
      <form
        className="login-card"
        style={{ maxWidth: 470, marginTop: 0 }}
        autoComplete="off"
        aria-label="Buyer details form"
        onSubmit={handleProceedToPay}
      >
        <h3 className="auth-form-title">Buyer Details</h3>
        <label className="auth-form-label">
          Name
          <input
            className="auth-form-input"
            type="text"
            value={name}
            required
            minLength={2}
            maxLength={32}
            placeholder="Enter name"
            onChange={e => setName(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, name: true }))}
            aria-label="Name"
          />
          {errors.name && (
            <div className="auth-form-error">{errors.name}</div>
          )}
        </label>
        <label className="auth-form-label">
          Date of Birth
          <input
            className="auth-form-input"
            type="date"
            value={dob}
            required
            onChange={e => setDob(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, dob: true }))}
            aria-label="Date of birth"
            max={new Date().toISOString().substring(0, 10)}
          />
          {errors.dob && (
            <div className="auth-form-error">{errors.dob}</div>
          )}
        </label>
        <label className="auth-form-label">
          Email
          <input
            className="auth-form-input"
            type="email"
            value={email}
            required
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            aria-label="Email"
          />
          {errors.email && (
            <div className="auth-form-error">{errors.email}</div>
          )}
        </label>
        <label className="auth-form-label">
          Gender
          <select
            className="auth-form-input"
            value={gender}
            required
            onChange={e => setGender(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, gender: true }))}
            aria-label="Gender"
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map(opt => (
              <option value={opt} key={opt}>{opt}</option>
            ))}
          </select>
          {errors.gender && (
            <div className="auth-form-error">{errors.gender}</div>
          )}
        </label>
        <label className="auth-form-label">
          Game
          <select
            className="auth-form-input"
            value={game}
            required
            onChange={e => setGame(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, game: true }))}
            aria-label="Game"
          >
            <option value="">Select game</option>
            {GAMES.map(g => (
              <option value={g.name} key={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.game && (
            <div className="auth-form-error">{errors.game}</div>
          )}
        </label>
        {game && selectedGame && (
          <div style={{
            marginTop: 8,
            marginBottom: 10,
            color: "#ffd780",
            fontSize: "1.13rem",
            fontWeight: 500
          }}>
            Game Price: {formatPrice(selectedGame.price)}
          </div>
        )}
        {formError && (
          <div className="auth-form-error">{formError}</div>
        )}
        <button
          type="submit"
          className="btn btn-large"
          aria-label="Proceed to Pay"
          disabled={!isFormValid}
          style={{ marginTop: 12 }}
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}

export default BuyerDetailsPage;
