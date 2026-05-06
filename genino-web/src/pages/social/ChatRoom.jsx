import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Image as ImageIcon,
  Smile,
  X,
  Check,
  CheckCheck,
  LoaderCircle,
  Trash2,
  CornerUpLeft,
  Forward,
  Mic,
  Square,
} from "lucide-react";
import PrivateChat from "./PrivateChat";
import {
  getRoomMessages,
  sendRoomMessage,
  deleteRoomMessage,
  reactToRoomMessage,
  presignChatImageUpload,
  presignChatVoiceUpload,
  putFileToPresignedUrl,
  upsertRoomPresence,
  getRoomPresence,
  getMutedRoomUsers,
  muteRoomUser,
  unmuteRoomUser,
} from "../../services/api";
import { io } from "socket.io-client";

export default function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingToMessage, setReplyingToMessage] = useState(null);
  const [forwardingMessage, setForwardingMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [reactionPickerMessageId, setReactionPickerMessageId] = useState(null);
  const [showNotice, setShowNotice] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [presentUsers, setPresentUsers] = useState([]);
  const [presentUsersCount, setPresentUsersCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState({});
  const [mutedUserIds, setMutedUserIds] = useState([]);
  const [userToMuteAction, setUserToMuteAction] = useState(null);
  const [mutedUsers, setMutedUsers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);

  const emojiRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const roomTypingTimeoutsRef = useRef({});
  const hasInitializedScrollRef = useRef(false);
  const shouldStickToBottomRef = useRef(true);
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingStartTimeRef = useRef(null);
  const recordingTimerRef = useRef(null);

  const currentUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("genino_user") || "null");
  } catch {
    return null;
  }
})();

const currentUserId = Number(currentUser?.id || 0);
const roomId = Number(room?.id || room?.roomId || 0);
const isRoomManager = Number(room?.creatorId || 0) === currentUserId;


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

  const toggleRecording = async () => {
  // اگر در حال ضبط هست → stop
  if (isRecording) {
  const recorder = mediaRecorderRef.current;

  if (recorder && recorder.state !== "inactive") {
    recorder.stop();
  }

  // 🔥 خیلی مهم: بستن میکروفن
  if (recorder?.stream) {
    recorder.stream.getTracks().forEach((track) => track.stop());
  }

  setIsRecording(false);

  if (recordingTimerRef.current) {
    clearInterval(recordingTimerRef.current);
    recordingTimerRef.current = null;
  }

  setRemainingSeconds(30);

  return;
}

  // شروع ضبط
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    audioChunksRef.current = [];
    if (audioPreviewUrl) {
  URL.revokeObjectURL(audioPreviewUrl);
}
setAudioBlob(null);
setAudioDuration(null);
setAudioPreviewUrl(null);
    recordingStartTimeRef.current = Date.now();
    setRemainingSeconds(30);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
  const blob = new Blob(audioChunksRef.current, {
    type: mediaRecorder.mimeType || "audio/webm",
  });

  const duration = Math.min(
    30,
    Math.floor((Date.now() - recordingStartTimeRef.current) / 1000)
  );

  if (audioPreviewUrl) {
    URL.revokeObjectURL(audioPreviewUrl);
  }

  const previewUrl = URL.createObjectURL(blob);

  setAudioBlob(blob);
  setAudioDuration(duration);
  setAudioPreviewUrl(previewUrl);

  if (mediaRecorder.stream) {
    mediaRecorder.stream.getTracks().forEach((track) => track.stop());
  }
};
    mediaRecorder.start(1000);
    setIsRecording(true);

    // ⛔ auto stop بعد 30 ثانیه
    recordingTimerRef.current = setInterval(() => {
    setRemainingSeconds((prev) => {
      if (prev <= 1) {
        mediaRecorder.stop();
        setIsRecording(false);
        clearInterval(recordingTimerRef.current);
        return 0;
      }
      return prev - 1;
    });
    }, 1000);

  } catch (err) {
    alert("دسترسی به میکروفن داده نشد");
  }
};

  useEffect(() => {
  const container = messagesContainerRef.current;
  if (!container) return;

  if (!hasInitializedScrollRef.current) {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    hasInitializedScrollRef.current = true;
    shouldStickToBottomRef.current = true;
    return;
  }

  if (shouldStickToBottomRef.current) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, isTyping]);

