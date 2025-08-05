import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/S";
import AboutPage from "./pages/H";
import ContactPage from "./pages/T";
import GenerateForm from "./pages/GenerateForm";
import FeeManagementDashboard from "./pages/F";
import Admission from "./pages/admission";
import SUPER from "./pages/superadmin"
import ADMIN from "./pages/admin";
import APPLY from "./pages/apply";
import Q from "./pages/quiz";
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
        <Route path="/admission" element={<Admission/>} />
        <Route path="/super" element={<SUPER/>} />
        <Route path="/admin" element={<ADMIN/>} />
        <Route path="/apply" element={<APPLY/>} />
        <Route path="/qu" element={<Q/>} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;