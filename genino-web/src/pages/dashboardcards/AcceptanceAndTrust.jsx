import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Sparkles,
  Cloud,
  Heart,
  Waves,
  Brain,
  Leaf,
  Moon,
  HandHeart,
  X,
} from "lucide-react";

const trustItems = [
  {
    title: "همه‌چیز تحت کنترل ما نیست",
    desc: "و این الزاماً چیز بدی نیست.",
    icon: Cloud,
    content:
      "بخش بزرگی از اضطراب انسان از تلاش برای کنترل چیزهایی می‌آید که واقعاً قابل کنترل نیستند.\n\nآدم‌ها، آینده، اتفاقات زندگی، بیماری، زمان و خیلی از مسیرها همیشه دقیقاً مطابق برنامه ما پیش نمی‌روند.\n\nپذیرش این واقعیت، به معنی ضعیف بودن نیست؛ گاهی یعنی بالغ‌تر شدن.",
  },

  {
    title: "فرق تلاش و کنترل‌گری",
    desc: "تلاش سالم با وسواس فرق دارد.",
    icon: Brain,
    content:
      "ما مسئول تلاش کردن هستیم، نه تضمین نتیجه.\n\nآدم کنترل‌گر معمولاً می‌خواهد همه‌چیز دقیقاً مطابق ذهنش پیش برود و وقتی نمی‌شود، فرسوده می‌شود.\n\nاما تلاش سالم یعنی کاری که از دستمان برمی‌آید انجام دهیم و بعد بخشی از مسیر را رها کنیم.",
  },

  {
    title: "رها کردن بعضی آدم‌ها",
    desc: "همه قرار نیست مطابق انتظار ما رفتار کنند.",
    icon: Heart,
    content:
      "بعضی رنج‌ها از اینجا می‌آید که می‌خواهیم آدم‌ها دقیقاً همان چیزی باشند که ما انتظار داریم.\n\nاما انسان‌ها محدود، متفاوت و در حال تغییرند.\n\nگاهی آرامش از جایی شروع می‌شود که دست از تغییر دادن مداوم دیگران برمی‌داریم.",
  },

  {
    title: "توکل یعنی منفعل شدن؟",
    desc: "اعتماد، با تسلیم کامل فرق دارد.",
    icon: HandHeart,
    content:
      "توکل به معنی کنار گذاشتن تلاش نیست.\n\nآدم می‌تواند برنامه‌ریزی کند، تلاش کند، یاد بگیرد و مسئولیت بپذیرد؛ اما همزمان بپذیرد که همه نتیجه‌ها دست او نیست.\n\nتوکل سالم یعنی بعد از تلاش، ذهن را کمتر وارد جنگ دائمی با آینده کنیم.",
  },

  {
    title: "آرامش در ندانستن",
    desc: "همه جواب‌ها قرار نیست همین امروز روشن باشند.",
    icon: Moon,
    content:
      "ذهن انسان معمولاً از ابهام می‌ترسد و دوست دارد همه‌چیز را بداند؛ آینده، نتیجه، تصمیم درست یا اشتباه.\n\nاما بخش بزرگی از زندگی در ندانستن اتفاق می‌افتد.\n\nآرامش واقعی گاهی از پذیرفتن همین ابهام شروع می‌شود.",
  },

  {
    title: "ذهن خسته‌ی کنترل‌گر",
    desc: "کنترل دائمی، آرامش را کم می‌کند.",
    icon: Waves,
    content:
      "وقتی ذهن مدام در حال پیش‌بینی، نگرانی، سناریوسازی و کنترل همه‌چیز باشد، بدن هم خسته می‌شود.\n\nبعضی آدم‌ها حتی در زمان استراحت هم در حال جنگ ذهنی‌اند.\n\nیاد گرفتن رها کردن بعضی نگرانی‌ها، بخشی از مراقبت از ذهن است.",
  },

  {
    title: "پذیرش یعنی دوست داشتن درد؟",
    desc: "نه؛ یعنی جنگیدن دائمی با واقعیت را کمتر کنیم.",
    icon: Leaf,
    content:
      "پذیرش به این معنی نیست که اتفاق سخت را دوست داشته باشیم یا ناراحت نشویم.\n\nپذیرش یعنی بعد از مدتی، دست از انکار، مقاومت فرساینده و جنگ بی‌پایان با چیزی که اتفاق افتاده برداریم.\n\nبعضی زخم‌ها وقتی آرام‌تر می‌شوند که آدم دیگر تمام انرژی‌اش را صرف مخالفت با واقعیت نکند.",
  },

  {
    title: "زندگی همیشه قابل پیش‌بینی نیست",
    desc: "و شاید همین، بخشی از انسان بودن است.",
    icon: Sparkles,
    content:
      "هیچ انسانی نمی‌تواند همه آینده را پیش‌بینی کند.\n\nگاهی بهترین اتفاق‌ها غیرمنتظره‌اند و گاهی سخت‌ترین روزها همیشگی نمی‌مانند.\n\nزندگی ترکیبی از تلاش، شانس، زمان، انتخاب و اتفاق است.\n\nآرامش شاید از جایی شروع شود که یاد بگیریم در کنار تلاش، کمی هم به مسیر زندگی اعتماد کنیم.",
  },
];

export default function AcceptanceAndTrust() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="پذیرش و توکل">
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
            پذیرش و توکل
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            یاد گرفتن رها کردن کنترل افراطی، آرام‌تر فکر کردن و اعتماد بیشتر
            به مسیر زندگی.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((item, index) => {
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
          🌌 بعضی آرامش‌ها از جایی شروع می‌شوند که انسان همه‌چیز را به زور کنترل نمی‌کند.
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