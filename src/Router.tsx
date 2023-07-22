import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Committee from "./pages/committee";
import Business from "./pages/business";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/business" element={<Business />} />
    </Routes>
  );
};

export default Router;
