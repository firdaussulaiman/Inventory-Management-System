import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/landingPage.js"; // Import with correct capitalization
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Use the imported component */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
