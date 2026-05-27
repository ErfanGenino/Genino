import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Leaf,
  Wind,
  Heart,
  Moon,
  Waves,
  Brain,
  Flower2,
  Sparkles,
  X,
} from "lucide-react";

const breathingItems = [
  {
    title: "تنفس آرام و آگاهانه",
    desc: "چند نفس عمیق می‌تواند بدن را از تنش دورتر کند.",
    icon: Wind,
    content:
      "در دوران بارداری، تنفس آرام می‌تواند به مادر کمک کند چند لحظه از شلوغی ذهن فاصله بگیرد.\n\nلازم نیست تمرین پیچیده‌ای انجام شود. فقط کافی است چند نفس آرام و عمیق بکشی، شانه‌ها را رها کنی و توجهت را به ورود و خروج هوا بیاوری.\n\nاین تمرین جایگزین مراقبت پزشکی نیست، اما می‌تواند بخشی از آرام‌سازی روزانه باشد.",
  },
  {
    title: "تمرین ۴ ثانیه‌ای",
    desc: "نفس بکش، مکث کن، آرام بیرون بده.",
    icon: Sparkles,
    content:
      "یک تمرین ساده این است: ۴ ثانیه دم، ۴ ثانیه مکث آرام، و ۴ ثانیه بازدم.\n\nاگر مکث برایت راحت نبود، می‌توانی فقط دم و بازدم آرام انجام بدهی.\n\nدر بارداری هدف فشار آوردن به بدن نیست؛ هدف آرام‌تر شدن است. هرجا احساس ناراحتی، سرگیجه یا تنگی نفس داشتی، تمرین را متوقف کن.",
  },
  {
    title: "آرام‌سازی بدن",
    desc: "ذهن وقتی آرام‌تر می‌شود که بدن هم رها شود.",
    icon: Flower2,
    content:
      "گاهی تنش در شانه‌ها، گردن، فک یا کمر جمع می‌شود.\n\nچند لحظه بنشین، شانه‌ها را پایین بده، فک را شل کن، دست‌ها را رها کن و نفس آرام بکش.\n\nاین رها کردن‌های کوچک می‌توانند به بدن پیام امنیت و آرامش بدهند.",
  },
  {
    title: "آرامش قبل از خواب",
    desc: "کم کردن شلوغی ذهن در پایان روز.",
    icon: Moon,
    content:
      "قبل از خواب، نور موبایل و محیط را کمتر کن، چند نفس آرام بکش و به جای مرور نگرانی‌ها، توجهت را به بدن و نفس‌هایت بیاور.\n\nمی‌توانی یک جمله آرام با خودت تکرار کنی: «من در حال مراقبت از خودم و فرزندم هستم.»\n\nشب‌ها بدن بیشتر به آرامش نیاز دارد.",
  },
  {
    title: "مدیتیشن کوتاه مادرانه",
    desc: "چند دقیقه حضور آرام با بدن و جنین.",
    icon: Heart,
    content:
      "در یک جای آرام بنشین یا دراز بکش. دستت را آرام روی شکم بگذار و چند نفس عمیق بکش.\n\nلازم نیست چیزی را تجسم کنی یا تمرین خاصی انجام بدهی. فقط چند دقیقه حضور آرام با بدن و جنین کافی است.\n\nاین کار می‌تواند حس پیوند، امنیت و آرامش را بیشتر کند.",
  },
  {
    title: "صدای طبیعت و آرامش",
    desc: "باران، موج و صداهای نرم می‌توانند ذهن را آرام‌تر کنند.",
    icon: Waves,
    content:
      "صدای باران، موج دریا، باد میان درخت‌ها یا موسیقی بسیار ملایم می‌تواند به بعضی مادرها کمک کند ذهنشان آرام‌تر شود.\n\nدر دوران بارداری، انتخاب صداهای آرام و محیط‌های کم‌تنش می‌تواند روی حال مادر اثر خوبی بگذارد.",
  },
  {
    title: "وقتی اضطراب زیاد می‌شود",
    desc: "اول بدن را آرام کن، بعد فکرها را بررسی کن.",
    icon: Brain,
    content:
      "وقتی اضطراب زیاد می‌شود، ذهن معمولاً شروع به ساختن سناریوهای نگران‌کننده می‌کند.\n\nدر این لحظه بهتر است اول چند نفس آرام بکشی، بدنت را رها کنی و بعد از خودت بپرسی: «الان دقیقاً چه کاری از دست من برمی‌آید؟»\n\nاگر اضطراب شدید، مداوم یا آزاردهنده است، صحبت با پزشک یا متخصص سلامت روان می‌تواند بسیار کمک‌کننده باشد.",
  },
  {
    title: "آرامش بدون فشار",
    desc: "مدیتیشن قرار نیست کامل انجام شود.",
    icon: Leaf,
    content:
      "بعضی مادرها فکر می‌کنند اگر ذهنشان حواس‌پرت شد، یعنی مدیتیشن را اشتباه انجام داده‌اند.\n\nاما ذهن طبیعی است که فکر کند. هر بار که متوجه شدی ذهنت رفته، فقط آرام برگرد به نفس.\n\nهمین برگشتن آرام، خودِ تمرین است.",
  },
];

export default function PregnancyBreathing() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="تمرین‌های آرامش و تنفس">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <Leaf className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            تمرین‌های آرامش و تنفس
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            تمرین‌هایی ساده، نرم و قابل اجرا برای آرام‌تر شدن ذهن، کاهش تنش و
            مراقبت عاطفی از مادر در دوران بارداری.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {breathingItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-green-50 to-white border border-green-200 shadow-sm hover:shadow-[0_0_22px_rgba(110,231,183,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                    <Icon className="text-green-600" size={22} />
                  </div>

                  <h3 className="font-bold text-green-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-green-700">
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
          🌱 آرامش مادر، بخشی از آرامش خانه و کودک آینده است.
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
              className="w-full max-w-xl rounded-3xl bg-white border border-green-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-green-700 leading-8">
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

              <div className="text-gray-700 text-sm leading-9 whitespace-pre-line">
                {selectedItem.content}
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
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