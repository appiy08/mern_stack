import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
// Theme configuration
import theme from "./styles/theme.jsx";
import WorkoutContextProvider from "./context/WorkoutContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <WorkoutContextProvider>
          <App />
        </WorkoutContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
