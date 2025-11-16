// 📄 src/pages/articles/MenGenitalSelfCheckArticle.jsx
import { useState } from "react";
import HorizontalScrollGallery from "../../components/Social/HorizontalScrollGallery";
import GoldenDivider from "../../components/Core/GoldenDivider";

export default function MenGenitalSelfCheckArticle() {

  const [showWarning, setShowWarning] = useState(true);

  return (
    <>
      {/* 🔴 مودال هشدار +12 */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-5">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center border border-red-200">

            <h2 className="text-xl font-bold text-red-600 mb-4">
              هشدار: محتوای ویژه سنین بالاتر
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              محتوای این صفحه شامل اطلاعات پزشکی مربوط به سلامت دستگاه تناسلی مردان است.
              <br />
              <span className="font-semibold text-red-600">
                مشاهده این بخش برای افراد زیر ۱۲ سال مناسب نیست.
              </span>
            </p>

            <button
              onClick={() => setShowWarning(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold shadow-md hover:scale-[1.02] transition-all"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

      {/* 🔸 محتوا */}
      <main
        dir="rtl"
        className={`min-h-screen bg-gradient-to-b from-[#fffdf5] to-[#fff8e1] 
        text-gray-800 px-5 pt-24 pb-16 flex flex-col items-center transition-all duration-300
        ${showWarning ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
      {/* تیتر اصلی */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-4 text-center">
        تست خانگی سلامت دستگاه تناسلی آقایان
      </h1>

      {/* زیرتیتر */}
      <p className="text-xl font-semibold text-yellow-800 mb-6 text-center">
        بخش اول: بررسی سلامت بیضه ها
      </p>

      {/* عکس اصلی */}
      <img
        src="/images/articles/men-health/1.jpg"
        alt="خودآزمایی ماهیانه بیضه"
        className="w-full max-w-3xl rounded-3xl shadow-lg border border-yellow-200 mb-10"
      />

      {/* 🧠 بخش ۱ - توضیحات تست */}
      <div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">

        <h2 className="text-xl font-bold text-yellow-700 flex items-center gap-2">
           ۱. خودآزمایی ماهیانه بیضه (Testicular Self-Exam)
        </h2>

        <p>
          این ساده‌ترین و مهم‌ترین تست خانگیه که مردان از حدود ۱۵ سالگی به بعد باید ماهانه انجام بدن.
        </p>

        <h3 className="font-semibold text-yellow-800">🔹 روش انجام:</h3>
        <ul className="list-disc pr-5 space-y-2">
          <li>بهتره بعد از حمام آب گرم انجام بدی (چون حرارت باعث میشه کیسه بیضه شل‌تر بشه و لمس راحت‌تر).</li>
          <li>در مقابل آینه بایست.</li>
          <li>با هر دو دست، یکی از بیضه‌ها رو بین انگشتان شست و سبابه و میانی بگیر.</li>
          <li>به‌آرامی تمام سطحش رو لمس کن.</li>
        </ul>

        <p className="pl-3 border-r-4 border-yellow-400 pr-3 text-sm">
          سطحش باید صاف، بدون توده، برآمدگی یا سفتی غیرعادی باشه.  
          بیضه‌ها معمولاً اندازه‌شون فرق جزئی داره و یکی پایین‌تر از دیگریه (کاملاً طبیعیه).
        </p>

        <h3 className="font-semibold text-yellow-800">🔹 چه چیزهایی نگران‌کننده‌اند:</h3>
        <ul className="list-disc pr-5 space-y-2">
          <li>وجود توده یا سفتی غیرعادی</li>
          <li>تغییر اندازه یا شکل بیضه</li>
          <li>احساس درد یا سنگینی دائمی</li>
          <li>تجمع مایع یا تورم</li>
        </ul>

        <p className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-[14.5px] leading-relaxed shadow-sm">
          اگر یکی از این موارد بود ➜ باید به پزشک اورولوژیست مراجعه کنی.  
          <br />
          (خیلی از سرطان‌های بیضه با همین تست ساده زود تشخیص داده می‌شن.)
        </p>
      </div>

      {/* 🟡 گالری اسکرول افقی زیر متن */}
      <div className="w-full max-w-3xl mb-10">
        <HorizontalScrollGallery folder="articles/men-health/self-exam" />
      </div>


{/* 🟨 جداکننده طلایی ژنینو زیر گالری */}
<div className="w-full max-w-3xl mb-10">
  <GoldenDivider />
</div>

{/* 🧊 ۲. بررسی دمای بیضه و لباس */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">
  <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
     ۲. بررسی دمای بیضه و لباس
  </h2>

  <p>
    بیضه‌ها باید کمی سردتر از دمای بدن باشن (حدود ۳–۴ درجه کمتر).
  </p>

  <p>
    اگر همیشه از لباس‌های خیلی تنگ، شلوار جین فشرده یا محیط داغ استفاده بشه،
    ممکنه روی کیفیت اسپرم و باروری اثر بذاره.
  </p>

  <p>
    در خانه می‌تونی فقط با لمس یا توجه به تعریق و دمای زیاد متوجه بشی که شرایط خنکی مناسب نیست.
  </p>
</div>

{/* 💧 ۳. بررسی رنگ و وضعیت پوست کیسه بیضه */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">
  <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
     ۳. بررسی رنگ و وضعیت پوست کیسه بیضه
  </h2>

  <p>در نور کافی ببین:</p>

  <ul className="list-disc pr-5 space-y-2">
    <li>رنگ باید طبیعی (قهوه‌ای روشن یا صورتی تیره) باشه.</li>
    <li>
      اگر لکه‌های تیره، التهاب، زخم، یا تغییرات پوستی دیدی ➜ می‌تونه علامت
      عفونت یا مشکل پوستی باشه.
    </li>
  </ul>
</div>

{/* ⚖️ ۴. بررسی درد یا فشار هنگام فعالیت یا نشستن طولانی */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">
  <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
     ۴. بررسی درد یا فشار هنگام فعالیت یا نشستن طولانی
  </h2>

  <p>
    اگر موقع دوچرخه‌سواری، نشستن طولانی یا فعالیت خاصی احساس درد یا تیر کشیدن
    در بیضه‌ها داری، ممکنه نشانه‌ی واریکوسل (تجمع رگ‌ها) باشه.
  </p>

  <p className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-[14.5px] leading-relaxed shadow-sm">
    در این موارد فقط سونوگرافی می‌تونه تشخیص قطعی بده. هیچ تست خانگی برای ارزیابی دقیق اسپرم، هورمون تستوسترون یا واریکوسل وجود نداره — برای اینها حتماً باید به آزمایشگاه یا پزشک مراجعه کنی.
  </p>
</div>

{/* 🟡 گالری اسکرول افقی زیر متن */}
      <div className="w-full max-w-3xl mb-10">
        <HorizontalScrollGallery folder="articles/men-health/self-exam2" />
      </div>


{/* 🟨 جداکننده طلایی ژنینو زیر گالری */}
<div className="w-full max-w-3xl mb-10">
  <GoldenDivider />
</div>

{/* 🟣 بخش دوم: بررسی سلامت آلت تناسلی */}
<div className="w-full max-w-3xl mt-16 mb-6">
  <h2 className="text-2xl font-extrabold text-purple-700 mb-4 text-center">
    بخش دوم: بررسی سلامت آلت تناسلی
  </h2>
</div>

{/* عکس بخش دوم */}
<img
  src="/images/articles/men-health/penis-health-1.jpg"
  alt="بررسی سلامت آلت تناسلی"
  className="w-full max-w-3xl rounded-3xl shadow-lg border border-purple-200 mb-10"
/>
{/* 🍀 ۱. بررسی ظاهری و پوست آلت */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">

  <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
     ۱. بررسی ظاهری و پوست آلت
  </h3>

  <p>ماهانه یک‌بار در نور کافی نگاه کن:</p>

  <ul className="list-disc pr-5 space-y-2">
    <li>پوست باید بدون زخم، برجستگی، پوسته‌ریزی یا تغییر رنگ باشه.</li>
  </ul>

  <p>اگر یکی از موارد زیر رو دیدی:</p>

  <ul className="list-disc pr-5 space-y-2">
    <li>لکه‌های سفید یا قرمز</li>
    <li>برجستگی یا زگیل کوچیک</li>
    <li>خارش یا ترشح غیرعادی</li>
  </ul>

  <p className="bg-green-50 border border-green-300 rounded-xl p-4 text-[14.5px] leading-relaxed shadow-sm">
    این موارد باید توسط پزشک بررسی بشن. ممکنه نشانهٔ عفونت قارچی، ویروسی یا واکنش آلرژیک باشه.
  </p>

  <p className="pl-3 border-r-4 border-green-400 pr-3 text-sm leading-relaxed">
    🔸 <strong>نکته مهم:</strong> اگر ختنه نشده‌ای، حتماً زیر پوست ختنه‌گاه (پوست پوشاننده‌ی سر آلت) رو هم به‌آرامی تمیز و بررسی کن.  
    تجمع ترشحات (smegma) یا بوی نامطبوع می‌تونه نشانهٔ عفونت باشه.
  </p>

</div>
{/* 🔥 ۲. بررسی نعوظ (Erection) و جریان خون */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">

  <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
     ۲. بررسی نعوظ (Erection) و جریان خون
  </h3>

  <p>
    این یکی از شاخص‌های مهم سلامت آلت هست.
  </p>

  {/* تست خانگی ساده */}
  <h4 className="font-semibold text-red-700">🔹 تست خانگی ساده:</h4>
  <p>
    صبح‌ها بعد از بیدار شدن، دقت کن که آیا نعوظ صبحگاهی داری یا نه.  
    این نوع نعوظ ارتباطی با میل جنسی نداره، بلکه نشونهٔ جریان خون سالم و عملکرد عصبی خوب آلت هست.
  </p>

  <p className="bg-red-50 border border-red-200 rounded-xl p-4 text-[14.5px] leading-relaxed shadow-sm">
    اگر برای مدتی (چند هفته) این نعوظ‌ها متوقف بشن، ممکنه نشونهٔ مشکل در گردش خون یا کاهش هورمون تستوسترون باشه.
  </p>

  {/* تست پیشرفته‌تر */}
  <h4 className="font-semibold text-red-700">🔸 تست پیشرفته‌تر (غیررسمی در خانه):</h4>

  <p>
    با تحریک ذهنی یا فیزیکی ببین آیا نعوظ کامل ایجاد می‌شه و چقدر حفظ می‌مونه.
  </p>

  <p className="pl-3 border-r-4 border-red-300 pr-3 text-sm leading-relaxed">
    کاهش ناگهانی سفتی یا کوتاه شدن مدت نعوظ، ممکنه نشانهٔ اولیهٔ اختلال عملکرد نعوظ (ED) باشه،  
    که معمولاً دلایل روانی، عروقی یا دارویی داره.
  </p>

</div>

{/* 🟡 گالری اسکرول افقی زیر متن */}
      <div className="w-full max-w-3xl mb-10">
        <HorizontalScrollGallery folder="articles/men-health/penis-health" />
      </div>


{/* 🟨 جداکننده طلایی ژنینو زیر گالری */}
<div className="w-full max-w-3xl mb-10">
  <GoldenDivider />
</div>
{/* 💧 ۳. بررسی ادرار */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">

  <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
     ۳. بررسی ادرار
  </h3>

  <p>
    ادرار یکی از شاخص‌های خیلی مهم سلامت دستگاه تناسلیه،  
    چون مجرای ادرار از داخل آلت عبور می‌کنه.
  </p>

  <h4 className="font-semibold text-blue-700">🔹 دقت کن:</h4>

  <ul className="list-disc pr-5 space-y-2">
    <li>رنگ ادرار شفاف مایل به زرد هست؟</li>
    <li>بوی تند یا غیرعادی داره؟</li>
    <li>خروج ادرار با فشار یکنواخت انجام می‌شه یا قطع‌و‌وصل میشه؟</li>
    <li>سوزش یا درد موقع ادرار داری؟</li>
  </ul>

  <p className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-[14.5px] leading-relaxed shadow-sm">
    هر تغییری در این موارد می‌تونه نشونهٔ عفونت، التهاب پروستات یا انسداد مجرا باشه  
    و بهتره توسط پزشک بررسی بشه.
  </p>

</div>
{/* ⚖️ ۴. بررسی تقارن و انحنا */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">

  <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
     ۴. بررسی تقارن و انحنا
  </h3>

  <p>
    در حالت نعوظ، انحنای خفیف کاملاً طبیعی‌ه و بسیاری از مردان مقداری قوس به یک طرف دارند.
  </p>

  <p>
    اما اگر انحنا شدید بشه، زاویه زیاد پیدا کنه، یا همراه درد باشه،  
    ممکنه نشانهٔ بیماری «Peyronie» (تشکیل بافت فیبروزی داخل آلت) باشه.
  </p>

  <p className="pl-3 border-r-4 border-purple-300 pr-3 text-sm leading-relaxed">
    در خانه فقط می‌تونی میزان انحنا رو حدودی با نگاه کردن تشخیص بدی؛  
    تشخیص قطعی فقط با ویزیت پزشک انجام می‌شه.
  </p>

</div>
{/* 🟠 ۵. بررسی حساسیت و حس پوستی */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-12 space-y-4">

  <h3 className="text-xl font-bold text-orange-600 flex items-center gap-2">
     ۵. بررسی حساسیت و حس پوستی
  </h3>

  <p>
    با لمس آرام سر آلت و اطرافش بررسی کن:
  </p>

  <ul className="list-disc pr-5 space-y-2">
    <li>حس لامسه طبیعی هست؟</li>
    <li>بی‌حسی یا درد غیرطبیعی وجود داره؟</li>
  </ul>

  <p className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-[14.5px] leading-relaxed shadow-sm">
    کاهش حس یا بی‌حسی می‌تونه نشانهٔ مشکل عصبی، فشار روی اعصاب،  
    یا حتی یکی از علائم اولیهٔ دیابت باشه.
  </p>

</div>
{/* 🚫 مواردی که تست خانگی کافی نیست */}
<div className="w-full max-w-3xl text-gray-700 leading-[1.9] text-[15.5px] mb-16">

  <h3 className="text-xl font-bold text-red-700 flex items-center gap-2 mb-4">
    🚫 مواردی که تست خانگی کافی نیست
  </h3>

  <div className="bg-red-50 border border-red-300 rounded-2xl p-5 shadow-sm space-y-3">

    <ul className="list-disc pr-5 space-y-2 text-[15px]">
      <li>شک به بیماری‌های مقاربتی (عفونت، زگیل تناسلی، تبخال و …)</li>
      <li>ترشحات سفید یا سبز از مجرا</li>
      <li>زخم یا تاول روی آلت یا کیسه بیضه</li>
      <li>درد هنگام نعوظ یا خم‌شدگی ناگهانی آلت</li>
    </ul>

    <p className="text-[14.5px] leading-relaxed text-red-800 font-semibold mt-3">
      در این موارد حتماً باید پزشک معاینه انجام بده و آزمایش لازم گرفته بشه.  
      تست‌های خانگی برای تشخیص کافی نیستند.
    </p>

  </div>
</div>
{/* 🟡 گالری اسکرول افقی زیر متن */}
      <div className="w-full max-w-3xl mb-10">
        <HorizontalScrollGallery folder="articles/men-health/penis-health2" />
      </div>


{/* 🟨 جداکننده طلایی ژنینو زیر گالری */}
<div className="w-full max-w-3xl mb-10">
  <GoldenDivider />
</div>
{/* 🔶 جمع‌بندی رسمی ژنینو */}
<div className="w-full max-w-3xl mt-16">
  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-2xl shadow-md p-6 leading-relaxed text-gray-800 text-[15.5px]">
    <p className="font-semibold text-yellow-800 text-center whitespace-pre-line">
      «ارزیابی منظم سلامت جنسی، بخش مهمی از مراقبت‌های پیشگیرانه و سلامت عمومی مردان است. 
      پایش مداوم تغییرات، شناسایی زودهنگام اختلالات را تسهیل می‌کند. 
      ژنینو با اتکا بر استانداردهای علمی و اصول ارتقای سلامت، مردان را به انجام ارزیابی‌های دوره‌ای 
      و تصمیم‌گیری آگاهانه دعوت می‌کند.»
    </p>
  </div>
</div>

      {/* ادامه بخش‌ها در آینده اضافه می‌شود */}
    </main>
    </>
  );
}
