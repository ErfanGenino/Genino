// src/components/Dashboard/TodayCalendarBox.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { CalendarDays, Sparkles, X } from "lucide-react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

export default function TodayCalendarBox({ color = "pink", className = "" }) {
  const [todayPersian, setTodayPersian] = useState("");
  const [todayGregorian, setTodayGregorian] = useState("");
  const [weeklyMarketTitle, setWeeklyMarketTitle] = useState("");
  const [showMarketModal, setShowMarketModal] = useState(false);

  useEffect(() => {
    const nowPersian = new DateObject({ calendar: persian, locale: persian_fa });
    const nowGregorian = new DateObject({ calendar: gregorian });

    setTodayPersian(nowPersian.format("dddd D MMMM YYYY"));
    setTodayGregorian(nowGregorian.format("dddd, MMMM D, YYYY"));

    const dayName = nowPersian.format("dddd");

    const marketMap = {
      شنبه: "شنبه‌بازار",
      یکشنبه: "یکشنبه‌بازار",
      دوشنبه: "دوشنبه‌بازار",
      سه‌شنبه: "سه‌شنبه‌بازار",
      چهارشنبه: "چهارشنبه‌بازار",
      پنجشنبه: "پنجشنبه‌بازار",
      جمعه: "جمعه‌بازار",
    };

    setWeeklyMarketTitle(marketMap[dayName] || "بازار هفتگی");
  }, []);

  const colorMap = {
    pink: {
      border: "border-pink-200",
      text: "text-pink-700",
      icon: "text-pink-500",
    },
    yellow: {
      border: "border-yellow-300",
      text: "text-yellow-700",
      icon: "text-yellow-500",
    },
    blue: {
      border: "border-blue-300",
      text: "text-blue-700",
      icon: "text-blue-500",
    },
  };

  const c = colorMap[color] || colorMap.pink;

  return (
    <>
      <motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, ease: "easeOut" }}
  className={`relative z-[5] w-full ${className}`}
>
  {/* تقویم - موبایل و دسکتاپ */}
<div
  className="
    w-full
    rounded-none
    border-y
    border-yellow-200
    bg-gradient-to-l
    from-[#fffaf0]
    via-[#fff4cf]
    to-[#f6df9b]
    px-3
    py-2
    shadow-[0_5px_18px_rgba(120,85,38,0.10)]
  "
>
    <div className="flex items-center justify-between gap-2">

      {/* بخش تاریخ */}
      <div className="flex min-w-0 flex-1 items-center gap-2">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-gradient-to-br
            from-[#4b2f17]
            via-[#9b6a26]
            to-[#d4af37]
            text-white
            shadow-sm
          "
        >
          <CalendarDays className="h-4 w-4" />
        </div>

        <div className="min-w-0 text-right">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-[#a2711d]">
              امروز
            </span>

            <span className="h-1 w-1 rounded-full bg-[#d4af37]" />

            <span className="truncate text-[12px] font-black text-[#4b2f17]">
              {todayPersian}
            </span>
          </div>

          <p className="mt-0.5 truncate text-[9px] font-medium text-gray-500">
            {todayGregorian}
          </p>
        </div>
      </div>

      {/* دکمه بازار */}
      <motion.button
  type="button"
  onClick={() => setShowMarketModal(true)}
  whileTap={{ scale: 0.96 }}
  className="
    flex
    shrink-0
    min-w-[118px]
    items-center
    justify-center
    gap-1.5
    rounded-xl
    bg-gradient-to-l
    from-[#4b2f17]
    via-[#8c5f25]
    to-[#c99d35]
    px-4
    py-3
    text-[11px]
    font-black
    text-white
    shadow-[0_5px_14px_rgba(120,85,38,0.25)]
  "
>
  <Sparkles className="h-4 w-4 shrink-0 text-yellow-100" />

  <span className="whitespace-nowrap">
    ورود به {weeklyMarketTitle}
  </span>
</motion.button>

    </div>
  </div>

  
</motion.div>

      {createPortal(
  <AnimatePresence>
    {showMarketModal && (
      <motion.div
        className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowMarketModal(false)}
      >
        <motion.div
          className="
            relative w-full max-w-md overflow-hidden
            rounded-[2rem]
            border border-yellow-200
            bg-gradient-to-br from-[#fff8e8] via-[#f3e3bd] to-[#7a5526]
            p-5 text-center
            shadow-2xl
          "
          initial={{ opacity: 0, y: 22, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 22, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-300/35 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-[#4b2f17]/35 blur-3xl" />

          <button
            type="button"
            onClick={() => setShowMarketModal(false)}
            className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#7a5526] shadow-sm transition hover:bg-white"
          >
            <X size={17} />
          </button>

          <div className="relative z-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#4b2f17] via-[#9b6a26] to-[#d4af37] text-white shadow-[0_14px_35px_rgba(120,85,38,0.35)]">
              <Sparkles size={30} />
            </div>

            <h2 className="text-lg font-black text-[#4b2f17]">
              {weeklyMarketTitle} ژنینو
            </h2>

            <p className="mt-4 text-sm font-bold leading-8 text-[#5f3b18]">
              به‌زودی دنیایی پر از تخفیفات ژنینویی را در بازارهای هفتگی تجربه خواهید کرد.
            </p>

            <button
              type="button"
              onClick={() => setShowMarketModal(false)}
              className="
                mt-6 w-full rounded-2xl
                bg-gradient-to-l from-[#4b2f17] via-[#9b6a26] to-[#d4af37]
                px-5 py-3
                text-sm font-extrabold text-white
                shadow-[0_12px_28px_rgba(120,85,38,0.28)]
                transition hover:scale-[1.02] active:scale-[0.98]
              "
            >
              منتظر تخفیف‌های طلایی می‌مانم
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>,
  document.body
)}
    </>
  );
}