useEffect(() => {
  setShowNotice(true);

  const timer = setTimeout(() => {
    setShowNotice(false);
  }, 10000);

  return () => clearTimeout(timer);
}, [roomId]);

useEffect(() => {
  const container = messagesContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    shouldStickToBottomRef.current = distanceFromBottom < 120;
  };

  container.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => {
    container.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  let isMounted = true;

  const loadMessages = async () => {
    if (!roomId) return;

    const res = await getRoomMessages(roomId);

    if (!isMounted) return;

    if (res?.ok) {
      const serverMessages = (res.messages || []).map((msg) => ({
        id: msg.id,
        type: msg.deletedForEveryoneAt
          ? "text"
          : msg.type === "audio" || msg.type === "audio/webm"
          ? "audio"
          : msg.type,
        text: msg.deletedForEveryoneAt ? "این پیام حذف شد" : msg.text,
        file: msg.deletedForEveryoneAt ? null : msg.fileUrl,
        sender: msg.senderId === currentUserId ? "me" : "other",
        senderId: msg.senderId,
        user:
          msg.sender?.fullName?.trim() ||
          "کاربر ژنینو",
        time: new Date(msg.createdAt).toLocaleString("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        duration: msg.duration || null,
        reactions: msg.reactions || [],
        isForwarded: !!msg.forwardedFromMessageId,
        forwardedFromMessage: msg.forwardedFromMessage
          ? {
              id: msg.forwardedFromMessage.id,
              text: msg.forwardedFromMessage.deletedForEveryoneAt
                ? "این پیام حذف شده است"
                : msg.forwardedFromMessage.text,
              type: msg.forwardedFromMessage.type,
              file: msg.forwardedFromMessage.deletedForEveryoneAt
                ? null
                : msg.forwardedFromMessage.fileUrl,
              deletedForEveryone: !!msg.forwardedFromMessage.deletedForEveryoneAt,
            }
          : null,
        deletedForEveryone: !!msg.deletedForEveryoneAt,
        replyToMessageId: msg.replyToMessage?.id || null,
        replyToMessage: msg.replyToMessage
          ? {
              id: msg.replyToMessage.id,
              text: msg.replyToMessage.deletedForEveryoneAt
                ? "این پیام حذف شده است"
                : msg.replyToMessage.text,
              type: msg.replyToMessage.type,
              file: msg.replyToMessage.deletedForEveryoneAt
                ? null
                : msg.replyToMessage.fileUrl,
              senderName:
                msg.replyToMessage.sender?.fullName?.trim() ||
                "کاربر ژنینو",
              deletedForEveryone: !!msg.replyToMessage.deletedForEveryoneAt,
            }
          : null,
      }));

      setMessages(serverMessages);
    }
  };

  loadMessages();


  return () => {
    isMounted = false;
  };
}, [roomId]);

useEffect(() => {
  let isMounted = true;

  const loadMutedUsers = async () => {
    if (!roomId) {
      setMutedUserIds([]);
      return;
    }

    const res = await getMutedRoomUsers(roomId);

    if (!isMounted) return;

    if (!res?.ok) {
      setMutedUserIds([]);
      return;
    }

    const items = res.items || [];

const ids = items
  .map((item) => Number(item.userId))
  .filter(Boolean);

setMutedUserIds(ids);
setMutedUsers(items);
  };

  loadMutedUsers();

  return () => {
    isMounted = false;
  };
}, [roomId]);

useEffect(() => {
  let isMounted = true;

  const syncPresence = async () => {
  if (!roomId) return;

  await upsertRoomPresence(roomId);

  const [presenceRes] = await Promise.all([
    getRoomPresence(roomId),
    reloadMutedUsers(),
  ]);

  if (!isMounted) return;

  if (presenceRes?.ok) {
    setPresentUsers(presenceRes.items || []);
    setPresentUsersCount(Number(presenceRes.count || 0));
  }
};

  syncPresence();

  const intervalId = setInterval(() => {
    syncPresence();
  }, 15000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, [roomId]);

useEffect(() => {
  const socketBaseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

const socket = io(socketBaseUrl, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
socketRef.current = socket;

  socket.on("connect", () => {
    

    if (roomId) {
      socket.emit("join_room", { roomId, userId: currentUserId });
    }
  });

  socket.on("room_presence_updated", async (payload) => {
  

  if (!roomId) return;

  const res = await getRoomPresence(roomId);

  if (res?.ok) {
    setPresentUsers(res.items || []);
    setPresentUsersCount(Number(res.count || 0));
  }
});

socket.on("room_user_typing", ({ roomId: typingRoomId, userId, name }) => {
  if (Number(typingRoomId) !== roomId) return;
  if (!userId) return;
  if (Number(userId) === currentUserId) return;

  setTypingUsers((prev) => ({
    ...prev,
    [userId]: {
      name: name || "کاربر ژنینو",
    },
  }));

  if (roomTypingTimeoutsRef.current[userId]) {
    clearTimeout(roomTypingTimeoutsRef.current[userId]);
  }

  roomTypingTimeoutsRef.current[userId] = setTimeout(() => {
    setTypingUsers((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });

    delete roomTypingTimeoutsRef.current[userId];
  }, 1500);
});

socket.on("room_message_deleted", ({ roomId: deletedRoomId, messageId }) => {
  if (Number(deletedRoomId) !== roomId) return;
  if (!messageId) return;

  setMessages((prev) =>
    prev.map((msg) => {
      if (msg.id !== messageId) return msg;

      return {
        ...msg,
        text: "این پیام حذف شد",
        file: null,
        type: "text",
        deletedForEveryone: true,
      };
    })
  );
});

socket.on("room_message_reacted", ({ roomId: reactedRoomId, messageId, reactions }) => {
  if (Number(reactedRoomId) !== roomId) return;
  if (!messageId) return;

  setMessages((prev) =>
    prev.map((msg) =>
      msg.id === messageId
        ? {
            ...msg,
            reactions: Array.isArray(reactions) ? reactions : [],
          }
        : msg
    )
  );
});

  socket.on("disconnect", () => {
    
  });

  socket.on("receive_room_message", (payload) => {
  

  if (!payload?.message) return;

  const msg = payload.message;

  const mapped = {
    id: msg.id,
    type:
      msg.type === "audio" || msg.type === "audio/webm"
        ? "audio"
        : msg.type,
    text: msg.text,
    file: msg.fileUrl,
    sender: msg.senderId === currentUserId ? "me" : "other",
    senderId: msg.senderId,
    user: msg.sender?.fullName || "کاربر ژنینو",
    time: new Date(msg.createdAt).toLocaleString("fa-IR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
}),
    duration: msg.duration || null,
    status: "sent",
  };

  setMessages((prev) => {
  // اگر پیام از خودم بود و temp داشتیم → جایگزین کن
  if (mapped.sender === "me") {
    const tempIndex = prev.findIndex((m) => m.status === "sending");

    if (tempIndex !== -1) {
      const newArr = [...prev];
      newArr[tempIndex] = mapped;
      return newArr;
    }
  }

  // جلوگیری از duplicate
  const exists = prev.some((m) => m.id === mapped.id);
  if (exists) return prev;

  return [...prev, mapped];
});
}); 

  return () => {
  Object.values(roomTypingTimeoutsRef.current).forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });

  roomTypingTimeoutsRef.current = {};
  socket.disconnect();
};

  
}, [roomId, currentUserId]);

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

  socketRef.current?.emit("typing_room", {
  roomId,
  userId: currentUserId,
  name: currentUser?.fullName || "کاربر ژنینو",
});

  setIsTyping(true);

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(() => {
    setIsTyping(false);
  }, 1200);
};

  const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  e.target.value = "";

  if (!file) return;

  if (filePreview?.url?.startsWith("blob:")) {
    URL.revokeObjectURL(filePreview.url);
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    alert("فعلاً فقط فرمت‌های JPG، PNG و WEBP پشتیبانی می‌شوند. لطفاً اگر عکس HEIC است، آن را از تنظیمات گوشی به JPG تغییر بده.");
    return;
  }

  if (file.size > 15 * 1024 * 1024) {
    alert("حجم عکس باید کمتر از ۱۵ مگابایت باشد.");
    return;
  }

  const img = new Image();
  const previewUrl = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement("canvas");

    const MAX_WIDTH = 1280;
    const scale = Math.min(1, MAX_WIDTH / img.width);

    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    URL.revokeObjectURL(previewUrl);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("آماده‌سازی تصویر انجام نشد.");
          return;
        }

        const url = URL.createObjectURL(blob);

        setFilePreview({
          url,
          type: "image",
          blob,
          contentType: "image/jpeg",
          ext: "jpg",
          fileSize: blob.size,
        });
      },
      "image/jpeg",
      0.82
    );
  };

  img.onerror = () => {
    URL.revokeObjectURL(previewUrl);
    alert("این عکس در مرورگر قابل نمایش نیست. لطفاً JPG، PNG یا WEBP انتخاب کن.");
  };

  img.src = previewUrl;
};

