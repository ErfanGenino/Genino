import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import AuthStart from "./AuthStart.jsx";
import "./index.css";
import SignupStart from "./SignupStart.jsx";
import SignupUser from "./SignupUser.jsx";
import Navbar from "./Navbar.jsx"; // ✅ فقط ایمپورتش می‌کنی، نه تعریف

// صفحات دیگر
function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f2eb] text-gray-800">
      <h2 className="text-3xl font-bold text-yellow-600">داشبورد والدین</h2>
    </div>
  );
}

function Market() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f2eb] text-gray-800">
      <h2 className="text-3xl font-bold text-yellow-600">مارکت‌پلیس اولیه</h2>
    </div>
  );
}

function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f2eb] text-gray-800">
      <h2 className="text-3xl font-bold text-yellow-600">تنظیمات کاربر</h2>
    </div>
  );
}

// ✅ رندر اصلی
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<AuthStart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/market" element={<Market />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signup" element={<SignupStart />} />
      <Route path="/signup-user" element={<SignupUser />} />
    </Routes>
  </BrowserRouter>
);
