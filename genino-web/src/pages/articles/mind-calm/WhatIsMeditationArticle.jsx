import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function WhatIsMeditationArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          مدیتیشن چیست و چگونه به آرامش ذهن کمک می‌کند؟
          <br />
          <span className="inline-block mt-5">
            توضیحی ساده و علمی درباره یکی از مؤثرترین روش‌های آرام‌سازی ذهن
          </span>
        </>
      }
      description="مدیتیشن یک تمرین علمی و اثبات‌شده برای کاهش استرس، تنظیم هیجانات و افزایش آرامش ذهن است. در این مقاله به‌زبان ساده توضیح می‌دهیم مدیتیشن چیست، چگونه بر مغز اثر می‌گذارد و چرا تمرین منظم آن می‌تواند کیفیت زندگی را به‌طور واقعی بهبود دهد."
      image="/images/articles/mind-calm/what-is-meditation/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          آرامش ذهن، مهارتی است که می‌توان آن را آموخت
        </p>

        <p>
          ذهن انسان به‌طور طبیعی پر از فکر، نگرانی و تحلیل است.  
          مشکل از «فکر کردن» نیست؛ مشکل از <strong>کنترل‌نشدن جریان افکار</strong> است.
        </p>

        <p>
          مدیتیشن روشی است برای آموزش ذهن؛  
          روشی که کمک می‌کند افکار را ببینیم، بدون اینکه اسیر آن‌ها شویم.
        </p>

        <p className="font-semibold text-yellow-700">
          مدیتیشن یعنی مدیریت ذهن، نه خاموش‌کردن آن.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) مدیتیشن دقیقاً چیست؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/what-is-meditation/definition" />

        <p>
          مدیتیشن یک تمرین ذهنی است که در آن فرد یاد می‌گیرد توجه خود را
          آگاهانه به لحظهٔ حال برگرداند.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>تمرکز روی تنفس یا حس بدن</li>
          <li>مشاهدهٔ افکار بدون قضاوت</li>
          <li>کاهش واکنش‌های هیجانی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مدیتیشن تمرین «آگاهی» است، نه فکر نکردن.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧬 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) مدیتیشن چه تغییری در مغز ایجاد می‌کند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/what-is-meditation/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش فعالیت آمیگدالا (مرکز ترس)</li>
          <li>تقویت بخش تصمیم‌گیر مغز</li>
          <li>بهبود تنظیم هیجانات</li>
          <li>افزایش تمرکز و آرامش</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مغز با مدیتیشن، آرام‌بودن را دوباره یاد می‌گیرد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌿 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) چرا مدیتیشن استرس را کاهش می‌دهد؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/what-is-meditation/stress" />

        <ul className="list-disc pr-6 space-y-3">
          <li>بدن از حالت هشدار خارج می‌شود</li>
          <li>ضربان قلب و تنفس تنظیم می‌شود</li>
          <li>افکار منفی قدرت کمتری پیدا می‌کنند</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          آرامش، پاسخ طبیعی بدن به تمرین ذهنی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) مدیتیشن چقدر زمان می‌خواهد؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/what-is-meditation/time" />

        <ul className="list-disc pr-6 space-y-3">
          <li>۵ دقیقه در روز هم مؤثر است</li>
          <li>تداوم مهم‌تر از مدت زمان است</li>
          <li>بهتر است هر روز در زمان ثابت انجام شود</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مدیتیشن کوتاه اما منظم، بهتر از تمرین‌های طولانی و مقطعی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚫 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) باورهای اشتباه درباره مدیتیشن
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/what-is-meditation/myths" />

        <ul className="list-disc pr-6 space-y-3">
          <li>مدیتیشن مخصوص افراد خاص نیست</li>
          <li>نیازی به خالی‌کردن ذهن نیست</li>
          <li>با شلوغی ذهن هم می‌توان مدیتیشن کرد</li>
        </ul>

        <p className="font-semibold text-red-700">
          مدیتیشن ساده‌تر از چیزی است که تصور می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: مدیتیشن، تمرین بازگشت به تعادل
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/what-is-meditation/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>مدیتیشن مهارتی آموختنی است</li>
          <li>علم پشت آن وجود دارد</li>
          <li>اثر آن با تمرین منظم دیده می‌شود</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «ذهن آرام نتیجهٔ تمرین آگاهانه است، نه شانس یا سکوت مطلق.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          Harvard Medical School – Mindfulness Research |  
          American Psychological Association (APA) |  
          National Institutes of Health (NIH)
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
