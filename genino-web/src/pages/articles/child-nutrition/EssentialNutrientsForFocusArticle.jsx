// 📄 src/pages/articles/child-nutrition/EssentialNutrientsForFocusArticle.jsx
import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function EssentialNutrientsForFocusArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          مواد مغذیِ ضروری برای تمرکز و یادگیری
          <br />
          <span className="inline-block mt-5">
            راهنمای علمی ژنینویی برای تقویت حافظه، آرامش و عملکرد مغزی کودک
          </span>
        </>
      }
      description="تمرکز، حافظه و یادگیری کودکان به شدت تحت تأثیر تغذیه قرار دارد. مغز برای ساختن مسیرهای عصبی، تنظیم توجه و حفظ آرامش نیازمند مواد مغذی خاصی است. این مقاله، یک راهنمای کامل و علمی برای والدین است تا بدانند کودکانشان به چه تغذیه‌ای نیاز دارند."
      image="/images/articles/child-nutrition/focus-nutrients/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه؛ چرا بعضی بچه‌ها تمرکز ندارند؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          چرا تغذیه روی تمرکز کودک این‌قدر اثر دارد؟
        </p>

        <p>
          ۷۰٪ مغز از چربی و آب تشکیل شده و برای انجام هر کاری—از یادگیری کلمات 
          گرفته تا حل مسئله—به انرژی، مواد معدنی و ویتامین‌های خاص نیاز دارد.
        </p>

        <p className="font-semibold text-yellow-700">
          کودکان با تغذیه ضعیف بیشتر دچار بی‌قراری، حواس‌پرتی، افت یادگیری و اضطراب می‌شوند.
        </p>

        <p>در این مقاله ۸ مادهٔ مغذی حیاتی را بررسی می‌کنیم.</p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ — امگا-۳ (DHA/EPA) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) امگا-۳ — سوخت طلایی مغز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/omega3" />

        <p>
          DHA و EPA اصلی‌ترین چربی‌های ساختاری مغز هستند.  
          کمبود امگا-۳ با:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>بی‌قراری</li>
          <li>کاهش تمرکز</li>
          <li>احساس خستگی ذهنی</li>
          <li>افزایش احتمال ADHD</li>
        </ul>

        <p className="font-semibold text-yellow-700">منابع عالی:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>ماهی سالمون، ساردین، کیلکا</li>
          <li>تخم‌مرغ غنی‌شده با DHA</li>
          <li>گردو خردشده</li>
          <li>تخم کتان آسیاب‌شده</li>
          <li>چیا</li>
        </ul>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🍳 بخش ۲ — کولین؛ حافظه و یادگیری */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) کولین — سازنده سیستم حافظه
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/choline" />

        <p>
          کولین برای ساخت انتقال‌دهنده «استیل‌کولین» لازم است که  
          مسئول یادگیری و ارتباط بین نورون‌هاست.
        </p>

        <p className="font-semibold text-yellow-700">
          بهترین منبع کولین برای کودکان: **تخم‌مرغ کامل**
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>تخم‌مرغ کامل (زرده + سفیده)</li>
          <li>ماهی</li>
          <li>مرغ</li>
          <li>عدس</li>
          <li>سویا</li>
        </ul>

        <p className="font-semibold">
          کمبود کولین = ضعف حافظه + کاهش سرعت یادگیری
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧲 بخش ۳ — آهن؛ ضد خستگی مغز */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۳) آهن — ضد بی‌حوصلگی و تقویت‌کننده تمرکز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/iron" />

        <p>
          آهن اکسیژن را به مغز می‌رساند.  
          کمبود آهن در کودکان یکی از مهم‌ترین دلایل:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>بی‌حوصلگی</li>
          <li>حواس‌پرتی</li>
          <li>اضطراب</li>
          <li>کندی یادگیری</li>
        </ul>

        <p className="font-semibold text-yellow-700">منابع غذایی:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>گوشت قرمز پخته</li>
          <li>حبوبات</li>
          <li>زرده تخم‌مرغ</li>
          <li>سبزیجات برگ‌تیره</li>
          <li>غلات غنی‌شده</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔋 بخش ۴ — ویتامین B6 و B12 */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۴) ویتامین‌های گروه B — تقویت خلق‌وخو و تمرکز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/B-vitamins" />

        <p>
          ویتامین‌های گروه B انرژی مغز را حفظ کرده و هورمون‌های آرام‌کننده  
          مانند سروتونین را تنظیم می‌کنند.
        </p>

        <p className="font-semibold text-yellow-700">منابع عالی:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>ماهی</li>
          <li>تخم‌مرغ</li>
          <li>مرغ</li>
          <li>لبنیات</li>
          <li>غلات کامل</li>
        </ul>

        <p className="font-semibold">
          کمبود B باعث خستگی ذهنی و اضطراب می‌شود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧂 بخش ۵ — روی (Zinc) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۵) روی — تنظیم‌کننده پیام‌های عصبی
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/zinc" />

        <p>
          روی برای حافظه کاری (Working Memory) و تمرکز ضروری است.
        </p>

        <p className="font-semibold text-yellow-700">منابع غذایی:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>گوشت</li>
          <li>مرغ</li>
          <li>عدس</li>
          <li>نخود</li>
          <li>تخم‌مرغ</li>
        </ul>

      </div>

      <GoldenDivider class="my-10" />

      {/* ========================== */}
      {/* ⚡ بخش ۶ — منیزیم؛ ضد اضطراب */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۶) منیزیم — کاهش بی‌قراری و بهبود خواب
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/magnesium" />

        <p>
          منیزیم عضلات را آرام کرده و فشار عصبی کودک را کاهش می‌دهد.  
          خواب باکیفیت ← تمرکز بهتر.
        </p>

        <p className="font-semibold text-yellow-700">منابع:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>موز</li>
          <li>آووکادو</li>
          <li>بادام‌زمینی (بالای ۲ سال)</li>
          <li>غلات کامل</li>
          <li>اسفناج پخته</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 💡 بخش ۷ — ید؛ سازنده هورمون‌های مغزی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۷) ید — ضروری برای رشد ذهنی
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/iodine" />

        <p>
          کمبود ید در کودکان یکی از دلایل تأخیر شناختی و اختلال تمرکز است.
        </p>

        <p className="font-semibold text-yellow-700">منابع:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>ماهی‌های دریایی</li>
          <li>تخم‌مرغ</li>
          <li>لبنیات پاستوریزه</li>
          <li>نمک یددار (محدود و کنترل‌شده)</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* ✨ جمع‌بندی ژنینویی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: تغذیه درست = تمرکز بهتر = یادگیری قوی‌تر
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/focus-nutrients/summary" />

        <p>
          مغز برای بهترین عملکرد خود به مجموعه‌ای از مواد مغذی نیاز دارد.  
          این مواد تمرکز، آرامش، حافظه و توان یادگیری را افزایش می‌دهند.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>امگا-۳ برای اتصال نورونی</li>
          <li>کولین برای یادگیری</li>
          <li>آهن برای تمرکز</li>
          <li>ویتامین‌های B برای انرژی ذهنی</li>
          <li>روی برای پیام‌های عصبی</li>
          <li>منیزیم برای آرامش</li>
          <li>ید برای رشد ذهنی</li>
        </ul>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «تغذیه خوب، پایهٔ یادگیری قوی و آینده‌ای روشن است.»
          </p>
        </div>

      </div>

    </GeninoArticleTemplate>
  );
}
