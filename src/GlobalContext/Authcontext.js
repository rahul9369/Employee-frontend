import { createContext, useEffect, useReducer, useContext } from "react";

const AuthContext = createContext();

// Reducer for handling authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }; // Set the authenticated user
    case "LOGOUT":
      return { user: null }; // Clear the user on logout
    default:
      return state;
  }
};

export const AuthcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Check if a user is already logged in when the app loads
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
    if (user) {
      dispatch({ type: "LOGIN", payload: user }); // Login with the retrieved user
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
