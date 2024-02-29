import { Route, Routes } from "react-router-dom";
// Pages & Components
import Home from "./pages/Home";
import WorkoutCreate from "./pages/WorkoutCreate";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="workout-create" element={<WorkoutCreate />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
