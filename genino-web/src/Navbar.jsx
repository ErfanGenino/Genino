import { NavLink, Link } from "react-router-dom";
import { LogIn, UserPlus, Menu, X } from "lucide-react"; // ✅ آیکون‌ها
import { useState } from "react";
import logo from "./assets/logo-genino.png";
import { motion } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "خانه" },
    { to: "/market", label: "فروشگاه" },
    { to: "/dashboard", label: "داشبورد" },
    { to: "/settings", label: "تنظیمات" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav
        dir="rtl"
        className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3"
      >
{/* 🔸 لوگو با انیمیشن ورود */}
<motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Link to="/" className="flex items-center gap-2">
    <div className="relative flex items-center justify-center">
      {/* افکت درخشش طلایی */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/40 to-white/0 blur-xl animate-pulse"></div>

      {/* لوگو اصلی */}
      <img
        src={logo}
        alt="Genino Logo"
        className="relative w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-transform duration-500 hover:scale-110"
      />
    </div>

    <div className="flex flex-col leading-tight">
      <span className="text-base font-bold text-yellow-600">ژنینو 🌿</span>
      <span className="text-[11px] text-gray-500">دستیار هوشمند</span>
    </div>
  </Link>
</motion.div>


        {/* 🔸 لینک‌های دسکتاپ */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm transition-all",
                  isActive
                    ? "text-yellow-600 font-semibold"
                    : "text-gray-600 hover:text-yellow-600",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* 🔸 دکمه‌های ورود و ثبت‌نام - دسکتاپ */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl text-sm font-medium hover:border-yellow-400 hover:text-yellow-600 transition-all shadow-sm hover:shadow-md"
          >
            <LogIn size={17} className="opacity-80" />
            <span>ورود</span>
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-3.5 py-1.5 rounded-xl text-sm font-medium hover:from-yellow-600 hover:to-yellow-500 shadow-sm hover:shadow-md transition-all"
          >
            <UserPlus size={17} className="opacity-90" />
            <span>ثبت‌نام</span>
          </Link>
        </div>

        {/* 🔸 منوی موبایل */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-yellow-50 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={24} className="text-yellow-600" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </nav>

      {/* 🔹 محتوای منوی بازشونده در موبایل */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-5 flex flex-col gap-4 text-right shadow-md animate-fadeIn">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "text-base transition-all",
                  isActive
                    ? "text-yellow-600 font-semibold"
                    : "text-gray-700 hover:text-yellow-600",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <hr className="my-2 border-gray-100" />

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-end gap-2 text-gray-700 hover:text-yellow-600 text-sm"
          >
            <span>ورود</span>
            <LogIn size={17} />
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-end gap-2 bg-yellow-500 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-yellow-600 transition"
          >
            <span>ثبت‌نام</span>
            <UserPlus size={17} />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
