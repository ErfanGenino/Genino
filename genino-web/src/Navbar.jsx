import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "./assets/logo-genino.png";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // 📌 مدیریت حالت اسکرول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⭐ بارگذاری کاربر + واکنش به تغییرات localStorage
  useEffect(() => {
  const updateUser = () => {
    const storedUser = localStorage.getItem("genino_user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  // بار اول
  updateUser();

  // وقتی localStorage از همین تب تغییر کند (مثلاً logout)
  window.addEventListener("genino_user_changed", updateUser);

  // وقتی localStorage از تب دیگر تغییر کند
  window.addEventListener("storage", updateUser);

  return () => {
    window.removeEventListener("genino_user_changed", updateUser);
    window.removeEventListener("storage", updateUser);
  };
}, []);


  // ⭐ خروج کاربر
  function handleLogoutConfirm() {
    localStorage.removeItem("genino_user");
    localStorage.removeItem("lifeStage");
    localStorage.removeItem("userData");
    sessionStorage.clear();

    setUser(null);
    setShowLogoutConfirm(false);
    navigate("/login");
  }

  const links = [
    { to: "/", label: "خانه" },
    { to: "/shop", label: "فروشگاه" },
    { to: "/social", label: "شبکه اجتماعی ژنینو" },
    { to: "/settings", label: "تنظیمات" },
  ];

  const inDashboard = window.location.pathname.startsWith("/dashboard");

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
          {/* 🔸 لوگو */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-14 h-14 rounded-full flex items-center justify-center
                bg-white border-2 border-yellow-400 shadow-sm
                overflow-hidden hover:scale-110 transition-all duration-300">
                <img
                  src={logo}
                  alt="Genino Logo"
                  className="relative z-10 w-20 h-20 object-contain bg-white"
                />
              </div>

              <div className="flex flex-col items-center leading-tight mt-0.5">
                <span className="text-[15px] font-semibold text-yellow-700">
                  ژنینو
                </span>
                <span className="text-[10.5px] text-gray-500 mt-0.5 tracking-tight">
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
            {user ? (
              <>
                {/* نمایش نام کاربر */}
                <Link
                 to={`/dashboard-${user.lifeStage}`}
                 className="text-gray-700 font-medium bg-yellow-100 border border-yellow-300 
                 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-yellow-200 transition">
                 {user.fullName}
                </Link>

                {/* خروج */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-1.5 text-red-500 border border-red-300 px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all shadow-sm hover:shadow-md"
                >
                  <LogOut size={17} className="opacity-80" />
                  <span>خروج</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 
                    border border-yellow-300 text-yellow-700
                    px-3 py-1.5 rounded-xl text-sm font-medium
                    hover:bg-yellow-50 transition-all"
                >
                  <LogIn size={17} className="opacity-80" />
                  <span>ورود</span>
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 
                    bg-yellow-500 text-white
                    px-3.5 py-1.5 rounded-xl text-sm font-medium
                    hover:bg-yellow-600 transition-all shadow"
                >
                  <UserPlus size={17} className="opacity-90" />
                  <span>ثبت‌نام</span>
                </Link>
              </>
            )}
          </div>

          {/* 🔸 دکمه داشبورد در موبایل */}
{user && (
  <button
    onClick={() => {
      setMenuOpen(false); // 👈 این خط
      navigate(`/dashboard-${user.lifeStage}`);
    }}
    className="md:hidden 
      flex items-center gap-2 
      bg-yellow-100 border border-yellow-300 
      px-3 py-1.5 rounded-xl 
      text-sm font-medium text-yellow-800
      hover:bg-yellow-200 transition"
  >
    {user.fullName}
  </button>
)}

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
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-5 
                flex flex-col gap-3 text-right">

            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "text-sm py-1 transition-all",
                    isActive
                      ? "text-yellow-600 font-semibold"
                      : "text-gray-700 hover:text-yellow-600",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <hr className="my-2 border-gray-200" />

            <div className="flex flex-col gap-2">
              {user ? (
                <>
                

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="flex items-center justify-between
                      border border-red-300 text-red-500
                      px-3 py-2 rounded-lg text-sm hover:bg-red-50"
                  >
                    <span>خروج</span>
                    <LogOut size={17} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between
                      border border-yellow-300 text-yellow-700
                      px-3 py-2 rounded-lg text-sm hover:bg-yellow-50"
                  >
                    <span>ورود</span>
                    <LogIn size={17} />
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between
                      bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm
                      hover:bg-yellow-600 shadow"
                  >
                    <span>ثبت‌نام</span>
                    <UserPlus size={17} />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 🌟 پاپ‌آپ خروج */}
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
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-150%", "150%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                style={{ transform: "rotate(25deg)" }}
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
                      boxShadow: "0 0 25px rgba(212,175,55,0.8)",
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
