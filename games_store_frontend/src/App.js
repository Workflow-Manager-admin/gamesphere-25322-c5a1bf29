import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { AuthProvider, default as AuthContext } from "./components/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GamesPage from "./pages/GamesPage";

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