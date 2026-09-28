import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  getFavoriteProductIds,
  saveFavoriteProduct,
  removeFavoriteProduct,
} from "../services/api";

const FavoriteProductsContext = createContext(null);

export function FavoriteProductsProvider({ children }) {
  const navigate = useNavigate();

  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [pendingProductIds, setPendingProductIds] = useState([]);

  const token = localStorage.getItem("genino_token");
  const vendorId = localStorage.getItem("genino_vendor_id");

  const isVendor = Boolean(vendorId);
  const isLoggedIn = Boolean(token);
  const canUseFavorites = isLoggedIn && !isVendor;

  const loadFavoriteProductIds = useCallback(async () => {
    const currentToken = localStorage.getItem("genino_token");
    const currentVendorId = localStorage.getItem("genino_vendor_id");

    if (!currentToken || currentVendorId) {
      setFavoriteProductIds([]);
      setFavoritesLoading(false);
      return;
    }

    setFavoritesLoading(true);

    try {
      const res = await getFavoriteProductIds();

      if (res?.ok) {
        const normalizedIds = Array.isArray(res.productIds)
          ? res.productIds
              .map((id) => Number(id))
              .filter((id) => Number.isInteger(id) && id > 0)
          : [];

        setFavoriteProductIds(normalizedIds);
      } else {
        setFavoriteProductIds([]);
      }
    } catch (error) {
      console.error(
        "LOAD FAVORITE PRODUCT IDS ERROR:",
        error
      );

      setFavoriteProductIds([]);
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavoriteProductIds();

    const handleSessionChange = () => {
      loadFavoriteProductIds();
    };

    const handleFavoriteChange = () => {
      loadFavoriteProductIds();
    };

    window.addEventListener(
      "genino_token_changed",
      handleSessionChange
    );

    window.addEventListener(
      "genino_vendor_changed",
      handleSessionChange
    );

    window.addEventListener(
      "genino_favorite_products_changed",
      handleFavoriteChange
    );

    window.addEventListener(
      "storage",
      handleSessionChange
    );

    return () => {
      window.removeEventListener(
        "genino_token_changed",
        handleSessionChange
      );

      window.removeEventListener(
        "genino_vendor_changed",
        handleSessionChange
      );

      window.removeEventListener(
        "genino_favorite_products_changed",
        handleFavoriteChange
      );

      window.removeEventListener(
        "storage",
        handleSessionChange
      );
    };
  }, [loadFavoriteProductIds]);

  const isFavorite = useCallback(
    (productId) => {
      return favoriteProductIds.includes(Number(productId));
    },
    [favoriteProductIds]
  );

  const isPending = useCallback(
    (productId) => {
      return pendingProductIds.includes(Number(productId));
    },
    [pendingProductIds]
  );

  const toggleFavorite = useCallback(
    async (productId) => {
      const normalizedProductId = Number(productId);

      if (
        !Number.isInteger(normalizedProductId) ||
        normalizedProductId <= 0
      ) {
        return {
          ok: false,
          message: "شناسه کالا معتبر نیست.",
        };
      }

      const currentToken =
        localStorage.getItem("genino_token");

      const currentVendorId =
        localStorage.getItem("genino_vendor_id");

      if (currentVendorId) {
        return {
          ok: false,
          message:
            "فروشندگان امکان افزودن کالا به علاقه‌مندی‌ها را ندارند.",
        };
      }

      if (!currentToken) {
        navigate("/login");

        return {
          ok: false,
          requiresLogin: true,
          message:
            "برای افزودن کالا به علاقه‌مندی‌ها وارد حساب کاربری شوید.",
        };
      }

      if (pendingProductIds.includes(normalizedProductId)) {
        return {
          ok: false,
          pending: true,
        };
      }

      const wasFavorite =
        favoriteProductIds.includes(normalizedProductId);

      setPendingProductIds((prev) => [
        ...prev,
        normalizedProductId,
      ]);

      setFavoriteProductIds((prev) =>
        wasFavorite
          ? prev.filter(
              (id) => id !== normalizedProductId
            )
          : [...prev, normalizedProductId]
      );

      try {
        const res = wasFavorite
          ? await removeFavoriteProduct(
              normalizedProductId
            )
          : await saveFavoriteProduct(
              normalizedProductId
            );

        if (!res?.ok) {
          setFavoriteProductIds((prev) =>
            wasFavorite
              ? [...new Set([...prev, normalizedProductId])]
              : prev.filter(
                  (id) => id !== normalizedProductId
                )
          );

          return {
            ok: false,
            message:
              res?.message ||
              "تغییر علاقه‌مندی انجام نشد.",
          };
        }

        window.dispatchEvent(
          new CustomEvent(
            "genino_favorite_products_changed",
            {
              detail: {
                productId: normalizedProductId,
                isFavorite: !wasFavorite,
              },
            }
          )
        );

        return {
          ok: true,
          productId: normalizedProductId,
          isFavorite: !wasFavorite,
        };
      } catch (error) {
        console.error(
          "TOGGLE FAVORITE PRODUCT ERROR:",
          error
        );

        setFavoriteProductIds((prev) =>
          wasFavorite
            ? [...new Set([...prev, normalizedProductId])]
            : prev.filter(
                (id) => id !== normalizedProductId
              )
        );

        return {
          ok: false,
          message:
            "خطا در ارتباط با سرور.",
        };
      } finally {
        setPendingProductIds((prev) =>
          prev.filter(
            (id) => id !== normalizedProductId
          )
        );
      }
    },
    [
      favoriteProductIds,
      navigate,
      pendingProductIds,
    ]
  );

  const value = useMemo(
    () => ({
      favoriteProductIds,
      favoritesLoading,
      pendingProductIds,
      isVendor,
      isLoggedIn,
      canUseFavorites,
      isFavorite,
      isPending,
      toggleFavorite,
      reloadFavorites: loadFavoriteProductIds,
    }),
    [
      favoriteProductIds,
      favoritesLoading,
      pendingProductIds,
      isVendor,
      isLoggedIn,
      canUseFavorites,
      isFavorite,
      isPending,
      toggleFavorite,
      loadFavoriteProductIds,
    ]
  );

  return (
    <FavoriteProductsContext.Provider value={value}>
      {children}
    </FavoriteProductsContext.Provider>
  );
}

export function useFavoriteProducts() {
  const context = useContext(FavoriteProductsContext);

  if (!context) {
    throw new Error(
      "useFavoriteProducts must be used inside FavoriteProductsProvider"
    );
  }

  return context;
}