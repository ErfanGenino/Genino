import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Heart,
  MessageCircle,
  Coffee,
  Sparkles,
  HandHeart,
  Smile,
  Home,
  Flower2,
  X,
} from "lucide-react";

const relationshipItems = [
  {
    title: "زبان عشق چیست؟",
    desc: "چرا آدم‌ها متفاوت محبت می‌کنند؟",
    icon: Heart,
    content:
      "همه آدم‌ها عشق را به یک شکل نشان نمی‌دهند. بعضی‌ها با حرف زدن محبت می‌کنند، بعضی‌ها با وقت گذاشتن، بعضی‌ها با هدیه، بعضی‌ها با کمک کردن و بعضی‌ها با لمس و آغوش.\n\nخیلی از سوءتفاهم‌های رابطه وقتی ایجاد می‌شود که دو نفر زبان عشق همدیگر را نمی‌شناسند.\n\nگاهی طرف مقابل دوستت دارد، اما به روشی متفاوت از چیزی که تو انتظار داری.",
  },

  {
    title: "وقت دونفره",
    desc: "چرا رابطه بدون زمان مشترک سرد می‌شود؟",
    icon: Coffee,
    content:
      "رابطه فقط با عشق زنده نمی‌ماند؛ با وقت مشترک زنده می‌ماند.\n\nحتی زوج‌هایی که همدیگر را خیلی دوست دارند، اگر مدام درگیر کار، موبایل، خستگی یا روزمرگی شوند، آرام‌آرام فاصله احساسی پیدا می‌کنند.\n\nگاهی یک پیاده‌روی کوتاه، یک شام ساده یا چند دقیقه گفت‌وگوی واقعی، بیشتر از هدیه‌های بزرگ رابطه را زنده نگه می‌دارد.",
  },

  {
    title: "دعوا کردن سالم",
    desc: "چطور بدون تخریب حرف بزنیم؟",
    icon: MessageCircle,
    content:
      "اختلاف نظر در هر رابطه‌ای طبیعی است؛ چیزی که مهم است، نوع دعوا کردن است.\n\nزوج‌های سالم هم ناراحت می‌شوند، اما سعی می‌کنند تحقیر، توهین، تهدید یا سکوت طولانی نداشته باشند.\n\nهدف گفت‌وگو باید حل مسئله باشد، نه شکست دادن طرف مقابل.\n\nگاهی فقط آرام‌تر حرف زدن می‌تواند مسیر یک بحث را کاملاً تغییر دهد.",
  },

  {
    title: "قدردانی در رابطه",
    desc: "چرا تشکرهای کوچک مهم‌اند؟",
    icon: Sparkles,
    content:
      "بعضی رابطه‌ها نه با خیانت، بلکه با عادی شدن و ندیده گرفتن آرام‌آرام سرد می‌شوند.\n\nوقتی آدم احساس کند دیده می‌شود، ارزشمندتر و آرام‌تر می‌شود.\n\nتشکرهای کوچک، توجه به زحمت‌ها و بیان محبت، می‌تواند امنیت احساسی رابطه را بیشتر کند.",
  },

  {
    title: "لمس و محبت",
    desc: "اثر تماس و آغوش در آرامش رابطه.",
    icon: HandHeart,
    content:
      "آغوش، لمس دست، نوازش و نزدیکی فیزیکی سالم، فقط رفتار عاشقانه نیست؛ روی آرامش ذهن و احساس امنیت اثر واقعی دارد.\n\nبسیاری از آدم‌ها وقتی در رابطه محبت فیزیکی سالم دریافت می‌کنند، اضطراب و تنش کمتری تجربه می‌کنند.",
  },

  {
    title: "زوج‌های آرام چه کارهایی می‌کنند؟",
    desc: "عادت‌های کوچک رابطه‌های سالم.",
    icon: Smile,
    content:
      "زوج‌های آرام معمولاً کامل نیستند؛ اما چند عادت ساده دارند:\n\nبه هم گوش می‌دهند.\n\nهمدیگر را تحقیر نمی‌کنند.\n\nوقت مشترک دارند.\n\nدر مشکلات تیم هم هستند.\n\nو یاد گرفته‌اند همیشه قرار نیست برنده دعوا باشند.",
  },

  {
    title: "خانه‌ای با آرامش بیشتر",
    desc: "چطور فضای رابطه را امن‌تر کنیم؟",
    icon: Home,
    content:
      "خانه فقط محل زندگی نیست؛ محل آرامش ذهن هم هست.\n\nلحن صحبت، احترام، امنیت احساسی و حتی فضای آرام خانه می‌تواند روی کیفیت رابطه اثر بگذارد.\n\nآدم‌ها بیشتر به جایی وابسته می‌شوند که در آن احساس آرامش و پذیرفته شدن داشته باشند.",
  },

  {
    title: "نزدیک شدن دوباره",
    desc: "وقتی رابطه سرد شده، از کجا شروع کنیم؟",
    icon: Flower2,
    content:
      "خیلی از رابطه‌ها ناگهانی خراب نمی‌شوند؛ آرام‌آرام فاصله می‌گیرند.\n\nبرگشتن به رابطه معمولاً با کارهای خیلی کوچک شروع می‌شود:\n\nگوش دادن واقعی.\n\nوقت گذاشتن.\n\nکمتر قضاوت کردن.\n\nو یادآوری اینکه زمانی چرا همدیگر را انتخاب کردید.",
  },
];

export default function LoveRelationship() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="رابطه عاشقانه">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Heart className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            رابطه عاشقانه
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            چند نگاه ساده اما مهم برای ساختن رابطه‌ای آرام‌تر، عمیق‌تر و
            صمیمی‌تر در زندگی مشترک.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {relationshipItems.map((item, index) => {
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
          💕 رابطه خوب، بیشتر از عشق، به مراقبت روزانه نیاز دارد.
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