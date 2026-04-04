//src/pages/social/PrivateChat.jsx

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  X,
  Image as ImageIcon,
  Smile,
  Check,
  CheckCheck,
  LoaderCircle,
} from "lucide-react";
import { getPrivateConversation, sendPrivateMessage } from "../../services/api";


export default function PrivateChat({
  user,
  onClose,
  initialMessages = [],
  onSendMessage,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef(null);
  const emojiRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

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
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
  let isMounted = true;

  const loadMessages = async () => {
    if (!user?.id) return;

    const res = await getPrivateConversation(user.id);

    if (!isMounted) return;

    if (res?.ok) {
      const serverMessages = (res.messages || []).map((msg) => ({
         id: msg.id,
         type: msg.type,
         text: msg.text,
         file: msg.fileUrl,
         sender: msg.senderId === user.id ? "other" : "me",
         time: new Date(msg.createdAt).toLocaleString("fa-IR", {
           year: "numeric",
           month: "2-digit",
           day: "2-digit",
           hour: "2-digit",
           minute: "2-digit",
         }),
         status: msg.status || "sent",
         readAt: msg.readAt || null,
      }));

      setMessages(serverMessages);
    }
  };

  loadMessages();

  const intervalId = setInterval(() => {
    loadMessages();
  }, 3000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, [user?.id]);

  const handleAddEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1200);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1200);
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

  const updateMessageStatus = (id, status) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              status,
            }
          : msg
      )
    );
  };

  const handleSend = async () => {
  if (!input.trim() && !filePreview) return;
  if (!user?.id) return;

  const tempId = Date.now();
  const messageType = filePreview ? filePreview.type : "text";
  const messageText = input.trim();

  const tempMessage = {
    id: tempId,
    type: messageType,
    text: messageText || "",
    file: filePreview?.url || null,
    sender: "me",
    time: new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "sending",
  };

  setMessages((prev) => [...prev, tempMessage]);

  setInput("");
  setFilePreview(null);
  setShowEmoji(false);
  setIsTyping(false);

  const res = await sendPrivateMessage(user.id, {
    text: messageText,
    type: messageType,
    fileUrl: filePreview?.url || null,
  });

  if (res?.ok && res.item) {
    const savedMessage = {
     id: res.item.id,
     type: res.item.type,
     text: res.item.text,
     file: res.item.fileUrl,
     sender: "me",
     time: new Date(res.item.createdAt).toLocaleString("fa-IR", {
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
       hour: "2-digit",
      minute: "2-digit",
     }),
     status: res.item.status || "sent",
     readAt: res.item.readAt || null,
    };

    setMessages((prev) =>
      prev.map((msg) => (msg.id === tempId ? savedMessage : msg))
    );

    onSendMessage?.(user, savedMessage);
  } else {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === tempId
          ? {
              ...msg,
              status: "sent",
            }
          : msg
      )
    );
  }

  setTimeout(() => {
    inputRef.current?.focus();
  }, 0);
};

  const renderMessageStatus = (status) => {
    if (status === "sending") {
      return (
        <span
          className="inline-flex items-center gap-1 text-[10px] text-gray-400"
          title="در حال ارسال"
        >
          <LoaderCircle size={12} className="animate-spin" />
        </span>
      );
    }

    if (status === "sent") {
      return (
        <span
          className="inline-flex items-center gap-1 text-[10px] text-gray-400"
          title="ارسال شد"
        >
          <Check size={12} />
        </span>
      );
    }

    if (status === "read") {
      return (
        <span
          className="inline-flex items-center gap-1 text-[10px] text-yellow-600"
          title="خوانده شد"
        >
          <CheckCheck size={12} />
        </span>
      );
    }

    return null;
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[90%] max-w-md h-[70vh] rounded-3xl shadow-xl border border-yellow-200 flex flex-col relative"
      >
        {/* هدر */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-200">
          <div className="flex flex-col">
            <h2 className="text-yellow-700 font-semibold">
              چت با {user.name}
            </h2>
            <span className="text-[11px] text-gray-400 mt-1">
              گفت‌وگوی خصوصی
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* پیام‌ها */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
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
              <p className="text-[10px] text-gray-500 mb-1 font-semibold">
               {msg.sender === "me" ? "شما" : user.name}:
              </p>

              {msg.type === "text" && (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}

              {msg.type === "image" && (
                <>
                  <img
                    src={msg.file}
                    alt="img"
                    className="rounded-xl max-h-40 mt-1"
                  />
                  {msg.text ? (
                    <p className="mt-2 whitespace-pre-wrap">{msg.text}</p>
                  ) : null}
                </>
              )}

              {msg.type === "video" && (
                <>
                  <video
                    src={msg.file}
                    controls
                    className="rounded-xl max-h-40 mt-1"
                  />
                  {msg.text ? (
                    <p className="mt-2 whitespace-pre-wrap">{msg.text}</p>
                  ) : null}
                </>
              )}

              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[9px] text-gray-400">
                  {msg.time}
                </span>
                {msg.sender === "me" ? renderMessageStatus(msg.status) : null}
              </div>
            </div>
          ))}

          {isTyping && (input.trim() || filePreview) && (
            <div className="text-xs text-gray-400 px-1">
              در حال نوشتن...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* preview فایل */}
        {filePreview && (
          <div className="absolute bottom-20 left-3 bg-white border border-yellow-200 rounded-xl p-2 shadow z-10">
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
            className="absolute bottom-20 right-3 bg-white border border-yellow-200 rounded-xl p-2 shadow flex flex-wrap gap-2 w-52 max-h-40 overflow-y-auto z-10"
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

        {/* ورودی */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="border-t border-yellow-200 p-3 flex gap-2 items-end"
        >
          <label className="p-2 rounded-lg hover:bg-yellow-100 cursor-pointer shrink-0">
            <ImageIcon size={20} className="text-yellow-600" />
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="button"
            onClick={() => setShowEmoji((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-yellow-100 shrink-0"
          >
            <Smile size={20} className="text-yellow-600" />
          </button>

          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="پیام خصوصی..."
            rows={1}
            className="flex-1 border border-yellow-200 rounded-xl px-3 py-2 text-sm outline-none resize-none min-h-[42px] max-h-28"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white px-3 rounded-xl h-[42px] flex items-center justify-center shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}