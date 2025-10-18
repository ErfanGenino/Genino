import React, { useState } from "react";
import { motion } from "framer-motion";
import { questions_6_8 } from "../data/questions";
import { calculateScores } from "../utils/calcScores";
import { useNavigate } from "react-router-dom";

export default function ChildAssessment() {
  const [answers, setAnswers] = useState([]);       // ذخیره پاسخ‌ها
  const [result, setResult] = useState(null);       // ذخیره نتیجه
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();                   // ✅ برای انتقال به صفحه کودک من

  // 📋 ثبت پاسخ هر سؤال
  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => {
      const otherAnswers = prev.filter((a) => a.id !== questionId);
      return [...otherAnswers, { id: questionId, option: optionIndex }];
    });
  };

  // ✅ محاسبه امتیازها و انتقال خودکار
  const handleSubmit = () => {
    const scores = calculateScores(answers, questions_6_8);
    setResult(scores);
    setSubmitted(true);
    localStorage.setItem("childAssessmentResult", JSON.stringify(scores));

    // ⏳ پیام موفقیت و انتقال خودکار به صفحه کودک من
    setTimeout(() => {
      navigate("/my-child");
    }, 2000);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffaf0] to-[#fff3d8] flex flex-col items-center py-16 px-6 text-gray-800 relative overflow-hidden"
    >
      {/* 🌿 بک‌گراند DNA ثابت طلایی */}
      <div className="absolute inset-0 opacity-30 z-0">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
          >
            <defs>
              <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2b744" />
                <stop offset="100%" stopColor="#c69a2c" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#grad-${i})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#grad-${i})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      {/* 🧠 عنوان صفحه */}
      <h1 className="text-3xl font-extrabold text-yellow-700 mb-10 relative z-10">
        ارزیابی رشد کودک (۶ تا ۸ سال)
      </h1>

      {/* 📋 فرم سؤالات */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 relative z-10 border border-yellow-200">
        {questions_6_8.map((q) => (
          <div key={q.id} className="mb-6 text-right">
            <h2 className="font-semibold text-lg text-yellow-800 mb-3">{q.text}</h2>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition-all ${
                    answers.find((a) => a.id === q.id && a.option === idx)
                      ? "bg-yellow-100 border-yellow-400"
                      : "bg-white border-gray-200 hover:bg-yellow-50"
                  }`}
                  onClick={() => handleAnswer(q.id, idx)}
                >
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* دکمه ارسال */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleSubmit}
            className="bg-yellow-500 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-yellow-600 transition-all"
          >
            ثبت پاسخ‌ها ✨
          </motion.button>
        </div>

        {/* ✅ پیام موفقیت */}
        {submitted && (
          <p className="text-green-600 text-center mt-4 font-medium">
            ✅ پاسخ‌ها با موفقیت ثبت شد! در حال انتقال به صفحه کودک من...
          </p>
        )}
      </div>
    </main>
  );
}
