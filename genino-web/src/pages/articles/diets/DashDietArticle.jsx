import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function DashDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم DASH؛ الگوی علمی برای کنترل فشار خون و سلامت قلب"
      description="راهنمای کامل، ساده و کاربردی برای شناخت رژیم DASH، اصول اجرایی آن، فوایدش برای فشار خون و قلب، و روش اجرای درست آن در زندگی روزمره."
      image="/images/articles/diets/dash-diet/cover.jpg"
    >

      {/* ========================== */}
      {/* 🟢 بخش اول: رژیم DASH چیست؟ */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم DASH چیست؟ (DASH Diet)
        </p>

        <p>
          DASH مخفف عبارت{" "}
          <strong>Dietary Approaches to Stop Hypertension</strong>
          {" "}است؛ یعنی:
          <br />
          <strong>«رویکردهای تغذیه‌ای برای کمک به توقف یا کنترل فشار خون بالا»</strong>
        </p>

        <p>
          این رژیم یک الگوی غذایی علمی است که برای کمک به سلامت قلب و کنترل فشار خون طراحی شده.
          رژیم DASH بر این اصل استوار است که بعضی غذاها می‌توانند به بدن کمک کنند
          تا تعادل بهتری در سدیم، پتاسیم، منیزیم، کلسیم و فیبر داشته باشد.
        </p>

        <p>
          در رژیم DASH معمولاً این گروه‌ها بیشتر دیده می‌شوند:
        </p>

        <p>
          • سبزیجات (Vegetables) <br />
          • میوه‌ها (Fruits) <br />
          • غلات کامل (Whole Grains) <br />
          • لبنیات کم‌چرب (Low-Fat Dairy) <br />
          • حبوبات و مغزها (Legumes & Nuts) <br />
          • پروتئین‌های کم‌چرب مثل مرغ و ماهی
        </p>

        <p>
          و در مقابل، این موارد محدودتر می‌شوند:
        </p>

        <p>
          • نمک زیاد (Sodium) <br />
          • غذاهای فرآوری‌شده <br />
          • گوشت‌های پرچرب و فرآوری‌شده <br />
          • شیرینی‌ها و نوشیدنی‌های شیرین
        </p>

        <p>
          به زبان ساده، DASH یعنی:
          <strong> غذای طبیعی‌تر، نمک کمتر، فیبر بیشتر، و انتخاب‌هایی که برای قلب و فشار خون بهترند.</strong>
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 چرا رژیم DASH مهم است؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          چرا رژیم DASH مهم است؟
        </p>

        <HorizontalScrollGallery folder="articles/diets/dash-diet/importance" />

        <p>
          دلیل اصلی معروف شدن DASH این است که فقط یک رژیم تئوری نیست؛
          بلکه سال‌هاست در منابع پزشکی و راهنماهای سلامت قلب از آن به عنوان
          یک الگوی غذایی مفید یاد می‌شود.
        </p>

        <p>
          <strong className="text-yellow-600">۱. کمک به کنترل فشار خون</strong><br />
          مهم‌ترین کاربرد DASH کمک به مدیریت فشار خون بالا یا مرزی است.
          این رژیم برای همین هدف طراحی شده و به همین دلیل در دنیا شناخته شده است.
        </p>

        <p>
          <strong className="text-yellow-600">۲. کمک به سلامت قلب و عروق</strong><br />
          چون مصرف چربی‌های ناسالم، نمک زیاد و غذاهای صنعتی را کمتر می‌کند
          و در عوض مصرف مواد غذایی سالم‌تر را بالا می‌برد.
        </p>

        <p>
          <strong className="text-yellow-600">۳. بهبود کیفیت کلی تغذیه</strong><br />
          حتی اگر کسی فشار خون بالا نداشته باشد، باز هم DASH می‌تواند
          کیفیت تغذیه روزانه او را بهتر کند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. کمک به کاهش احتباس آب و نفخ ناشی از نمک زیاد</strong><br />
          وقتی مصرف نمک کمتر می‌شود، خیلی از افراد احساس سبک‌تر بودن و تورم کمتر دارند.
        </p>

        <p>
          <strong className="text-yellow-600">۵. مناسب برای استفاده طولانی‌مدت</strong><br />
          DASH از آن رژیم‌هایی نیست که فقط چند روز قابل تحمل باشد.
          اگر درست اجرا شود، می‌تواند تبدیل به سبک تغذیه ثابت زندگی شود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 اصول اصلی رژیم DASH */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اصول اصلی رژیم DASH
        </p>

        <HorizontalScrollGallery folder="articles/diets/dash-diet/principles" />

        <p>
          برای اجرای درست این رژیم، لازم نیست همه چیز را سخت و پیچیده کنیم.
          کافی است چند اصل کلیدی را بفهمیم:
        </p>

        <p>
          <strong className="text-yellow-700">۱) کاهش سدیم (نمک)</strong><br />
          یکی از مهم‌ترین پایه‌های DASH کم کردن مصرف نمک است.
          این یعنی فقط نمکدان روی سفره مهم نیست؛
          بلکه باید حواسمان به غذاهای بسته‌بندی‌شده، فست‌فودها، سوسیس و کالباس،
          چیپس، کنسروها و خوراکی‌های پرنمک هم باشد.
        </p>

        <p>
          <strong className="text-yellow-700">۲) افزایش پتاسیم، منیزیم و کلسیم</strong><br />
          این مواد معدنی در غذاهایی مثل میوه، سبزی، لبنیات کم‌چرب، حبوبات و مغزها وجود دارند
          و در الگوی DASH جای مهمی دارند.
        </p>

        <p>
          <strong className="text-yellow-700">۳) استفاده از غلات کامل</strong><br />
          به جای نان سفید، برنج سفید زیاد و آردهای خیلی تصفیه‌شده،
          بهتر است بخشی از مصرف به غلات کامل اختصاص پیدا کند.
        </p>

        <p>
          <strong className="text-yellow-700">۴) انتخاب پروتئین‌های کم‌چرب</strong><br />
          ماهی، مرغ بدون پوست، حبوبات و لبنیات کم‌چرب معمولاً انتخاب‌های بهتری از
          گوشت‌های چرب و فرآوری‌شده هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۵) محدود کردن قند افزوده و غذاهای فوق‌فرآوری‌شده</strong><br />
          نوشابه، شیرینی صنعتی، سس‌های آماده و تنقلات بسیار شور یا بسیار شیرین
          با روح DASH سازگار نیستند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جدول خلاصه DASH */}
      {/* ========================== */}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">

        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          خلاصه ساده رژیم DASH
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="border border-yellow-200 p-3">بخش رژیم</th>
                <th className="border border-yellow-200 p-3">توصیه اصلی</th>
                <th className="border border-yellow-200 p-3">نمونه‌ها</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">سبزیجات و میوه‌ها</td>
                <td className="border border-yellow-200 p-3">زیاد و روزانه</td>
                <td className="border border-yellow-200 p-3">کاهو، خیار، گوجه، پرتقال، موز، سیب</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">غلات کامل</td>
                <td className="border border-yellow-200 p-3">بخشی از وعده‌های اصلی</td>
                <td className="border border-yellow-200 p-3">نان سبوس‌دار، جو دوسر، برنج قهوه‌ای</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">لبنیات کم‌چرب</td>
                <td className="border border-yellow-200 p-3">منظم و متعادل</td>
                <td className="border border-yellow-200 p-3">ماست کم‌چرب، شیر کم‌چرب، دوغ کم‌نمک</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">پروتئین کم‌چرب</td>
                <td className="border border-yellow-200 p-3">متعادل</td>
                <td className="border border-yellow-200 p-3">ماهی، مرغ، عدس، لوبیا، نخود</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">نمک و غذاهای صنعتی</td>
                <td className="border border-yellow-200 p-3">کم و محدود</td>
                <td className="border border-yellow-200 p-3">چیپس، فست‌فود، سوسیس، کنسروهای پرنمک</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔷 یک روز نمونه DASH */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          یک روز نمونه از رژیم DASH
        </p>

        <HorizontalScrollGallery folder="articles/diets/dash-diet/sample-day" />

        <p>
          برای اینکه اجرای DASH ساده‌تر شود، این یک نمونه روزانه ساده و کاربردی است:
        </p>

        <div className="space-y-4">
          <p>
            <strong className="text-yellow-600">صبحانه:</strong><br />
            جو دوسر یا نان سبوس‌دار + شیر یا ماست کم‌چرب + یک عدد میوه
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده صبح:</strong><br />
            یک عدد موز یا سیب + چند عدد بادام بدون نمک
          </p>

          <p>
            <strong className="text-yellow-600">ناهار:</strong><br />
            مرغ یا ماهی کبابی + برنج قهوه‌ای یا نان سبوس‌دار + سالاد بزرگ بدون سس شور
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده عصر:</strong><br />
            ماست کم‌چرب یا سبزیجات تازه
          </p>

          <p>
            <strong className="text-yellow-600">شام:</strong><br />
            خوراک عدس یا لوبیا + سبزیجات بخارپز + کمی نان سبوس‌دار
          </p>
        </div>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در اجرای رژیم DASH
        </p>

        <p>
          <strong className="text-yellow-600">۱. فقط کم کردن نمکدان</strong><br />
          خیلی‌ها فکر می‌کنند اگر فقط به غذا نمک اضافه نکنند کافی است.
          در حالی که بخش بزرگی از سدیم از غذاهای آماده و فرآوری‌شده می‌آید.
        </p>

        <p>
          <strong className="text-yellow-600">۲. خوردن غذاهای ظاهراً سالم ولی پرنمک</strong><br />
          بعضی سوپ‌های آماده، کنسروها، پنیرها، سس‌ها و نان‌های صنعتی
          می‌توانند نمک زیادی داشته باشند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. حذف کامل همه چربی‌ها</strong><br />
          DASH به معنی حذف کامل چربی نیست؛
          هدف، انتخاب چربی‌های بهتر و کاهش چربی‌های ناسالم است.
        </p>

        <p>
          <strong className="text-yellow-600">۴. بی‌توجهی به اندازه وعده‌ها</strong><br />
          حتی غذاهای سالم هم اگر بی‌تعادل مصرف شوند،
          می‌توانند دریافت انرژی روزانه را بیش از نیاز بالا ببرند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧭 برای چه کسانی مناسب است؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم DASH برای چه کسانی مناسب است؟
        </p>

        <p>
          این الگو مخصوصاً برای این گروه‌ها می‌تواند مفید باشد:
        </p>

        <p>
          • افرادی با فشار خون بالا یا مرزی <br />
          • افرادی که سابقه خانوادگی بیماری قلبی دارند <br />
          • افرادی که غذاهای پرنمک زیاد مصرف می‌کنند <br />
          • کسانی که دنبال یک الگوی غذایی علمی و پایدار هستند
        </p>

        <p>
          البته افرادی که بیماری کلیوی، نارسایی قلبی، محدودیت مایعات،
          یا شرایط پزشکی خاص دارند باید رژیم خود را با نظر پزشک یا متخصص تغذیه تنظیم کنند.
          چون در بعضی شرایط، دریافت پتاسیم یا مایعات نیاز به بررسی دقیق‌تر دارد.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی نهایی رژیم DASH
        </p>

        <HorizontalScrollGallery folder="articles/diets/dash-diet/summary" />

        <p>
          رژیم DASH یکی از علمی‌ترین و کاربردی‌ترین الگوهای غذایی برای
          کنترل فشار خون و کمک به سلامت قلب است.
          این رژیم بر حذف افراطی غذاها تکیه ندارد؛
          بلکه روی انتخاب‌های بهتر و کاهش نمک و غذاهای ناسالم تمرکز می‌کند.
        </p>

        <p>
          اگر کسی بخواهد یک برنامه غذایی قابل اجرا، روشن و معتبر برای
          سلامت قلب و فشار خون داشته باشد، DASH یکی از بهترین شروع‌هاست.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «رژیم DASH یعنی کمتر کردن فشار روی قلب،
            با انتخاب غذاهایی که بدن را آرام‌تر، سالم‌تر و متعادل‌تر نگه می‌دارند.»
          </p>
        </div>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 📚 منابع علمی */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          منابع علمی
        </p>

        <p>
          1. National Heart, Lung, and Blood Institute (NHLBI/NIH) – DASH Eating Plan
        </p>

        <p>
          2. American Heart Association – Managing Blood Pressure with a Heart-Healthy Diet
        </p>

        <p>
          3. MedlinePlus – DASH Eating Plan
        </p>

        <p>
          4. NHLBI – Your Guide to Lowering Your Blood Pressure with DASH
        </p>

      </div>

    </GeninoArticleTemplate>
  );
}