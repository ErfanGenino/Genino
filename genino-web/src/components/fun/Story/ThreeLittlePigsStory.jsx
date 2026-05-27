export default function ThreeLittlePigsStory() {
  const sections = [
    [
      "روزی روزگاری سه خوک کوچولو با هم زندگی می‌کردند.",
      "آن‌ها تصمیم گرفتند هر کدام برای خودشان خانه‌ای بسازند.",
      "خوک اول عجله داشت و خانه‌اش را از کاه ساخت.",
      "او زود کارش تمام شد و شروع به بازی کرد.",
      "خوک دوم کمی بیشتر تلاش کرد.",
      "او خانه‌اش را از چوب ساخت.",
      "خوک سوم بسیار باحوصله و دقیق بود.",
      "او تصمیم گرفت خانه‌ای محکم از آجر بسازد.",
      "دو خوک اول به او خندیدند.",
      "اما خوک سوم می‌دانست که کار درست زمان می‌برد.",
    ],
    [
      "روزی گرگ بدجنس به خانه خوک اول رسید.",
      "گرگ گفت: در را باز کن!",
      "خوک اول ترسید و در را باز نکرد.",
      "گرگ با یک فوت قوی خانه کاهی را خراب کرد.",
      "خوک اول سریع فرار کرد.",
      "او به خانه چوبی خوک دوم رفت.",
      "گرگ پشت سر او آمد.",
      "گرگ دوباره با صدای بلند فریاد زد.",
      "او فوت کرد و فوت کرد.",
      "خانه چوبی هم خراب شد.",
    ],
    [
      "دو خوک با ترس به خانه آجری خوک سوم دویدند.",
      "خوک سوم آن‌ها را داخل خانه راه داد.",
      "گرگ به خانه آجری رسید.",
      "او با تمام قدرت فوت کرد.",
      "اما خانه آجری تکان نخورد.",
      "گرگ دوباره تلاش کرد.",
      "باز هم خانه خراب نشد.",
      "سه خوک کوچولو داخل خانه آرام‌تر شدند.",
      "آن‌ها فهمیدند که خانه محکم چقدر مهم است.",
      "گرگ عصبانی شد و به دنبال راه دیگری گشت.",
    ],
    [
      "گرگ تصمیم گرفت از دودکش وارد خانه شود.",
      "اما خوک سوم زرنگ بود.",
      "او یک دیگ آب داغ زیر دودکش گذاشت.",
      "گرگ از دودکش پایین آمد و ترسید.",
      "او سریع فرار کرد و دیگر برنگشت.",
      "سه خوک کوچولو خیلی خوشحال شدند.",
      "خوک‌های اول و دوم از خوک سوم تشکر کردند.",
      "آن‌ها فهمیدند عجله همیشه خوب نیست.",
      "از آن روز، هر سه با تلاش و دقت زندگی کردند.",
      "و داستان سه خوک کوچولو با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/pigs-1.webp",
    "/images/stories/pigs-2.webp",
    "/images/stories/pigs-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان سه خوک کوچولو
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره تلاش، دقت و ساختن آینده‌ای محکم
        </p>
      </div>

      <StoryImage src={images[0]} alt="سه خوک کوچولو" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="گرگ و خانه‌های کاهی و چوبی" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="خانه آجری سه خوک" />

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