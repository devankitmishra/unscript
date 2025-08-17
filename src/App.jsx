import { useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Pages/Home/Home.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
        <Layout>
          <Home />
        </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
