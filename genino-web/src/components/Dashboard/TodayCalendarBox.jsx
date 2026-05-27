// src/components/Dashboard/TodayCalendarBox.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

export default function TodayCalendarBox({ color = "pink", className = "" }) {
  const [todayPersian, setTodayPersian] = useState("");
  const [todayGregorian, setTodayGregorian] = useState("");

  useEffect(() => {
    const nowPersian = new DateObject({ calendar: persian, locale: persian_fa });
    const nowGregorian = new DateObject({ calendar: gregorian });
    setTodayPersian(nowPersian.format("dddd D MMMM YYYY"));
    setTodayGregorian(nowGregorian.format("dddd, MMMM D, YYYY"));
  }, []);

  const colorMap = {
    pink: { border: "border-pink-200", text: "text-pink-700", icon: "text-pink-500" },
    yellow: { border: "border-yellow-300", text: "text-yellow-700", icon: "text-yellow-500" },
    blue: { border: "border-blue-300", text: "text-blue-700", icon: "text-blue-500" },
  };
  const c = colorMap[color] || colorMap.pink;

  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className={`relative z-[5] bg-white/90 backdrop-blur-sm border ${c.border} rounded-xl shadow-sm px-3 py-2 mb-3 flex flex-col items-center justify-center text-center ${c.text} w-fit min-w-[220px] mx-auto ${className}`}
>
  <div className="flex items-center gap-1 mb-0.5">
  <CalendarDays className={`w-4 h-4 ${c.icon}`} />
  <span className="font-bold text-xs">امروز</span>
</div>
  <p className="text-sm font-semibold leading-tight">
  {todayPersian}
</p>

<p className="text-[11px] text-gray-500 mt-0.5">
  {todayGregorian}
</p>
</motion.div>
  );
}
