import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function CommonRelationshipMistakesCouplesShouldAvoidArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          اشتباهات رایج زوجین که باید از آن‌ها دوری کرد
          <br />
          <span className="inline-block mt-5">
            رفتارهای کوچکی که آرام‌آرام رابطه را فرسوده می‌کنند و باید متوقف شوند
          </span>
        </>
      }
      description="زوجین معمولاً با رفتارهای کوچک و تکراری، نه اتفاقات بزرگ، به رابطه آسیب می‌زنند. بسیاری از این اشتباهات از ناآگاهی یا الگوهای اشتباه خانوادگی می‌آیند. این مقاله نگاهی ژنینویی و علمی به مهم‌ترین اشتباهات رایج زوج‌ها دارد و راهکارهای عملی برای جلوگیری از آن‌ها ارائه می‌دهد."
      image="/images/articles/family-relations/common-mistakes/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-3xl font-bold text-yellow-700">
          رابطه‌ها با «بی‌توجهی‌های کوچک» خراب می‌شوند؛ نه با یک اتفاق بزرگ
        </p>

        <p>
          اکثر رابطه‌ها از یک اشتباه ناگهانی نابود نمی‌شوند؛  
          بلکه از <strong>رفتارهای کوچک و تکراری</strong> که نادیده گرفته می‌شوند.
        </p>

        <p>
          اشتباهات رایج زوجین قابل شناسایی و قابل اصلاح‌اند.  
          کافی است بدانیم <strong>کجا باید توقف کنیم و کجا باید تغییر دهیم.</strong>
        </p>

        <p className="font-semibold text-yellow-700">
          آگاهی = پیشگیری از فرسودگی رابطه  
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* ⚠️ بخش ۱ — بی‌توجهی به نیازهای احساسی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-red-700">
          ۱) نادیده گرفتن نیازهای احساسی
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/emotional-needs" />

        <p>یکی از مخرب‌ترین اشتباهات:</p>

        <ul className="list-disc pr-6 space-y-3">
          <li>کم‌توجهی به احساسات همسر</li>
          <li>فکر کردن اینکه «خودش خوب می‌شه»</li>
          <li>نادیده‌گرفتن نشانه‌های ناراحتی</li>
          <li>بی‌محبتی روزمره</li>
        </ul>

        <p className="font-semibold text-red-700">
          نیازهای احساسی، ستون رابطه‌اند؛  
          بی‌توجهی = خاموش شدن پیوند عاطفی
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🗣 بخش ۲ — بدرفتاری در هنگام تعارض */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۲) مدیریت نادرست تعارض‌ها
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/conflict" />

        <p>اشتباهات رایج در تعارض:</p>

        <ul className="list-disc pr-6 space-y-3">
          <li>بلند کردن صدا</li>
          <li>قطع کردن حرف همسر</li>
          <li>تحقیر یا تمسخر</li>
          <li>قهرهای طولانی</li>
          <li>توهین و برچسب‌زدن</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تعارض سالم می‌تواند رابطه را قوی کند،  
          اما تعارض مخرب، آن را می‌شکند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🤐 بخش ۳ — سکوت‌های طولانی و فاصله گرفتن */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-red-700">
          ۳) سکوت طولانی؛ قاتل آرام رابطه
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/silence" />

        <p>بعضی‌ها فکر می‌کنند سکوت = حل مشکل.</p>

        <ul className="list-disc pr-6 space-y-3">
          <li>بی‌تفاوتی ظاهری</li>
          <li>عدم توضیح احساسات</li>
          <li>اجتناب از گفت‌وگو</li>
        </ul>

        <p className="font-semibold text-red-700">
          سکوتِ طولانی، فاصلهٔ احساسی ایجاد می‌کند، نه صلح.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 📱 بخش ۴ — وابستگی بیش از حد به موبایل و حواس‌پرتی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۴) حواس‌پرتی دیجیتال؛ دشمن صمیمیت
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/phone" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تماشای مداوم موبایل هنگام بودن با همسر</li>
          <li>نبود حضور واقعی در لحظات مشترک</li>
          <li>کم‌رنگ شدن گفت‌وگوهای روزانه</li>
        </ul>

        <p className="font-semibold text-yellow-700">
            حضور جسمی ≠ حضور عاطفی،
          حضور عاطفی فقط وقتی است که «حواسمان به هم» باشد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧩 بخش ۵ — توقعات نابرابر و نقش‌های مبهم */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۵) تقسیم ناعادلانه نقش‌ها
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/roles" />

        <p>وقتی نقش‌ها مشخص نباشند، رابطه فرسوده می‌شود.</p>

        <ul className="list-disc pr-6 space-y-3">
          <li>انتظارهای سنتی بدون توافق</li>
          <li>بی‌عدالتی در وظایف خانه</li>
          <li>یک‌طرفه شدن مسئولیت‌ها</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          نقش‌ها باید «توافقی، شفاف و عادلانه» باشند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 💔 بخش ۶ — انتقاد دائمی و تمرکز بر ضعف‌ها */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-red-700">
          ۶) انتقاد مداوم؛ فرسایش احساسی
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/criticism" />

        <p>هیچ انسانی تحمل انتقاد دائمی را ندارد.</p>

        <ul className="list-disc pr-6 space-y-3">
          <li>گیر دادن به جزئیات</li>
          <li>مقایسه با دیگران</li>
          <li>ندیدن پیشرفت‌های کوچک</li>
        </ul>

        <p className="font-semibold text-red-700">
          انتقاد زیاد، خیانت عاطفی خاموش است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: رابطه سالم یعنی پرهیز از اشتباهات تکراری
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/common-mistakes/summary" />

        <p>
          رابطه‌ها با تلاش مشترک، آگاهی و شفافیت قوی می‌شوند.  
          کافی است اشتباهات را بشناسیم و قبل از اینکه تبدیل به زخم شوند، اصلاحشان کنیم.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>توجه احساسی روزانه</li>
          <li>گفت‌وگوی محترمانه</li>
          <li>تقسیم عادلانه نقش‌ها</li>
          <li>کاهش حواس‌پرتی‌های دیجیتال</li>
          <li>پرهیز از تحقیر، سکوت طولانی و بی‌تفاوتی</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl text-center shadow-md">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «رابطه سالم ساخته می‌شود،  
            با پرهیز از اشتباهات کوچک و انتخاب‌های درست روزانه.»
          </p>
        </div>

      </div>
    </GeninoArticleTemplate>
  );
}
