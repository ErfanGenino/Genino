import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function HomeWorkoutWithoutEquipmentArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          ورزش در خانه بدون تجهیزات
          <br />
          <span className="inline-block mt-5">
            تناسب اندام با وزن بدن، ساده، در دسترس و مؤثر
          </span>
        </>
      }
      description="برای داشتن بدنی سالم و فعال، همیشه به باشگاه و تجهیزات گران‌قیمت نیاز نیست. این مقاله به‌صورت علمی اما ساده توضیح می‌دهد چگونه می‌توان با وزن بدن و تمرین‌های پایه، در خانه ورزش مؤثر و ایمن انجام داد."
      image="/images/articles/home-workout/no-equipment/cover.jpg"
    >
      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          بدن شما، بهترین وسیله تمرین است
        </p>

        <p>
          خیلی‌ها فکر می‌کنند بدون دمبل یا دستگاه، ورزش نتیجه ندارد؛
          در حالی که تمرین با وزن بدن یکی از
          <strong>اصولی‌ترین و علمی‌ترین</strong> روش‌های تمرین است.
        </p>

        <p className="font-semibold text-yellow-700">
          سادگی، راز تداوم ورزش است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا ورزش بدون تجهیزات مؤثر است؟
        </p>


        <ul className="list-disc pr-6 space-y-3">
          <li>درگیرشدن هم‌زمان چند گروه عضلانی</li>
          <li>افزایش قدرت عملکردی بدن</li>
          <li>قابل انجام در هر مکان و هر زمان</li>
          <li>قابل تنظیم برای مبتدی تا حرفه‌ای</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بدن برای حرکت طراحی شده، نه دستگاه.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🏃 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) بهترین تمرین‌های پایه با وزن بدن (با روش اجرا)
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/no-equipment/exercises" />

        {/* تمرین‌ها با توضیح کوتاه */}
        <div className="space-y-6">
          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">اسکات (Squat)</p>
            <p className="text-gray-700 mt-2">
              پاها به اندازه عرض شانه، شکم کمی سفت؛ باسن را مثل نشستن روی صندلی عقب بده،
              زانوها هم‌جهت پنجه پا حرکت کنند، سپس با فشار پاشنه‌ها بالا بیا.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">شنا (Push-up)</p>
            <p className="text-gray-700 mt-2">
              بدن در یک خط صاف؛ دست‌ها زیر شانه‌ها. آرنج‌ها را کنترل‌شده خم کن،
              سینه به زمین نزدیک شود و با فشار کف دست‌ها بالا برگرد.
              (برای مبتدی: زانو روی زمین)
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">لانج (Lunge)</p>
            <p className="text-gray-700 mt-2">
              یک پا جلو، یک پا عقب؛ زانوی جلو حدود ۹۰ درجه. زانوی عقب به سمت زمین نزدیک شود
              بدون اینکه فشار روی کمر بیفتد، سپس با فشار پای جلو به حالت شروع برگرد.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">پلنک (Plank)</p>
            <p className="text-gray-700 mt-2">
              ساعد روی زمین، آرنج زیر شانه؛ بدن کاملاً صاف. شکم و باسن را سفت نگه دار
              و اجازه نده کمر گود یا باسن بالا برود. ۲۰ تا ۴۵ ثانیه نگه دار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">جامپینگ جک (Jumping Jack)</p>
            <p className="text-gray-700 mt-2">
              با یک پرش پاها را باز کن و هم‌زمان دست‌ها را بالا ببر؛ سپس با پرش بعدی
              پاها را جمع و دست‌ها را پایین بیاور. ریتم یکنواخت و نفس منظم.
            </p>
          </div>
        </div>

        <p className="font-semibold text-yellow-700">
          کیفیت اجرای حرکت مهم‌تر از تعداد آن است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🔥 بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) برنامه تمرینی ساده برای شروع (بدون تجهیزات)
        </p>


        <ul className="list-disc pr-6 space-y-3">
          <li>۳ جلسه در هفته (یک روز در میان)</li>
          <li>گرم‌کردن: ۵ دقیقه (راه رفتن تند/حرکات نرمشی)</li>
          <li>
            تمرین اصلی (۲ تا ۳ دور): <br />
            اسکات ۱۰–۱۲ تکرار، شنا ۶–۱۰ تکرار، لانج ۸–۱۰ هر پا، پلنک ۲۰–۴۵ ثانیه، جامپینگ جک ۳۰–۴۵ ثانیه
          </li>
          <li>استراحت بین حرکات: ۳۰–۶۰ ثانیه</li>
          <li>سردکردن: ۳–۵ دقیقه کشش آرام</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          استمرار مهم‌تر از شدت تمرین است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⚠️ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۴) اشتباهات رایج در ورزش خانگی
        </p>

      

        <ul className="list-disc pr-6 space-y-3">
          <li>شروع با شدت بالا و ناگهانی</li>
          <li>نداشتن گرم‌کردن و سردکردن</li>
          <li>اجرای غلط حرکت‌ها (زانو، کمر، گردن)</li>
          <li>تمرین نامنظم و بدون برنامه</li>
        </ul>

        <p className="font-semibold text-red-700">
          اگر درد تیز یا غیرعادی داری، تمرین را متوقف کن.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: ورزش در خانه، ساده اما قدرتمند
        </p>

      

        <ul className="list-disc pr-6 space-y-2">
          <li>برای شروع نیازی به تجهیزات نیست</li>
          <li>با ۲۰ دقیقه در روز هم می‌شود پیشرفت کرد</li>
          <li>فرم درست حرکات از همه چیز مهم‌تر است</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «بهترین باشگاه، جایی است که امروز در آن تمرین می‌کنی.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          American College of Sports Medicine (ACSM) | Harvard Health Publishing –
          Bodyweight Exercises | World Health Organization (WHO) – Physical Activity
        </p>
      </div>
    </GeninoArticleTemplate>
  );
}
