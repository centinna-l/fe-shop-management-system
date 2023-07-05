import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddProductPage from "./AddProduct";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={loggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/add-product"
          element={loggedIn ? <AddProductPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
