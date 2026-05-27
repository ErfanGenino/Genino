import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Mountain,
  Map,
  Coffee,
  Camera,
  Waves,
  Trees,
  Compass,
  Sparkles,
  X,
} from "lucide-react";

const travelItems = [
  {
    title: "سفر به کیش",
    desc: "جزیره‌ای برای تفریح، خرید، دریا و شب‌های زنده.",
    icon: Waves,
    content:
      "کیش برای سفرهای سبک، شاد و پرانرژی عالی است. ساحل مرجان، کشتی یونانی، اسکله تفریحی، پارک دلفین‌ها، مراکز خرید و تفریحات دریایی از جذابیت‌های اصلی آن هستند. کیش بیشتر مناسب کسانی است که تفریح، دریا، قدم‌زدن شبانه و حال‌وهوای آزادتر می‌خواهند.",
  },
  {
    title: "سفر به شیراز",
    desc: "شهر شعر، تاریخ، باغ‌های زیبا و حال‌وهوای عاشقانه.",
    icon: Sparkles,
    content:
      "شیراز یکی از احساسی‌ترین مقصدهای ایران است. حافظیه، سعدیه، باغ ارم، نارنجستان قوام، بازار وکیل، مسجد نصیرالملک و تخت جمشید از دیدنی‌های اصلی آن هستند. شیراز برای سفر آرام، فرهنگی، عاشقانه و پر از عکس‌های زیبا عالی است.",
  },
  {
    title: "سفر به اصفهان",
    desc: "ترکیب باشکوه معماری، تاریخ، هنر و پیاده‌روی‌های خاطره‌ساز.",
    icon: Map,
    content:
      "اصفهان شهری است که قدم‌زدن در آن خودش یک تجربه است. میدان نقش جهان، مسجد شیخ لطف‌الله، عالی‌قاپو، سی‌وسه‌پل، پل خواجو، چهلستون و محله جلفا از مکان‌های مهم آن هستند. اصفهان برای کسانی خوب است که تاریخ، هنر، کافه‌گردی و عکاسی دوست دارند.",
  },
  {
    title: "سفر به یزد",
    desc: "شهر بادگیرها، کوچه‌های خشتی و آرامش کویری.",
    icon: Compass,
    content:
      "یزد یکی از خاص‌ترین شهرهای ایران است. بافت تاریخی یزد، میدان امیرچخماق، مسجد جامع، باغ دولت‌آباد، آتشکده زرتشتیان و کافه‌های سنتی از جذابیت‌های آن هستند. یزد برای سفر آرام، عمیق، فرهنگی و متفاوت بسیار مناسب است.",
  },
  {
    title: "سفر به قشم",
    desc: "طبیعت عجیب، ساحل‌های متفاوت و تجربه‌ای ماجراجویانه.",
    icon: Waves,
    content:
      "قشم بیشتر از یک جزیره معمولی است. دره ستارگان، جنگل حرا، جزایر ناز، غار خربس، تنگه چاهکوه و ساحل‌های خاص از دیدنی‌های مهم آن هستند. قشم برای کسانی جذاب است که طبیعت متفاوت، سفر اقتصادی‌تر و کشف مکان‌های خاص را دوست دارند.",
  },
  {
    title: "سفر به کویر",
    desc: "سکوت، آسمان پرستاره و تجربه‌ای متفاوت از آرامش.",
    icon: Mountain,
    content:
      "کویر برای کسانی است که می‌خواهند از شلوغی فاصله بگیرند. کویر مرنجاب، مصر، ورزنه و شهداد از مقصدهای محبوب کویری هستند. پیاده‌روی روی شن‌ها، دیدن غروب، شب‌نشینی کنار آتش و تماشای ستاره‌ها از تجربه‌های خاص سفر کویری است.",
  },
  {
    title: "سفر به شمال ایران",
    desc: "جنگل، دریا، جاده‌های زیبا و هوای نم‌دار خاطره‌انگیز.",
    icon: Trees,
    content:
      "شمال ایران همیشه یکی از محبوب‌ترین مقصدهای سفر است. رامسر، ماسال، نمک‌آبرود، چالوس، متل قو، نوشهر، لاهیجان و جنگل‌های گیلان و مازندران هر کدام حال‌وهوای خاصی دارند. این سفر برای آرامش، طبیعت‌گردی، غذاهای محلی و دوری از روزمرگی عالی است.",
  },
  {
    title: "سفر به کردستان",
    desc: "کوهستان، فرهنگ گرم، موسیقی و طبیعت چشم‌نواز.",
    icon: Mountain,
    content:
      "کردستان یکی از مقصدهای کمتر دیده‌شده اما بسیار زیباست. سنندج، اورامانات، مریوان، دریاچه زریوار و روستاهای پلکانی منطقه از دیدنی‌های مهم آن هستند. این سفر برای کسانی مناسب است که طبیعت کوهستانی، فرهنگ محلی و تجربه‌های اصیل دوست دارند.",
  },
  {
    title: "سفر به چابهار",
    desc: "ساحل‌های اقیانوسی، کوه‌های مریخی و طبیعت متفاوت.",
    icon: Waves,
    content:
      "چابهار یکی از متفاوت‌ترین مقصدهای ایران است. کوه‌های مریخی، ساحل درک، تالاب لیپار، بندر گواتر و سواحل اقیانوسی از جذابیت‌های آن هستند. چابهار برای کسانی خوب است که دنبال مقصدی خاص، کمتر تکراری و پر از منظره‌های عجیب هستند.",
  },
  {
    title: "سفر به کوهستان",
    desc: "هوای خنک، مسیرهای پیاده‌روی و حس قدرت و آزادی.",
    icon: Mountain,
    content:
      "سفر کوهستانی می‌تواند از یک پیاده‌روی سبک تا یک برنامه جدی‌تر طبیعت‌گردی باشد. دماوند، توچال، الوند، سبلان و مناطق کوهستانی اطراف شهرها گزینه‌های جذابی هستند. این سفر برای انرژی گرفتن، فاصله از موبایل و تقویت حال جسم و ذهن عالی است.",
  },
  {
    title: "سفر به مشهد",
    desc: "ترکیبی از زیارت، خرید، غذا و تجربه شهری پررفت‌وآمد.",
    icon: Map,
    content:
      "مشهد فقط مقصد زیارتی نیست؛ شهری بزرگ با مراکز خرید، غذاهای معروف، پارک‌ها و مسیرهای تفریحی اطراف است. حرم امام رضا، طرقبه، شاندیز، کوهسنگی و بازار رضا از بخش‌های شناخته‌شده آن هستند. مشهد برای سفر خانوادگی، معنوی و شهری مناسب است.",
  },
  {
    title: "سفر به تبریز",
    desc: "شهری تمیز، تاریخی، خوش‌غذا و پر از اصالت.",
    icon: Compass,
    content:
      "تبریز شهری با فرهنگ غنی، غذاهای خوشمزه و تاریخ مهم است. بازار بزرگ تبریز، ائل‌گلی، خانه مشروطه، موزه‌ها و کندوان در نزدیکی تبریز از دیدنی‌های مهم آن هستند. تبریز برای کسانی عالی است که سفر شهری، غذا، تاریخ و نظم شهری را دوست دارند.",
  },
];

export default function TravelExperience() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="سفر و تجربه‌های تازه">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border border-blue-200 shadow-inner mb-4">
            <Mountain className="text-sky-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-sky-700 mb-3">
            سفر و تجربه‌های تازه
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            چند ایده ساده برای کشف دنیا، ساختن خاطره، فاصله گرفتن از روزمرگی
            و تجربه حال‌وهوای تازه در زندگی.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {travelItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-sm hover:shadow-[0_0_22px_rgba(125,200,255,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                    <Icon className="text-sky-600" size={22} />
                  </div>

                  <h3 className="font-bold text-sky-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-sky-700">
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
          🌍 گاهی یک مسیر تازه، حال آدم را از نو می‌سازد.
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
              className="w-full max-w-xl rounded-3xl bg-white border border-blue-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-sky-700 leading-8">
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

              <p className="text-gray-700 text-sm leading-8">
                {selectedItem.content}
              </p>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
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