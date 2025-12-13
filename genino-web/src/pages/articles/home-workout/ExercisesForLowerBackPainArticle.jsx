import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function ExercisesForLowerBackPainArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          ورزش‌های مناسب برای کمردرد
          <br />
          <span className="inline-block mt-5">
            حرکت‌های ایمن برای کاهش درد و تقویت کمر
          </span>
        </>
      }
      description="کمردرد یکی از شایع‌ترین مشکلات بزرگسالان است که اغلب به دلیل کم‌تحرکی، وضعیت بد بدن یا ضعف عضلات مرکزی ایجاد می‌شود. این مقاله تمرین‌های ساده، ایمن و علمی را معرفی می‌کند که می‌توانند به کاهش کمردرد و پیشگیری از بازگشت آن کمک کنند."
      image="/images/articles/home-workout/back-pain/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          کمردرد همیشه به استراحت نیاز ندارد
        </p>

        <p>
          برخلاف تصور رایج، در بسیاری از موارد کمردرد
          با <strong>حرکت درست و کنترل‌شده</strong> بهتر می‌شود، نه با بی‌حرکتی.
        </p>

        <p className="font-semibold text-yellow-700">
          هدف: کاهش درد، افزایش پایداری و بازگشت به حرکت طبیعی.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا کمر درد می‌گیرد؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/back-pain/causes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>ضعف عضلات شکم و کمر</li>
          <li>نشستن طولانی و وضعیت بد بدن</li>
          <li>کاهش انعطاف‌پذیری لگن و همسترینگ</li>
          <li>استرس و تنش عضلانی</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          کمر قوی، یعنی ستون فقرات پایدارتر.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🏃 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) تمرین‌های ایمن برای کمردرد (با روش اجرا)
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/back-pain/exercises" />

        <div className="space-y-6">
          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش زانو به سینه</p>
            <p className="text-gray-700 mt-2">
              به پشت بخواب، یک زانو را آرام به سمت سینه بکش و ۱۰–۱۵ ثانیه نگه دار.
              هر پا ۳ بار. نفس را نگه ندار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">پل باسن (Glute Bridge)</p>
            <p className="text-gray-700 mt-2">
              به پشت، زانوها خم؛ باسن را بالا بیاور تا بدن صاف شود.
              شکم سفت، کمر قوس نگیرد. ۱۰–۱۲ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">حرکت گربه–گاو</p>
            <p className="text-gray-700 mt-2">
              در حالت چهار دست‌وپا؛ با دم کمر را کمی گود کن،
              با بازدم پشت را گرد کن. آرام و کنترل‌شده. ۶–۱۰ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">پلنک اصلاح‌شده (روی زانو)</p>
            <p className="text-gray-700 mt-2">
              ساعد روی زمین، زانوها زمین؛ شکم سفت و بدن در یک خط.
              ۱۵–۳۰ ثانیه نگه دار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش همسترینگ نشسته</p>
            <p className="text-gray-700 mt-2">
              بنشین، یک پا جلو؛ با پشت صاف کمی به جلو خم شو
              تا پشت ران کش بیاید. ۱۵ ثانیه هر پا.
            </p>
          </div>
        </div>

        <p className="font-semibold text-yellow-700">
          هیچ حرکتی نباید درد تیز ایجاد کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) برنامه پیشنهادی روزانه (۱۰–۱۵ دقیقه)
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/back-pain/program" />

        <ul className="list-disc pr-6 space-y-3">
          <li>گرم‌کردن سبک: ۳ دقیقه</li>
          <li>۳–۴ حرکت اصلی از بالا</li>
          <li>کشش پایانی: ۳ دقیقه</li>
          <li>روزانه یا یک‌روزدرمیان</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تمرین کوتاه اما منظم، مؤثرتر از تمرین سنگین است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⚠️ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۴) هشدارهای مهم
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/back-pain/warnings" />

        <ul className="list-disc pr-6 space-y-3">
          <li>درد تیرکشنده یا بی‌حسی ← توقف تمرین</li>
          <li>درد شدید یا ناگهانی ← مشاوره پزشکی</li>
          <li>حرکات پرشی یا خم‌شدن ناگهانی ممنوع</li>
        </ul>

        <p className="font-semibold text-red-700">
          امنیت مهم‌تر از پیشرفت سریع است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: کمر سالم با حرکت درست
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/back-pain/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>حرکت کنترل‌شده درمان است</li>
          <li>تمرین‌های ساده اما دقیق</li>
          <li>پایداری کمر، کلید کاهش درد</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl text-center">
          <p className="text-lg font-semibold text-yellow-800">
            «کمر قوی، زندگی راحت‌تر می‌سازد.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          American College of Sports Medicine (ACSM) | Harvard Health – Low Back Pain Exercises
          | National Institute of Neurological Disorders and Stroke (NINDS)
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
