export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-white/70 backdrop-blur-md text-gray-700 border-t border-yellow-100 mt-10 py-6">
      <div className="max-w-6xl mx-auto py-6 px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-center sm:text-right">
        
        {/* چپ: نام برند و سال */}
        <p className="text-gray-500 mb-3 sm:mb-0">
          © {new Date().getFullYear()} <span className="text-yellow-600 font-semibold">ژنینو</span> — همه حقوق محفوظ است 🌿
        </p>

        {/* راست: لینک‌ها */}
        <div className="flex gap-4 text-gray-500 text-xs sm:text-sm">
          <a href="#" className="hover:text-yellow-600 transition">درباره ما</a>
          <a href="#" className="hover:text-yellow-600 transition">تماس با ما</a>
          <a href="#" className="hover:text-yellow-600 transition">قوانین و حریم خصوصی</a>
        </div>
      </div>
    </footer>
  );
}
