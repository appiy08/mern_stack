import React from "react";
// Pages & Components 
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <AppRoutes/>
    </React.Fragment>
  );
}

export default App;
