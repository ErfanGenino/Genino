// src/components/FamilyTree/InviteModal.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authFetch } from "../../services/api";

export default function InviteModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  target,
  child, // فعلاً لازم نیست ولی نگهش می‌داریم برای آینده
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ✅ هر بار مودال باز شد یا نقش/slot عوض شد، فرم ریست شود
  useEffect(() => {
    if (!open) return;
    setEmail("");
    setPhone("");
    setErr("");
    setLoading(false);
  }, [open, target?.childId, target?.relationType, target?.slot]);

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

  async function handleSend() {
    setErr("");

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

      // ✅ موفق: FamilyTree بیرون از این مودال، نود را PENDING می‌کند
      // ✅ و ShareInviteModal را باز می‌کند
      onConfirm?.(res);

      // ✅ این مودال باید بسته شود تا دوکاره نشود
      onClose?.();

      // پاک کردن ورودی‌ها (ایمنی بیشتر)
      setEmail("");
      setPhone("");
      setErr("");
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
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setErr("");
                setEmail("");
                setPhone("");
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
