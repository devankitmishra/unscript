import { useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Pages/Home/Home.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Layout>
          <Home />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
