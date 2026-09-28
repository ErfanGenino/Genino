// D:\projects\Genino\genino-web\src\pages\Cart.jsx

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Minus, Plus, Gift } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const [cartProducts,setCartProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [activeTab,setActiveTab] = React.useState("personal");
  const {
  cartItems,
  giftCartItems,
  addToCart,
  decreaseQuantity,
  decreaseGiftQuantity,
  increaseGiftQuantity,
  removeFromCart,
  removeGiftFromCart,
  clearCart,
  clearGiftCart,
} = useCart();
  const [activeGiftTarget,setActiveGiftTarget] = useState(null);

  const [selectedItemsByCart, setSelectedItemsByCart] =
  useState({});



  const giftTargets = useMemo(() => [
  ...new Map(
    giftCartItems
      .filter((item) => item.giftTarget)
      .map((item) => [
        `${item.giftTarget.type}:${item.giftTarget.id}`,
        item.giftTarget,
      ])
  ).values()
], [giftCartItems]);


const activeGiftItems =
  giftCartItems.filter(
    (item) =>
      Number(item.giftTarget?.id) ===
        Number(activeGiftTarget?.id) &&
      item.giftTarget?.type ===
        activeGiftTarget?.type
  );


useEffect(() => {

  if (activeTab !== "gift") {
    return;
  }

  if (!giftTargets.length) {
    setActiveGiftTarget(null);
    return;
  }

  const targetStillExists =
    giftTargets.some(
      (target) =>
        Number(target.id) ===
          Number(activeGiftTarget?.id) &&
        target.type ===
          activeGiftTarget?.type
    );

  if (!targetStillExists) {
    setActiveGiftTarget(
      giftTargets[0]
    );
  }

}, [
  activeTab,
  giftTargets,
  activeGiftTarget,
]);


function getCurrentCartKey() {

  if (activeTab === "personal") {
    return "personal";
  }

  return `gift:${
    activeGiftTarget?.type || ""
  }:${
    activeGiftTarget?.id || ""
  }`;
}


function getSelectionKey(item) {

  const size =
    item.variant?.size ||
    item.variant?.sizeName ||
    "";

  const color =
    item.variant?.color ||
    item.variant?.colorName ||
    "";

  return `${item.id}:${size}:${color}`;
}


  function getFinalPrice(item){
  const price = Number(item.price || 0);
  if(
    item.discountType === "PERCENT" &&
    item.discountValue
  ){
    return Math.round(
      price -
      (
        price *
        Number(item.discountValue)
        /
        100
      )
    );

  }
  if(
    item.discountType === "AMOUNT" &&
    item.discountValue
  ){
    return Math.max(
      0,
      price -
      Number(item.discountValue)
    );
  }
  return price;
}

function getDiscountText(item){
  if(
    item.discountType === "PERCENT" &&
    item.discountValue
  ){
    return `${item.discountValue}٪`;
  }
  if(
    item.discountType === "AMOUNT" &&
    item.discountValue
  ){
    return Number(
      item.discountValue
    ).toLocaleString("fa-IR") + " ریال";
  }
  return "-";
}


function getStock(item){
const rows =
item.inventoryRows || [];

const selectedSize =
item.variant?.size ||
item.variant?.sizeName;

const selectedColor =
item.variant?.color ||
item.variant?.colorName;

const sizeRow =
rows.find(
row =>
row.size === selectedSize
);

if(!sizeRow){
return 0;
}

const colorRow =
sizeRow.colors?.find(
c =>
c.colorName === selectedColor
);

return Number(
 colorRow?.quantity || 0
);
}

function canIncreaseQuantity(item){
  const stock = getStock(item);
  const current =
    Number(item.quantity || 1);
  return current < stock;
}



  useEffect(()=>{
async function loadCartProducts(){
  setLoading(true);
try{
const res = await fetch(
`${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/cart-products`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
items:
activeTab==="gift"
?
activeGiftItems
:
cartItems
})

}
);
const data = await res.json();
if(data.ok){
setCartProducts(
data.products || []
);
}
}catch(error){

console.error(
"LOAD CART PRODUCTS ERROR",
error
);
}
finally{
setLoading(false);
}
}
loadCartProducts();
},[
cartItems,
giftCartItems,
activeTab,
activeGiftTarget
]);

