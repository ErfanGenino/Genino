export default function HareTortoiseStory() {
  const sections = [
    [
      "روزی روزگاری یک خرگوش بسیار سریع در جنگل زندگی می‌کرد.",
      "او همیشه به سرعت خودش افتخار می‌کرد.",
      "خرگوش مدام حیوانات دیگر را مسخره می‌کرد.",
      "به‌خصوص لاک‌پشت آرام و صبور را.",
      "لاک‌پشت از حرف‌های خرگوش ناراحت نمی‌شد.",
      "او آرام و با لبخند راه می‌رفت.",
      "یک روز خرگوش با خنده گفت:",
      "تو هیچ‌وقت نمی‌توانی مثل من سریع باشی!",
      "لاک‌پشت آرام جواب داد:",
      "شاید، اما من هرگز تسلیم نمی‌شوم.",
    ],
    [
      "حیوانات جنگل تصمیم گرفتند مسابقه‌ای برگزار کنند.",
      "خرگوش و لاک‌پشت باید با هم مسابقه می‌دادند.",
      "همه حیوانات برای تماشای مسابقه جمع شدند.",
      "روباه مسیر مسابقه را مشخص کرد.",
      "با شروع مسابقه، خرگوش خیلی سریع دوید.",
      "او در چند لحظه از لاک‌پشت خیلی جلو افتاد.",
      "لاک‌پشت آرام و پیوسته حرکت می‌کرد.",
      "خرگوش پشت سرش را نگاه کرد و خندید.",
      "او فکر می‌کرد هرگز نمی‌بازد.",
      "برای همین تصمیم گرفت کمی استراحت کند.",
    ],
    [
      "خرگوش زیر درختی نرم دراز کشید.",
      "نسیم خنکی می‌وزید و او خوابش برد.",
      "در همین زمان، لاک‌پشت آرام جلو می‌رفت.",
      "او بدون توقف قدم برمی‌داشت.",
      "حیوانات جنگل او را تشویق می‌کردند.",
      "کم‌کم لاک‌پشت به خرگوش خوابیده رسید.",
      "او آرام از کنار خرگوش عبور کرد.",
      "خرگوش هنوز خواب بود.",
      "لاک‌پشت به مسیرش ادامه داد.",
      "او حالا به خط پایان نزدیک شده بود.",
    ],
    [
      "ناگهان خرگوش از خواب بیدار شد.",
      "او با تعجب دید لاک‌پشت جلوتر از اوست.",
      "خرگوش با تمام سرعت دوید.",
      "اما دیگر دیر شده بود.",
      "لاک‌پشت از خط پایان عبور کرد.",
      "همه حیوانات جنگل خوشحال شدند.",
      "خرگوش فهمید که غرور همیشه خوب نیست.",
      "او از لاک‌پشت عذرخواهی کرد.",
      "لاک‌پشت لبخند زد و او را بخشید.",
      "و همه فهمیدند تلاش مداوم از عجله مهم‌تر است.",
    ],
  ];

  const images = [
    "/images/stories/hare-1.webp",
    "/images/stories/hare-2.webp",
    "/images/stories/hare-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان خرگوش و لاک‌پشت
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره صبر، تلاش و دوری از غرور
        </p>
      </div>

      <StoryImage src={images[0]} alt="خرگوش و لاک‌پشت" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="مسابقه خرگوش و لاک‌پشت" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="برنده شدن لاک‌پشت" />

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