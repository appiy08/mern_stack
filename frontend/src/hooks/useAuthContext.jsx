import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside a AuthContextProvider");
  }

  return context;
};

useAuthContext.propTypes = {};

export default useAuthContext;