useEffect(() => {

  if (!cartProducts.length) {
    return;
  }

  const cartKey =
    getCurrentCartKey();

  const currentKeys =
    cartProducts.map(
      (item) =>
        getSelectionKey(item)
    );

  setSelectedItemsByCart((prev) => {

    // اولین بار که این سبد را می‌بینیم
    // همه کالاها به صورت پیش‌فرض انتخاب باشند
    if (!prev[cartKey]) {

      return {
        ...prev,
        [cartKey]:
          currentKeys,
      };
    }

    // اگر کالایی از سبد حذف شده باشد
    // از انتخاب‌ها هم حذف شود
    const validKeys =
      prev[cartKey].filter(
        (key) =>
          currentKeys.includes(key)
      );

    return {
      ...prev,
      [cartKey]:
        validKeys,
    };
  });

}, [
  cartProducts,
  activeTab,
  activeGiftTarget,
]);


const currentCartKey =
  getCurrentCartKey();

const selectedItemKeys =
  selectedItemsByCart[
    currentCartKey
  ] || [];

const selectedCartProducts =
  cartProducts.filter(
    (item) =>
      selectedItemKeys.includes(
        getSelectionKey(item)
      )
  );

const liveTotalPrice =
  selectedCartProducts.reduce(
    (sum, item) => {

      return sum +
        (
          getFinalPrice(item) *
          Number(item.quantity || 1)
        );

    },
    0
  );


function toggleItemSelection(item) {

  const itemKey =
    getSelectionKey(item);

  setSelectedItemsByCart((prev) => {

    const current =
      prev[currentCartKey] || [];

    const isSelected =
      current.includes(itemKey);

    return {
      ...prev,

      [currentCartKey]:
        isSelected
          ? current.filter(
              (key) =>
                key !== itemKey
            )
          : [
              ...current,
              itemKey,
            ],
    };
  });
}






  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] text-gray-800 p-6 overflow-hidden">
      {/* 🌿 بک‌گراند طلایی DNA، سبدها و دلارها */}
      <div className="absolute inset-0 overflow-hidden z-0">

        {/* 🧬 DNA های طلایی */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.svg
            key={`dna-${i}`}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-20"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 80 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient id={`gold-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#b88a1a" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#gold-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#gold-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}

        {/* 🛍️ سبدهای طلایی شناور */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`bag-${i}`}
            className="absolute text-yellow-500/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShoppingBag className="w-10 h-10" />
          </motion.div>
        ))}

        {/* 💲 دلارهای طلایی شناور */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`dollar-${i}`}
            className="absolute text-yellow-400/40 text-3xl font-bold select-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 20, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            $
          </motion.div>
        ))}
      </div>

      {/* 🔹 هدر */}
      <header dir="rtl" className="flex items-center justify-between mb-10 relative z-10">
        <Link
          to="/shop"
          className="text-yellow-600 font-semibold flex items-center gap-2 hover:text-yellow-700 transition"
        >
          → بازگشت 
        </Link>

        <h1 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
{
activeTab === "personal" ? (
<>
<ShoppingBag className="text-yellow-500 w-7 h-7" />
سبد خرید من
</>
):(
<>
<Gift className="text-yellow-500 w-7 h-7" />
سبد هدیه بازی
</>
)
}
</h1>
        <button
  onClick={async () => {

    const message =
      activeTab === "gift"
        ? "آیا از خالی کردن کامل سبد هدیه مطمئن هستید؟"
        : "آیا از خالی کردن کامل سبد خرید مطمئن هستید؟";

    const confirmed =
      window.confirm(message);

    if (!confirmed) {
      return;
    }

    const result =
      activeTab === "gift"
        ? await clearGiftCart()
        : await clearCart();

    if (!result?.ok) {
      alert(
        result?.message ||
        "خالی کردن سبد انجام نشد."
      );
    }

  }}
  className="text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-xl hover:bg-red-50 transition"
>
  🧹 خالی کردن سبد
</button>
      </header>

      <div
dir="rtl"
className="
relative
z-10
max-w-4xl
mx-auto
mb-6
grid
grid-cols-2
gap-3
"
>
<button
onClick={()=>setActiveTab("personal")}
className={`
rounded-2xl
py-3
font-black
transition
${
activeTab==="personal"
?
"bg-gradient-to-r from-[#7a5526] to-[#d4af37] text-white shadow"
:
"bg-white text-gray-500 border border-yellow-100"
}
`}
>
🛒 سبد خرید من
</button>

