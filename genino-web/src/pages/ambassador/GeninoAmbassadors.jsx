import { useEffect, useState } from "react";
import { getMyAmbassador } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ambassadorHero from "../../assets/ambassador-hero.webp";

const tabs = [
  "سفیر ژنینو کیست؟",
  "نحوه درآمدزایی سفیران ژنینو",
  "چگونه سفیر ژنینو شویم؟",
  "ثبت‌نام به عنوان سفیر ژنینو",
];

function isUserLoggedIn() {
  return !!localStorage.getItem("genino_token");
}

export default function GeninoAmbassadors() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isAmbassadorRegistered, setIsAmbassadorRegistered] = useState(false);
  const [loadingAmbassador, setLoadingAmbassador] = useState(true);


  useEffect(() => {
  let isMounted = true;

  async function loadMyAmbassador() {
    try {
      const res = await getMyAmbassador();

      if (!isMounted) return;

      if (res?.ok && res?.ambassador) {
        setIsAmbassadorRegistered(true);
      } else {
        setIsAmbassadorRegistered(false);
      }
    } catch (error) {
      console.error("LOAD_MY_AMBASSADOR_ERROR:", error);
      setIsAmbassadorRegistered(false);
    } finally {
      if (isMounted) {
        setLoadingAmbassador(false);
      }
    }
  }

  loadMyAmbassador();

  return () => {
    isMounted = false;
  };
}, []);





  return (
    <main className="min-h-screen bg-white text-stone-800">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border border-yellow-200 bg-white p-2 shadow-2xl shadow-yellow-900/10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={ambassadorHero}
            alt="سفیران ژنینو"
            className="w-full rounded-[1.5rem] object-contain"
          />

          <div className="absolute inset-2 rounded-[1.5rem] bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

          
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`rounded-2xl border px-3 py-4 text-sm font-extrabold transition-all ${
                activeTab === index
                  ? "border-yellow-400 bg-gradient-to-l from-[#d4af37] to-[#b98522] text-white shadow-lg shadow-yellow-500/25"
                  : "border-yellow-200 bg-yellow-50/50 text-[#7a5217] hover:bg-yellow-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          className="mt-6 rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-white via-yellow-50/50 to-white p-6 shadow-xl shadow-yellow-900/5 sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {activeTab === 0 && (
<>
  <h2 className="mb-4 text-2xl font-extrabold text-[#7a5217]">
    سفیر ژنینو کیست؟
  </h2>

  <div className="space-y-6 leading-9 text-stone-600">

    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6">
      <p>
        سفیر ژنینو کسی است که ژنینو را به کسب‌وکارهای مرتبط با کودک و
        خانواده معرفی می‌کند و مسیر آشنایی و همکاری آن‌ها با ژنینو را
        هموار می‌سازد.
      </p>

      <p className="mt-4">
        سفیران ژنینو با مراجعه حضوری، تماس تلفنی یا استفاده از شبکه
        ارتباطی خود، صاحبان کسب‌وکارها را با امکانات، مزایا و فرصت‌های
        همکاری با ژنینو آشنا می‌کنند و راهنمایی‌های لازم را برای ثبت‌نام
        و آغاز همکاری در اختیار آن‌ها قرار می‌دهند.
      </p>

      <p className="mt-4 font-bold text-[#7a5217]">
        به زبان ساده سفیر ژنینو، کسی‌ست که ژنینو را به صاحبان کسب‌وکار معرفی
        می‌کند.
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-white p-6">
      <h3 className="mb-4 text-xl font-extrabold text-[#7a5217]">
        🏪 سفیر ژنینو به چه کسب‌وکارهایی مراجعه می‌کند؟
      </h3>

      <p className="mb-4">
        سفیران ژنینو می‌توانند ژنینو را به فروشگاه‌ها و ارائه‌دهندگان
        کالا و خدمات مرتبط با کودک و خانواده معرفی کنند.
      </p>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-4">
          <h4 className="mb-3 font-extrabold text-[#7a5217]">
            🛍️ ارائه‌دهندگان کالا
          </h4>

          <ul className="space-y-2 text-sm">
            <li>🍼 سیسمونی</li>
            <li>👶 نوزاد، کودک و نوجوان</li>
            <li>👕 مد و پوشاک</li>
            <li>🛏️ کالای خواب و حمام</li>
            <li>⌚ ساعت و زیورآلات</li>
            <li>⚽ کالای ورزشی</li>
            <li>🏥 سلامت و پزشکی</li>
            <li>🧴 آرایشی و بهداشتی</li>
            <li>🌹 عطر و ادکلن</li>
            <li>🧵 هنر دست زنان و مردان قدرتمند سرزمین من</li>
          </ul>
        </div>

        <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-4">
          <h4 className="mb-3 font-extrabold text-[#7a5217]">
            🎓 ارائه‌دهندگان خدمات
          </h4>

          <ul className="space-y-2 text-sm">
            <li>🏫 مدارس</li>
            <li>🧸 مهدکودک‌ها</li>
            <li>🎮 خانه‌های بازی</li>
            <li>📚 کلاس‌های آموزشی</li>
            <li>🎨 کلاس‌های هنری</li>
            <li>⚽ کلاس‌های ورزشی</li>
            <li>👨‍🏫 معلمان خصوصی</li>
          </ul>
        </div>

      </div>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6">
      <h3 className="mb-4 text-xl font-extrabold text-[#7a5217]">
        📋 سفیر ژنینو دقیقاً چه کاری انجام می‌دهد؟
      </h3>

      <div className="space-y-3">
        <p>✅ شناسایی کسب‌وکارهای مناسب برای همکاری با ژنینو</p>
        <p>✅ معرفی ژنینو و امکانات آن به صاحبان کسب‌وکار</p>
        <p>✅ توضیح مزایا و فرصت‌های عضویت و اشتراک در ژنینو</p>
        <p>✅ پاسخ به پرسش‌های اولیه متقاضیان</p>
        <p>✅ راهنمایی صاحبان کسب‌وکار برای ثبت‌نام در ژنینو</p>
        <p>✅ ایجاد ارتباط میان صاحبان کسب‌وکار و تیم ژنینو</p>
      </div>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-white p-6">
      <h3 className="mb-4 text-xl font-extrabold text-[#7a5217]">
        🌟 مزایای سفیر ژنینو بودن
      </h3>

      <ul className="space-y-2">
        <li>💰 امکان کسب درآمد و استقلال مالی</li>
        <li>💰 شروع فعالیت بدون نیاز به سرمایه اولیه</li>
        <li>⏰ انعطاف‌پذیری در زمان فعالیت</li>
        <li>🤝 توسعه مهارت‌های ارتباطی و مذاکره</li>
        <li>📈 گسترش شبکه ارتباطات حرفه‌ای</li>
        <li>🚀 فرصت رشد فردی و حرفه‌ای</li>
        <li>✨ دسترسی به فرصت‌های ویژه ژنینو</li>
      </ul>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6">
      <h3 className="mb-5 text-xl font-extrabold text-[#7a5217]">
        👥 سفیر ژنینو برای چه کسانی مناسب است؟
      </h3>

      <div className="space-y-3">
        <p>🎓 دانش‌آموزان و دانشجویان</p>
        <p>💼 افرادی که به دنبال شغل دوم هستند</p>
        <p>👩‍👧 زنان خانه‌دار</p>
        <p>🚀 افراد جویای رشد و پیشرفت</p>
        <p>🤝 کسانی که روابط عمومی خوبی دارند</p>
        <p>📈 افرادی که به دنبال درآمد بیشتر هستند</p>
        <p>⏰ کسانی که فعالیت منعطف و مستقل را ترجیح می‌دهند</p>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-l from-[#d4af37]/10 to-[#b98522]/10 p-5 text-center font-bold text-[#7a5217]">
        موفقیت در ژنینو به میزان حضور شما وابسته نیست؛
        بلکه به تلاش، پشتکار، مهارت ارتباطی و ارزشی که برای
        صاحبان کسب‌وکار ایجاد می‌کنید بستگی دارد.
      </div>
    </div>

  </div>
</>
)}


          {activeTab === 1 && (
<> <h2 className="mb-4 text-2xl font-extrabold text-[#7a5217]">
نحوه درآمدزایی سفیران ژنینو </h2>


<div className="space-y-5 leading-9 text-stone-600">
  <p>
    سفیران ژنینو تنها یک بار درآمد کسب نمی‌کنند؛ بلکه می‌توانند با توسعه
    شبکه همکاری خود، درآمدی مستمر، پایدار و رو به رشد ایجاد کنند.
  </p>

  <p>
    هر زمان که یک فروشگاه، مرکز آموزشی، مدرسه، مهدکودک، خانه بازی،
    کلاس آموزشی، کلاس هنری، کلاس ورزشی، مربی، معلم خصوصی یا هر
    ارائه‌دهنده کالا و خدمات از طریق معرفی شما به ژنینو بپیوندد،
    بخشی از درآمد حاصل از آن همکاری به شما تعلق خواهد گرفت.
  </p>

  <p>
    هرچه تعداد کسب‌وکارهای معرفی‌شده توسط شما بیشتر شود و شبکه ارتباطی
    گسترده‌تری ایجاد کنید، فرصت‌های درآمدی بیشتری نیز برای شما شکل خواهد گرفت.
  </p>

  <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
    <h3 className="mb-3 font-extrabold text-[#7a5217]">
      مسیرهای درآمدی سفیران ژنینو
    </h3>

    <ul className="space-y-2">
      <li>💰 پورسانت ثبت‌نام فروشگاه‌ها</li>
      <li>💰 پورسانت تمدید اشتراک فروشگاه‌ها</li>
      <li>💰 سهم از فروش فروشگاه‌های معرفی‌شده</li>
      <li>💰 پورسانت ثبت‌نام مراکز خدماتی و آموزشی</li>
      <li>💰 سهم از خرید مجوزهای دستاورد توسط مراکز آموزشی</li>
      <li>💰 افزایش درصد درآمد بر اساس توسعه شبکه کاربران ژنینو</li>
    </ul>
  </div>

  <div className="grid gap-3 sm:grid-cols-3">
    <div className="rounded-xl border border-yellow-200 bg-white p-2 text-center">
      <div className="text-xs sm:text-base font-extrabold text-[#7a5217]">
        درآمد اولیه
      </div>
      <div className="mt-1 text-[10px] sm:text-sm text-stone-500 leading-4">
        از ثبت‌نام کسب‌وکارها
      </div>
    </div>

    <div className="rounded-xl border border-yellow-200 bg-white p-2 text-center">
      <div className="text-xs sm:text-base font-extrabold text-[#7a5217]">
        درآمد مستمر
      </div>
      <div className="mt-1 text-[10px] sm:text-sm text-stone-500 leading-4">
        از فروش و تمدید اشتراک‌ها
      </div>
    </div>

    <div className="rounded-xl border border-yellow-200 bg-white p-2 text-center">
      <div className="text-xs sm:text-base font-extrabold text-[#7a5217]">
        رشد درآمد
      </div>
      <div className="mt-1 text-[10px] sm:text-sm text-stone-500 leading-4">
        با توسعه شبکه کاربران
      </div>
    </div>
  </div>

  <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
  <p className="leading-8 text-stone-600">
    مثال زیر بر اساس یک فعالیت متعادل و قابل دستیابی طراحی شده است؛
    به‌طوری که سفیر تنها با معرفی میانگین ۳ فروشگاه در روز و ۲۰ روز
    فعالیت در ماه به این نتایج دست پیدا می‌کند.
  </p>

  <p className="mt-3 leading-8 text-stone-600">
    طبیعتاً افرادی که با انگیزه، پشتکار، برنامه‌ریزی و جدیت بیشتری فعالیت
    می‌کنند، می‌توانند اهداف بزرگ‌تری برای خود تعریف کنند. بسیاری از
    سفیران ممکن است روزانه ۵، ۸، ۱۰ یا حتی تعداد بیشتری کسب‌وکار را به
    ژنینو معرفی کنند و متناسب با تلاش و عملکرد خود، درآمد بسیار بالاتری
    به دست آورند.
  </p>

  <p className="mt-3 font-bold text-[#7a5217]">
  در ژنینو سقف موفقیت از پیش تعیین نمی‌شود؛ هر سفیر به اندازه
  تلاش، مهارت، ارتباطات و ارزشی که برای کسب‌وکارها ایجاد می‌کند،
  فرصت رشد و درآمد خواهد داشت.
</p>
</div>

  <div className="rounded-[2rem] border border-yellow-200 bg-white p-5 shadow-lg shadow-yellow-900/5">
  <h3 className="mb-4 text-xl font-extrabold text-[#7a5217]">
    یک مثال واقعی از درآمد سفیر ژنینو
  </h3>

  

  <div className="space-y-4 leading-8 text-stone-600">
    <p>
     فرض کنید یک سفیر ژنینو در هر روز کاری، ۳ فروشگاه را با کد سفیر خود در
     ژنینو ثبت‌نام کند و در ماه ۲۰ روز فعالیت داشته باشد. 
    </p>

    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-4 text-center">
        <div className="text-sm text-stone-500">تعداد فروشگاه روزانه</div>
        <div className="mt-2 text-2xl font-black text-[#7a5217]">۳</div>
      </div>

      <div className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-4 text-center">
        <div className="text-sm text-stone-500">روز کاری در ماه</div>
        <div className="mt-2 text-2xl font-black text-[#7a5217]">۲۰</div>
      </div>

      <div className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-4 text-center">
        <div className="text-sm text-stone-500">پورسانت هر ثبت‌نام</div>
        <div className="mt-2 text-2xl font-black text-[#7a5217]">۱ میلیون</div>
      </div>
    </div>


    <div className="rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] p-5 text-center text-white shadow-lg shadow-yellow-500/20">
      <div className="text-sm font-bold opacity-90">
        درآمد ماهانه از ثبت‌نام فروشگاه‌ها
      </div>
      <div className="mt-2 text-3xl font-black">
        ۶۰ میلیون تومان
      </div>
      <div className="mt-2 text-sm opacity-90">
        ۳ فروشگاه × ۲۰ روز × ۱ میلیون تومان
      </div>
    </div>

    <p>
      این درآمد فقط مربوط به پورسانت ثبت‌نام فروشگاه‌هاست. علاوه بر آن، هر
      فروشگاهی که توسط سفیر معرفی شده باشد، از فروش‌های آینده خود نیز می‌تواند
      برای سفیر درآمد مستمر ایجاد کند.
    </p>

    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
      <h4 className="mb-3 font-extrabold text-[#7a5217]">
        درآمد مستمر از فروش فروشگاه‌ها
      </h4>

      <p>
        از هر فروش موفق در ژنینو، سهمی از درآمد ژنینو به سفیری تعلق می‌گیرد که
        آن فروشگاه را معرفی کرده است. این یعنی حتی بعد از ثبت‌نام اولیه،
        فعالیت فروشگاه می‌تواند برای سفیر درآمد ادامه‌دار ایجاد کند.
      </p>

      <p className="mt-3">
        در حالت پایه، سفیر از فروش فروشگاه‌های معرفی‌شده سهم دریافت می‌کند و
        با رشد شبکه کاربران معرفی‌شده، این سهم می‌تواند افزایش پیدا کند.
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-white p-5">
      <h4 className="mb-3 font-extrabold text-[#7a5217]">
        افزایش درصد پورسانت با معرفی کاربران
      </h4>

      <p>
        اگر سفیر بتواند ۱۰۰۰ کاربر واقعی و یکتا را با کد معرف خود وارد ژنینو
        کند، درصد پورسانت او از فروش فروشگاه‌های معرفی‌شده می‌تواند تا سقف
        تعیین‌شده افزایش پیدا کند.
      </p>

      <p className="mt-3 font-bold text-[#7a5217]">
        یعنی هرچه سفیر شبکه کاربران فعال‌تری بسازد، مسیر درآمدی بلندمدت‌تری
        برای خودش ایجاد می‌کند.
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
  <h4 className="mb-3 font-extrabold text-[#7a5217]">
    سفیران حرفه‌ای ژنینو درآمد خود را از چند مسیر همزمان می‌سازند
  </h4>

  <p>
    نکته مهم این است که درآمد سفیر ژنینو فقط به ثبت‌نام اولیه فروشگاه‌ها
    محدود نمی‌شود. یک سفیر فعال می‌تواند هم‌زمان از چند مسیر مختلف درآمد
    ایجاد کند و با رشد شبکه همکاری خود، درآمدش را مرحله‌به‌مرحله افزایش دهد.
  </p>

  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
    {[
      "پورسانت ثبت‌نام",
      "پورسانت تمدید",
      "سهم از فروش",
      "افزایش درصد",
    ].map((item) => (
      <div
        key={item}
        className="rounded-xl border border-yellow-200 bg-white p-3 text-center text-xs font-extrabold text-[#7a5217] sm:text-sm"
      >
        {item}
      </div>
    ))}
  </div>
</div>

   <button
  onClick={() => navigate("/genino-ambassadors/income")}
  className="w-full rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-yellow-500/25 transition hover:-translate-y-1 hover:shadow-xl sm:text-base"
>
  مشاهده برنامه درآمدی سفیران ژنینو
</button>

  </div>
</div>

  <div className="rounded-2xl bg-gradient-to-l from-[#d4af37]/10 to-[#b98522]/10 p-5 text-center font-bold text-[#7a5217]">
    در ژنینو، درآمد سفیران تنها به یک معرفی محدود نمی‌شود؛
    بلکه می‌تواند با گذشت زمان، گسترش ارتباطات و رشد شبکه همکاری،
    به یک مسیر درآمدی پایدار و ارزشمند تبدیل شود.
  </div>
</div>




</>
)}


          {activeTab === 2 && (
  <>
    <h2 className="mb-4 text-2xl font-extrabold text-[#7a5217]">
      چگونه سفیر ژنینو شویم؟
    </h2>

    <div className="space-y-6 leading-9 text-stone-600">

      <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
        <h3 className="mb-4 text-xl font-extrabold text-[#7a5217]">
          🚀 قبل از شروع؛ چند نکته مهم برای موفقیت
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              🎯 موفقیت از اولین «نه» شروع می‌شود
            </h4>
            <p className="mt-2 text-sm leading-7">
              بسیاری از افراد در اولین مراجعه با پاسخ منفی روبه‌رو
              می‌شوند. این کاملاً طبیعی است. سفیران موفق کسانی هستند
              که ناامید نمی‌شوند و مسیر خود را ادامه می‌دهند.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              🤝 اعتماد مهم‌تر از فروش است
            </h4>
            <p className="mt-2 text-sm leading-7">
              هدف شما صرفاً ثبت‌نام کسب‌وکارها نیست. هدف، ایجاد یک
              همکاری ارزشمند و بلندمدت است.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              📈 هر روز کمی بهتر از دیروز
            </h4>
            <p className="mt-2 text-sm leading-7">
              حتی یک مراجعه یا یک تماس در روز می‌تواند در بلندمدت
              نتایج بزرگی ایجاد کند. استمرار مهم‌تر از سرعت است.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              💎 شما نماینده برند ژنینو هستید
            </h4>
            <p className="mt-2 text-sm leading-7">
              رفتار حرفه‌ای، خوش‌قولی، احترام و صداقت، مهم‌ترین
              سرمایه یک سفیر موفق هستند.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-yellow-200 bg-white p-6 shadow-lg shadow-yellow-900/5">
        <h3 className="mb-5 text-xl font-extrabold text-[#7a5217]">
          📝 مراحل تبدیل شدن به سفیر ژنینو
        </h3>

        <div className="space-y-5">

          <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              ۱️⃣ مطالعه کامل برنامه درآمدی
            </h4>

            <p className="mt-2 text-sm leading-7">
              قبل از شروع همکاری، برنامه درآمدی سفیران ژنینو را به
              دقت مطالعه کنید تا با فرصت‌های درآمدی، نحوه محاسبه
              پورسانت‌ها و شرایط همکاری آشنا شوید.
            </p>

            <button
              onClick={() => navigate("/genino-ambassadors/income")}
              className="mt-4 rounded-xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-5 py-2 font-bold text-white"
            >
              💎 مطالعه برنامه درآمدی
            </button>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              ۲️⃣ مطالعه قوانین سفیران ژنینو
            </h4>

            <p className="mt-2 text-sm leading-7">
              برای حفظ کیفیت همکاری و ایجاد محیطی حرفه‌ای، مطالعه
              کامل قوانین و مقررات سفیران ژنینو الزامی است.
            </p>

            <button
  onClick={() => navigate("/genino-ambassadors/rules")}
  className="mt-4 rounded-xl border border-yellow-300 bg-white px-5 py-2 font-bold text-[#7a5217]"
>
  ⚖️ مطالعه قوانین سفیران
</button>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              ۳️⃣ تکمیل فرم ثبت‌نام
            </h4>

            <p className="mt-2 text-sm leading-7">
             اطلاعات هویتی، راه‌های ارتباطی، مشخصات محل سکونت و سایر اطلاعات مورد نیاز را با دقت تکمیل کنید.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              ۴️⃣ بارگذاری مدارک مورد نیاز
            </h4>

            <p className="mt-2 text-sm leading-7">
             عکس پرسنلی، تصویر کارت ملی، تصویر صفحه اول شناسنامه و سایر مدارک مورد نیاز را مطابق دستورالعمل سامانه بارگذاری کنید.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
  <h4 className="font-extrabold text-[#7a5217]">
    ۵️⃣ دریافت کد اختصاصی سفیر
  </h4>

  <p className="mt-2 text-sm leading-7">
    پس از تکمیل موفق ثبت‌نام، کد اختصاصی سفیر ژنینو به صورت
    خودکار برای شما ایجاد می‌شود و در داشبورد سفیران در اختیار
    شما قرار می‌گیرد.
  </p>
</div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
  <h4 className="font-extrabold text-[#7a5217]">
    ۶️⃣ ورود به داشبورد سفیران
  </h4>

  <p className="mt-2 text-sm leading-7">
    بلافاصله پس از ثبت‌نام، داشبورد اختصاصی سفیران ژنینو برای
    شما فعال می‌شود و می‌توانید آموزش‌ها، مشتریان، درآمدها،
    پورسانت‌ها، امتیازات و گزارش عملکرد خود را مشاهده کنید.
  </p>
</div>

          <div className="rounded-xl border border-yellow-200 bg-white p-4">
            <h4 className="font-extrabold text-[#7a5217]">
              ۷️⃣ شروع فعالیت حرفه‌ای
            </h4>

            <p className="mt-2 text-sm leading-7">
  از این مرحله می‌توانید با استفاده از کد سفیر خود،
  فروشگاه‌ها، مدارس، مهدکودک‌ها، خانه‌های بازی،
  کلاس‌های آموزشی، معلمان خصوصی و سایر ارائه‌دهندگان
  کالا و خدمات را به ژنینو معرفی کرده و مسیر درآمدزایی
  خود را آغاز کنید.
</p>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-4">
  <h4 className="font-extrabold text-[#7a5217]">
    ۸️⃣ ورود به آکادمی سفیران ژنینو
  </h4>

  <p className="mt-2 text-sm leading-7">
    در آکادمی سفیران ژنینو، آموزش‌های لازم برای معرفی حرفه‌ای
    ژنینو، اصول مذاکره، پاسخ به سوالات متداول مشتریان،
    توسعه مهارت‌های ارتباطی و افزایش درآمد در اختیار شما
    قرار خواهد گرفت.
  </p>
</div>


        </div>
      </div>

      <div className="rounded-2xl border border-yellow-200 bg-gradient-to-l from-[#d4af37]/10 to-[#b98522]/10 p-5 text-center">
  <h4 className="mb-3 text-lg font-extrabold text-[#7a5217]">
    💛 شما فقط یک معرف نیستید
  </h4>

  <p className="leading-8 text-stone-700">
    سفیران ژنینو نقش مهمی در توسعه کسب‌وکارهای مرتبط با کودک و خانواده دارند.
    هر همکاری موفق، می‌تواند به رشد یک کسب‌وکار، دسترسی بهتر خانواده‌ها به
    خدمات باکیفیت و ایجاد فرصت‌های جدید برای جامعه ژنینو کمک کند.
  </p>
</div>

      <div className="rounded-2xl bg-gradient-to-l from-[#d4af37]/10 to-[#b98522]/10 p-6 text-center">
        <h3 className="mb-3 text-xl font-extrabold text-[#7a5217]">
          🌟 راز موفقیت سفیران برتر
        </h3>

        <p className="leading-8 font-medium text-stone-700">
          سفیران موفق ژنینو معمولاً با سرمایه زیاد یا امکانات ویژه
          شروع نکرده‌اند؛ آن‌ها با پشتکار، نظم، ارتباط مؤثر با مردم و
          استمرار در فعالیت، مسیر رشد خود را ساخته‌اند.
        </p>

        <p className="mt-3 font-bold text-[#7a5217]">
          مهم‌ترین عامل موفقیت، ادامه دادن مسیر است.
        </p>
      </div>

      
    </div>
  </>
)}

          {activeTab === 3 && (
  <>
    <h2 className="mb-4 text-2xl font-extrabold text-[#7a5217]">
      ثبت‌نام به عنوان سفیر ژنینو
    </h2>

    {loadingAmbassador ? (
      <div className="rounded-2xl border border-yellow-200 bg-white p-6 text-center text-[#7a5217]">
        در حال بررسی وضعیت سفیر شما...
      </div>
    ) : isAmbassadorRegistered ? (
      <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6 text-center shadow-lg shadow-yellow-900/5">
        <div className="mb-3 text-4xl">💛</div>

        <h3 className="text-xl font-extrabold text-[#7a5217]">
          شما قبلاً به عنوان سفیر ژنینو ثبت‌نام کرده‌اید
        </h3>

        <p className="mt-3 leading-8 text-stone-600">
          ثبت‌نام شما با موفقیت انجام شده و داشبورد اختصاصی سفیران ژنینو برای شما فعال است.
        </p>

        <button
          onClick={() => navigate("/dashboard-ambassador")}
          className="mt-6 rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-7 py-3 font-extrabold text-white shadow-lg shadow-yellow-500/25 transition hover:-translate-y-1 hover:shadow-xl"
        >
          ورود به داشبورد سفیران
        </button>
      </div>
    ) : (
      <>
        <p className="mb-6 leading-9 text-stone-600">
          با تکمیل ثبت‌نام، کد اختصاصی سفیر ژنینو برای شما ایجاد شده و داشبورد سفیران در اختیار شما قرار خواهد گرفت.
        </p>

        <button
          onClick={() => {
  if (!isUserLoggedIn()) {
    alert(
      "برای ثبت‌نام به عنوان سفیر ژنینو، ابتدا باید وارد حساب کاربری خود شوید. اگر هنوز در ژنینو ثبت‌نام نکرده‌اید، لطفاً ابتدا ثبت‌نام کاربری خود را تکمیل کنید."
    );
    navigate("/login");
    return;
  }

  navigate("/genino-ambassadors/register");
}}
          className="rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-7 py-3 font-extrabold text-white shadow-lg shadow-yellow-500/25 transition hover:-translate-y-1 hover:shadow-xl"
        >
          شروع ثبت‌نام سفیر ژنینو
        </button>
      </>
    )}
  </>
)}
        </motion.div>
      </section>

      

    </main>
  );
}