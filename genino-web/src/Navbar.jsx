//src/Navbar.jsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Menu, X, LogOut, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo-genino.png";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { authFetch, getUserProfile, logoutUser } from "./services/api";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState(null);
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
  setUser(storedUser ? JSON.parse(storedUser) : null);

  const token = localStorage.getItem("genino_token");
  if (!token) return;

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


  // ⭐ خروج کاربر
  async function handleLogoutConfirm() {
  await logoutUser();

  // ✅ اضافه کن
  window.dispatchEvent(new Event("genino_user_changed"));
  window.dispatchEvent(new Event("genino_token_changed"));

  localStorage.removeItem("doctorRecords");
  localStorage.removeItem("children");
  localStorage.removeItem("lifeStage");
  localStorage.removeItem("userData");
  localStorage.removeItem("genino_notifications");
  window.dispatchEvent(new Event("genino_notifications_changed"));
  sessionStorage.clear();

  setUser(null);
  setShowLogoutConfirm(false);
  navigate("/login", { replace: true });
}


  const links = [
  { to: "/", label: "خانه" },
  { to: "/mychild", label: "کودک من" },
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

useEffect(() => {
  let intervalId;

  const loadUnread = async () => {
    try {
      const token = localStorage.getItem("genino_token");

      if (!token) {
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
            {user ? (
              <>
                {/* نمایش نام کاربر */}
                <Link
                  to={`/dashboard-${user.lifeStage}`}
                  className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 
                             px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-yellow-200 transition"
                >
                {/* آواتار کوچک */}
                <img
                   src={user?.avatarUrl || "/avatars/101.png"}
                   alt="avatar"
                   className="w-7 h-7 rounded-full object-cover border border-yellow-300 bg-white"
                />

            {/* نام کاربر (کمی کوچیکتر) */}
            <span className="text-[13px] text-gray-700 font-medium leading-none">
               {user.fullName}
               </span>
            </Link>


                {/* 🔔 اعلان‌ها */}
                <button
                  onClick={() => navigate("/notifications")}
                  className="relative flex items-center justify-center
                             w-7 h-7 rounded-md
                             text-yellow-600/70
                             hover:text-yellow-700
                             transition-all duration-300"
                  aria-label="اعلان‌ها"
                >
                <Bell size={14} strokeWidth={2.3} />
                {unreadCount > 0 && (
                <span
                className="absolute -top-2 -left-2 min-w-[20px] h-5 px-1
                           rounded-full bg-red-500 text-white text-[11px]
                           flex items-center justify-center font-bold shadow"
                >
                {unreadCount > 99 ? "99+" : unreadCount}
                 </span>
                 )}
                </button>


                {/* خروج */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-1
                             text-red-400/80
                             hover:text-red-500
                             transition-all duration-300"
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
          </div>

          {/* 🔸 دکمه داشبورد در موبایل */}
{/* 🔸 دکمه داشبورد در موبایل */}
{user && (
  <button
    onClick={() => {
      setMenuOpen(false);
      navigate(`/dashboard-${user.lifeStage}`);
    }}
    className="md:hidden 
      flex items-center gap-2 
      bg-yellow-100 border border-yellow-300 
      px-3 py-1.5 rounded-xl 
      hover:bg-yellow-200 transition"
  >
    {/* آواتار کوچک */}
    <img
      src={user?.avatarUrl || "/avatars/101.png"}
      alt="avatar"
      className="w-7 h-7 rounded-full object-cover border border-yellow-300 bg-white"
      onError={(e) => {
        e.currentTarget.src = "/avatars/101.png";
      }}
    />

    {/* نام کاربر (کوچیکتر) */}
    <span className="text-[13px] font-medium text-yellow-800 leading-none">
      {user.fullName}
    </span>
  </button>
)}

<button
  onClick={toggleMusic}
  className="md:hidden flex items-center justify-center
           w-7 h-7 rounded-md
           text-yellow-600/70
           hover:text-yellow-700
           transition-all duration-300"
  aria-label={isMusicPlaying ? "توقف موسیقی آرامش‌بخش" : "پخش موسیقی آرامش‌بخش"}
>
  {isMusicPlaying ? <Pause size={11} strokeWidth={2.3} /> : <Play size={11} strokeWidth={2.3} />}
</button>

          {/* 🔸 منوی موبایل */}
          <button
  className="relative flex items-center justify-center
           w-7 h-7 rounded-md
           text-yellow-600/70
           hover:text-yellow-700
           transition-all duration-300"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? (
  <X size={15} strokeWidth={2.3} />
) : (
  <Menu size={15} strokeWidth={2.3} />
)}

  {!menuOpen && unreadCount > 0 && (
    <span
      className="absolute -top-1 -left-1 min-w-[18px] h-[18px]
                 px-1 rounded-full bg-red-500 text-white
                 text-[10px] font-bold flex items-center justify-center shadow"
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  )}
</button>
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

{user ? (
          <>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/notifications");
              }}
              className="flex items-center justify-between rounded-2xl border border-yellow-200 bg-yellow-50/70 px-4 py-3 text-sm font-bold text-yellow-800"
            >
              <span className="flex items-center gap-2">
                <Bell size={18} />
                اعلان‌ها
              </span>
              {unreadCount > 0 ? (
  <span className="min-w-[22px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center font-bold">
    {unreadCount > 99 ? "99+" : unreadCount}
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
