export default function PeterPanStory() {
  const sections = [
    [
      "روزی روزگاری پسری به نام پیتر پن در سرزمین جادویی نورلند زندگی می‌کرد.",
      "پیتر پن هیچ‌وقت بزرگ نمی‌شد.",
      "او عاشق ماجراجویی و پرواز در آسمان بود.",
      "دوست کوچکش تینکربل همیشه کنار او بود.",
      "یک شب پیتر پن به خانه دختری به نام وندی رفت.",
      "وندی برای برادرهایش داستان تعریف می‌کرد.",
      "پیتر از داستان‌های او خوشش آمد.",
      "او از وندی خواست همراهش به نورلند بیاید.",
      "تینکربل گرد جادویی روی آن‌ها پاشید.",
      "همه با هم در آسمان پرواز کردند.",
    ],
    [
      "نورلند پر از شگفتی و ماجراجویی بود.",
      "پسرهای گمشده در آنجا زندگی می‌کردند.",
      "پیتر پن رهبر آن‌ها بود.",
      "اما در همان سرزمین، دزد دریایی خطرناکی به نام کاپیتان هوک هم زندگی می‌کرد.",
      "کاپیتان هوک دشمن پیتر پن بود.",
      "او همیشه نقشه می‌کشید پیتر را شکست دهد.",
      "وندی و برادرهایش از دیدن نورلند هیجان‌زده بودند.",
      "آن‌ها با پری‌ها و موجودات عجیب آشنا شدند.",
      "اما ماجراجویی‌های نورلند همیشه امن نبود.",
      "گاهی خطرهای بزرگی آن‌ها را تهدید می‌کرد.",
    ],
    [
      "یک روز کاپیتان هوک و دوستانش به پیتر حمله کردند.",
      "پیتر پن شجاعانه با او مبارزه کرد.",
      "دوستان پیتر هم به او کمک کردند.",
      "وندی فهمید که شجاعت فقط جنگیدن نیست.",
      "گاهی مراقبت از دوستان هم شجاعت است.",
      "بعد از ماجراهای زیاد، کاپیتان هوک شکست خورد.",
      "پیتر و دوستانش خوشحال شدند.",
      "اما وندی کم‌کم دلش برای خانه تنگ شد.",
      "او فهمید خانواده چقدر مهم هستند.",
      "پیتر هم حرف‌های وندی را خوب گوش داد.",
    ],
    [
      "سرانجام وندی و برادرهایش به خانه برگشتند.",
      "آن‌ها هیچ‌وقت سفر به نورلند را فراموش نکردند.",
      "پیتر پن دوباره در آسمان پرواز کرد.",
      "او همچنان عاشق آزادی و ماجراجویی بود.",
      "وندی یاد گرفته بود خیال‌پردازی چیز زیبایی است.",
      "اما خانواده و محبت هم بسیار ارزشمند هستند.",
      "پیتر گاهی از دور به خانه وندی سر می‌زد.",
      "دوستانش همیشه منتظر ماجراجویی بعدی بودند.",
      "ستاره‌های نورلند هنوز در آسمان می‌درخشیدند.",
      "و داستان پیتر پن با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/peter-1.webp",
    "/images/stories/peter-2.webp",
    "/images/stories/peter-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان پیتر پن
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره خیال‌پردازی، شجاعت و دوستی
        </p>
      </div>

      <StoryImage src={images[0]} alt="پیتر پن و نورلند" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="پیتر پن و کاپیتان هوک" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="ماجراجویی‌های پیتر پن" />

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