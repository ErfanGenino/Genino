import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function CalmingMindBeforeSleepArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          آرام‌سازی ذهن قبل از خواب
          <br />
          <span className="inline-block mt-5">
            چگونه ذهن شلوغ را برای خوابی عمیق آماده کنیم
          </span>
        </>
      }
      description="بسیاری از افراد با وجود خستگی جسمی، به دلیل شلوغی ذهن نمی‌توانند به‌راحتی بخوابند. این مقاله به‌صورت علمی و قابل‌فهم توضیح می‌دهد چرا ذهن قبل از خواب فعال می‌شود و چه راهکارهای ساده‌ای برای آرام‌سازی ذهن و بهبود کیفیت خواب وجود دارد."
      image="/images/articles/mind-calm/calming-before-sleep/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          خواب زمانی شروع می‌شود که ذهن آرام می‌شود
        </p>

        <p>
          خیلی وقت‌ها بدن خسته است، اما ذهن هنوز در حال
          فکر کردن، مرور روز و نگرانی درباره فرداست.
        </p>

        <p>
          مشکل بی‌خوابی اغلب کمبود خواب نیست؛  
          <strong>ناتوانی ذهن در رها کردن روز</strong> است.
        </p>

        <p className="font-semibold text-yellow-700">
          آرام‌سازی ذهن، کلید اصلی خواب باکیفیت است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا ذهن قبل از خواب شلوغ می‌شود؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش محرک‌های بیرونی و فعال‌شدن افکار درونی</li>
          <li>مرور نگرانی‌ها و کارهای انجام‌نشده</li>
          <li>فعال‌بودن سیستم هشدار مغز</li>
          <li>استفاده زیاد از موبایل و نور آبی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          ذهن شب‌ها فرصت پیدا می‌کند، چون روزها نادیده گرفته شده است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧬 بخش ۲ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) ارتباط ذهن آرام با خواب عمیق
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/sleep" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش ترشح هورمون استرس (کورتیزول)</li>
          <li>افزایش ملاتونین (هورمون خواب)</li>
          <li>تنظیم ضربان قلب و تنفس</li>
          <li>ورود بدن به فاز ترمیم و استراحت</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          خواب عمیق، نتیجهٔ آرامش عصبی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌬 بخش ۳ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین تنفس برای قبل از خواب
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/breathing" />

        <ul className="list-disc pr-6 space-y-3">
          <li>دم آرام از بینی (۴ ثانیه)</li>
          <li>مکث کوتاه (۲ ثانیه)</li>
          <li>بازدم آهسته از دهان (۶ ثانیه)</li>
          <li>۵ تا ۸ بار تکرار</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          این تنفس، مغز را وارد حالت استراحت می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🛏 بخش ۴ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) روتین‌های ذهنی ساده قبل از خواب
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/routine" />

        <ul className="list-disc pr-6 space-y-3">
          <li>نوشتن افکار و نگرانی‌ها روی کاغذ</li>
          <li>مرور ۳ اتفاق مثبت روز</li>
          <li>خاموش‌کردن موبایل حداقل ۳۰ دقیقه قبل خواب</li>
          <li>نور کم و محیط آرام</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          روتین شبانه یعنی پیام «وقت استراحت است» به ذهن.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۵ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج قبل از خواب
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>استفاده از موبایل در رختخواب</li>
          <li>بحث‌های ذهنی حل‌نشده قبل از خواب</li>
          <li>انتظار خواب فوری</li>
        </ul>

        <p className="font-semibold text-red-700">
          خواب را نمی‌شود مجبور کرد؛ باید شرایطش را فراهم کرد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: خواب خوب از ذهن آرام شروع می‌شود
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>آرام‌سازی ذهن قابل تمرین است</li>
          <li>تنفس و روتین شبانه بسیار مؤثرند</li>
          <li>کیفیت خواب با آرامش ذهن مستقیم مرتبط است</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «خواب عمیق هدیه‌ای است که با آرام‌کردن ذهن به خودمان می‌دهیم.»
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
          National Sleep Foundation – Sleep & Relaxation  
          | Harvard Medical School – Sleep and Stress  
          | Cleveland Clinic – Sleep Hygiene
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
