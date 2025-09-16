import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Start from "../pages/Start/Start";
import Results from "../pages/Results/Results";

const AppRoutes: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/resultados" element={<Results />} />
    </Routes>
  </HashRouter>
);

export default AppRoutes;
