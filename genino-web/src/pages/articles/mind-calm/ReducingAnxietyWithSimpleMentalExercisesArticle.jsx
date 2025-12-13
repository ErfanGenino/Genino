import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function ReducingAnxietyWithSimpleMentalExercisesArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          کاهش اضطراب با تمرین‌های ساده ذهنی
          <br />
          <span className="inline-block mt-5">
            راهکارهایی کوچک برای آرام‌کردن ذهن ناآرام
          </span>
        </>
      }
      description="اضطراب یکی از شایع‌ترین واکنش‌های ذهن در زندگی مدرن است. این مقاله به‌صورت علمی اما ساده توضیح می‌دهد اضطراب چگونه در ذهن شکل می‌گیرد و چه تمرین‌های ذهنی ساده‌ای می‌توانند به کاهش اضطراب و افزایش حس کنترل و آرامش کمک کنند."
      image="/images/articles/mind-calm/reducing-anxiety/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          اضطراب، پیام است نه دشمن
        </p>

        <p>
          اضطراب معمولاً زمانی ظاهر می‌شود که ذهن احساس می‌کند
          کنترل شرایط را از دست داده یا آینده نامطمئن است.
        </p>

        <p>
          هدف از تمرین‌های ذهنی حذف کامل اضطراب نیست؛  
          بلکه <strong>کاهش شدت و مدیریت آگاهانه آن</strong> است.
        </p>

        <p className="font-semibold text-yellow-700">
          وقتی ذهن احساس امنیت کند، اضطراب فروکش می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) اضطراب چگونه در ذهن شکل می‌گیرد؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/reducing-anxiety/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فعال‌شدن بیش‌ازحد مرکز ترس مغز</li>
          <li>پیش‌بینی‌های منفی و فاجعه‌سازی</li>
          <li>تمرکز روی آینده نامعلوم</li>
          <li>کاهش احساس کنترل</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          اضطراب یعنی ذهن در حالت هشدار باقی مانده است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧬 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) چرا تمرین‌های ذهنی اضطراب را کاهش می‌دهند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/reducing-anxiety/effect" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش واکنش‌های خودکار ذهن</li>
          <li>فعال‌سازی سیستم آرام‌سازی بدن</li>
          <li>بازگرداندن توجه به لحظه حال</li>
          <li>افزایش حس کنترل ذهنی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          ذهن با تمرین یاد می‌گیرد آرام‌تر واکنش نشان دهد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧘 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین ذهنی «توقف و تنفس»
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/reducing-anxiety/breath" />

        <ul className="list-disc pr-6 space-y-3">
          <li>توقف کوتاه در لحظه اضطراب</li>
          <li>۳ نفس آهسته و عمیق</li>
          <li>تمرکز روی بازدم</li>
          <li>نام‌گذاری احساس: «الان مضطربم»</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          نام‌بردن احساس، شدت آن را کاهش می‌دهد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📝 بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) تمرین ذهنی نوشتن افکار اضطرابی
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/reducing-anxiety/writing" />

        <ul className="list-disc pr-6 space-y-3">
          <li>نوشتن نگرانی‌ها روی کاغذ</li>
          <li>تفکیک واقعیت از تصور</li>
          <li>پرسیدن: «بدترین حالت واقعاً چیست؟»</li>
          <li>تمرکز روی آنچه در کنترل ماست</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بیرون‌ریختن افکار، ذهن را سبک می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚫 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج هنگام مقابله با اضطراب
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/reducing-anxiety/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>سرکوب احساس اضطراب</li>
          <li>جنگیدن با افکار</li>
          <li>انتظار آرامش فوری</li>
        </ul>

        <p className="font-semibold text-red-700">
          پذیرش اضطراب، اولین قدم کاهش آن است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: اضطراب قابل مدیریت است
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/reducing-anxiety/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>اضطراب دشمن نیست، پیام است</li>
          <li>تمرین‌های ساده بسیار مؤثرند</li>
          <li>آرامش با تداوم ساخته می‌شود</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «ذهن آرام نتیجه تمرین آگاهانه است، نه حذف کامل اضطراب.»
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
          American Psychological Association (APA) – Anxiety Management  
          | National Institute of Mental Health (NIMH)  
          | Harvard Medical School – Anxiety & Mind Techniques
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
