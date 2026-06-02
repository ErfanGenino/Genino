import { motion } from "framer-motion";
import {
  ArrowRight,
  Plus,
  CalendarDays,
  Trash2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:80/api";

const eventTypes = [
  "قرار ملاقات",
  "دعوت شدن",
  "دعوت کردن",
  "رزرو سینما",
  "رزرو تئاتر",
  "رزرو کنسرت",
  "وقت پزشک",
  "وقت آرایشگاه",
  "تولد",
  "سالگرد",
  "سفر",
  "جلسه مدرسه کودک",
  "سایر",
];

const emptyRow = {
  eventType: "وقت پزشک",
  eventDate: "",
  eventTime: "",
  description: "",
};

function persianStrToGregorianISO(persianStr) {
  const persianDate = new DateObject({
    date: persianStr,
    calendar: persian,
    locale: persian_fa,
  });

  return persianDate.convert(gregorian).toDate().toISOString();
}

function gregorianDateToPersian(dateStr) {
  if (!dateStr) return "";

  return new DateObject({
    date: dateStr,
    calendar: gregorian,
  })
    .convert(persian)
    .format("YYYY-MM-DD");
}

export default function LifeEvents() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("genino_user") || "{}") || {};

  const creatorName =
    currentUser.fullName ||
    `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() ||
    "کاربر ژنینو";

  const today = new Date().toLocaleDateString("fa-IR");

  const [rows, setRows] = useState([{ ...emptyRow }]);
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);


  const loadLifeEvents = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/life-events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !Array.isArray(data.lifeEvents)) {
      return;
    }

    const mappedEvents = data.lifeEvents.map((event) => ({
      id: event.id,
      creatorName:
        event.creator?.fullName ||
        `${event.creator?.firstName || ""} ${event.creator?.lastName || ""}`.trim() ||
        "کاربر ژنینو",
      createdAt: new Date(event.createdAt).toLocaleDateString("fa-IR"),
      completed: event.completed,
      rows: [
  {
    eventType: event.eventType,

    eventDate: event.eventDate
      ? gregorianDateToPersian(event.eventDate.slice(0, 10))
      : "",

    displayDate: event.eventDate
      ? new Date(event.eventDate).toLocaleDateString("fa-IR")
      : "",

    eventTime: event.eventTime || "",
    description: event.description || "",
  },
],
    }));

    setEvents(mappedEvents);
  } catch (err) {
    console.error("LOAD LIFE EVENTS ERROR:", err);
  }
};

useEffect(() => {
  loadLifeEvents();
}, []);

  const updateRow = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  };


  const resetForm = () => {
    setRows([{ ...emptyRow }]);
    setShowCreateForm(false);
    setIsEditing(false);
    setEditingEventId(null);
  };

  const submitEvents = async () => {
  const row = rows[0];

  if (!row.eventType?.trim() || !row.eventDate) {
    alert("لطفاً نوع رویداد و تاریخ رویداد را وارد کنید.");
    return;
  }

  try {
    const token = localStorage.getItem("genino_token");

    const submitUrl =
  isEditing && editingEventId
    ? `${API_BASE_URL}/life-companion/life-events/${editingEventId}`
    : `${API_BASE_URL}/life-companion/life-events`;

    const res = await fetch(submitUrl, {
      method: isEditing && editingEventId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventType: row.eventType,
        eventDate: persianStrToGregorianISO(row.eventDate),
        eventTime: row.eventTime,
        description: row.description,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "ثبت رویداد انجام نشد");
      return;
    }

    await loadLifeEvents();
    resetForm();
  } catch (err) {
    console.error("SUBMIT LIFE EVENT ERROR:", err);
    alert("خطا در ارتباط با سرور");
  }
};

  const startEditingEvent = (event) => {
    setRows(event.rows.map((row) => ({ ...row })));
    setEditingEventId(event.id);
    setIsEditing(true);
    setShowCreateForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const completeEvent = async (eventId) => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/life-events/${eventId}/complete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "ثبت انجام شدن رویداد انجام نشد");
      return;
    }

    await loadLifeEvents();
  } catch (err) {
    console.error("COMPLETE LIFE EVENT FRONT ERROR:", err);
    alert("خطا در ارتباط با سرور");
  }
};

  const deleteEvent = async (eventId) => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/life-events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حذف رویداد انجام نشد");
      return;
    }

    await loadLifeEvents();
  } catch (err) {
    console.error("DELETE LIFE EVENT FRONT ERROR:", err);
    alert("خطا در ارتباط با سرور");
  }
};

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-white to-amber-50 px-4 py-8 text-gray-800"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-44 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/life-companion")}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-2 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-50"
        >
          <ArrowRight size={16} />
          بازگشت به همراه زندگی
        </button>

        <motion.div
  initial={{ opacity: 0, y: 26 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55 }}
  className="mb-7 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[2.2rem] border border-rose-100 bg-white/75 p-5 shadow-[0_24px_80px_rgba(244,114,182,0.18)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:p-8"
>
  <div>
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-black text-amber-700">
      <CalendarDays size={15} />
      قرارها و برنامه‌های مشترک
    </div>

    <h1 className="text-3xl font-black leading-[1.6] text-rose-800 sm:text-4xl">
      رویدادها و قرارها
    </h1>

    <p className="mt-4 max-w-2xl text-sm leading-8 text-gray-600">
      اینجا شما و همراه زندگی‌تان می‌توانید قرارها، رزروها، دعوت‌ها و اتفاقات مهم را ثبت و پیگیری کنید. برای زوجهایی که به نظم اهمیت میدهند و افراد موفقی که مشغله آنها بالاست.
    </p>
  </div>

  <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-rose-50">
    <img
      src="/images/life-companion/events-hero.webp"
      alt="رویدادها و قرارها"
      className="h-full w-full object-contain"
    />
  </div>
</motion.div>

        {!showCreateForm && (
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 px-6 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(244,114,182,0.35)] transition hover:-translate-y-0.5"
            >
              <Plus size={18} />
              ایجاد رویداد جدید
            </button>
          </div>
        )}

        {showCreateForm && (
          <div className="mb-6 rounded-[2rem] border border-rose-100 bg-white/80 p-5 shadow-[0_16px_50px_rgba(244,114,182,0.12)] backdrop-blur-xl">
            <div className="mb-5">
              <h2 className="text-lg font-black text-rose-800">
                {isEditing ? "ویرایش رویداد" : "ایجاد رویداد"}
              </h2>

              <p className="mt-1 text-xs font-bold text-gray-500">
                ایجادکننده: {creatorName} • تاریخ ایجاد: {today}
              </p>
            </div>

            <div className="hidden sm:block">
              <table className="w-full min-w-[860px] border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-xs font-black text-gray-500">
                    <th className="px-3 text-right">نوع رویداد</th>
                    <th className="px-3 text-right">تاریخ رویداد</th>
                    <th className="px-3 text-right">ساعت رویداد</th>
                    <th className="px-3 text-right">شرح رویداد</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} className="rounded-2xl bg-white shadow-sm">
                    

                      <td className="rounded-r-2xl border-y border-r border-rose-100 px-3 py-3">
                        <select
                          value={row.eventType}
                          onChange={(e) =>
                            updateRow(index, "eventType", e.target.value)
                          }
                          className="w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-3 py-2 text-sm font-bold outline-none"
                        >
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border-y border-rose-100 px-3 py-3">
  <DatePicker
    calendar={persian}
    locale={persian_fa}
    value={row.eventDate}
    onChange={(date) =>
      updateRow(
        index,
        "eventDate",
        date?.format("YYYY-MM-DD") || ""
      )
    }
    inputClass="w-full rounded-2xl border border-rose-100 bg-white px-3 py-2 text-sm font-bold outline-none"
    portal
  />
</td>

                      <td className="border-y border-rose-100 px-3 py-3">
                        <input
  type="text"
  inputMode="numeric"
  value={row.eventTime}
  onChange={(e) =>
    updateRow(index, "eventTime", e.target.value)
  }
  placeholder="مثلاً ۱۸:۳۰"
  dir="rtl"
  className="w-full rounded-2xl border border-rose-100 bg-white px-3 py-2 text-sm font-bold outline-none text-right"
/>
                      </td>

                      <td className="rounded-l-2xl border-y border-l border-rose-100 px-3 py-3">
                        <input
                          value={row.description}
                          onChange={(e) =>
                            updateRow(index, "description", e.target.value)
                          }
                          placeholder="مثلاً قرار ملاقات با ... ، رزرو سینما، قرار ملاقات با پزشک..."
                          className="w-full rounded-2xl border border-rose-100 bg-white px-3 py-2 text-sm font-bold outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 sm:hidden">
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-rose-100 bg-white p-3 shadow-sm"
                >
                

                  <select
                    value={row.eventType}
                    onChange={(e) =>
                      updateRow(index, "eventType", e.target.value)
                    }
                    className="w-full rounded-xl border border-rose-100 bg-rose-50/50 px-2 py-2 text-xs font-bold outline-none"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <DatePicker
  calendar={persian}
  locale={persian_fa}
  value={row.eventDate}
  onChange={(date) =>
    updateRow(
      index,
      "eventDate",
      date?.format("YYYY-MM-DD") || ""
    )
  }
  inputClass="w-full rounded-xl border border-rose-100 bg-white px-2 py-2 text-xs font-bold outline-none"
  portal
/>

                    <input
  type="text"
  inputMode="numeric"
  value={row.eventTime}
  onChange={(e) =>
    updateRow(index, "eventTime", e.target.value)
  }
  placeholder="مثلاً ۱۸:۳۰"
  dir="rtl"
  className="w-full rounded-2xl border border-rose-100 bg-white px-3 py-2 text-sm font-bold outline-none text-right"
/>
                  </div>

                  <input
                    value={row.description}
                    onChange={(e) =>
                      updateRow(index, "description", e.target.value)
                    }
                    placeholder="شرح رویداد"
                    className="mt-2 w-full rounded-xl border border-rose-100 bg-white px-2 py-2 text-xs font-bold outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-rose-200 bg-white px-6 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-50"
              >
                انصراف و بستن
              </button>

              <button
                type="button"
                onClick={submitEvents}
                className="rounded-2xl bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 px-6 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(244,114,182,0.35)] transition hover:-translate-y-0.5"
              >
                {isEditing ? "ذخیره ویرایش رویداد" : "ثبت رویداد"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {events.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-rose-200 bg-white/70 px-5 py-8 text-center text-sm font-bold text-gray-500">
              هنوز رویدادی ثبت نشده است.
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`rounded-[2rem] border p-5 transition ${
                  event.completed
                    ? "border-gray-300 bg-gray-100 grayscale opacity-60"
                    : "border-rose-100 bg-white/85 shadow-[0_16px_50px_rgba(244,114,182,0.1)]"
                }`}
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-black text-rose-800">
                      رویداد ثبت‌شده
                    </h3>

                    <p className="mt-1 text-xs font-bold text-gray-500">
                      ایجادکننده: {event.creatorName} • تاریخ ثبت: {event.createdAt}
                    </p>
                  </div>

                  {event.completed && (
                    <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700">
                      انجام شد
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {event.rows.map((row, index) => (
                    <div
                      key={`${row.eventType}-${index}`}
                      className="grid grid-cols-[1fr_1fr] gap-1 rounded-2xl border border-rose-50 bg-rose-50/40 p-2 text-[11px] font-bold text-gray-700 sm:grid-cols-[1fr_1fr_1fr_2fr] sm:gap-3 sm:p-3 sm:text-sm"
                    >
                    
                      <span>{row.eventType}</span>

                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={13} />
                        {row.displayDate || "بدون تاریخ"}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} />
                        {row.eventTime || "بدون ساعت"}
                      </span>

                      <span className="col-span-2 sm:col-span-1">
                        {row.description || "بدون شرح"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => startEditingEvent(event)}
                    disabled={event.completed}
                    className={`inline-flex items-center justify-center gap-1 rounded-xl border px-1 py-2 text-[10px] font-black transition sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${
                      event.completed
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    ویرایش رویداد
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEventId(event.id);
                      setConfirmModal("complete");
                    }}
                    disabled={event.completed}
                    className={`inline-flex items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-black transition sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${
                      event.completed
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-emerald-500 text-white hover:opacity-90"
                    }`}
                  >
                    <CheckCircle2 size={18} />
                    انجام شد
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEventId(event.id);
                      setConfirmModal("delete");
                    }}
                    className="inline-flex items-center justify-center gap-1 rounded-xl border border-rose-200 bg-white px-1 py-2 text-[10px] font-black text-rose-700 transition hover:bg-rose-50 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <Trash2 size={12} />
                    حذف رویداد
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-2xl">
            <h3 className="text-xl font-black text-rose-800">
              {confirmModal === "complete"
                ? "تأیید انجام رویداد"
                : "تأیید حذف رویداد"}
            </h3>

            <p className="mt-4 text-sm font-bold leading-8 text-gray-600">
              {confirmModal === "complete"
                ? "آیا مطمئن هستید؟ بعد از انجام‌شده کردن، این رویداد بسته می‌شود."
                : "آیا مطمئن هستید می‌خواهید این رویداد را حذف کنید؟ این کار قابل بازگشت نیست."}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmModal(null);
                  setSelectedEventId(null);
                }}
                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-600 transition hover:bg-gray-50"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirmModal === "complete") {
                    completeEvent(selectedEventId);
                  }

                  if (confirmModal === "delete") {
                    deleteEvent(selectedEventId);
                  }

                  setConfirmModal(null);
                  setSelectedEventId(null);
                }}
                className={`rounded-2xl px-5 py-3 text-sm font-black text-white transition hover:opacity-90 ${
                  confirmModal === "complete"
                    ? "bg-emerald-500"
                    : "bg-rose-500"
                }`}
              >
                {confirmModal === "complete"
                  ? "بله، انجام شد"
                  : "بله، حذف شود"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}