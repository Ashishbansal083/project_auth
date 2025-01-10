import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";


const Register = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async() => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.some((user)=>user.email===email);

    if(existingUser){
      setError("User with this email already exist");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords does not match");
      return; 
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password:hashedPassword };    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        className="w-96 bg-white p-6 rounded shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register