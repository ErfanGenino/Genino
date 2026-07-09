//src/Navbar.jsx
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus, Menu, X, LogOut, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo-genino.png";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { authFetch, getUserProfile, logoutUser, getVendorById } from "./services/api";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDashboardSelector, setShowDashboardSelector] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [isAmbassador, setIsAmbassador] = useState(false);
  const audioRef = useRef(null);
  const playlistRef = useRef([]);
  const currentTrackIndexRef = useRef(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const tracks = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `/audio/meditation/track-${num}.mp3`;
});

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

  const navigate = useNavigate();
  const location = useLocation();
  const desktopDashboardMenuRef = useRef(null);
  const mobileDashboardMenuRef = useRef(null);

  // 📌 مدیریت حالت اسکرول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⭐ بارگذاری کاربر + واکنش به تغییرات localStorage
  useEffect(() => {
  const updateUser = async () => {
  const storedUser = localStorage.getItem("genino_user");
  const vendorId = localStorage.getItem("genino_vendor_id");

if (vendorId && !storedUser) {
  setUser(null);
  setIsAmbassador(false);
  return;
}
  setUser(storedUser ? JSON.parse(storedUser) : null);

  const token = localStorage.getItem("genino_token");
  if (!token) return;
  try {
  const ambassadorRes = await authFetch("/ambassadors/me");

  setIsAmbassador(Boolean(ambassadorRes?.ok && ambassadorRes?.ambassador));
} catch (err) {
  setIsAmbassador(false);
}

  const fresh = await getUserProfile();
  if (fresh?.ok && fresh.user) {
    localStorage.setItem("genino_user", JSON.stringify(fresh.user));
    setUser(fresh.user);
  }
};

  // بار اول
  updateUser();

  // وقتی localStorage از همین تب تغییر کند (مثلاً logout)
  window.addEventListener("genino_user_changed", updateUser);

  // وقتی localStorage از تب دیگر تغییر کند
  window.addEventListener("storage", updateUser);

  window.addEventListener("focus", updateUser);

  return () => {
    window.removeEventListener("genino_user_changed", updateUser);
    window.removeEventListener("storage", updateUser);
    window.removeEventListener("focus", updateUser);
  };
}, []);


useEffect(() => {
  const updateVendor = async () => {
  const vendorId = localStorage.getItem("genino_vendor_id");

  if (!vendorId) {
    setVendor(null);
    return;
  }

  try {
  const res = await getVendorById(vendorId);

  if (res?.ok) {
    setVendor(res.vendor);
  } else {
    setVendor({ id: vendorId });
  }
} catch (err) {
  setVendor({ id: vendorId });
}
};

  updateVendor();

  window.addEventListener("genino_vendor_changed", updateVendor);
  window.addEventListener("storage", updateVendor);
  window.addEventListener("focus", updateVendor);

  return () => {
    window.removeEventListener("genino_vendor_changed", updateVendor);
    window.removeEventListener("storage", updateVendor);
    window.removeEventListener("focus", updateVendor);
  };
}, []);


  // ⭐ خروج کاربر
  async function handleLogoutConfirm() {
  setUser(null);
  setVendor(null);
  setIsAmbassador(false);
  setShowLogoutConfirm(false);
  setDashboardMenuOpen(false);
  setMenuOpen(false);
  setUnreadCount(0);

  sessionStorage.clear();

  localStorage.removeItem("genino_token");
  localStorage.removeItem("genino_vendor_id");
  localStorage.removeItem("genino_refresh_token");
  localStorage.removeItem("genino_user");
  localStorage.removeItem("doctorRecords");
  localStorage.removeItem("children");
  localStorage.removeItem("lifeStage");
  localStorage.removeItem("userData");
  localStorage.removeItem("genino_notifications");

  window.dispatchEvent(new Event("genino_user_changed"));
  window.dispatchEvent(new Event("genino_token_changed"));
  window.dispatchEvent(new Event("genino_vendor_changed"));
  window.dispatchEvent(new Event("genino_notifications_changed"));

  navigate("/login", { replace: true });

  try {
    await logoutUser();
  } catch (err) {
    console.error("LOGOUT API ERROR:", err);
  }
}


  const links = [
  { to: "/", label: "خانه" },
  { to: "/mychild", label: "کودک من" },
  { to: "/genino-children", label: "کودکان ژنینویی" },
  { to: "/shop", label: "فروشگاه تخصصی" },
  { to: "/my-cycle", label: "سلامت بانوان" },
  { to: "/my-men-health", label: "سلامت آقایان" },
  { to: "/my-doctor", label: "پزشک من" },
  { to: "/calorie-tracker", label: "کالری شمار" },
  { to: "/world-knowledge", label: "مجله ژنینو" },
  { to: "/social", label: "شبکه اجتماعی ژنینو" },
  { to: "/fun", label: "بازی و سرگرمی" },
  { to: "/events", label: "رویدادها و جشن‌ها" },
  { to: "/single-world", label: "جهان مجردها" },
  { to: "/family-finance", label: "اقتصاد و حسابداری خانواده" },
];

  const inDashboard = window.location.pathname.startsWith("/dashboard");
  const [unreadCount, setUnreadCount] = useState(0);
  const [vendorUnreadCount, setVendorUnreadCount] = useState(0);

