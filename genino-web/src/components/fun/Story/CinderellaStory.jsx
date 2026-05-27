export default function CinderellaStory() {
  const sections = [
    [
      "روزی روزگاری دختر مهربانی به نام سیندرلا زندگی می‌کرد.",
      "او پس از از دست دادن مادرش، با نامادری و دو خواهر ناتنی‌اش زندگی می‌کرد.",
      "نامادری با او رفتار خوبی نداشت.",
      "سیندرلا بیشتر وقتش را صرف تمیز کردن خانه می‌کرد.",
      "با این حال، او همیشه مهربان و خوش‌اخلاق بود.",
      "پرنده‌ها و حیوانات کوچک او را دوست داشتند.",
      "روزی خبر رسید که در قصر جشن بزرگی برگزار می‌شود.",
      "شاهزاده می‌خواست همسر آینده‌اش را انتخاب کند.",
      "همه دخترهای شهر برای رفتن به جشن آماده شدند.",
      "سیندرلا هم آرزو داشت در جشن شرکت کند.",
    ],
    [
      "نامادری اجازه نداد سیندرلا به جشن برود.",
      "او را تنها در خانه گذاشت.",
      "سیندرلا ناراحت شد و شروع به گریه کرد.",
      "ناگهان فرشته مهربانی ظاهر شد.",
      "فرشته با جادوی خود لباسی زیبا برای سیندرلا ساخت.",
      "کدو تنبل به کالسکه طلایی تبدیل شد.",
      "موش‌ها هم به اسب‌های کوچک تبدیل شدند.",
      "فرشته به سیندرلا گفت باید قبل از نیمه‌شب برگردد.",
      "زیرا بعد از آن، جادو از بین می‌رفت.",
      "سیندرلا با خوشحالی به سمت قصر رفت.",
    ],
    [
      "وقتی سیندرلا وارد جشن شد، همه شگفت‌زده شدند.",
      "شاهزاده از دیدن او بسیار خوشحال شد.",
      "آن دو با هم رقصیدند و صحبت کردند.",
      "سیندرلا احساس می‌کرد رویایی زیبا را زندگی می‌کند.",
      "اما ناگهان صدای ساعت قصر بلند شد.",
      "نیمه‌شب فرا رسیده بود.",
      "سیندرلا سریع از قصر خارج شد.",
      "در هنگام فرار، یکی از کفش‌های شیشه‌ای‌اش جا ماند.",
      "شاهزاده کفش را پیدا کرد.",
      "او تصمیم گرفت صاحب کفش را پیدا کند.",
    ],
    [
      "روز بعد شاهزاده در تمام شهر دنبال صاحب کفش گشت.",
      "دخترهای زیادی کفش را امتحان کردند.",
      "اما کفش برای هیچ‌کس اندازه نبود.",
      "تا اینکه شاهزاده به خانه سیندرلا رسید.",
      "نامادری سعی کرد سیندرلا را پنهان کند.",
      "اما شاهزاده او را دید.",
      "سیندرلا کفش را پوشید و کاملاً اندازه‌اش بود.",
      "شاهزاده فهمید که او همان دختر جشن است.",
      "سیندرلا و شاهزاده با خوشحالی کنار هم زندگی کردند.",
      "و داستان آن‌ها با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/cinderella-1.webp",
    "/images/stories/cinderella-2.webp",
    "/images/stories/cinderella-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان سیندرلا
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره امید، مهربانی و رویاها
        </p>
      </div>

      <StoryImage src={images[0]} alt="داستان سیندرلا" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="جشن سیندرلا" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="پایان داستان سیندرلا" />

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