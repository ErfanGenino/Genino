export function getActiveDiscount(product) {

  if (
    !product ||
    !product.discountType ||
    product.discountType === "NONE"
  ) {
    return null;
  }


  const now = new Date();


  if (product.discountStartAt) {
    const start = new Date(product.discountStartAt);

    if (now < start) {
      return null;
    }
  }


  if (product.discountEndAt) {
    const end = new Date(product.discountEndAt);

    if (now > end) {
      return null;
    }
  }


  const oldPrice = Number(product.price || 0);

  let finalPrice = oldPrice;


  if (product.discountType === "PERCENT") {

    finalPrice =
      oldPrice -
      (oldPrice * Number(product.discountValue || 0)) / 100;

  }


  if (product.discountType === "AMOUNT") {

    finalPrice =
      oldPrice -
      Number(product.discountValue || 0);

  }


  if (finalPrice < 0) {
    finalPrice = 0;
  }


  return {
    oldPrice,
    finalPrice,
    value: product.discountValue,
    type: product.discountType,
  };
}


export function formatPrice(value) {
  return Number(value || 0).toLocaleString("fa-IR") + " ریال";
}