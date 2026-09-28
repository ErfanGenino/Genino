// D:\projects\Genino\genino-web\src\pages\favorites\FavoriteChildProductsPage.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../../components/Product/ProductCard";
import {
  getPublicChildFavoriteProducts,
  getFollowedGeninoChildren,
  getGeninoChildren,
} from "../../services/api";



export default function FavoriteChildProductsPage(){


  const [searchParams] = useSearchParams();

  const childId =
    searchParams.get("childId");



  const [products,setProducts] = useState([]);

  const [child,setChild] = useState(null);

  const [loading,setLoading] = useState(true);



  // محصولات مورد علاقه کودک
  useEffect(()=>{


    if(!childId) return;


    async function loadProducts(){

      try{

        const res =
          await getPublicChildFavoriteProducts(
            childId
          );


        if(res?.ok){

          setProducts(
            res.products || []
          );

        }


      }catch(error){

        console.error(
          "LOAD CHILD FAVORITES ERROR",
          error
        );

      }

    }


    loadProducts();


  },[childId]);





  // اطلاعات کودک
  useEffect(()=>{


    if(!childId) return;


    async function loadChild(){


      try{


        // اول بین کودکانی که کاربر فالو کرده جستجو می‌کنیم
const followedRes =
  await getFollowedGeninoChildren();

const followedChildren =
  Array.isArray(followedRes)
    ? followedRes
    : followedRes?.children || [];

let found =
  followedChildren.find(
    (c) =>
      String(c.id) === String(childId)
  );


// اگر بین فالوها نبود، ممکن است کودک خود کاربر باشد
if (!found) {

  const allChildrenRes =
    await getGeninoChildren();

  const allChildren =
    Array.isArray(allChildrenRes)
      ? allChildrenRes
      : allChildrenRes?.children || [];

  found =
    allChildren.find(
      (c) =>
        String(c.id) === String(childId)
    );

}


// اطلاعات کودک را برای هدر و ارسال هدیه ذخیره می‌کنیم
if (found) {

  setChild(found);

}



      }catch(error){


        console.error(
          "LOAD CHILD INFO ERROR",
          error
        );


      }
      finally{

        setLoading(false);

      }


    }


    loadChild();


  },[childId]);






  if(loading){


    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#f7f2eb]
        text-yellow-800
        font-bold
        "
      >

        در حال آماده‌سازی علاقه‌مندی‌های کودک...

      </div>

    );


  }






  return (

    <div
      dir="rtl"
      className="
      min-h-screen
      bg-[#f7f2eb]
      px-4
      py-8
      "
    >


      <div
        className="
        mx-auto
        max-w-6xl
        "
      >




        {/* 🌟 هدر کودک */}

        <motion.div

          initial={{
            opacity:0,
            y:-20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          className="
          mb-8
          rounded-[2rem]
          bg-white/80
          backdrop-blur-xl
          border
          border-yellow-100
          shadow-[0_15px_45px_rgba(255,190,0,0.16)]
          p-6
          text-center
          "

        >



          {/* تصویر کودک */}

          <div
            className="
            mx-auto
            w-28
            h-28
            rounded-full
            p-1
            bg-gradient-to-br
            from-yellow-300
            via-amber-300
            to-yellow-600
            shadow-lg
            mb-5
            "
          >

            <div
              className="
              w-full
              h-full
              rounded-full
              overflow-hidden
              bg-white
              flex
              items-center
              justify-center
              "
            >


              {
                child?.photo ? (

                  <img
                    src={child.photo}
                    alt={child.fullName}
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />

                ):(

                  <span
                    className="
                    text-5xl
                    "
                  >
                    👶
                  </span>

                )

              }


            </div>


          </div>





          <h1
            className="
            text-2xl
            font-black
            text-yellow-900
            "
          >

            ❤️ علاقه‌مندی‌های {child?.fullName || "کودک"}

          </h1>




          <p
            className="
            mt-3
            text-sm
            text-gray-500
            leading-7
            "
          >

            کالاهایی که {child?.fullName || "این کودک"} دوست دارد
            و می‌تواند یک هدیه زیبا برای او باشد 🎁

          </p>



        </motion.div>








        {
          products.length === 0 ? (


            <div
              className="
              rounded-[2rem]
              bg-white
              p-10
              text-center
              shadow-sm
              "
            >


              <Gift
                size={50}
                className="
                mx-auto
                mb-5
                text-yellow-600
                "
              />


              <p
                className="
                font-bold
                text-gray-600
                "
              >

                هنوز کالایی به علاقه‌مندی‌های این کودک اضافه نشده است.

              </p>


            </div>


          ) : (



            <div
              className="
              rounded-[2rem]
              bg-white
              p-4
              md:p-6
              shadow-sm
              "
            >


              <div
                className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                gap-4
                "
              >



              {
                products.map((product,index)=>(


                  <motion.div

                    key={product.id}

                    initial={{
                      opacity:0,
                      y:20
                    }}

                    animate={{
                      opacity:1,
                      y:0
                    }}

                    transition={{
                      delay:index * 0.05
                    }}

                  >


<ProductCard
product={product}
showFavorite={false}
source="gift"
giftTarget={child}
/>


                  </motion.div>


                ))
              }



              </div>

            </div>


          )
        }





      </div>



    </div>

  );


}