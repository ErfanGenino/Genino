// ✅ src/pages/Inspiration.jsx (فول‌استک + سبک + کاربرپسند)
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Bookmark,
  Share2,
  Flame,
  RefreshCcw,
  CalendarDays,
  ListChecks,
  Timer,
  FolderHeart,
  Pause,
  Play,
  RotateCcw,
  WifiOff,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getInspirationToday,
  getInspirationWeek,
  setInspirationComplete,
  setInspirationSave,
  setInspirationNote,
  getInspirationHistory,
  getInspirationSaved,
} from "../services/api";

// --- helpers (UI only) ---
function formatPersianDate(date = new Date()) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return "";
  }
}
function pad2(n) {
  return String(n).padStart(2, "0");
}
function formatMMSS(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

function ModalShell({ open, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/30"
        aria-label="close"
      />

      {/* dialog */}
      <div className="relative w-full h-full flex items-end sm:items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-3xl rounded-2xl border border-yellow-200 bg-white shadow-xl overflow-hidden">
          {/* header */}
          <div className="px-5 py-4 border-b border-yellow-100 bg-gradient-to-b from-yellow-50 to-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl border border-yellow-200 bg-white hover:bg-yellow-50 transition text-sm font-semibold text-gray-700"
              >
                بستن
              </button>
            </div>
          </div>

          {/* content */}
          <div className="p-5 max-h-[70vh] overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Inspiration() {
  const persianDate = useMemo(() => formatPersianDate(new Date()), []);

  // ✅ مودها (UI labels)
  const MODES = useMemo(
    () => [
      { id: "calm", label: "آرامش", tags: ["آرامش", "تنفس", "ذهن‌آگاهی"] },
      { id: "focus", label: "تمرکز", tags: ["تمرکز", "کار عمیق", "مرزبندی"] },
      { id: "energy", label: "انرژی", tags: ["انرژی", "بدن", "حرکت"] },
      { id: "relation", label: "رابطه", tags: ["رابطه", "قدردانی", "ارتباط"] },
      { id: "discipline", label: "نظم", tags: ["نظم", "عادت", "پایداری"] },
    ],
    []
  );

  const [modeId, setModeId] = useState(MODES[0].id);

  // ✅ داده‌های سرور
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [dateKey, setDateKey] = useState("");
  const [item, setItem] = useState(null); // inspiration item from DB
  const [action, setAction] = useState({ completed: false, saved: false, note: "" });
  const [week, setWeek] = useState([]); // 7 days
    // ✅ Modals
  const [openHistory, setOpenHistory] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const [historyLoading, setHistoryLoading] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);

  const [historyItems, setHistoryItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const [historyErr, setHistoryErr] = useState("");
  const [savedErr, setSavedErr] = useState("");

  // ✅ Timer (local UI)
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [running, setRunning] = useState(false);

  // ✅ note debounce
  const noteTimerRef = useRef(null);

  const modeMeta = useMemo(
    () => MODES.find((m) => m.id === modeId) || MODES[0],
    [MODES, modeId]
  );

  async function loadData(currentMode) {
    setLoading(true);
    setErrMsg("");

    const [t, w] = await Promise.all([
      getInspirationToday(currentMode),
      getInspirationWeek(currentMode),
    ]);

    if (!t?.ok) {
      setLoading(false);
      setErrMsg(t?.message || "خطا در دریافت الهام امروز");
      return;
    }

    // week ممکنه ok باشد یا نباشد؛ اگر نشد، فقط خالی نگه می‌داریم
    setDateKey(t.dateKey);
    setItem(t.item);
    setAction({
      completed: !!t.action?.completed,
      saved: !!t.action?.saved,
      note: t.action?.note || "",
    });

    // timer reset per item
    setRunning(false);
    setSecondsLeft(Number(t.item?.durationSec || 180));

    setWeek(w?.ok ? w.days || [] : []);
    setLoading(false);
  }

  // ✅ initial + mode change
  useEffect(() => {
    loadData(modeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeId]);

  // ✅ timer tick
  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [running, secondsLeft]);

  const onResetTimer = () => {
    setRunning(false);
    setSecondsLeft(Number(item?.durationSec || 180));
  };

  const onShare = async () => {
    if (!item?.quote) return;
    const text = `✨ ${item.quote}\n— ${item.author || "Genino"} (Genino)`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        alert("📋 متن برای اشتراک کپی شد.");
      }
    } catch {}
  };

  const onToggleComplete = async () => {
    // optimistic UI
    const next = !action.completed;
    setAction((a) => ({ ...a, completed: next }));

    const res = await setInspirationComplete({ mode: modeId, dateKey, completed: next });
    if (!res?.ok) {
      // rollback
      setAction((a) => ({ ...a, completed: !next }));
      alert(res?.message || "خطا در ثبت انجام شدن");
      return;
    }

    // refresh week quickly (optional)
    const w = await getInspirationWeek(modeId);
    setWeek(w?.ok ? w.days || [] : week);
  };

  const onToggleSave = async () => {
    const next = !action.saved;
    setAction((a) => ({ ...a, saved: next }));

    const res = await setInspirationSave({ mode: modeId, dateKey, saved: next });
    if (!res?.ok) {
      setAction((a) => ({ ...a, saved: !next }));
      alert(res?.message || "خطا در ذخیره");
      return;
    }
  };

  const onChangeNote = (v) => {
    setAction((a) => ({ ...a, note: v }));

    // debounce 600ms
    if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
    noteTimerRef.current = setTimeout(async () => {
      const res = await setInspirationNote({ mode: modeId, dateKey, note: v });
      if (!res?.ok) {
        // پیام سبک، بدون اذیت
        console.warn("note save failed:", res?.message);
      }
    }, 600);
  };

    const openHistoryModal = async () => {
    setOpenHistory(true);
    setHistoryErr("");
    setHistoryLoading(true);

    const res = await getInspirationHistory(modeId, 60);
    if (!res?.ok) {
      setHistoryErr(res?.message || "خطا در دریافت آرشیو");
      setHistoryItems([]);
      setHistoryLoading(false);
      return;
    }

    setHistoryItems(res.items || []);
    setHistoryLoading(false);
  };

  const openSavedModal = async () => {
    setOpenSaved(true);
    setSavedErr("");
    setSavedLoading(true);

    const res = await getInspirationSaved(modeId, 200);
    if (!res?.ok) {
      setSavedErr(res?.message || "خطا در دریافت ذخیره‌ها");
      setSavedItems([]);
      setSavedLoading(false);
      return;
    }

    setSavedItems(res.items || []);
    setSavedLoading(false);
  };





  return (
    <div className="min-h-screen bg-white">
      {/* 🌤 Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-yellow-200/25 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                الهام روزانه <span className="text-yellow-600">✨</span>
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                یک جمله، یک تمرین کوتاه، یک قدم رشد.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {persianDate ? (
                  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50 text-yellow-800">
                    <CalendarDays size={14} />
                    {persianDate}
                  </span>
                ) : null}

                {modeMeta.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border border-yellow-200 bg-white text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => loadData(modeId)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 transition text-sm text-yellow-800"
                title="دریافت دوباره از سرور"
              >
                <RefreshCcw size={16} />
                تازه‌سازی
              </button>
            </div>
          </div>

          {/* ✅ Mode Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {MODES.map((m) => {
              const active = m.id === modeId;
              return (
                <button
                  key={m.id}
                  onClick={() => setModeId(m.id)}
                  className={`px-4 py-2 rounded-2xl border text-sm font-semibold transition ${
                    active
                      ? "border-yellow-300 bg-yellow-200 text-yellow-900 shadow-[0_0_14px_rgba(255,220,120,0.35)]"
                      : "border-yellow-200 bg-white text-gray-700 hover:bg-yellow-50"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ✅ Loading / Error */}
        {loading ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-gray-700">
            در حال دریافت الهام امروز…
          </div>
        ) : errMsg ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 flex items-center gap-2">
            <WifiOff size={18} />
            {errMsg}
          </div>
        ) : null}

        {!loading && !errMsg && item ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* 💛 Quote */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.45 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-100 to-yellow-50 p-6 shadow-[0_0_22px_rgba(255,220,120,0.22)]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-white/70 border border-yellow-200">
                    <Sparkles className="text-yellow-600" size={18} />
                  </div>
                  <span className="text-sm text-yellow-700 font-semibold">
                    جمله امروز
                  </span>
                </div>

                <p className="mt-5 text-xl sm:text-2xl leading-relaxed font-extrabold text-gray-900">
                  “{item.quote}”
                </p>

                <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-sm text-gray-600">
                    —{" "}
                    <span className="font-semibold text-gray-800">
                      {item.author || "Genino"}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onToggleSave}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition text-sm ${
                        action.saved
                          ? "border-yellow-300 bg-yellow-100 text-yellow-900"
                          : "border-yellow-200 bg-white/70 hover:bg-white text-gray-700"
                      }`}
                    >
                      <Bookmark size={16} className="text-yellow-600" />
                      {action.saved ? "ذخیره شد" : "ذخیره"}
                    </button>

                    <button
                      onClick={onShare}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-200 bg-white/70 hover:bg-white transition text-sm text-gray-700"
                    >
                      <Share2 size={16} className="text-yellow-600" />
                      اشتراک
                    </button>

                    <button
                      onClick={onToggleComplete}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition text-sm font-semibold shadow-[0_0_16px_rgba(255,200,70,0.35)] ${
                        action.completed
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      <CheckCircle2 size={18} />
                      {action.completed ? "انجام شد ✅" : "انجام دادم"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 🔥 Streak (محاسبه از week) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
            >
              <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-yellow-50 border border-yellow-200">
                    <Flame className="text-yellow-600" size={18} />
                  </div>
                  <span className="text-sm text-yellow-700 font-semibold">
                    استمرار مود «{modeMeta.label}»
                  </span>
                </div>

                {(() => {
                  // streak از امروز به عقب (از week)
                  let s = 0;
                  for (let i = 0; i < week.length; i++) {
                    if (week[i].completed) s++;
                    else break;
                  }
                  return (
                    <div className="mt-5">
                      <div className="text-3xl font-extrabold text-gray-900">{s}</div>
                      <div className="text-sm text-gray-600 mt-1">روزهای پیوسته</div>

                      <div className="mt-4 h-2 rounded-full bg-yellow-100 overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${Math.min(100, s * 12)}%` }}
                        />
                      </div>

                      <div className="mt-5 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          این بخش از دیتابیس می‌آید و واقعی است.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>

            {/* 🧠 Exercise + Timer */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-sm text-yellow-700 font-semibold">
                    {item.exerciseTitle}
                  </span>

                  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold">
                    <Timer size={14} />
                    {formatMMSS(secondsLeft)}
                  </span>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {item.exerciseText}
                </p>

                <div className="mt-5 flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setRunning((r) => !r)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition text-sm font-semibold text-white"
                  >
                    {running ? <Pause size={18} /> : <Play size={18} />}
                    {running ? "توقف" : secondsLeft <= 0 ? "تمام شد" : "شروع تایمر"}
                  </button>

                  <button
                    onClick={onResetTimer}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-200 bg-white hover:bg-yellow-50 transition text-sm font-semibold text-gray-700"
                  >
                    <RotateCcw size={18} className="text-yellow-600" />
                    ریست
                  </button>
                </div>

                <div className="mt-5 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
                  <p className="text-sm text-gray-700">
                    نکته ژنینویی: کوتاه و مداوم = اثر عمیق. همین ۳ دقیقه‌ها آینده را می‌سازند.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 🌿 Reflection + Week */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
                <span className="text-sm text-yellow-700 font-semibold">
                  سؤال تأملی
                </span>

                <p className="mt-4 text-sm sm:text-base font-semibold text-gray-900 leading-relaxed">
                  {item.reflectionQuestion}
                </p>

                {item.reflectionHint ? (
                  <p className="mt-2 text-xs text-gray-500">{item.reflectionHint}</p>
                ) : null}

                <textarea
                  rows={4}
                  value={action.note || ""}
                  onChange={(e) => onChangeNote(e.target.value)}
                  className="mt-4 w-full rounded-xl border border-yellow-200 bg-yellow-50/40 p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
                  placeholder="اینجا بنویس… (روی سرور ذخیره می‌شود)"
                />

                <div className="mt-5 pt-5 border-t border-yellow-100">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">۷ روز اخیر (مود فعلی)</p>
                    <span className="text-xs text-gray-400">{modeId}</span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    {week.map((x) => (
                      <div
                        key={x.dateKey}
                        className="flex items-center justify-between text-sm rounded-xl border border-yellow-100 bg-yellow-50/50 px-3 py-2"
                      >
                        <span className="text-gray-700">{x.dayLabel}</span>
                        <span className="text-gray-500 text-xs">{x.dateKey}</span>
                        <span className={x.completed ? "text-green-600" : "text-gray-400"}>
                          {x.completed ? "✅" : "—"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <button
                      onClick={openHistoryModal}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-200 bg-white hover:bg-yellow-50 transition text-sm text-gray-700"
                    >
                      <ListChecks size={16} className="text-yellow-600" />
                      آرشیو کامل
                    </button>
                    <button
                      onClick={openSavedModal}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-200 bg-white hover:bg-yellow-50 transition text-sm text-gray-700"
                    >
                      <FolderHeart size={16} className="text-yellow-600" />
                      ذخیره‌ها
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-10 text-center text-gray-500 text-sm italic"
        >
          ✨ هر روز، یک قدم کوچک؛ یک تغییر بزرگ.
        </motion.div>
      </div>

            {/* ✅ Modal: History */}
      <ModalShell
        open={openHistory}
        onClose={() => setOpenHistory(false)}
        title="آرشیو کامل"
        subtitle={`مود: ${modeMeta.label} — آخرین ثبت‌ها`}
      >
        {historyLoading ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-gray-700">
            در حال دریافت آرشیو…
          </div>
        ) : historyErr ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {historyErr}
          </div>
        ) : !historyItems.length ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-gray-700">
            هنوز چیزی در آرشیو نداریم. چند روز استفاده کن تا اینجا پر بشه 💛
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {historyItems.map((x, idx) => (
              <div
                key={`${x.dateKey}-${x.updatedAt || idx}`}
                className="rounded-2xl border border-yellow-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {x.dateKey}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`px-2 py-1 rounded-full border ${
                        x.completed
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    >
                      {x.completed ? "✅ انجام شد" : "— انجام نشده"}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-full border ${
                        x.saved
                          ? "border-yellow-300 bg-yellow-100 text-yellow-800"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    >
                      {x.saved ? "💛 ذخیره‌شده" : "— ذخیره نشده"}
                    </span>
                  </div>
                </div>

                {x.note ? (
                  <div className="mt-3 rounded-xl border border-yellow-100 bg-yellow-50/60 p-3 text-sm text-gray-700 whitespace-pre-wrap">
                    {x.note}
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-gray-400">
                    یادداشت ندارد
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ModalShell>

      {/* ✅ Modal: Saved */}
      <ModalShell
        open={openSaved}
        onClose={() => setOpenSaved(false)}
        title="ذخیره‌های من"
        subtitle={`مود: ${modeMeta.label} — مواردی که ذخیره کردی`}
      >
        {savedLoading ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-gray-700">
            در حال دریافت ذخیره‌ها…
          </div>
        ) : savedErr ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {savedErr}
          </div>
        ) : !savedItems.length ? (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-gray-700">
            هنوز چیزی ذخیره نکردی. روی «ذخیره» کنار جمله امروز بزن 💛
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {savedItems.map((x, idx) => (
              <div
                key={`${x.dateKey}-${x.item?.id || idx}`}
                className="rounded-2xl border border-yellow-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {x.dateKey}
                  </div>
                  <span className="text-xs text-gray-500">
                    {x.item?.author || "Genino"}
                  </span>
                </div>

                <p className="mt-3 text-base sm:text-lg font-extrabold text-gray-900 leading-relaxed">
                  “{x.item?.quote}”
                </p>

                <div className="mt-3 rounded-xl border border-yellow-100 bg-yellow-50/60 p-3">
                  <div className="text-xs text-gray-500 mb-1">تمرین</div>
                  <div className="text-sm text-gray-800">
                    {x.item?.exerciseTitle}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {x.item?.exerciseText}
                  </div>
                </div>

                {x.action?.note ? (
                  <div className="mt-3 text-xs text-gray-700 whitespace-pre-wrap">
                    📝 {x.action.note}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </ModalShell>
    </div>
  );
}