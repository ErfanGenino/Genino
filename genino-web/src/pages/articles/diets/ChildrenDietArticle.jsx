import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function ChildrenDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم غذایی کودکان؛ راهنمای علمی برای رشد سالم بدن و مغز کودک"
      description="راهنمای کامل تغذیه کودکان، شامل نیازهای غذایی مهم برای رشد، گروه‌های غذایی ضروری، اشتباهات رایج والدین و نمونه برنامه غذایی روزانه برای کودکان."
      image="/images/articles/diets/children-diet/cover.jpg"
    >

      {/* ========================== */}
      {/* 🟢 رژیم غذایی کودکان چیست؟ */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم غذایی کودکان چیست؟
        </p>

        <p>
          رژیم غذایی کودکان یعنی الگویی از تغذیه که کمک کند
          <strong> بدن و مغز کودک در حال رشد، مواد مغذی کافی دریافت کند.</strong>
        </p>

        <p>
          کودکان فقط نسخه کوچک‌تر بزرگسالان نیستند.
          بدن آن‌ها در حال رشد سریع است،
          بنابراین به ترکیبی متعادل از
          انرژی، پروتئین، ویتامین‌ها و مواد معدنی نیاز دارند.
        </p>

        <p>
          تغذیه مناسب در کودکی می‌تواند بر موارد مهمی اثر بگذارد:
        </p>

        <p>
          • رشد قد و استخوان‌ها <br/>
          • رشد مغز و تمرکز <br/>
          • سیستم ایمنی بدن <br/>
          • سطح انرژی و فعالیت روزانه <br/>
          • شکل‌گیری عادت‌های غذایی سالم برای آینده
        </p>

        <p>
          به زبان ساده:
          تغذیه کودک فقط درباره «سیر شدن» نیست،
          بلکه درباره
          <strong> تأمین مواد لازم برای رشد سالم بدن و مغز است.</strong>
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 مواد غذایی مهم برای رشد کودکان */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          مهم‌ترین مواد غذایی برای رشد کودکان
        </p>

        <HorizontalScrollGallery folder="articles/diets/children-diet/key-nutrients" />

        <p>
          بدن کودک برای رشد سالم به چند ماده غذایی کلیدی نیاز دارد:
        </p>

        <p>
          <strong className="text-yellow-600">۱. پروتئین</strong><br/>
          پروتئین برای رشد عضلات و بافت‌های بدن مهم است.
          منابع خوب شامل:
          تخم‌مرغ، مرغ، ماهی، گوشت، لبنیات و حبوبات است.
        </p>

        <p>
          <strong className="text-yellow-600">۲. کلسیم</strong><br/>
          کلسیم برای رشد استخوان‌ها و دندان‌ها ضروری است.
          منابع اصلی آن شامل:
          شیر، ماست، پنیر و بعضی سبزیجات است.
        </p>

        <p>
          <strong className="text-yellow-600">۳. آهن</strong><br/>
          آهن برای جلوگیری از کم‌خونی و کمک به تمرکز کودک مهم است.
          منابع آهن شامل:
          گوشت قرمز، عدس، لوبیا، تخم‌مرغ و بعضی غلات است.
        </p>

        <p>
          <strong className="text-yellow-600">۴. چربی‌های سالم</strong><br/>
          مغز در حال رشد کودک به چربی‌های سالم نیاز دارد.
          منابع مفید شامل:
          مغزها، دانه‌ها، ماهی و روغن‌های سالم هستند.
        </p>

        <p>
          <strong className="text-yellow-600">۵. ویتامین‌ها و مواد معدنی</strong><br/>
          میوه‌ها و سبزیجات منابع مهم ویتامین‌ها،
          فیبر و مواد معدنی هستند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 گروه‌های غذایی مهم برای کودک */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          گروه‌های غذایی مهم در رژیم کودک
        </p>

        <HorizontalScrollGallery folder="articles/diets/children-diet/food-groups" />

        <p>
          یک رژیم متعادل برای کودک باید شامل گروه‌های غذایی مختلف باشد:
        </p>

        <p>
          <strong className="text-yellow-700">۱. میوه‌ها و سبزیجات</strong><br/>
          این گروه منابع مهم ویتامین، فیبر و آنتی‌اکسیدان هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۲. غلات</strong><br/>
          مانند نان، برنج، جو دوسر و غلات کامل که انرژی بدن کودک را تأمین می‌کنند.
        </p>

        <p>
          <strong className="text-yellow-700">۳. پروتئین‌ها</strong><br/>
          شامل گوشت، مرغ، ماهی، تخم‌مرغ و حبوبات.
        </p>

        <p>
          <strong className="text-yellow-700">۴. لبنیات</strong><br/>
          منابع مهم کلسیم و پروتئین هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۵. چربی‌های سالم</strong><br/>
          برای رشد مغز و تأمین انرژی اهمیت دارند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جدول خلاصه */}
      {/* ========================== */}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">

        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          خلاصه رژیم غذایی کودکان
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">

            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="border border-yellow-200 p-3">گروه غذایی</th>
                <th className="border border-yellow-200 p-3">نقش</th>
                <th className="border border-yellow-200 p-3">نمونه‌ها</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">پروتئین</td>
                <td className="border border-yellow-200 p-3">رشد عضلات</td>
                <td className="border border-yellow-200 p-3">تخم‌مرغ، مرغ، ماهی، حبوبات</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">لبنیات</td>
                <td className="border border-yellow-200 p-3">کلسیم و رشد استخوان</td>
                <td className="border border-yellow-200 p-3">شیر، ماست، پنیر</td>
              </tr>

              <tr>
                <td className="border border-yellow-200 p-3 font-semibold">غلات</td>
                <td className="border border-yellow-200 p-3">تأمین انرژی</td>
                <td className="border border-yellow-200 p-3">نان، برنج، جو دوسر</td>
              </tr>

              <tr className="bg-yellow-50">
                <td className="border border-yellow-200 p-3 font-semibold">میوه و سبزی</td>
                <td className="border border-yellow-200 p-3">ویتامین و فیبر</td>
                <td className="border border-yellow-200 p-3">سیب، موز، هویج، کاهو</td>
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
          یک روز نمونه از رژیم غذایی کودک
        </p>

        <HorizontalScrollGallery folder="articles/diets/children-diet/sample-day" />

        <div className="space-y-4">

          <p>
            <strong className="text-yellow-600">صبحانه:</strong><br/>
            نان و پنیر + تخم‌مرغ + یک میوه
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده صبح:</strong><br/>
            شیر یا ماست + میوه
          </p>

          <p>
            <strong className="text-yellow-600">ناهار:</strong><br/>
            برنج + مرغ یا گوشت + سبزیجات
          </p>

          <p>
            <strong className="text-yellow-600">میان‌وعده عصر:</strong><br/>
            مغزها یا میوه
          </p>

          <p>
            <strong className="text-yellow-600">شام:</strong><br/>
            غذای سبک‌تر مانند سوپ، املت یا خوراک حبوبات
          </p>

        </div>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در تغذیه کودکان
        </p>

        <p>
          <strong className="text-yellow-600">۱. اجبار کودک به خوردن غذا</strong><br/>
          فشار زیاد برای غذا خوردن
          می‌تواند رابطه کودک با غذا را خراب کند.
        </p>

        <p>
          <strong className="text-yellow-600">۲. مصرف زیاد خوراکی‌های شیرین</strong><br/>
          نوشیدنی‌های شیرین و تنقلات
          می‌توانند اشتهای کودک برای غذاهای سالم را کم کنند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. حذف کامل بعضی گروه‌های غذایی</strong><br/>
          رژیم‌های محدودکننده برای کودکان
          می‌تواند باعث کمبود مواد مغذی شود.
        </p>

        <p>
          <strong className="text-yellow-600">۴. بی‌نظمی وعده‌ها</strong><br/>
          نظم در وعده‌های غذایی
          به تنظیم اشتها کمک می‌کند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع بندی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی رژیم غذایی کودکان
        </p>

        <HorizontalScrollGallery folder="articles/diets/children-diet/summary" />

        <p>
          تغذیه مناسب در کودکی یکی از مهم‌ترین پایه‌های سلامت آینده است.
        </p>

        <p>
          ترکیب متعادل از
          پروتئین، لبنیات، غلات، میوه‌ها و سبزیجات
          می‌تواند به رشد بهتر بدن و مغز کودک کمک کند.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «عادت‌های غذایی سالمی که در کودکی شکل می‌گیرند،
            می‌توانند سلامت یک عمر را بسازند.»
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

        <p>1. World Health Organization – Child Nutrition</p>
        <p>2. American Academy of Pediatrics – Healthy Eating for Children</p>
        <p>3. NHS – Children's Nutrition</p>
        <p>4. UNICEF – Child Nutrition and Growth</p>

      </div>

    </GeninoArticleTemplate>
  );
}