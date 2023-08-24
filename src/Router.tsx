import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Committee from "./pages/committee";
import Business from "./pages/business";
import DashBoard from "./pages/admin/dashboard";
import CommitteeInfo from "./pages/admin/committee";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/business" element={<Business />} />
      <Route path="/admin" element={<DashBoard />} />
      <Route path="/admin/committee/:id" element={<CommitteeInfo/>} />
    </Routes>
  );
};

export default Router;
