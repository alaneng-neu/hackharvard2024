import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
