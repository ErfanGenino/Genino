import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "./assets/logo-genino.png";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/", label: "خانه" },
    { to: "/shop", label: "فروشگاه" },
    { to: "/social", label: "شبکه اجتماعی ژنینو" },
    { to: "/settings", label: "تنظیمات" },
  ];

  const inDashboard = window.location.pathname.startsWith("/dashboard");

  function handleLogoutConfirm() {
    localStorage.removeItem("lifeStage");
    localStorage.removeItem("userData");
    sessionStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/login");
  }

  return (
    <>
      {/* 🔹 نوار بالایی */}
      <header
        className={`sticky top-0 z-50 backdrop-blur transition-all duration-500 ${
          scrolled
            ? "bg-white/95 border-b-2 border-yellow-300 shadow-[0_2px_8px_rgba(212,175,55,0.15)]"
            : "bg-white/90 border-b border-gray-100"
        }`}
      >
        <nav
          dir="rtl"
          className="w-full flex items-center justify-between px-8 py-3"
        >
          {/* 🔸 لوگو راست */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/40 to-white/0 blur-xl animate-pulse"></div>
                <img
                  src={logo}
                  alt="Genino Logo"
                  className="relative w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-yellow-600">
                  ژنینو 🌿
                </span>
                <span className="text-[11px] text-gray-500">
                  دستیار هوشمند
                </span>
              </div>
            </Link>
          </div>

          {/* 🔸 لینک‌های وسط */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
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

          {/* 🔸 سمت چپ */}
          <div className="hidden md:flex items-center justify-end gap-3 flex-shrink-0">
            {inDashboard ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-1.5 text-red-500 border border-red-300 px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all shadow-sm hover:shadow-md"
              >
                <LogOut size={17} className="opacity-80" />
                <span>خروج</span>
              </button>
            ) : (
              <>
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
              </>
            )}
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

        {/* 🔹 منوی موبایل */}
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

            {inDashboard ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="flex items-center justify-end gap-2 text-red-500 hover:text-red-600 text-sm"
              >
                <span>خروج</span>
                <LogOut size={17} />
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </header>

      {/* 🌟 پاپ‌آپ خروج در کل صفحه */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.6)]
                         p-7 w-[90%] max-w-sm text-center border border-yellow-200 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              {/* ✨ افکت درخشش طلایی */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-150%', '150%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ transform: 'rotate(25deg)' }}
              />

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-yellow-700 mb-3">
                  مطمئنی می‌خوای از ژنینو خارج شی؟ 🌿
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  با خروج، اطلاعات ذخیره‌شده از مرورگرت پاک میشه.
                </p>

                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(212,175,55,0.8)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogoutConfirm}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-5 py-2 rounded-xl 
                               font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
                  >
                    بله، خروج
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogoutConfirm(false)}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition font-semibold"
                  >
                    انصراف
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

