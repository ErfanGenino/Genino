export default function GoldenFishStory() {
  const sections = [
    [
      "روزی روزگاری ماهیگیری فقیر کنار دریا زندگی می‌کرد.",
      "او با همسرش در کلبه‌ای کوچک و ساده زندگی داشت.",
      "ماهیگیر هر روز با قایقش به دریا می‌رفت.",
      "اما بیشتر روزها چیزی صید نمی‌کرد.",
      "یک روز تورش را به آب انداخت.",
      "وقتی تور را بالا کشید، ماهی کوچکی داخل آن بود.",
      "اما آن ماهی طلایی و درخشان بود.",
      "ناگهان ماهی با صدای آرامی صحبت کرد.",
      "ماهی گفت: اگر مرا آزاد کنی، آرزویت را برآورده می‌کنم.",
      "ماهیگیر مهربان دلش برای ماهی سوخت.",
    ],
    [
      "او بدون درخواست چیزی، ماهی را آزاد کرد.",
      "ماهی طلایی با خوشحالی به آب برگشت.",
      "ماهیگیر به خانه رفت و ماجرا را برای همسرش تعریف کرد.",
      "اما همسرش ناراحت شد.",
      "او گفت باید از ماهی چیزی می‌خواستی.",
      "زن از شوهرش خواست دوباره کنار دریا برود.",
      "ماهیگیر خجالت می‌کشید، اما رفت.",
      "او ماهی طلایی را صدا زد.",
      "ماهی دوباره از آب بیرون آمد.",
      "ماهیگیر درخواست یک خانه بهتر کرد.",
    ],
    [
      "ماهی طلایی آرزوی آن‌ها را برآورده کرد.",
      "اما همسر ماهیگیر باز هم راضی نبود.",
      "او هر بار آرزوی بزرگ‌تری می‌خواست.",
      "خانه بزرگ‌تر، لباس‌های گران‌قیمت و خدمتکاران.",
      "ماهیگیر ناراحت بود، اما دوباره به دریا می‌رفت.",
      "هر بار دریا طوفانی‌تر می‌شد.",
      "همسر ماهیگیر همچنان طمع بیشتری داشت.",
      "او حتی می‌خواست ملکه شود.",
      "ماهی طلایی باز هم خواسته‌اش را برآورده کرد.",
      "اما زن باز هم خوشحال نبود.",
    ],
    [
      "سرانجام زن گفت می‌خواهد فرمانروای دریا شود.",
      "ماهیگیر با ترس کنار دریا رفت.",
      "دریا بسیار تاریک و خشمگین شده بود.",
      "او درخواست همسرش را به ماهی گفت.",
      "ماهی طلایی چیزی نگفت و آرام به آب برگشت.",
      "ماهیگیر به خانه برگشت.",
      "اما دیگر خبری از قصر و ثروت نبود.",
      "آن‌ها دوباره در همان کلبه کوچک زندگی می‌کردند.",
      "زن فهمید طمع زیاد آرامش را از بین می‌برد.",
      "و داستان ماهیگیر و ماهی طلایی با درس بزرگی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/fish-1.webp",
    "/images/stories/fish-2.webp",
    "/images/stories/fish-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان ماهیگیر و ماهی طلایی
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره مهربانی، قناعت و دوری از طمع
        </p>
      </div>

      <StoryImage src={images[0]} alt="ماهیگیر و ماهی طلایی" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="آرزوی همسر ماهیگیر" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="پایان داستان ماهی طلایی" />

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