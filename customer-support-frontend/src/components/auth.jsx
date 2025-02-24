import React, { useState } from "react";
import { registerUser, loginUser } from "../services/api";
import "../styles/auth.css";

const Auth = ({ isRegister, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = isRegister ? await registerUser({ username, password }) : await loginUser({ username, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.role);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{isRegister ? "Register" : "Login"}</button>
    </form>
  );
};

export default Auth;
