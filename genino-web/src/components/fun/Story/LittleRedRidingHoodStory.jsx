export default function LittleRedRidingHoodStory() {
  const sections = [
    [
      "روزی روزگاری دختر کوچکی بود که شنل قرمز زیبایی می‌پوشید.",
      "همه او را شنل قرمزی صدا می‌کردند.",
      "او با مادرش در نزدیکی جنگل زندگی می‌کرد.",
      "یک روز مادربزرگ شنل قرمزی بیمار شد.",
      "مادرش سبدی از غذا و سوپ آماده کرد.",
      "او از شنل قرمزی خواست سبد را برای مادربزرگ ببرد.",
      "مادر گفت باید مستقیم به خانه مادربزرگ برود.",
      "و با غریبه‌ها صحبت نکند.",
      "شنل قرمزی قول داد مراقب باشد.",
      "سپس با خوشحالی وارد جنگل شد.",
    ],
    [
      "در میان راه، گرگی حیله‌گر شنل قرمزی را دید.",
      "گرگ آرام به او نزدیک شد.",
      "او با مهربانی ساختگی با شنل قرمزی صحبت کرد.",
      "شنل قرمزی فراموش کرد حرف مادرش را.",
      "او به گرگ گفت که به خانه مادربزرگ می‌رود.",
      "گرگ آدرس خانه را فهمید.",
      "سپس پیشنهاد داد شنل قرمزی گل جمع کند.",
      "شنل قرمزی سرگرم چیدن گل‌ها شد.",
      "در همین زمان، گرگ سریع به خانه مادربزرگ رفت.",
      "او قبل از شنل قرمزی به آنجا رسید.",
    ],
    [
      "گرگ وارد خانه مادربزرگ شد.",
      "سپس لباس مادربزرگ را پوشید و داخل تخت خوابید.",
      "کمی بعد شنل قرمزی به خانه رسید.",
      "او احساس کرد چیزی عجیب است.",
      "شنل قرمزی پرسید:",
      "مادربزرگ، چرا گوش‌هایت اینقدر بزرگ است؟",
      "گرگ گفت: برای اینکه بهتر بشنوم!",
      "شنل قرمزی دوباره پرسید:",
      "چرا دندان‌هایت اینقدر بزرگ است؟",
      "گرگ ناگهان از تخت بیرون پرید.",
    ],
    [
      "شنل قرمزی ترسید و فریاد زد.",
      "صدای او به گوش هیزم‌شکنی مهربان رسید.",
      "هیزم‌شکن سریع وارد خانه شد.",
      "او گرگ را فراری داد.",
      "مادربزرگ و شنل قرمزی نجات پیدا کردند.",
      "شنل قرمزی از اشتباهش ناراحت شد.",
      "او فهمید نباید با غریبه‌ها صحبت کند.",
      "مادربزرگ او را در آغوش گرفت.",
      "از آن روز، شنل قرمزی همیشه با دقت و احتیاط رفتار می‌کرد.",
      "و داستان شنل قرمزی با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/red-1.webp",
    "/images/stories/red-2.webp",
    "/images/stories/red-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان شنل قرمزی
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره دقت، شجاعت و گوش دادن به توصیه‌های خوب
        </p>
      </div>

      <StoryImage src={images[0]} alt="شنل قرمزی" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="گرگ و شنل قرمزی" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="نجات شنل قرمزی" />

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