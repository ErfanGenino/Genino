import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function MindfulnessInDailyLifeArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          ذهن‌آگاهی (Mindfulness) در زندگی روزمره
          <br />
          <span className="inline-block mt-5">
            چگونه با حضور در لحظه، کیفیت زندگی را بالا ببریم
          </span>
        </>
      }
      description="ذهن‌آگاهی یا Mindfulness یک مهارت علمی و قابل یادگیری است که به ما کمک می‌کند در لحظه حال زندگی کنیم، استرس را کاهش دهیم و واکنش‌های آگاهانه‌تری داشته باشیم. این مقاله به‌زبان ساده توضیح می‌دهد ذهن‌آگاهی چیست و چگونه می‌توان آن را در زندگی روزمره به‌کار گرفت."
      image="/images/articles/mind-calm/mindfulness-daily-life/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          زندگی در لحظه، مهارتی فراموش‌شده
        </p>

        <p>
          بسیاری از ما یا درگیر گذشته‌ایم یا نگران آینده؛  
          و بخش زیادی از زندگی، بدون حضور واقعی ما می‌گذرد.
        </p>

        <p>
          ذهن‌آگاهی یعنی <strong>بازگرداندن توجه به لحظه حال</strong>،
          بدون قضاوت و بدون تلاش برای تغییر فوری آنچه هست.
        </p>

        <p className="font-semibold text-yellow-700">
          Mindfulness یعنی آگاهانه زندگی کردن، نه بی‌فکر زندگی کردن.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) ذهن‌آگاهی دقیقاً چیست؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mindfulness-daily-life/definition" />

        <ul className="list-disc pr-6 space-y-3">
          <li>توجه آگاهانه به تجربه اکنون</li>
          <li>مشاهده افکار و احساسات بدون قضاوت</li>
          <li>پذیرش واقعیت همان‌طور که هست</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          ذهن‌آگاهی تمرین حضور است، نه حذف افکار.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧬 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) اثر ذهن‌آگاهی بر مغز و استرس
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mindfulness-daily-life/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش فعالیت مرکز ترس مغز</li>
          <li>بهبود تنظیم هیجانات</li>
          <li>افزایش تمرکز و وضوح ذهنی</li>
          <li>کاهش واکنش‌های خودکار</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مغز با تمرین ذهن‌آگاهی، آرام‌تر و منعطف‌تر می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚶 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) ذهن‌آگاهی در کارهای روزمره
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mindfulness-daily-life/daily" />

        <ul className="list-disc pr-6 space-y-3">
          <li>آگاهانه غذا خوردن</li>
          <li>توجه به تنفس هنگام راه رفتن</li>
          <li>گوش‌دادن کامل در گفت‌وگوها</li>
          <li>انجام یک کار در یک زمان</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          ذهن‌آگاهی از دل زندگی روزمره شروع می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) تمرین‌های کوتاه ذهن‌آگاهی
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mindfulness-daily-life/practice" />

        <ul className="list-disc pr-6 space-y-3">
          <li>۳ نفس آگاهانه قبل از واکنش</li>
          <li>اسکن بدن ۱ دقیقه‌ای</li>
          <li>توقف کوتاه بین کارها</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          حتی مکث‌های کوتاه هم ذهن را بازتنظیم می‌کنند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚫 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) برداشت‌های اشتباه درباره Mindfulness
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mindfulness-daily-life/myths" />

        <ul className="list-disc pr-6 space-y-3">
          <li>ذهن‌آگاهی یعنی خالی‌کردن ذهن</li>
          <li>فقط مخصوص مدیتیشن است</li>
          <li>نیاز به زمان زیاد دارد</li>
        </ul>

        <p className="font-semibold text-red-700">
          ذهن‌آگاهی ساده‌تر و کاربردی‌تر از تصورات رایج است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: زندگی با حضور آگاهانه
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mindfulness-daily-life/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>ذهن‌آگاهی مهارتی تمرینی است</li>
          <li>در دل زندگی روزمره اتفاق می‌افتد</li>
          <li>کیفیت زندگی را عمیق‌تر می‌کند</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «وقتی در لحظه حاضر باشی، زندگی هم حاضر می‌شود.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">
          منابع
        </p>
        <p>
          Harvard Medical School – Mindfulness Research  
          | American Psychological Association (APA)  
          | Mindful.org – Everyday Mindfulness
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
