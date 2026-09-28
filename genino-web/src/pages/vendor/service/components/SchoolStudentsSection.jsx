// src/pages/vendor/service/components/SchoolStudentsSection.jsx

import { useEffect, useMemo, useState } from "react";
import {
  searchVendorChildren,
  getVendorChildren,
  addVendorChild,
  removeVendorChild,
} from "../../../../services/api";

import {
  Baby,
  Check,
  Search,
  Award
} from "lucide-react";



function normalizeChild(child){

  const parents =
    child.admins
    ?.filter(
      a =>
      a.role === "father" ||
      a.role === "mother"
    )
    ?.map(
      a =>
      `${a.user.firstName} ${a.user.lastName}`
    )
    .join("، ") || "";


  return {
    ...child,

    parentNames: parents,

  };

}




export default function SchoolStudentsSection({

  selectedStudents=[],
  onChange,
  onGiveAchievement

}){


const [activeTab,setActiveTab] =
useState("school");


const [allChildren,setAllChildren] =
useState([]);


const [schoolStudents,setSchoolStudents] =
useState(selectedStudents);


const [query,setQuery] =
useState("");


const [loading,setLoading] =
useState(false);





useEffect(()=>{

setSchoolStudents(selectedStudents);

},[selectedStudents]);





/*
 دریافت همه کودکان ژنینویی
*/
useEffect(()=>{


if(activeTab !== "all")
return;


async function loadChildren(){

try{

setLoading(true);


const res =
await searchVendorChildren("");



if(res?.ok){

setAllChildren(
(res.children || [])
.map(normalizeChild)
);

}


}catch(error){

console.error(
"LOAD GENINO CHILDREN ERROR",
error
);


}
finally{

setLoading(false);

}

}


loadChildren();


},[activeTab]);







/*
 لیست دانش‌آموزان مدرسه
*/
useEffect(() => {

  async function loadSchoolStudents() {

    try {

      const res =
        await getVendorChildren();

      if (res?.ok) {

        const students =
          (res.children || [])
            .filter(
              item =>
                item.relationType === "STUDENT"
            )
            .map(
              item =>
                normalizeChild(
                  item.child
                )
            );

        setSchoolStudents(
          students
        );

        onChange?.(
          students
        );
      }

    } catch (error) {

      console.error(
        "LOAD SCHOOL STUDENTS ERROR",
        error
      );

    }

  }

  loadSchoolStudents();

}, []);








const filteredChildren =
useMemo(()=>{


if(!query.trim())
return allChildren;



return allChildren.filter(
child =>
child.fullName
?.includes(query)
);


},[
query,
allChildren
]);








const displayList =
activeTab==="school"
?
schoolStudents
:
filteredChildren;








async function toggleChild(child){



const exists =
schoolStudents.some(
item =>
item.id===child.id
);



try{


// حذف

if(exists){


const res =
await removeVendorChild(
child.id
);



if(res?.ok){


const updated =
schoolStudents.filter(
item =>
item.id!==child.id
);


setSchoolStudents(
updated
);


onChange(
updated
);


}



return;


}





// اضافه

const res =
await addVendorChild(
child.id,
"STUDENT"
);



if(res?.ok){


const updated = [

...schoolStudents,

child

];


setSchoolStudents(
updated
);


onChange(
updated
);


}




}catch(error){

console.error(
"TOGGLE SCHOOL STUDENT ERROR",
error
);

}



}









return (


<section

className="
rounded-3xl
bg-yellow-50
p-4
"

>


<h3

className="
mb-4
font-black
text-[#6f4a18]
"

>

انتخاب دانش‌آموزان مدرسه

</h3>





{/* Tabs */}

<div

className="
mb-4
grid
grid-cols-2
gap-2
rounded-2xl
bg-white
p-1
"

>


<button

onClick={()=>
setActiveTab("school")
}

className={`
rounded-xl
py-2
text-xs
font-black

${
activeTab==="school"
?
"bg-yellow-100 text-yellow-800"
:
"text-gray-400"
}

`}

>

دانش‌آموزان این مدرسه

</button>




<button

onClick={()=>
setActiveTab("all")
}

className={`
rounded-xl
py-2
text-xs
font-black

${
activeTab==="all"
?
"bg-yellow-100 text-yellow-800"
:
"text-gray-400"
}

`}

>

همه کودکان ژنینویی

</button>



</div>






{/* Search */}

<div

className="
relative
mb-4
"

>

<Search

className="
absolute
right-3
top-1/2
h-4
w-4
-translate-y-1/2
text-gray-400
"

/>


<input

value={query}

onChange={
e=>setQuery(e.target.value)
}

placeholder="
جستجوی کودک ژنینویی
"

className="
h-10
w-full
rounded-xl
border
bg-white
pr-10
px-3
text-sm
"

/>


</div>







{
loading &&

<p
className="
text-center
text-xs
text-gray-400
"
>
در حال دریافت اطلاعات...
</p>

}








<div

className="
max-h-[450px]
space-y-2
overflow-y-auto
"

>


{
displayList.map(child=>{


const checked =
schoolStudents.some(
item =>
item.id===child.id
);



return (


<div
  key={child.id}
  className="
    relative
    flex
    items-center
    gap-2
    overflow-hidden
    rounded-2xl
    border
    border-yellow-100
    bg-white
    p-3
    shadow-sm
    transition-all
    duration-300
    hover:border-yellow-300
    hover:shadow-md
  "
>

  {/* دکمه انتخاب یا حذف دانش‌آموز */}
  <button
    type="button"
    onClick={() =>
      toggleChild(child)
    }
    className={`
      flex
      h-6
      w-6
      shrink-0
      items-center
      justify-center
      rounded-lg
      border

      ${
        checked
          ? "bg-green-600 border-green-600 text-white"
          : "bg-white border-gray-300"
      }
    `}
  >

    {
      checked &&
      <Check
        className="h-4 w-4"
      />
    }

  </button>


  {/* تصویر کودک */}
  <div
    className="
      flex
      h-12
      w-12
      shrink-0
      items-center
      justify-center
      overflow-hidden
      rounded-xl
      border
      border-yellow-100
      bg-yellow-100
    "
  >

    {
      child.photo
        ?

        <img
          src={child.photo}
          alt={child.fullName || "دانش‌آموز"}
          className="
            h-full
            w-full
            object-cover
          "
        />

        :

        <Baby
          className="
            h-6
            w-6
            text-yellow-700
          "
        />
    }

  </div>


  {/* نام و والدین */}
  <div
    className="
      min-w-0
      flex-1
    "
  >

    <p
      className="
        truncate
        text-sm
        font-black
        text-stone-900
      "
    >
      {child.fullName}
    </p>


    <p
      className="
        mt-1
        line-clamp-2
        text-[10px]
        leading-5
        text-gray-500
        sm:text-[11px]
      "
    >

      والدین:
      {" "}
      {
        child.parentNames ||
        "ثبت نشده"
      }

    </p>

  </div>


  {/* اهدای دستاورد فقط برای دانش‌آموزان مدرسه */}
  {
    activeTab === "school" &&

    <button
      type="button"
      onClick={() =>
        onGiveAchievement?.(child)
      }
      className="
        group
        relative
        flex
        shrink-0
        items-center
        justify-center
        gap-1
        overflow-hidden
        rounded-xl
        border
        border-[#d4af37]
        bg-gradient-to-l
        from-[#fff3bd]
        via-[#f1d36b]
        to-[#d4af37]
        px-2
        py-2.5
        text-[9px]
        font-black
        whitespace-nowrap
        text-[#6f4a18]
        shadow-[0_6px_16px_rgba(212,175,55,0.25)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_9px_22px_rgba(212,175,55,0.4)]
        active:scale-[0.97]
        sm:gap-1.5
        sm:px-4
        sm:text-xs
      "
    >

      <span
        className="
          pointer-events-none
          absolute
          -left-3
          -top-4
          h-8
          w-8
          rounded-full
          bg-white/70
          blur-md
        "
      />

      <Award
        className="
          relative
          z-10
          h-4
          w-4
          shrink-0
        "
      />

      <span className="relative z-10">
        اهدای دستاورد
      </span>

    </button>
  }

</div>


)


})

}


</div>






<div

className="
mt-4
rounded-xl
bg-white
p-3
text-center
text-xs
font-bold
text-yellow-800
"

>

تعداد دانش‌آموزان مدرسه:
{" "}
{schoolStudents.length}
{" "}
نفر

</div>





</section>


)

}