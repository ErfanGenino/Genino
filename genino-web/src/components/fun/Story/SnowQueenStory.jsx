export default function SnowQueenStory() {
  const sections = [
    [
      "روزی روزگاری دو دوست صمیمی به نام‌های گرِدا و کای کنار هم زندگی می‌کردند.",
      "آن‌ها مثل خواهر و برادر همدیگر را دوست داشتند.",
      "خانه‌هایشان نزدیک هم بود.",
      "هر روز با هم بازی می‌کردند و گل‌ها را آب می‌دادند.",
      "اما روزی اتفاق عجیبی افتاد.",
      "تکه‌ای از آینه جادویی و شیطانی وارد چشم کای شد.",
      "بعد از آن، رفتار کای تغییر کرد.",
      "او دیگر مثل قبل مهربان نبود.",
      "کای کم‌کم سرد و بی‌احساس شد.",
      "گرِدا از دیدن حال دوستش ناراحت بود.",
    ],
    [
      "یک روز ملکه برفی با سورتمه سفیدش از راه رسید.",
      "او کای را با خودش به قصر یخی برد.",
      "قصر ملکه برفی در سرزمینی سرد و دور قرار داشت.",
      "بعد از رفتن کای، گرِدا بسیار غمگین شد.",
      "اما او تصمیم گرفت دوستش را پیدا کند.",
      "گرِدا سفر طولانی و سختی را آغاز کرد.",
      "او از جنگل‌ها، رودخانه‌ها و شهرهای مختلف عبور کرد.",
      "در مسیر، آدم‌های مهربان زیادی به او کمک کردند.",
      "گرِدا هیچ‌وقت امیدش را از دست نداد.",
      "او فقط می‌خواست دوباره کای را ببیند.",
    ],
    [
      "سرانجام گرِدا به سرزمین یخی ملکه برفی رسید.",
      "همه جا پوشیده از برف و یخ بود.",
      "کای داخل قصر یخی نشسته بود.",
      "او دیگر گرِدا را به یاد نمی‌آورد.",
      "قلبش مثل یخ سرد شده بود.",
      "گرِدا با دیدن او گریه کرد.",
      "اشک‌های گرم گرِدا روی صورت کای افتاد.",
      "کم‌کم یخ قلب کای آب شد.",
      "تکه جادویی از چشمش بیرون آمد.",
      "کای دوباره مهربان و خوشحال شد.",
    ],
    [
      "گرِدا و کای همدیگر را در آغوش گرفتند.",
      "آن‌ها از قصر یخی دور شدند.",
      "ملکه برفی دیگر قدرتی روی کای نداشت.",
      "دو دوست به خانه برگشتند.",
      "گل‌های خانه‌شان دوباره شکوفه داده بودند.",
      "کای فهمید دوستی و محبت چقدر ارزشمند است.",
      "گرِدا خوشحال بود که امیدش را از دست نداده بود.",
      "مردم شهر از بازگشت آن‌ها خوشحال شدند.",
      "همه فهمیدند محبت واقعی می‌تواند حتی یخ را هم آب کند.",
      "و داستان ملکه برفی با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/snow-1.webp",
    "/images/stories/snow-2.webp",
    "/images/stories/snow-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان ملکه برفی
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره دوستی، امید و قدرت محبت
        </p>
      </div>

      <StoryImage src={images[0]} alt="ملکه برفی" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="قصر یخی ملکه برفی" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="گرِدا و کای" />

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