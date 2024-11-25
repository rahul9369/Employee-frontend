import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../GlobalContext/Authcontext"; // Import the context hook
import { toast } from "react-toastify";

function Navbar() {
  const { user, dispatch } = useAuthContext(); // Get user state and dispatch function
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user from localStorage
    localStorage.removeItem("user");

    // Dispatch logout action to the context
    dispatch({ type: "LOGOUT" });
    toast.success("User logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left side navigation links */}
      <div>
        <Link to="/" className="mr-4">
          <button>Home</button>
        </Link>

        {/* Show Employees and Add Employee links if logged in */}
        {user && (
          <>
            <Link to="/employees" className="mr-4">
              <button>EmployeeList</button>
            </Link>
          </>
        )}
      </div>

      {/* Right side: Login, User Name, and Logout */}
      <div>
        {!user ? (
          // Show Login button if not logged in
          <Link to="/login">
            <button className="bg-green-500 px-4 py-2 rounded">Login</button>
          </Link>
        ) : (
          // Show user's name and Logout button if logged in
          <div className="flex items-center space-x-4">
            <span className="font-bold">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
