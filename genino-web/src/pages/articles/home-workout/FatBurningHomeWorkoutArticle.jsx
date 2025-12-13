import GeninoArticleTemplate from "@components/Awareness/ArticleTemplate";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";

export default function FatBurningHomeWorkoutArticle() {
  return (
    <GeninoArticleTemplate
      title={
        <>
          ورزش‌های مناسب برای چربی‌سوزی در خانه
          <br />
          <span className="inline-block mt-5">
            تمرین‌های مؤثر برای سوزاندن چربی بدون تجهیزات
          </span>
        </>
      }
      description="چربی‌سوزی مؤثر نیاز به باشگاه یا تجهیزات خاص ندارد. تمرین‌های درست با وزن بدن، در خانه هم می‌توانند ضربان قلب را بالا ببرند، متابولیسم را فعال کنند و به کاهش چربی کمک کنند. این مقاله تمرین‌های ساده، ایمن و کاربردی را معرفی می‌کند."
      image="/images/articles/home-workout/fat-burning/cover.jpg"
    >

      {/* 🌟 مقدمه */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-3xl font-bold text-yellow-700">
          چربی‌سوزی یعنی حرکت هوشمندانه
        </p>

        <p>
          هدف چربی‌سوزی فقط عرق کردن نیست؛  
          بلکه <strong>بالا بردن ضربان قلب + فعال‌سازی عضلات بزرگ</strong> است.
        </p>

        <p className="font-semibold text-yellow-700">
          تمرین کوتاه اما منظم، مؤثرتر از تمرین‌های سنگین و ناپایدار است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🧠 بخش ۱ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۱) بدن چگونه چربی می‌سوزاند؟
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/fat-burning/how-it-works" />

        <ul className="list-disc pr-6 space-y-3">
          <li>افزایش ضربان قلب و مصرف انرژی</li>
          <li>فعال شدن متابولیسم</li>
          <li>درگیر شدن عضلات بزرگ (پا، باسن، شکم)</li>
          <li>تداوم تمرین در طول هفته</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          چربی‌سوزی نتیجه «پیوستگی» است، نه فشار ناگهانی.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🏃 بخش ۲ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۲) تمرین‌های چربی‌سوز (با توضیح اجرا)
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/fat-burning/exercises" />

        <div className="space-y-6">

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">اسکات</p>
            <p className="text-gray-700 mt-2">
              پاها عرض شانه، باسن را عقب بده و بنشین.
              زانو هم‌جهت پنجه پا، پاشنه روی زمین.
              ۱۲–۱۵ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">لانج ثابت</p>
            <p className="text-gray-700 mt-2">
              یک پا جلو، زانوی عقب به سمت زمین.
              بالاتنه صاف، شکم سفت.
              هر پا ۸–۱۰ تکرار.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">جامپینگ جک (نسخه ساده)</p>
            <p className="text-gray-700 mt-2">
              باز و بسته کردن دست‌ها و پاها.
              اگر پرش سخت است، بدون پرش انجام بده.
              ۳۰–۴۵ ثانیه.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">کوه‌نورد آرام (Mountain Climber)</p>
            <p className="text-gray-700 mt-2">
              در حالت پلانک، زانوها را یکی‌یکی به سینه نزدیک کن.
              شکم سفت، کمر ثابت.
              ۲۰–۳۰ ثانیه.
            </p>
          </div>

          <div className="p-5 bg-white/80 border border-yellow-100 rounded-2xl">
            <p className="text-lg font-bold text-yellow-700">پل باسن</p>
            <p className="text-gray-700 mt-2">
              به پشت بخواب، باسن را بالا بیاور.
              ۲ ثانیه نگه دار و پایین بیا.
              ۱۲–۱۵ تکرار.
            </p>
          </div>

        </div>

        <p className="font-semibold text-yellow-700">
          اگر نفس‌تنگی داری اما می‌توانی حرف بزنی، شدت مناسب است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⏱ بخش ۳ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          ۳) برنامه پیشنهادی چربی‌سوزی در خانه
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/fat-burning/plan" />

        <ul className="list-disc pr-6 space-y-3">
          <li>۳ تا ۵ جلسه در هفته</li>
          <li>هر جلسه ۲۰–۳۰ دقیقه</li>
          <li>هر حرکت ۳۰–۴۵ ثانیه</li>
          <li>استراحت بین حرکات: ۳۰–۶۰ ثانیه</li>
        </ul>

        <p className="font-semibold text-yellow-700">
          استمرار، مهم‌ترین عامل چربی‌سوزی است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* ⚠️ بخش ۴ */}
      <div className="space-y-6 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-red-700">
          ۴) اشتباهات رایج در چربی‌سوزی
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/fat-burning/mistakes" />

        <ul className="list-disc pr-6 space-y-3">
          <li>تمرین خیلی شدید در شروع</li>
          <li>نادیده گرفتن استراحت</li>
          <li>تمرکز فقط روی شکم</li>
          <li>بی‌توجهی به تغذیه و خواب</li>
        </ul>

        <p className="font-semibold text-red-700">
          چربی‌سوزی سالم، پروژه بلندمدت است.
        </p>
      </div>

      <GoldenDivider className="my-10" />

      {/* 🌟 جمع‌بندی */}
      <div className="space-y-8 leading-8 text-gray-700">
        <p className="text-2xl font-bold text-yellow-700">
          جمع‌بندی: چربی‌سوزی با بدن خودت
        </p>

        <HorizontalScrollGallery folder="articles/home-workout/fat-burning/summary" />

        <ul className="list-disc pr-6 space-y-2">
          <li>تمرین ساده اما منظم</li>
          <li>فعال‌سازی عضلات بزرگ</li>
          <li>پرهیز از عجله</li>
        </ul>

        <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl text-center">
          <p className="text-lg font-semibold text-yellow-800">
            «چربی‌سوزی نتیجه تصمیم‌های کوچک روزانه است.»
          </p>
        </div>
      </div>

      <GoldenDivider className="my-10" />

      {/* 📚 منابع */}
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700">منابع</p>
        <p>
          American College of Sports Medicine (ACSM) | World Health Organization (WHO)
          | Harvard Health – Fat Burning Exercise
        </p>
      </div>

    </GeninoArticleTemplate>
  );
}
