import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function FamilyFinance() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 relative overflow-hidden">
      {/* 🔹 نماد دلار چرخان */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute top-20"
      >
        <DollarSign className="w-20 h-20 text-yellow-500 opacity-80" />
      </motion.div>

      {/* 🔸 متن اصلی */}
      <div className="text-center z-10">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          💰 اقتصاد و حسابداری خانواده
        </h1>
        <p className="text-gray-600 text-lg mb-2">به زودی راه‌اندازی می‌شود</p>
        <p className="text-yellow-500 font-semibold text-2xl tracking-wider">
          Coming Soon...
        </p>
      </div>
    </main>
  );
}