useEffect(() => {
  let intervalId;

  const loadUnread = async () => {
    try {
      const token = localStorage.getItem("genino_token");
const vendorId = localStorage.getItem("genino_vendor_id");

if (!token || vendorId) {
  setUnreadCount(0);
  return;
}

      const res = await authFetch("/notifications");

      if (res?.ok && Array.isArray(res.notifications)) {
        const unread = res.notifications.filter((n) => {
          const isRead = n.read ?? n.isRead ?? false;
          return !isRead;
        }).length;

        setUnreadCount(unread);
      } else {
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("خطا در دریافت تعداد اعلان‌ها:", err);
      setUnreadCount(0);
    }
  };

  loadUnread();

  // ✅ هر ۱۵ ثانیه اعلان‌ها را دوباره از سرور بگیر
  intervalId = setInterval(loadUnread, 15000);

  // ✅ وقتی کاربر برمی‌گردد به تب مرورگر، دوباره چک کن
  const handleFocus = () => loadUnread();

  window.addEventListener("focus", handleFocus);
  window.addEventListener("genino_notifications_changed", loadUnread);
  window.addEventListener("genino_token_changed", loadUnread);
  window.addEventListener("genino_user_changed", loadUnread);
  window.addEventListener("storage", loadUnread);

  return () => {
    clearInterval(intervalId);
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("genino_notifications_changed", loadUnread);
    window.removeEventListener("genino_token_changed", loadUnread);
    window.removeEventListener("genino_user_changed", loadUnread);
    window.removeEventListener("storage", loadUnread);
  };
}, []);

useEffect(() => {
  let intervalId;

  const loadVendorUnread = async () => {
    try {
      const token = localStorage.getItem("genino_token");
      const vendorId = localStorage.getItem("genino_vendor_id");

      if (!token || !vendorId) {
        setVendorUnreadCount(0);
        return;
      }

      const res = await authFetch("/vendor-notifications");

      if (res?.ok && Array.isArray(res.notifications)) {
        const unread = res.notifications.filter((n) => !n.read).length;
        setVendorUnreadCount(unread);
      } else {
        setVendorUnreadCount(0);
      }
    } catch (err) {
      console.error("خطا در دریافت تعداد اعلان‌های فروشنده:", err);
      setVendorUnreadCount(0);
    }
  };

  loadVendorUnread();

  intervalId = setInterval(loadVendorUnread, 15000);

  window.addEventListener("focus", loadVendorUnread);
  window.addEventListener("genino_vendor_notifications_changed", loadVendorUnread);
  window.addEventListener("genino_vendor_changed", loadVendorUnread);
  window.addEventListener("storage", loadVendorUnread);

  return () => {
    clearInterval(intervalId);
    window.removeEventListener("focus", loadVendorUnread);
    window.removeEventListener("genino_vendor_notifications_changed", loadVendorUnread);
    window.removeEventListener("genino_vendor_changed", loadVendorUnread);
    window.removeEventListener("storage", loadVendorUnread);
  };
}, []);


async function toggleMusic() {
  try {
    let audio = audioRef.current;

    // اگر هنوز ساخته نشده
    if (!audio) {
      playlistRef.current = shuffleArray(tracks);
      currentTrackIndexRef.current = 0;

      audio = new Audio(playlistRef.current[0]);
      audio.volume = 0.18;

      audio.addEventListener("ended", () => {
        currentTrackIndexRef.current += 1;

        if (currentTrackIndexRef.current >= playlistRef.current.length) {
          playlistRef.current = shuffleArray(tracks);
          currentTrackIndexRef.current = 0;
        }

        audio.src =
          playlistRef.current[currentTrackIndexRef.current];

        audio.play().catch(console.error);
      });

      audioRef.current = audio;
    }

    // پلی / استاپ
    if (audio.paused) {
      await audio.play();
      setIsMusicPlaying(true);
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }

  } catch (err) {
    console.error("MUSIC ERROR:", err);
  }
}

const isAmbassadorDashboard =
  window.location.pathname.startsWith("/dashboard-ambassador");

const isUserDashboard =
  window.location.pathname.startsWith("/dashboard-") &&
  !isAmbassadorDashboard;

useEffect(() => {
  setDashboardMenuOpen(false);
  setMenuOpen(false);
}, [location.pathname]);

useEffect(() => {
  const handleClickOutside = (event) => {
    const clickedInsideDesktop =
      desktopDashboardMenuRef.current &&
      desktopDashboardMenuRef.current.contains(event.target);

    const clickedInsideMobile =
      mobileDashboardMenuRef.current &&
      mobileDashboardMenuRef.current.contains(event.target);

    if (!clickedInsideDesktop && !clickedInsideMobile) {
      setDashboardMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, []);

useEffect(() => {
  const closeDashboardMenu = () => {
    setDashboardMenuOpen(false);
  };

  window.addEventListener("scroll", closeDashboardMenu);
  window.addEventListener("resize", closeDashboardMenu);

  return () => {
    window.removeEventListener("scroll", closeDashboardMenu);
    window.removeEventListener("resize", closeDashboardMenu);
  };
}, []);





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
          className="w-full flex items-center justify-between px-3 sm:px-8 py-3"
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

          

          {/* 🔸 سمت چپ */}
          <div className="hidden md:flex items-center gap-2 mr-auto">
            
            {user || vendor ? (
  <>
    <div className="relative" ref={desktopDashboardMenuRef}>
      <button
        type="button"
        onClick={() => {
  if (vendor) {
    navigate("/dashboard-vendor");
    return;
  }

  if (isAmbassador) {
    setMenuOpen(false);
    setDashboardMenuOpen((prev) => !prev);
    return;
  }

  navigate(`/dashboard-${user.lifeStage}`);
}}
        className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-yellow-200 transition"
      >
        <img
          src={user?.avatarUrl || "/avatars/101.png"}
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover border border-yellow-300 bg-white"
        />

        <span className="text-[13px] text-gray-700 font-medium leading-none">
  {vendor
  ? `پنل فروشنده | ${
      vendor.businessName ||
      "فروشنده"
    }`
  : user.fullName}
</span>

        {isAmbassador && (
          <span className="text-[10px] font-black text-[#b98522] px-1">
            ▼
          </span>
        )}
      </button>

      {isAmbassador && dashboardMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.15 }}
    className="
  absolute top-12 right-0 z-[120]
  w-56 rounded-2xl
  border border-yellow-200
  bg-white shadow-lg p-2
"
onClick={(e) => e.stopPropagation()}
  >
    <button
      type="button"
      onClick={() => {
        setDashboardMenuOpen(false);
        setMenuOpen(false);
        navigate(`/dashboard-${user.lifeStage}`);
      }}
      className={`
        w-full rounded-xl px-4 py-3
        text-right text-sm font-medium transition
        ${
          isUserDashboard
            ? "bg-yellow-50 text-yellow-800"
            : "bg-white hover:bg-yellow-50 text-gray-700"
        }
      `}
    >
      داشبورد کاربری
    </button>

    <button
      type="button"
      onClick={() => {
        setDashboardMenuOpen(false);
        setMenuOpen(false);
        navigate("/dashboard-ambassador");
      }}
      className={`
        mt-2 w-full rounded-xl px-4 py-3
        text-right text-sm font-medium transition
        ${
          isAmbassadorDashboard
            ? "bg-yellow-50 text-yellow-800"
            : "bg-white hover:bg-yellow-50 text-gray-700"
        }
      `}
    >
      داشبورد سفیران
    </button>
  </motion.div>
)}
    </div>

    <button
      onClick={() => {
  if (vendor) {
    navigate("/vendor/notifications");
  } else {
    navigate("/notifications");
  }
}}
className="relative flex items-center justify-center w-7 h-7 rounded-md text-yellow-600/70 hover:text-yellow-700 transition-all duration-300"
      aria-label="اعلان‌ها"
    >
      <Bell size={14} strokeWidth={2.3} />
      {(vendor ? vendorUnreadCount : unreadCount) > 0 && (
        <span className="absolute -top-2 -left-2 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center font-bold shadow">
          {(vendor ? vendorUnreadCount : unreadCount) > 99
  ? "99+"
  : vendor
  ? vendorUnreadCount
  : unreadCount}
        </span>
      )}
    </button>

    <button
      onClick={() => setShowLogoutConfirm(true)}
      className="flex items-center gap-1 text-red-400/80 hover:text-red-500 transition-all duration-300"
    >
      <LogOut size={13} strokeWidth={2.3} />
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
            <button
  onClick={toggleMusic}
  className="flex items-center justify-center
           w-7 h-7 rounded-md
           text-yellow-600/70
           hover:text-yellow-700
           transition-all duration-300"
  aria-label={isMusicPlaying ? "توقف موسیقی آرامش‌بخش" : "پخش موسیقی آرامش‌بخش"}
  title={isMusicPlaying ? "توقف موسیقی" : "پخش موسیقی"}
>
  {isMusicPlaying ? <Pause size={11} strokeWidth={2.3} /> : <Play size={11} strokeWidth={2.3} />}
</button>

<button
  className="relative flex items-center justify-center
    w-7 h-7 rounded-md
    text-yellow-600/70
    hover:text-yellow-700
    transition-all duration-300"
  onClick={() => {
  setDashboardMenuOpen(false);
  setMenuOpen((prev) => !prev);
}}
>
  {menuOpen ? (
    <X size={15} strokeWidth={2.3} />
  ) : (
    <Menu size={15} strokeWidth={2.3} />
  )}
</button>
          </div>

{/* 🔸 دکمه داشبورد در موبایل */}
<div className="md:hidden flex items-center gap-2 mr-auto">
  {user || vendor ? (
    <div className="relative" ref={mobileDashboardMenuRef}>
      <button
        onClick={() => {
          if (isAmbassador) {
  setMenuOpen(false);
  setDashboardMenuOpen((prev) => !prev);
  return;
}

          setMenuOpen(false);
          if (vendor) {
  navigate("/dashboard-vendor");
  return;
}

navigate(`/dashboard-${user.lifeStage}`);
        }}
        className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 
          px-3 py-1.5 rounded-xl hover:bg-yellow-200 transition"
      >
        <img
          src={user?.avatarUrl || "/avatars/101.png"}
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover border border-yellow-300 bg-white"
          onError={(e) => {
            e.currentTarget.src = "/avatars/101.png";
          }}
        />

        <span className="text-[13px] font-medium text-yellow-800 leading-none">
          {vendor
  ? `پنل فروشنده | ${
      vendor.businessName ||
      "فروشنده"
    }`
  : user.fullName}
        </span>

        {isAmbassador && (
          <span className="text-[10px] font-black text-[#b98522] px-1">
            ▼
          </span>
        )}
      </button>

      {isAmbassador && dashboardMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.15 }}
    className="
  absolute top-12 right-0 z-[120]
  w-56 rounded-2xl
  border border-yellow-200
  bg-white shadow-lg p-2
"
onClick={(e) => e.stopPropagation()}
  >
    <button
      type="button"
      onClick={() => {
        setDashboardMenuOpen(false);
        setMenuOpen(false);
        navigate(`/dashboard-${user.lifeStage}`);
      }}
      className={`
        w-full rounded-xl px-4 py-3
        text-right text-sm font-medium transition
        ${
          isUserDashboard
            ? "bg-yellow-50 text-yellow-800"
            : "bg-white hover:bg-yellow-50 text-gray-700"
        }
      `}
    >
      داشبورد کاربری
    </button>

    <button
      type="button"
      onClick={() => {
        setDashboardMenuOpen(false);
        setMenuOpen(false);
        navigate("/dashboard-ambassador");
      }}
      className={`
        mt-2 w-full rounded-xl px-4 py-3
        text-right text-sm font-medium transition
        ${
          isAmbassadorDashboard
            ? "bg-yellow-50 text-yellow-800"
            : "bg-white hover:bg-yellow-50 text-gray-700"
        }
      `}
    >
      داشبورد سفیران
    </button>
  </motion.div>
)}
    </div>
  ) : (
    <>
      <Link
        to="/login"
        className="flex items-center gap-1 rounded-xl border border-yellow-300 px-2.5 py-1.5 text-xs font-bold text-yellow-700 hover:bg-yellow-50 transition"
      >
        <LogIn size={14} />
        ورود
      </Link>

      <Link
        to="/signup"
        className="flex items-center gap-1 rounded-xl bg-yellow-500 px-2.5 py-1.5 text-xs font-bold text-white shadow hover:bg-yellow-600 transition"
      >
        <UserPlus size={14} />
        ثبت‌نام
      </Link>
    </>
  )}

  <button
    onClick={toggleMusic}
    className="flex items-center justify-center w-7 h-7 rounded-md text-yellow-600/70 hover:text-yellow-700 transition-all duration-300"
    aria-label={isMusicPlaying ? "توقف موسیقی آرامش‌بخش" : "پخش موسیقی آرامش‌بخش"}
  >
    {isMusicPlaying ? (
      <Pause size={11} strokeWidth={2.3} />
    ) : (
      <Play size={11} strokeWidth={2.3} />
    )}
  </button>

  <button
    className="relative flex items-center justify-center w-7 h-7 rounded-md text-yellow-600/70 hover:text-yellow-700 transition-all duration-300"
    onClick={() => {
  setDashboardMenuOpen(false);
  setMenuOpen((prev) => !prev);
}}
  >
    {menuOpen ? (
      <X size={15} strokeWidth={2.3} />
    ) : (
      <Menu size={15} strokeWidth={2.3} />
    )}

    {!menuOpen && (vendor ? vendorUnreadCount : unreadCount) > 0 && (
  <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
    {(vendor ? vendorUnreadCount : unreadCount) > 99
      ? "99+"
      : vendor
      ? vendorUnreadCount
      : unreadCount}
  </span>
)}
  </button>
