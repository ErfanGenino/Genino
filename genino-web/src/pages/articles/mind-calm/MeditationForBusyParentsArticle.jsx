import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function MeditationForBusyParentsArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          مدیتیشن برای والدین پرمشغله
          <br />
          <span className="inline-block mt-5">
            آرامش ذهن حتی وقتی وقت نداریم
          </span>
        </>
      }
      description="والدین پرمشغله بیش از هر گروه دیگری به آرامش ذهن نیاز دارند، اما معمولاً کمترین زمان را برای خود دارند. این مقاله به‌صورت علمی و ساده توضیح می‌دهد چگونه مدیتیشن‌های کوتاه و واقع‌بینانه می‌توانند به والدین کمک کنند استرس را کاهش دهند و با ذهنی آرام‌تر با چالش‌های روزمره روبه‌رو شوند."
      image="/images/articles/mind-calm/meditation-for-busy-parents/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          وقتی والد آرام‌تر است، خانواده امن‌تر است
        </p>

        <p>
          والد بودن یعنی مسئولیت دائمی، تصمیم‌های پی‌درپی و
          نگرانی همیشگی برای آینده فرزند.
        </p>

        <p>
          بسیاری از والدین فکر می‌کنند مدیتیشن نیاز به زمان زیاد دارد؛  
          در حالی‌که واقعیت دقیقاً برعکس است.
        </p>

        <p className="font-semibold text-yellow-700">
          مدیتیشن برای والدین یعنی «تنظیم ذهن»، نه اضافه‌کردن یک کار جدید.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا والدین بیشتر در معرض استرس‌اند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/meditation-for-busy-parents/stress" />

        <ul className="list-disc pr-6 space-y-3">
          <li>مسئولیت دائمی بدون زمان استراحت</li>
          <li>کم‌خوابی و خستگی مزمن</li>
          <li>نگرانی مداوم درباره سلامت و آینده کودک</li>
          <li>تداخل نقش‌ها (والد، همسر، شاغل)</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          استرس والدین به‌طور مستقیم به کودک منتقل می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧬 بخش ۲ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) مدیتیشن چگونه به والدین کمک می‌کند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/meditation-for-busy-parents/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش واکنش‌های عصبی و خشم ناگهانی</li>
          <li>افزایش صبر و تحمل در موقعیت‌های چالش‌برانگیز</li>
          <li>بهبود تمرکز و تصمیم‌گیری</li>
          <li>تنظیم هیجانات در تعامل با کودک</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مدیتیشن یعنی پاسخ آگاهانه، نه واکنش لحظه‌ای.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* ⏱ بخش ۳ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) مدیتیشن‌های کوتاه مخصوص والدین پرمشغله
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/meditation-for-busy-parents/short" />

        <ul className="list-disc pr-6 space-y-3">
          <li>۳ نفس آگاهانه قبل از واکنش</li>
          <li>۱ دقیقه تمرکز روی تنفس هنگام بیدار شدن</li>
          <li>اسکن بدن ۲ دقیقه‌ای قبل از خواب</li>
          <li>مدیتیشن هنگام راه رفتن یا کارهای روزمره</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          حتی یک دقیقه آگاهی می‌تواند مسیر روز را تغییر دهد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🏠 بخش ۴ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) چگونه مدیتیشن را وارد زندگی خانوادگی کنیم؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/meditation-for-busy-parents/family" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تمرین تنفس کوتاه همراه کودک</li>
          <li>الگو بودن به‌جای آموزش مستقیم</li>
          <li>ساختن روتین‌های ساده و انعطاف‌پذیر</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          کودکان آرامش را از رفتار والد یاد می‌گیرند، نه از حرف.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۵ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج والدین در مدیتیشن
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/meditation-for-busy-parents/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>انتظار آرامش کامل و فوری</li>
          <li>مقایسه خود با دیگران</li>
          <li>کنار گذاشتن تمرین به‌دلیل شلوغی</li>
        </ul>

        <p className="font-semibold text-red-700">
          مدیتیشن کامل وجود ندارد؛ فقط تمرین مداوم وجود دارد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: والد آرام، خانواده سالم
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/meditation-for-busy-parents/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>مدیتیشن نیاز به زمان زیاد ندارد</li>
          <li>تمرین کوتاه اما پیوسته مؤثر است</li>
          <li>آرامش والد، امنیت کودک را تقویت می‌کند</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «وقتی والد مکث می‌کند، کودک احساس امنیت می‌کند.»
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
          American Psychological Association (APA) – Parenting & Stress  
          | Harvard Medical School – Mindfulness for Parents  
          | World Health Organization (WHO) – Mental Well-being
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
