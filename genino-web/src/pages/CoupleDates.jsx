import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Coffee,
  Utensils,
  Film,
  Music,
  Camera,
  TreePine,
  Home,
  Gift,
  Sparkles,
  X,
} from "lucide-react";

const dateItems = [
  {
    title: "کافه‌گردی دونفره",
    desc: "یک قرار ساده، صمیمی و همیشه دوست‌داشتنی.",
    icon: Coffee,
    content:
      "کافه‌گردی فقط نوشیدن قهوه نیست؛ فرصتی است برای چند دقیقه دور شدن از شلوغی، نگاه کردن به هم، حرف زدن و ساختن یک خاطره کوچک.\n\nبرای جذاب‌تر شدنش می‌توانید هر بار یک کافه جدید را امتحان کنید یا یک کافه ثابت را تبدیل به پاتوق دونفره خودتان کنید.",
  },
  {
    title: "شام آرام دونفره",
    desc: "یک وعده ساده، اما با توجه و حال خوب.",
    icon: Utensils,
    content:
      "لازم نیست شام دونفره همیشه گران یا رسمی باشد. حتی یک غذای ساده در خانه، اگر با توجه، موسیقی ملایم و موبایل‌های کنار گذاشته‌شده همراه باشد، می‌تواند رابطه را گرم‌تر کند.\n\nمهم غذا نیست؛ مهم حس دیده شدن و وقت گذاشتن برای همدیگر است.",
  },
  {
    title: "فیلم دیدن با حال‌وهوای خاص",
    desc: "یک فیلم خوب، خوراکی ساده و چند ساعت آرامش.",
    icon: Film,
    content:
      "فیلم دیدن وقتی تبدیل به خاطره می‌شود که فقط روشن کردن تلویزیون نباشد. یک فیلم انتخاب کنید، نور خانه را کم کنید، خوراکی ساده آماده کنید و بعد از فیلم چند دقیقه درباره حس‌تان حرف بزنید.\n\nاین کار ساده می‌تواند گفت‌وگوهای جالبی بین زوج‌ها ایجاد کند.",
  },
  {
    title: "پیاده‌روی شبانه",
    desc: "راه رفتن، حرف زدن و سبک‌تر شدن ذهن.",
    icon: TreePine,
    content:
      "پیاده‌روی دونفره یکی از ساده‌ترین و کم‌هزینه‌ترین قرارهاست. وقتی کنار هم راه می‌روید، حرف زدن راحت‌تر می‌شود و فشار گفت‌وگوی مستقیم کمتر است.\n\nگاهی یک مسیر کوتاه شبانه می‌تواند حال رابطه را از یک روز خسته‌کننده جدا کند.",
  },
  {
    title: "عکاسی از لحظه‌ها",
    desc: "ثبت خاطره‌های کوچک و ساختن آلبوم دونفره.",
    icon: Camera,
    content:
      "عکس گرفتن فقط برای شبکه‌های اجتماعی نیست؛ برای یادآوری لحظه‌هایی است که بعداً ارزش بیشتری پیدا می‌کنند.\n\nمی‌توانید هر ماه چند عکس ساده از قرارها، سفرهای کوتاه، غذاها یا لحظه‌های معمولی‌تان بگیرید و یک آلبوم خاطره دونفره بسازید.",
  },
  {
    title: "موسیقی و خلوت دونفره",
    desc: "پلی‌لیست مشترک برای لحظه‌های خاص.",
    icon: Music,
    content:
      "یک پلی‌لیست مشترک بسازید؛ آهنگ‌هایی که هر دو دوست دارید یا یادآور خاطره‌ای خاص هستند.\n\nموسیقی می‌تواند رابطه را به خاطره وصل کند. گاهی یک آهنگ، بیشتر از هزار جمله حس مشترک می‌سازد.",
  },
  {
    title: "قرار خانگی",
    desc: "گاهی بهترین قرار، بیرون رفتن نیست.",
    icon: Home,
    content:
      "قرار خانگی می‌تواند خیلی خاص باشد؛ یک شام ساده، بازی دونفره، فیلم، چای، موسیقی یا حتی مرتب کردن یک گوشه خانه با هم.\n\nمهم این است که آن چند ساعت را آگاهانه برای رابطه کنار بگذارید، نه اینکه فقط کنار هم باشید ولی هرکدام در دنیای خودتان.",
  },
  {
    title: "هدیه‌های کوچک بی‌مناسبت",
    desc: "محبت‌های کوچک، اثرهای بزرگ دارند.",
    icon: Gift,
    content:
      "هدیه همیشه نباید گران یا مناسبتی باشد. یک شاخه گل، یک یادداشت کوتاه، خوراکی مورد علاقه یا حتی یک پیام ساده می‌تواند نشان دهد که طرف مقابل هنوز برایت مهم است.\n\nرابطه با توجه‌های کوچک زنده می‌ماند.",
  },
  {
    title: "تجربه تازه با هم",
    desc: "کاری که قبلاً با هم امتحان نکرده‌اید.",
    icon: Sparkles,
    content:
      "یک کلاس جدید، یک غذای تازه، یک مسیر جدید، یک بازی، یک سفر کوتاه یا حتی یاد گرفتن یک مهارت ساده با هم می‌تواند انرژی تازه‌ای به رابطه بدهد.\n\nتجربه‌های جدید باعث می‌شوند رابطه از تکرار فاصله بگیرد.",
  },
];

export default function CoupleDates() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="قرارهای دونفره">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Coffee className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            قرارهای دونفره
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            ایده‌هایی ساده، گرم و قابل اجرا برای ساختن خاطره، صمیمیت و حال خوب
            در زندگی مشترک.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dateItems.map((item, index) => {
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
                  مشاهده ایده ←
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
          💕 رابطه با خاطره‌های کوچک، گرم‌تر و زنده‌تر می‌شود.
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