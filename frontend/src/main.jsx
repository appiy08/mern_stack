import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
// Theme configuration
import theme from "./styles/theme.jsx";
// App Context
import { WorkoutContextProvider } from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <WorkoutContextProvider>
              <App />
            </WorkoutContextProvider>
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
