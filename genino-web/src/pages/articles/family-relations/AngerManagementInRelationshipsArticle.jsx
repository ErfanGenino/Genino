import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function AngerManagementInRelationshipsArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          مدیریت خشم در رابطهٔ زوجین
          <br />
          <span className="inline-block mt-5">
            چطور خشم را بدون آسیب، بدون تحقیر و بدون فاصلهٔ عاطفی مدیریت کنیم؟
          </span>
        </>
      }
      description="خشم یکی از طبیعی‌ترین احساسات انسان است، اما اگر درست مدیریت نشود، می‌تواند رابطه را تخریب کند. این مقاله یک نگاه علمی و ژنینویی به خشم، چرایی آن، رفتارهای ناشی از آن و شیوه‌های مدیریت سالم آن در رابطه زوجین ارائه می‌دهد."
      image="/images/articles/family-relations/anger-management/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          خشم دشمن رابطه نیست؛ مدیریت نشدنِ آن دشمن است
        </p>

        <p>
          خشم یک احساس طبیعی، ضروری و حتی محافظتی است.  
          اما وقتی تبدیل به فریاد، تحقیر، طعنه، قهر یا بی‌احترامی شود،  
          رابطه را از درون می‌سوزاند.
        </p>

        <p>
          زوج‌هایی که خشم را درست مدیریت می‌کنند،  
          <strong>به‌ترتیب: کمتر آسیب می‌بینند، سریع‌تر نزدیک می‌شوند و احساس امنیت بیشتری دارند.</strong>
        </p>

        <p className="font-semibold text-yellow-700">
          مدیریت خشم مهارت است؛ نه یک ویژگی ذاتی.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ — خشم چگونه در مغز شکل می‌گیرد؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۱) مغز در هنگام خشم چه می‌کند؟
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/anger-management/brain" />

        <p>
          وقتی خشم فعال می‌شود، بخش «آمیگدالا» فرمان حمله یا دفاع صادر می‌کند.  
          در این حالت:
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>تفکر منطقی کاهش پیدا می‌کند</li>
          <li>توان گوش‌دادن پایین می‌آید</li>
          <li>لحن تند و رفتارهای واکنشی ظاهر می‌شوند</li>
          <li>بدن وارد حالت آماده‌باش می‌شود</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          در لحظهٔ خشم، فرد نیاز به «آرام‌سازی» دارد، نه «بحث منطقی».
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔥 بخش ۲ — نشانه‌های هشداردهندهٔ خشم ناسالم */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-red-700">
          ۲) این رفتارها نشان‌دهندهٔ خشمِ ناسالم هستند
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/anger-management/redflags" />

        <ul className="list-disc pr-6 space-y-4">
          <li><strong>بلند کردن صدا</strong></li>
          <li><strong>قطع کردن حرف طرف مقابل</strong></li>
          <li><strong>تحقیر، تمسخر یا بی‌احترامی</strong></li>
          <li><strong>قهرهای طولانی</strong></li>
          <li><strong>خشونت کلامی</strong></li>
          <li><strong>خشونت غیرکلامی (کوبیدن در، پرت کردن اشیا)</strong></li>
          <li><strong>منطق‌گریزی در بحث</strong></li>
          <li><strong>کنترل‌گری یا تهدید</strong></li>
        </ul>

        <p className="font-semibold text-red-700">
          اگر این رفتارها تکرار شوند، رابطه وارد «منطقهٔ ناامن» می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🛡 بخش ۳ — راهکارهای فوری برای آرام‌سازی خشم (در لحظه) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۳) راهکارهای ژنینویی برای کنترل خشم «در لحظه»
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/anger-management/immediate" />

        <ul className="list-disc pr-6 space-y-4">
          <li><strong>تنفس عمیق و آرام‌سازی بدنی</strong> — ۴ ثانیه دم، ۶ ثانیه بازدم</li>
          <li><strong>وقفهٔ سالم</strong> — ۱۰ تا ۱۵ دقیقه دور شدن برای آرام شدن مغز</li>
          <li><strong>تعویق گفت‌وگو</strong> — «الان عصبانی‌ام، اجازه بده بعداً صحبت کنیم.»</li>
          <li><strong>استفاده نکردن از کلمات قطعی</strong> — «همیشه»، «هیچ‌وقت»، «تو آدم…»</li>
          <li><strong>تغییر محیط</strong> — عوض کردن اتاق یا قدم زدن</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          هدف در لحظهٔ خشم:  
          «بازگرداندن مغز از حالت جنگ، به حالت همکاری.»
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 💬 بخش ۴ — چگونه بدون آسیب دربارهٔ خشم صحبت کنیم؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۴) گفت‌وگوی سالم دربارهٔ خشم
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/anger-management/communication" />

        <p>بهترین جملات برای شروع گفت‌وگو بعد از خشم:</p>

        <ul className="list-disc pr-6 space-y-3">
          <li>«می‌خوام در مورد چیزی که ناراحتم کرد، حرف بزنیم.»</li>
          <li>«وقتی X اتفاق افتاد، احساس Y کردم.»</li>
          <li>«نمی‌خوام دعوا کنیم؛ می‌خوام همو بفهمیم.»</li>
          <li>«چطور می‌تونیم این موضوع رو بهتر مدیریت کنیم؟»</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          گفت‌وگو درباره خشم = بازسازی رابطه، نه مقصرسازی.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧩 بخش ۵ — مدیریت خشم در بلندمدت */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        
        <p className="text-2xl font-bold text-yellow-700">
          ۵) مدیریت خشم در طول زمان (نسخهٔ ژنینویی)
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/anger-management/longterm" />

        <ul className="list-disc pr-6 space-y-4">
          <li><strong>تقویت مهارت همدلی</strong></li>
          <li><strong>تمرین گفت‌وگوهای منظم و کوتاه</strong></li>
          <li><strong>شناخت محرک‌های خشم</strong> (Triggers)</li>
          <li><strong>تقسیم وظایف برای کاهش فشار روانی</strong></li>
          <li><strong>ورزش و مراقبت از بدن</strong></li>
          <li><strong>درخواست کمک حرفه‌ای در صورت نیاز</strong></li>
        </ul>

        <p className="font-semibold text-yellow-700">
          خشم فقط با «رفتار» حل نمی‌شود؛  
          با «سبک زندگی» مدیریت می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: خشم را مدیریت کن، نه پنهان
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/anger-management/summary" />

        <p>
          خشم احساس بدی نیست؛ یک پیام است.  
          پیام اینکه چیزی باید تغییر کند، بهتر توضیح داده شود،  
          یا بهتر درک شود.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>وقفهٔ سالم، کلید طلایی مدیریت خشم است</li>
          <li>گفت‌وگوی بعد از خشم، رابطه را ترمیم می‌کند</li>
          <li>شناسایی محرک‌ها از تکرار رفتارهای مخرب جلوگیری می‌کند</li>
          <li>همدلی و احترام، اساس مدیریت خشم زوجین است</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «خشم را نباید سرکوب کرد؛  
            باید فهمید، مدیریت کرد و از آن برای رشد رابطه استفاده کرد.»
          </p>
        </div>

      </div>
    </GeninoArticleTemplate>
  );
}
