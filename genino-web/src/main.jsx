import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login.jsx";
import AuthStart from "./AuthStart.jsx";
import "./index.css";
import SignupStart from "./SignupStart.jsx";
import SignupUser from "./SignupUser.jsx";

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

// نوار بالا
function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        gap: "20px",
        padding: "12px 40px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eee",
      }}
    >
      {[
        { to: "/", label: "خانه" },
        { to: "/login", label: "ورود" },
        { to: "/dashboard", label: "داشبورد" },
        { to: "/market", label: "مارکت" },
        { to: "/settings", label: "تنظیمات" },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            textDecoration: "none",
            color: "#444",
            fontWeight: "500",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#d4af37"; // طلایی
            e.target.style.fontWeight = "700";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#444";
            e.target.style.fontWeight = "500";
            e.target.style.transform = "scale(1)";
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<AuthStart />} /> {/* ✅ فقط AuthStart برای خانه */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/market" element={<Market />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signup" element={<SignupStart />} />
      <Route path="/signup-user" element={<SignupUser />} />
    </Routes>
  </BrowserRouter>
);