<button
onClick={()=>setActiveTab("gift")}
className={`
rounded-2xl
py-3
font-black
transition
${
activeTab==="gift"
?
"bg-gradient-to-r from-[#d4af37] to-[#f6d365] text-white shadow"
:
"bg-white text-gray-500 border border-yellow-100"
}
`}
>
🎁 سبد هدیه بازی
</button>
</div>

      {/* 🟡 محتوای سبد */}
      <section dir="rtl" className="relative z-10 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-yellow-100">
        {
activeTab==="gift" && (

<div
className="
rounded-3xl
bg-yellow-50
border
border-yellow-200
p-5
mb-5
"
>

<h2 className="
text-center
font-black
text-yellow-800
mb-4
">
🎁 سبد هدیه بازی ژنینو
</h2>


<div
className="
flex
gap-3
overflow-x-auto
"
>

{
giftTargets.map(target=>(

<button

key={`${target.type}:${target.id}`}

onClick={()=>setActiveGiftTarget(target)}

className={`
shrink-0
px-5
py-3
rounded-2xl
font-black
transition

${
Number(activeGiftTarget?.id) === Number(target.id) &&
activeGiftTarget?.type === target.type
?
"bg-yellow-500 text-white"
:
"bg-white text-yellow-700 border border-yellow-200"
}

`}

>

🎁 {target.name}

</button>

))

}

</div>


</div>

)
}
        {loading ? (

<p className="text-center py-10">
در حال بروزرسانی سبد خرید...
</p>

) : cartProducts.length === 0 ? (

  <p className="text-center text-gray-500 py-10">

    {activeTab === "gift"
      ? "سبد هدیه بازی شما خالی است 🎁"
      : "سبد خرید شما خالی است 🛒"}

  </p>

) : (
          <div className="space-y-6">
            {cartProducts.map((item) => (
              <motion.div
                key={`${item.id || item.productId}-${item.variant?.size}-${item.variant?.color}`}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-yellow-50 hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >

                <label
  className="
    mb-3
    flex
    cursor-pointer
    items-center
    gap-2
    self-start
    sm:mb-0
    sm:ml-3
  "
>
  <input
    type="checkbox"

    checked={
      selectedItemKeys.includes(
        getSelectionKey(item)
      )
    }

    onChange={() =>
      toggleItemSelection(item)
    }

    className="
      h-5
      w-5
      cursor-pointer
      accent-yellow-500
    "
  />

  <span
    className="
      text-xs
      font-bold
      text-gray-500
    "
  >
    خرید در این نوبت
  </span>
</label>

                {/* تصویر و مشخصات */}
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <img
                     src={item.images?.[0]}
                     alt={item.title}
                     className="w-20 h-20 object-cover rounded-xl border border-yellow-100"
                  />
                  <div className="text-right">
                    <h2 className="font-semibold text-lg text-gray-800">
  {item.title}
</h2>


{/* مدل انتخاب شده */}
<div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">

  {
    item.variant?.size && (
      <span
        className="
        rounded-full
        bg-yellow-50
        border
        border-yellow-200
        px-3
        py-1
        text-yellow-700
        "
      >
        سایز: {item.variant.size}
      </span>
    )
  }


  {
    item.variant?.color && (
      <span
        className="
        rounded-full
        bg-pink-50
        border
        border-pink-200
        px-3
        py-1
        text-pink-700
        "
      >
        رنگ: {item.variant.color}
      </span>
    )
  }

</div>


<p className="text-sm text-gray-500 mt-2">
  فروشگاه: {item.vendor?.businessName || "ثبت نشده"}
</p>
                    <div className="mt-2">
{
item.discountType !== "NONE"
&&
item.discountValue
?
<>
<p className="text-sm text-gray-400 line-through">
{
Number(item.price)
.toLocaleString("fa-IR")
}
 ریال
</p>
<p className="text-yellow-600 font-black">
{
Number(getFinalPrice(item))
.toLocaleString("fa-IR")
}
 ریال
</p>
<span
className="
inline-block
mt-1
text-xs
bg-red-100
text-red-600
px-2
py-1
rounded-full
font-bold
"
>
{
item.discountType==="PERCENT"
?
`${item.discountValue}٪ تخفیف`
:
"تخفیف ویژه"
}
</span>
</>
:
<p className="text-yellow-600 font-bold">
{
Number(item.price)
.toLocaleString("fa-IR")
}
 ریال
</p>
}
</div>

{
getStock(item) <= 0
?
<p className="text-red-600 text-sm font-bold mt-2">
❌ ناموجود
</p>
:
getStock(item) <= 5
?
<p className="text-orange-500 text-sm font-bold mt-2">
⚠️ تنها {getStock(item)} عدد باقی مانده
</p>
:
<p className="text-green-600 text-sm font-bold mt-2">
✅ موجود است
</p>
}
                  </div>
                </div>

                {/* کنترل تعداد و حذف */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {if(activeTab==="gift"){
decreaseGiftQuantity(
item.id,
item.variant,
activeGiftTarget?.id
);
}else{
decreaseQuantity(
item.id,
item.variant
);
}
}}
                    className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-200 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-gray-700 w-6 text-center">{item.quantity}</span>
                  <button
                  disabled={!canIncreaseQuantity(item)}
                    onClick={() => {
if(
 canIncreaseQuantity(item)
){
if(activeTab==="gift"){
increaseGiftQuantity(
item.id,
item.variant,
activeGiftTarget.id
);
}else{
addToCart({
 productId:item.id,
 quantity:1,
 variant:item.variant
});

}
}
}}
                    className={`
w-8
h-8
rounded-full
flex
items-center
justify-center
transition
${
canIncreaseQuantity(item)
?
"bg-yellow-500 text-white hover:bg-yellow-600"
:
"bg-gray-200 text-gray-400 cursor-not-allowed"
}
`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
onClick={()=>{

if(activeTab==="gift"){

removeGiftFromCart(
 item.id,
 item.variant,
 activeGiftTarget?.id
);

}else{

removeFromCart(
 item.id,
 item.variant
);

}

}}
className="ml-4 text-red-500 hover:text-red-600 transition"
>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 🧾 فاکتور خرید */}
{selectedCartProducts.length > 0 && (

<div
dir="rtl"
className="
relative
z-10
max-w-5xl
mx-auto
mt-10
bg-white
rounded-3xl
shadow-md
border
border-yellow-100
p-6
"
>

<h2 className="
text-xl
font-black
text-yellow-700
mb-5
">
🧾 خلاصه فاکتور خرید
</h2>

<div className="
w-full
overflow-hidden
">

<table
className="
w-full
text-[10px]
sm:text-xs
text-center
"
>

<thead>
<tr className="
bg-yellow-50
text-gray-700
">

<th className="p-1">
ردیف
</th>

<th className="p-1">
نام کالا
</th>

<th className="p-1">
قیمت واحد
</th>

<th className="p-1">
تخفیف
</th>

<th className="p-1">
قیمت پس از تخفیف
</th>

<th className="p-1">
تعداد
</th>

<th className="p-1">
قیمت نهایی
</th>
</tr>
</thead>

<tbody>

{selectedCartProducts.map((item,index)=>{

const finalPrice =
getFinalPrice(item);

return (
<tr
key={`${item.id || item.productId}-${item.variant?.size}-${item.variant?.color}`}
className="
border-b
border-yellow-100
"
>
<td className="p-3">
{index+1}
</td>

<td
className="
p-1
font-bold
break-words
leading-4
"
>
{item.title}
</td>

<td className="p-3">
{Number(item.price)
.toLocaleString("fa-IR")
}
</td>

<td className="p-3 text-red-600">

{getDiscountText(item)
}
</td>

<td className="
p-3
text-green-700
font-bold
">
{Number(finalPrice)
.toLocaleString("fa-IR")
}

</td>

<td className="p-3">

{item.quantity}

</td>



<td
className="
p-1
font-black
text-yellow-700
whitespace-nowrap
"
>

{
Number(
finalPrice *
item.quantity
)
.toLocaleString("fa-IR")
}

</td>


</tr>

)

})

}


</tbody>

</table>

</div>



<div
className="
mt-6
flex
justify-between
items-center
bg-yellow-50
rounded-2xl
p-5
font-black
"
>

<span>
جمع کل قابل پرداخت:
</span>


<span
className="
text-yellow-700
text-lg
"
>

{
Number(liveTotalPrice)
.toLocaleString("fa-IR")
}

 ریال

</span>


</div>


</div>


)

}




{/* دکمه پرداخت */}

{
selectedCartProducts.length > 0 && (

<div
className="
relative
z-10
max-w-5xl
mx-auto
mt-5
text-center
"
>

<button

className="
bg-yellow-500
text-white
px-10
py-4
rounded-2xl
font-black
shadow
hover:bg-yellow-600
transition
"

>

ادامه به پرداخت 💳

</button>


</div>

)

}
    </main>
  );
}
