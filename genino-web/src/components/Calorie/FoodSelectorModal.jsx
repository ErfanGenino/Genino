import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function FoodSelectorModal({
  meal,
  foods = [],
  selectedFoods,
  setSelectedFoods,
  mealCalories,
  setMealCalories,
  onClose,
  onSave,
}) {
  const [customFoodName, setCustomFoodName] = useState("");
  const [customFoodCalories, setCustomFoodCalories] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomFoodModal, setShowCustomFoodModal] = useState(false);

if (!meal) return null;

useEffect(() => {
  window.history.pushState({ foodModalOpen: true }, "");

  const handleBackButton = () => {
    onClose();
  };

  window.addEventListener("popstate", handleBackButton);

  return () => {
    window.removeEventListener("popstate", handleBackButton);
  };
}, [onClose]);

  const getFoodQuantity = (foodName) => {
    const foundFood = selectedFoods?.[meal]?.find(
      (item) => item.name === foodName
    );

    return foundFood?.quantity || 0;
  };

  const updateFoodQuantity = (food, changeAmount) => {
    const currentQuantity = getFoodQuantity(food.name);
    const nextQuantity = Math.max(0, currentQuantity + changeAmount);

    const updatedMealFoods = selectedFoods[meal].filter(
      (item) => item.name !== food.name
    );

    if (nextQuantity > 0) {
      updatedMealFoods.push({
        name: food.name,
        unit: food.unit,
        grams: food.grams,
        calories: food.calories,
        quantity: nextQuantity,
        totalCalories: nextQuantity * food.calories,
      });
    }

    setSelectedFoods({
      ...selectedFoods,
      [meal]: updatedMealFoods,
    });

    const newMealCalories = updatedMealFoods.reduce(
      (sum, item) => sum + item.totalCalories,
      0
    );

    setMealCalories({
      ...mealCalories,
      [meal]: newMealCalories,
    });
  };

  const removeSelectedFood = (foodName) => {
  const updatedMealFoods = selectedFoods[meal].filter(
    (item) => item.name !== foodName
  );

  setSelectedFoods({
    ...selectedFoods,
    [meal]: updatedMealFoods,
  });

  setMealCalories({
    ...mealCalories,
    [meal]: updatedMealFoods.reduce(
      (sum, item) => sum + item.totalCalories,
      0
    ),
  });
};

