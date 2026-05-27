import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Apple,
  Heart,
  Utensils,
  Coffee,
  Droplets,
  Moon,
  Salad,
  Sparkles,
  X,
} from "lucide-react";

const nutritionItems = [
  {
    title: "غذای سالم دونفره یعنی چی؟",
    desc: "قرار نیست سخت و رژیمی باشد؛ قرار است آگاهانه‌تر باشد.",
    icon: Apple,
    content:
      "تغذیه سالم زوجی یعنی دو نفر تلاش کنند سبک غذا خوردنشان کمی آگاهانه‌تر، متعادل‌تر و مهربان‌تر با بدنشان باشد.\n\nقرار نیست همیشه غذای رژیمی بخورید یا از لذت غذا محروم شوید. مهم این است که انتخاب‌هایتان به انرژی، سلامت، خواب و حال روحی بهتر کمک کند.",
  },
  {
    title: "آشپزی با هم",
    desc: "غذا درست کردن می‌تواند یک تجربه صمیمی باشد.",
    icon: Utensils,
    content:
      "آشپزی دونفره فقط آماده کردن غذا نیست؛ یک فرصت برای همکاری، خندیدن، حرف زدن و ساختن خاطره است.\n\nحتی یک غذای ساده، اگر با هم آماده شود، می‌تواند حس نزدیکی و همکاری را در رابطه بیشتر کند.",
  },
  {
    title: "صبحانه‌های آرام",
    desc: "شروع روز با انرژی و حال خوب دونفره.",
    icon: Coffee,
    content:
      "صبحانه مشترک حتی اگر کوتاه باشد، می‌تواند کیفیت شروع روز را بهتر کند.\n\nنان سبوس‌دار، تخم‌مرغ، پنیر، گردو، میوه، شیر یا چای ساده می‌توانند صبحانه‌ای سالم و قابل اجرا بسازند.\n\nمهم‌تر از غذا، آرام شروع کردن روز کنار هم است.",
  },
  {
    title: "غذا و خلق‌وخو",
    desc: "چیزی که می‌خوریم روی انرژی و رفتارمان اثر دارد.",
    icon: Heart,
    content:
      "وقتی بدن خسته، گرسنه یا درگیر قند و غذای سنگین است، خلق‌وخو هم ممکن است نوسان بیشتری داشته باشد.\n\nغذاهای متعادل، آب کافی و وعده‌های منظم می‌توانند روی صبر، انرژی و حتی کیفیت گفت‌وگوهای زوج‌ها اثر مثبت بگذارند.",
  },
  {
    title: "آب کافی برای هر دو نفر",
    desc: "کم‌آبی ساده‌تر از چیزی است که فکر می‌کنیم روی حال اثر می‌گذارد.",
    icon: Droplets,
    content:
      "کم‌آبی می‌تواند باعث سردرد، خستگی، بی‌حوصلگی و کاهش تمرکز شود.\n\nیک عادت ساده زوجی این است که هر دو نفر در طول روز بیشتر حواسشان به نوشیدن آب باشد؛ مخصوصاً در روزهای کاری، ورزش یا هوای گرم.",
  },
  {
    title: "شام سبک‌تر، خواب بهتر",
    desc: "غذای شب می‌تواند روی کیفیت خواب اثر بگذارد.",
    icon: Moon,
    content:
      "شام‌های خیلی سنگین یا دیرهنگام ممکن است خواب را سخت‌تر و بدن را خسته‌تر کند.\n\nبرای شب، غذاهای سبک‌تر مثل سوپ، سالاد کامل، املت، مرغ سبک، سبزیجات یا غذاهای کم‌چرب می‌تواند انتخاب بهتری باشد.",
  },
  {
    title: "بشقاب رنگی",
    desc: "هرچه بشقاب رنگی‌تر، بدن خوشحال‌تر.",
    icon: Salad,
    content:
      "سبزیجات، میوه‌ها، حبوبات، پروتئین سالم و غلات کامل می‌توانند یک بشقاب متعادل بسازند.\n\nبه جای تمرکز سختگیرانه روی رژیم، فقط سعی کنید بشقابتان کمی رنگی‌تر، طبیعی‌تر و متنوع‌تر باشد.",
  },
  {
    title: "تعادل، نه سختگیری",
    desc: "رابطه سالم با غذا یعنی افراط نکردن.",
    icon: Sparkles,
    content:
      "تغذیه سالم به معنی حذف کامل لذت‌ها نیست.\n\nگاهی پیتزا، کباب، شیرینی یا غذای بیرون هم بخشی از زندگی است. مهم این است که این انتخاب‌ها تبدیل به عادت دائمی نشوند و در کنارشان انتخاب‌های سالم‌تر هم وجود داشته باشد.",
  },
];

export default function CoupleNutrition() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="تغذیه سالم زوجی">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Apple className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            تغذیه سالم زوجی
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            ایده‌ها و عادت‌های ساده برای غذا خوردن سالم‌تر، انرژی بیشتر و
            ساختن سبک زندگی آرام‌تر و شادتر در کنار هم.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nutritionItems.map((item, index) => {
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
          🍎 سبک زندگی سالم، وقتی دونفره باشد ماندگارتر می‌شود.
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