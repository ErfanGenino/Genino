// 📄 src/pages/articles/child-nutrition/BrainBoostingFoodsArticle.jsx
import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function BrainBoostingFoodsArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          غذاهای مفید برای رشد مغز کودک
          <br />
          <span className="inline-block mt-5">
            تغذیه عصبیِ ژنینویی برای تقویت تمرکز، حافظه و رشد شناختی
          </span>
        </>
      }
      description="مغز کودک در سال‌های اولیه زندگی با سرعتی خیره‌کننده رشد می‌کند. این مقاله یک راهنمای علمی و کاربردی برای والدین است تا بدانند کدام مواد غذایی بیشترین اثر را بر رشد مغز، تمرکز، حافظه و رفتار کودک دارند."
      image="/images/articles/child-nutrition/brain-foods/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه — چرا مغز کودک به غذای خاص نیاز دارد؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-3xl font-bold text-yellow-700">
          تغذیه مغز کودک، تغذیه آینده اوست
        </p>

        <p>
          مغز کودک در ۳ سال اول زندگی ۸۰٪ رشد نهایی خود را تجربه می‌کند.
          این یعنی مواد غذایی که کودک مصرف می‌کند مستقیماً روی:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>قدرت تمرکز</li>
          <li>یادگیری و حافظه</li>
          <li>رشد سلول‌های عصبی</li>
          <li>خلق‌وخو و رفتار</li>
          <li>سیستم ایمنی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          مغز کودکان به چربی‌های مفید، آهن، روی، ویتامین‌های گروه B، DHA و آنتی‌اکسیدان‌ها وابسته است.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ — چربی‌های مفید (سوخت اصلی مغز) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۱) چربی‌های مفید (DHA, EPA, Omega-3)
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/omega3" />

        <p>
          ۶۰٪ مغز را چربی تشکیل می‌دهد.  
          مهم‌ترین چربی برای رشد مغز کودکان: <strong>اسیدهای چرب امگا-۳</strong>.
        </p>

        <p className="font-semibold">
          نقش امگا-۳ در مغز کودک:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>تقویت اتصال نورون‌ها</li>
          <li>افزایش توجه و تمرکز</li>
          <li>کاهش احتمال بیش‌فعالی (ADHD)</li>
          <li>بهبود خلق‌وخو و آرامش</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بهترین منابع برای کودک:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>ماهی سالمون، ساردین، قزل‌آلا (۲ بار در هفته)</li>
          <li>گردو خردشده</li>
          <li>تخم کتان آسیاب‌شده</li>
          <li>چیا</li>
          <li>تخم‌مرغ غنی‌شده با DHA</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🍳 بخش ۲ — پروتئین‌ها و اسیدهای آمینه */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۲) پروتئین‌ها — سازنده هورمون‌های یادگیری
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/protein" />

        <p>
          مغز برای ساخت انتقال‌دهنده‌های عصبی مثل دوپامین، سروتونین و نورآدرنالین  
          به اسیدهای آمینه نیاز دارد.
        </p>

        <p className="font-semibold text-yellow-700">
          بهترین منابع پروتئین برای کودکان:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>تخم‌مرغ کامل</li>
          <li>ماهی</li>
          <li>گوشت سفید و قرمز</li>
          <li>عدس و نخود</li>
          <li>ماست یونانی</li>
        </ul>

        <p>
          تخم‌مرغ همچنین غنی از <strong>کولین</strong> است؛  
          ماده‌ای ضروری برای حافظه و یادگیری.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧲 بخش ۳ — آهن، روی و ید (مینرال‌های مغز) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۳) آهن، روی و ید — معدن‌های انرژی مغز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/minerals" />

        <p>
          کمبود آهن بزرگ‌ترین عامل کاهش تمرکز و تأخیر شناختی در کودکان است.  
          روی برای رشد سلول‌های عصبی و ید برای هورمون‌های مغزی ضروری است.
        </p>

        <p className="font-semibold text-yellow-700">منابع غذایی:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>گوشت گوسفند یا گوساله</li>
          <li>جگر (بر اساس توصیه پزشک)</li>
          <li>حبوبات پخته</li>
          <li>ماهی</li>
          <li>تخم‌مرغ</li>
          <li>نان و غلات غنی‌شده</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🍓 بخش ۴ — آنتی‌اکسیدان‌ها (محافظ نورون‌ها) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۴) میوه‌ها و سبزیجات رنگی — آنتی‌اکسیدان‌های مغز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/antioxidants" />

        <p>
          رنگ‌های طبیعی میوه‌ها و سبزیجات نشان‌دهنده وجود آنتی‌اکسیدان‌ها هستند؛  
          موادی که از نورون‌ها در برابر آسیب محافظت می‌کنند.
        </p>

        <p className="font-semibold text-yellow-700">
          بهترین غذاهای رنگی برای مغز:
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>توت‌فرنگی، تمشک، بلوبری</li>
          <li>کدوحلوایی</li>
          <li>هویج</li>
          <li>اسفناج و کلم</li>
          <li>چغندر</li>
          <li>سیب و گلابی</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🥑 بخش ۵ — چربی‌های طبیعی سالم */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۵) چربی‌های گیاهی سالم — سوخت آرام مغز
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/healthy-fats" />

        <p>
          چربی‌های گیاهی به کودک انرژی پایدار می‌دهند و رشد مغز را تقویت می‌کنند.
        </p>

        <p className="font-semibold text-yellow-700">بهترین منابع:</p>

        <ul className="list-disc pr-6 space-y-2">
          <li>آووکادو (پوره‌شده)</li>
          <li>روغن زیتون</li>
          <li>کره بادام‌زمینی طبیعی (برای +۲ سال)</li>
          <li>کنجد و ارده</li>
        </ul>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۶ — غذاهایی که تمرکز کودک را کاهش می‌دهند */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-red-700">
          ۶) غذاهای کاهش‌دهنده تمرکز و یادگیری
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/unhealthy" />

        <ul className="list-disc pr-6 space-y-2">
          <li>شکر و شیرینی</li>
          <li>غذاهای فرآوری‌شده</li>
          <li>چیپس و پفک</li>
          <li>نوشابه و آبمیوه‌های صنعتی</li>
          <li>چربی ترانس</li>
        </ul>

        <p className="font-semibold text-red-700">
          این غذاها باعث التهاب، بی‌قراری و کاهش توجه می‌شوند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* ✨ جمع‌بندی ژنینویی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: مغز قوی، آینده قوی
        </p>

        <HorizontalScrollGallery folder="articles/child-nutrition/brain-foods/summary" />

        <p>
          مغز کودک به مواد غذایی خاصی نیاز دارد تا مسیر نورونی، تمرکز، حافظه و رفتار او به بهترین شکل رشد کند.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>امگا-۳ و چربی‌های سالم</li>
          <li>پروتئین‌های باکیفیت</li>
          <li>آهن، روی و ید</li>
          <li>میوه و سبزیجات رنگی</li>
          <li>پرهیز از غذاهای مضر</li>
        </ul>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «غذای خوب یعنی مغز خوب؛  
            مغز خوب یعنی آینده‌ای قوی‌تر برای کودک.»
          </p>
        </div>

      </div>

    </GeninoArticleTemplate>
  );
}
