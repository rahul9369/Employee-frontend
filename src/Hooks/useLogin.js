import { useState } from "react";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const useLogin = () => {
  const { dispatch } = useAuthContext(); // Access the AuthContext
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(false); // Loading state
  const [loginError, setLoginError] = useState(null); // Error state

  const login = async (username, password) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      }); // Send login request
      const data = response.data;

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Dispatch login action to context
      dispatch({ type: "LOGIN", payload: data });
      toast.success("User logged in successfully");

      // Navigate to the home page after successful login
      navigate("/");

      setLoading(false); // Stop loading
    } catch (err) {
      console.error(err.response?.data?.error || "Login failed");
      setLoginError(
        err.response?.data?.error || "An error occurred during login"
      ); // Set error message
      setLoading(false); // Stop loading
      toast.error("Signup failed");
    }
  };

  return { login, loginError, loading };
};
