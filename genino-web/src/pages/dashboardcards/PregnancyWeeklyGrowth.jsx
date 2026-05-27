import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Baby,
  Heart,
  Sparkles,
  Moon,
  Apple,
  Brain,
  Flower2,
  CalendarDays,
  X,
} from "lucide-react";

const pregnancyWeeks = [
  {
    title: "ماه اول بارداری",
    desc: "شروع شکل‌گیری زندگی؛ از لقاح تا لانه‌گزینی.",
    icon: Sparkles,
    content:
      "در ماه اول، بارداری تازه آغاز شده و جنین هنوز بسیار کوچک است. لقاح، تقسیم سلولی و لانه‌گزینی در رحم از اتفاقات مهم این دوره هستند.\n\nدر این مرحله، پایه‌های اولیه رشد شکل می‌گیرند، اما خیلی از مادرها هنوز متوجه بارداری نشده‌اند یا فقط علائمی مثل خستگی، حساسیت سینه، تغییر خلق یا عقب افتادن پریود را تجربه می‌کنند.\n\nچیزهای مفید در این ماه: مصرف منظم اسیدفولیک طبق نظر پزشک، خواب کافی، پرهیز از خوددرمانی، تغذیه متعادل، دوری از سیگار و الکل، و آرام نگه داشتن ذهن.\n\nاگر درد شدید، خونریزی غیرعادی یا علائم نگران‌کننده وجود داشت، باید با پزشک مشورت شود.",
  },
  {
    title: "ماه دوم بارداری",
    desc: "شروع شکل‌گیری قلب، مغز و اندام‌های اولیه.",
    icon: Heart,
    content:
      "ماه دوم یکی از دوره‌های بسیار مهم رشد جنین است. قلب، مغز، ستون فقرات، جوانه‌های دست و پا و اندام‌های اولیه در حال شکل‌گیری هستند.\n\nممکن است تهوع، خستگی، خواب‌آلودگی، حساسیت به بوها و تغییرات احساسی بیشتر شود. این تغییرات برای بسیاری از مادرها طبیعی است، اما شدت آن در افراد مختلف فرق دارد.\n\nچیزهای مفید در این ماه: وعده‌های غذایی کوچک‌تر، آب کافی، استراحت بیشتر، مصرف مواد مغذی، پیگیری ویزیت‌های پزشکی، و پرهیز از مصرف دارو بدون نظر پزشک.\n\nاین ماه زمان مهمی برای مراقبت آرام و آگاهانه از بدن است.",
  },
  {
    title: "ماه سوم بارداری",
    desc: "اندام‌ها واضح‌تر می‌شوند و سه‌ماهه اول رو به پایان می‌رود.",
    icon: Baby,
    content:
      "در ماه سوم، اندام‌های اصلی جنین شکل مشخص‌تری پیدا می‌کنند. انگشت‌ها، صورت، چشم‌ها و گوش‌ها واضح‌تر می‌شوند و جنین آرام‌آرام ظاهر انسانی‌تری پیدا می‌کند.\n\nبرای بعضی مادرها تهوع هنوز ادامه دارد، اما در پایان این ماه ممکن است کم‌کم بهتر شود. احساسات مادر هنوز می‌تواند نوسان داشته باشد.\n\nچیزهای مفید در این ماه: تغذیه متنوع، خواب کافی، مراجعه منظم به پزشک، توجه به سلامت دهان و دندان، و کاهش استرس‌های غیرضروری.\n\nپایان سه‌ماهه اول برای خیلی از مادرها حس آرامش بیشتری می‌آورد.",
  },
  {
    title: "ماه چهارم بارداری",
    desc: "شروع سه‌ماهه دوم؛ رشد بیشتر و آرام‌تر شدن بعضی علائم.",
    icon: Flower2,
    content:
      "ماه چهارم معمولاً برای بسیاری از مادرها دوره راحت‌تری است. تهوع ممکن است کمتر شود و انرژی بدن کمی بیشتر گردد.\n\nجنین در حال رشد سریع‌تر است و استخوان‌ها، عضلات و سیستم عصبی او فعال‌تر می‌شوند. شکم مادر هم ممکن است کم‌کم مشخص‌تر شود.\n\nچیزهای مفید در این ماه: پیاده‌روی سبک با اجازه پزشک، تغذیه سالم، آب کافی، مراقبت از پوست، خواب مناسب و شروع ارتباط عاطفی آرام با جنین.\n\nاین ماه می‌تواند آغاز حس واقعی‌تر مادر شدن باشد.",
  },
  {
    title: "ماه پنجم بارداری",
    desc: "حرکت‌های جنین ممکن است واضح‌تر حس شوند.",
    icon: Brain,
    content:
      "در ماه پنجم، بسیاری از مادرها حرکت‌های جنین را بهتر حس می‌کنند. این حرکت‌ها می‌توانند یکی از احساسی‌ترین لحظه‌های بارداری باشند.\n\nشنوایی جنین در حال رشد است و ممکن است به صداها واکنش نشان دهد. بدن مادر هم تغییرات بیشتری مثل افزایش وزن، کشیدگی پوست یا دردهای خفیف عضلانی را تجربه می‌کند.\n\nچیزهای مفید در این ماه: موسیقی ملایم، حرف زدن با جنین، تغذیه غنی از پروتئین و مواد مغذی، مراقبت از کمر، و استراحت کافی.\n\nدر این مرحله، پیوند عاطفی مادر و جنین معمولاً عمیق‌تر می‌شود.",
  },
  {
    title: "ماه ششم بارداری",
    desc: "رشد مغز، ریه‌ها و واکنش بیشتر جنین به محیط.",
    icon: Moon,
    content:
      "در ماه ششم، رشد مغز و سیستم عصبی جنین ادامه دارد و ریه‌ها هم در مسیر تکامل هستند. جنین ممکن است به صدا، نور یا حرکت‌های مادر واکنش نشان دهد.\n\nمادر ممکن است سنگینی بیشتر، گرفتگی پا، کمردرد یا تغییر خواب را تجربه کند.\n\nچیزهای مفید در این ماه: نوشیدن آب کافی، غذاهای مغذی، کشش‌های بسیار ملایم با اجازه پزشک، کاهش ایستادن طولانی، و مراقبت از کیفیت خواب.\n\nحمایت عاطفی همسر در این ماه می‌تواند فشار ذهنی مادر را کمتر کند.",
  },
  {
    title: "ماه هفتم بارداری",
    desc: "ورود به سه‌ماهه سوم؛ افزایش وزن و آمادگی بیشتر بدن.",
    icon: CalendarDays,
    content:
      "در ماه هفتم، جنین وزن بیشتری می‌گیرد و حرکات او معمولاً واضح‌تر حس می‌شوند. بدن مادر هم وارد مرحله سنگین‌تری از بارداری می‌شود.\n\nممکن است خستگی، تنگی نفس خفیف، فشار روی کمر یا نیاز بیشتر به استراحت احساس شود.\n\nچیزهای مفید در این ماه: خواب کافی، تغذیه سبک‌تر و متعادل، آماده‌سازی آرام وسایل مورد نیاز نوزاد، و صحبت با پزشک درباره مراقبت‌های سه‌ماهه سوم.\n\nاین ماه زمان خوبی برای آرام‌تر کردن ریتم زندگی است.",
  },
  {
    title: "ماه هشتم بارداری",
    desc: "تکامل بیشتر مغز و ریه‌ها؛ نزدیک شدن به زمان تولد.",
    icon: Apple,
    content:
      "در ماه هشتم، جنین همچنان در حال رشد و تکامل است. مغز، ریه‌ها و بدن او برای زندگی خارج از رحم آماده‌تر می‌شوند.\n\nمادر ممکن است خواب سخت‌تر، سنگینی بیشتر، ورم پا یا خستگی بیشتری تجربه کند.\n\nچیزهای مفید در این ماه: استراحت منظم، بالا نگه داشتن پاها در صورت نیاز، تغذیه سبک، آماده‌سازی ذهنی برای زایمان، و کاهش کارهای سنگین.\n\nاگر علائم غیرعادی مثل درد شدید، خونریزی، کاهش محسوس حرکت جنین یا سردرد شدید وجود داشت، باید سریع با پزشک تماس گرفته شود.",
  },
  {
    title: "ماه نهم بارداری",
    desc: "آمادگی برای تولد و دیدار با نوزاد.",
    icon: Baby,
    content:
      "ماه نهم، ماه انتظار و آمادگی است. جنین معمولاً وزن بیشتری گرفته و بدن مادر برای زایمان آماده‌تر می‌شود.\n\nاحساسات مادر ممکن است ترکیبی از هیجان، نگرانی، خستگی و عشق باشد. این کاملاً قابل درک است.\n\nچیزهای مفید در این ماه: آماده کردن کیف بیمارستان، مرور علائم شروع زایمان با پزشک، استراحت بیشتر، تغذیه سبک، حمایت عاطفی، و آرام نگه داشتن فضای خانه.\n\nاین ماه پایان یک مسیر و آغاز یک زندگی تازه است.",
  },
];

export default function PregnancyWeeklyGrowth() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="رشد ماه‌به‌ماه جنین">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <Baby className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
           رشد ماه‌به‌ماه جنین
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
             آشنایی ساده و کاربردی با وضعیت جنین، تغییرات بدن مادر و نکات مراقبتی مهم در هر ماه بارداری.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pregnancyWeeks.map((item, index) => {
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
          👶 هر هفته، قدمی کوچک در مسیر شکل‌گیری یک زندگی تازه است.
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