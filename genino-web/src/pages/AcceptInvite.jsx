// src/pages/AcceptInvite.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authFetch } from "../services/api";

export default function AcceptInvite() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const safeToken = useMemo(() => (token ? String(token).trim() : ""), [token]);

  // ✅ چک لاگین: اگر JWT نداریم، برو لاگین و توکن دعوت رو نگه دار
  useEffect(() => {
    const jwt = localStorage.getItem("genino_token"); // اگر اسمش فرق داره همین خط رو اصلاح کن
    if (!jwt && safeToken) {
      localStorage.setItem("pendingInviteToken", safeToken);
      navigate(`/login?next=${encodeURIComponent(`/invite/${safeToken}`)}`, { replace: true });
    }
  }, [safeToken, navigate]);

  // تا وقتی لاگین نیستیم، چیزی رندر نکن (چون داریم ریدایرکت می‌کنیم)
  const jwt = localStorage.getItem("genino_token"); // اگر اسمش فرق داره همین خط رو هم اصلاح کن
  if (!jwt) return null;

  async function handleAccept() {
    if (!safeToken) return;

    setLoading(true);
    setMsg("");

    try {
      const res = await authFetch("/invitations/accept", {
        method: "POST",
        body: JSON.stringify({ token: safeToken }),
      });

      if (!res?.ok) {
        setMsg(res?.message || "پذیرش دعوت ناموفق بود.");
        return;
      }

      // ✅ بعد از موفقیت، توکن pending رو پاک کن
      try {
        localStorage.removeItem("pendingInviteToken");
      } catch {}

      setMsg("✅ دعوت با موفقیت پذیرفته شد. در حال انتقال...");
      setTimeout(() => navigate("/mychild"), 800);
    } catch (e) {
      setMsg("❌ خطا در اتصال به سرور.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 border border-yellow-200 rounded-2xl shadow-sm p-6 text-center">
        <h1 className="text-lg font-extrabold text-yellow-900">دعوت‌نامه ژنینو</h1>

        <p className="mt-2 text-sm text-gray-600">
          برای اتصال به درختواره، روی دکمه زیر بزن.
        </p>

        <div className="mt-4 text-xs text-gray-500 break-all">
          Token: {safeToken || "—"}
        </div>

        {msg && <div className="mt-4 text-sm text-gray-800">{msg}</div>}

        <button
          onClick={handleAccept}
          disabled={!safeToken || loading}
          className={`mt-5 w-full rounded-xl py-3 font-bold transition
            ${
              loading || !safeToken
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
        >
          {loading ? "در حال پذیرش..." : "قبول دعوت"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-3 w-full rounded-xl py-3 font-semibold border border-gray-200 hover:bg-gray-50 transition"
        >
          برگشت به خانه
        </button>
      </div>
    </div>
  );
}
