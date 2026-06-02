import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartHandshake,
  Sparkles,
  ArrowLeft,
  Mail,
  Phone,
  UserRound,
  X,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:80/api";

export default function LifeCompanionButton() {
    const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");
  const [isSending, setIsSending] = useState(false);

  const resetForm = () => {
    setInviteEmail("");
    setInvitePhone("");
    setInviteUsername("");
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSendInvite = async () => {
  try {
    const value =
      inviteUsername.trim() ||
      inviteEmail.trim() ||
      invitePhone.trim();

    if (!value) {
      alert("نام کاربری، ایمیل یا شماره موبایل را وارد کنید");
      return;
    }

    setIsSending(true);

    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/invite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "ارسال دعوت انجام نشد");
      return;
    }

    alert("دعوت همراه زندگی ارسال شد");

    closeModal();

    navigate("/life-companion");
  } catch (err) {
    console.error(err);

    alert("خطا در ارتباط با سرور");
  } finally {
    setIsSending(false);
  }
};

const handleOpenLifeCompanion = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data?.hasCompanion) {
      navigate("/life-companion");
      return;
    }

    setShowModal(true);
  } catch (err) {
    console.error(err);
    setShowModal(true);
  }
};

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="mt-7 mb-10 flex justify-center"
      >
        <button
          type="button"
          onClick={handleOpenLifeCompanion}
          className="group relative w-full max-w-3xl overflow-hidden rounded-3xl border border-rose-200/80 bg-gradient-to-l from-rose-50 via-amber-50 to-white p-[1px] shadow-[0_18px_45px_rgba(244,114,182,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(244,114,182,0.28)]"
        >
          <div className="relative flex items-center justify-between gap-4 rounded-3xl bg-white/75 px-5 py-5 backdrop-blur-md sm:px-7">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />

            <div className="relative flex items-center gap-4 text-right">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-amber-300 text-white shadow-lg shadow-rose-200/60">
                <HeartHandshake size={28} />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <h3 className="text-lg font-extrabold text-rose-700 sm:text-xl">
                    همراه زندگی من
                  </h3>
                </div>

                <p className="text-xs leading-6 text-gray-600 sm:text-sm">
                  برنامه‌ها، کارهای مشترک، قرارها و لحظه‌های مهم زندگی شما
                </p>
              </div>
            </div>

            <div className="relative hidden items-center gap-2 rounded-full bg-gradient-to-l from-rose-500 to-amber-400 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 group-hover:scale-105 sm:flex">
              ورود
              <ArrowLeft size={17} />
            </div>

            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 sm:hidden">
              <ArrowLeft size={20} />
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-b from-white via-rose-50/70 to-amber-50 p-5 shadow-2xl"
              initial={{ opacity: 0, y: 26, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 26, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose-300/35 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-300/35 blur-3xl" />

              <button
                type="button"
                onClick={closeModal}
                className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition hover:bg-white hover:text-rose-600"
              >
                <X size={18} />
              </button>

              <div className="relative z-10 text-center">
                <motion.div
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 text-white shadow-[0_14px_40px_rgba(244,114,182,0.35)]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeartHandshake size={38} />
                </motion.div>

                <h2 className="text-xl font-black text-rose-800">
                  همراه زندگی من
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-gray-600">
                  اینجا فضای دونفره و شخصی شماست؛ جایی برای برنامه‌های مشترک،
                  قرارها، لیست‌ها، مراقبت از همدیگر و لحظه‌های مهم زندگی.
                </p>

                <div className="mt-4 rounded-3xl border border-rose-100 bg-white/75 p-4 text-sm font-bold leading-7 text-rose-700 shadow-sm">
                  همسر یا شریک زندگی خود را به این صفحه دو نفره شخصی دعوت کنید.
                </div>
              </div>

              <div className="relative z-10 mt-6 space-y-4 text-right">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
                    <Mail size={15} />
                    ایمیل
                  </label>
                  <input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    type="email"
                    placeholder="مثلاً name@gmail.com"
                    className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
                    <Phone size={15} />
                    یا شماره موبایل
                  </label>
                  <input
                    value={invitePhone}
                    onChange={(e) => setInvitePhone(e.target.value)}
                    type="text"
                    placeholder="مثلاً 0912..."
                    className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
                    <UserRound size={15} />
                    یا نام کاربری
                  </label>
                  <input
                    value={inviteUsername}
                    onChange={(e) => setInviteUsername(e.target.value)}
                    type="text"
                    placeholder="مثلاً user-genino"
                    className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                  />
                </div>
              </div>

              <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSendInvite}
                  disabled={isSending}
                  className={`flex-1 rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-all ${
                    isSending
                      ? "bg-gray-300"
                      : "bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Send size={17} />
                    {isSending ? "در حال ارسال..." : "ارسال دعوت"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-rose-200 bg-white/80 px-5 py-3 text-sm font-extrabold text-rose-700 transition hover:bg-rose-50 sm:w-32"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}