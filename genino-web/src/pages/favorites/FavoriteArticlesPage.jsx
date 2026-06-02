import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  getFavoriteArticles,
  removeFavoriteArticle,
} from "../../services/api";

export default function FavoriteArticlesPage() {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  useEffect(() => {
  const loadFavoriteArticles = async () => {
    const res = await getFavoriteArticles();

    if (res?.ok) {
      setFavoriteArticles(res.articles || []);
    }
  };

  loadFavoriteArticles();
}, []);

  const removeArticle = async (article) => {
  const slug = article.slug || article.link.split("/").filter(Boolean).pop();

  const updated = favoriteArticles.filter(
    (item) => item.link !== article.link
  );

  setFavoriteArticles(updated);

  const res = await removeFavoriteArticle(slug);

  if (!res?.ok) {
    setFavoriteArticles(favoriteArticles);
  }
};

  return (
    <div dir="rtl" className="min-h-screen bg-[#fffdf7] pt-24 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/favorites"
          className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowRight size={18} />
          بازگشت به علاقه‌مندی‌ها
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-100 p-7 shadow-sm mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <BookOpen size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-black text-gray-800">
                مقالات مورد علاقه
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                مدیریت مقاله‌هایی که ذخیره کرده‌ای.
              </p>
            </div>
          </div>

          <div className="mt-5 text-sm font-bold text-orange-700">
            تعداد مقالات ذخیره‌شده: {favoriteArticles.length}
          </div>
        </motion.div>

        {favoriteArticles.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-orange-200 bg-orange-50/50 p-10 text-center">
            <p className="font-bold text-gray-700">
              هنوز مقاله‌ای ذخیره نکرده‌ای.
            </p>

            <Link
              to="/world-knowledge"
              className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 px-5 py-3 text-sm font-bold text-white shadow-sm"
            >
              ورود به مجله ژنینو
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoriteArticles.map((article) => (
              <motion.div
                key={article.link}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-[1.7rem] border border-orange-100 bg-white shadow-sm flex flex-col h-full"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4 flex flex-col flex-1">
                  <Link
                    to={article.link}
                    className="block min-h-[48px] text-base font-black leading-6 text-gray-800 line-clamp-2 hover:text-orange-600"
                  >
                    {article.title}
                  </Link>

                  <div className="mt-auto pt-5 flex gap-2">
                    <Link
                      to={article.link}
                      className="flex-1 rounded-xl bg-orange-50 px-4 py-2 text-center text-sm font-bold text-orange-600 hover:bg-orange-100"
                    >
                      مشاهده مقاله
                    </Link>

                    <button
                      onClick={() => removeArticle(article)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}