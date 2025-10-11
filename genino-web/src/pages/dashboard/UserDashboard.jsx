import SidebarUser from "../../components/SidebarUser";

export default function UserDashboard() {
  return (
    <main className="flex bg-[#f7f2eb] min-h-screen text-gray-800">
      {/* سایدبار سمت راست */}
      <SidebarUser />

      {/* بخش محتوای اصلی */}
      <section className="flex-1 p-10 ml-60">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          🎉 به داشبورد والدین خوش آمدید
        </h1>
        <p className="text-gray-700 leading-relaxed">
          از اینجا می‌توانید رشد کودک، خریدها و تنظیمات حساب خود را مشاهده کنید 🌿
        </p>
      </section>
    </main>
  );
}