const reloadMutedUsers = async () => {
  if (!roomId) return;

  const res = await getMutedRoomUsers(roomId);

  if (!res?.ok) {
    setMutedUserIds([]);
    setMutedUsers([]);
    return;
  }

  const items = res.items || [];

  const ids = items
    .map((item) => Number(item.userId))
    .filter(Boolean);

  setMutedUserIds(ids);
  setMutedUsers(items);
};

const handleToggleMuteUser = async (user) => {
  const targetUserId = Number(user?.id || 0);

  if (!targetUserId || !roomId) return;

  const isMuted = mutedUserIds.includes(targetUserId);

  const res = isMuted
    ? await unmuteRoomUser(roomId, targetUserId)
    : await muteRoomUser(roomId, targetUserId);

  if (!res?.ok) {
    alert(res?.message || "عملیات میوت انجام نشد.");
    return;
  }

  await reloadMutedUsers();
};

  const handleSend = async () => {
  if (!input.trim() && !filePreview && !audioBlob) return;
  if (!roomId) return;

  const tempId = Date.now();

  const messageType =
  audioBlob ? "audio" :
  filePreview ? filePreview.type :
  "text";
  const messageText = input.trim();
  let messageFile = null;
  let audioFile = null;

  if (filePreview?.blob) {
    const presignRes = await presignChatImageUpload({
      ext: filePreview.ext,
      contentType: filePreview.contentType,
      fileSize: filePreview.fileSize,
    });

    if (!presignRes?.ok || !presignRes.uploadUrl || !presignRes.publicUrl) {
      alert(presignRes?.message || "آماده‌سازی آپلود تصویر انجام نشد.");
      setIsTyping(false);
      return;
    }
  

    const uploadRes = await putFileToPresignedUrl(
      presignRes.uploadUrl,
      new File([filePreview.blob], `chat-room-image.${filePreview.ext}`, {
        type: filePreview.contentType,
      })
    );
  

    if (!uploadRes?.ok) {
      alert(uploadRes?.message || "آپلود تصویر انجام نشد.");
      setIsTyping(false);
      return;
    }

    messageFile = presignRes.publicUrl;
  }

  // 🎤 آپلود ویس
if (audioBlob) {
  const presignRes = await presignChatVoiceUpload({
  ext: "webm",
  contentType: "audio/webm",
  fileSize: audioBlob.size,
});

  if (!presignRes?.ok) {
    alert("آپلود صدا آماده نشد");
    return;
  }

  const uploadRes = await putFileToPresignedUrl(
    presignRes.uploadUrl,
    new File([audioBlob], "voice.webm", {
      type: "audio/webm",
    })
  );

  if (!uploadRes?.ok) {
    alert("آپلود صدا انجام نشد");
    return;
  }

  audioFile = presignRes.publicUrl;
}
  

  if (!messageText && !messageFile && !audioFile) return;

  const tempMessage = {
    id: tempId,
    type: messageType,
    text: messageText || "",
    file: messageFile || audioFile,
    sender: "me",
    user: "شما",
    time: new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "sending",
    duration: audioBlob ? audioDuration : null,
    isForwarded: false,
  };

  setMessages((prev) => [...prev, tempMessage]);
  shouldStickToBottomRef.current = true;

  setInput("");

if (filePreview?.url?.startsWith("blob:")) {
  URL.revokeObjectURL(filePreview.url);
}

if (audioPreviewUrl) {
  URL.revokeObjectURL(audioPreviewUrl);
}

setFilePreview(null);
setAudioBlob(null);
setAudioDuration(null);
setAudioPreviewUrl(null);
setShowEmoji(false);
setIsTyping(false);

  const res = await sendRoomMessage(roomId, {
  text: messageText,
  type: messageType,
  fileUrl: messageFile || audioFile,
  duration: audioBlob ? audioDuration : null,
  replyToMessageId: replyingToMessage?.id || null,
  forwardedFromMessageId: forwardingMessage?.id || null,
});

if (res?.ok && res.item) {
  socketRef.current?.emit("send_room_message", {
    roomId,
    message: res.item,
  });

  const savedMessage = {
    id: res.item.id,
    type: res.item.type,
    text: res.item.text,
    file: res.item.fileUrl,
    sender: "me",
    senderId: res.item.senderId,
    user: res.item.sender?.fullName?.trim() || "شما",
    time: new Date(res.item.createdAt).toLocaleString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "sent",
    duration: res.item.duration || null,
    reactions: res.item.reactions || [],
    isForwarded: !!res.item.forwardedFromMessageId,
    forwardedFromMessage: res.item.forwardedFromMessage
      ? {
          id: res.item.forwardedFromMessage.id,
          text: res.item.forwardedFromMessage.deletedForEveryoneAt
            ? "این پیام حذف شده است"
            : res.item.forwardedFromMessage.text,
          type: res.item.forwardedFromMessage.type,
          file: res.item.forwardedFromMessage.deletedForEveryoneAt
            ? null
            : res.item.forwardedFromMessage.fileUrl,
          deletedForEveryone: !!res.item.forwardedFromMessage.deletedForEveryoneAt,
        }
      : null,
    replyToMessageId: res.item.replyToMessage?.id || null,
    replyToMessage: res.item.replyToMessage
      ? {
          id: res.item.replyToMessage.id,
          text: res.item.replyToMessage.deletedForEveryoneAt
            ? "این پیام حذف شده است"
            : res.item.replyToMessage.text,
          type: res.item.replyToMessage.type,
          file: res.item.replyToMessage.deletedForEveryoneAt
            ? null
            : res.item.replyToMessage.fileUrl,
          senderName:
            res.item.replyToMessage.sender?.fullName?.trim() ||
            "کاربر ژنینو",
          deletedForEveryone: !!res.item.replyToMessage.deletedForEveryoneAt,
        }
      : null,
  };

  setMessages((prev) =>
    prev.map((msg) => (msg.id === tempId ? savedMessage : msg))
  );
} else {
  setMessages((prev) => prev.filter((msg) => msg.id !== tempId));

  alert(res?.message || "ارسال پیام در اتاق انجام نشد.");
  
}

setReplyingToMessage(null);
setForwardingMessage(null);

setTimeout(() => {
  inputRef.current?.focus();
}, 0);
};



