import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function VeganDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم وگان؛ تغذیه کاملاً گیاهی با اجرای آگاهانه"
      description="راهنمای کامل، علمی و ساده برای شناخت رژیم وگان، فواید آن، مواد مغذی مهم، اشتباهات رایج و روش اجرای درست آن در زندگی روزمره."
      image="/images/articles/diets/vegan-diet/cover.jpg"
    >

      {/* ========================== */}
      {/* 🟢 بخش اول: رژیم وگان چیست؟ */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم وگان چیست؟ (Vegan Diet)
        </p>

        <p>
          رژیم وگان یک الگوی غذایی کاملاً گیاهی است.
          یعنی در این رژیم، همه غذاهای با منشأ حیوانی کنار گذاشته می‌شوند.
        </p>

        <p>
          در رژیم وگان معمولاً این مواد غذایی مصرف نمی‌شوند:
        </p>

        <p>
          • گوشت قرمز و سفید <br />
          • ماهی و غذاهای دریایی <br />
          • تخم‌مرغ <br />
          • شیر، ماست، پنیر و سایر لبنیات <br />
          • بعضی مواد غذایی حیوانی مثل ژلاتین
        </p>

        <p>
          در مقابل، پایه رژیم وگان بر این گروه‌هاست:
        </p>

        <p>
          • حبوبات (Beans, Lentils, Chickpeas) <br />
          • سویا و فرآورده‌های آن مثل توفو و تمپه <br />
          • غلات کامل <br />
          • سبزیجات و میوه‌ها <br />
          • مغزها و دانه‌ها <br />
          • نوشیدنی‌ها و غذاهای غنی‌شده گیاهی
        </p>

        <p>
          مهم‌ترین نکته این است که وگان بودن فقط به معنی حذف مواد حیوانی نیست؛
          بلکه باید جایگزین‌های غذایی درست و کامل انتخاب شوند
          تا بدن دچار کمبود مواد مغذی نشود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 چرا رژیم وگان مهم است؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          چرا رژیم وگان مهم است؟
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegan-diet/importance" />

        <p>
          رژیم وگان برای خیلی از افراد فقط یک رژیم نیست؛
          بلکه بخشی از سبک زندگی و انتخاب آگاهانه آن‌هاست.
        </p>

        <p>
          <strong className="text-yellow-600">۱. افزایش مصرف غذاهای گیاهی مفید</strong><br />
          وگان‌ها معمولاً مصرف میوه، سبزیجات، حبوبات، غلات کامل و دانه‌ها را بیشتر می‌کنند.
        </p>

        <p>
          <strong className="text-yellow-600">۲. افزایش دریافت فیبر</strong><br />
          رژیم‌های گیاهی معمولاً فیبر بیشتری دارند و این موضوع می‌تواند
          به سلامت گوارش و احساس سیری کمک کند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. کمک به بهبود کیفیت تغذیه، اگر درست اجرا شود</strong><br />
          اگر رژیم وگان بر پایه غذاهای واقعی و کم‌فرآوری‌شده باشد،
          می‌تواند یک الگوی غذایی سالم و منظم ایجاد کند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. امکان ساختن یک سبک زندگی منظم و آگاهانه</strong><br />
          چون اجرای وگان معمولاً نیاز به دقت بیشتر در خرید، برنامه‌ریزی و انتخاب غذا دارد.
        </p>

        <p>
          <strong className="text-yellow-600">۵. اما فقط در صورت برنامه‌ریزی درست</strong><br />
          منابع معتبر تغذیه تأکید می‌کنند که وگان بودن می‌تواند کافی باشد،
          ولی بدون برنامه‌ریزی مناسب، خطر کمبود بعضی مواد مغذی بالا می‌رود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 پایه‌های اصلی رژیم وگان سالم */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          پایه‌های اصلی یک رژیم وگان سالم
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegan-diet/foundations" />

        <p>
          برای اینکه رژیم وگان سالم باشد، باید بر تنوع و تعادل تکیه کند.
          یعنی بدن از چند منبع مختلف، مواد مغذی مورد نیاز خود را دریافت کند.
        </p>

        <p>
          <strong className="text-yellow-700">۱) حبوبات و پروتئین‌های گیاهی</strong><br />
          عدس، لوبیا، نخود، لپه، سویا، توفو، تمپه و فرآورده‌های سویا
          بخش مهمی از پروتئین وگان را تأمین می‌کنند.
        </p>

        <p>
          <strong className="text-yellow-700">۲) غلات کامل</strong><br />
          جو دوسر، نان سبوس‌دار، بلغور، برنج قهوه‌ای و سایر غلات کامل
          برای انرژی، فیبر و بخشی از مواد معدنی مفید هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۳) مغزها و دانه‌ها</strong><br />
          بادام، گردو، تخمه‌ها، کنجد، بذر کتان و چیا
          هم چربی‌های سالم می‌دهند و هم در تأمین بعضی مواد مغذی نقش دارند.
        </p>

        <p>
          <strong className="text-yellow-700">۴) سبزیجات و میوه‌ها</strong><br />
          این گروه در رژیم وگان باید سهم پررنگی داشته باشد،
          چون منبع مهم ویتامین‌ها، مواد معدنی، آنتی‌اکسیدان‌ها و فیبر است.
        </p>

        <p>
          <strong className="text-yellow-700">۵) غذاهای غنی‌شده</strong><br />
          در رژیم وگان، غذاهای غنی‌شده اهمیت زیادی دارند؛
          به‌ویژه برای B12 و گاهی کلسیم و ویتامین D.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 مواد مغذی مهم در وگان */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          مواد مغذی مهمی که در رژیم وگان باید جدی گرفته شوند
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegan-diet/nutrients" />

        <p>
          منابع معتبر تغذیه روی چند ماده مغذی در رژیم وگان تأکید ویژه دارند.
          این به معنی ناسالم بودن رژیم وگان نیست؛
          فقط یعنی باید آن را آگاهانه اجرا کرد.
        </p>

        <p>
          <strong className="text-yellow-700">۱) ویتامین B12</strong><br />
          مهم‌ترین نکته در رژیم وگان همین B12 است.
          این ویتامین به طور طبیعی در رژیم کاملاً گیاهی وجود ندارد،
          بنابراین فرد وگان باید از غذاهای غنی‌شده یا مکمل مطمئن استفاده کند.
        </p>

        <p>
          <strong className="text-yellow-700">۲) آهن</strong><br />
          آهن گیاهی در حبوبات، بعضی سبزیجات برگ سبز، غلات غنی‌شده و خشکبار وجود دارد،
          اما جذب آن از آهن حیوانی کمتر است.
          خوردن منبع ویتامین C در کنار وعده‌ها می‌تواند جذب آهن را بهتر کند.
        </p>

        <p>
          <strong className="text-yellow-700">۳) کلسیم</strong><br />
          در رژیم وگان باید به منابعی مثل نوشیدنی‌های گیاهی غنی‌شده،
          بعضی فرآورده‌های سویا و برخی غذاهای گیاهی غنی از کلسیم توجه شود.
        </p>

        <p>
          <strong className="text-yellow-700">۴) ویتامین D</strong><br />
          این ویتامین در خیلی از افراد، چه وگان چه غیر وگان، نیاز به توجه دارد.
          گاهی غذای غنی‌شده یا مکمل لازم می‌شود.
        </p>

        <p>
          <strong className="text-yellow-700">۵) ید و روی</strong><br />
          در رژیم‌های کاملاً گیاهی، این دو ماده هم باید آگاهانه بررسی شوند،
          مخصوصاً اگر فرد تنوع غذایی کمی داشته باشد.
        </p>

        <p>
          <strong className="text-yellow-700">۶) امگا 3</strong><br />
          منابع گیاهی مانند گردو، بذر کتان و چیا وجود دارند،
          اما باید به صورت منظم در برنامه غذایی حضور داشته باشند.
        </p>

      </div>

      {/* ========================== */}
      {/* 🟡 جدول خلاصه مواد مغذی */}
      {/* ========================== */}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">

        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          خلاصه مواد مغذی حساس در رژیم وگان
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="border border-yellow-200 p-3">ماده مغذی</th>
                <th className="border border-yellow-200 p-3">منابع مناسب</th>
                <th className="border border-yellow-200 p-3">نکته مهم</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">ویتامین B12</td>
                <td className="border border-yellow-200 p-3">غذاهای غنی‌شده، مکمل</td>
                <td className="border border-yellow-200 p-3">باید جدی گرفته شود</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">آهن</td>
                <td className="border border-yellow-200 p-3">حبوبات، غلات غنی‌شده، سبزیجات برگ سبز</td>
                <td className="border border-yellow-200 p-3">همراه ویتامین C بهتر جذب می‌شود</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">کلسیم</td>
                <td className="border border-yellow-200 p-3">محصولات گیاهی غنی‌شده، بعضی غذاهای سویا</td>
                <td className="border border-yellow-200 p-3">برای استخوان مهم است</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">امگا 3</td>
                <td className="border border-yellow-200 p-3">گردو، بذر کتان، چیا</td>
                <td className="border border-yellow-200 p-3">مصرف منظم مهم است</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">ید و روی</td>
                <td className="border border-yellow-200 p-3">بسته به تنوع رژیم و غذاهای انتخابی</td>
                <td className="border border-yellow-200 p-3">در بعضی افراد نیاز به توجه ویژه دارد</td>
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
          یک روز نمونه از رژیم وگان
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegan-diet/sample-day" />

        <div className="space-y-4">
          <p>
            <strong className="text-yellow-600">صبحانه:</strong><br />
            اوتمیل با شیر گیاهی غنی‌شده + موز + بذر چیا + چند عدد گردو
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده صبح:</strong><br />
            میوه تازه + چند عدد بادام
          </p>

          <p>
            <strong className="text-yellow-600">ناهار:</strong><br />
            خوراک عدس یا لوبیا + برنج قهوه‌ای یا نان سبوس‌دار + سالاد بزرگ
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده عصر:</strong><br />
            ماست گیاهی غنی‌شده یا میوه
          </p>

          <p>
            <strong className="text-yellow-600">شام:</strong><br />
            توفو یا خوراک نخود و سبزیجات + سوپ سبزیجات
          </p>
        </div>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در رژیم وگان
        </p>

        <p>
          <strong className="text-yellow-600">۱. فکر کردن به اینکه هر غذای گیاهی سالم است</strong><br />
          بعضی غذاهای صنعتیِ گیاهی ممکن است پرنمک، پرچرب یا پرقند باشند.
        </p>

        <p>
          <strong className="text-yellow-600">۲. نادیده گرفتن B12</strong><br />
          این مهم‌ترین اشتباه در رژیم وگان است.
          بدون توجه به B12، خطر کمبود واقعی وجود دارد.
        </p>

        <p>
          <strong className="text-yellow-600">۳. کم‌توجهی به پروتئین</strong><br />
          اگر حبوبات، سویا، توفو، تمپه، مغزها و دانه‌ها به‌خوبی در رژیم نباشند،
          کیفیت رژیم پایین می‌آید.
        </p>

        <p>
          <strong className="text-yellow-600">۴. تنوع غذایی پایین</strong><br />
          اگر رژیم وگان فقط به نان، برنج، سیب‌زمینی و چند غذای تکراری محدود شود،
          احتمال کمبودهای تغذیه‌ای بیشتر می‌شود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧭 برای چه کسانی مناسب است؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم وگان برای چه کسانی مناسب است؟
        </p>

        <p>
          رژیم وگان در بزرگسالان اگر درست برنامه‌ریزی شود می‌تواند کافی باشد،
          اما هرچه نیاز تغذیه‌ای حساس‌تر شود، دقت بیشتری هم لازم است.
        </p>

        <p>
          در این گروه‌ها باید توجه ویژه‌تری وجود داشته باشد:
        </p>

        <p>
          • کودکان و نوجوانان <br />
          • زنان باردار یا شیرده <br />
          • سالمندان <br />
          • ورزشکاران <br />
          • افراد با سابقه کم‌خونی یا کمبود B12
        </p>

        <p>
          در این شرایط بهتر است رژیم با کمک متخصص تغذیه یا پزشک تنظیم شود
          تا هم رشد و سلامت حفظ شود، هم کمبود تغذیه‌ای ایجاد نشود.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع‌بندی نهایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی نهایی رژیم وگان
        </p>

        <HorizontalScrollGallery folder="articles/diets/vegan-diet/summary" />

        <p>
          رژیم وگان می‌تواند یک الگوی غذایی سالم و آگاهانه باشد،
          اما فقط وقتی که با شناخت و برنامه‌ریزی اجرا شود.
        </p>

        <p>
          وگان بودن یعنی حذف همه مواد غذایی حیوانی،
          و همین موضوع باعث می‌شود توجه به ریزمغذی‌ها، تنوع غذایی
          و استفاده از غذاهای غنی‌شده یا مکمل‌ها اهمیت بیشتری پیدا کند.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «رژیم وگان سالم یعنی فقط حذف غذاهای حیوانی نیست؛
            یعنی ساختن یک تغذیه گیاهیِ کامل، آگاهانه و مسئولانه برای بدن.»
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
          1. Academy of Nutrition and Dietetics – Position Paper on Vegetarian Dietary Patterns for Adults (2025)
        </p>

        <p>
          2. Harvard T.H. Chan School of Public Health – Vitamin B12 / The Nutrition Source
        </p>

        <p>
          3. NHS – Guidance on vegetarian and vegan nutrient planning, including iron and omega-3
        </p>

        <p>
          4. Harvard Health – Meeting nutrient needs on a plant-based diet
        </p>

      </div>

    </GeninoArticleTemplate>
  );
}