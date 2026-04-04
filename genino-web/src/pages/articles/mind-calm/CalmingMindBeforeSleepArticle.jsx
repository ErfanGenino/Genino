import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function CalmingMindBeforeSleepArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          آرام‌سازی ذهن قبل از خواب
          <br />
          <span className="inline-block mt-5">
            چگونه ذهن شلوغ را برای خوابی عمیق آماده کنیم
          </span>
        </>
      }
      description="ذهن بسیاری از افراد در لحظه‌ای که بدن آماده خواب است، همچنان فعال باقی می‌ماند. این مقاله به‌صورت علمی توضیح می‌دهد چرا ذهن قبل از خواب فعال می‌شود و چه روش‌های اثبات‌شده‌ای برای آرام‌سازی ذهن و رسیدن به خوابی عمیق وجود دارد."
      image="/images/articles/mind-calm/calming-before-sleep/cover.jpg"
    >
      {/* ========================== */}
      {/* 🌟 مقدمه مقاله */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          خواب عمیق زمانی آغاز می‌شود که ذهن آرام می‌شود
        </p>

        <p>
          بسیاری از افراد تصور می‌کنند بی‌خوابی به دلیل کمبود خستگی است،
          اما در واقع در بسیاری از موارد مشکل اصلی{" "}
          <strong>فعال بودن ذهن</strong> است.
        </p>

        <p>
          ممکن است بدن کاملاً خسته باشد، اما ذهن همچنان در حال فکر کردن،
          تحلیل کردن، برنامه‌ریزی برای فردا یا مرور اتفاقات روز باشد.
        </p>

        <p>
          تحقیقات علوم اعصاب نشان می‌دهد که برای شروع خواب، مغز باید از حالت{" "}
          <strong>هوشیاری شناختی</strong>{" "}
          به حالت{" "}
          <strong>آرامش عصبی</strong>{" "}
          منتقل شود.
        </p>

        <p>
          اگر ذهن همچنان درگیر نگرانی، تحلیل یا تحریک دیجیتال باشد، این انتقال
          به‌سختی اتفاق می‌افتد و خواب به تعویق می‌افتد.
        </p>

        <p className="font-semibold text-yellow-700">
          آرام‌سازی ذهن قبل از خواب یکی از مهم‌ترین مهارت‌های سلامت روان و کیفیت خواب است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧠 بخش ۱ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا ذهن قبل از خواب فعال می‌شود؟
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/brain" />

        <p>
          در طول روز مغز دائماً با محرک‌های بیرونی درگیر است: کار، گفت‌وگو،
          تصمیم‌گیری، پیام‌ها، اطلاعات و فشارهای روزمره.
        </p>

        <p>
          زمانی که شب فرا می‌رسد و محرک‌های بیرونی کاهش پیدا می‌کنند، ذهن فرصت
          پیدا می‌کند تا{" "}
          <strong>افکار سرکوب‌شده روز</strong>{" "}
          را پردازش کند.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>مرور اتفاقات روز</li>
          <li>تحلیل اشتباهات یا نگرانی‌ها</li>
          <li>برنامه‌ریزی برای فردا</li>
          <li>پردازش احساسات حل‌نشده</li>
          <li>فعال شدن سیستم هشدار مغز</li>
        </ul>

        <p>
          در علوم اعصاب این حالت را{" "}
          <strong>Hyperarousal</strong>{" "}
          می‌نامند؛ یعنی مغز بیش از حد در حالت بیداری باقی مانده و نمی‌تواند
          به‌راحتی وارد فاز استراحت شود.
        </p>

        <p className="font-semibold text-yellow-700">
          خیلی وقت‌ها مشکل خواب، خسته نبودن بدن نیست؛ آرام نشدن ذهن است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧬 بخش ۲ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) هورمون‌های مهم خواب و نقش ذهن در آن‌ها
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/sleep" />

        <p>
          کیفیت خواب فقط به خستگی بدن وابسته نیست؛ بلکه به تعادل شیمیایی بدن و
          مغز هم مربوط است.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>
            <strong>ملاتونین</strong>{" "}
            هورمون اصلی خواب است که در تاریکی بیشتر ترشح می‌شود و به مغز پیام
            می‌دهد زمان استراحت فرا رسیده است.
          </li>
          <li>
            <strong>کورتیزول</strong>{" "}
            هورمون استرس است. اگر ذهن پیش از خواب درگیر نگرانی باشد، سطح آن بالا
            باقی می‌ماند.
          </li>
          <li>
            <strong>آدنوزین</strong>{" "}
            ماده‌ای طبیعی در مغز است که در طول روز جمع می‌شود و احساس خواب‌آلودگی
            ایجاد می‌کند.
          </li>
        </ul>

        <p>
          وقتی فرد پیش از خواب درگیر استرس، اخبار منفی، موبایل یا نشخوار فکری
          باشد، سطح کورتیزول بالا می‌ماند و روند طبیعی خواب مختل می‌شود.
        </p>

        <p className="font-semibold text-yellow-700">
          ذهن آرام به بدن کمک می‌کند ملاتونین بهتر عمل کند و مسیر خواب طبیعی‌تر شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌬 بخش ۳ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) تمرین‌های تنفسی برای آرام‌سازی ذهن
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/breathing" />

        <p>
          یکی از سریع‌ترین راه‌های آرام کردن مغز و بدن، آهسته کردن تنفس است.
          تنفس آرام به فعال شدن سیستم عصبی پاراسمپاتیک کمک می‌کند؛ سیستمی که
          مسئول آرامش و بازیابی بدن است.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>۴ ثانیه دم آرام از بینی</li>
          <li>۲ ثانیه مکث کوتاه</li>
          <li>۶ ثانیه بازدم آرام از دهان</li>
          <li>۵ تا ۱۰ بار تکرار</li>
        </ul>

        <p>
          این نوع تنفس می‌تواند ضربان قلب را پایین بیاورد، تنش عضلات را کم کند و
          پیام «خطر تمام شده است» را به مغز منتقل کند.
        </p>

        <p className="font-semibold text-yellow-700">
          هرچه بازدم آرام‌تر و طولانی‌تر باشد، بدن راحت‌تر وارد حالت استراحت می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🛏 بخش ۴ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۴) روتین ذهنی سالم قبل از خواب
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/routine" />

        <p>
          مغز انسان به الگوهای تکراری بسیار حساس است. اگر هر شب مجموعه‌ای از
          رفتارهای آرام‌بخش را تکرار کنید، مغز کم‌کم یاد می‌گیرد که این الگوها
          نشانه نزدیک شدن زمان خواب هستند.
        </p>

        <p>
          این موضوع باعث می‌شود مغز سریع‌تر از حالت فعالیت روزانه به حالت آرامش
          شبانه منتقل شود.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>نوشتن نگرانی‌ها و کارهای فردا روی کاغذ</li>
          <li>مطالعه چند صفحه کتاب سبک و آرام</li>
          <li>خاموش کردن موبایل یا کنار گذاشتن آن</li>
          <li>کم کردن نور محیط</li>
          <li>گوش دادن به موسیقی آرام یا صداهای طبیعت</li>
          <li>شستن صورت یا دوش کوتاه با آب ولرم</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          روتین شبانه یعنی فرستادن یک پیام تکراری و مطمئن به مغز: «وقت استراحت رسیده است».
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🍵 بخش ۵ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۵) تغذیه مناسب قبل از خواب
        </p>

        <p>
          آنچه در ساعات پایانی روز می‌خوریم یا می‌نوشیم می‌تواند بر کیفیت خواب
          اثر بگذارد. بعضی خوراکی‌ها به آرامش بدن کمک می‌کنند و بعضی دیگر سیستم
          عصبی را بیدار نگه می‌دارند.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>موز به دلیل داشتن منیزیم و پتاسیم</li>
          <li>گردو و بادام به دلیل چربی‌های مفید و مواد معدنی</li>
          <li>شیر گرم برای ایجاد حس آرامش در برخی افراد</li>
          <li>دمنوش بابونه در صورت سازگاری بدن</li>
          <li>وعده سبک و ساده به‌جای غذای سنگین در آخر شب</li>
        </ul>

        <p>
          در مقابل، مصرف قهوه، چای پررنگ، نوشابه‌های انرژی‌زا، غذای سنگین،
          غذاهای بسیار چرب یا بسیار تند در ساعات نزدیک خواب می‌تواند کیفیت خواب
          را پایین بیاورد.
        </p>

        <p className="font-semibold text-yellow-700">
          بدن برای خواب آرام، به شب سبک و آرام نیاز دارد؛ نه به هضم سنگین و تحریک عصبی.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🚫 بخش ۶ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۶) اشتباهات رایج قبل از خواب
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>استفاده از موبایل در رختخواب</li>
          <li>مرور شبکه‌های اجتماعی یا اخبار استرس‌زا</li>
          <li>بحث‌های احساسی یا فکری سنگین در آخر شب</li>
          <li>انتظار خواب فوری و تحت فشار گذاشتن خود</li>
          <li>مصرف کافئین در ساعات پایانی روز</li>
          <li>خوابیدن در محیط پرنور یا پرسر‌و‌صدا</li>
        </ul>

        <p>
          یکی از اشتباهات مهم این است که فرد سعی می‌کند خودش را مجبور به خواب
          کند. هرچه فشار ذهنی بیشتر شود، خواب دورتر می‌شود.
        </p>

        <p className="font-semibold text-red-700">
          خواب را نمی‌شود مجبور کرد؛ باید شرایطش را فراهم کرد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🌟 جمع‌بندی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: ذهن آرام، خواب عمیق
        </p>

        <HorizontalScrollGallery folder="articles/mind-calm/calming-before-sleep/summary" />

        <p>
          خواب خوب فقط خاموش شدن چشم‌ها نیست؛ بلکه نتیجه آرام شدن تدریجی مغز،
          تنظیم هورمون‌ها، کاهش تنش عصبی و ایجاد یک روتین سالم شبانه است.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>فعال بودن ذهن یکی از مهم‌ترین دلایل سخت خوابیدن است</li>
          <li>تنفس آرام می‌تواند بدن و مغز را وارد مسیر استراحت کند</li>
          <li>روتین شبانه کیفیت خواب را به شکل محسوسی بهتر می‌کند</li>
          <li>نور کم، کاهش صفحه‌نمایش و سبک کردن شب بسیار مهم است</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «خواب عمیق نتیجه ذهنی آرام است؛ هر شب فرصتی تازه برای رها کردن فشارها
            و بازسازی جان و بدن ماست.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 📚 منابع */}
      {/* ========================== */}

      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع علمی</p>
        <p>
          National Sleep Foundation | Harvard Medical School – Sleep and Mental
          Health | Cleveland Clinic – Sleep Hygiene | Sleep Research Society
        </p>
      </div>
    </GeninoArticleTemplate>
  );
}