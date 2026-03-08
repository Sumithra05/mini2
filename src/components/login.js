import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const nameRegex = /^[A-Z][a-z]{2,15}$/;

    if (!nameRegex.test(formData.username)) {
      alert("Enter a valid name");
      return;
    }

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    alert("Login Successful ✅");

    navigate("/create");
  };

  return (
    <div className="login-container">
      <h2>Bank Login</h2>

      <form onSubmit={handleSubmit} autoComplete="off">

        <input
          type="text"
          name="username"
          placeholder="Enter Name"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <br /><br />

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;