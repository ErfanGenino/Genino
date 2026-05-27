export default function SleepingBeautyStory() {
  const sections = [
    [
      "روزی روزگاری پادشاه و ملکه‌ای صاحب دختری زیبا شدند.",
      "آن‌ها نام دخترشان را آرورا گذاشتند.",
      "در قصر جشن بزرگی برگزار شد.",
      "پری‌های مهربان برای آرورا آرزوهای خوب کردند.",
      "اما یک پری خشمگین به جشن دعوت نشده بود.",
      "او با عصبانیت وارد قصر شد.",
      "پری نفرین کرد که آرورا در نوجوانی دستش به دوک نخ‌ریسی بخورد.",
      "و به خوابی عمیق فرو برود.",
      "همه مردم قصر ترسیدند.",
      "اما یکی از پری‌ها تلاش کرد نفرین را کم‌تر کند.",
    ],
    [
      "پری مهربان گفت آرورا نخواهد مرد.",
      "او فقط به خواب عمیقی فرو می‌رود.",
      "و روزی با عشق واقعی بیدار خواهد شد.",
      "پادشاه دستور داد همه دوک‌های نخ‌ریسی را از قصر جمع کنند.",
      "سال‌ها گذشت و آرورا بزرگ‌تر شد.",
      "او دختری مهربان و آرام بود.",
      "یک روز آرورا به اتاقی قدیمی در برج قصر رفت.",
      "در آنجا پیرزنی را دید که نخ می‌ریسید.",
      "آرورا با کنجکاوی به دوک دست زد.",
      "و همان لحظه نفرین آغاز شد.",
    ],
    [
      "آرورا آرام روی زمین افتاد و خوابش برد.",
      "پری‌های مهربان برای محافظت از او جادو کردند.",
      "همه مردم قصر هم به خواب رفتند.",
      "سال‌ها گذشت و جنگلی بزرگ دور قصر رشد کرد.",
      "هیچ‌کس نمی‌توانست وارد قصر شود.",
      "تا اینکه روزی شاهزاده‌ای شجاع داستان آرورا را شنید.",
      "او تصمیم گرفت آرورا را پیدا کند.",
      "شاهزاده از جنگل تاریک عبور کرد.",
      "سرانجام به قصر خوابیده رسید.",
      "او آرورا را در اتاقی آرام پیدا کرد.",
    ],
    [
      "شاهزاده با مهربانی آرورا را بوسید.",
      "جادوی خواب شکسته شد.",
      "آرورا چشم‌هایش را باز کرد.",
      "مردم قصر هم از خواب بیدار شدند.",
      "قصر دوباره پر از نور و شادی شد.",
      "پادشاه و ملکه بسیار خوشحال بودند.",
      "آرورا و شاهزاده کم‌کم به هم علاقه‌مند شدند.",
      "همه مردم جشن بزرگی گرفتند.",
      "آن‌ها فهمیدند امید و عشق می‌تواند تاریکی را از بین ببرد.",
      "و داستان زیبای خفته با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/sleep-1.webp",
    "/images/stories/sleep-2.webp",
    "/images/stories/sleep-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان زیبای خفته
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره امید، عشق و جادوی مهربانی
        </p>
      </div>

      <StoryImage src={images[0]} alt="زیبای خفته" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="نفرین زیبای خفته" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="بیدار شدن آرورا" />

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