// 📄 src/pages/articles/child-nutrition/ForbiddenFoodsUnder5Article.jsx
import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function ForbiddenFoodsUnder5Article() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          غذاهای ممنوعه برای کودکان زیر ۵ سال
          <br />
          <span className="inline-block mt-5">
            راهنمای علمی ژنینویی برای پیشگیری از خفگی، آلرژی، مسمومیت و آسیب‌های گوارشی
          </span>
        </>
      }
      description="کودکان زیر ۵ سال دستگاه گوارش ظریف‌تر، سیستم ایمنی ناپخته‌تر و خطر خفگی بالاتری دارند. این مقاله، مرجع علمی و کاربردی ژنینو برای شناسایی غذاهای خطرناک و ممنوعه در این سن است."
      image="/images/articles/child-nutrition/under-5-forbidden/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-3xl font-bold text-yellow-700">
          چرا برخی غذاها برای زیر ۵ سال ممنوع‌اند؟
        </p>

        <p>
          کودکان زیر ۵ سال هنوز مهارت‌های جویدن کافی، سیستم ایمنی کامل،  
          و آنزیم‌های گوارشی بالغ را ندارند.
        </p>

        <p className="font-semibold text-yellow-700">
          چهار دلیل اصلی ممنوعیت غذاها:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>خطر خفگی</li>
          <li>خطر آلرژی شدید</li>
          <li>خطر مسمومیت غذایی</li>
          <li>آسیب به دستگاه گوارش یا کلیه</li>
        </ul>

        <p>
          این مقاله یک فهرست کامل و علمی برای والدین ارائه می‌دهد.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۱ — غذاهای با خطر خفگی (Choking Hazard) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۱) غذاهایی که خفگی ایجاد می‌کنند (خطر زیاد!)
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/under-5-forbidden/choking" />

        <ul className="list-disc pr-6 space-y-2">
          <li>آجیل کامل (بادام، فندق، پسته)</li>
          <li>انگور کامل (بدون نصف کردن)</li>
          <li>هویج خام</li>
          <li>پفک و چیپس‌های سخت</li>
          <li>پاپ‌کورن</li>
          <li>انواع سوسیس کامل</li>
          <li>تکه‌های خام گوشت یا سبزیجات سفت</li>
          <li>شکلات‌های سفت و آب‌نشدنی</li>
        </ul>

        <p className="font-semibold text-red-700">
          تا ۵ سالگی، همه غذاهای گرد، سفت یا لغزنده باید خرد و نرم شوند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🍯 بخش ۲ — غذاهای ممنوع به دلیل مسمومیت غذایی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-red-700">
          ۲) غذاهای خطرناک از نظر میکروبی و مسمومیت
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/under-5-forbidden/contamination" />

        <ul className="list-disc pr-6 space-y-2">
          <li>عسل برای زیر یک سال (بوتولیسم)</li>
          <li>تخم‌مرغ نیم‌پز</li>
          <li>گوشت نیم‌پز یا آبدار</li>
          <li>لبنیات غیرپاستوریزه</li>
          <li>غذاهای مانده و گرم‌کرده چندباره</li>
          <li>ماهی خام (سوشی)</li>
          <li>کالباس و سوسیس‌های بی‌کیفیت</li>
        </ul>

        <p className="font-semibold text-red-700">
          دستگاه ایمنی کودک نمی‌تواند با برخی باکتری‌ها مقابله کند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🥤 بخش ۳ — غذاهای مضر و مخرب سلامت (سریع‌الاثر) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-red-700">
          ۳) غذاهای مضر که سلامت کودک را تضعیف می‌کنند
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/under-5-forbidden/unhealthy" />

        <ul className="list-disc pr-6 space-y-2">
          <li>نوشابه و نوشیدنی‌های انرژی‌زا</li>
          <li>آبمیوه صنعتی (حجم بالای قند)</li>
          <li>کیک‌ها و بیسکوییت‌های صنعتی</li>
          <li>چیپس، پفک، اسنک</li>
          <li>غذاهای فوق‌فرآوری‌شده (ULTRA processed)</li>
          <li>فست‌فود (به‌خصوص سوسیس و همبرگر آماده)</li>
          <li>غذاهای پرنمک</li>
          <li>غذاهای سرخ‌شده</li>
        </ul>

        <p className="font-semibold text-red-700">
          این غذاها باعث افزایش قند خون، التهاب، چاقی و کاهش تمرکز کودک می‌شوند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🥜 بخش ۴ — غذاهای آلرژی‌زا (با احتیاط مصرف شوند) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۴) غذاهای آلرژی‌زا — ممنوع مطلق نیستند اما نیاز به مراقبت دارند
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/under-5-forbidden/allergy" />

        <p>
          برخی غذاها پتانسیل آلرژی بالا دارند.  
          ممنوع نیستند، اما باید با احتیاط و تدریج مصرف شوند.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>سفیده تخم‌مرغ</li>
          <li>بادام‌زمینی (به‌صورت کره بسیار نرم + بالای ۲ سال)</li>
          <li>بادام هندی و گردو پوره‌شده</li>
          <li>گوجه‌فرنگی خام</li>
          <li>توت‌فرنگی</li>
          <li>کیوی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          اصل ژنینویی: «هر غذای جدید = ۳ روز صبر»
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🍡 بخش ۵ — شیرینی‌ها و محرک‌های عصبی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-red-700">
          ۵) غذاهایی که رفتار و تمرکز کودک را مختل می‌کنند
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/under-5-forbidden/behavior" />

        <ul className="list-disc pr-6 space-y-2">
          <li>قند و شکریجات</li>
          <li>نوشیدنی‌های کافئین‌دار</li>
          <li>چای پررنگ</li>
          <li>شیرینی‌جات بسته‌بندی‌شده</li>
          <li>آب‌نبات‌های سفت</li>
        </ul>

        <p className="font-semibold text-red-700">
          قند زیاد باعث بیش‌فعالی، بی‌قراری و افت تمرکز می‌شود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* ✨ جمع‌بندی ژنینویی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: سلامت قبل از هر چیز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/under-5-forbidden/summary" />

        <p>
          کودکان زیر ۵ سال آسیب‌پذیرتر از آن‌اند که فکرش را می‌کنیم.  
          دستگاه گوارش، ریه‌ها، سیستم ایمنی و مهارت جویدن هنوز کامل نیستند.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>پرهیز از غذاهای سخت و خفگی‌زا</li>
          <li>پرهیز از غذاهای فرآوری‌شده و قندی</li>
          <li>پرهیز از مواد آلرژی‌زا بدون نظارت</li>
          <li>رعایت بهداشت و پخت کامل غذا</li>
        </ul>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «هر انتخاب تغذیه‌ای، یک قدم برای سلامتی آیندهٔ کودک است.»
          </p>
        </div>

      </div>

    </GeninoArticleTemplate>
  );
}
