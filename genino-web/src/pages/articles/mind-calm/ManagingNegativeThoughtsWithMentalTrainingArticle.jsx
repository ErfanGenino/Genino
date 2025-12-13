import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function ManagingNegativeThoughtsWithMentalTrainingArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          مدیریت افکار منفی با تمرین ذهن
          <br />
          <span className="inline-block mt-5">
            چگونه بدون جنگیدن با ذهن، افکار آزاردهنده را آرام کنیم
          </span>
        </>
      }
      description="افکار منفی بخشی طبیعی از فعالیت ذهن انسان هستند، اما وقتی کنترل‌نشده باقی بمانند می‌توانند به اضطراب، خستگی ذهنی و تصمیم‌های نادرست منجر شوند. این مقاله به‌صورت علمی اما ساده توضیح می‌دهد افکار منفی چگونه شکل می‌گیرند و چه تمرین‌های ذهنی عملی برای مدیریت و کاهش اثر آن‌ها وجود دارد."
      image="/images/articles/mind-calm/managing-negative-thoughts/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          فکر منفی دشمن نیست؛ پیام‌آور است
        </p>

        <p>
          ذهن انسان به‌طور طبیعی تمایل دارد خطرها، اشتباهات
          و تهدیدهای احتمالی را برجسته کند.
        </p>

        <p>
          مشکل زمانی شروع می‌شود که این افکار
          <strong>بی‌وقفه، تکرارشونده و کنترل‌نشده</strong> شوند.
        </p>

        <p className="font-semibold text-yellow-700">
          مدیریت افکار یعنی دیدن آن‌ها، نه حذف‌کردنشان.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) افکار منفی چگونه شکل می‌گیرند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/managing-negative-thoughts/origin" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فعال‌شدن سیستم هشدار مغز</li>
          <li>تجربه‌های گذشته و الگوهای یادگرفته‌شده</li>
          <li>خستگی ذهن و استرس مزمن</li>
          <li>پیش‌بینی‌های فاجعه‌محور</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          فکر منفی اغلب نتیجهٔ تلاش ذهن برای محافظت است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧬 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) چرا جنگیدن با افکار منفی جواب نمی‌دهد؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/managing-negative-thoughts/struggle" />

        <ul className="list-disc pr-6 space-y-3">
          <li>سرکوب فکر، قدرت آن را بیشتر می‌کند</li>
          <li>مقاومت ذهنی باعث خستگی روانی می‌شود</li>
          <li>ذهن وارد چرخه درگیری می‌شود</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          هرچه بیشتر بجنگیم، فکر منفی ماندگارتر می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧘 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین ذهنی «مشاهده بدون قضاوت»
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/managing-negative-thoughts/observe" />

        <ul className="list-disc pr-6 space-y-3">
          <li>توقف کوتاه هنگام ظاهرشدن فکر</li>
          <li>گفتن: «این فقط یک فکر است»</li>
          <li>توجه به تنفس یا بدن</li>
          <li>اجازه عبور دادن فکر بدون درگیری</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          دیدن فکر، قدرت آن را کم می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📝 بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) تمرین نوشتن برای تخلیه افکار منفی
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/managing-negative-thoughts/writing" />

        <ul className="list-disc pr-6 space-y-3">
          <li>نوشتن افکار بدون سانسور</li>
          <li>جداکردن «واقعیت» از «تفسیر»</li>
          <li>پرسیدن: آیا این فکر قطعاً درست است؟</li>
          <li>پایان با یک جمله واقع‌بینانه‌تر</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          نوشتن، ذهن را از تکرار رها می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚫 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج در مواجهه با افکار منفی
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/managing-negative-thoughts/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>برچسب زدن به خود («من همیشه منفی‌ام»)</li>
          <li>تحلیل بیش‌ازحد افکار</li>
          <li>انتظار ذهن کاملاً آرام</li>
        </ul>

        <p className="font-semibold text-red-700">
          ذهن آرام یعنی ذهن مدیریت‌شده، نه ذهن خالی.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: افکار می‌آیند و می‌روند
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/managing-negative-thoughts/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>افکار منفی طبیعی‌اند</li>
          <li>مدیریت، مؤثرتر از سرکوب است</li>
          <li>تمرین ذهنی قدرت می‌آورد</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «تو افکارت نیستی؛ مشاهده‌گر افکارت هستی.»
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
          American Psychological Association (APA) – Cognitive Processes  
          | Harvard Medical School – Managing Negative Thoughts  
          | National Institute of Mental Health (NIMH)
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
