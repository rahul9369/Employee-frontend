import { useState } from "react";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { NODEAPI } from "../utils/utils";

export const useSignup = () => {
  const { dispatch } = useAuthContext(); // Access the AuthContext
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(false); // Loading state
  const [signupError, setSignupError] = useState(null); // Error state

  const signup = async (username, password) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${NODEAPI}/signup`, {
        username,
        password,
      }); // Send signup request
      const data = response.data;

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Dispatch login action to context
      dispatch({ type: "LOGIN", payload: data });

      toast.success("User signup in successfully");

      // Navigate to the home page after successful signup
      navigate("/");

      setLoading(false); // Stop loading
    } catch (err) {
      console.error(err.response?.data?.error || "Signup failed");
      setSignupError(
        err.response?.data?.error || "An error occurred during signup"
      ); // Set error message
      setLoading(false); // Stop loading
      toast.error("Signup failed");
    }
  };

  return { signup, signupError, loading };
};
