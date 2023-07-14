import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
// import Home from "./pages/home";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        {/* <Route path="/login" Component={Login} /> */}
        <Route path="signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
