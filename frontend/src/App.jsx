import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// Pages & Components 
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
