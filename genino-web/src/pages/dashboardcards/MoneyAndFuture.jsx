import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  DollarSign,
  Brain,
  Wallet,
  TrendingUp,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  PiggyBank,
  X,
} from "lucide-react";

const moneyItems = [
  {
    title: "پول فقط عدد نیست",
    desc: "رابطه ما با پول، روی آرامش ذهن اثر می‌گذارد.",
    icon: DollarSign,
    content:
      "پول فقط موجودی حساب یا درآمد ماهانه نیست؛ پول برای خیلی‌ها با امنیت، آزادی، ترس، مقایسه، ارزشمندی یا آینده گره خورده است.\n\nاگر رابطه‌ات با پول پر از اضطراب باشد، حتی درآمد بیشتر هم همیشه آرامش نمی‌آورد.\n\nمدیریت مالی یعنی هم پولت را بهتر بشناسی، هم ذهن مالی خودت را.",
  },
  {
    title: "خرج احساسی",
    desc: "گاهی خرید کردن، درمان خستگی نیست؛ پنهان کردن آن است.",
    icon: ShoppingBag,
    content:
      "بعضی خریدها از نیاز واقعی نمی‌آیند؛ از خستگی، ناراحتی، مقایسه یا میل به بهتر شدن حال لحظه‌ای می‌آیند.\n\nاین به معنی بد بودن خرید نیست. مسئله این است که بفهمیم چرا می‌خریم.\n\nقبل از خریدهای غیرضروری، یک سؤال ساده کمک می‌کند: «واقعاً به این نیاز دارم یا فقط می‌خواهم حالم عوض شود؟»",
  },
  {
    title: "بودجه‌بندی ساده",
    desc: "کنترل پول یعنی اول بدانیم پول کجا می‌رود.",
    icon: Wallet,
    content:
      "بودجه‌بندی قرار نیست پیچیده و حسابداری‌طور باشد.\n\nبرای شروع فقط کافی است خرج‌ها را به چند دسته تقسیم کنی: ضروری‌ها، لذت‌ها، رشد شخصی، پس‌انداز و هزینه‌های پنهان.\n\nوقتی بدانی پولت کجا می‌رود، تصمیم گرفتن خیلی آسان‌تر می‌شود.",
  },
  {
    title: "پس‌انداز یعنی آزادی آینده",
    desc: "پس‌انداز فقط جمع کردن پول نیست؛ کم کردن ترس است.",
    icon: PiggyBank,
    content:
      "پس‌انداز خوب یعنی برای آینده‌ات کمی فضا و امنیت بسازی.\n\nحتی مبلغ‌های کوچک اگر ادامه‌دار باشند، حس کنترل و آرامش بیشتری می‌دهند.\n\nبرای مجردها، پس‌انداز می‌تواند پایه استقلال، تصمیم‌های بزرگ‌تر، یادگیری مهارت، سفر، مهاجرت یا شروع یک مسیر تازه باشد.",
  },
  {
    title: "مقایسه مالی با دیگران",
    desc: "نمایش زندگی دیگران، کل واقعیت زندگی آن‌ها نیست.",
    icon: Brain,
    content:
      "شبکه‌های اجتماعی باعث می‌شوند زندگی مالی دیگران خیلی جذاب‌تر، موفق‌تر و بی‌دردسرتر دیده شود.\n\nاما ما معمولاً فقط ویترین زندگی آدم‌ها را می‌بینیم، نه بدهی‌ها، فشارها، ترس‌ها یا پشت‌صحنه‌شان را.\n\nرشد مالی واقعی از مقایسه کمتر و شناخت مسیر خودت شروع می‌شود.",
  },
  {
    title: "درآمد دوم و مهارت پول‌ساز",
    desc: "آینده مالی فقط با کم خرج کردن ساخته نمی‌شود.",
    icon: TrendingUp,
    content:
      "کاهش خرج مهم است، اما همیشه کافی نیست.\n\nگاهی مسیر بهتر این است که مهارت جدید یاد بگیری، تجربه کاری بسازی، پروژه کوچک شروع کنی یا راهی برای درآمد دوم پیدا کنی.\n\nمهارت، یکی از جدی‌ترین سرمایه‌های مالی یک آدم مجرد است.",
  },
  {
    title: "آرامش مالی",
    desc: "هدف فقط پول بیشتر نیست؛ زندگی سبک‌تر است.",
    icon: ShieldCheck,
    content:
      "بعضی آدم‌ها پول بیشتری دارند اما آرامش کمتری تجربه می‌کنند، چون خرج‌ها، توقعات و ترس‌هایشان هم بیشتر شده است.\n\nآرامش مالی یعنی بین درآمد، خرج، آینده و سبک زندگی تعادل بسازی.\n\nپول باید به زندگی کمک کند، نه اینکه تمام ذهن را اشغال کند.",
  },
  {
    title: "تعادل بین لذت و آینده",
    desc: "نه سختگیری کامل، نه بی‌برنامگی کامل.",
    icon: Sparkles,
    content:
      "زندگی فقط پس‌انداز نیست؛ تجربه، سفر، کافه، کتاب، لباس، تفریح و حال خوب هم بخشی از زندگی‌اند.\n\nاما اگر همه درآمد فقط خرج لذت‌های لحظه‌ای شود، آینده اضطراب‌آور می‌شود.\n\nمدیریت مالی سالم یعنی هم امروز را زندگی کنی، هم فردای خودت را تنها نگذاری.",
  },
];

export default function MoneyAndFuture() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="پول، آرامش و آینده">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border border-blue-200 shadow-inner mb-4">
            <DollarSign className="text-sky-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-sky-700 mb-3">
            پول، آرامش و آینده
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            نگاه‌هایی ساده و عمیق به پول، خرج کردن، پس‌انداز، استقلال مالی و
            ساختن آینده‌ای آرام‌تر.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {moneyItems.map((item, index) => {
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
          💰 پول خوب مدیریت‌شده، می‌تواند به آرامش و آزادی بیشتر تبدیل شود.
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

              <div className="text-gray-700 text-sm leading-9 whitespace-pre-line">
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