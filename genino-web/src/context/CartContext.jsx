import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ➕ افزودن کالا به سبد
  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  // ➖ کم کردن تعداد یا حذف
  function decreaseQuantity(id) {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 0) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  }

  // ❌ حذف کامل کالا
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  }

  // 🧹 خالی کردن سبد
  function clearCart() {
    setCartItems([]);
  }

  // 💰 محاسبه جمع کل
  const totalPrice = cartItems.reduce((sum, item) => {
    const numericPrice = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return sum + numericPrice * (item.quantity || 1);
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

export function useCart() {
  return useContext(CartContext);
}

