import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function FavoriteProductsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#fffdf7] pt-24 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/favorites"
          className="inline-flex items-center gap-2 text-sm font-bold text-yellow-600 hover:text-yellow-700 mb-6"
        >
          <ArrowRight size={18} />
          بازگشت به علاقه‌مندی‌ها
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-7 shadow-sm mb-8"
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
            تعداد کالاهای ذخیره‌شده: 0
          </div>
        </motion.div>

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
      </div>
    </div>
  );
}