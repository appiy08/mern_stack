import { useAuthContext } from "../context/useAuthContext";
import { Cookies } from "react-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const cookies = new Cookies();

  const logout = () => {
    // Remove Users Cookies
    cookies.remove("user");

    // Dispatch Logout Action
    dispatch({ type: "LOGOUT" });
  };
  
  return {logout};
};
