import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function DailySimpleWorkoutsForBusyParentsArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          تمرین‌های ساده روزانه برای والدین پرمشغله
          <br />
          <span className="inline-block mt-5">
            حرکت‌های کوتاه اما مؤثر برای بدن‌های همیشه خسته
          </span>
        </>
      }
      description="والدین پرمشغله معمولاً زمان کافی برای ورزش ندارند، اما بدن آن‌ها بیش از همه به تحرک نیاز دارد. این مقاله تمرین‌های ساده، کوتاه و ایمن را معرفی می‌کند که می‌توان حتی در شلوغ‌ترین روزها انجام داد."
      image="/images/articles/home-workout/busy-parents/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          کمبود زمان، بهانه نیست؛ واقعیت است
        </p>

        <p>
          والدین پرمشغله اغلب بین کار، فرزند و مسئولیت‌های روزمره
          خودشان را فراموش می‌کنند.
        </p>

        <p className="font-semibold text-yellow-700">
          حتی ۱۰ دقیقه حرکت در روز، تفاوت بزرگی ایجاد می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) چرا والدین به تمرین‌های کوتاه نیاز دارند؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/busy-parents/why" />

        <ul className="list-disc pr-6 space-y-3">
          <li>کاهش خشکی عضلات ناشی از استرس</li>
          <li>افزایش انرژی روزانه</li>
          <li>پیشگیری از کمردرد و درد گردن</li>
          <li>بهبود خلق‌وخو</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          تحرک کم، خستگی را بیشتر می‌کند.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🏃 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) تمرین‌های ساده با توضیح اجرا
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/busy-parents/exercises" />

        <div className="space-y-6">
          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">اسکات نیمه</p>
            <p className="text-gray-700 mt-2">
              پاها به عرض شانه، زانوها کمی خم؛ فقط تا نیمه پایین برو و برگرد.
              مناسب برای وقتی کودک کنارت است. ۱۰ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کشش گردن و شانه</p>
            <p className="text-gray-700 mt-2">
              سر را آرام به طرفین خم کن، شانه‌ها رها. هر سمت ۱۰ ثانیه.
              عالی برای والدینی که زیاد خم می‌شوند.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">پل باسن (Glute Bridge)</p>
            <p className="text-gray-700 mt-2">
              به پشت بخواب، زانوها خم، کف پا روی زمین؛ باسن را بالا بیاور و
              ۲ ثانیه نگه دار. ۱۲ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">نشستن و بلند شدن از صندلی</p>
            <p className="text-gray-700 mt-2">
              روی صندلی بنشین و بدون کمک دست‌ها بلند شو.
              تمرین کاربردی برای زندگی واقعی. ۸–۱۰ تکرار.
            </p>
          </div>
        </div>

        <p className="font-semibold text-yellow-700">
          تمرین باید با زندگی هماهنگ باشد، نه برعکس.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) برنامه ۱۰ دقیقه‌ای پیشنهادی
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/busy-parents/program" />

        <ul className="list-disc pr-6 space-y-3">
          <li>گرم‌کردن سبک: ۲ دقیقه</li>
          <li>۳ حرکت اصلی: هرکدام ۲ دقیقه</li>
          <li>کشش پایانی: ۲ دقیقه</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          حتی یک‌بار در روز کافی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⚠️ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۴) اشتباهات رایج والدین
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/busy-parents/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>منتظر زمان ایده‌آل ماندن</li>
          <li>فشار بیش‌ازحد به بدن خسته</li>
          <li>بی‌توجهی به دردهای هشداردهنده</li>
        </ul>

        <p className="font-semibold text-red-700">
          بدن خسته، نیاز به مهربانی دارد.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: والد سالم، خانواده سالم
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/busy-parents/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>حرکت کم هم ارزشمند است</li>
          <li>ورزش باید واقع‌بینانه باشد</li>
          <li>بدن قوی، والد آرام‌تر می‌سازد</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl text-center">
          <p className="text-lg font-semibold text-yellow-800">
            «مراقبت از خود، بخشی از والدگری است.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          World Health Organization (WHO) – Physical Activity  
          | Harvard Health – Exercise for Busy People  
          | American College of Sports Medicine (ACSM)
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
