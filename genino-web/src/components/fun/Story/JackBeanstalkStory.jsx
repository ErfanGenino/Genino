export default function JackBeanstalkStory() {
  const sections = [
    [
      "روزی روزگاری پسری فقیر به نام جک با مادرش زندگی می‌کرد.",
      "آن‌ها فقط یک گاو داشتند و زندگی سختی را می‌گذراندند.",
      "یک روز گاو دیگر شیر نداد و مادر جک ناراحت شد.",
      "او از جک خواست گاو را در بازار بفروشد.",
      "جک گاو را به بازار برد.",
      "در راه، مرد عجیبی را دید.",
      "آن مرد چند لوبیای جادویی به جک نشان داد.",
      "او گفت این لوبیاها قدرت جادویی دارند.",
      "جک ساده‌دلانه گاو را با لوبیاها عوض کرد.",
      "وقتی به خانه برگشت، مادرش بسیار عصبانی شد.",
    ],
    [
      "مادر جک لوبیاها را از پنجره بیرون انداخت.",
      "صبح روز بعد، اتفاق عجیبی افتاد.",
      "یک ساقه بزرگ لوبیا تا آسمان رشد کرده بود.",
      "جک با تعجب به ساقه غول‌پیکر نگاه کرد.",
      "او تصمیم گرفت از آن بالا برود.",
      "جک از ساقه بالا رفت و به سرزمینی در ابرها رسید.",
      "در آنجا قلعه بزرگی دید.",
      "قلعه متعلق به یک غول ترسناک بود.",
      "جک آرام وارد قلعه شد.",
      "او صدای سنگین قدم‌های غول را شنید.",
    ],
    [
      "غول فریاد زد: بوی آدمیزاد می‌آید!",
      "جک سریع پنهان شد.",
      "همسر غول مخفیانه به جک کمک کرد.",
      "جک داخل قلعه یک مرغ جادویی دید.",
      "آن مرغ تخم‌های طلایی می‌گذاشت.",
      "وقتی غول خوابید، جک مرغ را برداشت.",
      "او سریع به سمت ساقه لوبیا دوید.",
      "غول از خواب بیدار شد و دنبال او رفت.",
      "جک با ترس از ساقه پایین آمد.",
      "غول هم با خشم پشت سر او پایین می‌آمد.",
    ],
    [
      "جک تبر بزرگی برداشت.",
      "او شروع به بریدن ساقه لوبیا کرد.",
      "غول هنوز در حال پایین آمدن بود.",
      "ناگهان ساقه شکست و غول سقوط کرد.",
      "بعد از آن، دیگر هیچ‌کس غول را ندید.",
      "مرغ جادویی هر روز تخم طلایی می‌گذاشت.",
      "جک و مادرش دیگر فقیر نبودند.",
      "آن‌ها زندگی آرام و شادی پیدا کردند.",
      "جک فهمید که شجاعت و هوش بسیار ارزشمند هستند.",
      "و داستان جک و لوبیای سحرآمیز با خوشحالی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/jack-1.webp",
    "/images/stories/jack-2.webp",
    "/images/stories/jack-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان جک و لوبیای سحرآمیز
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره شجاعت، امید و ماجراجویی
        </p>
      </div>

      <StoryImage src={images[0]} alt="جک و لوبیای سحرآمیز" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="قلعه غول" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="فرار جک از غول" />

      <StorySection lines={sections[2]} />

      <StorySection lines={sections[3]} />
    </article>
  );
}

function StoryImage({ src, alt }) {
  return (
    <div className="my-6 rounded-3xl border border-yellow-200 bg-yellow-50/60 p-3 shadow-lg">
      <img
        src={src}
        alt={alt}
        className="w-full aspect-[3/2] object-contain rounded-2xl bg-white"
        loading="lazy"
      />
    </div>
  );
}

function StorySection({ lines }) {
  return (
    <div className="my-5 rounded-3xl border border-yellow-100 bg-white/80 p-5 sm:p-7 shadow-sm">
      <div className="space-y-3 text-right">
        {lines.map((line, index) => (
          <p
            key={index}
            className="text-sm sm:text-base leading-8 text-gray-700 font-medium"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}