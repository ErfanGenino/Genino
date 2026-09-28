// src/components/Product/FavoriteTargetModal.jsx

import { useEffect, useState } from "react";
import {
  getMyChildren,
  saveChildFavoriteProduct,
  removeChildFavoriteProduct,
  getChildFavoriteProductStatus,
  getUserProfile,
} from "../../services/api";
import { useFavoriteProducts } from "../../context/FavoriteProductsContext";
import { useNavigate } from "react-router-dom";


export default function FavoriteTargetModal({
  productId,
  open,
  onClose,
  onSaved,
}) {

  const vendorId =
 localStorage.getItem("genino_vendor_id");

useEffect(()=>{
 if(vendorId){
   onClose();
 }
},[]);

  const [children, setChildren] = useState([]);
  const [selectedSelf, setSelectedSelf] = useState(false);
  const [selectedChildren, setSelectedChildren] = useState({});
  const [initialSelectedChildren, setInitialSelectedChildren] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [showAddressModal,setShowAddressModal] = useState(false);
  const [defaultAddress,setDefaultAddress] = useState(null);
  


  const {
    isFavorite,
    toggleFavorite,
  } = useFavoriteProducts();



  useEffect(() => {

    if (!open) return;


    async function loadData(){
      setSelectedChildren({});

      try {

        const res = await getMyChildren();


        if(Array.isArray(res)){
          setChildren(res);
        }

        else if(Array.isArray(res?.children)){
          setChildren(res.children);
        }

        else if(Array.isArray(res?.data)){
          setChildren(res.data);
        }


      } catch(error){

        console.error(
          "LOAD CHILDREN ERROR:",
          error
        );

      }


      setSelectedSelf(
        isFavorite(productId)
      );

      const childStatus =
  await getChildFavoriteProductStatus(productId);


if(childStatus?.ok){

  const selected = {};


  childStatus.children.forEach(childId=>{

    selected[childId] = true;

  });


  setSelectedChildren(selected);

  setInitialSelectedChildren(selected);

}


    }


    loadData();


  },[open, productId]);




  function toggleChild(childId){

    setSelectedChildren(prev=>({

      ...prev,

      [childId]:
        !prev[childId],

    }));

  }


async function checkGiftAddress(){
  try{
    const res =
      await getUserProfile();
    if(!res?.ok){
      return;
    }
    const addresses =
      Array.isArray(res.user?.addresses)
      ? res.user.addresses
      : [];
    const address =
      addresses.find(
        item => item.isDefault
      )
      ||
      addresses[0];
    if(!address){
      setDefaultAddress(null);
    }
    else{
      setDefaultAddress(address);
    }
    setShowAddressModal(true);
  }catch(error){
    console.error(
      "CHECK ADDRESS ERROR",
      error
    );
  }
}


  async function handleSave(){


    try {

      setSaving(true);



      // علاقه مندی خود کاربر

      const userLiked =
        isFavorite(productId);



      if(selectedSelf !== userLiked){

  await toggleFavorite(productId);

}




      // علاقه مندی کودکان

      for(const child of children){


  const before =
    initialSelectedChildren[child.id];


  const after =
    selectedChildren[child.id];



  // اضافه شدن جدید

  if(after && !before){

    await saveChildFavoriteProduct(
      child.id,
      productId
    );

  }



  // حذف شدن

  if(!after && before){

    await removeChildFavoriteProduct(
      child.id,
      productId
    );

  }


}

      if(onSaved){
        onSaved();
      }


      onClose();



    } catch(error){

      console.error(
        "SAVE FAVORITE ERROR:",
        error
      );

    }
    finally{

      setSaving(false);

    }


  }





  if(!open){
    return null;
  }




  return (

<div
className="
fixed
inset-0
z-[99999]
flex
items-center
justify-center
bg-black/40
"
dir="rtl"
>


<div
className="
w-[90%]
max-w-md
rounded-3xl
bg-white
p-6
shadow-2xl
"
>


<h3
className="
mb-5
text-lg
font-black
text-gray-800
"
>
کالا مورد علاقه برای:
</h3>

<button

onClick={()=>setSelectedSelf(prev=>!prev)}
className="
mb-3
flex
w-full
items-center
justify-between
rounded-2xl
bg-yellow-50
p-4
font-bold
"
>
<span>
خودم
</span>
<span>
{
selectedSelf
?
"❤️"
:
"♡"
}
</span>
</button>

{
children.map(child=>(
<button
key={child.id}
onClick={()=>toggleChild(child.id)}
className="
mb-3
flex
w-full
items-center
justify-between
rounded-2xl
bg-blue-50
p-4
font-bold
"
>
<span>
{child.fullName || child.name}
</span>
<span>
{
selectedChildren[child.id]
?
"❤️"
:
"♡"
}
</span>
</button>
))
}




<button
disabled={saving}
onClick={async()=>{
const hasNewFavorite =
 selectedSelf ||
 Object.values(selectedChildren)
 .some(Boolean);


const hasExistingFavorite =
 isFavorite(productId) ||
 Object.values(initialSelectedChildren)
 .some(Boolean);
// فقط اگر قرار است علاقه‌مندی جدید ثبت شود، آدرس لازم داریم
if(hasNewFavorite){
  await checkGiftAddress();
}
else{
  // حذف کامل علاقه‌مندی‌ها
  await handleSave();
}
}}

className="
mt-4
w-full
rounded-2xl
bg-[#d4af37]
py-3
font-black
text-white
"

>

{
saving
?
"در حال ثبت..."
:
"ثبت علاقه‌مندی"
}

</button>



<button

onClick={onClose}

className="
mt-3
w-full
rounded-2xl
bg-gray-100
py-3
font-bold
"

>
بستن
</button>



</div>

{
showAddressModal && (

<div
className="
fixed
inset-0
z-[100000]
flex
items-center
justify-center
bg-black/50
"
>


<div
className="
w-[90%]
max-w-md
rounded-3xl
bg-white
p-6
text-center
shadow-2xl
"
>


<h3
className="
text-lg
font-black
text-yellow-800
mb-4
"
>

🎁 آدرس دریافت هدیه

</h3>



{
defaultAddress ? (

<>

<p
className="
text-sm
text-gray-600
leading-7
"
>

برای اینکه دوستان و خانواده شما بتوانند
برای شما یا فرزندتان هدیه ارسال کنند،
ژنینو از این آدرس استفاده خواهد کرد.

</p>


<div
className="
my-4
rounded-2xl
bg-yellow-50
p-4
text-sm
font-bold
"
>

📍 {defaultAddress.address}

</div>


<p
className="
text-sm
font-bold
text-gray-700
mb-4
"
>
آیا این آدرس مورد تأیید شماست؟
</p>
<button
onClick={()=>{
setShowAddressModal(false);
handleSave();
}}
className="
w-full
rounded-2xl
bg-[#d4af37]
py-3
font-black
text-white
"
>
تایید آدرس
</button>

<button
onClick={()=>{
navigate(
"/social/profile?section=addresses"
);
}}
className="
mt-3
w-full
rounded-2xl
bg-yellow-50
py-3
font-bold
text-yellow-800
"
>
ویرایش آدرس
</button>
</>
)
:
(

<>

<p
className="
text-sm
text-gray-600
leading-7
"
>

شما هنوز آدرسی در ژنینو ثبت نکرده‌اید.

برای اینکه دوستان و خانواده بتوانند
برای شما یا فرزندتان هدیه ارسال کنند،
ابتدا باید آدرس دریافت هدیه را ثبت کنید.

</p>


<button

onClick={()=>{

navigate(
"/social/profile?section=addresses"
);

}}

className="
mt-5
w-full
rounded-2xl
bg-[#d4af37]
py-3
font-black
text-white
"

>

ثبت آدرس

</button>

</>
)
}
<button
onClick={()=>setShowAddressModal(false)}
className="
mt-3
w-full
rounded-2xl
bg-gray-100
py-3
font-bold
"
>
انصراف
</button>
</div>
</div>
)
}

</div>
  );
}