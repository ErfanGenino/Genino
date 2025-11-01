// 📄 src/pages/FamilyFinance.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, PiggyBank } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function FamilyFinance() {
    // 📅 انتخاب ماه و سال
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const years = ["1403", "1404", "1405"];

  const [selectedMonth, setSelectedMonth] = useState("فروردین");
  const [selectedYear, setSelectedYear] = useState("1404");
  // 🧮 تحلیل عملکرد
const [analysis, setAnalysis] = useState(null);

  // 💰 درآمدها
  const [incomes, setIncomes] = useState([]);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newIncome, setNewIncome] = useState({ title: "", amount: "" });
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  // 📅 داده‌های سالانه برای نمودار عملکرد
const [yearlyData, setYearlyData] = useState([]);


  const addIncome = () => {
    if (!newIncome.title || !newIncome.amount) return;
    setIncomes([...incomes, newIncome]);
    setNewIncome({ title: "", amount: "" });
    setShowAddIncome(false);
  };

  // 💎 دارایی‌ها (جدول و نمودار)
  const [assets, setAssets] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: "", value: "", desc: "" });

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
    setEditForm({ value: assets[index].value, reason: "" });
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

  // 💸 هزینه‌های ثابت
  const [fixedCosts, setFixedCosts] = useState([]);
  const [showAddFixed, setShowAddFixed] = useState(false);
  const [newFixed, setNewFixed] = useState({ title: "", amount: "" });
  const totalFixedCosts = fixedCosts.reduce((sum, c) => sum + Number(c.amount || 0), 0);

  const addFixedCost = () => {
    if (!newFixed.title || !newFixed.amount) return;
    setFixedCosts([...fixedCosts, newFixed]);
    setNewFixed({ title: "", amount: "" });
    setShowAddFixed(false);
  };

  // 📈 عملکرد واقعی ماه
