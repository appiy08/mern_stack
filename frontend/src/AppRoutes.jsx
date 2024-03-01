import { Route, Routes, Navigate } from "react-router-dom";
// Custom
import { useAuthContext } from "./hooks/context/useAuthContext";
// Pages & Components
import Home from "./pages/Home";
import WorkoutCreate from "./pages/WorkoutCreate";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { isEmpty } from "lodash";

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="workout-create" element={<WorkoutCreate />} />
      <Route
        path="signup"
        element={isEmpty(user) ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="login"
        element={isEmpty(user) ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AppRoutes;
