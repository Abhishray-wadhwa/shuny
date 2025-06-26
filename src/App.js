// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import ShunyLandingPage from "./pages/ShunyLandingPage";
import RecommendationPage from "./pages/RecommendationPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserJourneyPage from "./pages/UserJourneyPage";
import PortfolioAnalysisPage from "./pages/PortfolioAnalysisPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<ShunyLandingPage />} />

        {/* Core Pages */}
        <Route path="/recommend" element={<RecommendationPage />} />
        <Route path="/analyze/portfolio" element={<PortfolioAnalysisPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/journey" element={<UserJourneyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
