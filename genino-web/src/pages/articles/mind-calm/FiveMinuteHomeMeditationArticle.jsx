import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function FiveMinuteHomeMeditationArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          مدیتیشن کوتاه ۵ دقیقه‌ای در خانه
          <br />
          <span className="inline-block mt-5">
            آرامش واقعی، حتی وقتی زمان نداریم
          </span>
        </>
      }
      description="مدیتیشن ۵ دقیقه‌ای یکی از مؤثرترین و واقع‌بینانه‌ترین روش‌ها برای کاهش استرس و بازگرداندن آرامش ذهن در زندگی روزمره است. این مقاله به‌صورت علمی و ساده توضیح می‌دهد چرا تمرین‌های کوتاه مدیتیشن مؤثرند و چگونه می‌توان آن‌ها را به‌راحتی در خانه انجام داد."
      image="/images/articles/mind-calm/5-minute-meditation/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          آرامش ذهن به زمان زیاد نیاز ندارد
        </p>

        <p>
          یکی از بزرگ‌ترین باورهای اشتباه درباره مدیتیشن این است که
          «باید زمان زیادی داشته باشیم».
        </p>

        <p>
          واقعیت این است که ذهن برای آرام‌شدن،
          بیشتر از زمان، به <strong>تداوم و آگاهی</strong> نیاز دارد.
        </p>

        <p className="font-semibold text-yellow-700">
          ۵ دقیقه تمرین درست، بهتر از ۳۰ دقیقه تمرین ناپیوسته است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا مدیتیشن کوتاه هم مؤثر است؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/5-minute-meditation/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فعال‌سازی سیستم آرام‌سازی مغز</li>
          <li>کاهش فعالیت مرکز ترس (آمیگدالا)</li>
          <li>قطع چرخه افکار منفی</li>
          <li>ایجاد حس کنترل ذهنی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مغز به «شروع آرامش» واکنش نشان می‌دهد، نه به مدت طولانی تمرین.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🕰 بخش ۲ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) چه زمانی مدیتیشن ۵ دقیقه‌ای را انجام دهیم؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/5-minute-meditation/time" />

        <ul className="list-disc pr-6 space-y-3">
          <li>صبح، قبل از شروع روز</li>
          <li>بین کارها برای قطع استرس</li>
          <li>بعد از یک موقعیت تنش‌زا</li>
          <li>قبل از خواب</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بهترین زمان، زمانی است که واقعاً انجامش می‌دهیم.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧘 بخش ۳ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) مدیتیشن ۵ دقیقه‌ای قدم‌به‌قدم
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/5-minute-meditation/steps" />

        <ul className="list-disc pr-6 space-y-3">
          <li>نشستن راحت و صاف</li>
          <li>۳ نفس عمیق و آرام</li>
          <li>تمرکز روی دم و بازدم</li>
          <li>بازگشت آرام توجه هنگام حواس‌پرتی</li>
          <li>پایان با یک دم عمیق</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          حواس‌پرتی طبیعی است؛ بازگشت توجه، تمرین اصلی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🏠 بخش ۴ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) چگونه در خانه مدیتیشن را ساده کنیم؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/5-minute-meditation/home" />

        <ul className="list-disc pr-6 space-y-3">
          <li>انتخاب یک جای ثابت</li>
          <li>خاموش‌کردن نوتیفیکیشن‌ها</li>
          <li>استفاده از تایمر ساده</li>
          <li>انتظار نداشتن سکوت کامل</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مدیتیشن قرار نیست شرایط ایده‌آل داشته باشد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۵ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج در مدیتیشن کوتاه
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/5-minute-meditation/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>انتظار آرامش فوری</li>
          <li>قضاوت‌کردن خود</li>
          <li>قطع تمرین بعد از چند روز</li>
        </ul>

        <p className="font-semibold text-red-700">
          مدیتیشن مسابقه نیست؛ تمرین مداوم است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: ۵ دقیقه برای بازگشت به خود
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/5-minute-meditation/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>مدیتیشن کوتاه کاملاً مؤثر است</li>
          <li>تداوم مهم‌تر از زمان است</li>
          <li>خانه بهترین جای شروع است</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «۵ دقیقه آگاهی، می‌تواند مسیر کل روز را تغییر دهد.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 📚 منابع */}
      {/* ========================== */}

      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">
          منابع
        </p>
        <p>
          Harvard Medical School – Short Meditation Benefits  
          | American Psychological Association (APA)  
          | Mindful.org – Daily Meditation Practice
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