const filteredFoods = foods.filter((food) =>
  food.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#f7f2e8] to-[#efe6d6] backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-yellow-200 p-5 sm:p-6 z-[50] max-h-[85vh] overflow-y-auto"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
    >
      <h2 className="text-center text-xl font-bold text-yellow-600 mb-2">
        🍽 انتخاب غذا برای {meal}
      </h2>

      <p className="text-center text-xs text-gray-500 mb-6">
        مقدار هر غذا را با دکمه‌های کم و زیاد مشخص کن.
      </p>

      {/* 📋 لیست غذاهای ثبت‌شده */}
{selectedFoods[meal]?.length > 0 && (
  <div className="mt-6 rounded-2xl border border-yellow-100 bg-white/80 p-4 text-right">
    <h3 className="text-sm font-extrabold text-gray-700 mb-3">
      📋 غذاهای ثبت‌شده
    </h3>

    <div className="flex flex-col gap-2">
      {selectedFoods[meal].map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2"
        >
          <div className="text-sm text-gray-700">
            <span className="font-bold">{item.name}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span>{item.totalCalories} کالری</span>
          </div>

          <button
            onClick={() => removeSelectedFood(item.name)}
            className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-lg hover:bg-red-200 transition"
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  </div>
)}



{/* 🔍 جستجو */}
      <div className="mb-4">
  <input
    type="text"
    placeholder="🔍 جستجوی غذا (مثلا: برنج، نان...)"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-xl border border-yellow-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
  />
</div>


{/* لیست غذاها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-right">
        {filteredFoods.map((food, index) => {
          const quantity = getFoodQuantity(food.name);
          const totalFoodCalories = quantity * food.calories;

          return (
            <div
              key={`${food.name}-${food.unit || "unit"}-${index}`}
              className={`rounded-2xl border p-4 transition shadow-sm ${
                quantity > 0
                  ? "border-yellow-300 bg-yellow-50/70"
                  : "border-yellow-100 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-gray-800">
                    {food.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 leading-6">
                    {food.unit || "هر واحد"}
                    {food.grams ? ` معادل حدود ${food.grams} گرم` : ""}
                  </p>

                  <p className="mt-1 text-xs font-bold text-yellow-700">
                    {food.calories} کالری برای هر واحد
                  </p>
                </div>

                <div className="min-w-[82px] text-center">
                  <p className="text-xs text-gray-400">کالری</p>
                  <p className="text-base font-extrabold text-gray-800">
                    {totalFoodCalories}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
  type="button"
  onClick={() => updateFoodQuantity(food, 0.5)}
  className="w-10 h-10 rounded-xl bg-green-50 text-green-600 font-extrabold hover:bg-green-100 transition"
>
  +
</button>

<div className="flex-1 rounded-xl bg-white border border-yellow-100 py-2 text-center">
  <span className="text-xs text-gray-500 ml-1">مقدار:</span>
  <span className="font-extrabold text-yellow-700">
    {quantity}
  </span>
</div>

<button
  type="button"
  onClick={() => updateFoodQuantity(food, -0.5)}
  disabled={quantity === 0}
  className={`w-10 h-10 rounded-xl font-extrabold transition ${
    quantity === 0
      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
      : "bg-red-50 text-red-500 hover:bg-red-100"
  }`}
>
  -
</button>
              </div>
            </div>
          );
        })}
      </div>



      <div className="sticky bottom-0 mt-6 bg-white/90 backdrop-blur-md pt-4">
        <div className="mb-4 rounded-2xl bg-yellow-50 border border-yellow-100 p-4 text-center">
          <p className="text-sm text-gray-600">مجموع کالری {meal}</p>
          <p className="text-2xl font-extrabold text-yellow-700">
            {mealCalories[meal]} کیلوکالری
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
  <button
    type="button"
    onClick={() => setShowCustomFoodModal(true)}
    className="bg-white text-yellow-700 border border-yellow-300 font-bold py-3 px-6 rounded-xl shadow-sm hover:bg-yellow-50 transition-all"
  >
    ➕ افزودن غذای دلخواه
  </button>

  <button
  type="button"
  onClick={async () => {
    if (onSave) {
      await onSave(selectedFoods, mealCalories);
    }

    onClose();
  }}
  className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
>
  ✅ ثبت و بستن
</button>

</div>
      </div>


{/* ➕ افزودن غذای دلخواه */}
      {showCustomFoodModal &&
  createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={() => setShowCustomFoodModal(false)}
      />

      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-yellow-100 p-5 text-right"
        >
          <h3 className="text-base font-extrabold text-yellow-700 mb-2">
            ➕ افزودن غذای دلخواه
          </h3>

          <p className="mb-4 rounded-xl bg-yellow-50 border border-yellow-100 px-3 py-2 text-xs leading-6 text-gray-600">
            در صورتی که غذای مورد نظر شما در لیست موجود نباشد، می‌توانید آن را
            به‌صورت دستی به همراه مقدار کالری ثبت نمایید.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="نام غذا"
              value={customFoodName}
              onChange={(e) => setCustomFoodName(e.target.value)}
              className="rounded-xl border border-yellow-100 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
            />

            <input
              type="number"
              placeholder="مقدار کالری"
              value={customFoodCalories}
              onChange={(e) => setCustomFoodCalories(e.target.value)}
              className="rounded-xl border border-yellow-100 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowCustomFoodModal(false)}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={() => {
                if (!customFoodName || !customFoodCalories) return;

                const calories = Number(customFoodCalories);

                const updatedMealFoods = [
                  ...selectedFoods[meal],
                  {
                    name: customFoodName,
                    calories,
                    quantity: 1,
                    totalCalories: calories,
                  },
                ];

                setSelectedFoods({
                  ...selectedFoods,
                  [meal]: updatedMealFoods,
                });

                setMealCalories({
                  ...mealCalories,
                  [meal]: updatedMealFoods.reduce(
                    (sum, item) => sum + item.totalCalories,
                    0
                  ),
                });

                setCustomFoodName("");
                setCustomFoodCalories("");
                setShowCustomFoodModal(false);
              }}
              className="px-5 py-2 rounded-xl bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
            >
              ثبت غذا
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  )}
    </motion.div>
  );
}