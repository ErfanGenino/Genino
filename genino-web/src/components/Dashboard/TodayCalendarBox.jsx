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
  className={`relative z-[5] bg-white border ${c.border} rounded-2xl shadow-sm px-5 py-5 mb-8 flex flex-col items-center justify-center text-center ${c.text} w-[85%] sm:w-[70%] md:w-[55%] lg:w-[45%] mx-auto ${className}`}
>
  <div className="flex items-center gap-2 mb-1">
    <CalendarDays className={`w-5 h-5 ${c.icon}`} />
    <span className="font-bold text-base">امروز</span>
  </div>
  <p className="text-base font-semibold leading-tight">{todayPersian}</p>
  <p className="text-sm text-gray-600 mt-1">{todayGregorian}</p>
</motion.div>
  );
}
