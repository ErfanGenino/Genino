// 📄 src/components/GeninoAssessmentStart.jsx
import { motion, AnimatePresence } from "framer-motion";
import GeninoButton from "@components/Core/GeninoButton";

export default function GeninoAssessmentStart({
  step,
  setStep,
  title,
  description,
  color = "emerald",
  buttonLabel = "شروع پایش",
}) {
  // 🎨 رنگ متن تیتر
  const colorMap = {
    emerald: "text-emerald-700 drop-shadow-[0_0_15px_rgba(13,148,136,0.3)]",
    sky: "text-sky-700 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    rose: "text-rose-700 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    amber: "text-amber-700 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    genino: "text-genino-700 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]",
  };

  // 🎨 رنگ دکمه (یکدست با تیتر)
  const buttonColorMap = {
    emerald: "bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(13,148,136,0.3)]",
    sky: "bg-sky-500 hover:bg-sky-600 shadow-[0_0_20px_rgba(56,189,248,0.35)]",
    rose: "bg-rose-500 hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    amber: "bg-amber-500 hover:bg-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    genino: "bg-genino-500 hover:bg-genino-600 shadow-[0_0_20px_rgba(255,215,0,0.4)]",
  };

  return (
    <>
      {/* 🌟 تیتر */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-3xl sm:text-4xl font-extrabold mb-20 text-center ${colorMap[color]}`}
      >
        {title}
      </motion.h1>

      {/* 🧠 توضیح و دکمه شروع */}
      <AnimatePresence mode="wait">
        {step === -1 && (
          <motion.section
            key="edu"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-center"
          >
            <p className="text-gray-700 leading-relaxed mb-20">{description}</p>

            {/* ✅ دکمه با رنگ انتخابی بدون تداخل */}
            <GeninoButton
              onClick={() => setStep(0)}
              className={`${buttonColorMap[color]} text-white font-bold px-8 py-3 rounded-full transition`}
              noDefaultStyle
            >
              {buttonLabel}
            </GeninoButton>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
