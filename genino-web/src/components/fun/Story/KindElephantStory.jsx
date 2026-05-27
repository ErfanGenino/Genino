export default function KindElephantStory() {
  const sections = [
    [
      "روزی روزگاری فیلی بزرگ و مهربان در جنگلی سرسبز زندگی می‌کرد.",
      "او از همه حیوانات قوی‌تر بود.",
      "اما هیچ‌وقت از قدرتش برای اذیت کردن دیگران استفاده نمی‌کرد.",
      "فیل همیشه به حیوانات کوچک کمک می‌کرد.",
      "اگر شاخه‌ای روی راه می‌افتاد، آن را کنار می‌زد.",
      "اگر حیوانی تشنه بود، با خرطومش آب می‌آورد.",
      "همه حیوانات جنگل او را دوست داشتند.",
      "فقط چند حیوان بازیگوش او را مسخره می‌کردند.",
      "آن‌ها می‌گفتند فیل خیلی آرام و کند است.",
      "اما فیل فقط لبخند می‌زد.",
    ],
    [
      "یک روز آتش کوچکی در بخشی از جنگل شروع شد.",
      "باد شدید باعث شد آتش بزرگ‌تر شود.",
      "حیوانات با ترس فرار می‌کردند.",
      "بعضی حیوانات کوچک نمی‌توانستند سریع فرار کنند.",
      "فیل مهربان سریع به سمت رودخانه دوید.",
      "او با خرطومش آب برداشت.",
      "سپس آب را روی آتش ریخت.",
      "چند بار این کار را تکرار کرد.",
      "حیوانات دیگر هم به او کمک کردند.",
      "کم‌کم آتش خاموش شد.",
    ],
    [
      "بعد از خاموش شدن آتش، همه خوشحال شدند.",
      "حیوانات فهمیدند فیل چقدر شجاع و مهربان است.",
      "خرگوش کوچولو از او تشکر کرد.",
      "پرنده‌ها دور فیل پرواز می‌کردند.",
      "حتی حیواناتی که او را مسخره می‌کردند خجالت کشیدند.",
      "آن‌ها از فیل معذرت‌خواهی کردند.",
      "فیل با مهربانی آن‌ها را بخشید.",
      "او گفت کمک کردن از عصبانی شدن بهتر است.",
      "همه حیوانات از حرف او خوشحال شدند.",
      "جنگل دوباره آرام و زیبا شد.",
    ],
    [
      "از آن روز، حیوانات بیشتر مراقب جنگل بودند.",
      "آن‌ها فهمیدند مهربانی می‌تواند همه را نجات دهد.",
      "فیل مهربان همچنان به دیگران کمک می‌کرد.",
      "او هیچ‌وقت به خاطر قدرتش مغرور نشد.",
      "حیوانات کوچک همیشه کنار او احساس امنیت داشتند.",
      "همه حیوانات جنگل دوست خوبی برای هم شدند.",
      "فیل هر روز کنار رودخانه قدم می‌زد.",
      "صدای خنده حیوانات در جنگل شنیده می‌شد.",
      "همه یاد گرفته بودند که مهربانی بزرگ‌ترین قدرت است.",
      "و داستان فیل مهربان با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/elephant-1.webp",
    "/images/stories/elephant-2.webp",
    "/images/stories/elephant-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان فیل مهربان
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره مهربانی، کمک کردن و شجاعت
        </p>
      </div>

      <StoryImage src={images[0]} alt="فیل مهربان" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="کمک کردن فیل" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="دوستی حیوانات با فیل" />

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