import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages';
import Login from './pages/login';
import Register from './pages/register';
import Committee from './pages/committee';
import Business from './pages/business';
import AboutUsPage from './pages/aboutus';
import ObjectivePage from './pages/aboutus/objective';
import BoEPage from './pages/aboutus/boe';
import GreetingsPage from './pages/aboutus/greetings';
import HistoryPage from './pages/aboutus/history';
import RulesPage from './pages/aboutus/rules';
import ContactPage from './pages/aboutus/contact';
import SeminarPage from './pages/seminars';
import ReferencePage from './pages/reference';
import NotificationPage from './pages/notification';
import DashBoard from './pages/admin/dashboard';
import CommitteeInfo from './pages/admin/committee';
import SeminarDetailPage from './pages/seminar_detail';
import ReferenceDetailPage from './pages/reference_detail';
import NotificationDetailPage from './pages/notification_detail';
import Members from './pages/admin/members';
import Users from './pages/admin/users';

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/committee" element={<Committee />} />
    <Route path="/business" element={<Business />} />
    <Route path="/admin" element={<DashBoard />} />
    <Route path="/admin/committee/:id" element={<CommitteeInfo />} />
    <Route path="/admin/members" element={<Members />} />
    <Route path="/admin/users" element={<Users />} />
    <Route path="/seminars" element={<SeminarPage />} />
    <Route path="/seminars/:id" element={<SeminarDetailPage />} />
    <Route path="/references" element={<ReferencePage />} />
    {/* <Route path="/references/:id" element={<ReferenceDetailPage />} /> */}
    <Route path="/notifications" element={<NotificationPage />} />
    {/* <Route path="/notifications/:id" element={<NotificationDetailPage />} /> */}
    <Route path="/reference" element={<ReferencePage />} />
    <Route path="/notification" element={<NotificationPage />} />
    <Route path="/aboutus" element={<AboutUsPage />} />
    <Route path="/aboutus/objective" element={<ObjectivePage />} />
    <Route path="/aboutus/boe" element={<BoEPage />} />
    <Route path="/aboutus/greetings" element={<GreetingsPage />} />
    <Route path="/aboutus/history" element={<HistoryPage />} />
    <Route path="/aboutus/rules" element={<RulesPage />} />
    {/* <Route path="/aboutus/contact" element={<ContactPage />} /> */}
    {/* <Route path="/quill" element={<Editor />} /> */}
  </Routes>
);

export default Router;
