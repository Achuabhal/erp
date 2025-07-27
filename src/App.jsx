import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/S";
import AboutPage from "./pages/H";
import ContactPage from "./pages/T";
import FeeManagementDashboard from "./pages/F";

// Import your pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/h" element={<AboutPage />} />
        <Route path="/t" element={<ContactPage />} />
                <Route path="/f" element={<FeeManagementDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;