import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, HeartPulse } from "lucide-react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import HorizontalScrollGallery from "../components/HorizontalScrollGallery";


export default function MyWomenHealthTest() {
  const [todayPersian, setTodayPersian] = useState("");
  const [todayGregorian, setTodayGregorian] = useState("");

  useEffect(() => {
    const nowPersian = new DateObject({ calendar: persian, locale: persian_fa });
    setTodayPersian(nowPersian.format("dddd D MMMM YYYY"));
    const nowGregorian = new DateObject({ calendar: gregorian });
    setTodayGregorian(nowGregorian.format("dddd, MMMM D, YYYY"));
  }, []);

  const Divider = () => (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6 }}
      className="w-32 h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full mx-auto my-10"
    ></motion.div>
  );

  const ImageScroll = () => (
    <div className="overflow-x-auto flex gap-3 pb-3 px-1 scroll-smooth snap-x">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-32 h-24 rounded-xl bg-pink-100 snap-start overflow-hidden shadow-sm hover:scale-[1.03] transition-transform"
        >
          <img
            src={`https://placekitten.com/200/200?image=${i}`}
            alt={`تصویر ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <main
  dir="rtl"
  className="min-h-screen w-full bg-gradient-to-b from-[#fff7fb] to-[#fff3f7] flex flex-col items-center justify-start py-10 text-gray-800"
>
  {/* لایه محدودکننده اصلی صفحه */}
  <div className="w-full max-w-[95vw] sm:max-w-3xl px-4 sm:px-6 overflow-x-hidden">

      {/* 🔹 تیتر صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <HeartPulse className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          راهنمای سلامت بانوان 🌸
        </h1>
        <p className="text-gray-600 text-sm">
          با رعایت نکات علمی و پایش منظم وضعیت بدن، می‌توانید زندگی سالم‌تر و آگاهانه‌تری داشته باشید.
        </p>
      </motion.div>

      {/* 📅 تقویم بزرگ امروز */}
      <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="bg-white border border-pink-200 rounded-2xl shadow-sm px-6 py-5 mb-10 flex flex-col items-center justify-center text-center text-pink-700 w-full max-w-lg mx-auto"
>
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-6 h-6 text-pink-500" />
          <span className="font-bold text-lg">امروز</span>
        </div>
        <p className="text-base font-semibold">{todayPersian}</p>
        <p className="text-sm text-gray-600 mt-1">{todayGregorian}</p>
      </motion.div>

      {/* 🩺 توصیه مهم */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-gray-600 text-sm max-w-2xl text-center mb-4 leading-relaxed"
      >
        ژنینو توصیه می‌کند به نتایج این تست‌ها به‌تنهایی اکتفا نکنید و با 
        <span className="text-pink-600 font-medium"> مراجعه منظم و به‌موقع به پزشک متخصص </span>
        در حفظ سلامت خود کوشا باشید. نتایج این تست‌ها می‌توانند در تشکیل 
        <span className="text-pink-600 font-medium"> رزومه سلامت فردی </span>
        و ارائه‌ی دقیق‌تر اطلاعات به پزشک، مفید و مکمل باشند.
      </motion.p>

      <Divider />

      {/* 🧴 ۱. سلامت پوست و مو */}
      <section className="max-w-3xl leading-relaxed mb-12 px-4">
        <h2 className="text-xl font-bold text-pink-600 mb-4 text-center">
          ۱. سلامت پوست و مو
        </h2>
        <HorizontalScrollGallery folder="women/skin" />

        <h3 className="text-pink-500 font-semibold mt-6 mb-2">راهکارها</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>رژیم غذایی با پروتئین کافی، ویتامین‌های A، C، E، روی و بیوتین برای پوست و مو.</li>
          <li>محافظت از پوست در برابر آفتاب (SPF روزانه) برای جلوگیری از پیری زودرس به دلیل اشعه UV.</li>
          <li>شستشوی ملایم و استفاده از محصولات مناسب نوع پوست یا مو.</li>
          <li>اجتناب از کشش، حرارت زیاد و رنگ یا دکلره مکرر برای مو.</li>
          <li>خواب کافی و کاهش استرس، چون هورمون‌ها روی سلامت پوست و مو تأثیر دارند.</li>
        </ul>
        <h3 className="text-pink-500 font-semibold mt-6 mb-2">چک‌آپ/کنترل در خانه</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>ماهی یک‌بار: بررسی وضعیت پوست (لکه‌های جدید، خال‌ها، قرمزی، خارش طولانی).</li>
          <li>ماهی یک‌بار: بررسی خط مو، پوست سر برای ریزش ناگهانی/تغییرات در ضخامت مو.</li>
          <li>هر سه-شش ماه: عکس گرفتن از مو/پوست با نور ثابت، برای مقایسه تغییرات وقتی می‌خواهید روند را دنبال کنید.</li>
        </ul>
      </section>

      <Divider />

      {/* 🎀 ۲. سلامت پستان‌ها */}
      <section className="max-w-3xl leading-relaxed mb-12 px-4">
        <h2 className="text-xl font-bold text-pink-600 mb-4 text-center">
          ۲. سلامت پستان‌ها
        </h2>
        <HorizontalScrollGallery folder="women/breast" />

        <h3 className="text-pink-500 font-semibold mt-6 mb-2">راهکارها</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>شناخت ساختار طبیعی پستان‌ها برای تشخیص سریع تغییرات.</li>
          <li>فعالیت بدنی منظم و حفظ وزن سالم.</li>
          <li>محدود کردن مصرف الکل و انواع دخانیات.</li>
          <li>در صورت مشاهده توده، قرمزی پوست پستان، فرورفتگی نوک پستان و ترشح غیرعادی، مراجعه فوری به پزشک.</li>
        </ul>
        <h3 className="text-pink-500 font-semibold mt-6 mb-2">چک‌آپ/کنترل در خانه</h3>
        <p className="text-gray-600 text-sm">
          اگرچه بعضی منابع تأکید می‌کنند که معاینه ماهانه پستان به‌تنهایی جایگزین غربالگری نمی‌شود، ولی «آگاهی از پستان‌ها» بسیار توصیه شده است.
        </p>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>هر ماه: حدود ۳-۵ روز بعد از اتمام قاعدگی (اگر قاعدگی دارید) یا یک روز ثابت در ماه برای خانم‌هایی که قاعدگی‌شان قطع شده است. بررسی بصری و لمسی پستان‌ها در آینه و در حالت خوابیده و ایستاده.</li>
          <li>هر سال: معاینه بالینی پستان توسط پزشک، و سن مناسب: با شروع حدود سن ۴۰ سال (یا زودتر اگر سابقه خانوادگی دارید) غربالگری مانند ماموگرافی.</li>
        </ul>
      </section>

      <Divider />

      {/* 🌷 ۳. سلامت واژن و رحم */}
      <section className="max-w-3xl leading-relaxed mb-12 px-4">
        <h2 className="text-xl font-bold text-pink-600 mb-4 text-center">
          ۳. سلامت واژن و آلت تناسلی 
        </h2>
        <HorizontalScrollGallery folder="women/vagina" />

        <h3 className="text-pink-500 font-semibold mt-6 mb-2">راهکارها</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>بهداشت ناحیه تناسلی: شستشو با آب ولرم، استفاده از شوینده ملایم بدون عطر. اجتناب از محصولات تحریک-کننده یا عطرآگین.</li>
          <li>لباس مناسب: لباس زیر نخی، تعویض منظم، اجتناب از لباس بسیار تنگ که ممکن است رطوبت و گرم شدن را افزایش دهد.</li>
          <li>فعالیت جنسی ایمن و بررسی علائم عفونت‌های مقاربتی.</li>
          <li>انجام تست‌های پاپ‌اسمیر و HPV طبق دستور پزشک.</li>
          <li>ورزش کِگل (عضلات کف لگن) برای حمایت از رحم، مثانه، به ویژه بعد از زایمان یا با افزایش سن.</li>
        </ul>
        <h3 className="text-pink-500 font-semibold mt-6 mb-2">چک‌آپ/کنترل در خانه</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>هر ماه: بررسی رنگ، بوی، ترشحات واژنی — اگر تغییر زیادی دارد مانند بوی نامطبوع، خونریزی میان قاعدگی، درد همراه، مشورت با پزشک کنید.</li>
          <li>هر سال (یا طبق توصیه پزشک): معاینه لگن و پاپ اسمیر. آغاز معمول آن از حدود سن ۲۱ یا آغاز فعالیت جنسی.</li>
          <li>هر چند سال (یا طبق توصیه پزشک): سونوگرافی رحم/تخمدان‌ها اگر علائمی مثل درد مزمن، خونریزی پس از یائسگی، یا ناباروری وجود دارد.</li>
        </ul>
      </section>

      <Divider />

      {/* 🌼 ۴. سلامت رحم و تخمدان‌ها */}
      <section className="max-w-3xl leading-relaxed mb-20 px-4">
        <h2 className="text-xl font-bold text-pink-600 mb-4 text-center">
          ۴. سلامت رحم و تخمدان‌ها
        </h2>
        <HorizontalScrollGallery folder="women/uterus" />

        <h3 className="text-pink-500 font-semibold mt-6 mb-2">راهکارها</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>مصرف خوراکی‌هایی که فیبر بالا دارند و چربی‌های اشباع‌شده پایین — سبب بهبود هورمون‌ها و کمک به پیشگیری از فیبروئید و کیست تخمدان.</li>
          <li>حفظ وزن سالم برای کاهش ریسک سندرم تخمدان پلی‌کیستیک.</li>
          <li>مدیریت استرس و خواب کافی.</li>
          <li>آگاهی از علائم هشداردهنده مانند درد لگن یا خونریزی غیرطبیعی.</li>
          <li>انجام سونوگرافی و معاینه منظم در صورت نیاز.</li>
        </ul>
        <h3 className="text-pink-500 font-semibold mt-6 mb-2">چک‌آپ/کنترل در خانه</h3>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>سالی یک بار: بررسی عملکرد قاعدگی — آیا منظم است؟ آیا درد یا خونریزی غیرطبیعی دارد؟</li>
          <li>هر زمان: اگر درد لگن، نفخ شدید، تغییر در چرخه قاعدگی، مشکل در باروری داشتید — باید به پزشک مراجعه کنید.</li>
          <li>طبق توصیه پزشک: انجام سونوگرافی تخمدان/رحم اگر سابقه خانوادگی، علائم یا بیماری دارید.</li>
        </ul>
      </section>
      </div>
</main>
  );
}
