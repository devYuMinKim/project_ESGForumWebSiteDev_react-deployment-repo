import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Committee from "./pages/committee";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/committee" element={<Committee />} />
    </Routes>
  );
};

export default Router;
