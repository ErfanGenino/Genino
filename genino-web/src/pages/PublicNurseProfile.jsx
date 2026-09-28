import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  MapPin,
  Phone,
  UserRound,
  Baby,
  ShieldCheck,
  FileCheck,
  BriefcaseBusiness,
} from "lucide-react";

import nurseDefaultImage from "../assets/nurse.png";


export default function PublicNurseProfile() {


  const { id } = useParams();
  const navigate = useNavigate();

  const [nurse, setNurse] = useState(null);

  const [loading, setLoading] = useState(true);



  const workLabelMap = {
    HOURLY:"پرستاری ساعتی",
    DAILY:"پرستاری روزانه",
    FIXED:"پرستاری ثابت",
  };



  useEffect(()=>{


    async function fetchNurse(){

      try{

        const token =
          localStorage.getItem("genino_token");


        const res =
          await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/nurses/public/${id}`,
            {
              headers:{
                Authorization:
                `Bearer ${token}`,
              },
            }
          );


        const data =
          await res.json();


        if(data.ok){

          setNurse(data.nurse);

        }

        console.log(
  "PUBLIC NURSE DATA:",
  data.nurse
);


      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);

      }


    }


    fetchNurse();


  },[id]);




  if(loading){

    return (

      <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#fffaf4]
      text-[#725a22]
      font-bold
      "
      >
        در حال بارگذاری پروفایل...
      </div>

    );

  }




  if(!nurse){

    return (

      <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#fffaf4]
      text-gray-500
      "
      >
        پروفایل پرستار پیدا نشد
      </div>

    );

  }





return (

<main
dir="rtl"
className="
min-h-screen
bg-[#fffaf4]
px-4
py-8
"
>


<section
className="
mx-auto
max-w-2xl
space-y-5
"
>

<button
type="button"
onClick={() => navigate("/child-nurses")}
className="
mb-2
flex
items-center
gap-2
rounded-full
bg-white
border
border-yellow-200
px-5
py-2
text-sm
font-bold
text-[#725a22]
shadow-sm
transition
hover:bg-yellow-50
"
>
→ بازگشت به لیست پرستاران
</button>



{/* Header */}

<div
className="
rounded-3xl
bg-white
p-6
shadow-sm
text-center
border
border-yellow-100
"
>


<div
className="
mx-auto
h-40
w-40
overflow-hidden
rounded-3xl
border-4
border-[#d4af37]
bg-[#fff8e7]
p-1
shadow-lg
shadow-yellow-200/50
"
>

<div
className="
h-full
w-full
overflow-hidden
rounded-2xl
"
>

<img

src={
nurse.avatarUrl ||
nurseDefaultImage
}

className="
h-full
w-full
object-cover
"

/>

</div>

</div>



<h1
className="
mt-5
text-2xl
font-black
text-[#725a22]
"
>

{nurse.fullName}

{nurse.age && (

<span
className="
text-base
text-gray-500
mr-2
"
>
({nurse.age} ساله)
</span>

)}

</h1>



<p
className="
mt-2
text-sm
font-bold
text-amber-600
"
>
پرستار کودک ژنینو
</p>


</div>






{/* اطلاعات تماس */}

<InfoCard
title="اطلاعات تماس"
icon={<Phone size={18}/>}
>


<Row
icon={<MapPin size={15}/>}
title="شهر"
value={nurse.city}
/>


<Row
icon={<MapPin size={15}/>}
title="منطقه"
value={nurse.district}
/>


<Row
icon={<Phone size={15}/>}
title="شماره تماس"
value={nurse.phone}
/>


</InfoCard>







{/* تجربه */}

<InfoCard
title="تجربه کاری"
icon={<BriefcaseBusiness size={18}/>}
>


<p
className="
leading-8
text-gray-600
text-sm
"
>
{nurse.experience || "-"}
</p>


</InfoCard>







{/* درباره */}

<InfoCard
title="درباره تجربه و علاقه"
icon={<UserRound size={18}/>}
>


<p
className="
leading-8
text-gray-600
text-sm
"
>
{nurse.bio || "-"}
</p>


</InfoCard>







{/* سنین */}

<InfoCard
title="تجربه با کودکان"
icon={<Baby size={18}/>}
>


<TagList
items={nurse.ages}
/>


</InfoCard>








{/* همکاری */}

<InfoCard
title="نوع همکاری"
icon={<BriefcaseBusiness size={18}/>}
>


<TagList

items={
nurse.workTypes?.map(
item =>
workLabelMap[item] || item
)
}

/>


</InfoCard>







{/* مهارت */}

<InfoCard
title="مهارت‌ها"
icon={<ShieldCheck size={18}/>}
>


<TagList
items={nurse.skills}
/>


</InfoCard>







{/* مدارک */}

<InfoCard
title="مشاهده مدارک شناسایی پرستار"
icon={<FileCheck size={18}/>}
>


<div
className="
space-y-3
text-sm
"
>


{
nurse.criminalRecordUrl &&

<DocumentLink
title="گواهی عدم سوءپیشینه"
url={nurse.criminalRecordUrl}
/>
}



{
nurse.nationalIdUrl &&

<DocumentLink
title="کارت ملی"
url={nurse.nationalIdUrl}
/>
}



{
nurse.birthCertificateUrl &&

<DocumentLink
title="شناسنامه"
url={nurse.birthCertificateUrl}
/>
}



{
nurse.certificatesUrl &&

<DocumentLink
title="گواهی دوره‌های آموزشی"
url={nurse.certificatesUrl}
/>
}



{
nurse.educationUrl &&

<DocumentLink
title="مدارک تحصیلی"
url={nurse.educationUrl}
/>
}



{
nurse.experienceDocUrl &&

<DocumentLink
title="مدرک سابقه کاری"
url={nurse.experienceDocUrl}
/>
}



</div>


</InfoCard>





</section>


</main>

);

}






function InfoCard({
title,
icon,
children
}){

return (

<div
className="
rounded-3xl
bg-white
p-5
shadow-sm
border
border-yellow-100
"
>

<div
className="
flex
items-center
gap-2
mb-4
font-black
text-[#725a22]
"
>

{icon}

{title}

</div>


{children}


</div>

)

}





function Row({
icon,
title,
value
}){

return (

<div
className="
flex
items-center
gap-3
py-2
text-sm
"
>

<span
className="
text-amber-600
"
>
{icon}
</span>


<span
className="
text-gray-500
"
>
{title}
</span>


<span
className="
font-bold
text-gray-700
"
>
{value || "-"}
</span>


</div>

)

}






function TagList({
items=[]
}){

return (

<div
className="
flex
flex-wrap
gap-2
"
>

{
items.map(item=>(

<span
key={item}
className="
rounded-full
bg-yellow-50
px-3
py-1
text-xs
font-bold
text-gray-600
"
>
{item}
</span>

))
}


</div>

)

}






function DocumentLink({
title,
url
}){

return (

<a

href={url}

target="_blank"

rel="noreferrer"

className="
block
rounded-2xl
bg-green-50
px-4
py-3
font-bold
text-green-700
"

>

✅ {title}

</a>

)

}