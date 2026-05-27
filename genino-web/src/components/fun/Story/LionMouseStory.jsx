export default function LionMouseStory() {
  const sections = [
    [
      "روزی روزگاری شیری بزرگ و قدرتمند در جنگل زندگی می‌کرد.",
      "همه حیوانات از شیر می‌ترسیدند.",
      "او بیشتر وقت‌ها زیر درختی بزرگ استراحت می‌کرد.",
      "یک روز شیر بعد از شکار خوابیده بود.",
      "در همان زمان، یک موش کوچولو مشغول بازی بود.",
      "موش ناخواسته روی بدن شیر دوید.",
      "شیر ناگهان بیدار شد.",
      "او با پنجه بزرگش موش را گرفت.",
      "موش از ترس می‌لرزید.",
      "او با التماس گفت: لطفاً مرا ببخش!",
    ],
    [
      "موش کوچولو گفت:",
      "اگر من را آزاد کنی، شاید روزی کمکت کنم.",
      "شیر با شنیدن این حرف خندید.",
      "او فکر می‌کرد یک موش کوچک هرگز نمی‌تواند به او کمک کند.",
      "اما شیر دل مهربانی داشت.",
      "برای همین موش را آزاد کرد.",
      "موش با خوشحالی فرار کرد.",
      "چند روز بعد، شکارچی‌ها وارد جنگل شدند.",
      "آن‌ها توری بزرگ برای شکار شیر گذاشتند.",
      "شیر داخل تور گرفتار شد.",
    ],
    [
      "شیر با قدرت غرش کرد.",
      "او تلاش کرد از تور بیرون بیاید.",
      "اما هرچه بیشتر تکان می‌خورد، بیشتر گیر می‌افتاد.",
      "صدای غرش شیر به گوش موش رسید.",
      "موش سریع خودش را به شیر رساند.",
      "او دید شیر داخل تور گرفتار شده است.",
      "موش بدون ترس شروع به جویدن طناب‌ها کرد.",
      "او با دندان‌های کوچکش طناب‌ها را برید.",
      "کم‌کم تور پاره شد.",
      "شیر توانست آزاد شود.",
    ],
    [
      "شیر از موش تشکر کرد.",
      "او فهمید که حتی کوچک‌ترین موجودات هم ارزشمند هستند.",
      "موش لبخند زد و گفت:",
      "دیدی که من هم توانستم کمکت کنم!",
      "شیر از حرف قبلی خودش خجالت کشید.",
      "از آن روز، شیر و موش دوستان خوبی شدند.",
      "حیوانات جنگل از دوستی آن‌ها خوشحال بودند.",
      "همه فهمیدند نباید دیگران را دست‌کم گرفت.",
      "گاهی کوچک‌ترین دوستان، بزرگ‌ترین کمک‌ها را می‌کنند.",
      "و داستان شیر و موش با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/lion-1.webp",
    "/images/stories/lion-2.webp",
    "/images/stories/lion-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان شیر و موش
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره مهربانی، دوستی و کمک کردن
        </p>
      </div>

      <StoryImage src={images[0]} alt="شیر و موش" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="گرفتار شدن شیر" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="نجات شیر توسط موش" />

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