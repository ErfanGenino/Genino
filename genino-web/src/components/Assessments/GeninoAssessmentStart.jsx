// 📄 src/components/GeninoAssessmentStart.jsx
import { motion, AnimatePresence } from "framer-motion";
import GeninoButton from "@components/Core/GeninoButton"; // ✅ دکمه جدید ژنینو

export default function GeninoAssessmentStart({
  step,
  setStep,
  title,
  description,
  color = "emerald",
  buttonLabel = "شروع پایش",
}) {
  const colorMap = {
    emerald: "text-emerald-700 drop-shadow-[0_0_15px_rgba(13,148,136,0.3)]",
    sky: "text-sky-700 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    rose: "text-rose-700 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    amber: "text-amber-700 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]",
  };

  return (
    <>
      {/* 🌟 تیتر بخش */}
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

            {/* ✅ استفاده از دکمه برند ژنینو */}
            <GeninoButton onClick={() => setStep(0)}>
              {buttonLabel}
            </GeninoButton>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
