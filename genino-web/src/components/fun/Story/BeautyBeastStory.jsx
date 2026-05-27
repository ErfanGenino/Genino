export default function BeautyBeastStory() {
  const sections = [
    [
      "روزی روزگاری تاجری مهربان با سه دخترش زندگی می‌کرد.",
      "کوچک‌ترین دختر او بسیار مهربان و زیبا بود.",
      "همه او را دلبر صدا می‌کردند.",
      "دلبر برخلاف خواهرانش مغرور نبود.",
      "او عاشق کتاب خواندن و کمک به دیگران بود.",
      "یک روز پدر دلبر در سفر راهش را گم کرد.",
      "او به قصری بزرگ و عجیب رسید.",
      "قصر خالی به نظر می‌رسید، اما غذا و گرمای زیادی داشت.",
      "پدر دلبر برای تشکر یک شاخه گل رز از باغ قصر چید.",
      "ناگهان دیوی بزرگ و ترسناک ظاهر شد.",
    ],
    [
      "دیو از چیدن گل رز عصبانی شد.",
      "او گفت گل‌ها برایش بسیار ارزشمند هستند.",
      "پدر دلبر ترسید و ماجرا را توضیح داد.",
      "دیو گفت یا باید در قصر بماند، یا یکی از دخترانش به جای او بیاید.",
      "وقتی پدر به خانه برگشت، دلبر تصمیم گرفت به قصر برود.",
      "او نمی‌خواست پدرش آسیب ببیند.",
      "دلبر با شجاعت وارد قصر دیو شد.",
      "اما کم‌کم فهمید دیو آن‌قدرها هم بد نیست.",
      "دیو با وجود ظاهر ترسناکش قلب مهربانی داشت.",
      "او هر روز با احترام با دلبر رفتار می‌کرد.",
    ],
    [
      "دلبر کم‌کم به دیو عادت کرد.",
      "آن‌ها با هم صحبت می‌کردند و در باغ قدم می‌زدند.",
      "دلبر فهمید دیو بسیار تنهاست.",
      "یک روز دلبر خواست خانواده‌اش را ببیند.",
      "دیو با ناراحتی قبول کرد.",
      "او فقط از دلبر خواست برگردد.",
      "اما دلبر دیرتر از قولش برگشت.",
      "وقتی دوباره به قصر رسید، دیو بیمار و غمگین شده بود.",
      "دلبر فهمید که واقعاً دیو را دوست دارد.",
      "او با گریه گفت نمی‌خواهد دیو را از دست بدهد.",
    ],
    [
      "در همان لحظه، جادوی قصر شکسته شد.",
      "دیو کم‌کم تغییر کرد.",
      "او به شاهزاده‌ای مهربان تبدیل شد.",
      "جادویی قدیمی او را به دیو تبدیل کرده بود.",
      "فقط عشق واقعی می‌توانست طلسم را از بین ببرد.",
      "دلبر و شاهزاده بسیار خوشحال شدند.",
      "قصر دوباره پر از نور و شادی شد.",
      "خدمتکاران قصر هم از طلسم آزاد شدند.",
      "همه فهمیدند زیبایی واقعی در قلب انسان‌هاست.",
      "و داستان دیو و دلبر با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/beast-1.webp",
    "/images/stories/beast-2.webp",
    "/images/stories/beast-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان دیو و دلبر
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره مهربانی، عشق و زیبایی واقعی
        </p>
      </div>

      <StoryImage src={images[0]} alt="دیو و دلبر" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="قصر دیو" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="پایان داستان دیو و دلبر" />

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