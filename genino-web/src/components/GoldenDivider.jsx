// 📄 src/components/GoldenDivider.jsx
import { motion } from "framer-motion";

export default function GoldenDivider({ width = "w-32", margin = "my-10" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6 }}
      className={`${width} h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full mx-auto ${margin}`}
    ></motion.div>
  );
}
