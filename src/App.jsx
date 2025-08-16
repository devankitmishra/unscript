import { useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Pages/Home/Home.jsx";

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
