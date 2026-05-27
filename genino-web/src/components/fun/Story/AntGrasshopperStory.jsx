export default function AntGrasshopperStory() {
  const sections = [
    [
      "روزی روزگاری مورچه‌ای سخت‌کوش در مزرعه‌ای زندگی می‌کرد.",
      "او هر روز از صبح تا شب کار می‌کرد.",
      "مورچه دانه‌های کوچک را جمع می‌کرد.",
      "او می‌دانست زمستان سرد از راه می‌رسد.",
      "در همان نزدیکی، ملخی خوشحال زندگی می‌کرد.",
      "ملخ بیشتر وقتش را آواز می‌خواند و بازی می‌کرد.",
      "او به مورچه خندید و گفت:",
      "چرا اینقدر کار می‌کنی؟",
      "مورچه آرام جواب داد:",
      "من برای روزهای سرد آماده می‌شوم.",
    ],
    [
      "اما ملخ حرف مورچه را جدی نگرفت.",
      "او همچنان تمام روز بازی می‌کرد.",
      "تابستان گرم و زیبا کم‌کم تمام شد.",
      "برگ‌های درختان زرد شدند.",
      "باد سرد پاییزی شروع به وزیدن کرد.",
      "مورچه همچنان مشغول جمع‌آوری غذا بود.",
      "خانه کوچک او کم‌کم پر از دانه شد.",
      "ملخ هنوز فکر می‌کرد زمستان دور است.",
      "او به آواز خواندن ادامه داد.",
      "و اصلاً نگران آینده نبود.",
    ],
    [
      "چند هفته بعد، زمستان سرد از راه رسید.",
      "برف همه جا را سفید کرد.",
      "دیگر غذایی در مزرعه پیدا نمی‌شد.",
      "ملخ گرسنه و خسته شد.",
      "او جایی برای غذا نداشت.",
      "ملخ با ناراحتی به خانه مورچه رفت.",
      "مورچه داخل خانه گرمش نشسته بود.",
      "غذا و دانه کافی برای زمستان داشت.",
      "ملخ از مورچه کمک خواست.",
      "او فهمیده بود که اشتباه کرده است.",
    ],
    [
      "مورچه به ملخ کمی غذا داد.",
      "اما به او گفت باید از این ماجرا درس بگیرد.",
      "ملخ از مورچه تشکر کرد.",
      "او فهمید که تنبلی همیشه نتیجه خوبی ندارد.",
      "از آن روز، ملخ تصمیم گرفت مسئولیت‌پذیرتر باشد.",
      "او یاد گرفت برای آینده آماده شود.",
      "مورچه هم خوشحال بود که دوستش درس مهمی یاد گرفته است.",
      "حیوانات مزرعه از همکاری آن‌ها خوشحال شدند.",
      "همه فهمیدند تلاش و برنامه‌ریزی بسیار مهم هستند.",
      "و داستان مورچه و ملخ با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/ant-1.webp",
    "/images/stories/ant-2.webp",
    "/images/stories/ant-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان مورچه و ملخ
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره تلاش، آینده‌نگری و مسئولیت‌پذیری
        </p>
      </div>

      <StoryImage src={images[0]} alt="مورچه و ملخ" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="کار کردن مورچه" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="زمستان و ملخ" />

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