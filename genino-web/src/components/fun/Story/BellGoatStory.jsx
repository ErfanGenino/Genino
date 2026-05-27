export default function BellGoatStory() {
  const sections = [
    [
      "روزی روزگاری بزی کوچک و بازیگوش در روستایی سرسبز زندگی می‌کرد.",
      "او زنگوله کوچکی دور گردنش داشت.",
      "هر وقت راه می‌رفت، صدای زنگوله در دشت می‌پیچید.",
      "برای همین همه او را بز زنگوله‌پا صدا می‌کردند.",
      "بز کوچولو خیلی کنجکاو بود.",
      "او دوست داشت جاهای جدید را ببیند.",
      "مادرش همیشه به او می‌گفت:",
      "زیاد از خانه دور نشو.",
      "اما بز کوچولو گاهی حرف مادرش را فراموش می‌کرد.",
      "او بیشتر وقتش را در دشت بازی می‌کرد.",
    ],
    [
      "یک روز بز زنگوله‌پا پروانه‌ای زیبا دید.",
      "او دنبال پروانه دوید.",
      "کم‌کم از خانه خیلی دور شد.",
      "هوا آرام آرام تاریک می‌شد.",
      "بز کوچولو تازه فهمید راه خانه را گم کرده است.",
      "او ترسید و شروع به گریه کرد.",
      "صدای زنگوله‌اش در جنگل می‌پیچید.",
      "در همان نزدیکی، گرگی گرسنه صدای زنگوله را شنید.",
      "گرگ آرام به سمت صدا حرکت کرد.",
      "بز کوچولو از دیدن گرگ ترسید.",
    ],
    [
      "بز زنگوله‌پا سریع فرار کرد.",
      "او بین درخت‌ها می‌دوید.",
      "زنگوله گردنش مدام صدا می‌داد.",
      "گرگ پشت سر او می‌دوید.",
      "بز کوچولو ناگهان صدای مادرش را شنید.",
      "مادر بز همراه چوپان دنبالش آمده بودند.",
      "چوپان با دیدن گرگ فریاد زد.",
      "گرگ ترسید و فرار کرد.",
      "بز کوچولو نفس راحتی کشید.",
      "او خودش را در آغوش مادرش انداخت.",
    ],
    [
      "مادر بز خوشحال بود که فرزندش سالم است.",
      "بز زنگوله‌پا از اشتباهش خجالت کشید.",
      "او فهمید نباید بدون فکر از خانه دور شود.",
      "بز کوچولو از مادرش معذرت‌خواهی کرد.",
      "مادرش او را بخشید و نوازش کرد.",
      "از آن روز، بز زنگوله‌پا بااحتیاط‌تر شد.",
      "او هنوز بازی می‌کرد، اما مراقب بود.",
      "صدای زنگوله‌اش دوباره در دشت شنیده می‌شد.",
      "همه حیوانات از شادی او خوشحال بودند.",
      "و داستان بز زنگوله‌پا با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/goat-1.webp",
    "/images/stories/goat-2.webp",
    "/images/stories/goat-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان بز زنگوله‌پا
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره دقت، خانواده و مراقبت از خود
        </p>
      </div>

      <StoryImage src={images[0]} alt="بز زنگوله‌پا" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="گم شدن بز زنگوله‌پا" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="نجات بز زنگوله‌پا" />

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