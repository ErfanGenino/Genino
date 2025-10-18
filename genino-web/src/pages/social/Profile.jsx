import React from "react";

export default function Profile() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffaf0] to-[#fff3d8] text-gray-800 flex flex-col items-center pt-28"
    >
      <h1 className="text-3xl font-extrabold text-yellow-700 mb-8">پروفایل من 👤</h1>
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-yellow-200 w-full max-w-lg text-right">
        <p className="text-gray-700 mb-3"><strong>نام:</strong> کاربر ژنینو</p>
        <p className="text-gray-700 mb-3"><strong>ایمیل:</strong> user@genino.com</p>
        <p className="text-gray-700 mb-3"><strong>سن:</strong> ۳۲ سال</p>
        <p className="text-gray-700 mb-3"><strong>شهر:</strong> تهران</p>
      </div>
    </main>
  );
}
