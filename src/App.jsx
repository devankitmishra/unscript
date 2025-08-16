import { useState } from "react";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import Layout from "./Layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Home />
      </Layout>
    </AuthProvider>
  );
}

export default App;
