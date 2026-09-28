// D:\projects\Genino\genino-web\src\pages\favorites\FavoriteProductsPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  getFavoriteProducts,
  updateGiftVisibility,
} from "../../services/api";

import {
  useFavoriteProducts,
} from "../../context/FavoriteProductsContext";

import logo from "../../assets/logo-genino.png";
import {
  getActiveDiscount,
  formatPrice,
} from "../../utils/productDiscount";
import DiscountCountdown from "../../components/Core/DiscountCountdown";


export default function FavoriteProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [giftUpdating, setGiftUpdating] = useState({});

  const {
    isFavorite,
    toggleFavorite,
    isPending,
  } = useFavoriteProducts();

  useEffect(() => {
    let isMounted = true;

    async function loadFavoriteProducts() {
      setLoading(true);

      try {
        const res = await getFavoriteProducts();

        if (!isMounted) return;

        if (res?.ok) {
          const fixedProducts = (res.products || []).map(
            (product) => ({
              ...product,

              categoryLinks:
                typeof product.categoryLinks === "string"
                  ? JSON.parse(product.categoryLinks)
                  : Array.isArray(product.categoryLinks)
                  ? product.categoryLinks
                  : [],

              images:
                typeof product.images === "string"
                  ? JSON.parse(product.images)
                  : Array.isArray(product.images)
                  ? product.images
                  : [],
            })
          );

          setProducts(fixedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(
          "LOAD FAVORITE PRODUCTS ERROR:",
          error
        );

        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFavoriteProducts();

    const handleFavoriteChange = () => {
      loadFavoriteProducts();
    };

    window.addEventListener(
      "genino_favorite_products_changed",
      handleFavoriteChange
    );

    return () => {
      isMounted = false;

      window.removeEventListener(
        "genino_favorite_products_changed",
        handleFavoriteChange
      );
    };
  }, []);

  async function handleGiftVisibility(item) {
  const nextValue = !item.showInGiftGame;

  setGiftUpdating((prev) => ({
    ...prev,
    [item.id]: true,
  }));

  try {
    const res = await updateGiftVisibility(
      item.id,
      nextValue
    );

    if (res?.ok) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === item.id
            ? {
                ...product,
                showInGiftGame:
                  res.showInGiftGame,
              }
            : product
        )
      );
    }
  } catch (error) {
    console.error(
      "UPDATE GIFT VISIBILITY ERROR:",
      error
    );
  } finally {
    setGiftUpdating((prev) => ({
      ...prev,
      [item.id]: false,
    }));
  }
}


  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffdf7] px-4 pb-32 pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <Link
          to="/favorites"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-yellow-600 transition hover:text-yellow-700"
        >
          <ArrowRight size={18} />
          بازگشت به علاقه‌مندی‌ها
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-7 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">
              <ShoppingBag size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-black text-gray-800">
                کالاهای مورد علاقه
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                مدیریت کالاهایی که ذخیره کرده‌ای.
              </p>
            </div>
          </div>

          <div className="mt-5 text-sm font-bold text-yellow-700">
            تعداد کالاهای ذخیره‌شده: {products.length}
          </div>
        </motion.div>

        {loading ? (
          <div className="rounded-[2rem] border border-yellow-100 bg-white p-10 text-center text-sm font-bold text-yellow-700 shadow-sm">
            در حال دریافت کالاهای مورد علاقه...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-yellow-200 bg-yellow-50/50 p-10 text-center">
            <p className="font-bold text-gray-700">
              هنوز کالایی ذخیره نکرده‌ای.
            </p>

            <Link
              to="/shop"
              className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-5 py-3 text-sm font-bold text-white shadow-sm"
            >
              ورود به فروشگاه کالا
            </Link>
          </div>
        ) : (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
            className="
              grid grid-cols-2 gap-3
              sm:grid-cols-3 sm:gap-4
              lg:grid-cols-4 lg:gap-6
            "
          >
            {products.map((item) => (
              <div
                key={item.id}
                className="relative"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="group block"
                >
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 18,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -3 }}
                    className="
                      relative flex h-[315px] flex-col
                      overflow-hidden rounded-3xl
                      border border-white/80
                      bg-white/85 p-2.5
                      shadow-[0_14px_38px_rgba(120,90,20,0.08)]
                      backdrop-blur-md
                      transition duration-300
                      hover:border-yellow-200
                      hover:shadow-[0_18px_45px_rgba(120,90,20,0.13)]
                    "
                  >
                    <div className="absolute right-3 top-3 z-10 rounded-full bg-yellow-50 px-2 py-1 text-[10px] font-bold text-yellow-700 shadow-sm">
                      {item.categoryLinks?.[0]
                        ?.productItem || "محصول"}
                    </div>

                    <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fffaf0] to-[#f7efd9] sm:h-36">
                      <img
                        src={item.images?.[0] || logo}
                        alt={item.title}
                        className="
                          h-20 w-20 object-contain
                          transition duration-300
                          group-hover:scale-105
                          sm:h-24 sm:w-24
                        "
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-1 pt-3 text-right">
                      <h2 className="line-clamp-1 text-xs font-extrabold text-gray-800 sm:text-sm">
                        {item.title}
                      </h2>

                      <p className="mt-1 line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
                        برند:{" "}
                        {item.brandFa ||
                          item.brandEn ||
                          "بدون برند"}
                      </p>

                      <div className="mt-3 min-h-[58px]">
                        <div className="text-right">
                          {(() => {
                            const discount =
                              getActiveDiscount(item);

                            return discount ? (
                              <>
                                <div className="flex min-h-[20px] items-center justify-between gap-2">
                                  <p className="text-[10px] text-gray-400 line-through">
                                    {formatPrice(
                                      discount.oldPrice
                                    )}
                                  </p>

                                  <span className="shrink-0 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold text-white">
                                    {discount.type ===
                                    "PERCENT"
                                      ? `${discount.value}٪ تخفیف`
                                      : "تخفیف ویژه"}
                                  </span>
                                </div>

                                <p className="mt-1 text-[11px] font-black text-yellow-700 sm:text-sm">
                                  {formatPrice(
                                    discount.finalPrice
                                  )}
                                </p>

                                {item.discountEndAt && (
                                  <DiscountCountdown
                                    endDate={
                                      item.discountEndAt
                                    }
                                  />
                                )}
                              </>
                            ) : (
                              <div className="flex h-full flex-col">
                                <div className="min-h-[20px]" />

                                <p className="mt-1 text-[11px] font-black text-yellow-700 sm:text-sm">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  disabled={isPending(item.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    toggleFavorite(item.id);
                  }}
                  aria-label={
                    isFavorite(item.id)
                      ? "حذف از علاقه‌مندی‌ها"
                      : "افزودن به علاقه‌مندی‌ها"
                  }
                  className={`
                    absolute left-4 top-4 z-20
                    flex h-9 w-9 items-center justify-center
                    rounded-full border shadow-md backdrop-blur-md
                    transition-all duration-200

                    ${
                      isPending(item.id)
                        ? "pointer-events-none opacity-60"
                        : ""
                    }

                    ${
                      isFavorite(item.id)
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-white/80 bg-white/90 text-gray-400 hover:text-red-500"
                    }
                  `}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite(item.id)
                        ? "fill-red-500"
                        : "fill-transparent"
                    }`}
                  />
                </motion.button>
                <motion.button
  type="button"
  whileTap={{ scale: 0.96 }}
  disabled={giftUpdating[item.id]}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    handleGiftVisibility(item);
  }}
  className={`
    absolute bottom-3 left-3 right-3 z-20
    flex items-center justify-center gap-2
    rounded-2xl px-3 py-2
    text-[10px] font-black
    transition-all duration-300

    ${
      item.showInGiftGame
        ? `
          border border-yellow-300
          bg-gradient-to-r from-yellow-100 to-amber-100
          text-yellow-800
          shadow-sm
        `
        : `
          border border-gray-200
          bg-white/90
          text-gray-500
        `
    }

    ${
      giftUpdating[item.id]
        ? "opacity-60"
        : "hover:scale-[1.02]"
    }
  `}
>
  <span>
    {item.showInGiftGame
      ? "🎁 قابل نمایش در هدیه‌بازی"
      : "🔒 فقط برای خودم"}
  </span>
</motion.button>
              </div>
            ))}
          </motion.section>
        )}
      </div>
    </div>
  );
}