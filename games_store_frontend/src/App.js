import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { AuthProvider, default as AuthContext } from "./components/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GamesPage from "./pages/GamesPage";
import BuyerDetailsPage from "./pages/BuyerDetailsPage";
// PaymentPage can be just a placeholder for navigation
function PaymentPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--primary-color, #2121ab)",
        paddingTop: "60px",
        color: "#fff",
      }}
    >
      <h2 style={{ fontSize: "2.0rem", margin: "12px 0" }}>Payment Page</h2>
      <p>This is a stub for payment step.</p>
    </div>
  );
}

/**
 * Route wrapper which redirects unauthenticated users to /login.
 */
function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// PUBLIC_INTERFACE
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app" style={{ background: "var(--primary-color, #2121ab)" }}>
          <Header />
          <Navbar />
          {/* To ensure header/navbar are fixed, offset main context by height */}
          <main style={{ paddingTop: "128px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/games"
                element={
                  <PrivateRoute>
                    <GamesPage />
                  </PrivateRoute>
                }
              />
              {/* Add new buyer details page route; must be private */}
              <Route
                path="/buy"
                element={
                  <PrivateRoute>
                    <BuyerDetailsPage />
                  </PrivateRoute>
                }
              />
              {/* Payment stub page */}
              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <PaymentPage />
                  </PrivateRoute>
                }
              />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;