import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function ParentalMentalCalmImpactOnChildGrowthArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          تأثیر آرامش روان والدین بر رشد کودک
          <br />
          <span className="inline-block mt-5">
            وقتی ذهن والد آرام است، مغز کودک امن‌تر رشد می‌کند
          </span>
        </>
      }
      description="آرامش روان والدین نقش مستقیمی در رشد مغزی، هیجانی و رفتاری کودک دارد. این مقاله به‌صورت علمی اما ساده توضیح می‌دهد چگونه استرس والدین به کودک منتقل می‌شود و چرا آرامش ذهنی والد، یکی از مهم‌ترین عوامل رشد سالم کودک است."
      image="/images/articles/mind-calm/parental-calm-child-growth/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          کودک قبل از حرف‌ها، «حالِ» والد را حس می‌کند
        </p>

        <p>
          کودکان بیش از آنچه تصور می‌کنیم، به فضای روانی اطراف خود
          حساس‌اند؛ حتی زمانی که هنوز توان درک کلامی ندارند.
        </p>

        <p>
          استرس، اضطراب یا آرامش والدین به‌صورت نامرئی اما عمیق
          به کودک منتقل می‌شود.
        </p>

        <p className="font-semibold text-yellow-700">
          رشد سالم کودک از ذهن آرام والد شروع می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) کودک چگونه استرس والدین را دریافت می‌کند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/parental-calm-child-growth/transfer" />

        <ul className="list-disc pr-6 space-y-3">
          <li>از طریق لحن صدا و زبان بدن</li>
          <li>تغییرات رفتاری و واکنش‌های هیجانی والد</li>
          <li>ناپایداری عاطفی در تعامل روزانه</li>
          <li>فضای کلی خانه و رابطه‌ها</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          کودک استرس را «یاد نمی‌گیرد»، آن را «تجربه می‌کند».
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧬 بخش ۲ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) تأثیر آرامش والد بر مغز در حال رشد کودک
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/parental-calm-child-growth/brain" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش فعال‌بودن سیستم ترس کودک</li>
          <li>تقویت حس امنیت و دلبستگی ایمن</li>
          <li>رشد بهتر قشر تصمیم‌گیری مغز</li>
          <li>تنظیم سالم هیجانات</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مغز کودک در محیط امن، بهتر رشد می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌱 بخش ۳ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) آرامش والد و رفتارهای کودک
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/parental-calm-child-growth/behavior" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش پرخاشگری و اضطراب کودک</li>
          <li>بهبود تمرکز و یادگیری</li>
          <li>افزایش همکاری و اعتماد</li>
          <li>کاهش رفتارهای واکنشی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          کودک آرام، نتیجهٔ محیط آرام است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧘 بخش ۴ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) چگونه والد می‌تواند آرامش خود را تقویت کند؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/parental-calm-child-growth/practice" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تنفس آگاهانه قبل از واکنش به کودک</li>
          <li>پذیرش کامل‌نبودن خود</li>
          <li>مراقبت از خواب و استراحت</li>
          <li>کمک‌گرفتن در زمان فرسودگی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مراقبت از خود، مراقبت از کودک است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۵ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۵) باورهای اشتباه درباره والد آرام
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/parental-calm-child-growth/myths" />

        <ul className="list-disc pr-6 space-y-3">
          <li>والد آرام یعنی والد بی‌احساس</li>
          <li>استرس والد روی کودک اثر ندارد</li>
          <li>کودک همه‌چیز را فراموش می‌کند</li>
        </ul>

        <p className="font-semibold text-red-700">
          کودکان بیشتر از آنچه فکر می‌کنیم، حس می‌کنند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: آرامش والد، سرمایهٔ رشد کودک
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/parental-calm-child-growth/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>کودک امنیت را قبل از آموزش تجربه می‌کند</li>
          <li>آرامش والد، پایهٔ سلامت روان کودک است</li>
          <li>تغییر از والد شروع می‌شود</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «ذهن آرام والد، امن‌ترین بستر رشد کودک است.»
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
          American Academy of Pediatrics – Parental Stress & Child Development  
          | Harvard Center on the Developing Child  
          | World Health Organization (WHO) – Early Childhood Development
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
