import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  CalendarHeart,
  Heart,
  Home,
  Wallet,
  Moon,
  Baby,
  Brain,
  Users,
  Sparkles,
  X,
} from "lucide-react";

const parentingItems = [
  {
    title: "آیا واقعاً آماده فرزند هستیم؟",
    desc: "آمادگی فقط علاقه به بچه داشتن نیست.",
    icon: Baby,
    content:
      "خیلی از زوج‌ها بچه دوست دارند، اما آمادگی برای والد شدن فقط علاقه نیست.\n\nکودک زمان، انرژی، خواب، رابطه، آزادی شخصی و سبک زندگی را تغییر می‌دهد.\n\nآمادگی واقعی یعنی دو نفر بتوانند درباره مسئولیت، خستگی، ترس‌ها، تقسیم وظایف و آینده با هم حرف بزنند.\n\nهیچ‌کس کامل آماده نمی‌شود، اما آگاه‌تر شدن می‌تواند فشارهای آینده را کمتر کند.",
  },

  {
    title: "رابطه بعد از فرزند تغییر می‌کند",
    desc: "و این طبیعی‌تر از چیزی است که فکر می‌کنیم.",
    icon: Heart,
    content:
      "بعد از ورود کودک، رابطه زوج‌ها معمولاً تغییر می‌کند؛ خواب کمتر می‌شود، خستگی بیشتر می‌شود و زمان دونفره کمتر می‌شود.\n\nخیلی از زوج‌ها فکر می‌کنند این تغییر یعنی عشق کمتر شده، در حالی که اغلب فقط شکل زندگی عوض شده است.\n\nاگر دو نفر قبل از فرزند درباره این تغییرات آگاه باشند، راحت‌تر می‌توانند از رابطه‌شان مراقبت کنند.",
  },

  {
    title: "آرامش خانه قبل از کودک",
    desc: "کودک وارد فضای فعلی رابطه می‌شود.",
    icon: Home,
    content:
      "بچه‌ها فقط به غذا و وسیله نیاز ندارند؛ به فضای امن احساسی هم نیاز دارند.\n\nخانه‌ای که پر از تنش، سکوت سرد، دعوای مداوم یا استرس شدید باشد، روی کودک هم اثر می‌گذارد.\n\nیکی از مهم‌ترین آمادگی‌ها قبل از فرزند، ساختن فضای آرام‌تر در رابطه و خانه است.",
  },

  {
    title: "آمادگی مالی یعنی فقط پول؟",
    desc: "امنیت مالی مهم است، اما همه ماجرا نیست.",
    icon: Wallet,
    content:
      "داشتن برنامه مالی برای فرزند مهم است؛ اما آمادگی مالی فقط مقدار پول نیست.\n\nمدیریت هزینه، همکاری زوج‌ها، سبک خرج کردن، آرامش ذهنی و توانایی برنامه‌ریزی هم بخش مهمی از امنیت خانواده هستند.\n\nخیلی از خانواده‌ها با درآمد متوسط اما مدیریت خوب، آرامش بیشتری از خانواده‌های پردرآمد اما پرتنش دارند.",
  },

  {
    title: "خواب و استرس قبل از بارداری",
    desc: "بدن و ذهن خسته، فشار بیشتری تجربه می‌کنند.",
    icon: Moon,
    content:
      "سبک زندگی قبل از بارداری روی کیفیت جسم و ذهن اثر می‌گذارد.\n\nکم‌خوابی، استرس مزمن، تغذیه نامنظم و فرسودگی ذهنی می‌توانند انرژی رابطه و آمادگی روانی را کمتر کنند.\n\nگاهی قبل از فکر کردن به کودک، لازم است زوج‌ها کمی بیشتر به سلامت خودشان توجه کنند.",
  },

  {
    title: "پدر شدن فقط تأمین مالی نیست",
    desc: "حضور عاطفی پدر هم بخشی از رشد کودک است.",
    icon: Users,
    content:
      "خیلی از مردها تصور می‌کنند نقش اصلی پدر فقط کار کردن و تأمین هزینه‌هاست.\n\nاما حضور احساسی، وقت گذاشتن، آرامش، بازی کردن و مشارکت در تربیت هم بخش مهمی از پدر بودن است.\n\nکودک فقط پول را حس نمی‌کند؛ حضور را هم حس می‌کند.",
  },

  {
    title: "مادر شدن یعنی تغییر بزرگ",
    desc: "نه فقط جسمی، بلکه ذهنی و احساسی.",
    icon: Sparkles,
    content:
      "مادر شدن فقط یک اتفاق فیزیکی نیست؛ هویت، احساسات، نگرانی‌ها و سبک زندگی را هم تغییر می‌دهد.\n\nخیلی از زنان بعد از مادر شدن احساسات متناقضی تجربه می‌کنند؛ عشق، خستگی، ترس، حساسیت و مسئولیت بیشتر.\n\nحمایت عاطفی همسر در این مسیر اهمیت بسیار زیادی دارد.",
  },

  {
    title: "والد خوب یعنی چه؟",
    desc: "کامل بودن لازم نیست.",
    icon: Brain,
    content:
      "خیلی از آدم‌ها قبل از والد شدن می‌ترسند که مبادا پدر یا مادر خوبی نباشند.\n\nاما کودک به والد کامل نیاز ندارد؛ به والد امن، قابل اعتماد و در حال یادگیری نیاز دارد.\n\nآدم‌هایی که حاضرند یاد بگیرند، اشتباهاتشان را بپذیرند و برای آرامش خانه تلاش کنند، معمولاً والدهای بهتری می‌شوند.",
  },
];

export default function FutureParenting() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="آمادگی برای والد شدن">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <CalendarHeart className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            آمادگی برای والد شدن
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            نگاه‌هایی واقعی و عمیق‌تر به رابطه، ذهن، سبک زندگی و مسئولیت‌هایی
            که قبل از ورود کودک اهمیت پیدا می‌کنند.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {parentingItems.map((item, index) => {
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
          👶 کودک فقط وارد خانه نمی‌شود؛ وارد رابطه، ذهن و سبک زندگی شما هم می‌شود.
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