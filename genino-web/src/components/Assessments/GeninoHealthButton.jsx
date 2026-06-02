import { motion } from "framer-motion";

export default function GeninoHealthButton({
  title,
  icon: Icon,
  onClick,
  color = "gold",
  delay = 0,
}) {
  const themes = {
    gold: {
      button: "from-yellow-300 via-yellow-500 to-amber-600 border-yellow-200",
      shadow: "shadow-[0_0_80px_rgba(255,220,100,0.65)]",
      hover: "0 0 150px rgba(255,230,120,0.9)",
      glow: "from-yellow-400/20 to-white/40",
    },
    medical: {
      button: "from-emerald-300 via-teal-400 to-cyan-600 border-emerald-100",
      shadow: "shadow-[0_0_80px_rgba(45,212,191,0.55)]",
      hover: "0 0 150px rgba(45,212,191,0.85)",
      glow: "from-emerald-300/20 to-white/40",
    },
  };

  const theme = themes[color] || themes.gold;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative mx-auto flex items-center justify-center rounded-full
        bg-gradient-to-br ${theme.button}
        text-white ${theme.shadow}
        w-36 h-36 sm:w-44 sm:h-44
        font-extrabold text-center
        border-[8px] sm:border-[10px]
        select-none
      `}
      whileHover={{
        scale: 1.05,
        rotate: [0, 1.5, -1.5, 0],
        boxShadow: theme.hover,
      }}
      whileTap={{ scale: 0.97 }}
      animate={{
        y: [0, -8, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center px-3">
        {Icon && (
          <Icon className="w-12 h-12 sm:w-16 sm:h-16 mb-3 drop-shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
        )}

        <span className="text-[12px] sm:text-sm tracking-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] leading-snug">
          {title}
        </span>
      </div>

      <div
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-t ${theme.glow}
          blur-[90px] animate-pulse
        `}
      />

      <div
        className="
          absolute top-0 left-0
          w-24 h-24 sm:w-32 sm:h-32
          bg-white/45 rounded-full blur-[70px]
          -translate-x-5 -translate-y-5 opacity-60
        "
      />
    </motion.button>
  );
}