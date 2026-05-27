export default function FoxStorkStory() {
  const sections = [
    [
      "روزی روزگاری روباهی حیله‌گر در جنگل زندگی می‌کرد.",
      "او دوست داشت دیگران را مسخره کند.",
      "در همان جنگل، لک‌لکی مهربان و آرام هم زندگی می‌کرد.",
      "لک‌لک همیشه با احترام با دیگران رفتار می‌کرد.",
      "یک روز روباه تصمیم گرفت لک‌لک را به خانه‌اش دعوت کند.",
      "او گفت می‌خواهد برای دوستش غذا آماده کند.",
      "لک‌لک با خوشحالی دعوت روباه را قبول کرد.",
      "روباه سوپ خوشمزه‌ای درست کرد.",
      "اما سوپ را داخل بشقاب‌های خیلی کم‌عمق ریخت.",
      "روباه راحت سوپش را خورد.",
    ],
    [
      "اما لک‌لک نتوانست سوپ بخورد.",
      "نوک بلند او داخل بشقاب جا نمی‌شد.",
      "روباه با خنده به لک‌لک نگاه می‌کرد.",
      "لک‌لک ناراحت شد، اما چیزی نگفت.",
      "چند روز بعد، لک‌لک روباه را به خانه خودش دعوت کرد.",
      "روباه با خوشحالی به خانه لک‌لک رفت.",
      "لک‌لک هم سوپ خوشمزه‌ای آماده کرده بود.",
      "اما غذا را داخل ظرف‌های بلند و باریک ریخت.",
      "لک‌لک به‌راحتی با نوکش غذا می‌خورد.",
      "روباه هرچه تلاش کرد نتوانست غذا بخورد.",
    ],
    [
      "روباه خجالت کشید.",
      "او فهمید همان رفتاری که با لک‌لک کرده بود، حالا برای خودش اتفاق افتاده است.",
      "لک‌لک آرام به روباه نگاه کرد.",
      "او نمی‌خواست روباه را ناراحت کند.",
      "فقط می‌خواست درس مهمی به او بدهد.",
      "روباه سرش را پایین انداخت.",
      "او از لک‌لک عذرخواهی کرد.",
      "روباه فهمید مسخره کردن دیگران کار درستی نیست.",
      "لک‌لک هم او را بخشید.",
      "بعد از آن، آن دو دوستان بهتری شدند.",
    ],
    [
      "روباه یاد گرفت با دیگران محترمانه رفتار کند.",
      "او دیگر کسی را اذیت نمی‌کرد.",
      "حیوانات جنگل از تغییر رفتار روباه خوشحال شدند.",
      "لک‌لک هم از مهربانی روباه خوشحال بود.",
      "همه فهمیدند باید با دیگران همان‌طور رفتار کنیم که دوست داریم با ما رفتار شود.",
      "مهربانی و احترام دوستی‌ها را قوی‌تر می‌کنند.",
      "روباه دیگر حیله‌گری نمی‌کرد.",
      "او سعی می‌کرد دوست خوبی باشد.",
      "حیوانات جنگل در آرامش کنار هم زندگی کردند.",
      "و داستان روباه و لک‌لک با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/fox-1.webp",
    "/images/stories/fox-2.webp",
    "/images/stories/fox-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان روباه و لک‌لک
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره احترام، مهربانی و رفتار درست با دیگران
        </p>
      </div>

      <StoryImage src={images[0]} alt="روباه و لک‌لک" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="مهمانی روباه و لک‌لک" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="دوستی روباه و لک‌لک" />

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