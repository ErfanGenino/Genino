import ReminderBar from "@components/Dashboard/ReminderBar";

export default function DashboardLayout({ title, children }) {
  return (
    <main className="min-h-screen bg-[#f7f2eb] text-gray-800 flex flex-col">
      {/* 🔸 بخش محتوای اصلی */}
      <section className="flex-1 p-6 md:p-10">
        {/* عنوان داخلی داشبورد */}
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-yellow-700">
              {title}
            </h1>
          </div>
        )}

        {/* نوار یادآوری */}
        <div className="mb-6">
          <ReminderBar />
        </div>

        {/* محتوای داشبورد (بدون باکس سفید سنگین) */}
        <div className="transition-all duration-300">
          {children}
        </div>
      </section>

      {/* نوار پایین */}
      <footer className="text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} ژنینو | هر کودک، یک دنیا نوآوری 🌿
      </footer>
    </main>
  );
}
