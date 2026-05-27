export default function UglyDucklingStory() {
  const sections = [
    [
      "روزی روزگاری در کنار برکه‌ای آرام، اردکی روی تخم‌هایش نشسته بود.",
      "او منتظر بود جوجه‌هایش به دنیا بیایند.",
      "کم‌کم تخم‌ها شکستند و جوجه‌ها بیرون آمدند.",
      "همه جوجه‌ها کوچک و زرد و بامزه بودند.",
      "اما یکی از تخم‌ها دیرتر باز شد.",
      "جوجه‌ای بزرگ‌تر و متفاوت از داخل آن بیرون آمد.",
      "او خاکستری‌رنگ و عجیب به نظر می‌رسید.",
      "دیگر حیوانات به او خندیدند.",
      "آن‌ها او را جوجه اردک زشت صدا می‌کردند.",
      "جوجه کوچک از این حرف‌ها ناراحت می‌شد.",
    ],
    [
      "جوجه اردک زشت احساس تنهایی می‌کرد.",
      "او از مزرعه دور شد و به جاهای مختلف رفت.",
      "در راه، حیوانات زیادی او را مسخره کردند.",
      "زمستان سردی از راه رسید.",
      "جوجه اردک سختی زیادی کشید.",
      "او گاهی کنار برکه‌های یخ‌زده پناه می‌گرفت.",
      "با وجود همه سختی‌ها، تسلیم نشد.",
      "او آرزو داشت روزی جایی را پیدا کند که دوستش داشته باشند.",
      "کم‌کم فصل زمستان تمام شد.",
      "بهار زیبا از راه رسید.",
    ],
    [
      "یک روز جوجه اردک چند پرنده سفید و زیبا دید.",
      "آن‌ها با آرامش روی آب شنا می‌کردند.",
      "جوجه اردک به آن‌ها نزدیک شد.",
      "او فکر می‌کرد آن پرنده‌ها هم او را مسخره خواهند کرد.",
      "اما وقتی تصویر خودش را در آب دید، شگفت‌زده شد.",
      "او دیگر یک جوجه اردک نبود.",
      "او به یک قو زیبا تبدیل شده بود.",
      "پرهایش سفید و درخشان بودند.",
      "قوهای دیگر با مهربانی از او استقبال کردند.",
      "جوجه اردک بالاخره احساس خوشبختی کرد.",
    ],
    [
      "او فهمید متفاوت بودن چیز بدی نیست.",
      "گاهی زمان لازم است تا زیبایی واقعی دیده شود.",
      "قوی جوان دیگر غمگین نبود.",
      "او با آرامش کنار دوستان جدیدش زندگی می‌کرد.",
      "دیگر حیوانات هم از دیدن زیبایی او شگفت‌زده شدند.",
      "قوی جوان گذشته سختش را فراموش نکرد.",
      "برای همین همیشه با دیگران مهربان بود.",
      "او هیچ‌وقت کسی را مسخره نکرد.",
      "همه فهمیدند نباید دیگران را از روی ظاهر قضاوت کرد.",
      "و داستان جوجه اردک زشت با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/duckling-1.webp",
    "/images/stories/duckling-2.webp",
    "/images/stories/duckling-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان جوجه اردک زشت
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره امید، صبر و زیبایی واقعی
        </p>
      </div>

      <StoryImage src={images[0]} alt="جوجه اردک زشت" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="تنهایی جوجه اردک" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="تبدیل شدن به قو" />

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