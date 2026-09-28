import normalizeProduct from "../utils/normalizeProduct";

export async function getHomeProducts(API_BASE_URL) {
  const res = await fetch(
    `${API_BASE_URL}/vendor-products/home`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok || !data?.ok) {
    throw new Error(
      data?.message ||
      "دریافت محصولات صفحه اصلی انجام نشد"
    );
  }

  return {
    latestProducts:
      (data.latestProducts || []).map(normalizeProduct),

    sismooniProducts:
      (data.sismooniProducts || []).map(normalizeProduct),

    discountedProducts:
      (data.discountedProducts || []).map(normalizeProduct),

    version: data.version,
    cache: data.cache,
    generatedAt: data.generatedAt,
  };
}