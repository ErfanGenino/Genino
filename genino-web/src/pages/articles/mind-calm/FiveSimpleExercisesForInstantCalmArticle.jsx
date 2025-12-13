import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function FiveSimpleExercisesForInstantCalmArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          ۵ تمرین ساده برای آرامش فوری ذهن
          <br />
          <span className="inline-block mt-5">
            راهکارهایی سریع برای وقتی ذهن بیش از حد شلوغ است
          </span>
        </>
      }
      description="گاهی ذهن آن‌قدر درگیر و مضطرب می‌شود که به آرامش فوری نیاز داریم. این مقاله پنج تمرین ساده، علمی و کاربردی را معرفی می‌کند که در چند دقیقه می‌توانند شدت استرس را کاهش دهند و ذهن را به تعادل برگردانند."
      image="/images/articles/mind-calm/instant-calm/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          آرامش فوری، یک مهارت نجات‌بخش
        </p>

        <p>
          همه ما لحظاتی را تجربه کرده‌ایم که ذهن بیش از حد شلوغ،
          مضطرب یا آشفته شده است.
        </p>

        <p>
          در چنین لحظاتی، نیاز به تمرین‌هایی داریم که
          <strong>سریع، ساده و در دسترس</strong> باشند.
        </p>

        <p className="font-semibold text-yellow-700">
          آرامش فوری ممکن است؛ اگر ابزارش را بشناسیم.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧘 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) تمرین تنفس آهسته
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/instant-calm/breathing" />

        <ul className="list-disc pr-6 space-y-3">
          <li>دم آرام از بینی (۴ ثانیه)</li>
          <li>بازدم آهسته از دهان (۶ ثانیه)</li>
          <li>تکرار ۵ تا ۷ بار</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بازدم طولانی، پیام آرامش به مغز می‌فرستد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) تمرین نام‌گذاری احساس
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/instant-calm/naming" />

        <ul className="list-disc pr-6 space-y-3">
          <li>گفتن آرام: «الان مضطربم» یا «الان ذهنم شلوغ است»</li>
          <li>پذیرفتن احساس بدون قضاوت</li>
          <li>تمرکز کوتاه روی تنفس</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          نام‌بردن احساس، شدت آن را کاهش می‌دهد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚶 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین اتصال به بدن
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/instant-calm/body" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فشار دادن کف پا به زمین</li>
          <li>لمس یک شیء واقعی اطراف</li>
          <li>توجه به حس فیزیکی بدن</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بازگشت به بدن، ذهن را از آشفتگی بیرون می‌آورد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📝 بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) تمرین نوشتن سریع
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/instant-calm/writing" />

        <ul className="list-disc pr-6 space-y-3">
          <li>نوشتن هرچه در ذهن هست (۱–۲ دقیقه)</li>
          <li>بدون نظم و بدون سانسور</li>
          <li>بستن دفتر و توقف</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تخلیه ذهنی، فشار افکار را کم می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🛑 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) تمرین توقف ذهنی
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/instant-calm/pause" />

        <ul className="list-disc pr-6 space-y-3">
          <li>ایست کوتاه در کار یا فکر</li>
          <li>پرسش: «الان چه چیزی در کنترل من است؟»</li>
          <li>تمرکز فقط روی قدم بعدی</li>
        </ul>

        <p className="font-semibold text-red-700">
          مکث آگاهانه، از فروپاشی ذهن جلوگیری می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: آرامش در چند دقیقه
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/instant-calm/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>آرامش فوری امکان‌پذیر است</li>
          <li>تمرین‌های ساده اثر عمیق دارند</li>
          <li>تکرار، کلید ماندگاری آرامش است</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «گاهی فقط چند نفس آگاهانه، ذهن را نجات می‌دهد.»
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
          American Psychological Association (APA) – Stress Reduction  
          | Harvard Medical School – Relaxation Techniques  
          | National Institute of Mental Health (NIMH)
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
