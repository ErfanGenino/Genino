import { motion } from "framer-motion";
import {
  HeartPulse,
  UserRound,
  Stethoscope,
  Salad,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer.jsx";


export default function GeninoHealth() {

  const navigate = useNavigate();


  const healthItems = [
    {
      title: "سلامت بانوان",
      desc: "پیگیری سلامت، چرخه بدن و مراقبت‌های اختصاصی بانوان",
      icon: HeartPulse,
      link: "/my-cycle",
    },
    {
      title: "سلامت آقایان",
      desc: "بررسی وضعیت جسمی، ذهنی و هورمونی آقایان",
      icon: UserRound,
      link: "/my-men-health",
    },
    {
      title: "پزشک من",
      desc: "مدیریت پرونده پزشکی، نسخه‌ها و آزمایش‌ها",
      icon: Stethoscope,
      link: "/my-doctor",
    },
    {
      title: "کالری شمار",
      desc: "تغذیه سالم و مدیریت سبک زندگی",
      icon: Salad,
      link: "/calorie-tracker",
    },
    {
      title: "فروشگاه سلامت و پزشکی",
      desc: "محصولات سلامت، پزشکی و مراقبتی منتخب ژنینو",
      icon: ShoppingBag,
      link: "/shop?category=سلامت و پزشکی",
    },
  ];


  return (
    <main
      className="
      min-h-screen
      bg-gradient-to-b
      from-[#f7f2eb]
      to-[#fffdf8]
      px-6
      py-10
      text-gray-800
      "
    >


      <div className="max-w-4xl mx-auto text-center">


        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
        >

          <h1
          className="
          text-3xl
          font-black
          text-yellow-700
          "
          >
            سلامت با ژنینو
          </h1>


          <p
          className="
          mt-3
          text-gray-500
          leading-8
          "
          >
            همراه هوشمند شما برای مراقبت از سلامت جسم و زندگی بهتر
          </p>


        </motion.div>



        <div
        className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-5
        "
        >

        {healthItems.map((item,index)=>{

          const Icon=item.icon;

          return (

          <motion.button
          key={index}
          onClick={()=>navigate(item.link)}
          whileHover={{
            scale:1.03
          }}
          whileTap={{
            scale:.97
          }}

          className="
          rounded-3xl
          bg-white/80
          backdrop-blur
          border-2
          border-yellow-200
          p-6
          shadow-md
          text-center
          "
          >

            <div
            className="
            mx-auto
            w-16
            h-16
            rounded-2xl
            bg-gradient-to-br
            from-yellow-400
            to-yellow-600
            flex
            items-center
            justify-center
            text-white
            "
            >

              <Icon size={32}/>

            </div>


            <h2
            className="
            mt-4
            font-extrabold
            text-yellow-800
            "
            >
              {item.title}
            </h2>


            <p
            className="
            mt-2
            text-sm
            text-gray-500
            leading-6
            "
            >
              {item.desc}
            </p>


          </motion.button>

          )

        })}


        </div>

      </div>


      <Footer />

    </main>
  );
}