const handleDeleteRoomMessage = async (messageId) => {
  if (!messageId) return;

  const res = await deleteRoomMessage(messageId);

  if (!res?.ok) {
    alert(res?.message || "حذف پیام انجام نشد.");
    return;
  }

  // آپدیت لوکال
  setMessages((prev) =>
    prev.map((msg) => {
      if (msg.id !== messageId) return msg;

      return {
        ...msg,
        text: "این پیام حذف شد",
        file: null,
        type: "text",
        deletedForEveryone: true,
      };
    })
  );

  // اطلاع به بقیه کاربران
  socketRef.current?.emit("delete_room_message", {
    roomId,
    messageId,
  });

  setMessageToDelete(null);
};

const handleUnmuteMutedUser = async (user) => {
  const targetUserId = Number(user?.userId || user?.id || 0);

  if (!targetUserId || !roomId) return;

  const res = await unmuteRoomUser(roomId, targetUserId);

  if (!res?.ok) {
    alert(res?.message || "عملیات آن‌میوت انجام نشد.");
    return;
  }

  await reloadMutedUsers();
};

const handleReactToRoomMessage = async (messageId, emoji) => {
  if (!messageId || !emoji) return;

  const res = await reactToRoomMessage(messageId, emoji);

  if (!res?.ok) {
    alert(res?.message || "ثبت ری‌اکشن انجام نشد.");
    return;
  }

  if (res.item) {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: res.item.reactions || [],
            }
          : msg
      )
    );

    socketRef.current?.emit("react_room_message", {
      roomId: res.item.roomId || roomId,
      messageId,
      reactions: res.item.reactions || [],
    });
  }

  setReactionPickerMessageId(null);
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
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };
}, []);

