import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Apple,
  Salad,
  Droplets,
  Fish,
  Milk,
  Bean,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";

const nutritionItems = [
  {
    title: "تغذیه بارداری یعنی چی؟",
    desc: "هدف، غذا خوردن آگاهانه است؛ نه سختگیری و اضطراب.",
    icon: Apple,
    content:
      "تغذیه دوران بارداری فقط بیشتر خوردن نیست؛ بهتر و آگاهانه‌تر خوردن است.\n\nبدن مادر در این دوران به انرژی، پروتئین، ویتامین‌ها، مواد معدنی و آب کافی نیاز دارد.\n\nهدف این نیست که مادر دائم نگران غذا باشد؛ هدف این است که انتخاب‌های روزانه کمی مغذی‌تر، متعادل‌تر و امن‌تر باشند.",
  },
  {
    title: "پروتئین برای رشد جنین",
    desc: "پروتئین یکی از پایه‌های رشد بدن جنین است.",
    icon: Bean,
    content:
      "پروتئین در ساخت بافت‌ها، عضلات و رشد کلی بدن جنین نقش مهمی دارد.\n\nمنابع خوب پروتئین می‌توانند شامل تخم‌مرغ کاملاً پخته، مرغ، گوشت مناسب، ماهی‌های مجاز، حبوبات، لبنیات و مغزها باشند.\n\nاگر مادر رژیم خاصی دارد، بهتر است درباره تأمین پروتئین کافی با پزشک یا متخصص تغذیه مشورت کند.",
  },
  {
    title: "آهن و پیشگیری از کم‌خونی",
    desc: "بدن مادر در بارداری به آهن بیشتری نیاز دارد.",
    icon: Salad,
    content:
      "در دوران بارداری حجم خون مادر افزایش پیدا می‌کند و نیاز به آهن بیشتر می‌شود.\n\nکمبود آهن می‌تواند باعث خستگی، ضعف، بی‌حالی و کم‌خونی شود.\n\nگوشت، عدس، لوبیا، اسفناج، تخم‌مرغ و برخی مغزها می‌توانند منابع آهن باشند. مصرف ویتامین C کنار منابع آهن گیاهی، جذب آهن را بهتر می‌کند.\n\nمصرف مکمل آهن باید طبق نظر پزشک باشد.",
  },
  {
    title: "کلسیم و استخوان‌های جنین",
    desc: "کلسیم برای استخوان، دندان و عملکرد بدن مهم است.",
    icon: Milk,
    content:
      "کلسیم در رشد استخوان‌ها و دندان‌های جنین و سلامت بدن مادر نقش مهمی دارد.\n\nلبنیات پاستوریزه، ماست، پنیر مناسب، شیر، کنجد و برخی سبزیجات می‌توانند منابع کلسیم باشند.\n\nاگر مادر لبنیات مصرف نمی‌کند یا حساسیت دارد، بهتر است درباره جایگزین مناسب با پزشک مشورت شود.",
  },
  {
    title: "ماهی و امگا ۳",
    desc: "مفید، اما با انتخاب درست و ایمن.",
    icon: Fish,
    content:
      "برخی ماهی‌ها منبع امگا ۳ هستند و می‌توانند برای رشد مغز و سیستم عصبی جنین مفید باشند.\n\nاما در دوران بارداری باید نوع ماهی با دقت انتخاب شود، چون بعضی ماهی‌ها ممکن است جیوه بیشتری داشته باشند.\n\nماهی‌های کم‌جیوه و کاملاً پخته معمولاً انتخاب‌های امن‌تری هستند. درباره نوع و مقدار مصرف، بهتر است با پزشک مشورت شود.",
  },
  {
    title: "آب کافی و گوارش بهتر",
    desc: "آب روی انرژی، یبوست و حال عمومی اثر دارد.",
    icon: Droplets,
    content:
      "نوشیدن آب کافی در بارداری می‌تواند به کاهش یبوست، سردرد، خستگی و بی‌حالی کمک کند.\n\nبهتر است مادر در طول روز کم‌کم آب بنوشد، نه اینکه فقط وقتی تشنه شد مقدار زیادی آب بخورد.\n\nاگر ورم شدید، سردرد غیرعادی یا علائم نگران‌کننده وجود دارد، باید با پزشک مطرح شود.",
  },
  {
    title: "خوراکی‌هایی که باید با احتیاط مصرف شوند",
    desc: "امنیت غذایی در بارداری بسیار مهم است.",
    icon: ShieldAlert,
    content:
      "در دوران بارداری بهتر است از غذاهای خام یا نیم‌پز، لبنیات غیرپاستوریزه، تخم‌مرغ خام، گوشت نیم‌پز، ماهی خام و مواد غذایی مشکوک یا مانده پرهیز شود.\n\nهمچنین مصرف زیاد کافئین، غذاهای بسیار فرآوری‌شده و خوراکی‌های پرقند بهتر است کنترل شود.\n\nهدف ترساندن نیست؛ هدف این است که مادر انتخاب‌های امن‌تری داشته باشد.",
  },
  {
    title: "تعادل، نه کمال‌گرایی",
    desc: "هیچ مادری قرار نیست همیشه عالی غذا بخورد.",
    icon: Sparkles,
    content:
      "بارداری دوره‌ای پر از تغییرات جسمی و احساسی است. گاهی اشتها تغییر می‌کند، تهوع اجازه نمی‌دهد غذاهای ایده‌آل بخوری، یا بدن چیزهای خاصی می‌خواهد.\n\nتغذیه سالم یعنی در مجموع مسیر بهتری داشته باشی، نه اینکه هر وعده کامل و بی‌نقص باشد.\n\nمهربانی با خود، بخشی از مراقبت در بارداری است.",
  },
];

export default function PregnancyNutrition() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="تغذیه دوران بارداری">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <Apple className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            تغذیه دوران بارداری
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            آشنایی ساده و کاربردی با مواد مغذی، خوراکی‌های مفید و نکات مهم
            تغذیه برای مادر و جنین.
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
          🍎 تغذیه خوب، یعنی مراقبت آرام و آگاهانه از مادر و زندگی تازه.
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