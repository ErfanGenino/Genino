import logo from "../assets/logo-genino.png";

import {
  getActiveDiscount,
  formatPrice,
} from "./productDiscount";

export default function normalizeProduct(product) {
  let categoryLinks = [];
  let images = [];

  try {
    categoryLinks =
      typeof product.categoryLinks === "string"
        ? JSON.parse(product.categoryLinks)
        : Array.isArray(product.categoryLinks)
        ? product.categoryLinks
        : [];
  } catch {
    categoryLinks = [];
  }

  try {
    images =
      typeof product.images === "string"
        ? JSON.parse(product.images)
        : Array.isArray(product.images)
        ? product.images
        : [];
  } catch {
    images = [];
  }

  const firstImage = images[0];

  const discount = getActiveDiscount(product);

  const imageUrl =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url ||
        firstImage?.src ||
        firstImage?.filename ||
        logo;

  return {

  ...product,

  id: product.id,


  title:
    product.title ||
    "محصول ژنینو",


  images:
    imageUrl
    ?
    [imageUrl]
    :
    [],


  categoryLinks,


  brandFa:
    product.brandFa ||
    "",


  brandEn:
    product.brandEn ||
    "",


  price:
    Number(product.price || 0),


  discountEndAt:
    product.discountEndAt,


};
}