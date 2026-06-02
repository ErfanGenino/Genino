import { Heart, ShoppingBag, Briefcase, BookOpen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getFavoriteArticles,
  removeFavoriteArticle,
} from "../../services/api";

export default function FavoritesPage() {

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

  const previousArticles = favoriteArticles;

  const updated = favoriteArticles.filter(
    (item) => item.link !== article.link
  );

  setFavoriteArticles(updated);

  const res = await removeFavoriteArticle(slug);

  if (!res?.ok) {
    setFavoriteArticles(previousArticles);
  }
};


  return (
    <div className="min-h-screen bg-[#fffdf7] pt-24 pb-32 px-4">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-amber-100 p-8 shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
        >
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-yellow-200/30 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg">
              <Heart size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-black text-gray-800">
                علاقه‌مندی‌های من
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                کالاها، خدمات و مقالاتی که دوست داری اینجا ذخیره می‌شوند.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

        {/* Products */}
        <motion.div
          whileHover={{ y: -6 }}
          className="group h-[420px] rounded-[2rem] border border-yellow-100 bg-gradient-to-br from-yellow-50 via-white to-yellow-200 p-6 shadow-sm transition-all flex flex-col"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">
            <ShoppingBag size={30} />
          </div>

          <div className="mb-2 flex items-center justify-between gap-3">
  <Link to="/favorites/products">
    <h2 className="text-xl font-black text-gray-800 hover:text-yellow-600 transition">
      کالاهای مورد علاقه
    </h2>
  </Link>

  <Link
    to="/favorites/products"
    className="rounded-xl bg-white/80 px-3 py-1 text-xs font-bold text-yellow-700 shadow-sm border border-yellow-200 hover:bg-yellow-100 transition"
  >
    مشاهده
  </Link>
</div>

          <p className="min-h-[56px] text-sm leading-7 text-gray-600">
            محصولات محبوبت را ذخیره کن تا بعداً سریع‌تر پیدایشان کنی.
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-yellow-200 bg-yellow-50/40 py-10 text-center text-sm text-gray-500">
            هنوز کالایی اضافه نشده
          </div>
          <Link
  to="/shop"
  className="mt-4 flex items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg"
>
  ورود به فروشگاه کالا
</Link>
        </motion.div>

        {/* Services */}
        <motion.div
          whileHover={{ y: -6 }}
          className="group h-[420px] rounded-[2rem] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-pink-100 p-6 shadow-sm transition-all flex flex-col"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <Briefcase size={30} />
          </div>

          <div className="mb-2 flex items-center justify-between gap-3">
  <Link to="/favorites/services">
    <h2 className="text-xl font-black text-gray-800 hover:text-rose-600 transition">
      خدمات مورد علاقه
    </h2>
  </Link>

  <Link
    to="/favorites/services"
    className="rounded-xl bg-white/80 px-3 py-1 text-xs font-bold text-rose-700 shadow-sm border border-rose-200 hover:bg-rose-100 transition"
  >
    مشاهده
  </Link>
</div>

          <p className="min-h-[56px] text-sm leading-7 text-gray-600">
            پزشکان، خدمات و سرویس‌هایی که دوست داری اینجا قرار می‌گیرند.
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-amber-200 bg-amber-50/40 py-10 text-center text-sm text-gray-500">
            هنوز سرویسی اضافه نشده
          </div>
          <Link
  to="/shop"
  className="mt-4 flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg"
>
  ورود به فروشگاه خدمات
</Link>
        </motion.div>

        {/* Articles */}
        <motion.div
          whileHover={{ y: -6 }}
          className="group h-[420px] rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-orange-100 p-6 shadow-sm transition-all flex flex-col"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <BookOpen size={30} />
          </div>

          <div className="mb-2 flex items-center justify-between gap-3">
  <Link to="/favorites/articles">
    <h2 className="text-xl font-black text-gray-800 hover:text-orange-600 transition">
      مقالات مورد علاقه
    </h2>
  </Link>

  <Link
    to="/favorites/articles"
    className="rounded-xl bg-white/80 px-3 py-1 text-xs font-bold text-orange-700 shadow-sm border border-orange-200 hover:bg-orange-100 transition"
  >
    مشاهده
  </Link>
</div>

          <p className="min-h-[56px] text-sm leading-7 text-gray-600">
            مقاله‌هایی که ذخیره می‌کنی تا بعداً دوباره بخوانی.
          </p>

          <div className="mt-8 flex-1 overflow-y-auto space-y-3 pr-1">
  {favoriteArticles.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 py-10 text-center text-sm text-gray-500">
      هنوز مقاله‌ای اضافه نشده
    </div>
  ) : (
    favoriteArticles.map((article) => (
      <div
        key={article.link}
        className="rounded-2xl bg-white/80 border border-orange-100 p-3 shadow-sm"
      >
        <div className="flex items-center gap-3">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="h-14 w-14 rounded-xl object-cover border border-orange-100"
            />
          )}

          <div className="flex-1 min-w-0 text-right">
            <Link
              to={article.link}
              className="block text-sm font-bold text-gray-800 line-clamp-2 hover:text-orange-600"
            >
              {article.title}
            </Link>

            <p className="mt-1 text-xs text-gray-500">
              مقاله ذخیره‌شده
            </p>
          </div>

          <button
            onClick={() => removeArticle(article)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
            title="حذف از علاقه‌مندی‌ها"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    ))
  )}
</div>

<Link
  to="/world-knowledge"
  className="mt-4 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg"
>
  ورود به مجله ژنینو
</Link>
        </motion.div>

      </div>
    </div>
  );
}