</div>
      
        </nav>

        
      </header>

{/* 🔹 منوی آبشاری */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      className="fixed inset-0 z-[90] bg-black/35 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setMenuOpen(false)}
    >
      <motion.div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="
          fixed top-[82px] left-3 sm:left-6
          w-[calc(100%-24px)] sm:w-80
          max-h-[72vh] overflow-y-auto
          rounded-3xl
          bg-white/95 backdrop-blur-xl
          border border-yellow-200
          shadow-[0_20px_60px_rgba(120,80,0,0.22)]
          p-4
          flex flex-col gap-2 text-right
        "
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-extrabold text-yellow-800">
            منوی ژنینو
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-yellow-50 text-yellow-700 flex items-center justify-center hover:bg-yellow-100 transition"
          >
            <X size={19} />
          </button>
        </div>

{user || vendor ? (
          <>
            <button
  onClick={() => {
    setMenuOpen(false);

    if (vendor) {
      navigate("/vendor/notifications");
    } else {
      navigate("/notifications");
    }
  }}
              className="flex items-center justify-between rounded-2xl border border-yellow-200 bg-yellow-50/70 px-4 py-3 text-sm font-bold text-yellow-800"
            >
              <span className="flex items-center gap-2">
                <Bell size={18} />
                اعلان‌ها
              </span>
              {(vendor ? vendorUnreadCount : unreadCount) > 0 ? (
  <span className="min-w-[22px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center font-bold">
    {(vendor ? vendorUnreadCount : unreadCount) > 99
      ? "99+"
      : vendor
      ? vendorUnreadCount
      : unreadCount}
  </span>
) : (
  <span className="text-xs text-yellow-600">مشاهده</span>
)}
            </button>

            <NavLink
  to="/social/profile"
  onClick={() => setMenuOpen(false)}
  className={({ isActive }) =>
    [
      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all",
      isActive
        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
        : "border border-yellow-200 bg-yellow-50/70 text-yellow-800 hover:bg-yellow-100",
    ].join(" ")
  }
>
  <span>پروفایل</span>
  <span className="text-xs text-yellow-600">مشاهده</span>
</NavLink>

            <button
              onClick={() => {
                setMenuOpen(false);
                setShowLogoutConfirm(true);
              }}
              className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-500"
            >
              <span>خروج</span>
              <LogOut size={14} strokeWidth={2.3} />
            </button>

            <Link
  to="/genino-ambassadors"
  onClick={() => setMenuOpen(false)}
  className="
    relative overflow-hidden
    flex items-center justify-between
    rounded-2xl
    px-4 py-3
    text-sm font-extrabold
    text-white
    bg-gradient-to-l
    from-[#d4af37]
    via-[#e6c15a]
    to-[#b98522]
    shadow-[0_0_20px_rgba(212,175,55,0.45)]
    hover:scale-[1.02]
    transition-all duration-300
  "
>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
    animate={{ x: ["-150%", "150%"] }}
    transition={{
      repeat: Infinity,
      duration: 2.5,
      ease: "linear",
    }}
  />

  <span className="relative z-10">
    💎 کسب درآمد با سفیران ژنینو
  </span>

  <span className="relative z-10 text-lg">
    ✨
  </span>
</Link>
            
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-yellow-200 bg-yellow-50/70 px-4 py-3 text-sm font-bold text-yellow-800"
            >
              <span>ورود</span>
              <LogIn size={17} />
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-gradient-to-l from-yellow-500 to-amber-400 px-4 py-3 text-sm font-bold text-white shadow-lg"
            >
              <span>ثبت‌نام</span>
              <UserPlus size={17} />
            </Link>
          </>
        )}


        <div className="my-2 h-px bg-gradient-to-l from-transparent via-yellow-200 to-transparent" />

        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              [
                "rounded-2xl px-4 py-3 text-sm font-bold transition-all",
                isActive
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-700",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="my-2 h-px bg-gradient-to-l from-transparent via-yellow-200 to-transparent" />

        
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

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
