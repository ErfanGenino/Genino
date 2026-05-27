export default function AliBabaStory() {
  const sections = [
    [
      "روزی روزگاری مردی فقیر به نام علی‌بابا در شهری دور زندگی می‌کرد.",
      "او هیزم جمع می‌کرد و با فروش آن زندگی ساده‌ای داشت.",
      "برادرش قاسم ثروتمند بود، اما با علی‌بابا مهربان نبود.",
      "یک روز علی‌بابا برای جمع کردن هیزم به جنگل رفت.",
      "ناگهان صدای اسب‌ها را شنید.",
      "او سریع پشت درختی پنهان شد.",
      "چهل دزد سوار بر اسب به نزدیکی غاری رسیدند.",
      "رئیس دزدها جلو رفت و گفت:",
      "کنجد باز شو!",
      "در سنگی غار آرام باز شد.",
    ],
    [
      "دزدها وارد غار شدند.",
      "بعد از مدتی، آن‌ها بیرون آمدند و رفتند.",
      "علی‌بابا با تعجب جلو رفت.",
      "او همان جمله را تکرار کرد:",
      "کنجد باز شو!",
      "در غار باز شد.",
      "داخل غار پر از طلا، جواهر و گنج بود.",
      "علی‌بابا فقط مقدار کمی طلا برداشت.",
      "او نمی‌خواست طمع کند.",
      "سپس به خانه برگشت و ماجرا را برای همسرش تعریف کرد.",
      "اما راز غار کم‌کم فاش شد.",
    ],
    [
      "قاسم هم به غار رفت تا گنج بیشتری بردارد.",
      "اما او جمله خروج را فراموش کرد.",
      "دزدها او را پیدا کردند.",
      "بعد از آن، دزدها فهمیدند شخص دیگری راز غار را می‌داند.",
      "آن‌ها تصمیم گرفتند علی‌بابا را پیدا کنند.",
      "اما خدمتکار باهوش علی‌بابا به نام مرجانه متوجه خطر شد.",
      "او بسیار زیرک و شجاع بود.",
      "مرجانه نقشه دزدها را فهمید.",
      "او با هوش خود از علی‌بابا محافظت کرد.",
      "دزدها نتوانستند به هدفشان برسند.",
    ],
    [
      "رئیس دزدها از مرجانه شکست خورد.",
      "علی‌بابا از شجاعت او بسیار خوشحال شد.",
      "مرجانه جان خانواده را نجات داده بود.",
      "علی‌بابا فهمید که هوش و مهربانی از طلا ارزشمندتر هستند.",
      "او از ثروتش برای زندگی آرام استفاده کرد.",
      "علی‌بابا دیگر طمع نکرد.",
      "مرجانه هم همیشه مورد احترام خانواده بود.",
      "مردم شهر داستان شجاعت او را تعریف می‌کردند.",
      "همه فهمیدند طمع زیاد دردسر می‌آورد.",
      "و داستان علی‌بابا و چهل دزد با شادی پایان یافت.",
    ],
  ];

  const images = [
    "/images/stories/alibaba-1.webp",
    "/images/stories/alibaba-2.webp",
    "/images/stories/alibaba-3.webp",
  ];

  return (
    <article dir="rtl" className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-700">
          خلاصه داستان علی‌بابا و چهل دزد
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          داستانی درباره شجاعت، هوش و دوری از طمع
        </p>
      </div>

      <StoryImage src={images[0]} alt="علی‌بابا و غار گنج" />

      <StorySection lines={sections[0]} />

      <StoryImage src={images[1]} alt="غار چهل دزد" />

      <StorySection lines={sections[1]} />

      <StoryImage src={images[2]} alt="مرجانه و دزدها" />

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