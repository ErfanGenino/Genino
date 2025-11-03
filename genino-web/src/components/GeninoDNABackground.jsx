// 🌟 GeninoDNABackground.jsx
// بک‌گراند DNA طلایی چرخان ژنینو ✨
// قابل استفاده در هر صفحه، با کنترل شدت، شفافیت و تعداد رشته‌ها

import { motion } from "framer-motion";

export default function GeninoDNABackground({
  strands = 8,           // تعداد رشته‌های DNA
  opacity = 0.3,         // شفافیت کلی
  color1 = "#d4af37",    // رنگ طلایی اصلی
  color2 = "#b88a1a",    // رنگ طلایی تیره‌تر
  duration = 80,         // سرعت چرخش
  className = "",         // کلاس اضافی (مثلاً absolute یا fixed)
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex: 1 }}>
      {Array.from({ length: strands }).map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            opacity: opacity,
            transformOrigin: "center",
          }}
          animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
          transition={{
            duration: duration + Math.random() * 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <defs>
            <linearGradient id={`dnaGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>

          {/* دو رشته اصلی DNA */}
          <path
            d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
            stroke={`url(#dnaGrad-${i})`}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
            stroke={`url(#dnaGrad-${i})`}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* نردبان‌های بین دو رشته */}
          {Array.from({ length: 6 }).map((_, j) => (
            <line
              key={j}
              x1="30"
              y1={20 + j * 25}
              x2="70"
              y2={30 + j * 25}
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="1.5"
              opacity="0.7"
            />
          ))}
        </motion.svg>
      ))}
    </div>
  );
}
