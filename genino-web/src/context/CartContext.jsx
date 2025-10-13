import { createContext, useContext, useState } from "react";

// 🔸 ساخت Context اصلی
const CartContext = createContext();

// 🔹 Provider برای سبد خرید
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // افزودن کالا به سبد
  function addToCart(item) {
    setCartItems((prev) => [...prev, item]);
  }

  // حذف کالا
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // خالی کردن سبد
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🔹 هوک اختصاصی برای دسترسی به سبد خرید
export function useCart() {
  return useContext(CartContext);
}
