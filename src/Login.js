import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post("http://localhost:8000/api/auth/login", formData)
      .then((response) => {
        const { data } = response;
        // Store the token in local storage
        localStorage.setItem("token", data.token);
        onLogin(data.token);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form>
    //     <div>
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         placeholder="Enter your username"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="Enter your password"
    //       />
    //     </div>
    //     {error && <p>{error}</p>}
    //     <button type="button" onClick={handleLogin}>
    //       Login
    //     </button>
    //   </form>
    // </div>

    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
