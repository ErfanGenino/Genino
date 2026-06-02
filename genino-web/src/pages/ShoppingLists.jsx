import { motion } from "framer-motion";
import { ArrowRight, Plus, ShoppingCart, Trash2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:80/api";

const categories = [
  "همه",
  "سوپرمارکت",
  "نانوایی",
  "میوه و سبزیجات",
  "سوپر پروتئین",
  "کودک",
  "داروخانه",
  "کتاب",
  "البسه",
  "لوازم خانه",
  "سایر",
];

const emptyRow = {
  category: "سوپرمارکت",
  title: "",
  amount: "",
  canceled: false,
  done: false,
};

export default function ShoppingLists() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("genino_user") || "{}") || {};

  const creatorName =
    currentUser.fullName ||
    `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() ||
    "کاربر ژنینو";

  const [rows, setRows] = useState([{ ...emptyRow }]);
  const [lists, setLists] = useState([]);
  const [filterCategory, setFilterCategory] = useState("همه");
  const [editingListId, setEditingListId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);

  const loadShoppingLists = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/shopping-lists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data.message);
      return;
    }

    const mappedLists = data.shoppingLists.map((list) => ({
      id: list.id,
      creatorName:
        list.creator?.fullName ||
        `${list.creator?.firstName || ""} ${
          list.creator?.lastName || ""
        }`.trim(),
      createdAt: new Date(list.createdAt).toLocaleDateString("fa-IR"),
      completed: list.completed,
      rows: list.items,
    }));

    setLists(mappedLists);
  } catch (err) {
    console.error("LOAD SHOPPING LISTS ERROR:", err);
  }
};

useEffect(() => {
  loadShoppingLists();
}, []);

  const today = new Date().toLocaleDateString("fa-IR");

  const updateRow = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, { ...emptyRow }]);
  };

  const removeRow = (index) => {
  setRows((prev) => {
    if (prev.length === 1) return prev;
    return prev.filter((_, rowIndex) => rowIndex !== index);
  });
};

  const startEditingList = (list) => {
  setRows(
  list.rows.map((row) => ({
    ...row,
  }))
);
  setEditingListId(list.id);
  setIsEditing(true);
  setShowCreateForm(true);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const submitList = async () => {
  const filledRows = rows.filter(
    (row) => row.title.trim() || row.amount.trim()
  );

  if (filledRows.length === 0) {
    alert("لطفاً حداقل یک کالا وارد کنید.");
    return;
  }

  if (isEditing && editingListId) {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/shopping-lists/${editingListId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: filledRows.map((row) => ({
            category: row.category,
            title: row.title,
            amount: row.amount,
            canceled: row.canceled || false,
            done: row.done || false,
          })),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "ویرایش لیست خرید انجام نشد");
      return;
    }

    await loadShoppingLists();

    setRows([{ ...emptyRow }]);
    setShowCreateForm(false);
    setEditingListId(null);
    setIsEditing(false);
    return;
  } catch (err) {
    console.error("UPDATE SHOPPING LIST FRONT ERROR:", err);
    alert("خطا در ارتباط با سرور");
    return;
  }
}

  try {
  const token = localStorage.getItem("genino_token");

  const res = await fetch(`${API_BASE_URL}/life-companion/shopping-lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: filledRows.map((row) => ({
        category: row.category,
        title: row.title,
        amount: row.amount,
      })),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "ثبت لیست خرید انجام نشد");
    return;
  }

  const newList = {
    id: data.shoppingList.id,
    creatorName:
      data.shoppingList.creator?.fullName ||
      `${data.shoppingList.creator?.firstName || ""} ${
        data.shoppingList.creator?.lastName || ""
      }`.trim() ||
      creatorName,
    createdAt: new Date(data.shoppingList.createdAt).toLocaleDateString("fa-IR"),
    rows: data.shoppingList.items,
    completed: data.shoppingList.completed,
  };

  setLists((prev) => [newList, ...prev]);
  setRows([{ ...emptyRow }]);
  setShowCreateForm(false);
} catch (err) {
  console.error("CREATE SHOPPING LIST FRONT ERROR:", err);
  alert("خطا در ارتباط با سرور");
}
};

  const deleteList = async (listId) => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/shopping-lists/${listId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "حذف لیست خرید انجام نشد");
      return;
    }

    await loadShoppingLists();
  } catch (err) {
    console.error("DELETE SHOPPING LIST FRONT ERROR:", err);
    alert("خطا در ارتباط با سرور");
  }
};

  const completeList = async (listId) => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/shopping-lists/${listId}/complete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "بستن لیست خرید انجام نشد");
      return;
    }

    await loadShoppingLists();
  } catch (err) {
    console.error("COMPLETE SHOPPING LIST FRONT ERROR:", err);
    alert("خطا در ارتباط با سرور");
  }
};

  const filteredLists = lists.map((list) => ({
    ...list,
    rows:
      filterCategory === "همه"
        ? list.rows
        : list.rows.filter((row) => row.category === filterCategory),
  }));

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
              <ShoppingCart size={15} />
              خریدهای مشترک خانه
            </div>

            <h1 className="text-3xl font-black leading-[1.6] text-rose-800 sm:text-4xl">
              لیست خرید مشترک
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-gray-600">
              اینجا شما و همراه زندگی‌تان می‌توانید لیست خرید خانه را بسازید،
              پیگیری کنید و وضعیت خریدها را با هم ببینید.
            </p>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-rose-50">
            <img
              src="/images/life-companion/shopping-list-hero.webp"
              alt="لیست خرید مشترک"
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
      ایجاد لیست خرید
    </button>
  </div>
)}

        {showCreateForm && (
  <div className="mb-6 rounded-[2rem] border border-rose-100 bg-white/80 p-5 shadow-[0_16px_50px_rgba(244,114,182,0.12)] backdrop-blur-xl">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-rose-800">
               {isEditing ? "ویرایش لیست خرید" : "ایجاد لیست خرید"}
            
              </h2>
              <p className="mt-1 text-xs font-bold text-gray-500">
                ایجادکننده: {creatorName} • تاریخ ایجاد: {today}
              </p>


            </div>
          </div>

          <div className="hidden sm:block">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-3">
              <thead>
                <tr className="text-xs font-black text-gray-500">
                  <th className="px-3 text-right">ردیف</th>
                  <th className="px-3 text-right">دسته‌بندی</th>
                  <th className="px-3 text-right">شرح کالا</th>
                  <th className="px-3 text-right">مقدار</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="rounded-2xl bg-white shadow-sm">
                    <td className="rounded-r-2xl border-y border-r border-rose-100 px-3 py-3 text-sm font-black text-rose-700">
  <div className="flex items-center gap-2">
    <span>{index + 1}</span>

    {rows.length > 1 && (
      <button
        type="button"
        onClick={() => removeRow(index)}
        className="rounded-full border border-rose-200 bg-white px-2 py-1 text-[10px] font-black text-rose-600 transition hover:bg-rose-50"
      >
        حذف
      </button>
    )}
  </div>
</td>

                    <td className="border-y border-rose-100 px-3 py-3">
                      <select
                        value={row.category}
                        onChange={(e) =>
                          updateRow(index, "category", e.target.value)
                        }
                        className="w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-3 py-2 text-sm font-bold outline-none"
                      >
                        {categories
                          .filter((item) => item !== "همه")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </td>

                    <td className="border-y border-rose-100 px-3 py-3">
                      <input
                        value={row.title}
                        onChange={(e) =>
                          updateRow(index, "title", e.target.value)
                        }
                        placeholder="مثلاً شیر، نان، دارو..."
                        className="w-full rounded-2xl border border-rose-100 bg-white px-3 py-2 text-sm font-bold outline-none"
                      />
                    </td>

                    <td className="border-y border-rose-100 px-3 py-3">
                      <input
                        value={row.amount}
                        onChange={(e) =>
                          updateRow(index, "amount", e.target.value)
                        }
                        placeholder="مثلاً ۲ عدد"
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
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-black text-rose-700">
          ردیف {index + 1}
        </span>

        {rows.length > 1 && (
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-[10px] font-black text-rose-600"
          >
            حذف
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          value={row.category}
          onChange={(e) => updateRow(index, "category", e.target.value)}
          className="rounded-xl border border-rose-100 bg-rose-50/50 px-2 py-2 text-xs font-bold outline-none"
        >
          {categories
            .filter((item) => item !== "همه")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <input
          value={row.amount}
          onChange={(e) => updateRow(index, "amount", e.target.value)}
          placeholder="مقدار"
          className="rounded-xl border border-rose-100 bg-white px-2 py-2 text-xs font-bold outline-none"
        />
      </div>

      <input
        value={row.title}
        onChange={(e) => updateRow(index, "title", e.target.value)}
        placeholder="شرح کالا"
        className="mt-2 w-full rounded-xl border border-rose-100 bg-white px-2 py-2 text-xs font-bold outline-none"
      />
    </div>
  ))}
</div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-white px-5 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-50"
            >
              <Plus size={18} />
              افزودن ردیف جدید
            </button>

            <button
  type="button"
  onClick={() => {
    setShowCreateForm(false);
    setIsEditing(false);
    setEditingListId(null);
    setRows([{ ...emptyRow }]);
  }}
  className="rounded-2xl border border-rose-200 bg-white px-6 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-50"
>
  انصراف و بستن
</button>

            <button
              type="button"
              onClick={submitList}
              className="rounded-2xl bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 px-6 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(244,114,182,0.35)] transition hover:-translate-y-0.5"
            >
             {isEditing ? "ذخیره ویرایش لیست خرید" : "ثبت لیست خرید"}
            </button>
          </div>
        </div>
)}

        <div className="space-y-5">
          {lists.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-rose-200 bg-white/70 px-5 py-8 text-center text-sm font-bold text-gray-500">
              هنوز لیست خریدی ثبت نشده است.
            </div>
          ) : (
            filteredLists.map((list) => (
              <div
                key={list.id}
                className={`rounded-[2rem] border p-5 transition ${
  list.completed
  ? "border-gray-300 bg-gray-100 grayscale opacity-60"
    : "border-rose-100 bg-white/85 shadow-[0_16px_50px_rgba(244,114,182,0.1)]"
}`}
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-black text-rose-800">
                      لیست خرید ثبت‌شده
                    </h3>
                    <p className="mt-1 text-xs font-bold text-gray-500">
                      ایجادکننده: {list.creatorName} • تاریخ: {list.createdAt}
                    </p>

                    <div className="mt-4">
  <p className="mb-2 text-xs font-black text-amber-800">
    فیلتر بر اساس دسته‌بندی
  </p>

  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
    {categories.map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => setFilterCategory(category)}
        className={`rounded-full border px-2 py-1 text-[10px] whitespace-nowrap font-black transition ${
          filterCategory === category
            ? "border-amber-300 bg-amber-100 text-amber-800"
            : "border-amber-100 bg-white text-gray-500 hover:bg-amber-50"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
</div>
                  </div>

                  {list.completed && (
                    <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700">
                      خرید انجام شد
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {list.rows.map((row, index) => (
  <div
    key={`${row.title}-${index}`}
    className="grid grid-cols-[24px_0.9fr_1.2fr_0.8fr_70px] items-center gap-1 rounded-2xl border border-rose-50 bg-rose-50/40 p-2 text-[11px] font-bold text-gray-700 sm:grid-cols-[50px_1fr_1.4fr_1fr_90px] sm:gap-3 sm:p-3 sm:text-sm"
  >
    <span>{index + 1}</span>
    <span>{row.category}</span>
    <span>{row.title}</span>
    <span>{row.amount}</span>

    <label className="flex items-center justify-end gap-1 text-[9px] sm:text-xs font-black text-emerald-700 whitespace-nowrap">
  <input
    type="checkbox"
    disabled={list.completed}
    checked={row.done}
    onChange={(e) => {
      const checked = e.target.checked;

      setLists((prev) =>
        prev.map((currentList) =>
          currentList.id === list.id
            ? {
                ...currentList,
                rows: currentList.rows.map((currentRow, rowIndex) =>
                  rowIndex === index
                    ? {
                        ...currentRow,
                        done: checked,
                      }
                    : currentRow
                ),
              }
            : currentList
        )
      );
    }}
    className="h-4 w-4"
  />
  خرید شد
</label>
  </div>
))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
  <button
  type="button"
  onClick={() => startEditingList(list)}
  disabled={list.completed}
  className={`inline-flex items-center justify-center gap-1 rounded-xl border px-1 py-2 text-[10px] font-black transition sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${
    list.completed
      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
      : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
  }`}
>
  ویرایش لیست خرید
</button>

  <button
  type="button"
  onClick={() => {
  setSelectedListId(list.id);
  setConfirmModal("complete");
}}
  disabled={list.completed}
  className={`inline-flex items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-black transition sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${
    list.completed
      ? "cursor-not-allowed bg-gray-200 text-gray-400"
      : "bg-emerald-500 text-white hover:opacity-90"
  }`}
>
  <CheckCircle2 size={18} />
  خرید انجام شد
</button>

  <button
    type="button"
    onClick={() => {
  setSelectedListId(list.id);
  setConfirmModal("delete");
}}
    className="inline-flex items-center justify-center gap-1 rounded-xl border border-rose-200 bg-white px-1 py-2 text-[10px] font-black text-rose-700 transition hover:bg-rose-50 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
  >
    <Trash2 size={12} />
    حذف لیست خرید
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
          ? "تأیید انجام خرید"
          : "تأیید حذف لیست خرید"}
      </h3>

      <p className="mt-4 text-sm font-bold leading-8 text-gray-600">
        {confirmModal === "complete"
          ? "آیا مطمئن هستید؟ بعد از ثبت خرید انجام‌شده، این لیست بسته می‌شود و امکان ویرایش یا تغییر وضعیت کالاها وجود ندارد."
          : "آیا مطمئن هستید می‌خواهید این لیست خرید را حذف کنید؟ این کار قابل بازگشت نیست."}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setConfirmModal(null);
            setSelectedListId(null);
          }}
          className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-600 transition hover:bg-gray-50"
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirmModal === "complete") {
              completeList(selectedListId);
            }

            if (confirmModal === "delete") {
              deleteList(selectedListId);
            }

            setConfirmModal(null);
            setSelectedListId(null);
          }}
          className={`rounded-2xl px-5 py-3 text-sm font-black text-white transition hover:opacity-90 ${
            confirmModal === "complete"
              ? "bg-emerald-500"
              : "bg-rose-500"
          }`}
        >
          {confirmModal === "complete"
            ? "بله، خرید انجام شد"
            : "بله، حذف شود"}
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}