import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCircle2, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../services/api";

export default function VendorNotifications() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await authFetch("/vendor-notifications");

      if (res?.ok) {
        setList(Array.isArray(res.notifications) ? res.notifications : []);
      } else {
        setList([]);
      }
    } catch (err) {
      console.error("خطا در دریافت اعلان‌های فروشنده:", err);
      setList([]);
    }
  };

  useEffect(() => {
    load();

    window.addEventListener("focus", load);
    window.addEventListener("genino_vendor_notifications_changed", load);

    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("genino_vendor_notifications_changed", load);
    };
  }, []);

  const unreadCount = useMemo(
    () => list.filter((n) => !n.read).length,
    [list]
  );

  const markOneRead = async (id) => {
    const res = await authFetch(`/vendor-notifications/${id}/read`, {
      method: "PATCH",
    });

    if (res?.ok) {
      setList((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  };

  const clearAll = async () => {
    const ok = window.confirm("همه اعلان‌های فروشنده حذف شوند؟");
    if (!ok) return;

    const res = await authFetch("/vendor-notifications", {
      method: "DELETE",
    });

    if (res?.ok) {
      setList([]);
    }
  };

  const deleteOne = async (id) => {
    const ok = window.confirm("این اعلان حذف شود؟");
    if (!ok) return;

    const res = await authFetch(`/vendor-notifications/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      setList((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#fff8e8] pt-24 px-4 pb-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <ArrowRight size={18} />
            بازگشت
          </button>

          <div className="flex items-center gap-2">
            <Bell className="text-yellow-600" />
            <h1 className="text-lg font-black text-yellow-700">
              اعلان‌های فروشنده
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          <button
            onClick={clearAll}
            disabled={list.length === 0}
            className="rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 disabled:text-gray-400"
          >
            پاک کردن همه
          </button>
        </div>

        {list.length === 0 ? (
          <div className="rounded-3xl border border-yellow-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-3 text-3xl">🌿</div>
            <div className="font-bold text-gray-700">
              فعلاً اعلانی برای فروشنده وجود ندارد
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((n) => (
              <div
                key={n.id}
                className={`rounded-2xl border bg-white p-4 shadow-sm ${
                  n.read ? "border-gray-200" : "border-yellow-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-sm font-black text-gray-800">
                      {n.title || "اعلان جدید"}
                    </div>

                    {n.body && (
                      <div className="mt-1 text-xs leading-6 text-gray-500">
                        {n.body}
                      </div>
                    )}

                    {n.createdAt && (
                      <div className="mt-2 text-[11px] text-gray-400">
                        {new Date(n.createdAt).toLocaleString("fa-IR")}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {!n.read && (
                      <button
                        onClick={() => markOneRead(n.id)}
                        className="rounded-xl bg-yellow-500 px-3 py-2 text-xs font-bold text-white"
                      >
                        خواندم
                      </button>
                    )}

                    <button
                      onClick={() => deleteOne(n.id)}
                      className="rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}