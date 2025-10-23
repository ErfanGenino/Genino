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
      className="min-h-screen bg-gradient-to-b from-[#fff7fb] to-[#fff3f7] flex flex-col items-center justify-start py-10 text-gray-800 overflow-x-hidden"
    >
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
        className="bg-white border border-pink-200 rounded-2xl shadow-sm px-6 py-5 mb-10 flex flex-col items-center justify-center text-center text-pink-700 w-full max-w-lg"
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
          <li>محافظت از پوست در برابر آفتاب (SPF روزانه) برای جلوگیری از پیری زودرس.</li>
          <li>شستشوی ملایم و استفاده از محصولات مناسب نوع پوست یا مو.</li>
          <li>اجتناب از کشش، حرارت زیاد و رنگ یا دکلره مکرر برای مو.</li>
          <li>خواب کافی و کاهش استرس، چون هورمون‌ها روی سلامت پوست و مو تأثیر دارند.</li>
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
          <li>محدود کردن مصرف الکل.</li>
          <li>در صورت مشاهده توده یا ترشح غیرعادی، مراجعه فوری به پزشک.</li>
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
          <li>بهداشت ناحیه تناسلی با آب ولرم و شوینده‌های بدون عطر.</li>
          <li>استفاده از لباس زیر نخی و تعویض منظم آن.</li>
          <li>فعالیت جنسی ایمن و بررسی علائم عفونت‌های مقاربتی.</li>
          <li>انجام تست‌های پاپ‌اسمیر و HPV طبق دستور پزشک.</li>
          <li>ورزش کگل برای تقویت عضلات کف لگن.</li>
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
          <li>رژیم غذایی سرشار از فیبر و کم‌چربی‌های اشباع.</li>
          <li>حفظ وزن سالم برای کاهش ریسک سندرم تخمدان پلی‌کیستیک.</li>
          <li>مدیریت استرس و خواب کافی.</li>
          <li>آگاهی از علائم هشداردهنده مانند درد لگن یا خونریزی غیرطبیعی.</li>
          <li>انجام سونوگرافی و معاینه منظم در صورت نیاز.</li>
        </ul>
      </section>
    </main>
  );
}
