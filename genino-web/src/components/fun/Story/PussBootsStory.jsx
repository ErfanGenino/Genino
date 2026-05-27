export default function PussBootsStory() {
  const sections = [
    [
      "روزی روزگاری آسیابانی پیر سه پسر داشت.",
      "بعد از مدتی، آسیابان از دنیا رفت.",
      "او دارایی‌هایش را بین پسرهایش تقسیم کرد.",
      "پسر بزرگ آسیاب را گرفت.",
      "پسر دوم الاغ را برداشت.",
      "اما به پسر کوچک فقط یک گربه رسید.",
      "پسر کوچک ناراحت شد.",
      "او فکر می‌کرد گربه به دردش نمی‌خورد.",
      "اما گربه بسیار باهوش بود.",
      "گربه گفت: اگر به من چکمه و کیسه بدهی، کمکت می‌کنم.",
    ],
    [
      "پسر جوان حرف گربه را باور کرد.",
      "او برای گربه چکمه خرید.",
      "گربه کیسه را برداشت و به جنگل رفت.",
      "او با حیله خرگوشی شکار کرد.",
      "سپس خرگوش را نزد پادشاه برد.",
      "گربه گفت این هدیه از طرف اربابش است.",
      "او نام اربابش را مارکی کاراباس گذاشته بود.",
      "پادشاه از هدیه خوشحال شد.",
      "گربه چند بار دیگر هم برای پادشاه هدیه برد.",
      "کم‌کم همه فکر کردند مارکی کاراباس مردی ثروتمند است.",
    ],
    [
      "یک روز پادشاه با کالسکه از کنار رودخانه عبور می‌کرد.",
      "گربه از قبل نقشه‌ای کشیده بود.",
      "او از اربابش خواست داخل رودخانه برود.",
      "وقتی کالسکه نزدیک شد، گربه فریاد زد:",
      "کمک! اربابم در خطر است!",
      "پادشاه سریع دستور کمک داد.",
      "سربازها به پسر جوان لباس‌های زیبا دادند.",
      "دختر پادشاه هم از دیدن او خوشحال شد.",
      "در همین زمان، گربه به قصر یک غول رفت.",
      "او با زیرکی غول را فریب داد.",
    ],
    [
      "گربه از غول خواست خودش را به موش تبدیل کند.",
      "وقتی غول تبدیل به موش شد، گربه او را گرفت.",
      "حالا قصر برای اربابش خالی شده بود.",
      "پادشاه وقتی قصر بزرگ را دید، شگفت‌زده شد.",
      "او فکر کرد پسر جوان صاحب قصر است.",
      "دختر پادشاه هم به او علاقه‌مند شد.",
      "بعد از مدتی، آن‌ها با هم ازدواج کردند.",
      "پسر جوان دیگر فقیر نبود.",
      "او فهمید داشتن دوستی باهوش و وفادار چقدر ارزشمند است.",
      "و داستان گربه چکمه‌پوش با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/cat-1.webp",
    "/images/stories/cat-2.webp",
    "/images/stories/cat-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان گربه چکمه‌پوش
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره هوش، وفاداری و امید
        </p>
      </div>

      <StoryImage src={images[0]} alt="گربه چکمه‌پوش" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="گربه و پادشاه" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="قصر گربه چکمه‌پوش" />

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