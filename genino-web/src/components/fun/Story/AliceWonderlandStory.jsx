export default function AliceWonderlandStory() {
  const sections = [
    [
      "روزی روزگاری دختری کنجکاو به نام آلیس کنار خواهرش نشسته بود.",
      "او حوصله‌اش سر رفته بود.",
      "ناگهان خرگوش سفیدی را دید که جلیقه پوشیده بود.",
      "خرگوش با عجله می‌دوید و به ساعتش نگاه می‌کرد.",
      "آلیس با تعجب بلند شد و دنبال خرگوش رفت.",
      "خرگوش داخل سوراخی در زمین پرید.",
      "آلیس هم بدون فکر وارد سوراخ شد.",
      "او مدت زیادی سقوط کرد.",
      "سپس وارد دنیایی عجیب و شگفت‌انگیز شد.",
      "همه چیز در آنجا متفاوت بود.",
    ],
    [
      "آلیس موجودات عجیبی دید.",
      "او با گربه‌ای خندان روبه‌رو شد.",
      "گربه می‌توانست ناگهان ناپدید شود.",
      "آلیس با کلاه‌دوز دیوانه هم آشنا شد.",
      "آن‌ها مهمانی چای عجیبی داشتند.",
      "در آن سرزمین، بعضی غذاها باعث بزرگ شدن آلیس می‌شدند.",
      "بعضی نوشیدنی‌ها هم او را کوچک می‌کردند.",
      "آلیس مدام شگفت‌زده می‌شد.",
      "او سعی می‌کرد قوانین عجیب آن دنیا را بفهمد.",
      "اما هر لحظه اتفاق تازه‌ای می‌افتاد.",
    ],
    [
      "بعد از مدتی، آلیس به باغ بزرگی رسید.",
      "در آنجا ملکه‌ای خشمگین زندگی می‌کرد.",
      "ملکه همیشه فریاد می‌زد:",
      "سرش را بزنید!",
      "همه از او می‌ترسیدند.",
      "اما آلیس کم‌کم شجاع‌تر شد.",
      "او فهمید نباید از رفتارهای نادرست بترسد.",
      "آلیس با دقت به اطراف نگاه می‌کرد.",
      "او یاد گرفت در موقعیت‌های عجیب آرام بماند.",
      "سرزمین عجایب پر از درس‌های عجیب بود.",
    ],
    [
      "ناگهان همه چیز شروع به تغییر کرد.",
      "صداها دورتر شدند.",
      "آلیس چشم‌هایش را باز کرد.",
      "او دوباره کنار خواهرش بود.",
      "آلیس فهمید همه آن ماجراها یک رویای عجیب بوده است.",
      "اما آن سفر را هرگز فراموش نکرد.",
      "او یاد گرفته بود کنجکاوی می‌تواند انسان را به جاهای شگفت‌انگیز ببرد.",
      "آلیس دیگر از خیال‌پردازی نمی‌ترسید.",
      "او با لبخند به آسمان نگاه کرد.",
      "و داستان آلیس در سرزمین عجایب با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/alice-1.webp",
    "/images/stories/alice-2.webp",
    "/images/stories/alice-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان آلیس در سرزمین عجایب
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره کنجکاوی، خیال‌پردازی و شجاعت
        </p>
      </div>

      <StoryImage src={images[0]} alt="آلیس در سرزمین عجایب" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="خرگوش سفید و سرزمین عجایب" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="ملکه سرزمین عجایب" />

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