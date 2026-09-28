import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;



// 🔐 دریافت توکن کاربر
function getUserToken() {
  return localStorage.getItem("genino_token");
}


// 👤 آیا کاربر عادی وارد شده؟
function getLoggedInUser() {
  try {
    const user = JSON.parse(
      localStorage.getItem("genino_user") || "null"
    );

    const vendorId =
      localStorage.getItem("genino_vendor_id");

    if (vendorId) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}


export function CartProvider({ children }) {

  // ==========================================
  // 🛒 سبد خرید معمولی — دیتابیس
  // ==========================================

  const [cartItems, setCartItems] =
    useState([]);

  const [cartLoading, setCartLoading] =
    useState(true);


  // ==========================================
// 🎁 سبد هدیه — دیتابیس
// ==========================================

const [giftCartItems, setGiftCartItems] =
  useState([]);

const [giftCartLoading, setGiftCartLoading] =
  useState(true);


  // ==========================================
  // 🛒 دریافت سبد خرید از Backend
  // ==========================================

  async function loadCart() {

    const token = getUserToken();
    const user = getLoggedInUser();

    // مهمان یا فروشنده
    if (!token || !user?.id) {
      setCartItems([]);
      setCartLoading(false);
      return;
    }

    try {

      setCartLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {

        console.error(
          "LOAD CART ERROR:",
          data
        );

        setCartItems([]);
        return;
      }

      setCartItems(
        Array.isArray(data.items)
          ? data.items
          : []
      );

    } catch (error) {

      console.error(
        "LOAD CART ERROR:",
        error
      );

    } finally {

      setCartLoading(false);

    }
  }


  // ==========================================
// 🎁 دریافت سبد هدیه از Backend
// ==========================================

async function loadGiftCart() {

  const token = getUserToken();
  const user = getLoggedInUser();

  // مهمان یا فروشنده
  if (!token || !user?.id) {
    setGiftCartItems([]);
    setGiftCartLoading(false);
    return;
  }

  try {

    setGiftCartLoading(true);

    const res = await fetch(
      `${API_BASE_URL}/gift-cart`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data.ok) {

      console.error(
        "LOAD GIFT CART ERROR:",
        data
      );

      setGiftCartItems([]);
      return;
    }

    setGiftCartItems(
      Array.isArray(data.items)
        ? data.items
        : []
    );

  } catch (error) {

    console.error(
      "LOAD GIFT CART ERROR:",
      error
    );

  } finally {

    setGiftCartLoading(false);

  }
}


  // دریافت سبد هنگام باز شدن برنامه
  useEffect(() => {

  loadCart();
  loadGiftCart();

}, []);



  // ==========================================
  // ➕ افزودن کالا به سبد خرید واقعی
  // ==========================================

  async function addToCart(item) {

    const token = getUserToken();
    const user = getLoggedInUser();

    // کاربر وارد نشده
    if (!token || !user?.id) {

      return {
        ok: false,
        loginRequired: true,
        message:
          "برای افزودن کالا به سبد خرید، ابتدا وارد حساب ژنینو شوید.",
      };

    }

    try {

      const res = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId:
              Number(item.productId),

            quantity:
              Number(item.quantity || 1),

            variant:
              item.variant || {},
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {

        return {
          ok: false,
          message:
            data.message ||
            "افزودن کالا به سبد خرید انجام نشد.",
        };

      }


      // دوباره از دیتابیس می‌خوانیم
      // تا state دقیقاً با سرور یکسان باشد
      await loadCart();


      return {
        ok: true,
        item: data.item,
      };

    } catch (error) {

      console.error(
        "ADD TO CART ERROR:",
        error
      );

      return {
        ok: false,
        message:
          "ارتباط با سرور برقرار نشد.",
      };
    }
  }


  // ==========================================
  // ➖ کم کردن تعداد
  // ==========================================

  async function decreaseQuantity(
    productId,
    variant
  ) {

    const token = getUserToken();

    if (!token) {
      return {
        ok: false,
        loginRequired: true,
      };
    }


    const existing =
      cartItems.find(
        (item) =>
          Number(item.productId) ===
            Number(productId) &&
          JSON.stringify(
            item.variant || {}
          ) ===
            JSON.stringify(
              variant || {}
            )
      );


    if (!existing) {
      return {
        ok: false,
      };
    }


    // اگر تعداد ۱ است، کالا حذف شود
    if (
      Number(existing.quantity) <= 1
    ) {

      return removeFromCart(
        productId,
        variant
      );

    }


    try {

      const res = await fetch(
        `${API_BASE_URL}/cart/${existing.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            quantity:
              Number(existing.quantity) - 1,
          }),
        }
      );


      const data = await res.json();


      if (!res.ok || !data.ok) {

        return {
          ok: false,
          message:
            data.message ||
            "تعداد کالا تغییر نکرد.",
        };

      }


      await loadCart();


      return {
        ok: true,
      };

    } catch (error) {

      console.error(
        "DECREASE CART ERROR:",
        error
      );

      return {
        ok: false,
      };
    }
  }


  // ==========================================
  // ❌ حذف کامل یک کالا
  // ==========================================

  async function removeFromCart(
    productId,
    variant
  ) {

    const token = getUserToken();

    if (!token) {
      return {
        ok: false,
        loginRequired: true,
      };
    }


    const existing =
      cartItems.find(
        (item) =>
          Number(item.productId) ===
            Number(productId) &&
          JSON.stringify(
            item.variant || {}
          ) ===
            JSON.stringify(
              variant || {}
            )
      );


    if (!existing) {
      return {
        ok: false,
      };
    }


    try {

      const res = await fetch(
        `${API_BASE_URL}/cart/${existing.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const data = await res.json();


      if (!res.ok || !data.ok) {

        return {
          ok: false,
          message:
            data.message ||
            "حذف کالا انجام نشد.",
        };

      }


      await loadCart();


      return {
        ok: true,
      };

    } catch (error) {

      console.error(
        "REMOVE CART ERROR:",
        error
      );

      return {
        ok: false,
      };
    }
  }


  // ==========================================
  // 🧹 خالی کردن سبد خرید
  // ==========================================

  async function clearCart() {

    const token = getUserToken();

    if (!token) {

      setCartItems([]);

      return {
        ok: false,
        loginRequired: true,
      };
    }


    try {

      const res = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const data = await res.json();


      if (!res.ok || !data.ok) {

        return {
          ok: false,
          message:
            data.message ||
            "سبد خرید خالی نشد.",
        };

      }


      setCartItems([]);


      return {
        ok: true,
      };

    } catch (error) {

      console.error(
        "CLEAR CART ERROR:",
        error
      );

      return {
        ok: false,
      };
    }
  }


  async function clearGiftCart() {

  const token = getUserToken();

  if (!token) {

    setGiftCartItems([]);

    return {
      ok: false,
      loginRequired: true,
    };
  }


  try {

    const res = await fetch(
      `${API_BASE_URL}/gift-cart`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );


    const data = await res.json();


    if (!res.ok || !data.ok) {

      return {
        ok: false,
        message:
          data.message ||
          "سبد هدیه خالی نشد.",
      };

    }


    setGiftCartItems([]);


    return {
      ok: true,
    };

  } catch (error) {

    console.error(
      "CLEAR GIFT CART ERROR:",
      error
    );

    return {
      ok: false,
    };

  }
}


  // ==========================================
  // 🎁 افزودن به سبد هدیه
  // ==========================================

  async function addToGiftCart(item) {

  const token = getUserToken();
  const user = getLoggedInUser();

  if (!token || !user?.id) {

    return {
      ok: false,
      loginRequired: true,
      message:
        "برای افزودن هدیه باید وارد حساب ژنینو شوید.",
    };
  }


  const giftTarget =
    item.giftTarget || null;


  if (
    !giftTarget?.id ||
    !giftTarget?.type
  ) {

    return {
      ok: false,
      message:
        "گیرنده هدیه مشخص نیست.",
    };
  }


  try {

    const body = {
      productId:
        Number(item.productId),

      quantity:
        Number(item.quantity || 1),

      variant:
        item.variant || {},

      recipientUserId: null,
      recipientChildId: null,
    };


    if (giftTarget.type === "child") {

      body.recipientChildId =
        Number(giftTarget.id);

    } else if (
      giftTarget.type === "user"
    ) {

      body.recipientUserId =
        Number(giftTarget.id);

    } else {

      return {
        ok: false,
        message:
          "نوع گیرنده هدیه معتبر نیست.",
      };

    }


    const res = await fetch(
      `${API_BASE_URL}/gift-cart`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body:
          JSON.stringify(body),
      }
    );


    const data = await res.json();


    if (!res.ok || !data.ok) {

      return {
        ok: false,

        message:
          data.message ||
          "افزودن هدیه انجام نشد.",
      };

    }


    await loadGiftCart();


    return {
      ok: true,
      item: data.item,
    };

  } catch (error) {

    console.error(
      "ADD TO GIFT CART ERROR:",
      error
    );

    return {
      ok: false,
      message:
        "ارتباط با سرور برقرار نشد.",
    };

  }
}


  // ==========================================
  // 🎁 کم کردن تعداد هدیه
  // ==========================================

  async function decreaseGiftQuantity(
  productId,
  variant,
  giftTargetId
) {

  const token = getUserToken();

  if (!token) {
    return {
      ok: false,
      loginRequired: true,
    };
  }

  const existing =
    giftCartItems.find(
      (item) =>
        Number(item.productId) ===
          Number(productId) &&

        Number(item.giftTarget?.id) ===
          Number(giftTargetId) &&

        JSON.stringify(
          item.variant || {}
        ) ===
          JSON.stringify(
            variant || {}
          )
    );

  if (!existing) {
    return {
      ok: false,
    };
  }

  // اگر تعداد ۱ است، آیتم کامل حذف شود
  if (
    Number(existing.quantity) <= 1
  ) {

    return removeGiftFromCart(
      productId,
      variant,
      giftTargetId
    );
  }

  try {

    const res = await fetch(
      `${API_BASE_URL}/gift-cart/${existing.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantity:
            Number(existing.quantity) - 1,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.ok) {

      return {
        ok: false,
        message:
          data.message ||
          "تعداد هدیه تغییر نکرد.",
      };
    }

    await loadGiftCart();

    return {
      ok: true,
    };

  } catch (error) {

    console.error(
      "DECREASE GIFT CART ERROR:",
      error
    );

    return {
      ok: false,
    };
  }
}


  // ==========================================
  // 🎁 حذف کامل هدیه
  // ==========================================
   async function removeGiftFromCart(
  productId,
  variant,
  giftTargetId
) {

  const token = getUserToken();

  if (!token) {
    return {
      ok: false,
      loginRequired: true,
    };
  }


  const existing =
    giftCartItems.find(
      (item) =>
        Number(item.productId) ===
          Number(productId) &&

        Number(item.giftTarget?.id) ===
          Number(giftTargetId) &&

        JSON.stringify(
          item.variant || {}
        ) ===
          JSON.stringify(
            variant || {}
          )
    );


  if (!existing) {
    return {
      ok: false,
    };
  }


  try {

    const res = await fetch(
      `${API_BASE_URL}/gift-cart/${existing.id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );


    const data = await res.json();


    if (!res.ok || !data.ok) {

      return {
        ok: false,
        message:
          data.message ||
          "حذف هدیه انجام نشد.",
      };

    }


    await loadGiftCart();


    return {
      ok: true,
    };

  } catch (error) {

    console.error(
      "REMOVE GIFT CART ERROR:",
      error
    );

    return {
      ok: false,
    };

  }
}


  // ==========================================
  // 🎁 افزایش تعداد هدیه
  // ==========================================
  async function increaseGiftQuantity(
  productId,
  variant,
  giftTargetId
) {

  const token = getUserToken();

  if (!token) {
    return {
      ok: false,
      loginRequired: true,
    };
  }


  const existing =
    giftCartItems.find(
      (item) =>
        Number(item.productId) ===
          Number(productId) &&

        Number(item.giftTarget?.id) ===
          Number(giftTargetId) &&

        JSON.stringify(
          item.variant || {}
        ) ===
          JSON.stringify(
            variant || {}
          )
    );


  if (!existing) {
    return {
      ok: false,
    };
  }


  try {

    const res = await fetch(
      `${API_BASE_URL}/gift-cart/${existing.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantity:
            Number(existing.quantity) + 1,
        }),
      }
    );


    const data = await res.json();


    if (!res.ok || !data.ok) {

      return {
        ok: false,
        message:
          data.message ||
          "تعداد هدیه افزایش پیدا نکرد.",
      };

    }


    await loadGiftCart();


    return {
      ok: true,
    };

  } catch (error) {

    console.error(
      "INCREASE GIFT CART ERROR:",
      error
    );

    return {
      ok: false,
    };

  }
}


  // ==========================================
  // 🧮 تعداد کالاهای سبد
  // ==========================================

  const cartCount =
    cartItems.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 1
        ),
      0
    );


  const giftCartCount =
    giftCartItems.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 1
        ),
      0
    );


  // فعلاً مثل قبل
  const totalPrice = 0;


  return (

    <CartContext.Provider
  value={{
    cartItems,
    giftCartItems,

    cartCount,
    giftCartCount,

    cartLoading,
    giftCartLoading,

    addToCart,
    addToGiftCart,

    decreaseQuantity,
    decreaseGiftQuantity,

    removeFromCart,
    removeGiftFromCart,

    increaseGiftQuantity,

    clearCart,
    clearGiftCart,

    loadCart,
    loadGiftCart,

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