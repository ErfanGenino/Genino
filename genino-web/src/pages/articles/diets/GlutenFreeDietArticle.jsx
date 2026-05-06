import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function GlutenFreeDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم بدون گلوتن؛ راهنمای علمی و کاربردی برای حذف درست گلوتن از رژیم غذایی"
      description="راهنمای کامل، علمی و ساده برای شناخت رژیم بدون گلوتن، تفاوت سلیاک با حساسیت به گلوتن، غذاهای مجاز و ممنوع، آلودگی متقاطع، اشتباهات رایج و روش اجرای درست آن."
      image="/images/articles/diets/gluten-free-diet/cover.jpg"
    >

      {/* ========================== */}
      {/* 🟢 بخش اول: رژیم بدون گلوتن چیست؟ */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم بدون گلوتن چیست؟ (Gluten-Free Diet)
        </p>

        <p>
          رژیم بدون گلوتن یعنی برنامه‌ای غذایی که در آن
          <strong> گلوتن </strong>
          از غذا حذف می‌شود.
        </p>

        <p>
          گلوتن نوعی پروتئین است که در بعضی غلات مانند
          <strong> گندم، جو و چاودار </strong>
          وجود دارد.
          در بعضی افراد، خوردن گلوتن می‌تواند مشکل جدی ایجاد کند.
        </p>

        <p>
          مهم‌ترین گروهی که واقعاً به این رژیم نیاز دارند،
          افراد مبتلا به
          <strong> بیماری سلیاک </strong>
          هستند.
          در سلیاک، بدن به گلوتن واکنش غیرطبیعی نشان می‌دهد
          و این واکنش می‌تواند به روده باریک آسیب بزند.
        </p>

        <p>
          این رژیم ممکن است برای بعضی افراد با
          حساسیت غیرسلیاکی به گلوتن
          یا بعضی شرایط خاص دیگر هم مطرح شود،
          اما برای همه مردم یک رژیم ضروری نیست.
        </p>

        <p>
          به زبان ساده:
          رژیم بدون گلوتن یعنی
          <strong> حذف دقیق غذاهایی که حاوی گلوتن هستند، نه فقط کمتر خوردن نان و ماکارونی.</strong>
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 چه کسانی واقعاً به رژیم بدون گلوتن نیاز دارند؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          چه کسانی واقعاً به رژیم بدون گلوتن نیاز دارند؟
        </p>

        <p>
          همه افرادی که اسم «گلوتن» را شنیده‌اند،
          لزوماً به رژیم بدون گلوتن نیاز ندارند.
          این رژیم بیشتر برای گروه‌های زیر مطرح می‌شود:
        </p>

        <p>
          <strong className="text-yellow-600">۱. افراد مبتلا به سلیاک</strong><br />
          در این بیماری، خوردن گلوتن باعث آسیب به روده باریک می‌شود
          و رژیم بدون گلوتن درمان اصلی و مادام‌العمر است.
        </p>

        <p>
          <strong className="text-yellow-600">۲. افراد با حساسیت غیرسلیاکی به گلوتن</strong><br />
          بعضی افراد با خوردن غذاهای حاوی گلوتن دچار علائمی مثل نفخ،
          ناراحتی گوارشی یا احساس ناخوشی می‌شوند،
          در حالی که سلیاک یا آلرژی گندم ندارند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. افراد با آلرژی به گندم</strong><br />
          این حالت با سلیاک فرق دارد.
          در آلرژی گندم، مشکل فقط گلوتن نیست،
          بلکه واکنش آلرژیک به بعضی پروتئین‌های گندم مطرح است.
        </p>

        <p>
          <strong className="text-yellow-600">۴. نه به‌عنوان رژیم مد، بلکه وقتی دلیل واقعی وجود دارد</strong><br />
          رژیم بدون گلوتن برای همه مردم
          ذاتاً سالم‌تر یا لاغرکننده‌تر نیست
          و اگر بی‌دلیل اجرا شود،
          حتی ممکن است انتخاب‌های غذایی را محدودتر کند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 گلوتن در چه غذاهایی وجود دارد؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          گلوتن در چه غذاهایی وجود دارد؟
        </p>

        <HorizontalScrollGallery folder="articles/diets/gluten-free-diet/gluten-sources" />

        <p>
          خیلی‌ها فقط نان را منبع گلوتن می‌دانند،
          اما گلوتن در خوراکی‌های بیشتری وجود دارد.
        </p>

        <p>
          <strong className="text-yellow-700">۱) غلات اصلی حاوی گلوتن</strong><br />
          گندم، جو، چاودار و تریتیکاله
          از مهم‌ترین منابع گلوتن هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۲) غذاهای ساخته‌شده با آرد گندم</strong><br />
          نان، ماکارونی، کیک، بیسکویت، کراکر، بعضی غلات صبحانه،
          شیرینی‌ها و بسیاری از محصولات نانوایی
          معمولاً حاوی گلوتن هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۳) منابع پنهان گلوتن</strong><br />
          بعضی سس‌ها، سوپ‌های آماده، گراوی‌ها، غذاهای نیمه‌آماده،
          پودرهای آماده، بعضی فرآورده‌های گوشتی و حتی بعضی نوشیدنی‌ها
          ممکن است گلوتن داشته باشند.
        </p>

        <p>
          <strong className="text-yellow-700">۴) مالت و بعضی فرآورده‌های جو</strong><br />
          مالت معمولاً از جو تهیه می‌شود
          و می‌تواند منبع گلوتن باشد.
        </p>

        <p>
          <strong className="text-yellow-700">۵) جو دوسر یک نکته مهم دارد</strong><br />
          جو دوسر ذاتاً گلوتن ندارد،
          اما خیلی وقت‌ها در مسیر تولید
          با گندم، جو یا چاودار آلوده می‌شود.
          برای همین فقط جو دوسر با برچسب «بدون گلوتن» مناسب‌تر است.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 چه غذاهایی معمولاً مجاز هستند؟ */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          چه غذاهایی معمولاً در رژیم بدون گلوتن مجاز هستند؟
        </p>

        <HorizontalScrollGallery folder="articles/diets/gluten-free-diet/allowed-foods" />

        <p>
          خبر خوب این است که خیلی از غذاهای پایه و ساده
          به‌طور طبیعی بدون گلوتن هستند:
        </p>

        <p>
          • برنج <br />
          • سیب‌زمینی <br />
          • ذرت <br />
          • کینوا و بعضی غلات بدون گلوتن <br />
          • میوه‌ها و سبزیجات <br />
          • حبوبات <br />
          • تخم‌مرغ <br />
          • گوشت، مرغ و ماهی ساده و بدون پوشش آردی <br />
          • مغزها و دانه‌ها <br />
          • بیشتر لبنیات ساده، اگر فرد با آن‌ها مشکلی نداشته باشد
        </p>

        <p>
          نکته مهم این است که
          «طبیعتاً بدون گلوتن بودن»
          با «آلوده نشدن در کارخانه یا آشپزخانه»
          یکی نیست.
          پس برچسب محصول و شیوه آماده‌سازی هم مهم است.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جدول خلاصه رژیم بدون گلوتن */}
      {/* ========================== */}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">

        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          خلاصه ساده رژیم بدون گلوتن
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="border border-yellow-200 p-3">بخش</th>
                <th className="border border-yellow-200 p-3">وضعیت</th>
                <th className="border border-yellow-200 p-3">نمونه‌ها</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">غلات ممنوع</td>
                <td className="border border-yellow-200 p-3">حذف شوند</td>
                <td className="border border-yellow-200 p-3">گندم، جو، چاودار، تریتیکاله</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">غذاهای پایه مجاز</td>
                <td className="border border-yellow-200 p-3">قابل استفاده</td>
                <td className="border border-yellow-200 p-3">برنج، سیب‌زمینی، ذرت، میوه، سبزیجات، حبوبات</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">پروتئین‌ها</td>
                <td className="border border-yellow-200 p-3">در صورت ساده بودن</td>
                <td className="border border-yellow-200 p-3">تخم‌مرغ، مرغ، ماهی، گوشت بدون سوخاری و بدون سس مشکوک</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">جو دوسر</td>
                <td className="border border-yellow-200 p-3">با احتیاط</td>
                <td className="border border-yellow-200 p-3">فقط نوع دارای برچسب بدون گلوتن</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">منابع پنهان</td>
                <td className="border border-yellow-200 p-3">نیاز به بررسی</td>
                <td className="border border-yellow-200 p-3">سس‌ها، سوپ آماده، مالت، بعضی اسنک‌ها و محصولات بسته‌بندی</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔷 آلودگی متقاطع یعنی چه؟ */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          آلودگی متقاطع یعنی چه و چرا مهم است؟
        </p>

        <p>
          در رژیم بدون گلوتن، فقط مواد اولیه مهم نیستند.
          حتی مقدار خیلی کم گلوتن هم
          برای بعضی افراد مبتلا به سلیاک می‌تواند مشکل‌ساز باشد.
        </p>

        <p>
          آلودگی متقاطع یعنی اینکه
          یک غذای ذاتاً بدون گلوتن،
          هنگام تولید، بسته‌بندی، پخت یا سرو
          با گلوتن تماس پیدا کند.
        </p>

        <p>
          نمونه‌های رایج:
        </p>

        <p>
          • استفاده از یک توستر مشترک برای نان معمولی و نان بدون گلوتن <br />
          • آردپاشی روی سطح آشپزخانه <br />
          • قاشق یا چاقوی مشترک برای چند غذا <br />
          • سرخ کردن غذای بدون گلوتن در روغنی که قبلاً غذای آردی در آن سرخ شده <br />
          • تولید کارخانه‌ای در خط مشترک
        </p>

        <p>
          به همین دلیل،
          رژیم بدون گلوتن فقط انتخاب ماده غذایی نیست؛
          بلکه به روش نگهداری و آماده‌سازی هم مربوط است.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔷 آیا قبل از تشخیص باید رژیم را شروع کرد؟ */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          آیا قبل از تشخیص باید رژیم بدون گلوتن را شروع کرد؟
        </p>

        <p>
          اگر کسی به سلیاک مشکوک است،
          بهتر است قبل از قطعی شدن بررسی پزشکی،
          خودسرانه رژیم بدون گلوتن را شروع نکند.
        </p>

        <p>
          دلیلش این است که حذف گلوتن
          می‌تواند نتیجه بعضی آزمایش‌های تشخیصی را تغییر دهد
          و تشخیص را سخت‌تر کند.
        </p>

        <p>
          پس اگر علائمی مثل اسهال مزمن، نفخ شدید، کم‌خونی، کاهش وزن،
          یا سابقه خانوادگی سلیاک وجود دارد،
          بهتر است اول بررسی پزشکی انجام شود
          و بعد رژیم درمانی قطعی شروع شود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔷 یک روز نمونه */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          یک روز نمونه از رژیم بدون گلوتن
        </p>

        <div className="space-y-4">
          <p>
            <strong className="text-yellow-600">صبحانه:</strong><br />
            املت + میوه + نان بدون گلوتن یا سیب‌زمینی پخته
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده صبح:</strong><br />
            ماست ساده یا چند عدد مغز
          </p>

          <p>
            <strong className="text-yellow-600">ناهار:</strong><br />
            مرغ یا ماهی + برنج + سالاد بزرگ
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده عصر:</strong><br />
            میوه یا حمص با سبزیجات
          </p>

          <p>
            <strong className="text-yellow-600">شام:</strong><br />
            خوراک حبوبات یا گوشت ساده + سیب‌زمینی یا کینوا + سبزیجات
          </p>
        </div>

        <p>
          نکته مهم:
          در رژیم بدون گلوتن،
          نمونه روزانه باید واقعاً بدون آلودگی متقاطع باشد،
          نه فقط ظاهراً بدون گلوتن.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در رژیم بدون گلوتن
        </p>

        <p>
          <strong className="text-yellow-600">۱. فکر کردن به اینکه فقط نان و ماکارونی مهم‌اند</strong><br />
          در حالی که گلوتن می‌تواند در سس‌ها، سوپ‌های آماده،
          غلات صبحانه، اسنک‌ها و مواد افزودنی هم پنهان باشد.
        </p>

        <p>
          <strong className="text-yellow-600">۲. بی‌توجهی به آلودگی متقاطع</strong><br />
          خیلی از افراد ماده غذایی درست را انتخاب می‌کنند،
          اما در آشپزخانه یا رستوران ناخواسته آن را آلوده می‌کنند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. شروع رژیم قبل از تشخیص قطعی</strong><br />
          این کار ممکن است روند تشخیص سلیاک را سخت کند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. تصور اینکه بدون گلوتن یعنی حتماً سالم‌تر</strong><br />
          بعضی محصولات بدون گلوتن
          ممکن است همچنان قند، چربی یا کالری بالایی داشته باشند.
        </p>

        <p>
          <strong className="text-yellow-600">۵. بی‌توجهی به کمبودهای تغذیه‌ای</strong><br />
          اگر رژیم بدون گلوتن بدون برنامه اجرا شود،
          ممکن است دریافت فیبر، آهن، کلسیم،
          و بعضی ویتامین‌ها و مواد معدنی پایین بیاید.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧭 چه کسانی باید با دقت بیشتری این رژیم را اجرا کنند؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          چه کسانی باید رژیم بدون گلوتن را دقیق‌تر و تخصصی‌تر اجرا کنند؟
        </p>

        <p>
          اگر فرد یکی از این شرایط را دارد،
          بهتر است رژیم با نظر پزشک یا متخصص تغذیه تنظیم شود:
        </p>

        <p>
          • افراد مبتلا به سلیاک <br />
          • کودکان و نوجوانان در حال رشد <br />
          • زنان باردار <br />
          • افراد با کم‌خونی یا سوءجذب <br />
          • کسانی که وزن پایین یا کاهش وزن ناخواسته دارند <br />
          • افرادی که چند بیماری گوارشی هم‌زمان دارند
        </p>

        <p>
          چون در این افراد،
          فقط حذف گلوتن کافی نیست
          و باید تعادل مواد مغذی هم حفظ شود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی نهایی رژیم بدون گلوتن
        </p>

        <p>
          رژیم بدون گلوتن یک رژیم
          <strong> درمانی و دقیق </strong>
          است، نه فقط یک ترند غذایی.
        </p>

        <p>
          این رژیم برای افراد مبتلا به سلیاک
          نقش اصلی در کنترل علائم و محافظت از روده دارد،
          و برای اجرای درست آن
          باید هم منابع آشکار گلوتن
          و هم منابع پنهان و آلودگی متقاطع را جدی گرفت.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «رژیم بدون گلوتن فقط حذف چند غذا نیست؛
            یعنی یاد گرفتن یک سبک دقیق و آگاهانه برای انتخاب، خرید و پخت غذا.»
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
          1. National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) – Eating, Diet, & Nutrition for Celiac Disease
        </p>

        <p>
          2. NIDDK – Celiac Disease: Definition & Facts
        </p>

        <p>
          3. NIDDK – Diagnosis of Celiac Disease
        </p>

        <p>
          4. NHS – Coeliac Disease: Treatment
        </p>

        <p>
          5. Mayo Clinic – Gluten-Free Diet / Celiac Disease Treatment
        </p>

      </div>

    </GeninoArticleTemplate>
  );
}