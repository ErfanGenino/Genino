// 📄 src/pages/Events.jsx
import { motion } from "framer-motion";
import { PartyPopper, CalendarDays } from "lucide-react";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import TodayCalendarBox from "@components/Dashboard/TodayCalendarBox";

export default function Events() {
  const events = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `رویداد ${i + 1}`,
    organizer: "ژنینو",
    date: "25 آذر 1404",
    image: `/images/events/${(i % 5) + 1}.jpg`,
  }));

  return (
    <GeninoDNABackground opacity={0.45} strands={10} duration={70}>
      <main className="relative min-h-screen flex flex-col items-center justify-start text-gray-800 pt-24 pb-24">
        {/* 🎉 تیتر صفحه */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-700 drop-shadow-[0_0_12px_rgba(255,220,100,0.6)]">
            رویدادها و جشن‌های ژنینو
          </h1>
          <div className="mt-2 flex justify-center items-center gap-2 text-yellow-600 font-semibold text-lg">
            <PartyPopper className="w-6 h-6" />
            <span>هر روز، فرصتی برای شادی و یادگیری 🌟</span>
          </div>
        </motion.div>

        {/* 📅 تقویم امروز */}
        <motion.div
          className="w-full flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-full max-w-xl px-4">
            <TodayCalendarBox color="yellow" />
          </div>
        </motion.div>

        {/* 🧩 باکس رویدادهای ژنینویی */}
        <section className="w-full max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
            رویدادهای ژنینویی 💫
          </h2>

          {/* 🎟️ شبکه کارت‌ها */}
          <div
            className="
              grid
              grid-cols-2 gap-4
              sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
              place-items-center
            "
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="w-full max-w-[220px] bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-yellow-100 hover:shadow-lg hover:-translate-y-1 transition-all"
                whileHover={{ scale: 1.03 }}
              >
                {/* عنوان */}
                <div className="text-center text-yellow-700 font-semibold text-base py-2 px-2 truncate">
                  {event.title}
                </div>

                {/* عکس */}
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>

                {/* برگزارکننده و تاریخ */}
                <div className="flex flex-col items-center py-2 text-sm text-gray-700">
                  <span className="font-medium">{event.organizer}</span>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <CalendarDays className="w-4 h-4 text-yellow-600" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 📄 دکمه‌های صفحه‌گردان */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow-md transition-all flex items-center gap-2">
              <span className="text-lg">⏩</span>
              <span>صفحه قبل</span>
              
            </button>

            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow-md transition-all flex items-center gap-2">
              <span>صفحه بعد</span>
              <span className="text-lg">⏪</span>
            </button>
          </div>
        </section>
      </main>
    </GeninoDNABackground>
  );
}
