import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import {
  getChildFavoriteProducts,
  updateChildGiftVisibility,
  removeChildFavoriteProduct,
  getMyChildren,
} from "../../services/api";


export default function FavoriteChildProductsManagePage(){

  const [searchParams] = useSearchParams();

  const childId =
    searchParams.get("childId");


  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [child,setChild] = useState(null);
 



  useEffect(()=>{

    if(!childId) return;


    async function load(){

      try{

        const res =
          await getChildFavoriteProducts(
            childId
          );


        if(res?.ok){

          setProducts(
            res.items || []
          );

        }


      }catch(error){

        console.error(
          "LOAD CHILD FAVORITES ERROR",
          error
        );

      }
      finally{

        setLoading(false);

      }

    }


    load();


  },[childId]);


  useEffect(()=>{

  if(!childId) return;


  async function loadChild(){

    try{

      const res =
        await getMyChildren();


      const children =
        Array.isArray(res)
        ? res
        : res?.children || [];


      const found =
        children.find(
          c =>
          String(c.id) === String(childId)
        );


      if(found){

        setChild(found);

      }


    }catch(error){

      console.error(
        "LOAD CHILD ERROR",
        error
      );

    }

  }


  loadChild();


},[childId]);



  if(loading){

    return (
      <div className="
        min-h-[50vh]
        flex
        items-center
        justify-center
        text-yellow-700
        font-bold
      ">
        در حال دریافت کالاهای کودک...
      </div>
    );

  }

  async function toggleVisibility(item){

  const newValue =
    !item.showInGiftGame;


  const res =
    await updateChildGiftVisibility(
      childId,
      item.product.id,
      newValue
    );


  if(res?.ok){

  setProducts(prev =>
    prev.map(p =>
      p.id === item.id
      ?
      {
        ...p,
        showInGiftGame:newValue,
      }
      :
      p
    )
  );

}

}


async function removeFavorite(item){

  const confirmDelete =
    window.confirm(
      "آیا این کالا از علاقه‌مندی کودک حذف شود؟"
    );


  if(!confirmDelete){
    return;
  }



  const res =
    await removeChildFavoriteProduct(
      childId,
      item.product.id
    );


  if(res?.ok){

    setProducts(prev =>
      prev.filter(
        p => p.id !== item.id
      )
    );

  }

}





  return (

    <main
  dir="rtl"
  className="
    min-h-screen
    bg-gradient-to-b
    from-[#fffaf0]
    to-[#f8efd9]
    px-4
    py-8
  "
>


      <div
  className="
    mx-auto
    mb-8
    max-w-4xl
    rounded-3xl
    bg-white/90
    p-6
    text-center
    shadow-[0_15px_40px_rgba(120,90,20,0.12)]
  "
>

<h1
  className="
    text-2xl
    font-black
    text-yellow-800
  "
>
💛 مدیریت علاقه‌مندی‌های کودک
</h1>


<p
 className="
 mt-3
 text-sm
 text-gray-500
 "
>
کالاهای مورد علاقه کودک را مدیریت کنید؛
انتخاب کنید کدام کالا برای دوستان ژنینو نمایش داده شود.
</p>


<div
 className="
 mt-5
 inline-flex
 rounded-full
 bg-yellow-50
 px-5
 py-2
 text-sm
 font-bold
 text-yellow-700
 "
>
تعداد کالاها:
{" "}
{products.length}
</div>


</div>



      {
        products.length === 0 ?

        (

          <div
className="
flex
flex-col
items-center
gap-3
"
>

<span className="text-4xl">
🧸
</span>

<p>
هنوز کالایی برای این کودک انتخاب نشده است.
</p>

<p
className="
text-xs
text-gray-400
"
>
از فروشگاه ژنینو کالاهای مورد علاقه کودک را اضافه کنید.
</p>

</div>

        )

        :

        (

        <div
className="
grid
grid-cols-2
sm:grid-cols-3
lg:grid-cols-4
gap-5
max-w-7xl
mx-auto
"
>

          {
products.map(item=>(

  <div
key={item.product.id}
className="
flex
flex-col
rounded-3xl
bg-white/70
p-2
shadow-[0_10px_30px_rgba(120,90,20,0.08)]
"
>

    <ProductCard
  product={item.product}
  showFavorite={false}
  source="gift"

  giftTarget={{
    id: childId,
    fullName:
      child?.fullName || child?.name || "کودک",
}}
/>


    <button

      onClick={() =>
        toggleVisibility(item)
      }

      className={`
mt-3
rounded-2xl
py-3
text-xs
font-black
transition
shadow-sm

${
item.showInGiftGame
?
"bg-green-50 text-green-700 border border-green-200"
:
"bg-gray-50 text-gray-600 border border-gray-200"
}

`}
    >

      {
        item.showInGiftGame
        ?
        "🟢 نمایش برای دوستان ژنینو"
        :
        "🔒 خصوصی"
      }


    </button>


    <button

  onClick={() =>
    removeFavorite(item)
  }

  className="
mt-2
rounded-2xl
border
border-red-100
bg-red-50
py-3
text-xs
font-black
text-red-600
transition
hover:bg-red-100
"

>

🗑 حذف از علاقه‌مندی کودک

</button>


  </div>

))
}


        </div>

        )

      }


    </main>

  );

}