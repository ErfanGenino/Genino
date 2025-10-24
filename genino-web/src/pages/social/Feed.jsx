// 📄 src/pages/social/Feed.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, PlusCircle, MessageSquare, Heart, Baby, User, X } from "lucide-react";
import GoldenDivider from "../../components/GoldenDivider.jsx";
import ChatRoom from "./ChatRoom.jsx";

export default function Feed() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([
    {
      id: "public",
      title: "اتاق عمومی",
      desc: "گفت‌وگو آزاد بین کاربران ژنینو",
      color: "bg-green-50",
      icon: <MessageSquare size={42} className="text-green-500" />,
    },
    {
      id: "kids",
      title: "کودکان",
      desc: "رشد، بازی و آموزش کودک",
      color: "bg-yellow-50",
      icon: <Baby size={42} className="text-yellow-500" />,
    },
    {
      id: "women",
      title: "بانوان",
      desc: "موضوعات مربوط به بانوان و مادران",
      color: "bg-pink-50",
      icon: <Heart size={42} className="text-pink-400" />,
    },
    {
      id: "men",
      title: "آقایان",
      desc: "گفت‌وگوهای ویژه آقایان",
      color: "bg-blue-50",
      icon: <User size={42} className="text-blue-500" />,
    },
  ]);

  const handleCreateRoom = () => {
    const name = prompt("نام اتاق جدید را وارد کنید:");
    if (!name) return;
    const newRoom = {
      id: Date.now().toString(),
      title: name,
      desc: "اتاق ساخته‌شده توسط کاربر",
      color: "bg-gray-50",
      icon: <MessageSquare size={42} className="text-gray-500" />,
    };
    setRooms([...rooms, newRoom]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50 pt-20 pb-16 px-6 relative">
      {/* 🔹 عنوان اصلی */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-yellow-600 mb-3"
        >
          شبکه اجتماعی ژنینو 🌿
        </motion.h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          وارد یکی از اتاق‌های گفتگو شو یا اتاق خودت رو بساز 💛
        </p>
      </div>

      {/* 🧱 کارت‌ها */}
      <div className="flex justify-center items-center gap-6 flex-wrap mb-8">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={() => setActiveRoom(room)}
            className={`${room.color} cursor-pointer group relative rounded-3xl p-7 w-[250px] 
                        border border-transparent hover:border-yellow-300 transition-all duration-300 
                        shadow-sm hover:shadow-lg text-center`}
          >
            <div className="mb-4 flex justify-center">{room.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">{room.title}</h2>
            <p className="text-gray-500 text-sm mb-3">{room.desc}</p>
            <div className="flex items-center justify-center gap-1 text-yellow-600 text-xs font-medium">
              <Users size={14} />
              <span>۱۲ نفر آنلاین</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✨ جداکننده طلایی */}
      <GoldenDivider width="w-48" margin="my-12" />

      {/* 🟡 دکمه ساخت اتاق جدید */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center mt-8"
      >
        <button
          onClick={handleCreateRoom}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-7 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all"
        >
          <PlusCircle size={20} className="opacity-90" />
          ساخت اتاق جدید
        </button>
      </motion.div>

      {/* 🌟 پنجره چت */}
      <AnimatePresence>
        {activeRoom && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative bg-white rounded-3xl shadow-xl w-[90%] max-w-3xl h-[80vh] overflow-hidden border border-yellow-200"
            >
              {/* دکمه بستن */}
              <button
                onClick={() => setActiveRoom(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
              >
                <X size={20} />
              </button>

              {/* چت روم داخل */}
              <ChatRoom room={activeRoom} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
