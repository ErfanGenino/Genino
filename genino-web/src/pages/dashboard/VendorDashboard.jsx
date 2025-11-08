import SidebarVendor from "@components/SidebarVendor";

export default function VendorDashboard() {
  return (
    <main className="flex bg-[#f7f2eb] min-h-screen text-gray-800">
      {/* سایدبار سمت راست */}
      <SidebarVendor />

      {/* محتوای اصلی داشبورد */}
      <section className="flex-1 p-10 ml-60">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          🎉 به داشبورد فروشندگان خوش آمدید
        </h1>
        <p className="text-gray-700 leading-relaxed">
          از اینجا می‌توانید محصولات، سفارش‌ها و آمار فروش خود را مدیریت کنید 💼
        </p>
      </section>
    </main>
  );
}
