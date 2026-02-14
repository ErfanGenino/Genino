// src/components/FamilyTree/InviteModal.jsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authFetch } from "../../services/api";

export default function InviteModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  target,
  child,
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");


  // ✅ NEW: لینک دعوت
  const [inviteLink, setInviteLink] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const relationTypeNormalized = useMemo(() => {
    const rt = target?.relationType;
    const map = {
      KH: "khale",
      DY: "dayi",
      AM: "amme",
      AO: "ammo",
      FR: "friend",
      RL: "relative",
      S: "sister",
      B: "brother",
      grandfather_paternal: "grandfather_paternal",
      grandmother_paternal: "grandmother_paternal",
      grandfather_maternal: "grandfather_maternal",
      grandmother_maternal: "grandmother_maternal",
    };
    return map[rt] || rt || null;
  }, [target]);

  function buildInviteLink(token) {
    // ✅ لینک قابل ارسال برای همه (حتی وقتی خودت لوکال تست می‌کنی)
    const publicBase = "https://genino.ir";
    return `${publicBase}/invite/${encodeURIComponent(token)}`;
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  async function handleSend() {
    setErr("");
    setCopyMsg("");
    setInviteLink("");
    setInviteMessage("");

    if (!target?.childId) {
      setErr("شناسه کودک مشخص نیست. اول یک کودک را انتخاب کنید.");
      return;
    }

    if (!email && !phone) {
      setErr("ایمیل یا شماره موبایل را وارد کنید.");
      return;
    }

    if (email && !email.includes("@")) {
      setErr("فرمت ایمیل درست نیست.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        childId: target.childId,
        email: email || undefined,
        phone: phone || undefined,
        relationType: relationTypeNormalized,
        slot: Number.isFinite(target.slot) ? target.slot : undefined,
        roleLabel: target.roleLabel || target.label,
      };

      const res = await authFetch("/invitations", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res?.ok) {
        setErr(res?.message || "ارسال دعوت ناموفق بود.");
        return;
      }

      // ✅ NEW: لینک دعوت از token
      if (res?.token) {
  const link = buildInviteLink(res.token);
  setInviteLink(link);

  if (child?.fullName) {
    const message = `🌿 دعوت به ژنینو

شما به عنوان ${target?.roleLabel || target?.label}ِ ${child.fullName}
به ژنینو و صفحه ${child.fullName} دعوت شده‌اید.

با پذیرش این دعوت می‌توانید همراه ${child.fullName} باشید.

لینک پذیرش دعوت:
${link}
`;
    setInviteMessage(message);
  } else {
    setInviteMessage("");
  }

} else {
  setInviteLink("");
  setCopyMsg("⚠️ توکن از سمت سرور برنگشت. (برای لینک باید token برگردد)");
}

      // ✅ موفق: FamilyTree خودش node را PENDING کند
      onConfirm?.(res);

      // پاک کردن ورودی‌ها
      setEmail("");
      setPhone("");
    } catch (e) {
      setErr("خطا در اتصال به سرور.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-[300]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl"
        >
          <h2 className="text-lg font-extrabold text-gray-800 mb-2 text-center">
            {title}
          </h2>

          <p className="text-sm text-gray-600 mb-4 text-center">
            {description}
          </p>

          {/* ورودی‌ها */}
          <div className="space-y-3 mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل (اختیاری)"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="موبایل (اختیاری)"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {err && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {err}
              </div>
            )}

            {/* ✅ NEW: نمایش لینک دعوت */}
            {inviteLink && (
              <div className="text-sm bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="font-semibold text-green-800 mb-2">
                  ✅ لینک دعوت آماده است
                </div>

                <div className="text-xs text-gray-700 break-all bg-white/70 border border-green-100 rounded-lg px-2 py-2">
                  {inviteLink}
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={async () => {
                      const ok = await copyToClipboard(inviteLink);
                      setCopyMsg(ok ? "✅ کپی شد" : "❌ کپی نشد (مرورگر اجازه نداد)");
                      if (ok) setTimeout(() => setCopyMsg(""), 1200);
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  >
                    کپی لینک
                  </button>

                  <a
                    href={inviteLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center px-3 py-2 rounded-xl border border-green-300 text-green-800 hover:bg-green-50 transition font-semibold"
                  >
                    باز کردن
                  </a>
                </div>

                {copyMsg && (
                  <div className="mt-2 text-xs text-gray-700">
                    {copyMsg}
                  </div>
                )}
              </div>
            )}

            {/* ✅ NEW: نمایش متن آماده دعوت */}
{inviteMessage && (
  <div className="text-sm bg-blue-50 border border-blue-200 rounded-xl p-3">
    <div className="font-semibold text-blue-800 mb-2">
      ✉️ متن آماده برای ارسال
    </div>

    <div className="text-xs text-gray-800 whitespace-pre-wrap bg-white/70 border border-blue-100 rounded-lg px-2 py-2">
      {inviteMessage}
    </div>

    <div className="flex gap-2 mt-3">
      <button
        type="button"
        onClick={async () => {
          const ok = await copyToClipboard(inviteMessage);
          setCopyMsg(ok ? "✅ متن کپی شد" : "❌ کپی نشد (مرورگر اجازه نداد)");
          if (ok) setTimeout(() => setCopyMsg(""), 1200);
        }}
        className="flex-1 px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        کپی متن کامل
      </button>
    </div>
  </div>
)}

            {copyMsg && !inviteLink && (
              <div className="text-xs text-gray-700">{copyMsg}</div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                // پاکسازی وضعیت لینک وقتی مودال بسته میشه
                setInviteLink("");
                setCopyMsg("");
                setInviteMessage("");
                setErr("");
                onClose?.();
              }}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-60"
            >
              انصراف
            </button>

            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition disabled:opacity-60"
            >
              {loading ? "در حال ارسال..." : "ارسال دعوت"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
