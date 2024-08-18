import { createContext, useEffect, useReducer } from "react";

// Backend URL
const BASE_URL = "https://tour-and-trevel-management-system-backend.onrender.com";

// Initial state
const initial_state = {
  user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

// AuthReducer to manage the authentication state
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,  // Save the new user on registration success
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  // Save user to localStorage on state.user change
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  // Function to handle login
  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: data.message });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  // Function to handle registration
  const register = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "REGISTER_SUCCESS", payload: data });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: data.message });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  // Function to handle logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
