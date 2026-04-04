import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon, Smile } from "lucide-react";
import PrivateChat from "./PrivateChat";

export default function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const emojis = [
    "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊",
    "😋","😎","😍","😘","🥰","😗","😙","😚","🙂","🤗",
    "🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥",
    "😮","🤐","😯","😪","😫","🥱","😴","😌","😛","😜",
    "😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","☹️",
    "🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨",
    "😩","🤯","😬","😰","😱","🥵","🥶","😳","🤪","😵",
    "😡","😠","🤬","😷","🤒","🤕","🤢","🤮","🤧","😇",
    "🥳","🥺","🤠","🤡","👻","💀","☠️","👽","🤖","💩",
    "👍","👎","👏","🙌","🙏","🤝","💪","🔥","❤️","💔",
    "💖","💘","💝","💯","✨","⭐","🌟","🌿","🍀","🌸"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAddEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";

    setFilePreview({
      url,
      type,
    });
  };

  const handleSend = () => {
    if (!input.trim() && !filePreview) return;

    let newMessage;

    if (filePreview) {
      newMessage = {
        id: Date.now(),
        type: filePreview.type,
        file: filePreview.url,
        text: input.trim() || "",
        sender: "me",
        user: "شما",
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    } else {
      newMessage = {
        id: Date.now(),
        type: "text",
        text: input.trim(),
        sender: "me",
        user: "شما",
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    }

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setFilePreview(null);
    setShowEmoji(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setShowEmoji(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const onlineUsers = [
    { name: "فرناز", active: true },
    { name: "حنا", active: true },
    { name: "عرفان", active: false },
    { name: "شادی", active: true },
  ];

  if (!room) return null;

  return (
    <main className="h-full flex flex-col bg-gradient-to-b from-white to-yellow-50/60">
      {/* هدر */}
      <div className="border-b border-yellow-200 p-4 text-center relative">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-semibold text-yellow-700">
            {room?.title || "اتاق گفتگو"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {room?.desc || "به گفتگو بپیوند 🌿"}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-yellow-600 font-medium absolute left-4 top-1/2 -translate-y-1/2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>۱۲ نفر آنلاین</span>
        </div>
      </div>

      {/* کاربران */}
      <div className="p-2 flex gap-2 overflow-x-auto border-b border-yellow-100">
        {onlineUsers.map((u, i) => (
          <button
            key={i}
            onClick={() => setSelectedUser(u)}
            className="px-3 py-1 text-xs bg-yellow-100 rounded-full hover:bg-yellow-200 whitespace-nowrap"
          >
            {u.name}
          </button>
        ))}
      </div>

      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-6 text-sm">
            هنوز پیامی ارسال نشده
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-2 rounded-xl text-sm ${
              msg.sender === "me"
                ? "bg-yellow-100 ml-auto"
                : "bg-gray-100"
            }`}
          >
            {msg.type === "text" && <p className="whitespace-pre-wrap">{msg.text}</p>}

            {msg.type === "image" && (
              <>
                <img
                  src={msg.file}
                  alt="img"
                  className="rounded-xl max-h-40 mt-1"
                />
                {msg.text ? <p className="mt-2 whitespace-pre-wrap">{msg.text}</p> : null}
              </>
            )}

            {msg.type === "video" && (
              <>
                <video
                  src={msg.file}
                  controls
                  className="rounded-xl max-h-40 mt-1"
                />
                {msg.text ? <p className="mt-2">{msg.text}</p> : null}
              </>
            )}

            <span className="text-[10px] text-gray-400 block mt-1">
              {msg.time}
            </span>
          </div>
        ))}

        <div ref={messagesEndRef} />

        {/* preview فایل */}
        {filePreview && (
          <div className="absolute bottom-4 left-3 bg-white border border-yellow-200 rounded-xl p-2 shadow z-10">
            {filePreview.type === "image" ? (
              <img
                src={filePreview.url}
                alt="preview"
                className="h-20 rounded-lg"
              />
            ) : (
              <video
                src={filePreview.url}
                className="h-20 rounded-lg"
              />
            )}
          </div>
        )}

        {/* پنجره ایموجی */}
        {showEmoji && (
          <div
            ref={emojiRef}
            className="absolute bottom-4 right-3 bg-white border border-yellow-200 rounded-xl p-2 shadow flex flex-wrap gap-2 w-52 max-h-40 overflow-y-auto z-10"
          >
            {emojis.map((e, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddEmoji(e)}
                className="text-lg hover:scale-125 transition"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ورودی */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-yellow-200 p-3 flex gap-2 items-center"
      >
        {/* دکمه فایل */}
        <label className="p-2 rounded-lg hover:bg-yellow-100 cursor-pointer">
          <ImageIcon size={20} className="text-yellow-600" />
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* دکمه ایموجی */}
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-yellow-100"
        >
          <Smile size={20} className="text-yellow-600" />
        </button>

        {/* input متن */}
        <textarea
           ref={inputRef}
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyDown={(e) => {
           if (e.key === "Enter" && !e.shiftKey) {
           e.preventDefault();
           handleSend();
          }
          }}
           placeholder="پیام در اتاق..."
           rows={1}
           className="flex-1 border border-yellow-200 rounded-xl px-3 py-2 text-sm outline-none resize-none min-h-[42px] max-h-28"
        />

        {/* ارسال */}
        <button
          type="submit"
          className="bg-yellow-500 text-white px-3 rounded-xl h-[42px] flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </form>

      {selectedUser && (
        <PrivateChat
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </main>
  );
}