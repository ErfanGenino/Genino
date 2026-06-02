import React from "react";
import { motion } from "framer-motion";
import GoldenDivider from "@components/Core/GoldenDivider";
import HorizontalScrollGallery from "@components/Social/HorizontalScrollGallery";
import { useLocation, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getFavoriteArticles,
  saveFavoriteArticle,
  removeFavoriteArticle,
} from "../../services/api";
// import ReactMarkdown from "react-markdown"; // فعلاً خاموش

export default function ArticleTemplate({
  title,
  image,
  summary,
  sections = [],
  useMarkdown = false, // 🔄 سوئیچ بین حالت ساده و Markdown
  endingNote = "",     // 🟡 پیام پایانی اختیاری
  preImageNote = "",
  children, 
}) {
  // ✅ هوک‌ها باید داخل تابع باشند
  const location = useLocation();
  const [saved, setSaved] = useState(false);

const extractText = (node) => {
  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map(extractText).join(" ");
  }

  if (React.isValidElement(node)) {
    return extractText(node.props.children);
  }

  return "";
};

const articleData = {
  title: extractText(title),
  image,
  link: location.pathname,
  type: "article",
};

useEffect(() => {
  const checkSaved = async () => {
    const res = await getFavoriteArticles();

    if (!res?.ok) return;

    const exists = res.articles?.some(
      (item) => item.link === articleData.link
    );

    setSaved(exists);
  };

  checkSaved();
}, [location.pathname]);

const toggleFavorite = async () => {
  if (saved) {
    setSaved(false);

    const slug =
      articleData.link.split("/").filter(Boolean).pop();

    const res = await removeFavoriteArticle(slug);

    if (!res?.ok) {
      setSaved(true);
    }

    return;
  }

  setSaved(true);

  const slug =
    articleData.link.split("/").filter(Boolean).pop();

  const res = await saveFavoriteArticle({
    title: articleData.title,
    slug,
    image: articleData.image,
    link: articleData.link,
    category: "world-knowledge",
  });

  if (!res?.ok) {
    setSaved(false);
  }
};

  // تشخیص مسیر و تعیین متن/مسیر دکمه بازگشت
  let backText = "← بازگشت به خانه";
  let backLink = "/";

  if (location.pathname.includes("freeplay")) {
    backText = "← بازگشت به مسیر رشد والد آگاه";
    backLink = "/";
  } else if (location.pathname.includes("parents-behavior")) {
    backText = "← بازگشت به رفتار والدین با کودکان";
    backLink = "/knowledge/parents-behavior";
  } else if (location.pathname.includes("nutrition")) {
    backText = "← بازگشت به دانستنی‌های تغذیه کودک";
    backLink = "/knowledge/nutrition";
  } else if (location.pathname.includes("family-relations")) {
    backText = "← بازگشت به روابط خانوادگی";
    backLink = "/knowledge/family-relations";
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffdf5] to-[#fff8e1] text-gray-800 px-5 pt-24 pb-16 flex flex-col items-center"
    >
      {/* 🏷️ عنوان مقاله */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-6 text-center"
      >
        {title}
      </motion.h1>
      <motion.button
  whileTap={{ scale: 0.9 }}
  onClick={toggleFavorite}
  className={`mb-6 flex items-center gap-2 rounded-2xl px-5 py-3 shadow-sm transition-all ${
    saved
      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
      : "bg-white border border-pink-200 text-pink-600"
  }`}
>
  <Heart
    size={20}
    className={saved ? "fill-white" : ""}
  />

  <span className="text-sm font-semibold">
    {saved ? "ذخیره شده در علاقه‌مندی‌ها" : "ذخیره در علاقه‌مندی‌ها"}
  </span>
</motion.button>

      {/* 🟡 متن سفارشی قبل از عکس (اختیاری) */}
{preImageNote && (
  <motion.p
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-xl font-semibold text-yellow-700 mb-4 max-w-3xl text-center"
  >
    {preImageNote}
  </motion.p>
)}


      {/* 🖼️ عکس اصلی */}
      <motion.img
        src={image}
        alt={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl rounded-3xl shadow-md mb-6 border border-yellow-200"
      />

      {/* ✍️ خلاصه مقاله */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl text-gray-700 leading-relaxed text-justify mb-10"
      >
        {summary}
      </motion.p>

      {/* 🔥 محتوای children (برای مقالات جدید) */}
{React.Children.count(children) > 0 && (
  <div className="w-full max-w-3xl my-10 text-gray-700 leading-relaxed text-justify">
    {children}
  </div>
)}

      <GoldenDivider />

      {/* 🧩 بخش‌های مقاله */}
      {sections.map((section, i) => (
        <motion.section
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="w-full max-w-4xl text-right mb-12"
        >
          {/* عنوان بخش */}
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">
            {section.heading}
          </h2>

          {/* گالری افقی */}
          {section.folder && (
            <div className="mb-6">
              <HorizontalScrollGallery folder={section.folder} />
            </div>
          )}

          {/* متن بخش - دو حالت: ساده یا Markdown */}
          {useMarkdown ? (
            <div className="prose prose-yellow max-w-none text-gray-800 leading-relaxed">
              {/* <ReactMarkdown>{section.content.replace(/\\n/g, "\n")}</ReactMarkdown> */}
              ⚠️ Markdown فعلاً غیرفعال است (برای فعال‌سازی، import را باز و این خط را با ReactMarkdown جایگزین کن)
            </div>
          ) : (
            <div className="text-gray-700 whitespace-pre-line leading-relaxed text-justify">
              {section.content}
            </div>
          )}

          {i !== sections.length - 1 && <GoldenDivider />}
        </motion.section>
      ))}

      {/* 💛 کادر طلایی پایانی ژنینو (اختیاری) */}
      {endingNote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full max-w-3xl bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-3xl shadow-lg text-center p-6"
        >
          <p className="text-lg font-semibold text-yellow-800 leading-relaxed whitespace-pre-line">
            {endingNote}
          </p>
        </motion.div>
      )}

      {/* 🔙 دکمه بازگشت داینامیک */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12"
      >
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-xl shadow-md text-sm font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
        >
          {backText}
        </Link>
      </motion.div>
    </main>
  );
}
