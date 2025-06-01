import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider, default as AuthContext } from "./components/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GamesPage from "./pages/GamesPage";
import BuyerDetailsPage from "./pages/BuyerDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";

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
        <div className="app">
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
              <Route
                path="/confirmation"
                element={
                  <PrivateRoute>
                    <ConfirmationPage />
                  </PrivateRoute>
                }
              />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;