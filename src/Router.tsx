import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Committee from "./pages/committee";
import Business from "./pages/business";

import AboutUsPage from "./pages/aboutus";
import ObjectivePage from "./pages/aboutus/objective";
import BoEPage from "./pages/aboutus/boe";
import MeetingsPage from "./pages/aboutus/meetings";
import HistoryPage from "./pages/aboutus/history";
import RulesPage from "./pages/aboutus/rules";
import ContactPage from "./pages/aboutus/contact";
import SeminarPage from "./pages/seminars";
import DashBoard from "./pages/admin/dashboard";
import CommitteeInfo from "./pages/admin/committee";
import SeminarDetailPage from "./pages/seminar_detail";
import ReferencePage from "./pages/reference";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/committee" element={<Committee />} />
    <Route path="/business" element={<Business />} />
    <Route path="/admin" element={<DashBoard />} />
    <Route path="/admin/committee/:id" element={<CommitteeInfo />} />
    <Route path="/seminars" element={<SeminarPage />} />
    <Route path="/seminars/:id" element={<SeminarDetailPage />} />
    <Route path="/reference" element={<ReferencePage />} />
    {/* <Route path="/seminars/:id" element={<SeminarDetailPage />} /> */}
    <Route path="/aboutus" element={<AboutUsPage />} />
    <Route path="/aboutus/objective" element={<ObjectivePage />} />
    <Route path="/aboutus/boe" element={<BoEPage />} />
    <Route path="/aboutus/meetings" element={<MeetingsPage />} />
    <Route path="/aboutus/history" element={<HistoryPage />} />
    <Route path="/aboutus/rules" element={<RulesPage />} />
    <Route path="/aboutus/contact" element={<ContactPage />} />
  </Routes>
);

export default Router;
