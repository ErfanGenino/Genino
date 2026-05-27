import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserRoundCog, X, User, Heart, Users, Baby, Sparkles } from "lucide-react";

const lifeStages = [
  {
    key: "normal",
    label: "کاربر عادی",
    path: "/dashboard-user",
    icon: User,
  },
  {
    key: "single",
    label: "مجرد",
    path: "/dashboard-single",
    icon: Sparkles,
  },
  {
    key: "married",
    label: "متاهل",
    path: "/dashboard-couple",
    icon: Heart,
  },
  {
    key: "prebirth",
    label: "در آستانه فرزندآوری",
    path: "/dashboard-pregnancy",
    icon: Baby,
  },
  {
    key: "parent",
    label: "والد",
    path: "/dashboard-parent",
    icon: Users,
  },
];

export default function LifeStageSwitcher({ currentStage = "single" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const current = lifeStages.find((item) => item.key === currentStage);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center gap-2
          rounded-2xl border border-yellow-200
          bg-white/75 px-4 py-2
          text-sm font-bold text-yellow-800
          shadow-sm hover:bg-yellow-50
          transition-all duration-300
        "
      >
        <UserRoundCog size={17} />
        تغییر در مرحله زندگی
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/45 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              dir="rtl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 18 }}
              transition={{ duration: 0.22 }}
              className="
                w-full max-w-md rounded-3xl
                border border-yellow-200
                bg-white/95 p-5
                shadow-[0_24px_70px_rgba(120,80,0,0.25)]
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-yellow-800">
                  تغییر در مرحله زندگی
                </h3>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-yellow-700 hover:bg-yellow-50"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-2xl bg-yellow-50/80 p-4 text-sm leading-7 text-gray-700">
                شما در مرحله{" "}
                <span className="font-extrabold text-yellow-800">
                  {current?.label || "تعریف‌نشده"}
                </span>{" "}
                هستید.
                <br />
                برای تغییر مرحله زندگی اصلی خود باید به پروفایل مراجعه کنید.

                <div className="mt-4 flex justify-center">
  <button
    type="button"
    onClick={() => {
      setOpen(false);
      navigate("/social/profile");
    }}
    className="
      rounded-2xl
      bg-gradient-to-r from-yellow-400 to-amber-300
      px-5 py-2
      text-sm font-bold text-white
      shadow-md
      hover:scale-[1.02]
      transition-all duration-300
    "
  >
    رفتن به پروفایل
  </button>
</div>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-sm font-extrabold text-gray-700">
                  مراحل زندگی تعریف‌شده در ژنینو
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {lifeStages.map((stage) => {
                    const Icon = stage.icon;
                    const isActive = stage.key === currentStage;

                    return (
                      <button
                        key={stage.key}
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          navigate(stage.path);
                        }}
                        className={`
                          flex items-center justify-between
                          rounded-2xl px-4 py-3
                          text-sm font-bold transition-all duration-300
                          ${
                            isActive
                              ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
                              : "bg-white text-gray-700 border border-gray-100 hover:bg-yellow-50 hover:text-yellow-800"
                          }
                        `}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={17} />
                          {stage.label}
                        </span>

                        {isActive && (
                          <span className="text-[11px] text-yellow-700">
                            مرحله فعلی
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}