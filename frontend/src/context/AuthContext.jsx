import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import { Cookies } from "react-cookie";

export const AuthContext = createContext();

const cookies = new Cookies();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { user: action.payload };
    }
    case "LOGOUT": {
      return { user: null };
    }
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  useEffect(() => {
    const user = cookies.get("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
