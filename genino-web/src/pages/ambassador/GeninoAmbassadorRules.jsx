import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function GeninoAmbassadorRules() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-yellow-50/40 to-white px-4 py-6 text-stone-800 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <motion.div
          className="rounded-[2rem] border border-yellow-200 bg-white p-5 shadow-2xl shadow-yellow-900/10 sm:p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-6 rounded-[1.5rem] bg-gradient-to-l from-[#d4af37] to-[#b98522] p-6 text-white shadow-lg shadow-yellow-500/20">
            <h1 className="text-2xl font-black sm:text-3xl">
              ⚖️ قوانین سفیران ژنینو
            </h1>

            <p className="mt-3 leading-8 text-white/90">
              قوانین، تعهدات، مسئولیت‌ها و اصول حرفه‌ای همکاری با ژنینو
            </p>
          </div>

          <div className="space-y-5 leading-9 text-stone-600">

  <section className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      ⚖️ رعایت قوانین جمهوری اسلامی ایران
    </h2>

    <p>
      کلیه سفیران ژنینو موظف به رعایت قوانین، مقررات و ضوابط جاری
      جمهوری اسلامی ایران هستند.
    </p>

    <p className="mt-3">
      در صورت بروز هرگونه تعارض میان قوانین و مقررات ژنینو با قوانین
      حاکم بر کشور، ملاک عمل همواره قوانین و مقررات جمهوری اسلامی ایران
      خواهد بود.
    </p>

    <p className="mt-3 font-bold text-[#7a5217]">
      پایبندی به قوانین کشور، احترام به حقوق شهروندان و رعایت اصول
      قانونی، مقدم بر تمامی مقررات داخلی ژنینو بوده و برای تمامی
      سفیران لازم‌الاجرا است.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      🤝 اصل اول: صداقت و شفافیت
    </h2>

    <p>
      سفیران ژنینو موظف هستند تمامی اطلاعات مربوط به خدمات، امکانات،
      تعرفه‌ها و شرایط همکاری را به صورت صحیح، کامل و صادقانه ارائه
      کنند.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      💎 اصل دوم: حفظ اعتبار برند ژنینو
    </h2>

    <p>
      سفیران موظف هستند در تمامی ارتباطات حضوری، تلفنی، آنلاین و
      مکتوب، شأن و اعتبار برند ژنینو را حفظ کنند.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      🚫 اصل سوم: ممنوعیت ثبت‌نام صوری
    </h2>

    <p>
      ثبت‌نام فروشگاه‌ها، مراکز خدماتی یا کاربران غیرواقعی با هدف
      دریافت پورسانت ممنوع است.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      🔒 اصل چهارم: محرمانگی اطلاعات
    </h2>

    <p>
      سفیران موظف هستند اطلاعات کاربران، فروشگاه‌ها و مراکز خدماتی را
      محرمانه تلقی کرده و از انتشار یا استفاده غیرمجاز از آن‌ها
      خودداری کنند.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      🏪 اصل پنجم: احترام به حقوق سایر سفیران
    </h2>

    <p>
      هر فروشگاه یا ارائه‌دهنده خدمات تنها دارای یک سفیر فعال خواهد
      بود و سفیران موظف هستند به حقوق سایر سفیران احترام بگذارند.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      💰 اصل ششم: پرداخت پورسانت
    </h2>

    <p>
      تمامی پورسانت‌ها بر اساس اطلاعات ثبت‌شده در سامانه ژنینو و
      مطابق برنامه درآمدی سفیران محاسبه خواهند شد.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      📈 اصل هفتم: توسعه سالم شبکه کاربران
    </h2>

    <p>
      ایجاد حساب‌های کاربری جعلی، تکراری یا غیرواقعی با هدف افزایش
      پورسانت ممنوع است.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      ⚠️ اصل هشتم: تخلفات
    </h2>

    <ul className="space-y-2">
      <li>• ارائه اطلاعات نادرست درباره ژنینو</li>
      <li>• ثبت‌نام صوری کاربران یا کسب‌وکارها</li>
      <li>• سوءاستفاده از سیستم پورسانت</li>
      <li>• آسیب به اعتبار برند ژنینو</li>
      <li>• نقض محرمانگی اطلاعات</li>
    </ul>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      ⛔ اصل نهم: تعلیق یا خاتمه همکاری
    </h2>

    <p>
      در صورت مشاهده تخلفات جدی یا تکرار تخلفات، ژنینو می‌تواند حساب
      سفیر را به صورت موقت تعلیق یا به طور دائم غیرفعال کند.
    </p>
  </section>

  <section className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
    <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
      🌱 اصل دهم: همکاری بلندمدت
    </h2>

    <p>
      هدف ژنینو ایجاد همکاری‌های پایدار، منصفانه و بلندمدت با
      سفیران است و ژنینو خود را متعهد به شفافیت در گزارش‌ها و
      محاسبات مالی می‌داند.
    </p>
  </section>

</div>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 w-full rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-6 py-4 font-extrabold text-white shadow-lg shadow-yellow-500/25 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            خواندم و بازگشت به صفحه سفیران ژنینو
          </button>
        </motion.div>
      </section>
    </main>
  );
}