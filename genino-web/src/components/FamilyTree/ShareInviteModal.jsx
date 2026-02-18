// src/components/FamilyTree/ShareInviteModal.jsx
import { useState } from "react";

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function ShareInviteModal({ open, data, onClose }) {
  const [copyMsg, setCopyMsg] = useState("");

  if (!open) return null;

  const link = data?.link || "";
  const message = data?.message || "";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[350]">
      <div className="bg-white rounded-2xl p-5 w-full max-w-md mx-4 shadow-xl">
        <h3 className="text-base font-extrabold text-gray-800 text-center">
          ✅ لینک دعوت آماده است
        </h3>

        {/* لینک */}
        <div className="mt-4 text-sm bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="text-xs text-gray-700 break-all bg-white/70 border border-green-100 rounded-lg px-2 py-2">
            {link}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={async () => {
                const ok = await copyToClipboard(link);
                setCopyMsg(ok ? "✅ لینک کپی شد" : "❌ کپی نشد");
                if (ok) setTimeout(() => setCopyMsg(""), 1200);
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              کپی لینک
            </button>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-3 py-2 rounded-xl border border-green-300 text-green-800 hover:bg-green-50 transition font-semibold"
            >
              باز کردن
            </a>
          </div>
        </div>

        {/* متن آماده */}
        {message ? (
          <div className="mt-4 text-sm bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="text-xs text-gray-800 whitespace-pre-wrap break-words overflow-hidden bg-white/70 border border-blue-100 rounded-lg px-2 py-2">
              {message}
            </div>

            <button
              type="button"
              onClick={async () => {
                const ok = await copyToClipboard(message);
                setCopyMsg(ok ? "✅ متن کپی شد" : "❌ کپی نشد");
                if (ok) setTimeout(() => setCopyMsg(""), 1200);
              }}
              className="mt-3 w-full px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              کپی متن کامل
            </button>
          </div>
        ) : null}

        {copyMsg ? <div className="mt-3 text-xs text-gray-700">{copyMsg}</div> : null}

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              setCopyMsg("");
              onClose?.();
            }}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
