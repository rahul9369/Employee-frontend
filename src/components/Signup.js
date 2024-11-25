import React, { useState } from "react";
import { useSignup } from "../Hooks/useSignup";

function Signup() {
  // Corrected the component name to start with an uppercase letter
  const [user, setUser] = useState({ username: "", password: "" });
  const { signup, signupError, loading } = useSignup(); // Hook to handle signup logic

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    signup(user.username, user.password); // Call the signup function from the hook
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Signup Form</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            value={user.username}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            value={user.password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Signing up..." : "Submit"}
        </button>
        {signupError && (
          <p className="text-red-500 text-sm mt-2">{signupError}</p>
        )}
      </form>
    </div>
  );
}

export default Signup;
