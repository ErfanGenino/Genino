// src/components/Product/ProductFavoriteButton.jsx

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { createPortal } from "react-dom";
import { useFavoriteProducts } from "../../context/FavoriteProductsContext";
import FavoriteTargetModal from "./FavoriteTargetModal";
import {
  getChildFavoriteProductStatus,
} from "../../services/api";


export default function ProductFavoriteButton({
  productId,
}) {

const vendorId =
  localStorage.getItem("genino_vendor_id");

if(vendorId){
  return null;
}


  const {
    isFavorite,
  } = useFavoriteProducts();



  const [openModal,setOpenModal] = useState(false);
  const [childLiked,setChildLiked] = useState(false);



  const userLiked =
    isFavorite(productId);


  const [, forceUpdate] = useState(0);


useEffect(() => {

  function refreshFavorite(){

    forceUpdate(prev => prev + 1);

}


  window.addEventListener(
    "favorite_changed",
    refreshFavorite
  );


  return () => {

    window.removeEventListener(
      "favorite_changed",
      refreshFavorite
    );

  };


},[]);

useEffect(()=>{


async function loadChildStatus(){

try{

const res =
await getChildFavoriteProductStatus(productId);


console.log(
 "CHILD FAVORITE STATUS:",
 res
);


if(res?.ok){

setChildLiked(
  res.children?.length > 0
);

}


}catch(error){

console.error(
"LOAD CHILD FAVORITE STATUS ERROR:",
error
);

}


}


loadChildStatus();



function refreshChildFavorite(){

  loadChildStatus();

}


window.addEventListener(
  "favorite_changed",
  refreshChildFavorite
);



return ()=>{

window.removeEventListener(
  "favorite_changed",
  refreshChildFavorite
);

};


},[productId]);



  let color =
    "text-gray-300";



  if(userLiked){

    color =
    "text-red-500 fill-red-500";

  }

  else if(childLiked){

    color =
    "text-blue-500 fill-blue-500";

  }




  return (

    <>

    <button

    type="button"

    onClick={(e)=>{

      e.preventDefault();

      e.stopPropagation();

      setOpenModal(true);

    }}


    className="
    absolute
    left-3
    top-3
    z-[999]
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    bg-white/90
    shadow
    "

    >


      <Heart

      className={`
      h-5
      w-5
      transition
      ${color}
      `}

      />


    </button>



{
openModal &&

createPortal(

<FavoriteTargetModal

productId={productId}

open={true}

onSaved={()=>{

window.dispatchEvent(
 new Event("favorite_changed")
);

}}

onClose={()=>{

setOpenModal(false);

}}

/>,

document.body

)

}


    </>

  );

}