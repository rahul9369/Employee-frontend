import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "../Hooks/useLogin";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { ColorRing } from "react-loader-spinner";

function Login() {
  const [User, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(User);
    setLoading(true);
    login(User.username, User.password);
    setLoading(false);
  };

  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get user state and dispatch function

  useEffect(() => {
    if (user !== null) {
      navigate(-1);
    }
  }, [user]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Login Form</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Username Field */}
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
            value={User.username}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password Field */}
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
            value={User.password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Login
        </button> */}
        {/* Submit */}
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition relative flex items-center justify-center ${
            loading ? "opacity-75 pointer-events-none" : ""
          }`}>
          {loading ? (
            <ColorRing visible={true} height="40" width="40" colors={[]} />
          ) : (
            "Login"
          )}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
