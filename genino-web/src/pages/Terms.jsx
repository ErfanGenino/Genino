import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#f7f2eb] text-gray-800 px-5 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-yellow-100">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
          شرایط و قوانین ژنینو 
        </h1>

        <section className="space-y-5 text-right leading-7">
          <p>
            به ژنینو خوش آمدید. استفاده شما از این سرویس به معنی پذیرش کامل
            قوانین زیر است. هدف ما ایجاد بستری امن، علمی و قابل اعتماد برای
            والدین، کودکان و خانواده‌هاست.
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-6">
            ۱) حفظ حریم خصوصی کاربران
          </h2>
          <p>
            تمامی اطلاعات شخصی شما (نام، ایمیل، اطلاعات کودک و...) به صورت کامل
            محرمانه نگهداری شده و بدون اجازهٔ شما در اختیار هیچ مجموعه‌ای قرار
            نخواهد گرفت.
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-6">
            ۲) مسئولیت صحت اطلاعات
          </h2>
          <p>
            شما متعهد می‌شوید اطلاعاتی که هنگام ثبت‌نام یا استفاده از خدمات وارد
            می‌کنید صحیح و واقعی باشد. مسئولیت پیامدهای ناشی از اطلاعات نادرست
            بر عهدهٔ کاربر است.
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-6">
            ۳) امنیت حساب کاربری
          </h2>
          <p>
            نگهداری از رمز عبور، شماره موبایل یا ایمیل ورود بر عهدهٔ کاربر است.
            ژنینو هیچ‌گاه رمز عبور شما را درخواست نخواهد کرد.
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-6">
            ۴) استفاده مناسب از محتوای ژنینو
          </h2>
          <p>
            تمام محتوای ژنینو شامل مقاله‌ها، تصاویر، تست‌ها و تحلیل‌ها متعلق به
            مجموعه ژنینو است و هرگونه کپی‌برداری بدون اجازه رسمی ممنوع است.
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-6">
            ۵) مسئولیت والدین
          </h2>
          <p>
            ژنینو ابزارهای رشد، سلامت و آموزش کودک را ارائه می‌دهد، اما جایگزین
            پزشک یا متخصص نیست. والدین در تصمیم‌گیری نهایی مسئولیت کامل دارند.
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-6">
            ۶) تغییرات در قوانین
          </h2>
          <p>
            ژنینو ممکن است قوانین خود را بروزرسانی کند. نسخه جدید همیشه در بخش
            قوانین قابل مشاهده خواهد بود.
          </p>
        </section>

        <div className="text-center mt-10">
          <button
          onClick={() => window.close()}
          className="inline-block bg-yellow-500 text-white py-3 px-8 rounded-xl hover:bg-yellow-600 transition-all shadow">
          بستن صفحه
         </button>

        </div>
      </div>
    </main>
  );
}
