import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Heart,
  Moon,
  Droplets,
  Apple,
  Brain,
  Footprints,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const motherHealthItems = [
  {
    title: "سلامت مادر فقط جسم نیست",
    desc: "بدن، ذهن و احساسات در بارداری با هم تغییر می‌کنند.",
    icon: Heart,
    content:
      "در دوران بارداری، بدن مادر در حال انجام یکی از عمیق‌ترین کارهای زندگی است؛ ساختن و مراقبت از یک زندگی تازه.\n\nاما سلامت مادر فقط به آزمایش‌ها و وضعیت جسمی محدود نیست. خواب، انرژی، استرس، احساس امنیت، حمایت عاطفی و آرامش ذهن هم بخشی از سلامت مادر هستند.\n\nمادر سالم‌تر یعنی مادری که هم بدنش مراقبت می‌شود، هم احساساتش جدی گرفته می‌شود.",
  },
  {
    title: "خستگی بارداری",
    desc: "خسته بودن در بارداری ضعف نیست.",
    icon: Moon,
    content:
      "خیلی از مادرها در بارداری احساس خستگی بیشتری می‌کنند، مخصوصاً در ماه‌های اول و آخر.\n\nاین خستگی می‌تواند به دلیل تغییرات هورمونی، رشد جنین، تغییر خواب، فشار ذهنی و افزایش نیاز بدن به انرژی باشد.\n\nاستراحت در بارداری تنبلی نیست؛ بخشی از مراقبت از بدن است.",
  },
  {
    title: "آب و بدن مادر",
    desc: "کم‌آبی می‌تواند حال بدن را سنگین‌تر کند.",
    icon: Droplets,
    content:
      "نوشیدن آب کافی در بارداری اهمیت زیادی دارد. کم‌آبی ممکن است باعث سردرد، خستگی، یبوست، خشکی بدن یا بی‌حالی شود.\n\nالبته نیاز هر فرد متفاوت است، اما داشتن بطری آب کنار دست و نوشیدن آرام در طول روز می‌تواند کمک‌کننده باشد.\n\nاگر ورم شدید، سردرد غیرعادی یا علائم نگران‌کننده وجود دارد، بهتر است با پزشک مشورت شود.",
  },
  {
    title: "تغذیه برای انرژی، نه سختگیری",
    desc: "هدف، غذا خوردن آگاهانه و متعادل است.",
    icon: Apple,
    content:
      "تغذیه در دوران بارداری نباید تبدیل به اضطراب دائمی شود. هدف این است که بدن مادر مواد مغذی کافی دریافت کند و انرژی بهتری داشته باشد.\n\nپروتئین سالم، سبزیجات، میوه، غلات کامل، لبنیات مناسب و وعده‌های منظم می‌توانند به حال بهتر بدن کمک کنند.\n\nبهتر است درباره مکمل‌ها، محدودیت‌ها و نیازهای خاص با پزشک یا متخصص تغذیه مشورت شود.",
  },
  {
    title: "احساسات مادر جدی است",
    desc: "بارداری می‌تواند احساسات را حساس‌تر کند.",
    icon: Brain,
    content:
      "در بارداری ممکن است مادر زودتر گریه کند، حساس‌تر شود، نگران‌تر شود یا احساسات متناقضی تجربه کند.\n\nاین احساسات نشانه ضعیف بودن نیستند. بدن و ذهن در حال عبور از یک تغییر بزرگ هستند.\n\nحمایت عاطفی، شنیده شدن و کم شدن فشارهای غیرضروری می‌تواند به آرام‌تر شدن مادر کمک کند.",
  },
  {
    title: "مراقبت از کمر و پاها",
    desc: "بدن مادر به حمایت بیشتری نیاز دارد.",
    icon: Footprints,
    content:
      "با بزرگ‌تر شدن شکم و تغییر مرکز ثقل بدن، ممکن است کمر، پاها یا لگن فشار بیشتری تحمل کنند.\n\nاستراحت مناسب، کفش راحت، پرهیز از ایستادن طولانی و حرکت‌های ملایم با اجازه پزشک می‌تواند کمک‌کننده باشد.\n\nاگر درد شدید، بی‌حسی، ورم غیرعادی یا علائم نگران‌کننده وجود دارد، باید با پزشک تماس گرفت.",
  },
  {
    title: "علائم نگران‌کننده را جدی بگیر",
    desc: "آگاهی، ترس نیست؛ مراقبت است.",
    icon: ShieldCheck,
    content:
      "در بارداری بعضی علائم نیاز به بررسی فوری دارند؛ مثل خونریزی، درد شدید، سردرد شدید و غیرعادی، تاری دید، ورم ناگهانی، تب، کاهش محسوس حرکت جنین در ماه‌های بالاتر یا ترشح غیرعادی.\n\nاین بخش برای ترساندن نیست؛ برای این است که مادر بداند چه زمانی باید سریع‌تر کمک بگیرد.\n\nدر هر مورد نگران‌کننده، بهترین کار تماس با پزشک یا مراجعه به مرکز درمانی است.",
  },
  {
    title: "مادر هم نیاز به مراقبت دارد",
    desc: "همه توجه‌ها نباید فقط به جنین باشد.",
    icon: Sparkles,
    content:
      "گاهی در بارداری همه درباره بچه حرف می‌زنند و مادر فراموش می‌شود.\n\nاما مادر هم نیاز به آرامش، توجه، محبت، استراحت و حمایت دارد.\n\nمراقبت از مادر، مراقبت از کودک هم هست؛ چون حال مادر روی فضای خانه، رابطه و تجربه بارداری اثر می‌گذارد.",
  },
];

export default function MotherHealth() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="سلامت مادر">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <Heart className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            سلامت مادر
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            مراقبت از بدن، خواب، انرژی و احساسات مادر در دوران بارداری؛ با نگاهی
            آرام، انسانی و آگاهانه.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {motherHealthItems.map((item, index) => {
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
          🌿 مراقبت از مادر، بخشی از مراقبت از زندگی تازه است.
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