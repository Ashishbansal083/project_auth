import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import bcrypt from "bcryptjs";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async() => {
    const Users = JSON.parse(localStorage.getItem("users")) || [];
    const User = Users.find(u => u.email === email);
    if (User) {
      const isPasswordMatch = await bcrypt.compare(password, User.password); // Compare entered password with hashed password
      if (User && User.email === email && isPasswordMatch) {
        const { name, email } = User;
        login({ name, email }); // Set user in context (only name and email as password should not be available on frontend )
        navigate("/account");
      } else {
        setError("Invalid email or password");
      }
    }else{
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        className="w-96 bg-white p-6 rounded shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
