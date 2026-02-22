//src/components/Dashboard/ReminderBar.jsx

import { useState, useEffect, useRef } from "react";
import { Bell, Plus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { getReminders, createReminder, deleteReminder as apiDeleteReminder } from "../../services/api";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";

export default function ReminderBar() {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    date: "",
    desc: "",
    type: "",
    repeat: "",
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [deletePosition, setDeletePosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);
  const smallModalRef = useRef(null);

  const lines = [
    {
      key: "birthday",
      label: "تولدها 🎂",
      color: "from-pink-50 to-pink-100",
      tooltip: "🎂 یادآوری‌های تولد هر سال تکرار می‌شوند",
      repeat: "yearly",
    },
    {
      key: "anniversary",
      label: "سالروزها 💍",
      color: "from-yellow-50 to-yellow-100",
      tooltip: "💍 سالگردها هر سال به طور خودکار تمدید می‌شوند",
      repeat: "yearly",
    },
    {
      key: "other",
      label: "سایر یادآوری‌ها 📅",
      color: "from-green-50 to-green-100",
      tooltip: "📅 این یادآوری فقط تا زمان رسیدن به تاریخ خودش باقی می‌ماند",
      repeat: "once",
    },
  ];

  // 📦 Load reminders from server
useEffect(() => {
  let mounted = true;

  (async () => {
    const res = await getReminders();
    if (!mounted) return;

    if (res?.ok) {
      // reminders از سرور می‌آید
      const list = (res.reminders || []).map((r) => {
  // تبدیل remindAt (میلادی) به تاریخ شمسی برای نمایش
  const dateFa = r.remindAt
    ? new DateObject({
        date: new Date(r.remindAt),
        calendar: gregorian,
      })
        .convert(persian)
        .format("YYYY/MM/DD")
    : "";

  return {
    ...r,
    date: dateFa,          // برای UI
    desc: r.description || "", // برای UI (هم‌نام با کد فعلی)
  };
});

setReminders(list);
    } else {
      console.error("❌ getReminders failed:", res);
    }
  })();

  return () => {
    mounted = false;
  };
}, []);

  // 🔒 Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    if (showModal) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // 🔒 Close small delete modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (smallModalRef.current && !smallModalRef.current.contains(e.target)) {
        setActiveIndex(null);
      }
    };
    if (activeIndex !== null) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeIndex]);

  const addReminder = async () => {
  if (!newReminder.title || !newReminder.date) return;

  // تبدیل YYYY/MM/DD به تاریخ استاندارد برای سرور
  const remindAt = new DateObject({
  date: newReminder.date,
  format: "YYYY/MM/DD",
  calendar: persian,
  locale: persian_fa,
})
  .convert(gregorian)
  .toDate()
  .toISOString();

  const payload = {
    title: newReminder.title,
    description: newReminder.desc || null,
    type: newReminder.type,
    repeat: newReminder.repeat,
    remindAt,
  };

  const res = await createReminder(payload);

  if (!res?.ok) {
    console.error("❌ createReminder failed:", res);
    return;
  }

  // سرور reminder با id برمی‌گرداند
  const saved = res.reminder;

  // برای UI همان تاریخ شمسی انتخاب‌شده را نگه می‌داریم
  const uiItem = {
    ...saved,
    date: newReminder.date,
    desc: newReminder.desc || "",
  };

  setReminders((prev) => [...prev, uiItem]);
  setNewReminder({ title: "", date: "", desc: "", type: "", repeat: "" });
  setShowModal(false);
};

  const deleteReminder = async (index) => {
  const target = reminders[index];
  if (!target?.id) {
    console.error("❌ reminder id not found for delete:", target);
    return;
  }

  const res = await apiDeleteReminder(target.id);

  if (!res?.ok) {
    console.error("❌ deleteReminder failed:", res);
    return;
  }

  setReminders((prev) => prev.filter((_, i) => i !== index));
  setActiveIndex(null);
};

  const openModal = (type, repeat) => {
    setNewReminder({ title: "", date: "", desc: "", type, repeat });
    setShowModal(true);
  };

  const renderLine = (line) => {
    const filtered = reminders.filter((r) => r.type === line.key);

    return (
      <div
        key={line.key}
        onMouseEnter={() => setHoveredLine(line.key)}
        onMouseLeave={() => setHoveredLine(null)}
        className={`flex items-center gap-2 bg-gradient-to-r ${line.color} border border-yellow-100 rounded-xl p-2 text-xs mb-2 relative`}
      >
        {/* 🟡 Tooltip بالون طلایی */}
        <AnimatePresence>
          {hoveredLine === line.key && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute -top-8 right-4 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full shadow-sm border border-yellow-200"
            >
              {line.tooltip}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔔 عنوان خط */}
        <div className="flex items-center gap-1 whitespace-nowrap text-yellow-700 font-medium">
          <Bell className="w-3 h-3" />
          {line.label}
        </div>

        {/* 📋 لیست یادآوری‌ها */}
        <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent px-1">
          <AnimatePresence>
            {filtered.map((r, i) => {
              const globalIndex = reminders.indexOf(r);
              const isActive = activeIndex === globalIndex;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={`relative flex-shrink-0 bg-white border border-yellow-200 text-yellow-800 rounded-lg px-3 py-1 cursor-pointer hover:bg-yellow-50 transition ${
                    isActive ? "ring-2 ring-yellow-300" : ""
                  }`}
                  onClick={(e) => {
                    if (isActive) {
                      setActiveIndex(null);
                    } else {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDeletePosition({
                        top: rect.top + window.scrollY - 40, // بالای کارت
                        left: rect.left + rect.width / 2,
                      });
                      setActiveIndex(globalIndex);
                    }
                  }}
                >
                  {r.title} - {r.date}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ➕ دکمه افزودن */}
        <button
          onClick={() => openModal(line.key, line.repeat)}
          className="flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 text-yellow-700 rounded-lg px-2 py-1 transition flex-shrink-0"
          title="افزودن یادآوری جدید"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white border border-yellow-200 rounded-2xl shadow-sm p-3 flex flex-col text-[13px]">
      {lines.map((line) => renderLine(line))}

      {/* 🗑️ مودال کوچک حذف */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            ref={smallModalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bg-white border border-yellow-200 rounded-lg shadow-md p-2 text-xs flex items-center gap-1 z-[9999]"
            style={{
              top: `${deletePosition.top}px`,
              left: `${deletePosition.left}px`,
              transform: "translateX(-50%)",
            }}
          >
            <Trash2
              onClick={() => deleteReminder(activeIndex)}
              className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600"
              title="حذف یادآوری"
            />
            <span className="text-gray-600">حذف</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚪ مودال افزودن یادآوری */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-5 w-80 relative border border-yellow-200"
            >
              {/* دکمه ضربدر */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-yellow-700 font-bold text-center mb-4">
                افزودن{" "}
                {newReminder.type === "birthday"
                  ? "تولد 🎂"
                  : newReminder.type === "anniversary"
                  ? "سالروز 💍"
                  : "یادآوری 📅"}
              </h3>

              <input
                type="text"
                placeholder="عنوان یادآوری"
                value={newReminder.title}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, title: e.target.value })
                }
                className="w-full border border-yellow-200 rounded-lg p-2 mb-2 text-sm focus:ring-1 focus:ring-yellow-400"
              />

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={newReminder.date}
                onChange={(dateObj) => {
                  const formatted = dateObj?.format?.("YYYY/MM/DD") || "";
                  setNewReminder({ ...newReminder, date: formatted });
                }}
                inputClass="w-full border border-yellow-200 rounded-lg p-2 mb-2 text-sm focus:ring-1 focus:ring-yellow-400"
                placeholder="انتخاب تاریخ"
              />

              <textarea
                placeholder="توضیحات (اختیاری)"
                value={newReminder.desc}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, desc: e.target.value })
                }
                className="w-full border border-yellow-200 rounded-lg p-2 mb-3 text-sm focus:ring-1 focus:ring-yellow-400"
                rows="2"
              />

              <button
                onClick={addReminder}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm transition"
              >
                ذخیره یادآوری
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