const [performance, setPerformance] = useState({
  invest: "",
  food: "",
  health: "",
  other: "",
});
const [showSaved, setShowSaved] = useState(false);

  // 💰 مبلغ باقیمانده
  const remaining = Math.max(totalIncome - totalFixedCosts, 0);

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
    // 💾 ذخیره و بازیابی داده‌ها برای هر ماه و سال
  useEffect(() => {
    const key = `finance-${selectedYear}-${selectedMonth}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      setIncomes(parsed.incomes || []);
      setFixedCosts(parsed.fixedCosts || []);
      setAssets(parsed.assets || []);
    } else {
      setIncomes([]);
      setFixedCosts([]);
      setAssets([]);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const key = `finance-${selectedYear}-${selectedMonth}`;
    const data = { incomes, fixedCosts, assets };
    localStorage.setItem(key, JSON.stringify(data));
  }, [incomes, fixedCosts, assets, selectedMonth, selectedYear]);
  useEffect(() => {
  const key = `performance-${selectedYear}-${selectedMonth}`;
  const saved = localStorage.getItem(key);
  if (saved) setPerformance(JSON.parse(saved));
}, [selectedMonth, selectedYear]);
// 📊 محاسبه عملکرد کاربر نسبت به پیشنهاد ژنینو
const analyzePerformance = () => {
  if (!remaining || !performance) return;

  const expected = {
    invest: remaining * 0.1,
    food: remaining * 0.3,
    health: remaining * 0.2,
    other: remaining * 0.4,
  };

  const diffs = {
    invest: performance.invest - expected.invest,
    food: performance.food - expected.food,
    health: performance.health - expected.health,
    other: performance.other - expected.other,
  };

  const score =
    (diffs.invest > 0 ? 1 : 0) +
    (diffs.food < 0 ? 1 : 0) +
    (diffs.health < 0 ? 1 : 0) +
    (diffs.other < 0 ? 1 : 0);

  let summary = "";
  if (score === 4) summary = "عملکرد شما فوق‌العاده است 👑";
  else if (score >= 2) summary = "عملکرد کلی شما خوب است 🌿";
  else summary = "نیاز به بهبود در مدیریت هزینه‌ها دارید ⚠️";

  setAnalysis({ diffs, expected, summary });
};
// 📊 جمع‌آوری داده‌های تمام ماه‌های سال برای نمودار
const prepareYearlyChart = () => {
  const data = months.map((m) => {
    const perf = JSON.parse(localStorage.getItem(`performance-${selectedYear}-${m}`) || "{}");
    const finance = JSON.parse(localStorage.getItem(`finance-${selectedYear}-${m}`) || "{}");

    const totalIncome = finance.incomes?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0;
    const totalFixed = finance.fixedCosts?.reduce((s, c) => s + Number(c.amount || 0), 0) || 0;
    const remaining = Math.max(totalIncome - totalFixed, 0);

    const expectedInvest = remaining * 0.1;
    const actualInvest = Number(perf.invest || 0);

    return {
      month: m,
      پیشنهاد_ژنینو: Math.round(expectedInvest),
      سرمایه‌گذاری_واقعی: Math.round(actualInvest),
    };
  });

  setYearlyData(data);
};


  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fff6db] to-[#fff1b8] text-gray-800 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-700 mb-12 drop-shadow-[0_0_15px_rgba(255,220,120,0.6)]">
        تراز خانواده ژنینو 💛
      </h1>

            {/* 🗓️ انتخاب ماه و سال */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <div className="flex items-center gap-2">
          <label className="font-bold text-yellow-700">ماه:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 rounded-xl border border-yellow-300 bg-white shadow-sm focus:ring-2 focus:ring-yellow-400"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold text-yellow-700">سال:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 rounded-xl border border-yellow-300 bg-white shadow-sm focus:ring-2 focus:ring-yellow-400"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>


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

        {/* 💸 خروجی‌های پول (سه بخش) */}
        <div className="bg-white/90 border border-yellow-300 rounded-3xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
          <h2 className="text-xl font-bold text-yellow-700 mb-4">💸 خروجی‌های پول</h2>

          {/* 🏠 ثابت */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-yellow-700 font-bold">🏠 <span>هزینه‌های ثابت</span></div>

            {/* لیست هزینه‌های ثابت واقعی + فرم */}
            <div className="space-y-2">
              {fixedCosts.length === 0 && (
                <p className="text-gray-500 text-sm">هنوز هزینه ثابتی ثبت نشده است.</p>
              )}
              {fixedCosts.map((c, i) => (
                <div key={i} className="flex justify-between text-gray-700 border-b border-yellow-100 pb-1">
                  <span>{c.title}</span>
                  <span>{Number(c.amount).toLocaleString()} تومان</span>
                </div>
              ))}
              <div className="text-right font-bold text-red-600 border-t border-yellow-200 pt-2">
                جمع هزینه‌های ثابت: {totalFixedCosts.toLocaleString()} تومان
              </div>

              <motion.button
                onClick={() => setShowAddFixed(!showAddFixed)}
                whileHover={{ scale: 1.05 }}
                className="mt-3 w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full font-medium shadow flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" /> افزودن هزینه ثابت
              </motion.button>

              {showAddFixed && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    placeholder="عنوان (مثلاً اجاره)"
                    value={newFixed.title}
                    onChange={(e) => setNewFixed({ ...newFixed, title: e.target.value })}
                    className="p-2 border border-yellow-200 rounded-xl text-sm focus:ring-1 focus:ring-yellow-400"
                  />
                  <input
                    placeholder="مبلغ (تومان)"
                    type="number"
                    value={newFixed.amount}
                    onChange={(e) => setNewFixed({ ...newFixed, amount: e.target.value })}
                    className="p-2 border border-yellow-200 rounded-xl text-sm focus:ring-1 focus:ring-yellow-400"
                  />
                  <motion.button
                    onClick={addFixedCost}
                    whileHover={{ scale: 1.05 }}
                    className="sm:col-span-2 w-full py-2 bg-yellow-500 text-white rounded-full font-bold"
                  >
                    ذخیره
                  </motion.button>
                </div>
              )}  
            </div>
          </div>

          {/* 💎 دارایی‌ها (راهنما/سهم پیشنهاد‌شده از باقیمانده) */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-green-700 font-bold">💎 <span>سرمایه‌گذاری و دارایی‌ها (پیشنهاد ژنینو)</span></div>
            {totalIncome === 0 ? (
              <p className="text-sm text-gray-600">برای پیشنهاد دقیق، ابتدا درآمدها و هزینه‌های ثابت را وارد کنید.</p>
            ) : (
              <ul className="text-gray-700 text-sm leading-relaxed list-disc list-inside">
                <li>پیشنهاد: ۱۰٪ از مبلغ باقیمانده را به سرمایه‌گذاری/پس‌انداز اختصاص بده.</li>
                <li>مبلغ پیشنهادی: <b>{Math.round(remaining * 0.1).toLocaleString()}</b> تومان از <b>{remaining.toLocaleString()}</b></li>
              </ul>
            )}
          </div>

          {/* 🍎 متغیر */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-orange-200 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold">🍎 <span>هزینه‌های متغیر (پیشنهاد ژنینو)</span></div>
            {remaining > 0 ? (
              <ul className="text-gray-700 text-sm leading-relaxed list-disc list-inside">
                <li>خوراک و مواد غذایی: {Math.round(remaining * 0.3).toLocaleString()} تومان (۳۰٪)</li>
                <li>سلامت و بهداشت: {Math.round(remaining * 0.2).toLocaleString()} تومان (۲۰٪)</li>
                <li>سایر هزینه‌ها: {Math.round(remaining * 0.4).toLocaleString()} تومان (۴۰٪)</li>
              </ul>
            ) : (
              <p className="text-sm text-gray-600">ابتدا درآمد و هزینه‌های ثابت را تکمیل کن تا بودجه‌بندی متغیر نمایش داده شود.</p>
            )}
          </div>
        </div>
      </motion.div> {/* ←←← مهم: بستن motion.div اصلی */}

{/* 📊 عملکرد واقعی ماه */}
<section className="w-full max-w-5xl bg-white/90 border border-blue-200 rounded-3xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.2)] text-gray-800 mb-16">
  <h2 className="text-2xl font-bold text-blue-700 mb-4">
    📊 عملکرد واقعی {selectedMonth} {selectedYear}
  </h2>
  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
    در پایان ماه، مقادیر واقعی خود را وارد کنید تا ژنینو بتواند عملکرد شما را با پیشنهاد بهینه مقایسه کند 💡
  </p>

  {/* فرم ورود عملکرد */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
    <input
      type="number"
      placeholder="مبلغ سرمایه‌گذاری واقعی (تومان)"
      value={performance?.invest || ""}
      onChange={(e) =>
        setPerformance({ ...performance, invest: e.target.value })
      }
      className="p-2 border border-blue-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-400"
    />
    <input
      type="number"
      placeholder="هزینه خوراک واقعی (تومان)"
      value={performance?.food || ""}
      onChange={(e) =>
        setPerformance({ ...performance, food: e.target.value })
      }
      className="p-2 border border-blue-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-400"
    />
    <input
      type="number"
      placeholder="هزینه سلامت واقعی (تومان)"
      value={performance?.health || ""}
      onChange={(e) =>
        setPerformance({ ...performance, health: e.target.value })
      }
      className="p-2 border border-blue-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-400"
    />
    <input
      type="number"
      placeholder="سایر هزینه‌های واقعی (تومان)"
      value={performance?.other || ""}
      onChange={(e) =>
        setPerformance({ ...performance, other: e.target.value })
      }
      className="p-2 border border-blue-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-400"
    />
  </div>

  <motion.button
    onClick={() => {
      const key = `performance-${selectedYear}-${selectedMonth}`;
      localStorage.setItem(key, JSON.stringify(performance));
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    }}
    whileHover={{ scale: 1.05 }}
    className="mt-2 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full font-bold shadow"
  >
    ذخیره عملکرد واقعی ماه
  </motion.button>

  {showSaved && (
    <p className="mt-4 text-center text-green-600 font-medium">
      ✅ عملکرد {selectedMonth} {selectedYear} با موفقیت ذخیره شد.
    </p>
  )}
  {/* 🔍 تحلیل عملکرد ژنینو */}
<motion.button
  onClick={analyzePerformance}
  whileHover={{ scale: 1.05 }}
  className="mt-6 w-full py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full font-bold shadow"
>
  🔍 تحلیل عملکرد بر اساس پیشنهاد ژنینو
</motion.button>

{analysis && (
  <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-inner">
    <h3 className="text-lg font-bold text-green-700 mb-2">
      نتایج تحلیل {selectedMonth} {selectedYear}
    </h3>
    <p className="text-gray-700 mb-3">{analysis.summary}</p>

    <ul className="text-sm text-gray-700 space-y-1">
      <li>
        💎 سرمایه‌گذاری:{" "}
        {analysis.diffs.invest > 0
          ? `✅ ${Math.abs(Math.round(analysis.diffs.invest)).toLocaleString()} تومان بیشتر از پیشنهاد`
          : `⚠️ ${Math.abs(Math.round(analysis.diffs.invest)).toLocaleString()} تومان کمتر از پیشنهاد`}
      </li>
      <li>
        🍎 خوراک:{" "}
        {analysis.diffs.food < 0
          ? `✅ ${Math.abs(Math.round(analysis.diffs.food)).toLocaleString()} تومان کمتر از حد بهینه خرج شده`
          : `⚠️ ${Math.abs(Math.round(analysis.diffs.food)).toLocaleString()} تومان بیشتر خرج شده`}
      </li>
      <li>
        💊 سلامت:{" "}
        {analysis.diffs.health < 0
          ? `✅ ${Math.abs(Math.round(analysis.diffs.health)).toLocaleString()} تومان کمتر از حد بهینه`
          : `⚠️ ${Math.abs(Math.round(analysis.diffs.health)).toLocaleString()} تومان بیشتر`}
      </li>
      <li>
        🚗 سایر هزینه‌ها:{" "}
        {analysis.diffs.other < 0
          ? `✅ مدیریت مناسب`
          : `⚠️ ${Math.abs(Math.round(analysis.diffs.other)).toLocaleString()} تومان بیشتر از حد بهینه`}
      </li>
    </ul>
  </div>
)}
</section>

{/* 📊 نمودار عملکرد سالانه */}
<section className="w-full max-w-5xl bg-white/90 border border-purple-200 rounded-3xl p-6 mt-16 shadow-[0_0_25px_rgba(147,51,234,0.2)] text-gray-800">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold text-purple-700">📈 نمودار عملکرد مالی سال {selectedYear}</h2>
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={prepareYearlyChart}
      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-full font-bold shadow"
    >
      بروزرسانی نمودار
    </motion.button>
  </div>

  {yearlyData.length > 0 ? (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={yearlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toLocaleString()} تومان`} />
        <Legend />
        <Bar dataKey="پیشنهاد_ژنینو" fill="#A78BFA" radius={[8, 8, 0, 0]} />
        <Bar dataKey="سرمایه‌گذاری_واقعی" fill="#34D399" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <p className="text-gray-500 text-sm text-center mt-4">
      برای مشاهده نمودار، ابتدا داده‌های چند ماه را ثبت کنید و دکمه "بروزرسانی نمودار" را بزنید.
    </p>
  )}
</section>

      {/* 💎 دارایی‌ها (جدول + نمودار) */}
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

      {/* 🗑️ مودال تأیید حذف */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-[90%] text-center"
          >
            <p className="text-gray-700 mb-6 font-medium">آیا مطمئن هستید که می‌خواهید این دارایی را حذف کنید؟</p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmDelete} className="px-5 py-2 bg-red-500 text-white rounded-full font-bold">
                بله، حذف شود
              </button>
              <button onClick={() => setConfirmDeleteIndex(null)} className="px-5 py-2 bg-gray-200 rounded-full font-medium">
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
              <button onClick={saveEdit} className="px-5 py-2 bg-green-600 text-white rounded-full font-bold">
                ذخیره تغییرات
              </button>
              <button onClick={() => setEditingIndex(null)} className="px-5 py-2 bg-gray-200 rounded-full font-medium">
                انصراف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
