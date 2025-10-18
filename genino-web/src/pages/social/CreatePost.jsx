import React, { useState } from "react";

export default function CreatePost() {
  const [text, setText] = useState("");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffaf0] to-[#fff3d8] text-gray-800 flex flex-col items-center pt-28"
    >
      <h1 className="text-3xl font-extrabold text-yellow-700 mb-8">ایجاد پست جدید ✨</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="چی تو ذهنت هست؟"
        className="w-full max-w-xl border border-yellow-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
        rows={4}
      />
      <button
        className="mt-5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
      >
        ارسال پست
      </button>
    </main>
  );
}
