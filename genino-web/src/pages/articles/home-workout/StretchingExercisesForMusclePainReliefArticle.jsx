import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function StretchingExercisesForMusclePainReliefArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          تمرین‌های کششی برای کاهش دردهای عضلانی
          <br />
          <span className="inline-block mt-5">
            راهی ساده برای رهایی بدن از خشکی و درد
          </span>
        </>
      }
      description="دردهای عضلانی اغلب به دلیل کم‌تحرکی، استرس یا تمرین نادرست ایجاد می‌شوند. تمرین‌های کششی ساده و منظم می‌توانند به کاهش درد، افزایش انعطاف‌پذیری و بهبود حس سبکی بدن کمک کنند. این مقاله مجموعه‌ای از کشش‌های ایمن و کاربردی را معرفی می‌کند."
      image="/images/articles/home-workout/stretching/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          بدن خشک، بدن دردناک است
        </p>

        <p>
          وقتی عضلات برای مدت طولانی در یک وضعیت بمانند یا
          به‌درستی رها نشوند، درد و گرفتگی به‌وجود می‌آید.
        </p>

        <p className="font-semibold text-yellow-700">
          کشش آرام، پیام امنیت و آرامش به عضله می‌دهد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا کشش به کاهش درد عضلانی کمک می‌کند؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/stretching/benefits" />

        <ul className="list-disc pr-6 space-y-3">
          <li>افزایش جریان خون در عضلات</li>
          <li>کاهش تنش و اسپاسم عضلانی</li>
          <li>بهبود دامنه حرکتی مفاصل</li>
          <li>کاهش خشکی ناشی از استرس</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          کشش درست، ترمیم را تسریع می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧘 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) کشش‌های ساده با توضیح اجرا
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/stretching/exercises" />

        <div className="space-y-6">
          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش گردن</p>
            <p className="text-gray-700 mt-2">
              سر را آرام به یک سمت خم کن تا کشش ملایم حس شود.
              ۱۰–۱۵ ثانیه نگه دار، هر سمت ۲ بار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش شانه و پشت بازو</p>
            <p className="text-gray-700 mt-2">
              یک دست را از جلوی بدن عبور بده و با دست دیگر نگه دار.
              شانه رها باشد. ۱۵ ثانیه هر سمت.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش پشت ران (همسترینگ)</p>
            <p className="text-gray-700 mt-2">
              بنشین، یک پا جلو؛ با پشت صاف کمی به جلو خم شو
              تا پشت ران کش بیاید. ۱۵ ثانیه هر پا.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش کمر (زانو به سینه)</p>
            <p className="text-gray-700 mt-2">
              به پشت بخواب، یک زانو را به سینه بکش.
              کمر به زمین نزدیک باشد. ۱۰–۱۵ ثانیه هر پا.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">حرکت گربه–گاو</p>
            <p className="text-gray-700 mt-2">
              در حالت چهار دست‌وپا؛ با دم کمر را کمی گود،
              با بازدم پشت را گرد کن. ۶–۱۰ تکرار آرام.
            </p>
          </div>
        </div>

        <p className="font-semibold text-yellow-700">
          کشش باید حس «راحتی همراه با کشش» بدهد، نه درد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) چه زمانی و چقدر کشش انجام دهیم؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/stretching/timing" />

        <ul className="list-disc pr-6 space-y-3">
          <li>بعد از بیدار شدن (کشش ملایم)</li>
          <li>بعد از تمرین یا فعالیت بدنی</li>
          <li>قبل از خواب برای ریلکس شدن</li>
          <li>هر حرکت ۱۰–۲۰ ثانیه</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تداوم، مهم‌تر از مدت طولانی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⚠️ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۴) اشتباهات رایج در کشش
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/stretching/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کشیدن عضله تا حد درد</li>
          <li>حرکت‌های ناگهانی و پرتابی</li>
          <li>حبس نفس</li>
          <li>نادیده گرفتن دردهای هشداردهنده</li>
        </ul>

        <p className="font-semibold text-red-700">
          کشش خشن، آسیب‌زا است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: بدن رها، بدن سالم
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/stretching/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>کشش منظم درد را کاهش می‌دهد</li>
          <li>حرکت آرام، بهترین درمان است</li>
          <li>بدن به توجه پاسخ مثبت می‌دهد</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl text-center">
          <p className="text-lg font-semibold text-yellow-800">
            «بدنی که رها شود، کمتر درد می‌کشد.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          American College of Sports Medicine (ACSM) | Harvard Health – Stretching
          | National Institute of Neurological Disorders and Stroke (NINDS)
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
