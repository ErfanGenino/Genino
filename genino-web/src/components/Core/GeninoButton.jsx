// 📄 src/components/GeninoButton.jsx
import { motion } from "framer-motion";

export default function GeninoButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  );
}
