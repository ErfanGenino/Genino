import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const incomeScenarios = [
  {
    title: "فعالیت سبک",
    subtitle: "مناسب شغل دوم",
    shops: "۱ فروشگاه در روز",
    income: "۲۰ میلیون تومان",
    formula: "۱ × ۲۰ روز × ۱ میلیون",
  },
  {
    title: "فعالیت متعادل",
    subtitle: "فعالیت منظم و قابل دستیابی",
    shops: "۳ فروشگاه در روز",
    income: "۶۰ میلیون تومان",
    formula: "۳ × ۲۰ روز × ۱ میلیون",
  },
  {
    title: "فعالیت حرفه‌ای",
    subtitle: "برای سفیران جدی و پرانرژی",
    shops: "۵ فروشگاه در روز",
    income: "۱۰۰ میلیون تومان",
    formula: "۵ × ۲۰ روز × ۱ میلیون",
  },
];

export default function GeninoAmbassadorIncome() {
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
              💎 برنامه درآمدی سفیران ژنینو
            </h1>

            <p className="mt-3 leading-8 text-white/90">
              شرایط درآمدی، محاسبات پورسانت، مثال‌های واقعی و مسیر رشد
              سفیران ژنینو
            </p>
          </div>

          <div className="space-y-6 leading-9 text-stone-600">
            <section className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-5">
              <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
                🛍️ بخش اول: فروشگاه‌ها
              </h2>

              <p>
                تعرفه اشتراک فروشگاه‌ها در ژنینو هر سال بر اساس شرایط
                اقتصادی، هزینه‌های خدمات و سیاست‌های ژنینو تعیین و اعلام
                می‌شود.
              </p>

              <p className="mt-3 font-bold text-[#7a5217]">
                درصد پورسانت سفیران و سایر شرایط مالی این برنامه درآمدی ثابت
                بوده و وابسته به تعرفه سالانه فروشگاه‌ها نیست.
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-yellow-200 bg-white p-5">
                <h3 className="mb-3 font-extrabold text-[#7a5217]">
                  🏪 تعرفه استاندارد سال ۱۴۰۵
                </h3>
                <ul className="space-y-2">
                  <li>✅ یک صفحه اختصاصی فروشگاه</li>
                  <li>✅ ۲۰ ویترین یا پنجره معرفی کالا</li>
                  <li>✅ یک سال اشتراک</li>
                  <li className="font-black text-[#7a5217]">
                    مبلغ: ۳ میلیون تومان
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-50 to-white p-5 shadow-lg shadow-yellow-900/5">
                <h3 className="mb-3 font-extrabold text-[#7a5217]">
                  🎉 طرح افتتاحیه سال ۱۴۰۵
                </h3>
                <ul className="space-y-2">
                  <li>✅ یک صفحه اختصاصی فروشگاه</li>
                  <li>✅ ۳۰ ویترین یا پنجره معرفی کالا</li>
                  <li>✅ دو سال اشتراک</li>
                  <li className="font-black text-[#7a5217]">
                    مبلغ: ۲ میلیون تومان
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-2xl border border-yellow-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-extrabold text-[#7a5217]">
                💰 پورسانت‌های سفیر از فروشگاه‌ها
              </h2>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-yellow-50/70 p-4 text-center">
                  <div className="font-black text-[#7a5217]">ثبت‌نام</div>
                  <div className="mt-2 text-2xl font-black text-[#7a5217]">
                    ۵۰٪
                  </div>
                  <p className="mt-2 text-sm leading-6">
                    از مبلغ حق اشتراک پرداختی فروشگاه
                  </p>
                </div>

                <div className="rounded-2xl bg-yellow-50/70 p-4 text-center">
                  <div className="font-black text-[#7a5217]">تمدید اشتراک</div>
                  <div className="mt-2 text-2xl font-black text-[#7a5217]">
                    ۵۰٪
                  </div>
                  <p className="mt-2 text-sm leading-6">
                    حتی اگر سفیر دوباره مراجعه نکرده باشد
                  </p>
                </div>

                <div className="rounded-2xl bg-yellow-50/70 p-4 text-center">
                  <div className="font-black text-[#7a5217]">فروش کالا</div>
                  <div className="mt-2 text-2xl font-black text-[#7a5217]">
                    ۱٪ تا ۲٪
                  </div>
                  <p className="mt-2 text-sm leading-6">
                    بر اساس تعداد کاربران معرفی‌شده
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
              <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
                📈 افزایش پورسانت با معرفی کاربران
              </h2>

              <p>
                به ازای هر ۱۰۰ کاربر واقعی و یکتایی که توسط سفیر به ژنینو
                معرفی شوند، ۰٫۱ درصد به سهم سفیر از فروش فروشگاه‌ها افزوده
                می‌شود.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["۱۰۰ کاربر → ۱٫۱٪", "۲۰۰ کاربر → ۱٫۲٪", "۵۰۰ کاربر → ۱٫۵٪", "۱۰۰۰ کاربر → ۲٪"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-yellow-200 bg-white p-3 text-center text-sm font-extrabold text-[#7a5217]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              <p className="mt-4 font-bold text-[#7a5217]">
                حداکثر سهم قابل دریافت از فروش فروشگاه‌ها ۲ درصد خواهد بود.
              </p>
            </section>

            <section className="rounded-2xl border border-yellow-200 bg-white p-5">
              <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
                💳 زمان و نحوه تسویه
              </h2>

              <p>
                پورسانت‌های مربوط به ثبت‌نام فروشگاه‌ها، پس از قطعی شدن
                پرداخت و دریافت وجه توسط ژنینو، محاسبه شده و در پایان همان
                هفته به حساب سفیر واریز می‌شوند.
              </p>

              <p className="mt-3 font-black text-[#7a5217]">
                روز تسویه سفیران ژنینو: پنج‌شنبه هر هفته
              </p>

              <p className="mt-4">
                پورسانت فروش کالا پس از ثبت کد تحویل کالا توسط مشتری، گذشت
                ۳ روز از زمان تحویل و عدم ثبت درخواست مرجوعی، قطعی شده و در
                نزدیک‌ترین تسویه هفتگی واریز خواهد شد.
              </p>
            </section>

            <section className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-5">
              <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
                📊 دسترسی سفیر به اطلاعات فروشگاه‌ها
              </h2>

              <p>
                سفیران ژنینو از طریق داشبورد اختصاصی خود می‌توانند وضعیت
                فروشگاه‌های معرفی‌شده، میزان فروش، مدت باقی‌مانده اشتراک و
                پورسانت‌های دریافت‌شده یا در انتظار تسویه را مشاهده کنند.
              </p>
            </section>

            <section className="rounded-2xl border border-yellow-200 bg-white p-5">
              <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
                🔒 حفظ مالکیت معرفی فروشگاه‌ها
              </h2>

              <p>
                هر فروشگاه تنها دارای یک سفیر فعال خواهد بود. تا زمانی که
                اشتراک فروشگاه فعال باشد یا در زمان مقرر تمدید شود، سفیر
                معرفی‌کننده اولیه مالک امتیاز معرفی آن فروشگاه محسوب می‌شود.
              </p>

              <p className="mt-3">
                اگر اشتراک فروشگاه پایان یابد و فروشگاه به مدت ۳ ماه متوالی
                اشتراک خود را تمدید نکند، فروشگاه در وضعیت آزاد قرار گرفته و
                هر سفیر دیگری می‌تواند آن را دوباره به ژنینو معرفی کند.
              </p>
            </section>

            <section className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-white to-yellow-50 p-5">
              <h2 className="mb-4 text-xl font-extrabold text-[#7a5217]">
                🌟 مثال‌های درآمدی سفیران ژنینو در ماه 
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                {incomeScenarios.map((scenario) => (
                  <div
                    key={scenario.title}
                    className="rounded-2xl border border-yellow-200 bg-white p-4 text-center shadow-lg shadow-yellow-900/5"
                  >
                    <div className="font-black text-[#7a5217]">
                      {scenario.title}
                    </div>
                    <div className="mt-1 text-xs text-stone-500">
                      {scenario.subtitle}
                    </div>
                    <div className="mt-3 text-sm font-bold text-stone-600">
                      {scenario.shops}
                    </div>
                    <div className="mt-3 text-2xl font-black text-[#7a5217]">
                      {scenario.income}
                    </div>
                    <div className="mt-2 text-xs text-stone-500">
                      {scenario.formula}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-stone-500">
                این مثال‌ها فقط درآمد حاصل از ثبت‌نام فروشگاه‌ها را نشان
                می‌دهند و درآمدهای حاصل از تمدید اشتراک و فروش کالا در آن‌ها
                محاسبه نشده است.
              </p>
            </section>

            <div className="my-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-yellow-200" />
  <span className="font-black text-[#7a5217]">
    ارائه‌دهندگان کالا و خدمات
  </span>
  <div className="h-px flex-1 bg-yellow-200" />
</div>

<section className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5">
  <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
    🎓 بخش دوم: ارائه‌دهندگان کالا و خدمات
  </h2>

  <p>
    این بخش شامل مدارس، مهدکودک‌ها، خانه‌های بازی، کلاس‌های آموزشی،
    کلاس‌های هنری، کلاس‌های ورزشی، معلمان خصوصی، مربیان و سایر
    ارائه‌دهندگان کالا و خدمات کودک و خانواده در ژنینو است.
  </p>

  <p className="mt-3 font-bold text-[#7a5217]">
    سفیران ژنینو با معرفی این مراکز و ارائه‌دهندگان، علاوه بر پورسانت
    اشتراک سالانه، می‌توانند از درآمدهای اضافی آن‌ها نیز سهم دریافت کنند.
  </p>
</section>

<section className="grid gap-4 md:grid-cols-2">
  <div className="rounded-2xl border border-yellow-200 bg-white p-5">
    <h3 className="mb-3 font-extrabold text-[#7a5217]">
      🏢 اشتراک استاندارد خدمات
    </h3>

    <ul className="space-y-2">
      <li>✅ یک صفحه اختصاصی در ژنینو</li>
      <li>✅ ۲۰۰ مجوز اهدای گواهی دستاورد ژنینو</li>
      <li>✅ امکان استفاده برای ۵ کاربر مجاز</li>
      <li>✅ یک سال اشتراک</li>
      <li className="font-black text-[#7a5217]">
        مبلغ: ۱۰ میلیون تومان
      </li>
    </ul>
  </div>

  <div className="rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-50 to-white p-5 shadow-lg shadow-yellow-900/5">
    <h3 className="mb-3 font-extrabold text-[#7a5217]">
      🎉 طرح افتتاحیه خدمات در سال ۱۴۰۵
    </h3>

    <ul className="space-y-2">
      <li>✅ یک صفحه اختصاصی در ژنینو</li>
      <li>✅ ۳۰۰ مجوز اهدای گواهی دستاورد ژنینو</li>
      <li>✅ امکان استفاده برای ۵ کاربر مجاز</li>
      <li>✅ یک سال اشتراک</li>
      <li className="font-black text-[#7a5217]">
        مبلغ: ۶ میلیون تومان
      </li>
    </ul>
  </div>
</section>

<section className="rounded-2xl border border-yellow-200 bg-white p-5">
  <h2 className="mb-4 text-xl font-extrabold text-[#7a5217]">
    💰 پورسانت‌های سفیر از ارائه‌دهندگان کالا و خدمات
  </h2>

  <div className="grid gap-3 md:grid-cols-3">
    <div className="rounded-2xl bg-yellow-50/70 p-4 text-center">
      <div className="font-black text-[#7a5217]">اشتراک سالانه</div>
      <div className="mt-2 text-2xl font-black text-[#7a5217]">۵۰٪</div>
      <p className="mt-2 text-sm leading-6">
        از مبلغ اشتراک پرداختی ارائه‌دهنده
      </p>
    </div>

    <div className="rounded-2xl bg-yellow-50/70 p-4 text-center">
      <div className="font-black text-[#7a5217]">دستاورد اضافی</div>
      <div className="mt-2 text-2xl font-black text-[#7a5217]">۲۰٪</div>
      <p className="mt-2 text-sm leading-6">
        از درآمد فروش مجوزهای دستاورد اضافه
      </p>
    </div>

    <div className="rounded-2xl bg-yellow-50/70 p-4 text-center">
      <div className="font-black text-[#7a5217]">کاربر اضافه</div>
      <div className="mt-2 text-2xl font-black text-[#7a5217]">۲۰٪</div>
      <p className="mt-2 text-sm leading-6">
        از درآمد فعال‌سازی کاربران اضافه
      </p>
    </div>
  </div>
</section>

<section className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-5">
  <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
    🏅 درآمدهای اضافی ارائه‌دهندگان
  </h2>

  <p>
    هر ارائه‌دهنده در اشتراک پایه خود تعداد مشخصی مجوز اهدای گواهی
    دستاورد ژنینو دریافت می‌کند. در صورت نیاز به مجوزهای بیشتر، امکان
    خرید بسته‌های اضافی وجود دارد.
  </p>

  <div className="mt-4 grid gap-3 md:grid-cols-2">
    <div className="rounded-2xl border border-yellow-200 bg-white p-4">
      <h3 className="font-extrabold text-[#7a5217]">
        مجوز دستاورد اضافی
      </h3>
      <p className="mt-2">هر ۱۰۰ عدد مجوز اهدای گواهی دستاورد اضافی:</p>
      <p className="mt-2 text-xl font-black text-[#7a5217]">
        ۱ میلیون تومان
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-white p-4">
      <h3 className="font-extrabold text-[#7a5217]">
        کاربر مجاز اضافه
      </h3>
      <p className="mt-2">
        اشتراک پایه شامل ۵ کاربر مجاز است. برای هر کاربر اضافه:
      </p>
      <p className="mt-2 text-xl font-black text-[#7a5217]">
        ۱ میلیون تومان
      </p>
    </div>
  </div>

  <p className="mt-4 font-bold text-[#7a5217]">
    سهم سفیر از درآمدهای اضافی برابر با ۲۰ درصد خواهد بود.
  </p>
</section>


            <section className="rounded-2xl border border-yellow-200 bg-yellow-50/70 p-5">
              <h2 className="mb-3 text-xl font-extrabold text-[#7a5217]">
                ⚠️ نکات مهم
              </h2>

              <ul className="space-y-2">
                <li>• تمامی پورسانت‌ها فقط برای پرداخت‌های قطعی محاسبه می‌شوند.</li>
                <li>• ملاک محاسبات مالی، اطلاعات ثبت‌شده در سامانه ژنینو است.</li>
                <li>
                  • این برنامه تا زمانی معتبر است که ژنینو به فعالیت خود ادامه
                  دهد.
                </li>
                <li>
                  • در صورت توقف دائمی فعالیت ژنینو، تعهدات مالی آینده نسبت
                  به سفیران نیز خاتمه خواهد یافت.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl bg-gradient-to-l from-[#d4af37]/10 to-[#b98522]/10 p-5 text-center font-bold text-[#7a5217]">
              در ژنینو، درآمد سفیران تنها به یک معرفی محدود نمی‌شود؛ بلکه
              می‌تواند با توسعه شبکه فروشگاه‌ها و کاربران، به یک مسیر درآمدی
              پایدار، بلندمدت و رو به رشد تبدیل شود.
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