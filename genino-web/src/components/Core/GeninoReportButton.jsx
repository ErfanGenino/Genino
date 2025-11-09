// 📄 src/components/Core/GeninoReportButton.jsx
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function GeninoReportButton({ onClick, label = "مشاهده گزارش‌ها" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex items-center gap-2 bg-white border-2 border-genino-500 text-genino-700 
                 font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]
                 transition-all duration-300"
    >
      <FileText className="w-5 h-5 text-genino-600" />
      {label}
    </motion.button>
  );
}
