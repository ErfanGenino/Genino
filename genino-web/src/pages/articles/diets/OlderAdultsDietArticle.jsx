import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function OlderAdultsDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم سالمندان؛ راهنمای جامع تغذیه برای حفظ عضله، استخوان، انرژی و کیفیت زندگی"
      description="راهنمای کامل و علمی تغذیه سالمندان شامل مواد مغذی کلیدی، حفظ عضله و استخوان، آب‌رسانی، یبوست، کاهش اشتها، غذاهای مفید و مضر، و نمونه برنامه غذایی برای سالمندان."
      image="/images/articles/diets/older-adults-diet/cover.jpg"
    >
      {/* ========================== */}
      {/* 🟢 مقدمه */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          چرا رژیم غذایی سالمندان اهمیت ویژه‌ای دارد؟
        </p>

        <p>
          با بالا رفتن سن، بدن فقط پیرتر نمی‌شود؛
          نیازهای تغذیه‌ای هم تغییر می‌کنند.
          خیلی از سالمندان نسبت به جوانی
          به کالری کمتری نیاز دارند،
          اما همچنان باید مواد مغذی کافی بگیرند.
        </p>

        <p>
          به همین دلیل، رژیم سالمندان باید بیشتر از قبل
          روی <strong>کیفیت غذا</strong> تمرکز کند،
          نه فقط حجم غذا.
        </p>

        <p>
          تغذیه مناسب در سالمندی می‌تواند روی این بخش‌ها اثر بگذارد:
        </p>

        <p>
          • حفظ عضلات و توان حرکتی <br />
          • سلامت استخوان‌ها و پیشگیری از زمین خوردن <br />
          • انرژی روزانه و کیفیت زندگی <br />
          • سلامت گوارش و پیشگیری از یبوست <br />
          • سلامت مغز و تمرکز <br />
          • پیشگیری از ضعف تغذیه‌ای و کاهش وزن ناخواسته
        </p>

        <p>
          به زبان ساده:
          رژیم سالمندان یعنی
          <strong>غذا خوردن به شکلی که بدن در سن بالاتر همچنان قوی، متعادل و سرحال‌تر بماند.</strong>
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 مواد مغذی کلیدی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          مواد مغذی کلیدی برای سالمندان
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/key-nutrients" />

        <p>
          در سالمندی بعضی مواد مغذی اهمیت بیشتری پیدا می‌کنند
          و کمبود آن‌ها می‌تواند خیلی سریع‌تر خودش را نشان بدهد.
        </p>

        <p>
          <strong className="text-yellow-600">۱. پروتئین</strong><br />
          پروتئین در سالمندی اهمیت ویژه‌ای دارد،
          چون با افزایش سن خطر کاهش توده عضلانی بیشتر می‌شود.
          اگر پروتئین کافی دریافت نشود،
          فرد ممکن است ضعیف‌تر شود،
          زودتر خسته شود،
          یا تعادل بدنی و توان حرکتی‌اش افت کند.
        </p>

        <p>
          <strong>منابع خوب پروتئین:</strong><br />
          • تخم‌مرغ <br />
          • مرغ <br />
          • ماهی <br />
          • گوشت <br />
          • ماست و پنیر <br />
          • عدس، لوبیا، نخود <br />
          • سویا و فرآورده‌های آن
        </p>

        <p>
          <strong className="text-yellow-600">۲. کلسیم</strong><br />
          سالمندان بیشتر در معرض ضعف استخوان و پوکی استخوان هستند.
          بنابراین کلسیم برای سلامت استخوان و دندان خیلی مهم است.
        </p>

        <p>
          <strong>منابع کلسیم:</strong><br />
          • شیر <br />
          • ماست <br />
          • پنیر <br />
          • کنجد <br />
          • بادام <br />
          • بعضی سبزیجات برگ سبز <br />
          • محصولات غنی‌شده
        </p>

        <p>
          <strong className="text-yellow-600">۳. ویتامین D</strong><br />
          ویتامین D برای استفاده بهتر بدن از کلسیم،
          سلامت استخوان و عملکرد عضلات مهم است.
          در سالمندان کمبود آن شایع‌تر دیده می‌شود.
        </p>

        <p>
          <strong>منابع و راه‌های تأمین:</strong><br />
          • نور آفتاب <br />
          • ماهی‌های چرب <br />
          • تخم‌مرغ <br />
          • محصولات غنی‌شده <br />
          • در بعضی افراد، مکمل با نظر پزشک
        </p>

        <p>
          <strong className="text-yellow-600">۴. ویتامین B12</strong><br />
          بعضی سالمندان در جذب B12 از غذا مشکل بیشتری پیدا می‌کنند.
          این ویتامین برای سیستم عصبی،
          خون‌سازی و عملکرد ذهنی مهم است.
        </p>

        <p>
          <strong>منابع غذایی B12:</strong><br />
          • گوشت <br />
          • ماهی <br />
          • تخم‌مرغ <br />
          • شیر و لبنیات <br />
          • غلات صبحانه و بعضی محصولات غنی‌شده
        </p>

        <p>
          <strong className="text-yellow-600">۵. فیبر</strong><br />
          یبوست در سالمندی شایع است
          و فیبر همراه با آب کافی می‌تواند خیلی کمک‌کننده باشد.
        </p>

        <p>
          <strong>منابع خوب فیبر:</strong><br />
          • میوه‌ها <br />
          • سبزیجات <br />
          • حبوبات <br />
          • جو دوسر <br />
          • نان و غلات کامل
        </p>

        <p>
          <strong className="text-yellow-600">۶. آب و مایعات</strong><br />
          با بالا رفتن سن، حس تشنگی در بعضی افراد کمتر می‌شود.
          همین موضوع می‌تواند خطر کم‌آبی را بالا ببرد.
        </p>

        <p>
          <strong>منابع خوب مایعات:</strong><br />
          • آب <br />
          • شیر <br />
          • دوغ کم‌نمک <br />
          • سوپ سبک <br />
          • چای و نوشیدنی‌های ساده در حد متعادل
        </p>

        <p>
          <strong className="text-yellow-600">۷. پتاسیم و منیزیم</strong><br />
          این مواد در عملکرد عضله، اعصاب،
          فشار خون و تعادل عمومی بدن نقش دارند.
        </p>

        <p>
          <strong>منابع غذایی:</strong><br />
          • موز <br />
          • سبزیجات برگ سبز <br />
          • حبوبات <br />
          • مغزها <br />
          • لبنیات <br />
          • بعضی میوه‌ها و سبزیجات
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 عضله و ضعف */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه برای حفظ عضلات و توان حرکتی در سالمندی
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/muscle-strength" />

        <p>
          یکی از مهم‌ترین نگرانی‌ها در سالمندی،
          کاهش تدریجی عضله و ضعف بدنی است.
          این موضوع می‌تواند روی راه رفتن،
          تعادل، بالا رفتن از پله، بلند شدن از صندلی
          و حتی استقلال فرد در زندگی روزمره اثر بگذارد.
        </p>

        <p>
          برای حمایت بهتر از عضلات:
        </p>

        <p>
          • پروتئین را در طول روز پخش کن <br />
          • فقط به یک وعده سنگین تکیه نکن <br />
          • اگر اشتها کم است، وعده‌های کوچک‌تر ولی مغذی‌تر داشته باش <br />
          • فعالیت بدنی مجاز و تمرینات قدرتی سبک را در حد توان حفظ کن
        </p>

        <p>
          <strong>غذاهای کمک‌کننده برای عضله:</strong><br />
          • تخم‌مرغ <br />
          • ماست و پنیر <br />
          • مرغ و ماهی <br />
          • عدس و حبوبات <br />
          • شیر <br />
          • سوپ‌های مغذی با پروتئین
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 استخوان */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه برای استخوان‌ها و پیشگیری از ضعف بدنی
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/bones-balance" />

        <p>
          در سالمندی،
          سلامت استخوان فقط برای عکس رادیولوژی مهم نیست؛
          برای پیشگیری از شکستگی، افتادن و وابستگی هم مهم است.
        </p>

        <p>
          برای حمایت بهتر از استخوان‌ها:
        </p>

        <p>
          • کلسیم کافی بگیر <br />
          • ویتامین D را جدی بگیر <br />
          • پروتئین کافی داشته باش <br />
          • تا حد توان فعال بمان <br />
          • از رژیم‌های خیلی ضعیف پرهیز کن
        </p>

        <p>
          سالمندی‌ای که با تغذیه ضعیف، تحرک کم
          و کمبود ویتامین D همراه شود،
          می‌تواند خطر ضعف استخوان و شکستگی را بیشتر کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 آب‌رسانی */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          آب‌رسانی و کم‌آبی در سالمندان
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/hydration" />

        <p>
          کم‌آبی در سالمندان می‌تواند خیلی آرام و بی‌سروصدا اتفاق بیفتد،
          چون بعضی افراد کمتر احساس تشنگی می‌کنند
          یا عمداً به خاطر مشکلات رفت‌وآمد یا ادرار، کمتر آب می‌نوشند.
        </p>

        <p>
          علائم کم‌آبی ممکن است شامل این موارد باشد:
        </p>

        <p>
          • خشکی دهان <br />
          • ضعف و بی‌حالی <br />
          • گیجی یا خواب‌آلودگی <br />
          • یبوست <br />
          • ادرار تیره
        </p>

        <p>
          برای پیشگیری:
        </p>

        <p>
          • آب را در دسترس بگذار <br />
          • فقط منتظر تشنگی نمان <br />
          • از سوپ، شیر و نوشیدنی‌های ساده هم کمک بگیر <br />
          • در هوای گرم یا بیماری‌ها، دقت بیشتری داشته باش
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 کاهش اشتها و جویدن */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          اگر اشتها کم شده یا جویدن سخت شده باشد چه کنیم؟
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/appetite-chewing" />

        <p>
          در سالمندی بعضی افراد کمتر گرسنه می‌شوند،
          بعضی‌ها زودتر سیر می‌شوند،
          و بعضی‌ها با جویدن یا بلع مشکل دارند.
          این موضوع می‌تواند خطر ضعف تغذیه‌ای را بالا ببرد.
        </p>

        <p>
          راهکارهای کمک‌کننده:
        </p>

        <p>
          • وعده‌های کوچک‌تر اما مغذی‌تر <br />
          • پوره، سوپ غلیظ، خوراک نرم، ماست و غذاهای با جویدن آسان <br />
          • استفاده از تخم‌مرغ، لبنیات، حبوبات نرم و گوشت پخته نرم <br />
          • میان‌وعده‌های ساده ولی پُرمغذی <br />
          • رسیدگی به مشکلات دندان یا پروتز
        </p>

        <p>
          نمونه غذاهای مناسب‌تر:
        </p>

        <p>
          • سوپ جو و مرغ <br />
          • عدسی <br />
          • پوره سیب‌زمینی <br />
          • ماست <br />
          • املت نرم <br />
          • حلیم سبک و متعادل <br />
          • خوراک حبوبات نرم
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 یبوست و گوارش */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          تغذیه برای یبوست و سلامت گوارش در سالمندی
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/constipation-digestion" />

        <p>
          یبوست در سالمندی شایع است
          و می‌تواند کیفیت زندگی را پایین بیاورد.
          تغذیه مناسب یکی از پایه‌های اصلی مدیریت آن است.
        </p>

        <p>
          برای کمک به گوارش:
        </p>

        <p>
          • فیبر را بیشتر کن <br />
          • آب کافی بنوش <br />
          • میوه و سبزیجات روزانه داشته باش <br />
          • تحرک را در حد توان حفظ کن <br />
          • غذاهای خیلی خشک و کم‌فیبر را کمتر کن
        </p>

        <p>
          غذاهای کمک‌کننده:
        </p>

        <p>
          • آلو و انجیر <br />
          • سیب و گلابی <br />
          • جو دوسر <br />
          • عدس و لوبیا <br />
          • سبزیجات پخته یا سالاد در صورت تحمل
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جدول جامع */}
      {/* ========================== */}

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">
        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          جدول خلاصه مواد مغذی مهم برای سالمندان
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
                <td className="border border-yellow-200 p-3 font-semibold">پروتئین</td>
                <td className="border border-yellow-200 p-3">حفظ عضله، ترمیم، توان بدنی</td>
                <td className="border border-yellow-200 p-3">تخم‌مرغ، مرغ، ماهی، لبنیات، حبوبات</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">کلسیم</td>
                <td className="border border-yellow-200 p-3">استخوان و دندان</td>
                <td className="border border-yellow-200 p-3">شیر، ماست، پنیر، کنجد، بادام</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">ویتامین D</td>
                <td className="border border-yellow-200 p-3">کمک به کلسیم، استخوان و عضله</td>
                <td className="border border-yellow-200 p-3">نور آفتاب، ماهی چرب، تخم‌مرغ، محصولات غنی‌شده</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">ویتامین B12</td>
                <td className="border border-yellow-200 p-3">اعصاب، خون‌سازی، تمرکز</td>
                <td className="border border-yellow-200 p-3">گوشت، ماهی، تخم‌مرغ، لبنیات، محصولات غنی‌شده</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">فیبر</td>
                <td className="border border-yellow-200 p-3">گوارش و یبوست</td>
                <td className="border border-yellow-200 p-3">میوه، سبزی، حبوبات، جو دوسر، غلات کامل</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">آب و مایعات</td>
                <td className="border border-yellow-200 p-3">جلوگیری از کم‌آبی، یبوست و ضعف</td>
                <td className="border border-yellow-200 p-3">آب، شیر، سوپ سبک، نوشیدنی‌های ساده</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">منیزیم و پتاسیم</td>
                <td className="border border-yellow-200 p-3">عضله، اعصاب، فشار خون</td>
                <td className="border border-yellow-200 p-3">موز، مغزها، حبوبات، سبزیجات برگ سبز</td>
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
          غذاهای مفید و غذاهایی که بهتر است محدود شوند
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/foods-to-eat-and-limit" />

        <p>
          <strong className="text-yellow-600">غذاهایی که بهتر است بیشتر در رژیم سالمندان باشند:</strong><br />
          • تخم‌مرغ <br />
          • لبنیات <br />
          • مرغ و ماهی <br />
          • عدس، لوبیا و نخود <br />
          • میوه‌ها <br />
          • سبزیجات <br />
          • جو دوسر و غلات کامل <br />
          • سوپ‌ها و غذاهای نرم ولی مغذی <br />
          • مغزها و دانه‌ها در صورت توانایی جویدن
        </p>

        <p>
          <strong className="text-yellow-600">چیزهایی که بهتر است محدود شوند:</strong><br />
          • فست‌فود <br />
          • نوشیدنی‌های بسیار شیرین <br />
          • تنقلات خیلی شور <br />
          • غذاهای خیلی سفت برای افرادی که مشکل جویدن دارند <br />
          • رژیم‌های خیلی کم‌کالری <br />
          • غذاهای کم‌ارزش ولی پُرحجم
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 الگوهای غذایی پیشنهادی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          چند الگوی غذایی مفید برای سالمندان
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/diet-patterns" />

        <p>
          در سالمندی هدف اصلی معمولاً لاغری سریع نیست.
          هدف، حفظ توان، پیشگیری از ضعف،
          و بالا نگه داشتن کیفیت زندگی است.
        </p>

        <p>
          <strong className="text-yellow-600">۱. رژیم متعادل سالمندی</strong><br />
          مناسب برای:
          بیشتر سالمندان سالم
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • پروتئین کافی <br />
          • لبنیات یا جایگزین مناسب <br />
          • میوه و سبزی روزانه <br />
          • غلات باکیفیت <br />
          • آب کافی
        </p>

        <p>
          <strong className="text-yellow-600">۲. رژیم ضد ضعف عضلانی</strong><br />
          مناسب برای:
          سالمندان ضعیف‌تر، کم‌اشتها، یا در معرض افت عضله
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • پروتئین بیشتر در طول روز <br />
          • میان‌وعده‌های مغذی <br />
          • غذاهای نرم و راحت‌تر برای خوردن <br />
          • پرهیز از خالی گذاشتن وعده‌ها
        </p>

        <p>
          <strong className="text-yellow-600">۳. رژیم ضد یبوست</strong><br />
          مناسب برای:
          سالمندان با یبوست، کم‌آبی یا غذای کم‌فیبر
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • فیبر بیشتر <br />
          • آب بیشتر <br />
          • میوه، سبزی، جو دوسر، حبوبات <br />
          • تحرک در حد توان
        </p>

        <p>
          <strong className="text-yellow-600">۴. رژیم نرم و پُرمغذی</strong><br />
          مناسب برای:
          سالمندانی که مشکل جویدن، بلع یا اشتهای کم دارند
        </p>

        <p>
          <strong>ویژگی‌ها:</strong><br />
          • سوپ‌های مغذی <br />
          • پوره‌ها <br />
          • تخم‌مرغ، ماست، خوراک نرم <br />
          • وعده‌های کوچک‌تر اما مقوی‌تر
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 برنامه 7 روزه */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          نمونه برنامه غذایی ۷ روزه برای سالمندان
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/7-day-plan" />

        <p>
          این برنامه یک نمونه آموزشی عمومی است
          تا نشان دهد یک رژیم متعادل برای سالمندان
          در عمل چه شکلی می‌تواند باشد.
        </p>

        <div className="space-y-5">
          <p>
            <strong className="text-yellow-600">روز اول</strong><br />
            صبحانه: نان نرم + پنیر + تخم‌مرغ + چای یا شیر <br />
            میان‌وعده: سیب یا موز <br />
            ناهار: برنج + مرغ + سبزیجات پخته <br />
            میان‌وعده: ماست <br />
            شام: سوپ سبک + نان
          </p>

          <p>
            <strong className="text-yellow-600">روز دوم</strong><br />
            صبحانه: جو دوسر + شیر + گردو خردشده <br />
            میان‌وعده: پرتقال <br />
            ناهار: عدس‌پلو یا خوراک عدس <br />
            میان‌وعده: چند عدد مغز <br />
            شام: املت نرم + سالاد یا سبزیجات پخته
          </p>

          <p>
            <strong className="text-yellow-600">روز سوم</strong><br />
            صبحانه: نان سنگک نرم + پنیر + گردو <br />
            میان‌وعده: ماست و میوه <br />
            ناهار: ماهی + برنج + سبزیجات <br />
            میان‌وعده: موز <br />
            شام: خوراک لوبیا + نان
          </p>

          <p>
            <strong className="text-yellow-600">روز چهارم</strong><br />
            صبحانه: تخم‌مرغ آب‌پز + نان + خیار و گوجه <br />
            میان‌وعده: چند عدد بادام <br />
            ناهار: خوراک گوشت یا مرغ + سیب‌زمینی + سبزیجات <br />
            میان‌وعده: شیر <br />
            شام: سوپ جو
          </p>

          <p>
            <strong className="text-yellow-600">روز پنجم</strong><br />
            صبحانه: ماست + جو دوسر + میوه <br />
            میان‌وعده: خرما و گردو <br />
            ناهار: خوراک سبزیجات و حبوبات + برنج متعادل <br />
            میان‌وعده: هویج پخته یا میوه نرم <br />
            شام: ساندویچ خانگی سبک با مرغ نرم
          </p>

          <p>
            <strong className="text-yellow-600">روز ششم</strong><br />
            صبحانه: نان سبوس‌دار نرم + کره بادام‌زمینی + موز <br />
            میان‌وعده: ماست <br />
            ناهار: گوشت یا حبوبات + سالاد بزرگ یا سبزیجات پخته + نان <br />
            میان‌وعده: میوه <br />
            شام: خوراک عدس و سبزیجات
          </p>

          <p>
            <strong className="text-yellow-600">روز هفتم</strong><br />
            صبحانه: نیمرو + نان + سبزیجات نرم <br />
            میان‌وعده: سیب یا پرتقال <br />
            ناهار: مرغ یا ماهی + برنج + سالاد <br />
            میان‌وعده: چند بادام و کشمش <br />
            شام: ماست، سبزیجات و یک وعده خانگی سبک
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در رژیم سالمندان
        </p>

        <p>
          <strong className="text-yellow-600">۱. کم خوردن از ترس چاقی</strong><br />
          در بعضی سالمندان، مسئله اصلی اضافه‌وزن نیست،
          بلکه ضعف تغذیه‌ای و افت عضله است.
        </p>

        <p>
          <strong className="text-yellow-600">۲. بی‌توجهی به پروتئین</strong><br />
          حذف یا کم شدن زیاد پروتئین
          می‌تواند ضعف بدنی را بیشتر کند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. کم‌نوشیدن آب</strong><br />
          این موضوع می‌تواند باعث یبوست،
          ضعف و حتی گیجی شود.
        </p>

        <p>
          <strong className="text-yellow-600">۴. نادیده گرفتن مشکل جویدن و بلع</strong><br />
          اگر غذا خوردن سخت شده باشد،
          باید شکل غذا تغییر کند، نه اینکه وعده‌ها حذف شوند.
        </p>

        <p>
          <strong className="text-yellow-600">۵. اتکا به غذاهای کم‌ارزش ولی راحت</strong><br />
          فقط بیسکویت، چای، نان خالی یا خوراکی‌های شیرین
          نمی‌توانند نیازهای تغذیه‌ای سالمند را تأمین کنند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🧭 چه کسانی باید برنامه فردی‌تر داشته باشند؟ */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          چه سالمندانی باید برنامه غذایی فردی‌تر داشته باشند؟
        </p>

        <p>
          در این شرایط بهتر است رژیم با نظر پزشک یا متخصص تغذیه
          دقیق‌تر تنظیم شود:
        </p>

        <p>
          • سالمندانی که کاهش وزن ناخواسته دارند <br />
          • افراد با بی‌اشتهایی یا ضعف شدید <br />
          • سالمندانی که مشکل جویدن یا بلع دارند <br />
          • افراد با دیابت، بیماری کلیوی، قلبی یا کبدی <br />
          • کسانی که داروهای متعدد مصرف می‌کنند <br />
          • سالمندانی که زمین خوردن، ضعف زیاد یا کم‌خونی دارند
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع بندی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی نهایی رژیم سالمندان
        </p>

        <HorizontalScrollGallery folder="articles/diets/older-adults-diet/summary" />

        <p>
          رژیم سالمندان باید از
          <strong> عضله، استخوان، انرژی، گوارش، آب‌رسانی و کیفیت زندگی </strong>
          هم‌زمان حمایت کند.
        </p>

        <p>
          اگر یک سالمند بخواهد بدنی پایدارتر، قوی‌تر و مستقل‌تر داشته باشد،
          باید به پروتئین، کلسیم، ویتامین D، B12،
          فیبر، آب کافی و شکل مناسب غذا توجه کند.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «رژیم سالمندان فقط کمتر خوردن یا سبک خوردن نیست؛
            یعنی غذا خوردن هوشمندانه برای حفظ توان، تعادل و کیفیت زندگی.»
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
          1. National Institute on Aging (NIA) – Healthy Eating As You Age
        </p>

        <p>
          2. National Institute on Aging (NIA) – Healthy Meal Planning: Tips for Older Adults
        </p>

        <p>
          3. National Institute on Aging (NIA) – Vitamins and Minerals for Older Adults
        </p>

        <p>
          4. MedlinePlus – Nutrition for Older Adults
        </p>

        <p>
          5. NHS – The Eatwell Guide
        </p>
      </div>
    </GeninoArticleTemplate>
  );
}