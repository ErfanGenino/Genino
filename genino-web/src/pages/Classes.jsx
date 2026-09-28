// src/pages/Classes.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EducationCard from "../components/Classes/EducationCard";


export default function Classes() {

  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:80/api";


  useEffect(() => {

    async function loadClasses(){

      try {

        const res = await fetch(
          `${API_BASE_URL}/vendor-services/public/classes`
        );

        const data = await res.json();


        if(data.ok){

          setClasses(
  data.services || []
);



        }


      } catch(err){

        console.error(
          "خطا در دریافت کلاس‌ها:",
          err
        );

      } finally {

        setLoading(false);

      }

    }


    loadClasses();

  }, [API_BASE_URL]);



  const filteredClasses =
    classes.filter(item =>
      item.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
    );



return (

<main
dir="rtl"
className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-b
from-[#f8fff8]
via-white
to-[#f1f8f2]
px-3
sm:px-6
py-6
"
>


{/* بک گراند ظریف */}

<div
className="
absolute
top-20
right-10
w-48
h-48
bg-green-200/20
rounded-full
blur-3xl
"
/>


<div
className="
absolute
bottom-20
left-10
w-56
h-56
bg-yellow-200/20
rounded-full
blur-3xl
"
/>



<section
className="
relative
z-10
max-w-6xl
mx-auto
"
>


{/* عنوان */}

<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

className="
text-center
mb-6
"

>


<div
className="
mx-auto
mb-3
w-14
h-14
rounded-3xl
bg-gradient-to-br
from-green-400
to-emerald-600
flex
items-center
justify-center
text-white
shadow-lg
"
>

<BookOpen size={30}/>

</div>



<h1
className="
text-2xl
sm:text-4xl
font-black
text-green-800
"
>
کلاس‌ها و دوره‌های آموزشی ژنینو
</h1>


<p
className="
mt-2
text-sm
text-gray-500
"
>
مسیر رشد، خلاقیت و یادگیری کودکان شما
</p>


</motion.div>



{/* سرچ */}

<div
className="
max-w-xl
mx-auto
mb-6
relative
"
>

<Search
className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
"
size={18}
/>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="
جستجوی کلاس، مهارت یا آموزش...
"

className="
w-full
rounded-full
border
border-green-100
bg-white/80
backdrop-blur
py-3
pr-12
pl-4
text-sm
outline-none
shadow-sm
focus:ring-4
focus:ring-green-100
"

/>

</div>




{/* دسته ها */}

<div
className="
flex
justify-center
gap-2
flex-wrap
mb-8
"
>


{
[
"🎨 هنر",
"🎹 موسیقی",
"⚽ ورزش",
"🧠 مهارت ذهنی"
]
.map(
(item,index)=>(

<span
key={index}
className="
rounded-full
bg-white
border
border-green-100
px-4
py-2
text-xs
font-bold
text-green-700
shadow-sm
"
>
{item}
</span>

)
)

}


</div>




{/* کارت ها */}


{
loading ? (

<div
className="
text-center
text-gray-500
py-10
"
>
در حال دریافت کلاس‌ها...
</div>


)

:

filteredClasses.length===0 ? (

<div
className="
text-center
bg-white/80
rounded-3xl
py-10
text-gray-400
"
>
هنوز کلاس آموزشی منتشر نشده است.
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
gap-4
"
>


{
filteredClasses.map(service=>(

<motion.div

key={service.id}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.4
}}

>

<EducationCard
 service={service}
/>

</motion.div>


))

}


</div>

)

}



</section>


</main>


);

}