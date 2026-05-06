import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function WomenDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم غذایی زنان؛ راهنمای جامع تغذیه برای هورمون‌ها، قاعدگی، پوست، مو، استخوان و سلامت عمومی بدن"
      description="راهنمای کامل و علمی تغذیه زنان شامل مواد مغذی کلیدی، سلامت هورمون‌ها، چرخه قاعدگی، پوست و مو، استخوان‌ها، کنترل وزن، سلامت اندام‌های داخلی، غذاهای مفید و مضر و چند الگوی غذایی پیشنهادی."
      image="/images/articles/diets/women-diet/cover.jpg"
    >
      {/* ========================== */}
      {/* 🟢 مقدمه */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          چرا رژیم غذایی زنان اهمیت ویژه‌ای دارد؟
        </p>

        <p>
          بدن زنان فقط از نظر ظاهر با مردان فرق ندارد؛
          از نظر هورمون‌ها، چرخه قاعدگی، ذخایر آهن، سلامت استخوان،
          بارداری، شیردهی و یائسگی هم نیازهای متفاوتی دارد.
        </p>

        <p>
          به همین دلیل تغذیه در زنان فقط برای سیر شدن یا حتی فقط برای لاغری نیست.
          یک رژیم درست می‌تواند روی این بخش‌ها اثر بگذارد:
        </p>

        <p>
          • تعادل هورمونی <br />
          • کیفیت چرخه قاعدگی و انرژی در دوران پریود <br />
          • سلامت پوست، مو و ناخن <br />
          • سلامت استخوان‌ها و پیشگیری از ضعف استخوان <br />
          • کنترل وزن و متابولیسم <br />
          • سلامت قلب، خون‌سازی و عملکرد اندام‌های داخلی
        </p>

        <p>
          به زبان ساده:
          تغذیه درست برای زنان یعنی
          <strong> رساندن مواد لازم به بدنی که در طول زندگی مرحله‌های هورمونی و فیزیولوژیک مهمی را تجربه می‌کند.</strong>
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 مواد مغذی کلیدی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          مواد مغذی کلیدی برای سلامت زنان
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/key-nutrients" />

        <p>
          بعضی مواد مغذی در تغذیه زنان نقش بسیار پررنگ‌تری دارند.
          دانستن این مواد باعث می‌شود رژیم زنان واقعی‌تر و علمی‌تر طراحی شود.
        </p>

        <p>
          <strong className="text-yellow-600">۱. آهن (Iron)</strong><br />
          زنان در سنین باروری به‌دلیل خون‌ریزی ماهانه،
          بیشتر در معرض کمبود آهن و کم‌خونی قرار دارند.
          کمبود آهن می‌تواند خودش را به شکل خستگی، رنگ‌پریدگی،
          ضعف، ریزش مو، تپش قلب یا کاهش تمرکز نشان بدهد.
        </p>

        <p>
          <strong>منابع غذایی آهن:</strong><br />
          • گوشت قرمز <br />
          • جگر <br />
          • مرغ و ماهی <br />
          • عدس <br />
          • لوبیا و نخود <br />
          • اسفناج و سبزیجات برگ سبز <br />
          • تخم‌مرغ <br />
          • غلات غنی‌شده
        </p>

        <p>
          <strong>نکته مهم:</strong><br />
          آهن منابع حیوانی معمولاً جذب بهتری دارد.
          برای جذب بهتر آهن گیاهی، خوردن منبع ویتامین C کنار غذا مفید است؛
          مثل لیمو، پرتقال، کیوی، فلفل دلمه‌ای یا گوجه.
        </p>

        <p>
          <strong className="text-yellow-600">۲. کلسیم (Calcium)</strong><br />
          کلسیم برای سلامت استخوان‌ها، دندان‌ها، انقباض عضلات
          و عملکرد طبیعی بدن مهم است.
          این ماده در زنان اهمیت ویژه دارد،
          چون خطر ضعف استخوان و پوکی استخوان در زنان بیشتر است،
          به‌خصوص بعد از یائسگی.
        </p>

        <p>
          <strong>منابع غذایی کلسیم:</strong><br />
          • شیر <br />
          • ماست <br />
          • پنیر <br />
          • کنجد <br />
          • بادام <br />
          • بعضی سبزیجات برگ سبز <br />
          • نوشیدنی‌ها و محصولات غنی‌شده با کلسیم
        </p>

        <p>
          <strong className="text-yellow-600">۳. ویتامین D</strong><br />
          ویتامین D به جذب کلسیم کمک می‌کند
          و برای استخوان، عضلات و سلامت عمومی مهم است.
          اگر ویتامین D کم باشد،
          حتی دریافت کلسیم هم ممکن است به‌خوبی استفاده نشود.
        </p>

        <p>
          <strong>منابع و راه‌های تأمین:</strong><br />
          • نور آفتاب <br />
          • ماهی‌های چرب <br />
          • تخم‌مرغ <br />
          • محصولات غنی‌شده <br />
          • در بعضی افراد، با نظر پزشک مکمل
        </p>

        <p>
          <strong className="text-yellow-600">۴. فولات / فولیک اسید</strong><br />
          فولات برای خون‌سازی، تقسیم سلولی و سلامت بارداری مهم است.
          برای زنانی که در سن باروری هستند،
          اهمیت این ماده بیشتر هم می‌شود.
        </p>

        <p>
          <strong>منابع غذایی فولات:</strong><br />
          • سبزیجات برگ سبز <br />
          • عدس و حبوبات <br />
          • مرکبات <br />
          • آووکادو <br />
          • غلات غنی‌شده
        </p>

        <p>
          <strong className="text-yellow-600">۵. روی (Zinc)</strong><br />
          روی برای ترمیم بافت‌ها، عملکرد سیستم ایمنی،
          سلامت پوست، رشد مو و استحکام ناخن مهم است.
          وقتی کمبود روی وجود داشته باشد،
          ممکن است پوست ضعیف‌تر، ریزش مو بیشتر
          یا ترمیم زخم‌ها کندتر شود.
        </p>

        <p>
          <strong>منابع غذایی روی:</strong><br />
          • گوشت قرمز <br />
          • مرغ <br />
          • تخم‌مرغ <br />
          • عدس و لوبیا <br />
          • تخم کدو <br />
          • کنجد <br />
          • بادام هندی <br />
          • لبنیات
        </p>

        <p>
          <strong className="text-yellow-600">۶. پروتئین</strong><br />
          پروتئین فقط برای بدنسازی نیست.
          برای سلامت عضلات، پوست، مو، آنزیم‌ها،
          ترمیم بدن و حتی حس سیری مهم است.
        </p>

        <p>
          <strong>منابع پروتئین:</strong><br />
          • تخم‌مرغ <br />
          • مرغ <br />
          • ماهی <br />
          • گوشت <br />
          • ماست و پنیر <br />
          • عدس، لوبیا، نخود <br />
          • سویا و فرآورده‌های آن
        </p>

        <p>
          <strong className="text-yellow-600">۷. چربی‌های سالم و امگا ۳</strong><br />
          چربی سالم برای ساخت هورمون‌ها،
          سلامت مغز، کاهش التهاب و سلامت قلب مهم است.
          زنان نباید برای لاغری، همه چربی‌ها را حذف کنند.
        </p>

        <p>
          <strong>منابع خوب:</strong><br />
          • ماهی چرب مثل سالمون و ساردین <br />
          • گردو <br />
          • تخم کتان <br />
          • تخم چیا <br />
          • روغن زیتون <br />
          • آووکادو
        </p>

        <p>
          <strong className="text-yellow-600">۸. ویتامین‌های گروه B</strong><br />
          این گروه برای انرژی، خون‌سازی،
          سیستم عصبی و متابولیسم مهم‌اند.
          در خانم‌هایی که خستگی زیاد دارند،
          تغذیه ضعیف یا رژیم محدود دارند،
          این بخش مهم می‌شود.
        </p>

        <p>
          <strong className="text-yellow-600">۹. فیبر</strong><br />
          فیبر برای سلامت گوارش، کنترل اشتها،
          تعادل قند خون و سلامت قلب مهم است.
          همچنین در بعضی زنان به کنترل بهتر یبوست،
          مخصوصاً در دوران قاعدگی یا بارداری، کمک می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 هورمون‌ها */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه و تعادل هورمون‌ها در زنان
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/hormones" />

        <p>
          هورمون‌ها فقط با دارو یا آزمایش معنا ندارند.
          الگوی غذایی روزانه هم می‌تواند روی تعادل هورمونی اثر بگذارد.
        </p>

        <p>
          برای حمایت بهتر از تعادل هورمونی،
          این اصول مهم‌اند:
        </p>

        <p>
          • حذف نکردن افراطی چربی‌های سالم <br />
          • دریافت کافی پروتئین <br />
          • خوردن منظم و پرهیز از رژیم‌های خیلی سخت <br />
          • مصرف بیشتر میوه، سبزیجات و غذاهای کم‌فرآوری <br />
          • محدود کردن قند زیاد و خوراکی‌های فوق‌فرآوری‌شده
        </p>

        <p>
          وقتی فرد مدام رژیم‌های خیلی کم‌کالری بگیرد،
          وعده‌ها را حذف کند،
          یا فقط با شیرینی و خوراکی‌های بی‌ارزش زندگی کند،
          تعادل انرژی و هورمونی بدن می‌تواند به هم بخورد.
        </p>

        <p>
          این موضوع مخصوصاً در زنانی که
          بی‌نظمی قاعدگی، نوسان وزن، خستگی زیاد،
          یا علائم PMS شدید دارند مهم‌تر می‌شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 قاعدگی و PMS */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه در دوران قاعدگی و PMS
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/menstrual-cycle" />

        <p>
          در روزهای قبل از پریود و در دوران قاعدگی،
          خیلی از زنان تغییراتی در اشتها، خلق،
          احتباس آب، درد، خستگی و میل به شیرینی تجربه می‌کنند.
        </p>

        <p>
          در این دوره، این مواد غذایی می‌توانند مفیدتر باشند:
        </p>

        <p>
          <strong>برای جبران آهن:</strong><br />
          • گوشت قرمز <br />
          • عدس <br />
          • لوبیا <br />
          • تخم‌مرغ <br />
          • اسفناج
        </p>

        <p>
          <strong>برای انرژی بهتر:</strong><br />
          • نان سبوس‌دار <br />
          • جو دوسر <br />
          • برنج متعادل <br />
          • میوه‌ها
        </p>

        <p>
          <strong>برای کمک به تنش و خستگی:</strong><br />
          • ماست و منابع کلسیم <br />
          • موز <br />
          • مغزها <br />
          • تخم کدو <br />
          • سبزیجات برگ سبز
        </p>

        <p>
          <strong>چیزهایی که بهتر است کمتر شوند:</strong><br />
          • نمک زیاد، چون می‌تواند نفخ و احتباس آب را بدتر کند <br />
          • قند زیاد، چون نوسان انرژی را بیشتر می‌کند <br />
          • کافئین زیاد، چون در بعضی افراد اضطراب، حساسیت یا درد پستان را بیشتر می‌کند
        </p>

        <p>
          اگر پریودها خیلی شدید، خیلی نامنظم،
          یا همراه با ضعف زیاد هستند،
          فقط رژیم کافی نیست و بررسی پزشکی مهم است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 پوست مو ناخن */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه برای سلامت پوست، مو و ناخن
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/skin-hair-nails" />

        <p>
          پوست، مو و ناخن از اولین جاهایی هستند
          که ضعف تغذیه‌ای را نشان می‌دهند.
          اگر رژیم غذایی ضعیف باشد،
          بدن اولویت را به اندام‌های حیاتی می‌دهد
          و کیفیت پوست و مو افت می‌کند.
        </p>

        <p>
          <strong className="text-yellow-600">مواد مهم برای پوست:</strong><br />
          • ویتامین C: مرکبات، کیوی، فلفل دلمه‌ای، توت‌فرنگی <br />
          • ویتامین E: مغزها، دانه‌ها <br />
          • آنتی‌اکسیدان‌ها: میوه‌ها و سبزیجات رنگی <br />
          • آب کافی
        </p>

        <p>
          <strong className="text-yellow-600">مواد مهم برای مو:</strong><br />
          • پروتئین: تخم‌مرغ، مرغ، ماهی، لبنیات <br />
          • آهن: گوشت، عدس، اسفناج <br />
          • روی: تخم کدو، گوشت، حبوبات <br />
          • بیوتین و ویتامین‌های گروه B: تخم‌مرغ، مغزها، غلات کامل
        </p>

        <p>
          <strong className="text-yellow-600">مواد مهم برای ناخن:</strong><br />
          • پروتئین <br />
          • آهن <br />
          • روی <br />
          • ویتامین‌های گروه B
        </p>

        <p>
          اگر ریزش مو شدید، شکنندگی ناخن زیاد،
          یا مشکلات پوستی مداوم وجود دارد،
          فقط با مقاله و رژیم عمومی نباید جلو رفت
          و بررسی علت زمینه‌ای مهم است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 استخوان */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه برای سلامت استخوان‌ها
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/bones" />

        <p>
          سلامت استخوان در زنان بسیار مهم است،
          چون در سال‌های بعدی زندگی،
          مخصوصاً بعد از یائسگی،
          خطر تحلیل استخوان بیشتر می‌شود.
        </p>

        <p>
          برای سلامت استخوان‌ها این موارد مهم‌اند:
        </p>

        <p>
          • کلسیم کافی <br />
          • ویتامین D کافی <br />
          • پروتئین متعادل <br />
          • فعالیت بدنی، به‌ویژه تمرینات تحمل وزن و مقاومتی <br />
          • پرهیز از رژیم‌های خیلی سخت و کم‌غذا
        </p>

        <p>
          خوردن فقط لبنیات کافی نیست؛
          اگر ویتامین D کم باشد یا فرد تحرک کافی نداشته باشد،
          استخوان‌ها همچنان ممکن است در شرایط ایده‌آل نباشند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 وزن و متابولیسم */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه زنان، وزن، قد و متابولیسم
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/weight-metabolism" />

        <p>
          نیاز انرژی هر زن یکسان نیست.
          قد، وزن، سن، میزان فعالیت، وضعیت هورمونی،
          بیماری‌ها و مرحله زندگی
          همگی روی نیاز غذایی اثر دارند.
        </p>

        <p>
          برای مدیریت وزن سالم در زنان:
        </p>

        <p>
          • حذف وعده‌ها روش خوبی نیست <br />
          • رژیم‌های افراطی و خیلی کم‌کالری می‌توانند مضر باشند <br />
          • پروتئین کافی به حفظ عضله و سیری کمک می‌کند <br />
          • فیبر بیشتر به کنترل اشتها کمک می‌کند <br />
          • خواب و استرس هم روی وزن اثر دارند
        </p>

        <p>
          هدف بهتر این است که وزن در یک بازه سالم و پایدار باشد،
          نه اینکه فرد مدام وارد چرخه‌ی لاغری سریع و بازگشت وزن شود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 اندام‌های داخلی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه و سلامت اندام‌های داخلی زنان
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/internal-organs" />

        <p>
          رژیم زنان فقط برای پوست و هورمون نیست.
          تغذیه می‌تواند روی سلامت قلب، خون، گوارش،
          قند خون و عملکرد کلی بدن هم اثر بگذارد.
        </p>

        <p>
          <strong className="text-yellow-600">برای قلب:</strong><br />
          الگوی غذایی مدیترانه‌ای،
          محدود کردن غذاهای بسیار فرآوری‌شده،
          و استفاده از چربی‌های سالم مفید است.
        </p>

        <p>
          <strong className="text-yellow-600">برای خون‌سازی:</strong><br />
          آهن، فولات، ویتامین B12 و پروتئین مهم‌اند.
        </p>

        <p>
          <strong className="text-yellow-600">برای گوارش:</strong><br />
          فیبر، آب، میوه‌ها، سبزیجات و وعده‌های منظم کمک‌کننده‌اند.
        </p>

        <p>
          <strong className="text-yellow-600">برای کنترل قند خون:</strong><br />
          غذاهای کم‌فرآوری، پروتئین کافی،
          و کربوهیدرات‌های باکیفیت بهتر از خوراکی‌های خیلی شیرین هستند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جدول جامع */}
      {/* ========================== */}

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">
        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          جدول خلاصه مواد مغذی مهم برای زنان
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="border border-yellow-200 p-3">ماده مغذی</th>
                <th className="border border-yellow-200 p-3">برای چه چیزی مهم است؟</th>
                <th className="border border-yellow-200 p-3">منابع غذایی</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">آهن</td>
                <td className="border border-yellow-200 p-3">خون‌سازی، انرژی، پیشگیری از کم‌خونی</td>
                <td className="border border-yellow-200 p-3">گوشت قرمز، جگر، عدس، لوبیا، اسفناج، تخم‌مرغ</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">کلسیم</td>
                <td className="border border-yellow-200 p-3">استخوان، دندان، عضله</td>
                <td className="border border-yellow-200 p-3">شیر، ماست، پنیر، کنجد، بادام</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">ویتامین D</td>
                <td className="border border-yellow-200 p-3">کمک به جذب کلسیم، استخوان و عضله</td>
                <td className="border border-yellow-200 p-3">نور آفتاب، ماهی چرب، تخم‌مرغ، محصولات غنی‌شده</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">روی</td>
                <td className="border border-yellow-200 p-3">پوست، مو، ناخن، ایمنی</td>
                <td className="border border-yellow-200 p-3">گوشت، تخم کدو، تخم‌مرغ، حبوبات، مغزها</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">پروتئین</td>
                <td className="border border-yellow-200 p-3">عضلات، پوست، مو، ترمیم بدن</td>
                <td className="border border-yellow-200 p-3">مرغ، ماهی، تخم‌مرغ، لبنیات، حبوبات</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">امگا ۳</td>
                <td className="border border-yellow-200 p-3">قلب، مغز، کاهش التهاب</td>
                <td className="border border-yellow-200 p-3">سالمون، ساردین، گردو، تخم کتان</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">فولات</td>
                <td className="border border-yellow-200 p-3">خون‌سازی، تقسیم سلولی، سلامت بارداری</td>
                <td className="border border-yellow-200 p-3">سبزیجات برگ سبز، عدس، مرکبات، آووکادو</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">فیبر</td>
                <td className="border border-yellow-200 p-3">گوارش، سیری، قند خون، قلب</td>
                <td className="border border-yellow-200 p-3">میوه، سبزی، حبوبات، جو دوسر، غلات کامل</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 غذاهای مفید و مضر */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          غذاهای مفید و غذاهای مضر برای زنان
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/foods-to-eat-and-limit" />

        <p>
          <strong className="text-yellow-600">غذاهایی که بهتر است بیشتر در رژیم زنان باشند:</strong><br />
          • ماهی‌های چرب <br />
          • تخم‌مرغ <br />
          • لبنیات یا جایگزین‌های غنی‌شده <br />
          • عدس، لوبیا، نخود <br />
          • سبزیجات برگ سبز <br />
          • میوه‌های رنگی <br />
          • مغزها و دانه‌ها <br />
          • غلات کامل <br />
          • روغن زیتون
        </p>

        <p>
          <strong className="text-yellow-600">غذاهایی که بهتر است محدود شوند:</strong><br />
          • نوشیدنی‌های شیرین <br />
          • شیرینی زیاد <br />
          • فست‌فود <br />
          • چربی ترانس و روغن‌های صنعتی زیاد <br />
          • خوراکی‌های فوق‌فرآوری‌شده <br />
          • نمک زیاد <br />
          • رژیم‌های خیلی کم‌کالری و حذف‌کننده
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 رژیم‌های پیشنهادی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          چند الگوی غذایی دقیق و مفید برای زنان
        </p>

        <HorizontalScrollGallery folder="articles/diets/women-diet/diet-plans" />

        <p>
          زنان بسته به هدف خود می‌توانند از الگوهای مختلفی استفاده کنند.
          این‌ها رژیم‌های «قالبی» نیستند،
          بلکه مسیرهای معقول و کاربردی‌اند:
        </p>

        <p>
          <strong className="text-yellow-600">۱. رژیم مدیترانه‌ای برای سلامت عمومی و هورمون‌ها</strong><br />
          مناسب برای:
          سلامت قلب، کاهش التهاب، حمایت از تعادل هورمونی، انرژی پایدار
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • روغن زیتون <br />
          • ماهی و حبوبات <br />
          • سبزیجات و میوه فراوان <br />
          • مغزها و دانه‌ها <br />
          • غلات کامل <br />
          • غذاهای کمتر فرآوری‌شده
        </p>

        <p>
          <strong className="text-yellow-600">۲. رژیم غنی از آهن برای زنان با پریود سنگین یا کم‌خونی</strong><br />
          مناسب برای:
          خستگی، ضعف، ریزش مو ناشی از کمبود آهن، پریودهای سنگین
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • گوشت قرمز متعادل <br />
          • عدس و لوبیا <br />
          • اسفناج و سبزیجات برگ سبز <br />
          • تخم‌مرغ <br />
          • ویتامین C کنار وعده‌ها
        </p>

        <p>
          <strong className="text-yellow-600">۳. رژیم حمایتی برای PMS و قاعدگی</strong><br />
          مناسب برای:
          نفخ، خستگی، هوس غذایی، نوسان خلق، دردهای خفیف تا متوسط
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • کلسیم کافی <br />
          • منیزیم غذایی از مغزها و سبزیجات <br />
          • نمک کمتر <br />
          • قند کمتر <br />
          • کافئین متعادل یا کمتر
        </p>

        <p>
          <strong className="text-yellow-600">۴. رژیم پوست و مو</strong><br />
          مناسب برای:
          ریزش مو، پوست کدر، شکنندگی ناخن، رژیم‌های ضعیف قبلی
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • پروتئین کافی <br />
          • آهن و روی کافی <br />
          • امگا ۳ <br />
          • ویتامین C <br />
          • آب کافی
        </p>

        <p>
          <strong className="text-yellow-600">۵. رژیم متعادل کنترل وزن برای زنان</strong><br />
          مناسب برای:
          حفظ وزن، کاهش وزن پایدار، جلوگیری از نوسان شدید وزن
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • پروتئین کافی در هر وعده <br />
          • فیبر بیشتر <br />
          • وعده‌های منظم <br />
          • قند افزوده کمتر <br />
          • غذای خانگی بیشتر
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 نمونه برنامه 7 روزه */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          نمونه برنامه غذایی ۷ روزه برای زنان
        </p>

        <p>
          این برنامه یک نمونه عمومی و آموزشی است،
          نه نسخه شخصی‌سازی‌شده پزشکی.
          هدفش این است که ببینی یک رژیم متعادل برای زنان
          در عمل چه شکلی می‌تواند باشد.
        </p>

        <div className="space-y-5">
          <p>
            <strong className="text-yellow-600">روز اول</strong><br />
            صبحانه: نان سبوس‌دار + تخم‌مرغ + خیار و گوجه <br />
            میان‌وعده: سیب + چند بادام <br />
            ناهار: برنج + مرغ + سالاد <br />
            میان‌وعده: ماست <br />
            شام: سوپ سبزیجات + پنیر کم‌نمک
          </p>

          <p>
            <strong className="text-yellow-600">روز دوم</strong><br />
            صبحانه: جو دوسر + شیر یا ماست + موز <br />
            میان‌وعده: پرتقال <br />
            ناهار: عدس‌پلو با گوشت یا سویا <br />
            میان‌وعده: گردو <br />
            شام: املت + سالاد
          </p>

          <p>
            <strong className="text-yellow-600">روز سوم</strong><br />
            صبحانه: پنیر + گردو + نان سنگک <br />
            میان‌وعده: کیوی <br />
            ناهار: ماهی + برنج + سبزیجات <br />
            میان‌وعده: ماست و خیار <br />
            شام: خوراک لوبیا + نان
          </p>

          <p>
            <strong className="text-yellow-600">روز چهارم</strong><br />
            صبحانه: تخم‌مرغ آب‌پز + میوه <br />
            میان‌وعده: چند عدد مغز <br />
            ناهار: خوراک مرغ + سیب‌زمینی + سالاد <br />
            میان‌وعده: شیر <br />
            شام: سوپ جو
          </p>

          <p>
            <strong className="text-yellow-600">روز پنجم</strong><br />
            صبحانه: ماست + جو دوسر + توت یا موز <br />
            میان‌وعده: خرما با گردو <br />
            ناهار: قورمه سبزی یا خوراک سبزیجات با برنج متعادل <br />
            میان‌وعده: هویج یا خیار <br />
            شام: املت قارچ یا ساندویچ خانگی سبک
          </p>

          <p>
            <strong className="text-yellow-600">روز ششم</strong><br />
            صبحانه: نان سبوس‌دار + کره بادام‌زمینی + موز <br />
            میان‌وعده: ماست <br />
            ناهار: گوشت یا حبوبات + سالاد بزرگ + نان <br />
            میان‌وعده: میوه <br />
            شام: خوراک عدس و سبزیجات
          </p>

          <p>
            <strong className="text-yellow-600">روز هفتم</strong><br />
            صبحانه: نیمرو + نان + سبزیجات <br />
            میان‌وعده: سیب یا پرتقال <br />
            ناهار: ماهی یا مرغ + برنج قهوه‌ای یا معمولی متعادل + سالاد <br />
            میان‌وعده: چند بادام و کشمش <br />
            شام: ماست، سبزیجات و یک وعده سبک خانگی
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در تغذیه زنان
        </p>

        <p>
          <strong className="text-yellow-600">۱. رژیم‌های لاغری شدید</strong><br />
          این رژیم‌ها می‌توانند کمبود آهن، ضعف، اختلال قاعدگی،
          ریزش مو و به‌هم‌خوردن تعادل هورمونی ایجاد کنند.
        </p>

        <p>
          <strong className="text-yellow-600">۲. کم‌توجهی به آهن</strong><br />
          خیلی از زنان خستگی خود را فقط به استرس نسبت می‌دهند،
          در حالی که کمبود آهن ممکن است نقش مهمی داشته باشد.
        </p>

        <p>
          <strong className="text-yellow-600">۳. حذف کامل چربی</strong><br />
          چربی سالم برای هورمون‌ها ضروری است.
        </p>

        <p>
          <strong className="text-yellow-600">۴. کمبود پروتئین</strong><br />
          باعث افت سیری، ضعف عضلانی،
          و آسیب به پوست و مو می‌شود.
        </p>

        <p>
          <strong className="text-yellow-600">۵. مصرف زیاد شیرینی و خوراکی‌های صنعتی</strong><br />
          باعث نوسان انرژی، افزایش التهاب
          و بدتر شدن کیفیت رژیم می‌شود.
        </p>

        <p>
          <strong className="text-yellow-600">۶. بی‌توجهی به آب و فیبر</strong><br />
          این موضوع می‌تواند روی گوارش، پوست و احساس انرژی اثر منفی بگذارد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧭 چه کسانی باید برنامه فردی‌تر داشته باشند؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          چه زنانی باید رژیم خود را فردی‌تر تنظیم کنند؟
        </p>

        <p>
          در این شرایط بهتر است برنامه غذایی
          با نظر پزشک یا متخصص تغذیه دقیق‌تر تنظیم شود:
        </p>

        <p>
          • زنان باردار یا شیرده <br />
          • زنان با پریودهای بسیار سنگین <br />
          • زنان با کم‌خونی <br />
          • افرادی با بیماری تیروئید، دیابت یا مشکلات گوارشی <br />
          • زنان با پوکی استخوان یا کمبود ویتامین D <br />
          • زنانی که ریزش موی شدید یا کاهش وزن ناخواسته دارند
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع بندی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی نهایی رژیم غذایی زنان
        </p>

        <p>
          رژیم زنان باید چیزی فراتر از یک برنامه لاغری باشد.
          این رژیم باید از
          <strong> خون‌سازی، هورمون‌ها، استخوان‌ها، پوست، مو، انرژی و سلامت عمومی </strong>
          حمایت کند.
        </p>

        <p>
          اگر یک زن بخواهد واقعاً از بدنش مراقبت کند،
          باید به آهن، کلسیم، ویتامین D، روی،
          پروتئین، چربی‌های سالم، فیبر و نظم غذایی توجه کند.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «تغذیه زنان فقط غذا خوردن نیست؛
            یعنی حمایت روزانه از بدنی که هر ماه، هر سال،
            و در هر مرحله زندگی نیازهای خاص خودش را دارد.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 📚 منابع */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          منابع علمی
        </p>

        <p>
          1. Office on Women’s Health – Healthy eating and women
        </p>

        <p>
          2. Office on Women’s Health – Vitamins and minerals for women
        </p>

        <p>
          3. NIH Office of Dietary Supplements – Iron Fact Sheet
        </p>

        <p>
          4. NIH Office of Dietary Supplements – Vitamin D Fact Sheet
        </p>

        <p>
          5. NIH Office of Dietary Supplements – Calcium Fact Sheet
        </p>

        <p>
          6. NHS – Iron
        </p>

        <p>
          7. ACOG – Premenstrual Syndrome (PMS)
        </p>

        <p>
          8. Office on Women’s Health – Menopause and your health
        </p>
      </div>
    </GeninoArticleTemplate>
  );
}