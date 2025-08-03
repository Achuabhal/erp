import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/S";
import AboutPage from "./pages/H";
import ContactPage from "./pages/T";
import GenerateForm from "./pages/GenerateForm";
import FeeManagementDashboard from "./pages/F";
import Admission from "./pages/admission";
// Import your pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/h" element={<AboutPage />} />
        <Route path="/t" element={<ContactPage />} />
        <Route path="/imp" element={<GenerateForm />} />
        {/* Add more routes as needed */}
         <Route path="/f" element={<FeeManagementDashboard/>} />
        <Route path="/admission" element={<Admin/>} />       

      </Routes>
    </Router>
  );
}

export default App;