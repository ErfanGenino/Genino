import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function BreathingExercisesForDailyStressArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          تمرین‌های تنفس برای کاهش استرس روزانه
          <br />
          <span className="inline-block mt-5">
            ساده‌ترین ابزار آرام‌سازی ذهن که همیشه همراه ماست
          </span>
        </>
      }
      description="تنفس آگاهانه یکی از سریع‌ترین و علمی‌ترین روش‌ها برای کاهش استرس روزانه است. در این مقاله به‌زبان ساده توضیح می‌دهیم چرا تنفس بر مغز و سیستم عصبی اثر می‌گذارد و چه تمرین‌های تنفسی ساده‌ای می‌توانند در زندگی روزمره آرامش ایجاد کنند."
      image="/images/articles/mind-calm/breathing-exercises/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          نفس کشیدن؛ کلید خاموش‌کردن استرس
        </p>

        <p>
          استرس فقط یک احساس نیست؛  
          واکنشی فیزیولوژیک در بدن است که با تندشدن نفس، ضربان قلب
          و تنش عضلانی همراه می‌شود.
        </p>

        <p>
          خبر خوب این است که برخلاف بسیاری از واکنش‌های بدن،
          <strong> تنفس تنها عملکردی است که هم خودکار است و هم قابل‌کنترل.</strong>
        </p>

        <p className="font-semibold text-yellow-700">
          با تغییر الگوی تنفس، می‌توان پیام آرامش به مغز فرستاد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) استرس چگونه روی تنفس اثر می‌گذارد؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/breathing-exercises/stress" />

        <ul className="list-disc pr-6 space-y-3">
          <li>نفس‌ها سطحی و سریع می‌شوند</li>
          <li>اکسیژن‌رسانی مؤثر کاهش می‌یابد</li>
          <li>بدن در حالت «خطر» باقی می‌ماند</li>
          <li>ذهن توان آرام‌شدن را از دست می‌دهد</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تنفس نامنظم، استرس را حفظ می‌کند؛  
          تنفس آگاهانه، آن را متوقف می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🫁 بخش ۲ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) چرا تمرین‌های تنفسی مؤثرند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/breathing-exercises/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فعال‌سازی سیستم عصبی پاراسمپاتیک</li>
          <li>کاهش فعالیت مرکز ترس مغز</li>
          <li>کاهش ضربان قلب و تنش عضلانی</li>
          <li>ایجاد حس کنترل ذهنی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تنفس آگاهانه یعنی فرستادن پیام «امنیت» به مغز.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌬 بخش ۳ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین تنفس شکمی (پایه‌ای‌ترین تمرین)
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/breathing-exercises/diaphragm" />

        <ul className="list-disc pr-6 space-y-3">
          <li>دم آرام از بینی (۴ ثانیه)</li>
          <li>بالا آمدن شکم، نه قفسه سینه</li>
          <li>بازدم آهسته از دهان (۶ ثانیه)</li>
          <li>تکرار ۵ تا ۱۰ بار</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          این تمرین بدن را از حالت هشدار خارج می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* ⏱ بخش ۴ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) تمرین تنفس ۴–۷–۸ برای آرامش سریع
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/breathing-exercises/478" />

        <ul className="list-disc pr-6 space-y-3">
          <li>دم از بینی: ۴ ثانیه</li>
          <li>نگه‌داشتن نفس: ۷ ثانیه</li>
          <li>بازدم آهسته: ۸ ثانیه</li>
          <li>۳ تا ۴ بار تکرار</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مناسب قبل از خواب یا در اوج اضطراب.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۵ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج در تمرین تنفس
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/breathing-exercises/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تنفس خیلی عمیق و سریع</li>
          <li>حبس طولانی نفس بدون آمادگی</li>
          <li>انتظار آرامش فوری و کامل</li>
        </ul>

        <p className="font-semibold text-red-700">
          تنفس باید آرام، طبیعی و بدون فشار باشد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: نفس آگاهانه، آرامش در دسترس
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/breathing-exercises/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>تنفس ابزار همیشه در دسترس آرامش است</li>
          <li>تمرین کوتاه اما منظم مؤثرتر است</li>
          <li>بدن و ذهن همزمان آرام می‌شوند</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «هر نفس آگاهانه، فرصتی برای بازگشت به آرامش است.»
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
          Harvard Health Publishing – Breathing Techniques  
          | American Psychological Association (APA)  
          | Cleveland Clinic – Stress & Breathing
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
