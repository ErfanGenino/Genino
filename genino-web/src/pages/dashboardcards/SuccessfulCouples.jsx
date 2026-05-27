import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Sparkles,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Smile,
  Clock3,
  Brain,
  HandHeart,
  X,
} from "lucide-react";

const successfulCouplesItems = [
  {
    title: "زوج موفق یعنی زوج بی‌مشکل؟",
    desc: "رابطه سالم، بدون اختلاف نیست.",
    icon: ShieldCheck,
    content:
      "خیلی‌ها فکر می‌کنند زوج‌های موفق هیچ دعوا یا ناراحتی‌ای ندارند، در حالی که تقریباً همه رابطه‌ها اختلاف و روزهای سخت دارند.\n\nتفاوت اصلی این است که زوج‌های بالغ یاد گرفته‌اند چطور بعد از اختلاف دوباره به هم برگردند، گفت‌وگو کنند و رابطه را وارد جنگ دائمی نکنند.\n\nموفق بودن در رابطه یعنی توانایی مراقبت از رابطه، نه کامل بودن.",
  },

  {
    title: "احترام، حتی وسط ناراحتی",
    desc: "لحن رابطه را می‌سازد یا خراب می‌کند.",
    icon: MessageCircle,
    content:
      "زوج‌های موفق معمولاً حتی وقتی ناراحت‌اند، تلاش می‌کنند تحقیر، تمسخر یا بی‌احترامی نکنند.\n\nآدم‌ها ممکن است حرف تلخ را فراموش کنند، اما حس تحقیر شدن را دیرتر فراموش می‌کنند.\n\nرابطه سالم جایی است که آدم هنوز بتواند در اختلاف هم احساس امنیت کند.",
  },

  {
    title: "تیم بودن",
    desc: "مسئله، دشمن است؛ نه همدیگر.",
    icon: HeartHandshake,
    content:
      "خیلی از زوج‌های موفق نگاه «من در مقابل تو» ندارند؛ نگاهشان «ما در مقابل مشکل» است.\n\nوقتی دو نفر یاد بگیرند به‌جای رقابت، کنار هم قرار بگیرند، فشار زندگی خیلی قابل‌تحمل‌تر می‌شود.\n\nرابطه سالم یعنی دو نفر احساس کنند در یک تیم هستند.",
  },

  {
    title: "وقت گذاشتن برای رابطه",
    desc: "رابطه خوب، خودبه‌خود زنده نمی‌ماند.",
    icon: Clock3,
    content:
      "خیلی از رابطه‌ها نه به‌خاطر خیانت، بلکه به‌خاطر فراموش شدن آرام‌آرام سرد می‌شوند.\n\nکار، موبایل، خستگی و روزمرگی اگر تمام انرژی آدم را بگیرند، رابطه کم‌کم به حاشیه می‌رود.\n\nزوج‌های موفق معمولاً آگاهانه برای رابطه‌شان وقت می‌گذارند؛ حتی کوتاه.",
  },

  {
    title: "بلوغ احساسی",
    desc: "همه احساسات را نباید فوراً تخلیه کرد.",
    icon: Brain,
    content:
      "بلوغ احساسی یعنی آدم بتواند قبل از واکنش شدید، کمی مکث کند.\n\nخیلی وقت‌ها عصبانیت، خستگی، ترس یا فشار کاری باعث می‌شود حرف‌هایی بزنیم که واقعاً منظور قلبی‌مان نیست.\n\nزوج‌های بالغ معمولاً یاد می‌گیرند احساسات را بهتر مدیریت کنند، نه اینکه انکارشان کنند.",
  },

  {
    title: "قدردانی هنوز مهم است",
    desc: "رابطه با دیده شدن زنده می‌ماند.",
    icon: HandHeart,
    content:
      "وقتی آدم احساس کند زحمت‌ها، حضور و محبتش دیده می‌شود، آرامش بیشتری در رابطه تجربه می‌کند.\n\nتشکرهای ساده، توجه به کارهای کوچک و بیان محبت، اثر عمیقی روی کیفیت رابطه دارند.\n\nبعضی رابطه‌ها فقط به این دلیل سرد می‌شوند که دو نفر کم‌کم همدیگر را بدیهی فرض می‌کنند.",
  },

  {
    title: "شوخی و خنده در رابطه",
    desc: "رابطه فقط جدیت و مسئولیت نیست.",
    icon: Smile,
    content:
      "زوج‌هایی که هنوز می‌توانند کنار هم بخندند، شوخی کنند و لحظه‌های سبک داشته باشند، معمولاً فشارهای زندگی را بهتر تحمل می‌کنند.\n\nخنده فقط سرگرمی نیست؛ نوعی اتصال احساسی است.",
  },

  {
    title: "رابطه موفق یعنی رابطه در حال رشد",
    desc: "هیچ رابطه‌ای ثابت نمی‌ماند.",
    icon: Sparkles,
    content:
      "آدم‌ها در طول زندگی تغییر می‌کنند؛ نیازها، دغدغه‌ها و حتی نگاهشان به دنیا عوض می‌شود.\n\nزوج‌های موفق معمولاً سعی می‌کنند همراه رشد هم حرکت کنند، نه اینکه انتظار داشته باشند رابطه همیشه مثل روز اول بماند.\n\nرابطه سالم یعنی دو نفر هنوز برای شناختن هم کنجکاوند.",
  },
];

export default function SuccessfulCouples() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="زوج‌های موفق">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Sparkles className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            زوج‌های موفق
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            نگاه‌هایی واقعی به رابطه‌های پایدار، آرام و بالغ؛ رابطه‌هایی که
            با مراقبت، احترام و رشد مشترک ساخته می‌شوند.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {successfulCouplesItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-pink-50 to-white border border-pink-200 shadow-sm hover:shadow-[0_0_22px_rgba(255,160,200,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center shrink-0">
                    <Icon className="text-pink-500" size={22} />
                  </div>

                  <h3 className="font-bold text-pink-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-pink-600">
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
          ✨ رابطه موفق، بیشتر از شانس، به مراقبت و بلوغ نیاز دارد.
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
              className="w-full max-w-xl rounded-3xl bg-white border border-pink-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-pink-700 leading-8">
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

              <div className="text-gray-700 text-sm leading-9 space-y-5 whitespace-pre-line">
                {selectedItem.content}
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
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