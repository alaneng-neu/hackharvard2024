import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Search from "../pages/Search";
import Login from "../pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/auth/callback" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
