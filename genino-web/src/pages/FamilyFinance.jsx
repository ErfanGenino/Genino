// 📄 src/pages/FamilyFinance.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, PiggyBank, ShoppingBag } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function FamilyFinance() {
  // 💰 درآمدها
  const [incomes, setIncomes] = useState([]);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newIncome, setNewIncome] = useState({ title: "", amount: "" });
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const addIncome = () => {
    if (!newIncome.title || !newIncome.amount) return;
    setIncomes([...incomes, newIncome]);
    setNewIncome({ title: "", amount: "" });
    setShowAddIncome(false);
  };

  // 💎 دارایی‌ها
  const [assets, setAssets] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: "", value: "", desc: "" });

  // ✏️ و 🗑️ ویرایش و حذف
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ value: "", reason: "" });
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const assetTypes = [
    "ملک",
    "خودرو / وسیله نقلیه",
    "وجه نقد (تومان)",
    "ارز",
    "طلا",
    "طلای دیجیتال",
    "سکه طلا",
    "رمز ارز",
    "سایر دارایی‌ها",
  ];

  const addAsset = () => {
    if (!form.type || !form.value) return;
    setAssets([...assets, form]);
    setForm({ type: "", value: "", desc: "" });
    setShowAdd(false);
  };

  const handleDelete = (index) => setConfirmDeleteIndex(index);

  const confirmDelete = () => {
    const updated = [...assets];
    updated.splice(confirmDeleteIndex, 1);
    setAssets(updated);
    setConfirmDeleteIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm({
      value: assets[index].value,
      reason: "",
    });
  };

  const saveEdit = () => {
    const updated = [...assets];
    updated[editingIndex].value = editForm.value;
    updated[editingIndex].desc += editForm.reason
      ? ` (توضیح تغییر: ${editForm.reason})`
      : "";
    setAssets(updated);
    setEditingIndex(null);
  };

  const totalValue = assets.reduce((sum, a) => sum + Number(a.value || 0), 0);

  const pieData = assetTypes
    .map((type) => {
      const sum = assets
        .filter((a) => a.type === type)
        .reduce((s, x) => s + Number(x.value || 0), 0);
      return { name: type, value: sum };
    })
    .filter((x) => x.value > 0);

  const COLORS = [
    "#FFD54F",
    "#A7F3D0",
    "#93C5FD",
    "#FBCFE8",
    "#FCD34D",
    "#BBF7D0",
    "#C7D2FE",
    "#FDE68A",
    "#F5D0FE",
  ];

  const getHint = (type) => {
    switch (type) {
      case "ملک":
        return "آدرس و متراژ ملک را وارد کنید.";
      case "خودرو / وسیله نقلیه":
        return "نوع خودرو و سال تولید را بنویسید.";
      case "وجه نقد (تومان)":
        return "مبلغ فعلی وجه نقد خود را بنویسید.";
      case "طلا":
        return "نوع (گردنبند، گوشواره...) و وزن را بنویسید.";
      case "سکه طلا":
        return "نوع سکه و تعداد آن را وارد کنید.";
      case "رمز ارز":
        return "نوع رمزارز و تعداد کوین‌ها را وارد کنید.";
      case "ارز":
        return "نوع ارز (دلار، یورو...) و مقدار را بنویسید.";
      default:
        return "توضیح کوتاهی درباره دارایی خود بنویسید.";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fff6db] to-[#fff1b8] text-gray-800 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-700 mb-12 drop-shadow-[0_0_15px_rgba(255,220,120,0.6)]">
        تراز خانواده ژنینو 💛
      </h1>

      {/* 💰 درآمدها + خروجی‌ها */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* درآمدها */}
        <div className="bg-white/90 border border-yellow-300 rounded-3xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
          <h2 className="text-xl font-bold text-yellow-700 mb-4">💰 ورودی‌های پول (درآمدها)</h2>
          {incomes.length === 0 && (
            <p className="text-gray-500 text-sm mb-4">هنوز هیچ درآمدی ثبت نشده است.</p>
          )}
          {incomes.map((inc, i) => (
            <div key={i} className="flex justify-between mb-2 text-gray-700 border-b border-yellow-100 pb-1">
              <span>{inc.title}</span>
              <span>{Number(inc.amount).toLocaleString()} تومان</span>
            </div>
          ))}
          <div className="mt-3 text-right font-bold text-green-600 border-t border-yellow-200 pt-2">
            جمع کل: {totalIncome.toLocaleString()} تومان
          </div>
          <motion.button
            onClick={() => setShowAddIncome(!showAddIncome)}
            whileHover={{ scale: 1.05 }}
            className="mt-5 w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full font-medium shadow flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" /> افزودن درآمد جدید
          </motion.button>
          {showAddIncome && (
            <div className="mt-4 flex flex-col gap-2">
              <input
                placeholder="عنوان درآمد (مثلاً حقوق اصلی)"
                value={newIncome.title}
                onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
                className="p-2 border border-yellow-200 rounded-xl text-sm focus:ring-1 focus:ring-yellow-400"
              />
              <input
                placeholder="مبلغ (تومان)"
                type="number"
                value={newIncome.amount}
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                className="p-2 border border-yellow-200 rounded-xl text-sm focus:ring-1 focus:ring-yellow-400"
              />
              <motion.button
                onClick={addIncome}
                whileHover={{ scale: 1.05 }}
                className="mt-2 w-full py-2 bg-yellow-500 text-white rounded-full font-bold"
              >
                ذخیره
              </motion.button>
            </div>
          )}
        </div>

        {/* خروجی‌ها */}
        <div className="bg-white/90 border border-yellow-300 rounded-3xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
          <h2 className="text-xl font-bold text-yellow-700 mb-4">خروجی‌های پول 💸</h2>
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-green-700 font-bold">
              <PiggyBank className="w-5 h-5" />
              <span>دارایی‌ها (سرمایه‌سازی)</span>
            </div>
            <p className="text-sm text-green-700/80 leading-relaxed">
              ۱۰٪ از درآمد ماهانه‌ات به دارایی اختصاص پیدا می‌کند (سرمایه‌گذاری، پس‌انداز، خرید طلا و غیره).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-yellow-50 border border-yellow-200 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-yellow-700 font-bold">
              <ShoppingBag className="w-5 h-5" />
              <span>هزینه‌ها (مصرف)</span>
            </div>
            <ul className="text-gray-700 text-sm leading-relaxed">
              <li>🏠 هزینه‌های ثابت (اجاره، اقساط و ...)</li>
              <li>🍎 خوراک و مواد غذایی – ۴۰٪</li>
              <li>💊 بهداشت و سلامت – ۲۰٪</li>
              <li>🚗 سایر هزینه‌ها – ۳۰٪</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* 💎 دارایی‌ها */}
      <section className="w-full max-w-5xl bg-white/90 border border-green-200 rounded-3xl p-6 shadow-[0_0_25px_rgba(16,185,129,0.2)] text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">دارایی‌های من 💎</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-full shadow"
          >
            <PlusCircle className="w-4 h-4" /> افزودن دارایی
          </motion.button>
        </div>

        {showAdd && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="p-2 border border-green-300 rounded-xl text-sm focus:ring-1 focus:ring-green-400"
              >
                <option value="">نوع دارایی را انتخاب کنید</option>
                {assetTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="ارزش دارایی (تومان)"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className="p-2 border border-green-300 rounded-xl text-sm focus:ring-1 focus:ring-green-400"
              />

              <input
                placeholder={getHint(form.type)}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="p-2 border border-green-300 rounded-xl text-sm focus:ring-1 focus:ring-green-400"
              />
            </div>

            <motion.button
              onClick={addAsset}
              whileHover={{ scale: 1.05 }}
              className="w-full py-2 bg-green-600 text-white rounded-full font-bold"
            >
              ذخیره دارایی
            </motion.button>
          </div>
        )}

        {/* جدول دارایی‌ها */}
        {assets.length > 0 ? (
          <>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-100 text-green-700">
                    <th className="py-2 px-3">نوع دارایی</th>
                    <th className="py-2 px-3">ارزش (تومان)</th>
                    <th className="py-2 px-3">توضیحات</th>
                    <th className="py-2 px-3 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((a, i) => (
                    <tr key={i} className="border-b border-green-100 hover:bg-green-50 transition">
                      <td className="py-2 px-3">{a.type}</td>
                      <td className="py-2 px-3 text-right font-semibold text-gray-700">
                        {Number(a.value).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-gray-600">{a.desc}</td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleEdit(i)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            ✏️ ویرایش
                          </button>
                          <button
                            onClick={() => handleDelete(i)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️ حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* نمودار دارایی‌ها (دونات مینیمال) */}
            {pieData.length > 0 && (
              <div className="relative w-full h-[380px] flex flex-col items-center justify-center mt-10">
                <div className="w-full h-72">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="absolute text-center top-1/2 -translate-y-1/2">
                  <p className="text-sm text-gray-500 mb-1">مجموع دارایی‌ها</p>
                  <p className="text-2xl font-extrabold text-emerald-700">
                    {totalValue.toLocaleString()} <span className="text-base">تومان</span>
                  </p>
                </div>

                <div className="mt-8 w-full max-w-md grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-[13px] text-gray-700">
                  {pieData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="truncate">{item.name}</span>
                      <span className="ml-auto text-gray-600 font-semibold">
                        {((item.value / totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm mb-4">هنوز دارایی‌ای ثبت نشده است.</p>
        )}
      </section>

      {/* 🗑️ مودال تأیید حذف — تنها یک بار (تک) */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-[90%] text-center"
          >
            <p className="text-gray-700 mb-6 font-medium">
              آیا مطمئن هستید که می‌خواهید این دارایی را حذف کنید؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-500 text-white rounded-full font-bold"
              >
                بله، حذف شود
              </button>
              <button
                onClick={() => setConfirmDeleteIndex(null)}
                className="px-5 py-2 bg-gray-200 rounded-full font-medium"
              >
                خیر
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ✏️ مودال ویرایش دارایی */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl max-w-md w-[90%]"
          >
            <h3 className="text-lg font-bold text-green-700 mb-4">ویرایش دارایی 💎</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              می‌توانید ارزش دارایی خود را اصلاح کنید. لطفاً دلیل تغییر را بنویسید 🌱
            </p>

            <input
              type="number"
              placeholder="ارزش جدید دارایی (تومان)"
              value={editForm.value}
              onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
              className="w-full mb-3 p-2 border border-green-200 rounded-xl text-sm"
            />

            <textarea
              placeholder="دلیل افزایش یا کاهش ارزش دارایی را بنویسید..."
              value={editForm.reason}
              onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })}
              className="w-full mb-4 p-2 border border-green-200 rounded-xl text-sm resize-none"
              rows={3}
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={saveEdit}
                className="px-5 py-2 bg-green-600 text-white rounded-full font-bold"
              >
                ذخیره تغییرات
              </button>
              <button
                onClick={() => setEditingIndex(null)}
                className="px-5 py-2 bg-gray-200 rounded-full font-medium"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
