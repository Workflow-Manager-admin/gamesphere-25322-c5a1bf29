import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * The PaymentPage component lets the user choose a payment method (Card or UPI),
 * renders the relevant fields, and provides a confirm button for proceeding.
 * Buyer and game info can be accessed from navigation state (location.state).
 */
// PUBLIC_INTERFACE
function PaymentPage() {
  const location = useLocation();
  const { buyer, game } = location.state || {};

  // Payment method: "card" or "upi"
  const [paymentMethod, setPaymentMethod] = useState("card");
  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  // UPI fields
  const [upiId, setUpiId] = useState("");

  // Error states
  const [formError, setFormError] = useState("");
  const [touched, setTouched] = useState({});

  // Format price for display
  function formatPrice(price) {
    return price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`;
  }

  // Simple validation
  function validate() {
    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 12)
        return "Please enter a valid card number.";
      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry))
        return "Please enter expiry in MM/YY format.";
      if (!cardCVV || cardCVV.length < 3)
        return "Please enter a valid 3-digit CVV.";
    }
    if (paymentMethod === "upi") {
      if (!upiId || !/^[\w.\-]{2,}@[\w\-]{2,}$/.test(upiId))
        return "Please enter a valid UPI ID (e.g., name@bank).";
    }
    return "";
  }

  const isFormValid = (() => {
    if (paymentMethod === "card") {
      return (
        cardNumber.replace(/\s/g, "").length >= 12 &&
        /^\d{2}\/\d{2}$/.test(cardExpiry) &&
        cardCVV.length >= 3
      );
    }
    if (paymentMethod === "upi") {
      return /^[\w.\-]{2,}@[\w\-]{2,}$/.test(upiId);
    }
    return false;
  })();

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ payment: true });
    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    // Advance to "next step" (e.g., show confirmation, simulate payment, etc.)
    // For now, just alert and/or later invoke navigation as needed
    alert("Payment processed! (Mock implementation)");
    // Optionally: navigate or update state for confirmation
  }

  return (
    <div className="auth-center-container" style={{ minHeight: "calc(100vh - 128px)" }}>
      <form
        className="login-card"
        style={{ maxWidth: 420, marginTop: 0 }}
        autoComplete="off"
        aria-label="Payment form"
        onSubmit={handleSubmit}
      >
        <h3 className="auth-form-title" style={{ marginBottom: 18 }}>
          Payment Details
        </h3>
        {/* Optionally show buyer & game for context */}
        {buyer && game && (
          <div style={{ marginBottom: 10, fontSize: "1rem", color: "#ffd780" }}>
            Buying: <b>{game.name}</b>
            {game.price !== undefined && (
              <span> &ndash; {formatPrice(game.price)}</span>
            )}
            <br />
            Buyer: <b>{buyer.name}</b>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            marginBottom: 22,
          }}
        >
          <button
            type="button"
            className={`login-mode-btn${paymentMethod === "card" ? " active" : ""}`}
            style={{
              borderRadius: "7px 0 0 7px",
              minWidth: 90,
            }}
            onClick={() => setPaymentMethod("card")}
            disabled={paymentMethod === "card"}
            aria-pressed={paymentMethod === "card"}
          >
            Card
          </button>
          <button
            type="button"
            className={`login-mode-btn${paymentMethod === "upi" ? " active" : ""}`}
            style={{
              borderRadius: "0 7px 7px 0",
              minWidth: 90,
            }}
            onClick={() => setPaymentMethod("upi")}
            disabled={paymentMethod === "upi"}
            aria-pressed={paymentMethod === "upi"}
          >
            UPI
          </button>
        </div>
        {paymentMethod === "card" && (
          <>
            <label className="auth-form-label">
              Card Number
              <input
                className="auth-form-input"
                type="text"
                maxLength={19}
                value={cardNumber}
                required
                inputMode="numeric"
                placeholder="e.g., 1234 5678 9012 3456"
                onChange={e => setCardNumber(e.target.value.replace(/[^\d ]/g, ""))}
                onBlur={() => setTouched(t => ({ ...t, cardNumber: true }))}
                aria-label="Card number"
              />
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <label className="auth-form-label" style={{ flex: 1 }}>
                Expiry (MM/YY)
                <input
                  className="auth-form-input"
                  type="text"
                  maxLength={5}
                  value={cardExpiry}
                  required
                  placeholder="MM/YY"
                  onChange={e => setCardExpiry(
                    e.target.value.replace(/^(\d\d)(?!\/)/, '$1/').replace(/[^\d/]/g, "").slice(0, 5)
                  )}
                  onBlur={() => setTouched(t => ({ ...t, cardExpiry: true }))}
                  aria-label="Card expiry"
                />
              </label>
              <label className="auth-form-label" style={{ flex: 1 }}>
                CVV
                <input
                  className="auth-form-input"
                  type="password"
                  maxLength={4}
                  value={cardCVV}
                  required
                  inputMode="numeric"
                  placeholder="123"
                  onChange={e => setCardCVV(e.target.value.replace(/[^\d]/g, ""))}
                  onBlur={() => setTouched(t => ({ ...t, cardCVV: true }))}
                  aria-label="CVV"
                />
              </label>
            </div>
          </>
        )}
        {paymentMethod === "upi" && (
          <label className="auth-form-label">
            UPI ID
            <input
              className="auth-form-input"
              type="text"
              value={upiId}
              required
              placeholder="e.g., username@bank"
              onChange={e => setUpiId(e.target.value.trim())}
              onBlur={() => setTouched(t => ({ ...t, upiId: true }))}
              aria-label="UPI ID"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </label>
        )}
        {formError && (
          <div className="auth-form-error" style={{ marginTop: 8 }}>
            {formError}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-large"
          aria-label="Confirm Pay"
          disabled={!isFormValid}
          style={{ marginTop: 14 }}
        >
          Confirm Pay
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
