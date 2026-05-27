import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Sparkles,
  Sunrise,
  Heart,
  Mountain,
  Flame,
  Smile,
  X,
} from "lucide-react";

const inspirations = [
  {
    title: "شروع دوباره همیشه ممکن است",
    desc: "گاهی فقط یک تصمیم کوچک می‌تواند مسیر زندگی را تغییر دهد.",
    icon: Sunrise,
    content:
      "لازم نیست همه‌چیز کامل باشد تا دوباره شروع کنی. بسیاری از تغییرهای بزرگ، از یک قدم کوچک و آرام آغاز شده‌اند.",
  },
  {
    title: "با خودت مهربان‌تر باش",
    desc: "همیشه قرار نیست قوی و بی‌نقص باشی.",
    icon: Heart,
    content:
      "گاهی خسته می‌شوی، اشتباه می‌کنی یا عقب می‌مانی. این بخشی از انسان بودن است. مهربانی با خود، نشانه ضعف نیست؛ نشانه بلوغ است.",
  },
  {
    title: "قدم‌های کوچک را دست‌کم نگیر",
    desc: "پیشرفت آرام، هنوز هم پیشرفت است.",
    icon: Mountain,
    content:
      "موفقیت‌های بزرگ معمولاً ناگهانی اتفاق نمی‌افتند. استمرار در قدم‌های کوچک، آرام‌آرام آینده را می‌سازد.",
  },
  {
    title: "انرژی تو روی اطرافیانت اثر می‌گذارد",
    desc: "آرامش تو می‌تواند به دیگران هم منتقل شود.",
    icon: Sparkles,
    content:
      "گاهی فقط آرام‌تر صحبت کردن، بیشتر گوش دادن و کمتر واکنش نشان دادن می‌تواند فضای یک خانه یا رابطه را تغییر دهد.",
  },
  {
    title: "خسته بودن به معنی شکست نیست",
    desc: "استراحت بخشی از مسیر رشد است.",
    icon: Flame,
    content:
      "همه آدم‌ها گاهی خسته می‌شوند. مهم این نیست که همیشه پرانرژی باشی؛ مهم این است که بعد از استراحت دوباره ادامه بدهی.",
  },
  {
    title: "هر روز لازم نیست عالی باشی",
    desc: "کافی است امروز کمی آگاه‌تر از دیروز باشی.",
    icon: Smile,
    content:
      "رشد واقعی یعنی بهتر شدن تدریجی، نه کامل بودن. حتی تغییرهای کوچک ذهنی هم ارزشمندند.",
  },
];

export default function Inspiration() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="الهام روزانه">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 border border-yellow-200 shadow-inner mb-4">
            <Sparkles className="text-yellow-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-yellow-700 mb-3">
            الهام روزانه ژنینو
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            چند جمله و یادآوری کوتاه برای آرام‌تر شدن، ادامه دادن و ساختن
            نسخه‌ای بهتر از خودت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {inspirations.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-yellow-50 to-white border border-yellow-200 shadow-sm hover:shadow-[0_0_22px_rgba(255,220,100,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0">
                    <Icon className="text-yellow-600" size={22} />
                  </div>

                  <h3 className="font-bold text-yellow-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-yellow-700">
                  مطالعه کوتاه ←
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-gray-500 text-sm italic"
        >
          ✨ بعضی جمله‌ها، دقیقاً در زمان درست به قلب آدم می‌رسند.
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-3xl bg-white border border-yellow-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-yellow-700 leading-8">
                  {selectedItem.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <p className="text-gray-700 text-sm leading-8">
                {selectedItem.content}
              </p>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
              >
                متوجه شدم
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}