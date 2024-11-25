import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../GlobalContext/Authcontext"; // Import the context hook

function HomePage() {
  const { user } = useAuthContext(); // Get user state from context

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        {/* Home Page Content */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Welcome to the Employee Management System
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Manage employee records with ease. Add, edit, or delete employee
          details.
        </p>

        {/* Show different content based on login state */}
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hello, {user.name}!
            </h2>
            <p className="text-md text-gray-500 mb-6">
              You are logged in. You can now manage employee records.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/employees"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transform transition-all duration-200 hover:bg-blue-700 hover:scale-105">
                View Employees
              </Link>
              <Link
                to="/add-employee"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium transform transition-all duration-200 hover:bg-green-700 hover:scale-105">
                Add Employee
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome, Guest!
            </h2>
            <p className="text-md text-gray-500 mb-6">
              Please log in or sign up to access employee management features.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transform transition-all duration-200 hover:bg-blue-700 hover:scale-105">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium transform transition-all duration-200 hover:bg-green-700 hover:scale-105">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
