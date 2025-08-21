import { useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Pages/Home/Home.jsx";
import Account from "./Pages/Account/Account.jsx"; // <-- import your account page
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} /> {/* New route */}
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;