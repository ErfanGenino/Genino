import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Baby } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function ChildProfile() {
  const navigate = useNavigate();

  const [childName, setChildName] = useState(localStorage.getItem("childName") || "");
  const [birthDate, setBirthDate] = useState(localStorage.getItem("birthDate") || "");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "girl");
  const [childPhoto, setChildPhoto] = useState(localStorage.getItem("childPhoto") || "");
  const [ageText, setAgeText] = useState("");

  // 📆 محاسبه سن به سال و ماه
  useEffect(() => {
    if (birthDate) {
      const birth = new Date(birthDate);
      const now = new Date();
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      if (months < 0) {
        years--;
        months += 12;
      }
      setAgeText(`${years} سال و ${months} ماه`);
    }
  }, [birthDate]);

  // 💾 ذخیره در localStorage و بازگشت
  const handleSave = () => {
    localStorage.setItem("childName", childName);
    localStorage.setItem("birthDate", birthDate);
    localStorage.setItem("gender", gender);
    localStorage.setItem("childPhoto", childPhoto);

    setTimeout(() => {
      navigate("/mychild");
    }, 500);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff8dc] to-[#ffd95c] px-6 py-10 text-gray-800"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md border border-yellow-300 rounded-3xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">
          پروفایل کودک
        </h2>

        {/* تصویر کودک */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-yellow-300 shadow-md flex items-center justify-center bg-white">
              {childPhoto ? (
                <img
                  src={childPhoto}
                  alt="کودک"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Baby className="w-16 h-16 text-yellow-700" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setChildPhoto(ev.target.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-yellow-700 underline">
              تغییر عکس
            </span>
          </label>
        </div>

        {/* فرم اطلاعات */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-yellow-700 mb-1">
              نام کودک
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-700 mb-1">
              تاریخ تولد (شمسی)
            </label>
            <DatePicker
              value={birthDate ? new Date(birthDate) : ""}
              onChange={(date) => {
                if (date) {
                  const gregorian = date.toDate?.(); // تبدیل از شمسی به میلادی
                  const iso = gregorian.toISOString().split("T")[0]; // YYYY-MM-DD
                  setBirthDate(iso);
                }
              }}
              calendar={persian}
              locale={persian_fa}
              inputClass="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-right"
              placeholder="انتخاب تاریخ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-700 mb-1">
              جنسیت
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="girl">دختر</option>
              <option value="boy">پسر</option>
            </select>
          </div>

          {birthDate && (
            <div className="text-center mt-4 text-yellow-800 font-medium">
              سن کودک: {ageText}
            </div>
          )}
        </div>

        {/* دکمه ذخیره */}
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-2 rounded-lg font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
        >
          💾 ذخیره تغییرات
        </button>

        {/* بازگشت دستی */}
        <Link
          to="/mychild"
          className="block text-center mt-4 text-yellow-700 hover:text-yellow-900 transition"
        >
          ← بازگشت به صفحه کودک من
        </Link>
      </motion.div>
    </main>
  );
}
