import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  FileHeart,
  UploadCloud,
  Search,
} from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

export default function MyDoctor() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    title: "",
    doctor: "",
    category: "",
    date: "",
    desc: "",
    file: null,
  });
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    from: "",
    to: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // 🟢 افزودن گزارش جدید
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.category)
      return alert("لطفاً عنوان، تاریخ و دسته درمانی را وارد کنید");

    // ✅ بررسی نوع مقدار تاریخ (object یا string)
    let dateObj;
    if (typeof form.date === "object" && form.date.year) {
      dateObj = form.date; // خروجی مستقیم از DatePicker
    } else if (typeof form.date === "string") {
      const [y, m, d] = form.date.split("-").map((n) =>
        parseInt(n.replace(/[۰-۹]/g, (t) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(t)]))
      );
      dateObj = { year: y, month: m, day: d };
    } else {
      alert("تاریخ معتبر نیست");
      return;
    }

    // ✅ تبدیل شمسی به میلادی با DateObject
    const gregorian = new DateObject({
      date: dateObj,
      calendar: persian,
      locale: persian_fa,
    }).convert();

    const timestamp = gregorian.toDate().getTime();

    const newRecord = {
      ...form,
      id: Date.now(),
      timestamp,
      date: `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(
        dateObj.day
      ).padStart(2, "0")}`,
    };

    setRecords([newRecord, ...records]);
    setForm({
      title: "",
      doctor: "",
      category: "",
      date: "",
      desc: "",
      file: null,
    });
  };

  // 🟡 تبدیل عدد فارسی به انگلیسی
  const toEnglishNumber = (str = "") =>
    str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);

  // 🟡 فیلتر گزارش‌ها
  const filteredRecords = records.filter((r) => {
    const recordDate = r.timestamp || 0;

    const fromTimestamp = filters.from
      ? new DateObject({
          date:
            typeof filters.from === "object"
              ? filters.from
              : toEnglishNumber(filters.from),
          calendar: persian,
          locale: persian_fa,
        })
          .convert()
          .toDate()
          .getTime()
      : 0;

    const toTimestamp = filters.to
      ? new DateObject({
          date:
            typeof filters.to === "object"
              ? filters.to
              : toEnglishNumber(filters.to),
          calendar: persian,
          locale: persian_fa,
        })
          .convert()
          .toDate()
          .getTime()
      : Infinity;

    const inDateRange =
      recordDate >= fromTimestamp && recordDate <= toTimestamp;
    const inCategory = !filters.category || r.category === filters.category;
    const inTitle = !filters.title || r.title === filters.title;

    return inDateRange && inCategory && inTitle;
  });

  // 🟢 مرتب‌سازی دقیق بر اساس timestamp
  const sortedRecords = [...filteredRecords].sort(
    (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
  );

  // صفحه‌بندی
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecords = sortedRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffdf8] to-[#f7f3e6] px-6 py-10 text-gray-800"
    >
      {/* 🔹 عنوان صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <FileHeart className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-yellow-700 mb-2">
          پزشک من 🩺
        </h1>
        <p className="text-gray-600 text-sm">
          بایگانی پرونده‌های پزشکی، نسخه‌ها و آزمایش‌های شما در ژنینو 🌿
        </p>
      </motion.div>

      {/* 🔍 فیلتر بالا */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md border border-yellow-100 mb-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-right">
          {/* 🔸 عنوان گزارش */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">عنوان گزارش</label>
            <select
              value={filters.title}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
              className="w-full border border-yellow-200 rounded-xl p-2 focus:ring-2 focus:ring-yellow-300 outline-none"
            >
              <option value="">همه</option>
              <option value="چکاپ عمومی">چکاپ عمومی</option>
              <option value="چکاپ تخصصی">چکاپ تخصصی</option>
              <option value="آزمایش و بررسی‌های تخصصی پزشکی">
                آزمایش و بررسی‌های تخصصی پزشکی
              </option>
              <option value="بستری و جراحی">بستری و جراحی</option>
              <option value="سایر">سایر</option>
            </select>
          </div>

          {/* 🔸 دسته درمانی */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">دسته درمانی</label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full border border-yellow-200 rounded-xl p-2 focus:ring-2 focus:ring-yellow-300 outline-none"
            >
              <option value="">همه</option>
              <option value="عمومی">عمومی</option>
              <option value="قلب و عروق">قلب و عروق</option>
              <option value="مغز و اعصاب">مغز و اعصاب</option>
              <option value="زنان">زنان</option>
              <option value="دندانپزشکی">دندانپزشکی</option>
              <option value="چشم‌پزشکی">چشم‌پزشکی</option>
              <option value="ارتوپدی">ارتوپدی</option>
              <option value="پوست و مو">پوست و مو</option>
              <option value="سایر">سایر</option>
            </select>
          </div>

          {/* 🔸 از تاریخ */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">از تاریخ</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={filters.from}
              onChange={(date) =>
                setFilters({ ...filters, from: date?.format("YYYY-MM-DD") })
              }
              portal
              containerStyle={{ zIndex: 9999 }}
              inputClass="w-full border border-yellow-200 rounded-xl p-2 focus:ring-2 focus:ring-yellow-300 outline-none text-right"
            />
          </div>

          {/* 🔸 تا تاریخ */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">تا تاریخ</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={filters.to}
              onChange={(date) =>
                setFilters({ ...filters, to: date?.format("YYYY-MM-DD") })
              }
              portal
              containerStyle={{ zIndex: 9999 }}
              inputClass="w-full border border-yellow-200 rounded-xl p-2 focus:ring-2 focus:ring-yellow-300 outline-none text-right"
            />
          </div>

          {/* 🔘 دکمه حذف فیلترها */}
          <div className="flex items-end justify-start">
            <button
              onClick={() =>
                setFilters({ title: "", category: "", from: "", to: "" })
              }
              className="w-full bg-yellow-500 text-white py-2 px-5 rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> حذف فیلترها
            </button>
          </div>
        </div>
      </motion.div>

      {/* 📋 باکس گزارش‌های من */}
<motion.section
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-yellow-100 mb-10"
>
  {/* 🔹 هدر باکس */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 border-b pb-3">
    <div>
      <h2 className="text-xl font-semibold text-yellow-700">گزارش‌های من 📋</h2>
      <p className="text-sm text-gray-500 mt-1">
        صاحب پروفایل:{" "}
        <span className="font-medium text-gray-700">عرفان سمواتی</span>
      </p>
    </div>
    <p className="text-sm text-gray-600 mt-2 sm:mt-0">
      مجموع گزارش‌های ثبت‌شده:{" "}
      <span className="font-semibold text-yellow-700">{filteredRecords.length}</span>
    </p>
  </div>

  {/* 🟡 مرتب‌سازی و صفحه‌بندی */}
  {filteredRecords.length === 0 ? (
    <p className="text-center text-gray-500 py-6">
      هنوز گزارشی ثبت نکرده‌اید 🌸
    </p>
  ) : (
    <>
      {/* مرتب‌سازی بر اساس تاریخ */}
      {(() => {
        const sortedRecords = [...filteredRecords].sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });

        // صفحه‌بندی
        const itemsPerPage = 10;
        const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentRecords = sortedRecords.slice(
          startIndex,
          startIndex + itemsPerPage
        );

        return (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-right">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-800">
                    <th className="p-3 border-b border-yellow-200">تاریخ</th>
                    <th className="p-3 border-b border-yellow-200">عنوان گزارش</th>
                    <th className="p-3 border-b border-yellow-200">پزشک معالج</th>
                    <th className="p-3 border-b border-yellow-200">دسته درمانی</th>
                    <th className="p-3 border-b border-yellow-200 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-yellow-50 transition border-b border-gray-100"
                    >
                      <td className="p-3 text-gray-600">{rec.date || "—"}</td>
                      <td className="p-3 text-gray-700 font-medium">
                        {rec.title || "—"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {rec.doctor || "نامشخص"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {rec.category || "—"}
                      </td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <button className="px-3 py-1 rounded-lg text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition">
                          نمایش
                        </button>
                        <button className="px-3 py-1 rounded-lg text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                          ویرایش
                        </button>
                        <button
                          onClick={() => {
                            setRecords(records.filter((r) => r.id !== rec.id));
                            setCurrentPage(1); // بعد از حذف، برگرد صفحه ۱
                          }}
                          className="px-3 py-1 rounded-lg text-xs bg-red-100 text-red-700 hover:bg-red-200 transition"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔸 صفحه‌بندی دکمه‌ها */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-xl text-sm transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  قبلی
                </button>

                <span className="text-sm text-gray-600">
                  صفحه {currentPage} از {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-xl text-sm transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        );
      })()}
    </>
  )}
</motion.section>


      {/* 🩺 فرم افزودن گزارش */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-yellow-100 mb-10"
      >
        <h2 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-yellow-600" /> افزودن گزارش پزشکی جدید
        </h2>

        <div className="grid gap-4 text-right">
          {/* 🔸 عنوان گزارش (منوی بازشونده) */}
          <select
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option value="">انتخاب عنوان گزارش</option>
            <option value="چکاپ عمومی">چکاپ عمومی</option>
            <option value="چکاپ تخصصی">چکاپ تخصصی</option>
            <option value="آزمایش و بررسی‌های تخصصی پزشکی">
              آزمایش و بررسی‌های تخصصی پزشکی
            </option>
            <option value="بستری و جراحی">بستری و جراحی</option>
            <option value="سایر">سایر</option>
          </select>

          <input
            type="text"
            placeholder="نام پزشک معالج"
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option value="">انتخاب دسته درمانی</option>
            <option value="عمومی">عمومی</option>
            <option value="قلب و عروق">قلب و عروق</option>
            <option value="مغز و اعصاب">مغز و اعصاب</option>
            <option value="زنان">زنان</option>
            <option value="دندانپزشکی">دندانپزشکی</option>
            <option value="چشم‌پزشکی">چشم‌پزشکی</option>
            <option value="ارتوپدی">ارتوپدی</option>
            <option value="پوست و مو">پوست و مو</option>
            <option value="سایر">سایر</option>
          </select>

          <div>
            <label className="block text-sm text-gray-700 mb-1">تاریخ ثبت گزارش</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={form.date}
              onChange={(date) =>
                setForm({ ...form, date: date?.format("YYYY-MM-DD") })
              }
              portal
              containerStyle={{ zIndex: 9999 }}
              inputClass="border border-yellow-200 rounded-xl p-2 w-full focus:ring-2 focus:ring-yellow-300 outline-none text-right"
            />
          </div>

          <textarea
            placeholder="توضیح کوتاه (اختیاری)"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none min-h-[80px]"
          />

          {/* 🟢 آپلود چندفایلی با Tooltip و پیش‌نمایش داخل باکس */}
<div className="relative group">
  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-yellow-300 rounded-xl cursor-pointer hover:bg-yellow-50 transition text-center min-h-[120px]">
    {/* 🟡 اگر فایل انتخاب نشده */}
    {!form.files?.length && (
      <>
        <UploadCloud className="w-6 h-6 text-yellow-600 mb-1" />
        <span className="text-sm text-gray-600">
          آپلود تصویر یا فایل آزمایش / نسخه
        </span>
      </>
    )}

    {/* 🖼 اگر فایل‌ها انتخاب شده‌اند */}
    {form.files?.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        {form.files.map((file, index) => (
          <div
            key={index}
            className="relative border border-yellow-200 rounded-lg overflow-hidden bg-white/60"
          >
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`file-${index}`}
                className="w-full h-20 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center bg-yellow-50 h-20 text-yellow-700 text-xs font-medium">
                📄 فایل غیر تصویری
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setForm({
                  ...form,
                  files: form.files.filter((_, i) => i !== index),
                });
              }}
              className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}

    {/* 🟢 ورودی فایل */}
    <input
      type="file"
      multiple
      accept="image/*,.pdf,.doc,.docx"
      className="hidden"
      onChange={(e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length + (form.files?.length || 0) > 4) {
          alert("حداکثر ۴ فایل می‌توانید بارگذاری کنید");
          return;
        }
        setForm({
          ...form,
          files: [...(form.files || []), ...selectedFiles],
        });
      }}
    />
  </label>

  {/* 🔸 Tooltip توضیحی */}
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute hidden group-hover:block bg-yellow-50 border border-yellow-200 shadow-lg text-gray-700 text-sm rounded-xl p-3 w-80 right-0 top-[110%] z-50 leading-relaxed"
  >
    در این بخش می‌توانید حداکثر{" "}
    <span className="font-semibold text-yellow-700">۴ تصویر یا فایل</span>{" "}
    بارگذاری کنید؛ شامل مواردی مانند:
    <ul className="list-disc pr-4 mt-1">
      <li>تصویر آزمایش‌ها</li>
      <li>عکس رادیولوژی یا گزارش تصویربرداری</li>
      <li>عکس از محل جراحت یا زخم</li>
      <li>سایر مدارک پزشکی</li>
    </ul>
  </motion.div>
</div>


          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition font-medium"
          >
            ذخیره گزارش
          </button>
        </div>
      </motion.form>

    </main>
  );
}
