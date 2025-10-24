import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Image, Paperclip, Smile } from "lucide-react";

export default function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // اسکرول خودکار به پایین پیام‌ها
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // افزودن پیام جدید
  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: "شما",
      text: input,
      time: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  // کاربران آنلاین (نمایشی فعلاً)
  const onlineUsers = [
    { name: "فرناز", active: true },
    { name: "هنا", active: true },
    { name: "عباس", active: false },
    { name: "شادی", active: true },
  ];

  return (
    <main className="h-full flex flex-col bg-gradient-to-b from-white to-yellow-50/60">
      {/* 🔸 هدر اتاق */}
      <div className="flex items-center justify-between border-b border-yellow-200 p-4">
        <div>
          <h1 className="text-lg font-semibold text-yellow-700">
            {room?.title || "اتاق گفتگو"}
          </h1>
          <p className="text-xs text-gray-500">
            {room?.desc || "به گفتگو بپیوند 🌿"}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-yellow-600 font-medium">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>۱۲ نفر آنلاین</span>
        </div>
      </div>

      {/* 🗨️ بخش پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            هنوز پیامی در این اتاق نیست 🌿
          </p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.user === "شما"
                  ? "bg-yellow-100 text-gray-800 self-end ml-auto"
                  : "bg-white text-gray-700 border border-gray-100"
              }`}
            >
              <p className="font-medium text-yellow-700 mb-1">{msg.user}</p>
              <p>{msg.text}</p>
              <span className="text-[10px] text-gray-400">{msg.time}</span>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ✏️ نوار نوشتن پیام */}
      <div className="border-t border-yellow-200 p-3 flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-yellow-100">
          <Smile size={20} className="text-yellow-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-yellow-100">
          <Image size={20} className="text-yellow-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-yellow-100">
          <Paperclip size={20} className="text-yellow-600" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="پیامت را بنویس..."
          className="flex-1 bg-white border border-yellow-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-xl px-4 py-2 flex items-center gap-1 shadow-md hover:from-yellow-600 hover:to-yellow-500"
        >
          <Send size={18} />
          ارسال
        </motion.button>
      </div>
    </main>
  );
}
