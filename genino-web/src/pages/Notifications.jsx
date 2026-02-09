// 📄 src/pages/Notifications.jsx
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Trash2, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [tab, setTab] = useState("notifications"); // "notifications" | "followed"
  const [followed, setFollowed] = useState([]);


  const load = () => {
    try {
      const raw = localStorage.getItem("genino_notifications");
      const arr = raw ? JSON.parse(raw) : [];
      setList(Array.isArray(arr) ? arr : []);
    } catch {
      setList([]);
    }
  };

  const loadFollowed = () => {
  try {
    const raw = localStorage.getItem("genino_followed_children");
    const arr = raw ? JSON.parse(raw) : [];
    setFollowed(Array.isArray(arr) ? arr : []);
  } catch {
    setFollowed([]);
  }
};

  useEffect(() => {
  load();
  loadFollowed();

  const onStorage = () => {
    load();
    loadFollowed();
  };

  window.addEventListener("genino_notifications_changed", load);
  window.addEventListener("genino_followed_children_changed", loadFollowed);

  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("genino_notifications_changed", load);
    window.removeEventListener("genino_followed_children_changed", loadFollowed);

    window.removeEventListener("storage", onStorage);
  };
}, []);



  const unreadCount = useMemo(
    () => list.filter((n) => !n.read).length,
    [list]
  );

  const markAllRead = () => {
    const updated = list.map((n) => ({ ...n, read: true }));
    localStorage.setItem("genino_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("genino_notifications_changed"));
    setList(updated);
  };

  const clearAll = () => {
    localStorage.setItem("genino_notifications", JSON.stringify([]));
    window.dispatchEvent(new Event("genino_notifications_changed"));
    setList([]);
  };

  const markOneRead = (id) => {
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem("genino_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("genino_notifications_changed"));
    setList(updated);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffdf5] to-[#fff7d6] pt-24 pb-16 px-4"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-700 transition"
          >
            <ArrowRight size={18} />
            بازگشت
          </button>

          <div className="flex items-center gap-2">
            <Bell className="text-yellow-600" />
            <h1 className="text-lg sm:text-xl font-extrabold text-yellow-700">
              اعلان‌ها
            </h1>

            {tab === "notifications" && unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              disabled={tab !== "notifications" || list.length === 0 || unreadCount === 0}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-xl border transition
                ${
                  tab !== "notifications" || list.length === 0 || unreadCount === 0
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-yellow-200 hover:bg-yellow-50"
                }`}
            >
              <CheckCircle2 size={18} />
              خواندن همه
            </button>

            <button
              onClick={clearAll}
              disabled={tab !== "notifications" || list.length === 0}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-xl border transition
                ${
                  tab !== "notifications" || list.length === 0
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-red-600 border-red-200 hover:bg-red-50"
                }`}
            >
              <Trash2 size={18} />
              پاک کردن
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 border border-yellow-200 rounded-2xl p-2 mb-5 flex gap-2">
          <button
            onClick={() => setTab("notifications")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${
              tab === "notifications"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 hover:bg-yellow-50"
            }`}
          >
            اعلان‌ها
          </button>

          <button
            onClick={() => setTab("followed")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${
              tab === "followed"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 hover:bg-yellow-50"
            }`}
          >
            کودک‌های دنبال‌شده
          </button>
        </div>

        {/* Content */}
        {tab === "notifications" ? (
          <>
            {list.length === 0 ? (
              <div className="bg-white/80 border border-yellow-200 rounded-3xl p-8 text-center shadow-sm">
                <div className="text-3xl mb-3">🌿</div>
                <div className="text-gray-700 font-semibold mb-1">
                  اعلانی ندارید
                </div>
                <div className="text-sm text-gray-500">
                  وقتی کودک‌های دنبال‌شده دستاورد بگیرند، اینجا خبر می‌گیری.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {list
                  .slice()
                  .reverse()
                  .map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white/90 border rounded-2xl p-4 shadow-sm transition
                        ${n.read ? "border-gray-200" : "border-yellow-300"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 text-right">
                          <div className="text-sm font-bold text-gray-800">
                            {n.title || "اعلان جدید"}
                          </div>
                          {n.body && (
                            <div className="text-xs text-gray-500 mt-1">
                              {n.body}
                            </div>
                          )}
                          {n.time && (
                            <div className="text-[11px] text-gray-400 mt-2">
                              {n.time}
                            </div>
                          )}
                        </div>

                        {!n.read && (
                          <button
                            onClick={() => markOneRead(n.id)}
                            className="text-xs px-3 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
                          >
                            خواندم
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
  {followed.length === 0 ? (
    <div className="bg-white/80 border border-yellow-200 rounded-3xl p-8 text-center shadow-sm">
      <div className="text-3xl mb-3">👶</div>
      <div className="text-gray-700 font-semibold mb-1">فعلاً کسی را دنبال نکردی</div>
      <div className="text-sm text-gray-500">
        وقتی در درختواره‌ی یک کودک قرار بگیری، اینجا می‌تونی اون کودک‌ها رو ببینی.
      </div>
    </div>
  ) : (
    followed
      .slice()
      .reverse()
      .map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 border border-yellow-200 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 text-right">
              <div className="text-sm font-extrabold text-gray-800">
                {c.name || "کودک"}
              </div>
              {c.note && <div className="text-xs text-gray-500 mt-1">{c.note}</div>}
              {c.lastAchievement && (
                <div className="text-[11px] text-yellow-700 mt-2">
                  🏅 آخرین دستاورد: {c.lastAchievement}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/mychild")}
              className="text-xs px-3 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              مشاهده
            </button>
          </div>
        </motion.div>
      ))
  )}
</div>

        )}
      </div>
    </main>
  );
}
