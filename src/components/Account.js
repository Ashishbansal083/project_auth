import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Account = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    const Users = JSON.parse(localStorage.getItem("users"));
    const LoggedUserIndex = Users.findIndex((u) => u.email === email);
    if (LoggedUserIndex !== -1) {
      const updatedUser = { ...Users[LoggedUserIndex], name, email };
      Users[LoggedUserIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(Users));
      login({ name: updatedUser.name, email: updatedUser.email });
      alert("Account information updated successfully");
    } else {
      alert("User not found");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Account Management</h2>
      <form
        className="w-96 bg-white p-6 rounded shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
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
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Save
        </button>
      </form>
      <button
        className="mt-4 text-red-500 hover:underline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
