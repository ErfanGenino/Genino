import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function WorkoutsForRestartingArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          ورزش‌های مناسب برای شروع دوباره
          <br />
          <span className="inline-block mt-5">
            اگر مدتی ورزش نکردی، اینجا بهترین نقطه شروعه
          </span>
        </>
      }
      description="بعد از یک وقفه طولانی، شروع دوباره ورزش باید آرام، ایمن و قابل تداوم باشد. این مقاله به‌زبان ساده توضیح می‌دهد چطور بدن را بدون فشار زیاد به مسیر ورزش برگردانیم و چند تمرین پایه با روش اجرای کوتاه معرفی می‌کند."
      image="/images/articles/home-workout/restarting/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          شروع دوباره یعنی «کم اما پیوسته»
        </p>

        <p>
          خیلی‌ها بعد از یک وقفه، می‌خواهند با شدت بالا شروع کنند و همین باعث
          درد، خستگی یا رها کردن دوباره می‌شود.
        </p>

        <p className="font-semibold text-yellow-700">
          شروع درست = شدت کم + برنامه ساده + تداوم
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) بدن بعد از وقفه چه چیزی نیاز دارد؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/restarting/body-needs" />

        <ul className="list-disc pr-6 space-y-3">
          <li>فعال‌سازی آرام مفاصل و عضلات</li>
          <li>بازگشت تدریجی ظرفیت قلبی-تنفسی</li>
          <li>تقویت عضلات مرکزی (کمر و شکم)</li>
          <li>کاهش ریسک آسیب با تمرین‌های ساده</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          هدف هفته‌های اول: «عادت‌سازی»، نه رکورد زدن.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🏃 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) بهترین تمرین‌های شروع دوباره (با روش اجرا)
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/restarting/exercises" />

        <div className="space-y-6">
          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">راه رفتن تند (در خانه یا بیرون)</p>
            <p className="text-gray-700 mt-2">
              ۵ تا ۱۵ دقیقه با سرعتی که بتوانی حرف بزنی ولی کمی نفس‌نفس بزنی.
              شانه‌ها رها، قدم‌ها نرم و منظم.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">نشستن و بلند شدن از صندلی</p>
            <p className="text-gray-700 mt-2">
              روی صندلی بنشین و بدون فشار به زانو با کنترل بلند شو و آرام بنشین.
              پشت صاف، نگاه جلو. ۸ تا ۱۲ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">اسکات نیمه (Half Squat)</p>
            <p className="text-gray-700 mt-2">
              پاها عرض شانه؛ فقط تا حدی پایین برو که زانوها درد نگیرند.
              پاشنه روی زمین، زانو هم‌جهت پنجه. ۱۰ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">پل باسن (Glute Bridge)</p>
            <p className="text-gray-700 mt-2">
              به پشت بخواب، زانوها خم؛ باسن را بالا بیاور و ۲ ثانیه نگه دار.
              کمر را قوس نده. ۱۰ تا ۱۲ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl shadow-sm">
            <p className="text-lg font-bold text-yellow-700">پلنک روی زانو (Knee Plank)</p>
            <p className="text-gray-700 mt-2">
              ساعد روی زمین، زانوها روی زمین؛ بدن از شانه تا زانو یک خط.
              شکم سفت، گردن رها. ۱۵ تا ۳۰ ثانیه.
            </p>
          </div>
        </div>

        <p className="font-semibold text-yellow-700">
          در شروع دوباره، نسخهٔ آسان‌تر حرکت‌ها کاملاً منطقی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) برنامه پیشنهادی ۲ هفته اول
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/restarting/plan" />

        <ul className="list-disc pr-6 space-y-3">
          <li>هفته ۱: ۳ جلسه، هر جلسه ۱۵–۲۰ دقیقه</li>
          <li>هفته ۲: ۳ تا ۴ جلسه، هر جلسه ۲۰–۲۵ دقیقه</li>
          <li>هر جلسه: ۵ دقیقه گرم‌کردن + ۱۰–۱۵ دقیقه تمرین + ۳ دقیقه کشش</li>
          <li>استراحت بین حرکات: ۳۰–۶۰ ثانیه</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          معیار موفقیت: «کم‌کم بهتر شدن»، نه خسته‌شدن کامل.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⚠️ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۴) هشدارهای مهم و اشتباهات رایج
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/restarting/warnings" />

        <ul className="list-disc pr-6 space-y-3">
          <li>شروع با شدت بالا (باعث دلزدگی و آسیب)</li>
          <li>نادیده گرفتن درد تیز یا غیرعادی</li>
          <li>عدم گرم‌کردن و سردکردن</li>
          <li>تمرین پشت‌سرهم بدون استراحت کافی</li>
        </ul>

        <p className="font-semibold text-red-700">
          درد عضلانی طبیعی است؛ درد تیز و مفصلی هشدار است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 بخش ۵ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۵) چطور انگیزه را نگه داریم؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/restarting/motivation" />

        <ul className="list-disc pr-6 space-y-3">
          <li>هدف خیلی کوچک: «۱۰ دقیقه»</li>
          <li>ثابت کردن ساعت تمرین</li>
          <li>ثبت ساده پیشرفت (تعداد/زمان)</li>
          <li>انتخاب تمرین‌هایی که واقعاً دوست داری</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          بهترین برنامه، برنامه‌ای است که رها نشود.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: شروع دوباره، شروع هوشمندانه است
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/restarting/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>با تمرین‌های ساده شروع کن</li>
          <li>شدت کم اما منظم</li>
          <li>به بدن گوش بده</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed">
            «شروع دوباره یعنی برگشتن به مسیر؛ حتی با قدم‌های کوچک.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          American College of Sports Medicine (ACSM) | World Health Organization (WHO) – Physical Activity
          | Harvard Health – Getting back to exercise safely
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
