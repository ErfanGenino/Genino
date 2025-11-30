import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function CognitiveDevelopmentFromBirthToEarlyYearsArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          رشد شناختی کودکان؛ از تولد تا سال‌های اولیه
          <br />
          <span className="inline-block mt-5">
            چگونه مغز کودک فکر کردن، یادگیری، حل مسئله و شناخت دنیا را می‌آموزد؟
          </span>
        </>
      }
      description="رشد شناختی شامل مهارت‌هایی مانند توجه، حافظه، زبان، حل مسئله و درک جهان است. این رشد از همان روزهای اول تولد آغاز می‌شود و سال‌های اولیه زندگی، حساس‌ترین و تأثیرگذارترین دوره برای شکل‌گیری توانایی‌های ذهنی کودک است. این مقاله نگاهی علمی و ژنینویی به مراحل رشد شناختی و نیازهای کودک در این دوره ارائه می‌دهد."
      image="/images/articles/child-care/cognitive-development/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          رشد شناختی = ستون یادگیری و هوش آینده کودک
        </p>

        <p>
          ذهن کودک از لحظه تولد شروع به ساختن مسیرهای عصبی می‌کند.  
          هر تجربه — لمس، نگاه، صدا، بازی و تعامل — یک اتصال عصبی جدید می‌سازد.
        </p>

        <p>
          کودکی که در محیطی غنی از گفت‌وگو، بازی و تعامل رشد می‌کند،  
          <strong>پایه ذهنی قوی‌تری برای آینده تحصیلی و اجتماعی خود خواهد داشت.</strong>
        </p>

        <p className="font-semibold text-yellow-700">
          سال‌های اولیه = قوی‌ترین دوره شکل‌گیری زیرساخت‌های تفکر
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ — رشد شناختی از تولد تا یک سالگی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-emerald-700">
          ۱) تولد تا ۱۲ ماهگی: شروع شناخت جهان
        </p>

        <HorizontalScrollGallery folder="articles/child-care/cognitive-development/0-1" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تشخیص چهره مادر</li>
          <li>پیگیری اشیا با چشم</li>
          <li>واکنش به صداها</li>
          <li>درک علت و معلول (مثلاً صدای اسباب‌بازی)</li>
          <li>شروع درک «باقی بودن شیء» (Object Permanence)</li>
        </ul>

        <p className="font-semibold text-emerald-700">
          بازی‌های ساده با صدا، آینه و لمس، قوی‌ترین محرک‌های شناختی این سن هستند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧩 بخش ۲ — رشد شناختی در ۱ تا ۲ سالگی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۲) یک تا دو سالگی: کشف و تجربه‌گری
        </p>

        <HorizontalScrollGallery folder="articles/child-care/cognitive-development/1-2" />

        <ul className="list-disc pr-6 space-y-3">
          <li>افزایش مهارت‌های حل مسئله</li>
          <li>تقلید رفتارهای دیگران</li>
          <li>درک دستورات ساده</li>
          <li>گسترش سریع دایره لغات</li>
          <li>کنجکاوی شدید نسبت به محیط</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          پرسش‌گری کودک در این سن، نشانه سلامت شناختی است؛  
          هرگز آن را خاموش نکنید.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۳ — رشد شناختی در ۲ تا ۳ سالگی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۳) دو تا سه سالگی: پایه‌های تفکر منطقی
        </p>

        <HorizontalScrollGallery folder="articles/child-care/cognitive-development/2-3" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تشخیص رنگ‌ها و شکل‌ها</li>
          <li>درک مفاهیم ساده مثل بزرگ/کوچک</li>
          <li>حل معماهای ساده</li>
          <li>افزایش قابل توجه حافظه</li>
          <li>توانایی دنبال کردن دو دستور پشت سر هم</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بازی‌های فکری ساده بهترین سرمایه‌گذاری برای آیندهٔ ذهنی کودک‌اند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌱 بخش ۴ — نقش والدین در رشد شناختی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-emerald-700">
          ۴) والدین چطور رشد شناختی را تقویت می‌کنند؟
        </p>

        <HorizontalScrollGallery folder="articles/child-care/cognitive-development/parent-role" />

        <ul className="list-disc pr-6 space-y-4">
          <li><strong>گفت‌وگوی روزانه</strong> — مغز کودک با زبان رشد می‌کند</li>
          <li><strong>قصه‌گویی</strong> — حافظه و تخیل را فعال می‌کند</li>
          <li><strong>بازی آزاد</strong> — قدرت تصمیم‌گیری و حل مسئله</li>
          <li><strong>کاهش محرک‌های دیجیتالی</strong></li>
          <li><strong>تشویق به کنجکاوی و پرسش‌گری</strong></li>
        </ul>

        <p className="font-semibold text-emerald-700">
          حضور والدین مهم‌تر از هر اسباب‌بازی یا ابزار آموزشی است.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🎨 بخش ۵ — بازی‌ها و فعالیت‌های تقویت‌کنندهٔ شناخت */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۵) بهترین فعالیت‌ها برای رشد ذهنی کودک
        </p>

        <HorizontalScrollGallery folder="articles/child-care/cognitive-development/activities" />

        <ul className="list-disc pr-6 space-y-3">
          <li>پازل‌های ساده</li>
          <li>بازی با مکعب‌ها</li>
          <li>نقاشی با انگشت</li>
          <li>بازی‌های پیدا کن و پیدا کن</li>
          <li>شن‌بازی و آب‌بازی</li>
          <li>بازی‌های تقلیدی (خانه‌بازی)</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بهترین بازی‌ها آن‌هایی هستند که «مغز + بدن + احساس» را هم‌زمان فعال کنند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: ذهن کودک در سال‌های اولیه، یک جهان در حال ساخت است
        </p>

        <HorizontalScrollGallery folder="articles/child-care/cognitive-development/summary" />

        <p>
          رشد شناختی از همان روزهای اول شروع می‌شود و هر تجربه‌ای در این سال‌ها  
          یک مسیر عصبی جدید می‌سازد.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>صحبت کردن با کودک</li>
          <li>قصه‌های روزانه</li>
          <li>بازی‌های اکتشافی</li>
          <li>کاهش موبایل و تلویزیون</li>
          <li>تشویق کنجکاوی</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl text-center shadow-md">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «ذهن کودک با عشق، تجربه و بازی رشد می‌کند؛  
            نه با عجله و فشار.»
          </p>
        </div>

      </div>
    </GeninoArticleTemplate>
  );
}
