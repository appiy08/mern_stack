import React from "react";
import { Route, Routes } from "react-router-dom";
// Pages & Components 
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkoutCreate from "./pages/WorkoutCreate";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="workout-create" element={<WorkoutCreate/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
