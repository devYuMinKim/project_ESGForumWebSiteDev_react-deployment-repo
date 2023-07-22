import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Committee from "./pages/committee";
import Business from "./pages/business";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/business" element={<Business />} />
    </Routes>
  );
};

export default Router;
