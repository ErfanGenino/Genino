import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Music,
  Piano,
  Guitar,
  Drum,
  Waves,
  Brain,
  Heart,
  Sparkles,
  Headphones,
  X,
} from "lucide-react";

const musicItems = [
  {
    title: "موسیقی کلاسیک",
    desc: "آرامش، تمرکز و تعادل ذهنی.",
    icon: Piano,
    content:
      "موسیقی کلاسیک یکی از آرامش‌بخش‌ترین سبک‌های موسیقی است و بسیاری از افراد هنگام مطالعه، تمرکز یا استراحت از آن استفاده می‌کنند. آثار بتهوون، موتزارت و شوپن از معروف‌ترین نمونه‌های این سبک هستند.\n\nبعضی تحقیقات نشان داده‌اند که موسیقی کلاسیک می‌تواند روی تمرکز، کاهش اضطراب و آرام‌تر شدن ذهن اثر مثبت داشته باشد.",
  },

  {
    title: "موسیقی لوفای",
    desc: "موسیقی آرام برای تمرکز، درس و شب‌های خلوت.",
    icon: Headphones,
    content:
      "لوفای سبکی آرام و مینیمال است که معمولاً ریتم نرم، صدای باران، نویزهای لطیف و فضای آرامش‌بخش دارد.\n\nخیلی از افراد هنگام کار، برنامه‌نویسی، مطالعه یا استراحت شبانه از موسیقی لوفای استفاده می‌کنند چون ذهن را کمتر شلوغ می‌کند.",
  },

  {
    title: "پیانو",
    desc: "یکی از آرام‌ترین و احساسی‌ترین سازهای دنیا.",
    icon: Piano,
    content:
      "پیانو توانایی عجیبی در انتقال احساسات دارد؛ از غم عمیق تا آرامش و امید.\n\nبسیاری از موسیقی‌های آرامش‌بخش، فیلم‌ها و قطعات احساسی با پیانو ساخته می‌شوند. صدای پیانو برای خیلی از افراد حس تمرکز، سکوت ذهن و آرامش ایجاد می‌کند.",
  },

  {
    title: "گیتار",
    desc: "سازی صمیمی، گرم و مناسب حس‌های انسانی.",
    icon: Guitar,
    content:
      "گیتار یکی از محبوب‌ترین سازهای دنیاست و در سبک‌های مختلف مثل پاپ، راک، فلامنکو و موسیقی آرام استفاده می‌شود.\n\nصدای گیتار معمولاً حس صمیمیت، سفر، خاطره و آرامش منتقل می‌کند و برای خیلی‌ها همراه لحظه‌های شخصی زندگی است.",
  },

  {
    title: "موسیقی و مغز",
    desc: "چرا موسیقی روی احساسات انسان اثر می‌گذارد؟",
    icon: Brain,
    content:
      "وقتی موسیقی گوش می‌دهیم، بخش‌های مختلف مغز فعال می‌شوند؛ مخصوصاً قسمت‌هایی که به احساسات، حافظه و دوپامین مرتبط هستند.\n\nبه همین دلیل بعضی آهنگ‌ها می‌توانند ما را هیجان‌زده، آرام، غمگین یا حتی نوستالژیک کنند.\n\nموسیقی فقط صدا نیست؛ مغز آن را به احساس و تجربه تبدیل می‌کند.",
  },

  {
    title: "موسیقی و ژنتیک",
    desc: "چرا بعضی آدم‌ها شدیدتر با موسیقی ارتباط می‌گیرند؟",
    icon: Sparkles,
    content:
      "دانشمندان معتقدند بخشی از درک موسیقی و واکنش احساسی به آن می‌تواند با ژنتیک مرتبط باشد.\n\nبعضی افراد به‌طور طبیعی ریتم را سریع‌تر درک می‌کنند، بعضی‌ها حساسیت احساسی بیشتری به موسیقی دارند و بعضی‌ها ارتباط عمیق‌تری با صداها برقرار می‌کنند.\n\nهمچنین ژنتیک می‌تواند روی استعداد موسیقی، شنوایی و حتی علاقه به بعضی سبک‌ها اثر بگذارد.",
  },

  {
    title: "موسیقی آرامش‌بخش",
    desc: "صداهایی برای کاهش استرس و آرام‌تر شدن ذهن.",
    icon: Waves,
    content:
      "موسیقی‌های آرام با ریتم کند، صداهای طبیعت، پیانو ملایم یا امبینت می‌توانند به آرام‌تر شدن سیستم عصبی کمک کنند.\n\nخیلی از افراد هنگام خواب، مدیتیشن، استراحت یا زمان‌های اضطراب از این نوع موسیقی استفاده می‌کنند.",
  },

  {
    title: "دف و موسیقی عرفانی",
    desc: "ترکیبی از ریتم، احساس و حال‌وهوای معنوی.",
    icon: Drum,
    content:
      "دف یکی از سازهای مهم موسیقی عرفانی و سنتی است.\n\nریتم دف می‌تواند حس انرژی، رهایی و تمرکز ذهنی ایجاد کند و در موسیقی‌های عرفانی ایرانی جایگاه ویژه‌ای دارد.",
  },

  {
    title: "چرا بعضی آهنگ‌ها خاطره می‌سازند؟",
    desc: "ارتباط موسیقی با حافظه و احساسات.",
    icon: Heart,
    content:
      "مغز انسان موسیقی را با احساسات و اتفاقات زندگی ذخیره می‌کند. به همین دلیل ممکن است یک آهنگ ناگهان ما را به سال‌ها قبل ببرد.\n\nموسیقی قدرت زیادی در فعال کردن خاطرات و احساسات دارد و همین موضوع باعث می‌شود بعضی آهنگ‌ها برای ما بسیار شخصی شوند.",
  },
];

export default function MusicAndMind() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="دنیای موسیقی و ذهن">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border border-blue-200 shadow-inner mb-4">
            <Music className="text-sky-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-sky-700 mb-3">
            دنیای موسیقی و ذهن
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            سفری کوتاه در دنیای موسیقی، سازها و تأثیر صداها روی ذهن، احساسات،
            آرامش و حتی ژنتیک انسان.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {musicItems.map((item, index) => {
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
          🎵 بعضی صداها فقط شنیده نمی‌شوند؛ احساس می‌شوند.
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

              <div className="text-gray-700 text-sm leading-9 space-y-5 whitespace-pre-line">
                {selectedItem.content}
              </div>

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