useEffect(() => {
  hasInitializedScrollRef.current = false;
  shouldStickToBottomRef.current = true;
}, [roomId]);



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

const typingUsersList = Object.values(typingUsers)
  .map((item) => item?.name)
  .filter(Boolean);

let typingText = "";

if (typingUsersList.length === 1) {
  typingText = `${typingUsersList[0]} در حال نوشتن...`;
} else if (typingUsersList.length === 2) {
  typingText = `${typingUsersList[0]} و ${typingUsersList[1]} در حال نوشتن...`;
} else if (typingUsersList.length > 2) {
  typingText = `${typingUsersList.length} نفر در حال نوشتن...`;
}

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

  <p className="text-[11px] text-gray-400 mt-1">
    مدیر اتاق:{" "}
    <span className="font-semibold text-yellow-700">
      {room?.creatorName || "ژنینو"}
    </span>
  </p>
</div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-yellow-600 font-medium absolute left-4 top-1/2 -translate-y-1/2">
  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
  <span>{presentUsersCount} نفر در اتاق</span>
</div>
      </div>

      {/* کاربران */}
      <div className="p-2 flex gap-2 overflow-x-auto border-b border-yellow-100">
        {presentUsers.map((u) => {
  const isMutedUser = mutedUserIds.includes(Number(u.id));
  const canManageThisUser = isRoomManager && Number(u.id) !== currentUserId;

  return (
    <div
      key={u.id}
      className="flex items-center gap-1 bg-yellow-100 rounded-full px-2 py-1 whitespace-nowrap"
    >
      <button
  onClick={() => setSelectedUser(u)}
  className="text-xs hover:text-yellow-700 transition flex items-center gap-1"
>
  <span>{u.name}</span>
  {isMutedUser ? <span title="کاربر میوت شده">🔇</span> : null}
</button>

      {canManageThisUser ? (
        <button
          type="button"
          onClick={() => handleToggleMuteUser(u)}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
            isMutedUser
              ? "bg-white border-green-200 text-green-700 hover:bg-green-50"
              : "bg-white border-red-200 text-red-600 hover:bg-red-50"
          }`}
          title={isMutedUser ? "آن‌میوت کاربر" : "میوت کاربر"}
        >
          {isMutedUser ? "آن‌میوت" : "میوت"}
        </button>
      ) : null}
    </div>
  );
})}
      </div>

      {isRoomManager && mutedUsers.length > 0 && (
  <div className="px-3 py-2 border-b border-yellow-100 bg-yellow-50/50">
    <p className="text-[11px] font-semibold text-yellow-700 mb-2">
      کاربران میوت‌شده
    </p>

    <div className="flex gap-2 overflow-x-auto">
      {mutedUsers.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-2 bg-white border border-yellow-200 rounded-full px-3 py-1 whitespace-nowrap"
        >
          <span className="text-xs text-gray-700 flex items-center gap-1">
            <span>{item.user?.name || "کاربر ژنینو"}</span>
            <span title="کاربر میوت شده">🔇</span>
          </span>

          <button
            type="button"
            onClick={() => handleUnmuteMutedUser(item)}
            className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition"
          >
            آن‌میوت
          </button>
        </div>
      ))}
    </div>
  </div>
)}

      {/* پیام‌ها */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 relative"
      >

        {showNotice && (
  <div className="sticky top-0 z-10 flex justify-center pb-2">
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-[11px] px-3 py-1.5 rounded-full shadow-sm">
      پیام‌ها تا ۳۰ روز نگهداری می‌شوند
    </div>
  </div>
)}

        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-6 text-sm">
            هنوز پیامی ارسال نشده
          </p>
        )}

        {messages.map((msg) => (
  <div
    key={msg.id}
    className={`${
      msg.deletedForEveryone
        ? "max-w-[40%] px-1 py-[2px] text-[10px] opacity-60 italic text-gray-400 mx-auto text-center bg-transparent shadow-none"
        : `max-w-[85%] sm:max-w-[70%] p-2 rounded-xl text-sm break-words [overflow-wrap:anywhere] ${
            msg.sender === "me"
              ? "bg-yellow-100 ml-auto"
              : "bg-gray-100"
          }`
    }`}
  >
    {msg.deletedForEveryone ? (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        <span className="text-[10px] text-gray-400 italic">
          این پیام حذف شد
        </span>
        <span className="text-[9px] text-gray-400">
          {msg.time}
        </span>
      </div>
    ) : (
      <>
        <p className="text-[10px] text-gray-500 mb-1 font-semibold">
          {msg.sender === "me" ? "شما" : msg.user}
        </p>

        {msg.type === "text" && (
          <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-6">
  {msg.text}
</p>
        )}

        {msg.type === "image" && (
  <>
    <div className="relative mt-1 inline-block">
      <button
        type="button"
        onClick={() => {
          if (msg.file) {
            setSelectedImage(msg.file);
          }
        }}
        className="block"
        disabled={!msg.file}
      >
        {msg.file ? (
  <img
    src={msg.file}
    alt="img"
    className={`rounded-xl max-h-40 ${msg.file ? "cursor-zoom-in" : ""} ${
      msg.status === "sending" ? "opacity-70" : ""
    }`}
  />
) : (
  <div className="w-40 h-28 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
    تصویر در دسترس نیست
  </div>
)}
      </button>

      {msg.status === "sending" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20">
          <div className="bg-white/90 rounded-full px-3 py-1 text-[11px] text-gray-700 shadow">
            در حال ارسال...
          </div>
        </div>
      )}
    </div>

    {msg.text ? (
      <p className="mt-2 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
  {msg.text}
</p>
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
  <p className="mt-2 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
    {msg.text}
  </p>
) : null}
          </>
        )}
        {msg.type === "audio" && (
  <div className="mt-1">
    <audio
      controls
      src={msg.file}
      className="w-52"
    />

    {msg.duration ? (
      <p className="mt-1 text-[10px] text-gray-500">
        {msg.duration} ثانیه
      </p>
    ) : null}

    {msg.text ? (
      <p className="mt-2 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
  {msg.text}
</p>
    ) : null}
  </div>
)}

        <div className="flex items-center justify-between gap-2 mt-1">
  <div className="flex items-center gap-1">
    {!msg.deletedForEveryone ? (
      <button
  type="button"
  onClick={() =>
    setReactionPickerMessageId((prev) =>
      prev === msg.id ? null : msg.id
    )
  }
  className="p-1 rounded-md text-yellow-600 hover:bg-yellow-50 transition"
  title="ری‌اکشن"
>
  <Smile size={14} />
</button>
    ) : null}

    {!msg.deletedForEveryone && (msg.sender === "me" || isRoomManager) ? (
  <button
    type="button"
    onClick={() => setMessageToDelete(msg)}
    className="p-1 rounded-md text-red-500 hover:bg-red-50 transition"
    title={msg.sender === "me" ? "حذف پیام" : "حذف پیام توسط مدیر اتاق"}
  >
    <Trash2 size={14} />
  </button>
) : null}
  </div>

  <div className="flex items-center gap-1">
    <span className="text-[9px] text-gray-400">
      {msg.time}
    </span>
    {msg.sender === "me" ? renderMessageStatus(msg.status) : null}
  </div>
</div>

{reactionPickerMessageId === msg.id && (
  <div className="mt-2 flex items-center gap-1 flex-wrap">
    {["❤️", "👍", "😂", "😮", "😢", "🔥"].map((emoji) => (
      <button
        key={emoji}
        type="button"
        onClick={() => handleReactToRoomMessage(msg.id, emoji)}
        className="px-2 py-1 rounded-full bg-white border border-yellow-200 hover:bg-yellow-50 transition text-sm"
      >
        {emoji}
      </button>
    ))}
  </div>
)}

{Array.isArray(msg.reactions) && msg.reactions.length > 0 && (
  <div className="mt-2 flex items-center gap-1 flex-wrap">
    {Object.entries(
      msg.reactions.reduce((acc, reaction) => {
        const emoji = reaction?.emoji;
        if (!emoji) return acc;

        acc[emoji] = (acc[emoji] || 0) + 1;
        return acc;
      }, {})
    ).map(([emoji, count]) => (
      <span
        key={emoji}
        className="inline-flex items-center justify-center gap-1 px-2 py-[2px] rounded-full bg-white border border-yellow-200 text-xs"
      >
        <span>{emoji}</span>
        <span>{count}</span>
      </span>
    ))}
  </div>
)}
      </>
    )}
  </div>
))}

        {typingText && (
  <div className="px-1 pt-1">
    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-yellow-200 px-3 py-1 text-[11px] text-gray-500 shadow-sm">
      <span className="inline-flex gap-[3px]">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:0ms]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:150ms]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:300ms]"></span>
      </span>
      <span>{typingText}</span>
    </div>
  </div>
)}

        <div ref={messagesEndRef} />

        {/* preview فایل */}
        {filePreview && (
  <div className="fixed bottom-4 left-3 z-[60] bg-white border border-yellow-200 rounded-xl p-1.5 shadow max-w-[120px]">
    <button
      type="button"
      onClick={() => {
  if (filePreview?.url?.startsWith("blob:")) {
    URL.revokeObjectURL(filePreview.url);
  }
  setFilePreview(null);
}}
      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600"
      title="حذف تصویر"
    >
      <X size={12} />
    </button>

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

{/* preview صدا */}
{audioBlob && audioPreviewUrl && (
  <div className="fixed bottom-4 left-36 z-[60] bg-white border border-yellow-200 rounded-xl p-2 shadow flex items-center gap-2">
    <button
      type="button"
      onClick={() => {
        if (audioPreviewUrl) {
          URL.revokeObjectURL(audioPreviewUrl);
        }
        setAudioBlob(null);
        setAudioDuration(null);
        setAudioPreviewUrl(null);
      }}
      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
      title="حذف صدا"
    >
      <X size={12} />
    </button>

    <audio
      controls
      src={audioPreviewUrl}
      className="h-8"
    />

    <span className="text-[10px] text-gray-500">
      {audioDuration}s
    </span>
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
  className="border-t border-yellow-200 p-3 flex gap-2 items-end"
>

  
  {/* دکمه ضبط صدا */}
  <button
  type="button"
  onClick={toggleRecording}
  className={`flex items-center gap-1 px-2 py-2 rounded-lg shrink-0 transition ${
    isRecording
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "hover:bg-yellow-100 text-yellow-600"
  }`}
  title={isRecording ? "توقف ضبط" : "شروع ضبط"}
>
  {isRecording ? (
    <>
      <Square size={18} />
      <span className="text-xs font-semibold">
        {remainingSeconds}
      </span>
    </>
  ) : (
    <Mic size={20} />
  )}
</button>

  {/* ارسال */}
  <button
    type="submit"
    className="bg-yellow-500 text-white px-3 rounded-xl h-[42px] flex items-center justify-center shrink-0"
  >
    <Send size={18} />
  </button>

  {/* input متن */}
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
    placeholder="پیام در اتاق..."
    rows={1}
    className="flex-1 border border-yellow-200 rounded-xl px-3 py-2 text-sm outline-none resize-none min-h-[42px] max-h-28"
  />


  {/* دکمه ایموجی */}
  <button
    type="button"
    onClick={() => setShowEmoji((prev) => !prev)}
    className="p-2 rounded-lg hover:bg-yellow-100 shrink-0"
  >
    <Smile size={20} className="text-yellow-600" />
  </button>


  {/* دکمه فایل */}
  <label className="p-2 rounded-lg hover:bg-yellow-100 cursor-pointer shrink-0">
    <ImageIcon size={20} className="text-yellow-600" />
    <input
  type="file"
  accept="image/jpeg,image/png,image/webp"
  className="hidden"
  onChange={handleFileChange}
/>
  </label>
</form>

      {selectedUser && (
        <PrivateChat
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {messageToDelete && (
  <div
    className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[80]"
    onClick={() => setMessageToDelete(null)}
  >
    <div
      className="bg-white w-[88%] max-w-sm rounded-2xl shadow-xl border border-yellow-200 p-4 text-right"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-sm font-bold text-gray-800 mb-2">
        حذف پیام
      </h3>

      <p className="text-sm text-gray-600 leading-6">
        آیا از حذف این پیام برای همه مطمئن هستی؟
      </p>

      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => setMessageToDelete(null)}
          className="px-4 h-10 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          انصراف
        </button>

        <button
        type="button"
         onClick={() => handleDeleteRoomMessage(messageToDelete.id)}
          className="px-4 h-10 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
        >
          حذف
        </button>
      </div>
    </div>
  </div>
)}
{selectedImage && (
  <div
    className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center z-[90] p-4"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="relative max-w-[95%] max-h-[90%]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setSelectedImage(null)}
        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow"
        title="بستن"
      >
        <X size={18} />
      </button>

      <img
        src={selectedImage}
        alt="full"
        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
      />
    </div>
  </div>
)}
    </main>
  );
}