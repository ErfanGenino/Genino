import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Baby } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useSearchParams } from "react-router-dom";
import { authFetch } from "../services/api";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import { prepareImage } from "../utils/image/prepareImage";



export default function ChildProfile() {
  const navigate = useNavigate();
  const [ageText, setAgeText] = useState("");
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("girl");
  const [interests, setInterests] = useState("");
  const [childPhoto, setChildPhoto] = useState("");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // edit | null
  const editId = searchParams.get("id");
  const isEdit = mode === "edit";
  



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

// برای کارکردن دکمه ویرایش کودک
  useEffect(() => {
  async function loadChildForEdit() {
    if (mode !== "edit" || !editId) return;

    try {
      const listRes = await authFetch("/children");

      const children = Array.isArray(listRes)
        ? listRes
        : Array.isArray(listRes?.children)
        ? listRes.children
        : [];

      const child = children.find(
        (c) => String(c.id) === String(editId)
      );

      if (!child) {
        alert("اطلاعات کودک برای ویرایش پیدا نشد");
        return;
      }

      setChildName(child.fullName || "");
      setBirthDate(child.birthDate || "");
      setGender(child.gender || "girl");
      setInterests(child.interests || "");
      setChildPhoto(child.photo || "");
    } catch (err) {
      console.error("LOAD CHILD FOR EDIT ERROR:", err);
      alert("دریافت اطلاعات کودک انجام نشد");
    }
  }

  loadChildForEdit();
}, [mode, editId]);



  // 💾 ذخیره در localStorage و بازگشت
const handleSave = async () => {
  try {
    const token = localStorage.getItem("genino_token");
    console.log("TOKEN EXISTS?", !!token);

    if (!token) {
      alert("لطفاً دوباره وارد شوید");
      return;
    }

    if (!childName.trim()) {
  alert("نام کودک وارد نشده است");
  return;
}

if (!birthDate) {
  alert("تاریخ تولد کودک وارد نشده است");
  return;
}

    const payload = {
  fullName: childName,
  gender,
  interests,
  birthDate,
  photo: childPhoto,
};
    const isEditMode = mode === "edit" && editId;
    const method = isEditMode ? "PUT" : "POST";

    console.log("PAYLOAD:", payload);
    console.log("SAVE URL:", isEditMode ? `/children/${editId}` : "/children");

    // 1) ساخت/ویرایش کودک
    const saveRes = await authFetch(isEditMode ? `/children/${editId}` : "/children", {
      method,
      body: JSON.stringify(payload),
    });

    console.log("SAVE RES:", saveRes);

    // اگر سرور خطا برگرداند
    if (saveRes?.ok === false) {
      alert(saveRes?.message || "ذخیره کودک انجام نشد");
      return;
    }

   // 2) دریافت لیست جدید کودکان
const listRes = await authFetch("/children");
console.log("LIST RES:", listRes);

// ✅ نرمالایز: بک‌اند ممکنه [] یا {children: []} بده
const childrenArr = Array.isArray(listRes)
  ? listRes
  : Array.isArray(listRes?.children)
  ? listRes.children
  : [];

console.log("UPDATED CHILDREN:", childrenArr);

if (childrenArr.length === 0) {
  alert(listRes?.message || "لیست کودکان خالی برگشت (مشکل پاسخ /children)");
  return;
}

// ذخیره در localStorage
localStorage.setItem("children", JSON.stringify(childrenArr));
localStorage.setItem(
  "activeChildId",
  String(isEditMode ? editId : childrenArr[0].id)
);

// تریگر برای MyChild که از localStorage دوباره بخونه
window.dispatchEvent(new Event("storage"));




    navigate("/mychild", { replace: true });
  } catch (err) {
    console.error("HANDLE SAVE ERROR:", err);
    alert("ذخیره کودک انجام نشد");
  }
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
        <h2 className="text-2xl font-bold text-yellow-800 mb-1 text-center">
        {isEdit ? "ویرایش اطلاعات کودک" : "افزودن کودک"}
        </h2>

        {isEdit && (
        <p className="text-xs text-gray-600 mb-6 text-center">
         در حال ویرایش اطلاعات این کودک هستید
        </p>
        )}


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
              accept="image/*,.heic,.heif"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                try {
                  const compressedFile = await prepareImage(file, {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 700,
  quality: 0.82,
  outputFileName: "child-photo.jpg",
});

const { default: imageCompression } = await import("browser-image-compression");
const compressedPhoto = await imageCompression.getDataUrlFromFile(compressedFile);

setChildPhoto(compressedPhoto);
                } catch (err) {
                  console.error("CHILD PHOTO PREPARE ERROR:", err);
console.log("FILE INFO:", {
  name: file.name,
  type: file.type,
  size: file.size,
});
alert(err?.message || "آماده‌سازی عکس انجام نشد");
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
  value={
  birthDate
    ? new DateObject({
        date: birthDate,
        calendar: gregorian,
      }).convert(persian, persian_fa)
    : ""
}
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

          <div>
  <label className="block text-sm font-medium text-yellow-700 mb-1">
    علایق کودک
  </label>

  <input
    type="text"
    value={interests}
    onChange={(e) => setInterests(e.target.value)}
    placeholder="مثلاً: نقاشی، فوتبال، موسیقی، لگو..."
    className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
  />

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
          💾 {isEdit ? "ذخیره تغییرات" : "ذخیره کودک"}
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
