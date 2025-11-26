import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function HealthyFamilyCommunicationArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          نحوه صحیح گفت‌وگو در خانواده
          <br />
          <span className="inline-block mt-5">
            چگونه با گفتگو، امنیت هیجانی بسازیم و رابطه‌ای پایدار ایجاد کنیم؟
          </span>
        </>
      }
      description="گفت‌وگو قلب تپنده روابط خانوادگی است. نحوه صحبت کردن زن و مرد، نوع بیان نیازها و چگونگی گوش دادن، تعیین می‌کند خانه به پناهگاه امن تبدیل شود یا میدان تنش. این مقاله نگاهی علمی، روان‌شناسانه و ژنینویی به اصول گفت‌وگوی سالم در خانواده دارد."
      image="/images/articles/family-relations/healthy-communication/cover.jpg"
    >

      {/* ========================== */}
      {/* 🌟 مقدمه */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-3xl font-bold text-yellow-700">
          گفت‌وگو؛ شاهرگ رابطه
        </p>

        <p>
          بسیاری از مشکلات خانوادگی «به‌خاطر گفتن» ایجاد نمی‌شوند؛  
          بلکه به خاطر «چگونه گفتن» شکل می‌گیرند.  
        </p>

        <p className="font-semibold text-yellow-700">
          کیفیت گفت‌وگوی زن و مرد، کیفیت امنیت هیجانی کل خانواده را مشخص می‌کند.
        </p>

        <p>
          کودکانی که در خانهٔ امنِ گفت‌وگو بزرگ می‌شوند،  
          توانایی بالاتری در همدلی، مدیریت تعارض، حل مسئله و روابط اجتماعی دارند.
        </p>

      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* 🧠 بخش ۱ — مغز انسان گفتگو را چگونه پردازش می‌کند؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۱) علوم مغز: چرا نحوه گفت‌وگو اینقدر مهم است؟
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/brain" />

        <p>
          مغز دو بخش کلیدی دارد که گفت‌وگو را پردازش می‌کنند:
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>
            <strong>آمیگدالا (مرکز تهدید)</strong>  
            به لحن بالا، کنایه، تحقیر و قضاوت حساس است.
          </li>

          <li>
            <strong>قشر پیش‌پیشانی (مرکز منطق)</strong>  
            با لحن آرام، احترام و وضوح فعال می‌شود.
          </li>
        </ul>

        <p className="font-semibold text-yellow-700">
          نحوه بیان مهم‌تر از کلمات است؛  
          چون لحن و زبان بدن قبل از معنای جمله به مغز طرف مقابل می‌رسد.
        </p>
      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* 🎙️ بخش ۲ — اصول طلایی گفت‌وگوی سالم (نسخه ژنینویی) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۲) چهار اصل طلایی گفت‌وگو در خانواده
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/principles" />

        <ul className="list-disc pr-6 space-y-4">
          
          <li>
            <strong>۱) شفافیت در احساسات</strong>  
            به‌جای گفتن «تو همیشه...»  
            بگوییم: «من احساس می‌کنم...»
          </li>

          <li>
            <strong>۲) لحن آرام حتی در اختلاف</strong>  
            لحن مهم‌ترین پیام را به مغز می‌رساند، نه کلمات.
          </li>

          <li>
            <strong>۳) توقف سالم هنگام هیجان بالا</strong>  
            وقتی مغز در حالت تهدید است، گفت‌وگو بی‌فایده است.
          </li>

          <li>
            <strong>۴) تمرکز بر حل مسئله، نه سرزنش</strong>  
            پرسش طلایی ژنینو:  
            «الان چه راه‌حلی می‌تواند کمک کند؟»
          </li>

        </ul>

        <p className="font-semibold text-yellow-700">
          گفت‌وگو باید «در کنار هم» انجام شود، نه «روبروی هم».
        </p>

      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* 👂 بخش ۳ — هنر گوش دادن فعال (Active Listening) */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۳) شنیدن؛ مهارتی مهم‌تر از حرف‌زدن
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/listening" />

        <p>
          تحقیقات نشان می‌دهد اختلافات زمانی حل می‌شوند که حداقل یک نفر  
          «شنیده‌شدن» را تجربه کند.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>نگاه چشم‌به‌چشم</li>
          <li>تکرار بخش کوتاهی از حرف طرف مقابل برای نشان دادن توجه</li>
          <li>پرسیدن سؤال روشن‌ساز: «منظورت این بود که…؟»</li>
          <li>عدم قطع‌کردن صحبت</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          گوش دادن فعال یعنی: طرف مقابل احساس کند «مهم است».
        </p>
      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* ⚠️ بخش ۴ — اشتباهات رایج در گفت‌وگو */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-red-700">
          ۴) رفتارهایی که گفت‌وگو را نابود می‌کنند
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/mistakes" />

        <ul className="list-disc pr-6 space-y-4">
          <li>کنایه زدن</li>
          <li>تحقیر کردن</li>
          <li>قضاوت و طبقه‌بندی («تو همیشه…»، «تو هیچوقت…»)</li>
          <li>بلند کردن صدا</li>
          <li>قطع کردن حرف طرف مقابل</li>
          <li>بحث کردن برای «بردن»، نه «حل کردن»</li>
        </ul>

        <p className="font-semibold text-red-700">
          هر جملهٔ تحقیرآمیز، مغز طرف مقابل را وارد حالت دفاعی می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* 💡 بخش ۵ — چگونه اختلاف را به گفت‌وگو تبدیل کنیم؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۵) فرمول ژنینویی برای حل اختلافات خانوادگی
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/solutions" />

        <ul className="list-disc pr-6 space-y-4">
          <li>آرام‌سازی ۵ دقیقه‌ای (چای، نفس عمیق، فاصله کوتاه)</li>
          <li>بیان احساس ← تعریف مشکل ← پیشنهاد راه‌حل</li>
          <li>پرهیز از جمله‌های مبهم؛ استفاده از درخواست واضح</li>
          <li>مذاکره، نه مقاومت</li>
          <li>نوشتن توافق‌های رفتاری کوچک</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          اختلاف طبیعی است؛  
          نحوهٔ حل آن، کیفیت رابطه را می‌سازد—not نبودن اختلاف.
        </p>

      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* 👶 بخش ۶ — اثر گفت‌وگوی والدین بر مغز کودک */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          ۶) خانه‌ای که گفتگو در آن جریان دارد، کودک را قوی‌تر می‌کند
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/child" />

        <p>
          کودکان مثل آینهٔ روابط والدین هستند.  
          نحوهٔ گفت‌وگوی زن و مرد، شکل تفکر، ارتباط و احساس کودک را می‌سازد.
        </p>

        <ul className="list-disc pr-6 space-y-3">
          <li>تقویت عزت‌نفس</li>
          <li>توانایی حل مسئله و مذاکره</li>
          <li>کاهش اضطراب</li>
          <li>بهبود تمرکز و یادگیری</li>
          <li>روابط اجتماعی سالم در نوجوانی و بزرگسالی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          کودکانی که «گفت‌وگو» را می‌بینند، «گفت‌وگو» را یاد می‌گیرند.
        </p>

      </div>

      <GoldenDivider className="my-10" />


      {/* ========================== */}
      {/* 🌟 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: گفت‌وگو هنر ساختن یک خانهٔ امن است
        </p>

        <HorizontalScrollGallery folder="articles/family-relations/healthy-communication/summary" />

        <p>
          گفت‌وگو فقط انتقال کلمات نیست؛  
          انتقال عشق، احترام، هم‌دلی و امنیت هیجانی است.
        </p>

        <ul className="list-disc pr-6 space-y-2">
          <li>بیان احساسات بدون سرزنش</li>
          <li>گوش‌دادن فعال</li>
          <li>مدیریت لحن و هیجان</li>
          <li>حل مسئله‌ی مشترک</li>
          <li>پرهیز از تحقیر و کنایه</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «گفت‌وگو خانه را گرم می‌کند؛  
            و قلب‌ها را به هم نزدیک‌تر.»
          </p>
        </div>
      </div>
    </GeninoArticleTemplate>
  );
}
