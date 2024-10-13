import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Search from "../pages/Search";
import Login from "../pages/Login";
import UserAuthCallback from "../pages/UserAuthCallback";
import BusinessForm from "../pages/BusinessForm";
import BusinessPage from "../pages/BusinessPage";
import UserAccount from "../pages/UserAccount";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user" element={<UserAccount />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/auth/callback" element={<UserAuthCallback />} />
        <Route path="/business/create" element={<BusinessForm />} />
        <Route path="/business/:id" element={<BusinessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
