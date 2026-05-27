export default function AladdinStory() {
  const sections = [
    [
      "روزی روزگاری پسری فقیر به نام علاءالدین در شهری بزرگ زندگی می‌کرد.",
      "او همراه مادرش زندگی ساده‌ای داشت.",
      "علاءالدین گاهی بازیگوش و بی‌احتیاط بود.",
      "یک روز جادوگری حیله‌گر به شهر آمد.",
      "او وانمود کرد عموی علاءالدین است.",
      "جادوگر به علاءالدین قول ثروت و طلا داد.",
      "سپس او را به بیرون شهر برد.",
      "آنجا غاری مخفی و عجیب وجود داشت.",
      "جادوگر از علاءالدین خواست وارد غار شود.",
      "علاءالدین با ترس وارد غار تاریک شد.",
    ],
    [
      "داخل غار، چراغی قدیمی روی زمین بود.",
      "جادوگر گفت فقط همان چراغ را بیاور.",
      "علاءالدین چراغ را برداشت.",
      "اما وقتی خواست بیرون بیاید، جادوگر چراغ را خواست.",
      "علاءالدین ترسید و چراغ را نداد.",
      "جادوگر خشمگین شد و در غار را بست.",
      "علاءالدین در تاریکی گیر افتاد.",
      "او ناامید شده بود.",
      "ناگهان دستش به چراغ کشیده شد.",
      "در همان لحظه، غولی بزرگ ظاهر شد.",
    ],
    [
      "غول گفت: من فرمان‌بردار صاحب چراغ هستم.",
      "علاءالدین با تعجب از غول کمک خواست.",
      "غول او را از غار بیرون آورد.",
      "بعد از آن، زندگی علاءالدین تغییر کرد.",
      "غول برای او غذا، لباس و خانه زیبا آورد.",
      "علاءالدین کم‌کم ثروتمند شد.",
      "او با دختر پادشاه آشنا شد.",
      "آن دو به هم علاقه پیدا کردند.",
      "اما جادوگر دوباره بازگشت.",
      "او می‌خواست چراغ جادویی را پس بگیرد.",
    ],
    [
      "جادوگر با حیله چراغ را دزدید.",
      "غول مجبور شد از جادوگر فرمان ببرد.",
      "علاءالدین ناراحت شد اما تسلیم نشد.",
      "او با شجاعت نقشه‌ای کشید.",
      "علاءالدین توانست چراغ را دوباره به دست آورد.",
      "غول دوباره به او کمک کرد.",
      "جادوگر شکست خورد و فرار کرد.",
      "علاءالدین و دختر پادشاه خوشحال شدند.",
      "آن‌ها زندگی آرام و شادی کنار هم داشتند.",
      "و داستان علاءالدین و چراغ جادو با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/aladdin-1.webp",
    "/images/stories/aladdin-2.webp",
    "/images/stories/aladdin-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان علاءالدین و چراغ جادو
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره شجاعت، امید و جادوی مهربانی
        </p>
      </div>

      <StoryImage src={images[0]} alt="علاءالدین و چراغ جادو" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="غول چراغ جادو" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="پایان داستان علاءالدین" />

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