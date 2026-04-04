import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function TeenagersDietArticle() {
  return (
    <GeninoArticleTemplate
      title="رژیم غذایی نوجوانان؛ راهنمای علمی برای رشد سالم بدن و مغز در دوران بلوغ"
      description="راهنمای کامل تغذیه نوجوانان، شامل نیازهای غذایی مهم در دوران رشد، مواد مغذی کلیدی، اشتباهات رایج تغذیه‌ای نوجوانان و نمونه برنامه غذایی روزانه."
      image="/images/articles/diets/teenagers-diet/cover.jpg"
    >

      {/* ========================== */}
      {/* 🟢 رژیم غذایی نوجوانان چیست */}
      {/* ========================== */}

      <div className="space-y-4 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          رژیم غذایی نوجوانان چیست؟
        </p>

        <p>
          دوران نوجوانی یکی از سریع‌ترین مراحل رشد در زندگی انسان است.
          در این دوره بدن، استخوان‌ها، عضلات و حتی مغز
          تغییرات زیادی را تجربه می‌کنند.
        </p>

        <p>
          به همین دلیل تغذیه نوجوانان باید
          <strong> انرژی کافی، پروتئین، ویتامین‌ها و مواد معدنی لازم برای رشد </strong>
          را فراهم کند.
        </p>

        <p>
          تغذیه مناسب در این دوره می‌تواند بر موارد مهمی اثر بگذارد:
        </p>

        <p>
          • رشد قد و استخوان‌ها <br/>
          • رشد عضلات <br/>
          • تمرکز و عملکرد تحصیلی <br/>
          • سطح انرژی روزانه <br/>
          • سلامت متابولیک در بزرگسالی
        </p>

        <p>
          به زبان ساده:
          رژیم نوجوانان باید کمک کند
          <strong> بدن در حال رشد، سوخت و مواد اولیه کافی برای رشد سالم داشته باشد.</strong>
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🔵 مواد مغذی مهم برای نوجوانان */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          مهم‌ترین مواد مغذی برای نوجوانان
        </p>

        <HorizontalScrollGallery folder="articles/diets/teenagers-diet/key-nutrients" />

        <p>
          چند ماده غذایی در دوران نوجوانی اهمیت ویژه‌ای دارند:
        </p>

        <p>
          <strong className="text-yellow-600">۱. پروتئین</strong><br/>
          پروتئین برای رشد عضلات و ترمیم بافت‌ها ضروری است.
          منابع خوب آن شامل تخم‌مرغ، گوشت، مرغ، ماهی و حبوبات است.
        </p>

        <p>
          <strong className="text-yellow-600">۲. کلسیم</strong><br/>
          حدود ۴۰ درصد توده استخوانی بدن در دوران نوجوانی ساخته می‌شود،
          بنابراین کلسیم برای سلامت استخوان‌ها بسیار مهم است.
        </p>

        <p>
          <strong className="text-yellow-600">۳. آهن</strong><br/>
          آهن برای تولید گلبول‌های قرمز و پیشگیری از کم‌خونی ضروری است.
          نوجوانان، به‌ویژه دختران، بیشتر در معرض کمبود آهن هستند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. چربی‌های سالم</strong><br/>
          چربی‌های سالم برای رشد مغز و سیستم عصبی اهمیت دارند.
          منابع آن شامل مغزها، ماهی و دانه‌ها است.
        </p>

        <p>
          <strong className="text-yellow-600">۵. ویتامین‌ها و فیبر</strong><br/>
          میوه‌ها و سبزیجات برای تأمین ویتامین‌ها،
          فیبر و آنتی‌اکسیدان‌ها ضروری هستند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟣 گروه‌های غذایی مهم */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          گروه‌های غذایی مهم برای نوجوانان
        </p>

        <HorizontalScrollGallery folder="articles/diets/teenagers-diet/food-groups" />

        <p>
          رژیم نوجوانان باید ترکیبی از گروه‌های غذایی مختلف باشد:
        </p>

        <p>
          <strong className="text-yellow-700">۱. غلات</strong><br/>
          نان، برنج، جو دوسر و غلات کامل
          منابع اصلی انرژی برای بدن هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۲. پروتئین‌ها</strong><br/>
          شامل گوشت، مرغ، ماهی، تخم‌مرغ و حبوبات.
        </p>

        <p>
          <strong className="text-yellow-700">۳. لبنیات</strong><br/>
          منابع مهم کلسیم برای رشد استخوان‌ها هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۴. میوه و سبزیجات</strong><br/>
          منابع مهم ویتامین‌ها و فیبر هستند.
        </p>

        <p>
          <strong className="text-yellow-700">۵. چربی‌های سالم</strong><br/>
          برای تأمین انرژی و سلامت مغز اهمیت دارند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جدول خلاصه */}
      {/* ========================== */}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-5 border border-yellow-200">

        <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          خلاصه رژیم نوجوانان
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
                <td className="border border-yellow-200 p-3">کلسیم و استخوان</td>
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
      {/* 🔷 نمونه برنامه غذایی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          یک روز نمونه از رژیم غذایی نوجوان
        </p>

        <HorizontalScrollGallery folder="articles/diets/teenagers-diet/sample-day" />

        <div className="space-y-4">

          <p>
            <strong className="text-yellow-600">صبحانه:</strong><br/>
            نان سبوس‌دار + تخم‌مرغ + شیر یا ماست
          </p>

          <p>
            <strong className="text-yellow-600">میان وعده:</strong><br/>
            میوه + مغزها
          </p>

          <p>
            <strong className="text-yellow-600">ناهار:</strong><br/>
            برنج + مرغ یا گوشت + سالاد
          </p>

          <p>
            <strong className="text-yellow-600">میان وعده عصر:</strong><br/>
            ماست یا میوه
          </p>

          <p>
            <strong className="text-yellow-600">شام:</strong><br/>
            غذای سبک‌تر مانند سوپ یا املت
          </p>

        </div>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟠 اشتباهات رایج */}
      {/* ========================== */}

      <div className="space-y-6 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          اشتباهات رایج در تغذیه نوجوانان
        </p>

        <p>
          <strong className="text-yellow-600">۱. حذف صبحانه</strong><br/>
          صبحانه برای انرژی و تمرکز در مدرسه مهم است.
        </p>

        <p>
          <strong className="text-yellow-600">۲. مصرف زیاد فست‌فود</strong><br/>
          فست‌فودها معمولاً چربی و نمک زیادی دارند.
        </p>

        <p>
          <strong className="text-yellow-600">۳. مصرف نوشیدنی‌های شیرین</strong><br/>
          نوشابه‌ها و نوشیدنی‌های قندی
          کالری زیاد و ارزش غذایی کم دارند.
        </p>

        <p>
          <strong className="text-yellow-600">۴. رژیم‌های لاغری سخت</strong><br/>
          بعضی نوجوانان بدون نظارت علمی
          رژیم‌های شدید می‌گیرند که می‌تواند به رشد آسیب بزند.
        </p>

      </div>

      <GoldenDivider className="my-10" />

      {/* ========================== */}
      {/* 🟡 جمع بندی */}
      {/* ========================== */}

      <div className="space-y-8 leading-8 text-gray-700">

        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی رژیم نوجوانان
        </p>

        <HorizontalScrollGallery folder="articles/diets/teenagers-diet/summary" />

        <p>
          دوران نوجوانی یکی از مهم‌ترین مراحل رشد بدن است.
          تغذیه مناسب می‌تواند پایه سلامت آینده را بسازد.
        </p>

        <p>
          یک رژیم متعادل شامل
          غلات، پروتئین‌ها، لبنیات، میوه‌ها و سبزیجات
          به رشد سالم نوجوان کمک می‌کند.
        </p>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-6 text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «تغذیه سالم در نوجوانی،
            سرمایه‌ای برای سلامت در بزرگسالی است.»
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

        <p>1. World Health Organization – Adolescent Nutrition</p>
        <p>2. American Academy of Pediatrics – Teen Nutrition</p>
        <p>3. NHS – Healthy Eating for Teenagers</p>
        <p>4. UNICEF – Adolescent Nutrition</p>

      </div>

    </GeninoArticleTemplate>
  );
}