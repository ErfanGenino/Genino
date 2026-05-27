import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Leaf,
  Heart,
  MessageCircle,
  ShieldCheck,
  Moon,
  Brain,
  Home,
  Sparkles,
  X,
} from "lucide-react";

const peacefulItems = [
  {
    title: "آرامش یعنی نبودن دعوا؟",
    desc: "رابطه آرام، رابطه بی‌اختلاف نیست.",
    icon: ShieldCheck,
    content:
      "بعضی زوج‌ها فکر می‌کنند اگر اختلاف یا ناراحتی وجود داشته باشد، یعنی رابطه‌شان مشکل دارد.\n\nاما آرامش واقعی یعنی دو نفر بتوانند حتی در اختلاف هم احساس امنیت کنند؛ بدون ترس از تحقیر، قهر طولانی یا تخریب.\n\nخیلی از رابطه‌های آرام، اختلاف دارند؛ اما جنگ دائمی ندارند.",
  },

  {
    title: "خانه‌ای که ذهن را خسته نمی‌کند",
    desc: "فضای خانه روی اعصاب و رابطه اثر می‌گذارد.",
    icon: Home,
    content:
      "وقتی خانه همیشه پر از تنش، بی‌نظمی شدید، داد زدن یا سکوت سرد باشد، ذهن هم خسته‌تر می‌شود.\n\nآرامش زندگی مشترک فقط به عشق وابسته نیست؛ به فضای روزمره خانه، لحن حرف زدن و کیفیت حضور دو نفر کنار هم هم وابسته است.",
  },

  {
    title: "همه‌چیز را همان لحظه حل نکنید",
    desc: "بعضی بحث‌ها به مکث نیاز دارند.",
    icon: Brain,
    content:
      "گاهی آدم‌ها در اوج عصبانیت یا خستگی سعی می‌کنند مشکل را همان لحظه حل کنند، اما فقط تنش بیشتر می‌شود.\n\nبعضی گفت‌وگوها وقتی ذهن آرام‌تر است نتیجه خیلی بهتری دارند.\n\nفاصله کوتاه گرفتن همیشه فرار نیست؛ گاهی مراقبت از رابطه است.",
  },

  {
    title: "لحن آرام، رابطه آرام‌تر",
    desc: "آدم‌ها قبل از کلمات، احساس را دریافت می‌کنند.",
    icon: MessageCircle,
    content:
      "خیلی وقت‌ها مشکل اصلی، خودِ جمله نیست؛ لحن است.\n\nیک حرف معمولی با لحن تند می‌تواند تبدیل به دعوا شود و همان حرف با آرامش، قابل شنیدن باشد.\n\nرابطه آرام معمولاً از لحن آرام شروع می‌شود.",
  },

  {
    title: "خستگی پنهان زوج‌ها",
    desc: "بعضی تنش‌ها از خستگی می‌آیند، نه بی‌علاقگی.",
    icon: Moon,
    content:
      "کار زیاد، فشار مالی، کم‌خوابی، دغدغه‌های زندگی و فرسودگی ذهنی می‌توانند آدم‌ها را کم‌حوصله‌تر و حساس‌تر کنند.\n\nگاهی مسئله اصلی رابطه نیست؛ خستگی‌ای است که وارد رابطه شده.\n\nاستراحت، خواب بهتر و کمی زمان آرام می‌تواند کیفیت رابطه را هم تغییر دهد.",
  },

  {
    title: "رابطه امن یعنی چه؟",
    desc: "جایی که آدم بتواند خودش باشد.",
    icon: Heart,
    content:
      "در رابطه امن، آدم مدام نگران قضاوت، تحقیر یا بی‌ارزش شدن نیست.\n\nمی‌تواند اشتباه کند، ناراحت شود، حرف بزند و همچنان احساس کند دوست‌داشتنی است.\n\nامنیت احساسی یکی از مهم‌ترین پایه‌های آرامش در زندگی مشترک است.",
  },

  {
    title: "آرامش با کنترل فرق دارد",
    desc: "کنترل زیاد معمولاً آرامش واقعی نمی‌سازد.",
    icon: Sparkles,
    content:
      "بعضی آدم‌ها برای کمتر شدن اضطراب، سعی می‌کنند همه‌چیز را کنترل کنند؛ رفتار همسر، خانه، زمان، تصمیم‌ها یا حتی احساسات.\n\nاما آرامش واقعی معمولاً از اعتماد، گفت‌وگو و انعطاف می‌آید، نه کنترل شدید.\n\nرابطه‌ای که در آن دو نفر احساس خفگی کنند، آرامش پایداری نخواهد داشت.",
  },

  {
    title: "زندگی آرام، زندگی بی‌هیجان نیست",
    desc: "آرامش با سردی فرق دارد.",
    icon: Leaf,
    content:
      "بعضی‌ها فکر می‌کنند رابطه آرام یعنی رابطه بی‌احساس یا تکراری.\n\nدر حالی که آرامش سالم یعنی دو نفر بتوانند کنار عشق، شوخی، هیجان و صمیمیت، احساس امنیت و ثبات هم داشته باشند.\n\nرابطه بالغ، هم گرما دارد هم آرامش.",
  },
];

export default function PeacefulMarriage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="آرامش در زندگی مشترک">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Leaf className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            آرامش در زندگی مشترک
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            نگاه‌هایی واقعی برای کم کردن تنش‌ها، ساختن امنیت احساسی و آرام‌تر
            شدن فضای زندگی مشترک.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {peacefulItems.map((item, index) => {
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
          🍃 آرامش واقعی یعنی بتوانی کنار کسی، کمتر از دنیا خسته شوی.
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