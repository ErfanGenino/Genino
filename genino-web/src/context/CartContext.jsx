import { createContext, useContext, useState } from "react";

// 🔸 ساخت Context اصلی
const CartContext = createContext();

// 🔹 Provider برای سبد خرید
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ➕ افزودن کالا به سبد (اگر تکراری بود، فقط تعداد رو زیاد می‌کنه)
  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        // اگر محصول از قبل وجود داره، تعدادش رو زیاد کن
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // اگر محصول جدید بود، با quantity=1 اضافه کن
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  // ➖ کم کردن تعداد یک کالا (یا حذفش اگر به ۰ رسید)
  function decreaseQuantity(id) {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  }

  // ❌ حذف کامل کالا
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  }

  // 🧹 خالی کردن کل سبد
  function clearCart() {
    setCartItems([]);
  }

  // 💰 محاسبه جمع کل
  const totalPrice = cartItems.reduce((sum, item) => {
    const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""));
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🔹 هوک اختصاصی برای دسترسی به سبد خرید
export function useCart() {
  return useContext(CartContext);
}
