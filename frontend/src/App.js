import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;