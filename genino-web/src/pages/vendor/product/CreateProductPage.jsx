import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "سیسمونی تخصصی",
    image: "/images/shop/categories/sismooni.webp",
    route: "/shop/sismooni",
  },
  {
    title: "نوزاد، کودک و نوجوان",
    image: "/images/shop/categories/kids.webp",
    route: "/shop/kids",
  },
  {
    title: "مد و پوشاک",
    image: "/images/shop/categories/fashion.webp",
    route: "/shop/fashion",
  },
  {
    title: "کالای خواب و حمام",
    image: "/images/shop/categories/bed-bath.webp",
    route: "/shop/bed-bath",
  },
  {
    title: "ساعت و زیور‌آلات",
    image: "/images/shop/categories/watch-jewelry.webp",
    route: "/shop/watch-jewelry",
  },
  {
    title: "کالای ورزشی",
    image: "/images/shop/categories/sport.webp",
    route: "/shop/sport",
  },
  {
    title: "سلامت و پزشکی",
    image: "/images/shop/categories/medical.webp",
    route: "/shop/medical",
  },
  {
    title: "آرایشی و بهداشتی",
    image: "/images/shop/categories/beauty.webp",
    route: "/shop/beauty",
  },
  {
    title: "عطر و ادکلن",
    image: "/images/shop/categories/perfume.webp",
    route: "/shop/perfume",
  },
  {
    title: "هنر دست",
    image: "/images/shop/categories/handmade.webp",
    route: "/shop/handmade",
  },
];

export default function CreateProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="p-4 text-right">
      <h1 className="text-xl font-black mb-4">
        انتخاب دسته‌بندی محصول
      </h1>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.title}
            onClick={() => setSelectedCategory(cat.title)}
            className={`p-3 rounded-2xl border text-sm font-bold ${
              selectedCategory === cat.title
                ? "bg-yellow-600 text-white"
                : "bg-white"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}