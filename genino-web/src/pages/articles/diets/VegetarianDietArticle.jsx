import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function VegetarianDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم گیاه‌خواری؛ انتخابی سالم اگر درست برنامه‌ریزی شود"
      description="راهنمای کامل، علمی و ساده برای شناخت رژیم گیاه‌خواری، مزایا، نکات مهم تغذیه‌ای، مواد مغذی حساس و روش اجرای درست آن در زندگی روزمره."
      image="/images/articles/diets/vegetarian-diet/cover.jpg"
    >

      {/* ========================== */}
      {/* 🟢 بخش اول: رژیم گیاه‌خواری چیست؟ */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم گیاه‌خواری چیست؟ (Vegetarian Diet)
        </p>

        <p>
          رژیم گیاه‌خواری الگویی از تغذیه است که در آن گوشت، مرغ و ماهی حذف می‌شوند
          یا مصرف نمی‌شوند، اما بسته به نوع رژیم ممکن است بعضی فرآورده‌های حیوانی
          مانند لبنیات یا تخم‌مرغ همچنان در برنامه غذایی باقی بمانند.
        </p>

        <p>
          مهم است بدانیم «گیاه‌خواری» یک مدل واحد نیست. چند نوع رایج آن شامل:
        </p>

        <p>
          • لاکتو-اوو وجترین (Lacto-Ovo Vegetarian): مصرف لبنیات و تخم‌مرغ مجاز است <br />
          • لاکتو وجترین (Lacto Vegetarian): لبنیات مجاز است ولی تخم‌مرغ مصرف نمی‌شود <br />
          • اوو وجترین (Ovo Vegetarian): تخم‌مرغ مجاز است ولی لبنیات مصرف نمی‌شود <br />
          • وگان (Vegan): همه غذاهای حیوانی حذف می‌شوند
        </p>

        <p>
          در این مقاله تمرکز ما روی رژیم گیاه‌خواری به معنای کلی آن است،
          نه صرفاً وگان. یعنی الگویی که پایه‌اش غذاهای گیاهی است و ممکن است
          بسته به نوع انتخاب فرد، لبنیات یا تخم‌مرغ هم در آن وجود داشته باشد.
        </p>

        <p>
          اگر این رژیم درست چیده شود، می‌تواند سالم، کاربردی و پایدار باشد.
          اما اگر فقط گوشت حذف شود و جایگزین مناسبی در کار نباشد،
          خطر کمبود بعضی مواد مغذی بالا می‌رود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 چرا رژیم گیاه‌خواری مهم است؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          چرا رژیم گیاه‌خواری مهم است؟
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegetarian-diet/importance" />

        <p>
          خیلی از افراد به دلایل مختلف به گیاه‌خواری علاقه‌مند می‌شوند:
          سلامت، سبک زندگی، باور شخصی، سلیقه غذایی، یا تمایل به مصرف کمتر غذاهای حیوانی.
        </p>

        <p>
          <strong className="text-yellow-600">۱. افزایش مصرف غذاهای گیاهی مفید</strong><br />
          رژیم گیاه‌خواری معمولاً مصرف میوه، سبزی، حبوبات، مغزها و غلات کامل را بیشتر می‌کند.
        </p>

        <p>
          <strong className="text-yellow-600">۲. کمک به بهبود کیفیت تغذیه</strong><br />
          اگر این رژیم بر پایه غذاهای طبیعی و کم‌فرآوری‌شده باشد،
          می‌تواند کیفیت برنامه غذایی روزانه را بالا ببرد.
        </p>

        <p>
          <strong className="text-yellow-600">۳. دریافت بیشتر فیبر</strong><br />
          بسیاری از غذاهای گیاهی سرشار از فیبر هستند و به احساس سیری و سلامت گوارش کمک می‌کنند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. کاهش وابستگی به غذاهای حیوانی پرچرب و فرآوری‌شده</strong><br />
          حذف یا کاهش مصرف بعضی از گوشت‌های فرآوری‌شده می‌تواند برای سلامت کلی مفید باشد.
        </p>

        <p>
          <strong className="text-yellow-600">۵. قابلیت شخصی‌سازی بالا</strong><br />
          گیاه‌خواری می‌تواند خیلی ساده، خانوادگی و قابل اجرا باشد؛
          به شرطی که جایگزین‌ها هوشمندانه انتخاب شوند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 پایه‌های اصلی رژیم گیاه‌خواری */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          پایه‌های اصلی رژیم گیاه‌خواری سالم
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegetarian-diet/foundations" />

        <p>
          یک رژیم گیاه‌خواری خوب فقط حذف گوشت نیست؛
          بلکه یعنی ساختن یک برنامه غذایی کامل با جایگزین‌های درست.
        </p>

        <p>
          <strong className="text-yellow-700">۱) حبوبات و پروتئین‌های گیاهی</strong><br />
          عدس، لوبیا، نخود، لپه، سویا، توفو، تمپه و فرآورده‌های مشابه
          در این رژیم نقش کلیدی دارند.
        </p>

        <p>
          <strong className="text-yellow-700">۲) غلات کامل</strong><br />
          نان سبوس‌دار، جو، برنج قهوه‌ای، بلغور و جو دوسر
          پایه خوبی برای انرژی و فیبر هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۳) مغزها و دانه‌ها</strong><br />
          گردو، بادام، کنجد، تخم کتان، تخم چیا و دانه آفتابگردان
          هم برای چربی‌های سالم مهم‌اند و هم برای بعضی ریزمغذی‌ها.
        </p>

        <p>
          <strong className="text-yellow-700">۴) سبزیجات و میوه‌ها</strong><br />
          این گروه باید در برنامه روزانه حضور پررنگ داشته باشد،
          چون ویتامین‌ها، مواد معدنی و فیبر مهمی فراهم می‌کند.
        </p>

        <p>
          <strong className="text-yellow-700">۵) لبنیات و تخم‌مرغ (در صورت مصرف)</strong><br />
          در مدل‌های لاکتو یا لاکتو-اوو، این دو گروه می‌توانند
          دریافت پروتئین، کلسیم و ویتامین B12 را آسان‌تر کنند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 مواد مغذی حساس */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          مواد مغذی مهمی که باید به آن‌ها توجه کنی
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegetarian-diet/nutrients" />

        <p>
          مهم‌ترین نکته در گیاه‌خواری این است که رژیم فقط «بدون گوشت» نباشد،
          بلکه از نظر تغذیه‌ای هم کامل باشد.
        </p>

        <p>
          <strong className="text-yellow-700">۱) پروتئین</strong><br />
          منابع خوب شامل حبوبات، سویا، توفو، تمپه، ماست، پنیر، تخم‌مرغ،
          مغزها و بعضی غلات هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۲) آهن</strong><br />
          آهن گیاهی در غذاهایی مثل عدس، لوبیا، سبزیجات برگ سبز، غلات غنی‌شده و خشکبار وجود دارد،
          اما جذب آن از آهن حیوانی کمتر است.
          خوردن منبع ویتامین C کنار غذا می‌تواند جذب آهن را بهتر کند.
        </p>

        <p>
          <strong className="text-yellow-700">۳) ویتامین B12</strong><br />
          B12 یکی از مهم‌ترین نکات در رژیم‌های گیاهی است.
          اگر فرد لبنیات و تخم‌مرغ کم مصرف کند یا وگان باشد،
          باید منبع غنی‌شده یا مکمل مطمئن در نظر بگیرد.
        </p>

        <p>
          <strong className="text-yellow-700">۴) امگا 3</strong><br />
          منابع گیاهی امگا 3 شامل بذر کتان، تخم چیا، گردو و بعضی روغن‌ها هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۵) کلسیم، روی و ویتامین D</strong><br />
          بسته به نوع رژیم، این مواد مغذی هم ممکن است نیاز به توجه ویژه داشته باشند،
          به‌خصوص در کودکان، نوجوانان، بارداری و سالمندی.
        </p>

      </div>

      {/* ========================== */}
      {/* 🟡 جدول خلاصه مواد مغذی */}
      {/* ========================== */}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">

        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          خلاصه مواد مغذی مهم در رژیم گیاه‌خواری
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="border border-yellow-200 p-3">ماده مغذی</th>
                <th className="border border-yellow-200 p-3">منابع گیاهی / مناسب</th>
                <th className="border border-yellow-200 p-3">نکته مهم</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">پروتئین</td>
                <td className="border border-yellow-200 p-3">عدس، لوبیا، نخود، سویا، توفو، تخم‌مرغ، لبنیات</td>
                <td className="border border-yellow-200 p-3">باید منظم و متنوع مصرف شود</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">آهن</td>
                <td className="border border-yellow-200 p-3">حبوبات، سبزیجات برگ سبز، غلات غنی‌شده، خشکبار</td>
                <td className="border border-yellow-200 p-3">همراه ویتامین C بهتر جذب می‌شود</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">ویتامین B12</td>
                <td className="border border-yellow-200 p-3">لبنیات، تخم‌مرغ، غذاهای غنی‌شده، مکمل</td>
                <td className="border border-yellow-200 p-3">در بعضی افراد باید حتماً بررسی شود</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">امگا 3</td>
                <td className="border border-yellow-200 p-3">گردو، بذر کتان، تخم چیا</td>
                <td className="border border-yellow-200 p-3">بهتر است منظم مصرف شود</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">کلسیم</td>
                <td className="border border-yellow-200 p-3">لبنیات، محصولات غنی‌شده، بعضی سبزیجات</td>
                <td className="border border-yellow-200 p-3">برای استخوان مهم است</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔷 یک روز نمونه */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          یک روز نمونه از رژیم گیاه‌خواری
        </p>

        <div className="space-y-4">
          <p>
            <strong className="text-yellow-600">صبحانه:</strong><br />
            نان سبوس‌دار + پنیر یا تخم‌مرغ + خیار و گوجه + چند عدد گردو
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده صبح:</strong><br />
            میوه تازه + چند عدد بادام
          </p>

          <p>
            <strong className="text-yellow-600">ناهار:</strong><br />
            عدس‌پلو یا خوراک لوبیا + سالاد + ماست
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده عصر:</strong><br />
            ماست یا میوه یا کمی مغزها
          </p>

          <p>
            <strong className="text-yellow-600">شام:</strong><br />
            سوپ سبزیجات + املت یا خوراک نخود و سبزیجات
          </p>
        </div>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در رژیم گیاه‌خواری
        </p>

        <p>
          <strong className="text-yellow-600">۱. حذف گوشت بدون جایگزین مناسب</strong><br />
          بعضی افراد فقط گوشت را کنار می‌گذارند، اما پروتئین کافی از منابع دیگر دریافت نمی‌کنند.
        </p>

        <p>
          <strong className="text-yellow-600">۲. تکیه زیاد بر نان و برنج</strong><br />
          اگر گیاه‌خواری فقط به مصرف زیاد کربوهیدرات‌های ساده ختم شود،
          رژیم متعادل نخواهد بود.
        </p>

        <p>
          <strong className="text-yellow-600">۳. فراموش کردن B12 و آهن</strong><br />
          این دو مورد از مهم‌ترین اشتباهات در رژیم گیاهی هستند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. مصرف زیاد غذاهای صنعتیِ گیاهی</strong><br />
          هر چیزی که برچسب گیاهی دارد، لزوماً سالم نیست.
          بعضی محصولات گیاهی صنعتی می‌توانند بسیار شور، پرچرب یا پرکالری باشند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧭 برای چه کسانی مناسب است؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم گیاه‌خواری برای چه کسانی مناسب است؟
        </p>

        <p>
          این رژیم برای خیلی از بزرگسالان سالم می‌تواند انتخاب خوبی باشد،
          به شرطی که درست برنامه‌ریزی شود.
        </p>

        <p>
          اما در این گروه‌ها باید دقت بیشتری داشت:
        </p>

        <p>
          • کودکان و نوجوانان <br />
          • زنان باردار یا شیرده <br />
          • سالمندان <br />
          • ورزشکاران <br />
          • افرادی با سابقه کم‌خونی یا کمبود B12
        </p>

        <p>
          در این شرایط بهتر است برنامه غذایی با نظر پزشک یا متخصص تغذیه تنظیم شود
          تا کمبود تغذیه‌ای پیش نیاید.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی نهایی رژیم گیاه‌خواری
        </p>

        <p>
          رژیم گیاه‌خواری می‌تواند سالم، مفید و پایدار باشد،
          اما به شرطی که هوشمندانه طراحی شود.
          حذف گوشت به تنهایی کافی نیست؛
          بدن هنوز به پروتئین، آهن، B12، چربی‌های مفید و سایر مواد مغذی نیاز دارد.
        </p>

        <p>
          اگر این رژیم با آگاهی اجرا شود، می‌تواند بخشی از یک سبک زندگی سالم و متعادل باشد.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «گیاه‌خواری سالم یعنی حذف کورکورانه نیست؛
            یعنی انتخاب آگاهانه، متعادل و هوشمندانه برای تغذیه بدن.»
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
          1. NHS – The Vegetarian Diet
        </p>

        <p>
          2. Academy of Nutrition and Dietetics – Vegetarian Dietary Patterns for Adults
        </p>

        <p>
          3. Harvard T.H. Chan School of Public Health – Nutrition guidance on key nutrients including vitamin B12
        </p>

        <p>
          4. Academy of Nutrition and Dietetics – Vegetarian and Plant-Based
        </p>

      </div>

    </GeninoArticleTemplate>
  );
}