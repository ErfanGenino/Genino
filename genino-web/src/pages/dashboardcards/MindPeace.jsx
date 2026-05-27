import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Leaf,
  Wind,
  Moon,
  Brain,
  Heart,
  Sparkles,
  Waves,
  Flower2,
  X,
} from "lucide-react";

const mindPeaceItems = [
  {
    title: "تنفس آرام ۴-۴-۴",
    desc: "یک تمرین ساده برای کم کردن تنش و آرام‌تر شدن.",
    icon: Wind,
    content:
      "برای شروع، ۴ ثانیه نفس بکش، ۴ ثانیه نگه دار و ۴ ثانیه آرام بیرون بده.\n\nاین تمرین ساده می‌تواند کمک کند بدن از حالت فشار و اضطراب فاصله بگیرد و ذهن آرام‌تر شود.\n\nلازم نیست کامل انجامش بدهی؛ فقط چند بار تکرار آرام هم کافی است.",
  },
  {
    title: "ذهن‌آگاهی یعنی چی؟",
    desc: "برگشتن به همین لحظه، بدون جنگیدن با ذهن.",
    icon: Brain,
    content:
      "ذهن‌آگاهی یعنی چند لحظه متوجه باشی الان چه احساسی داری، چه فکری در ذهنت می‌گذرد و بدنت چه حالتی دارد.\n\nهدف این نیست که فکرها را خاموش کنی؛ هدف این است که کمتر با آن‌ها درگیر شوی و کمی از بیرون نگاهشان کنی.",
  },
  {
    title: "مدیتیشن کوتاه دونفره",
    desc: "چند دقیقه سکوت مشترک برای آرامش رابطه.",
    icon: Heart,
    content:
      "مدیتیشن دونفره می‌تواند خیلی ساده باشد. کنار هم بنشینید، چند دقیقه حرف نزنید، نفس‌هایتان را آرام کنید و فقط حضور هم را حس کنید.\n\nگاهی رابطه فقط به گفت‌وگو نیاز ندارد؛ به سکوت امن هم نیاز دارد.",
  },
  {
    title: "آرامش قبل از خواب",
    desc: "کم کردن شلوغی ذهن در پایان روز.",
    icon: Moon,
    content:
      "قبل از خواب، نور صفحه موبایل را کمتر کن، چند نفس عمیق بکش و به جای مرور نگرانی‌ها، سه چیز کوچک خوب از امروز را به یاد بیاور.\n\nذهن اگر با آرامش وارد خواب شود، فردا سبک‌تر بیدار می‌شود.",
  },
  {
    title: "صدای طبیعت",
    desc: "باران، موج، باد و صداهایی که ذهن را نرم‌تر می‌کنند.",
    icon: Waves,
    content:
      "صدای باران، موج دریا، باد میان درخت‌ها یا پرندگان می‌تواند به آرام‌تر شدن ذهن کمک کند.\n\nاین صداها برای خیلی از افراد حس امنیت، فاصله از شلوغی و استراحت ذهنی ایجاد می‌کنند.",
  },
  {
    title: "رها کردن فکرهای مزاحم",
    desc: "هر فکری حقیقت نیست.",
    icon: Sparkles,
    content:
      "گاهی ذهن ما فکرهایی می‌سازد که واقعی، فوری یا ضروری نیستند.\n\nیک تمرین ساده این است که به جای باور کردن هر فکر، فقط بگویی: «این فقط یک فکر است.»\n\nهمین فاصله کوچک می‌تواند فشار ذهنی را کمتر کند.",
  },
  {
    title: "آرام کردن بدن",
    desc: "ذهن آرام‌تر می‌شود وقتی بدن از تنش خارج شود.",
    icon: Flower2,
    content:
      "گاهی اضطراب در بدن جمع می‌شود؛ در شانه‌ها، گردن، فک یا دست‌ها.\n\nچند لحظه شانه‌ها را رها کن، فک را شل کن، کف پاها را روی زمین حس کن و آرام نفس بکش.\n\nبدن وقتی پیام آرامش بگیرد، ذهن هم راحت‌تر آرام می‌شود.",
  },
  {
    title: "زوج آرام‌تر، خانه آرام‌تر",
    desc: "آرامش ذهنی دو نفر روی فضای خانه اثر می‌گذارد.",
    icon: Leaf,
    content:
      "وقتی هر دو نفر یاد بگیرند تنش خود را بهتر مدیریت کنند، فضای رابطه و خانه هم آرام‌تر می‌شود.\n\nآرامش فردی فقط مسئله شخصی نیست؛ روی لحن حرف زدن، صبر، تصمیم‌گیری و کیفیت رابطه اثر می‌گذارد.",
  },
];

export default function MindPeace() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="آرامش ذهن و مدیتیشن">
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
            آرامش ذهن و مدیتیشن
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            تمرین‌ها و یادآوری‌های ساده برای آرام‌تر شدن ذهن، کاهش تنش و ساختن
            فضای امن‌تر در زندگی مشترک.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mindPeaceItems.map((item, index) => {
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
          🌿 گاهی آرامش، از چند نفس ساده شروع می‌شود.
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