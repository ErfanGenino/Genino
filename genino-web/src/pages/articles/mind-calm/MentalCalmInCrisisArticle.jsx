import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function MentalCalmInCrisisArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          آرامش ذهن در شرایط بحرانی
          <br />
          <span className="inline-block mt-5">
            چگونه در دل بحران، ذهن را از فروپاشی حفظ کنیم
          </span>
        </>
      }
      description="در شرایط بحرانی، ذهن انسان به‌طور طبیعی وارد حالت هشدار و بقا می‌شود. این مقاله به‌صورت علمی اما ساده توضیح می‌دهد بحران چگونه بر مغز اثر می‌گذارد و چه راهکارهای ذهنی عملی می‌توانند به حفظ آرامش، تصمیم‌گیری بهتر و کاهش آسیب روانی کمک کنند."
      image="/images/articles/mind-calm/mental-calm-in-crisis/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          بحران ذهن را تهدید می‌کند، نه توانایی ما را
        </p>

        <p>
          بحران‌ها می‌توانند ناگهانی، شدید و فراتر از کنترل ما باشند؛  
          اما واکنش ذهنی ما به بحران، قابل مدیریت و تمرین‌پذیر است.
        </p>

        <p>
          آرامش در بحران به معنای بی‌احساسی یا انکار واقعیت نیست؛  
          بلکه <strong>توان حفظ تعادل ذهنی در شرایط سخت</strong> است.
        </p>

        <p className="font-semibold text-yellow-700">
          ذهن آرام، ابزار بقا و تصمیم‌گیری است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) ذهن در شرایط بحرانی چه واکنشی نشان می‌دهد؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mental-calm-in-crisis/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فعال‌شدن شدید مرکز ترس مغز</li>
          <li>کاهش قدرت تحلیل منطقی</li>
          <li>افزایش افکار فاجعه‌محور</li>
          <li>واکنش‌های سریع و هیجانی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          این واکنش‌ها طبیعی‌اند، اما نباید مدیریت را از ما بگیرند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧬 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) چرا حفظ آرامش در بحران حیاتی است؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mental-calm-in-crisis/importance" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تصمیم‌گیری دقیق‌تر و ایمن‌تر</li>
          <li>کاهش آسیب روانی بلندمدت</li>
          <li>حفظ امنیت اطرافیان، به‌ویژه کودکان</li>
          <li>جلوگیری از واکنش‌های پرخطر</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          آرامش، به‌معنای ضعف نیست؛ نشانهٔ آگاهی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧘 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین فوری ذهنی در لحظه بحران
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mental-calm-in-crisis/immediate" />

        <ul className="list-disc pr-6 space-y-3">
          <li>توقف کوتاه و نام‌بردن موقعیت: «الان بحران است»</li>
          <li>۳ نفس عمیق با تمرکز روی بازدم</li>
          <li>تمرکز روی یک حس فیزیکی (پا روی زمین)</li>
          <li>کاهش ورودی اطلاعات غیرضروری</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بازگشت به بدن، ذهن را از آشفتگی بیرون می‌آورد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧭 بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) مدیریت افکار در شرایط بحرانی
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mental-calm-in-crisis/thoughts" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تفکیک واقعیت از حدس و شایعه</li>
          <li>پرسش: «الان چه کاری از دست من برمی‌آید؟»</li>
          <li>تمرکز بر قدم بعدی، نه کل مسیر</li>
          <li>پرهیز از دنبال‌کردن مداوم اخبار</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          ذهن آرام روی «کنترل‌پذیرها» تمرکز می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🚫 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) اشتباهات رایج در مواجهه با بحران
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mental-calm-in-crisis/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>سرکوب کامل احساسات</li>
          <li>تصمیم‌گیری عجولانه</li>
          <li>انتقال اضطراب به اطرافیان</li>
          <li>نادیده‌گرفتن نیازهای جسمی (خواب، آب)</li>
        </ul>

        <p className="font-semibold text-red-700">
          نادیده‌گرفتن ذهن، بحران را تشدید می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: آرامش، قطب‌نمای عبور از بحران
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/mental-calm-in-crisis/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>بحران قابل کنترل کامل نیست، واکنش ما هست</li>
          <li>آرامش ذهنی مهارت بقاست</li>
          <li>تمرین‌های ساده، اثر عمیق دارند</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «در بحران، آرامش ذهن همان نجات‌دهنده‌ای است که به دنبالش می‌گردیم.»
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
          World Health Organization (WHO) – Mental Health in Emergencies  
          | American Psychological Association (APA) – Coping with Crisis  
          | Harvard Medical School – Stress & Resilience
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
