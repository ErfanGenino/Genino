// 📄 src/pages/ChildHealthCheck/BodyMetricsCheck.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "../../components/GeninoDNABackground";
import { ArrowRight } from "lucide-react";

export default function BodyMetricsCheck() {
  const navigate = useNavigate();

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-6 text-center drop-shadow-[0_0_12px_rgba(255,220,80,0.4)]"
        >
          پایش قد، وزن و BMI کودک
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl text-center text-gray-700 mb-12 leading-relaxed"
        >
          در این بخش می‌توانید قد، وزن و سن کودک را وارد کرده و شاخص توده بدنی (BMI) را مشاهده کنید.  
          این شاخص به شما کمک می‌کند رشد جسمی کودک را با استاندارد سنی مقایسه کنید.
        </motion.p>

        <motion.button
          onClick={() => navigate("/child-health-check")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 
                     text-white font-bold rounded-full shadow-[0_0_20px_rgba(255,220,80,0.6)]"
        >
          <ArrowRight className="w-5 h-5" />
          بازگشت به صفحه پایش سلامت کودک
        </motion.button>
      </main>
    </GeninoDNABackground>
  );
}

