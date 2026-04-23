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
  Trash2,
  CornerUpLeft,
  Forward,
  Mic,
  Square,
} from "lucide-react";
import {
  getPrivateConversation,
  sendPrivateMessage,
  deletePrivateMessage,
  reactToPrivateMessage,
  getConversations,
  presignChatImageUpload,
  presignChatVoiceUpload,
  putFileToPresignedUrl,
} from "../../services/api";


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
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const emojiRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const hasInitializedScrollRef = useRef(false);
  const shouldStickToBottomRef = useRef(true);
  const [replyingToMessage, setReplyingToMessage] = useState(null);
  const [forwardingMessage, setForwardingMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [reactionPickerMessageId, setReactionPickerMessageId] = useState(null);
  const [showNotice, setShowNotice] = useState(true);
  const [showForwardPicker, setShowForwardPicker] = useState(false);
  const [forwardTargets, setForwardTargets] = useState([]);
  const [isLoadingForwardTargets, setIsLoadingForwardTargets] = useState(false);
  const [forwardComment, setForwardComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [voicePreview, setVoicePreview] = useState(null);

  const mediaRecorderRef = useRef(null);
  const recordingStreamRef = useRef(null);
  const recordingChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const recordingStartedAtRef = useRef(null);

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
  const container = messagesContainerRef.current;
  if (!container) return;

  // بار اول که چت باز می‌شود: حتماً برو آخر
  if (!hasInitializedScrollRef.current) {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    hasInitializedScrollRef.current = true;
    shouldStickToBottomRef.current = true;
    return;
  }

  // بعد از بار اول:
  // فقط اگر کاربر نزدیک پایین باشد، یا خودش پیام فرستاده باشد، برو پایین
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
}, [user?.id]);

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
}, [user?.id]);

useEffect(() => {
  return () => {
    if (voicePreview?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(voicePreview.url);
    }
    cleanupRecording();
  };
}, [voicePreview]);

  useEffect(() => {
  let isMounted = true;

  const loadMessages = async () => {
    if (!user?.id) return;

    const res = await getPrivateConversation(user.id);

    if (!isMounted) return;

    if (res?.ok) {
    //  console.log("REACTIONS TEST:", res.messages);
      const serverMessages = (res.messages || []).map((msg) => ({
  id: msg.id,
  type: msg.deletedForEveryoneAt ? "text" : msg.type,
  text: msg.deletedForEveryoneAt ? "این پیام حذف شد" : msg.text,
  file: msg.deletedForEveryoneAt ? null : msg.fileUrl,
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
  deletedForMe: !!msg.deletedByReceiverAt && msg.senderId === user.id,
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
          `${msg.replyToMessage.sender?.firstName || ""} ${msg.replyToMessage.sender?.lastName || ""}`.trim() ||
          "کاربر ژنینو",
        deletedForEveryone: !!msg.replyToMessage.deletedForEveryoneAt,
      }
    : null,
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
  if (filePreview?.url?.startsWith("blob:")) {
    URL.revokeObjectURL(filePreview.url);
  }
  if (file.size > 15 * 1024 * 1024) {
  alert("حجم عکس خیلی زیاد است");
  return;
}

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (event) => {
    img.src = event.target.result;
  };

  img.onload = () => {
    const canvas = document.createElement("canvas");

    const MAX_WIDTH = 1280;
    const scale = Math.min(1, MAX_WIDTH / img.width);

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
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
      0.8 // کیفیت (بین 0 تا 1)
    );
  };

  reader.readAsDataURL(file);
};

const sendVoiceMessage = async ({ blob, duration }) => {
  if (!user?.id || !blob) return;

  const tempId = Date.now();
  const localUrl = URL.createObjectURL(blob);

  const tempMessage = {
    id: tempId,
    type: "voice",
    text: "",
    file: localUrl,
    sender: "me",
    time: new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "sending",
    isForwarded: false,
    duration,
  };

  setMessages((prev) => [...prev, tempMessage]);
  shouldStickToBottomRef.current = true;
  setShowEmoji(false);
  setIsTyping(false);

  const presignRes = await presignChatVoiceUpload({
    ext: "webm",
    contentType: "audio/webm",
    fileSize: blob.size,
  });

  if (!presignRes?.ok || !presignRes.uploadUrl || !presignRes.publicUrl) {
    URL.revokeObjectURL(localUrl);
    setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    alert(presignRes?.message || "آماده‌سازی آپلود پیام صوتی انجام نشد.");
    return;
  }

  const uploadRes = await putFileToPresignedUrl(
    presignRes.uploadUrl,
    new File([blob], "chat-voice.webm", {
      type: "audio/webm",
    })
  );

  if (!uploadRes?.ok) {
    URL.revokeObjectURL(localUrl);
    setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    alert(uploadRes?.message || "آپلود پیام صوتی انجام نشد.");
    return;
  }

  const res = await sendPrivateMessage(user.id, {
    text: "",
    type: "voice",
    fileUrl: presignRes.publicUrl,
    duration,
    replyToMessageId: replyingToMessage?.id || null,
    forwardedFromMessageId: null,
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
      reactions: res.item.reactions || [],
      isForwarded: !!res.item.forwardedFromMessageId,
      duration: res.item.duration || duration || null,
      replyToMessageId: res.item.replyToMessageId || null,
      replyToMessage: replyingToMessage
        ? {
            id: replyingToMessage.id,
            text: replyingToMessage.deletedForEveryone
              ? "این پیام حذف شده است"
              : replyingToMessage.text,
            type: replyingToMessage.type,
            file: null,
            senderName: replyingToMessage.senderName,
            deletedForEveryone: !!replyingToMessage.deletedForEveryone,
          }
        : null,
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

  setReplyingToMessage(null);

  setTimeout(() => {
    inputRef.current?.focus();
  }, 0);
};


  const handleSend = async () => {
  if (!input.trim() && !filePreview && !voicePreview) return;
  if (!user?.id) return;

  const tempId = Date.now();
  const messageText = input.trim();

  let messageType = "text";
  let messageFile = null;
  let duration = null;

  if (voicePreview?.blob) {
    messageType = "voice";
    duration = voicePreview.duration || null;

    const presignRes = await presignChatVoiceUpload({
      ext: voicePreview.ext,
      contentType: voicePreview.contentType,
      fileSize: voicePreview.fileSize,
    });

    if (!presignRes?.ok || !presignRes.uploadUrl || !presignRes.publicUrl) {
      alert(presignRes?.message || "آماده‌سازی آپلود پیام صوتی انجام نشد.");
      setIsTyping(false);
      return;
    }

    const uploadRes = await putFileToPresignedUrl(
      presignRes.uploadUrl,
      new File([voicePreview.blob], `chat-voice.${voicePreview.ext}`, {
        type: voicePreview.contentType,
      })
    );

    if (!uploadRes?.ok) {
      alert(uploadRes?.message || "آپلود پیام صوتی انجام نشد.");
      setIsTyping(false);
      return;
    }

    messageFile = presignRes.publicUrl;
  } else if (filePreview?.blob) {
    messageType = filePreview.type;

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
      new File([filePreview.blob], `chat-image.${filePreview.ext}`, {
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

  if (!messageText && !messageFile) return;

  const tempMessage = {
    id: tempId,
    type: messageType,
    text: messageText || "",
    file: messageType === "voice" ? voicePreview?.url || messageFile : messageFile,
    sender: "me",
    time: new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "sending",
    isForwarded: false,
    duration,
  };

  setMessages((prev) => [...prev, tempMessage]);
  shouldStickToBottomRef.current = true;

  setInput("");

  if (filePreview?.url?.startsWith("blob:")) {
    URL.revokeObjectURL(filePreview.url);
  }
  if (voicePreview?.url?.startsWith("blob:")) {
    URL.revokeObjectURL(voicePreview.url);
  }

  setFilePreview(null);
  setVoicePreview(null);
  setShowEmoji(false);
  setIsTyping(false);

  const res = await sendPrivateMessage(user.id, {
    text: messageText,
    type: messageType,
    fileUrl: messageFile,
    duration,
    replyToMessageId: replyingToMessage?.id || null,
    forwardedFromMessageId: null,
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
      reactions: res.item.reactions || [],
      isForwarded: !!res.item.forwardedFromMessageId,
      duration: res.item.duration || duration || null,
      replyToMessageId: res.item.replyToMessageId || null,
      replyToMessage: replyingToMessage
        ? {
            id: replyingToMessage.id,
            text: replyingToMessage.deletedForEveryone
              ? "این پیام حذف شده است"
              : replyingToMessage.text,
            type: replyingToMessage.type,
            file: null,
            senderName: replyingToMessage.senderName,
            deletedForEveryone: !!replyingToMessage.deletedForEveryone,
          }
        : null,
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

  setReplyingToMessage(null);

  setTimeout(() => {
    inputRef.current?.focus();
  }, 0);
};

const handleDeleteMessage = async (messageId) => {
  if (!messageId) return false;

  const res = await deletePrivateMessage(messageId);

  if (!res?.ok) {
    alert(res?.message || "حذف پیام انجام نشد.");
    return false;
  }

  setMessages((prev) =>
    prev.map((msg) => {
      if (msg.id !== messageId) return msg;

      if (res.type === "delete_for_everyone") {
        return {
          ...msg,
          text: "این پیام حذف شد",
          file: null,
          type: "text",
          deletedForEveryone: true,
        };
      }

      return {
        ...msg,
        deletedForMe: true,
      };
    })
  );

  return true;
};

const handleReplyToMessage = (message) => {
  if (!message || message.deletedForMe) return;

  setReplyingToMessage({
    id: message.id,
    text: message.deletedForEveryone
      ? "این پیام حذف شده است"
      : message.text || (message.type === "image"
          ? "تصویر"
          : message.type === "video"
          ? "ویدیو"
          : ""),
    type: message.type,
    sender: message.sender,
    senderName: message.sender === "me" ? "شما" : user.name,
    deletedForEveryone: !!message.deletedForEveryone,
  });

  inputRef.current?.focus();
};

const handleForwardMessage = async (message) => {
  if (!message || message.deletedForMe || message.deletedForEveryone) return;

  setForwardingMessage({
    id: message.id,
    text: message.text || "",
    type: message.type,
    file: message.file || null,
    sender: message.sender,
  });

  setReplyingToMessage(null);
  setShowEmoji(false);
  setForwardComment("");
  setIsLoadingForwardTargets(true);
  setShowForwardPicker(true);

  const res = await getConversations();

  if (res?.ok && Array.isArray(res.items)) {
    setForwardTargets(
      res.items.filter((item) => item?.id && item.id !== user?.id)
    );
  } else {
    setForwardTargets([]);
  }

  setIsLoadingForwardTargets(false);
};

const handleSendForwardToTarget = async (targetUserId) => {
  if (!forwardingMessage || !targetUserId) return;

  const res = await sendPrivateMessage(targetUserId, {
  text: forwardComment.trim(),
  type: forwardingMessage.type,
  fileUrl: forwardingMessage.file?.startsWith("blob:")
    ? null
    : forwardingMessage.file || null,
  replyToMessageId: null,
  forwardedFromMessageId: forwardingMessage.id,
});

  if (!res?.ok) {
    alert("ارسال فوروارد انجام نشد.");
    return;
  }

  // اگر به همین چت فعلی فرستاد، داخل لیست هم اضافه کن
  if (targetUserId === user?.id && res.item) {
    const newMsg = {
  id: res.item.id,
  type: res.item.type,
  text: forwardComment.trim(),
  file: res.item.fileUrl,
  sender: "me",
  time: new Date(res.item.createdAt).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  status: res.item.status || "sent",
  isForwarded: !!res.item.forwardedFromMessageId,
  forwardedFromMessage: {
    id: forwardingMessage.id,
    text: forwardingMessage.text || "",
    type: forwardingMessage.type,
    file: forwardingMessage.file || null,
    deletedForEveryone: false,
  },
};

    setMessages((prev) => [...prev, newMsg]);
  }

  setShowForwardPicker(false);
  setForwardingMessage(null);
  setForwardComment("");
  inputRef.current?.focus();
  };

const handleReactToMessage = async (messageId, emoji) => {
  if (!messageId || !emoji) return;

  const res = await reactToPrivateMessage(messageId, emoji);

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
  }

  setReactionPickerMessageId(null);
};

  const cleanupRecording = () => {
  if (recordingIntervalRef.current) {
    clearInterval(recordingIntervalRef.current);
    recordingIntervalRef.current = null;
  }

  if (recordingStreamRef.current) {
    recordingStreamRef.current.getTracks().forEach((track) => track.stop());
    recordingStreamRef.current = null;
  }

  mediaRecorderRef.current = null;
  recordingChunksRef.current = [];
  recordingStartedAtRef.current = null;
};

const getRecordedDurationSeconds = () => {
  if (!recordingStartedAtRef.current) return 0;

  const diffMs = Date.now() - recordingStartedAtRef.current;
  const seconds = Math.round(diffMs / 1000);

  return Math.max(1, Math.min(30, seconds));
};

  const stopVoiceRecording = (shouldKeep = true) => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) {
      cleanupRecording();
      setIsRecording(false);
      setRemainingSeconds(30);
      return;
    }

    const wasRecording = recorder.state !== "inactive";

    if (wasRecording) {
      recorder.onstop = () => {
        const blob = new Blob(recordingChunksRef.current, {
          type: "audio/webm",
        });

        if (shouldKeep && blob.size > 0) {
          if (voicePreview?.url?.startsWith("blob:")) {
            URL.revokeObjectURL(voicePreview.url);
          }

          const url = URL.createObjectURL(blob);

          setVoicePreview({
            type: "voice",
            blob,
            url,
            contentType: "audio/webm",
            ext: "webm",
            fileSize: blob.size,
            duration: 30 - remainingSeconds,
          });
        }

        cleanupRecording();
        setIsRecording(false);
        setRemainingSeconds(30);
      };

      recorder.stop();
    } else {
      cleanupRecording();
      setIsRecording(false);
      setRemainingSeconds(30);
    }
  };

  const stopVoiceRecordingAndSend = () => {
  const recorder = mediaRecorderRef.current;

  if (!recorder) {
    cleanupRecording();
    setIsRecording(false);
    setRemainingSeconds(30);
    return;
  }

  const wasRecording = recorder.state !== "inactive";

  if (wasRecording) {
    recorder.onstop = () => {
      const blob = new Blob(recordingChunksRef.current, {
        type: "audio/webm",
      });

      if (blob.size > 0) {
        if (voicePreview?.url?.startsWith("blob:")) {
          URL.revokeObjectURL(voicePreview.url);
        }

        const url = URL.createObjectURL(blob);

        const durationSec = getRecordedDurationSeconds();

        // 👇 فقط preview ذخیره می‌کنیم (ارسال نمی‌کنیم)
        setVoicePreview({
          type: "voice",
          blob,
          url,
          contentType: "audio/webm",
          ext: "webm",
          fileSize: blob.size,
          duration: durationSec,
        });
      }

      cleanupRecording();
      setIsRecording(false);
      setRemainingSeconds(30);
    };

    recorder.stop();
  } else {
    cleanupRecording();
    setIsRecording(false);
    setRemainingSeconds(30);
  }
};

  const startVoiceRecording = async () => {
    try {
      if (isRecording) return;

      if (filePreview?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(filePreview.url);
      }
      setFilePreview(null);

      if (voicePreview?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(voicePreview.url);
      }
      setVoicePreview(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let recorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      } catch {
        recorder = new MediaRecorder(stream);
      }

      recordingStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      recordingChunksRef.current = [];
      recordingStartedAtRef.current = Date.now();
      setRemainingSeconds(30);
      setIsRecording(true);
      setShowEmoji(false);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordingChunksRef.current.push(event.data);
        }
      };

      recorder.start();

      recordingIntervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            stopVoiceRecordingAndSend();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Voice recording failed:", error);
      cleanupRecording();
      setIsRecording(false);
      setRemainingSeconds(30);
      alert("دسترسی به میکروفن برقرار نشد.");
    }
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
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-3 space-y-2"
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

          {messages.filter((msg) => !msg.deletedForMe).map((msg) => (
            <div
  key={msg.id}
  className={`
    ${msg.deletedForEveryone 
  ? "max-w-[40%] px-1 py-[2px] text-[10px] opacity-60 italic text-gray-400 mx-auto text-center bg-transparent shadow-none"
  : `max-w-[70%] p-2 rounded-xl text-sm ${
      msg.sender === "me"
        ? "bg-yellow-100 ml-auto"
        : "bg-gray-100"
    }`
}
  `}
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
      {msg.sender === "me" ? "شما" : user.name}:
    </p>
        {msg.isForwarded && (
      <div className="mb-1 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-[2px]">
        <span className="text-[10px] font-semibold text-emerald-700">
          فوروارد شده
        </span>
      </div>
    )}

    {msg.isForwarded && msg.forwardedFromMessage && (
  <div className="mb-2 rounded-lg border-r-4 border-emerald-400 bg-emerald-50 px-2 py-1 text-right">
    <p className="text-[10px] font-semibold text-emerald-700">
      پیام اصلی
    </p>
    <p className="text-[10px] text-gray-600 whitespace-pre-wrap break-words leading-5 max-h-52 overflow-hidden">
      {msg.forwardedFromMessage.deletedForEveryone
       ? "این پیام حذف شده است"
        : msg.forwardedFromMessage.text ||
        (msg.forwardedFromMessage.type === "image"
        ? "تصویر"
        : "پیام بدون متن")}
    </p>
  </div>
)}

    {msg.replyToMessage && (
  <div className="mb-2 rounded-lg border-r-4 border-yellow-400 bg-yellow-50 px-2 py-1 text-right">
    <p className="text-[10px] font-semibold text-yellow-700">
      پاسخ به {msg.replyToMessage.senderName}
    </p>
    <p className="text-[10px] text-gray-600 whitespace-pre-wrap break-words leading-5 max-h-52 overflow-hidden">
     {msg.replyToMessage.deletedForEveryone
     ? "این پیام حذف شده است"
      : msg.replyToMessage.text ||
       (msg.replyToMessage.type === "image"
        ? "تصویر"
        : "پیام بدون متن")}
    </p>
  </div>
)}

    {msg.type === "text" && (
      <p className="whitespace-pre-wrap">{msg.text}</p>
    )}

    {msg.type === "voice" && (
  <div className="mt-1">
    <audio controls src={msg.file} className="w-full max-w-[220px]" />
    {msg.duration ? (
      <p className="text-[10px] text-gray-500 mt-1">
        {msg.duration} ثانیه
      </p>
    ) : null}
    {msg.text ? (
      <p className="mt-2 whitespace-pre-wrap">{msg.text}</p>
    ) : null}
  </div>
)}

    {msg.type === "image" && (
  <>
    <button
      type="button"
      onClick={() => setSelectedImage(msg.file)}
      className="block mt-1"
    >
      <img
        src={msg.file}
        alt="img"
        className="rounded-xl max-h-40 cursor-zoom-in"
      />
    </button>

    {msg.text ? (
      <p className="mt-2 whitespace-pre-wrap">{msg.text}</p>
    ) : null}
  </>
)}


    <div className="flex items-center justify-between gap-2 mt-1">
  {!msg.deletedForEveryone && !msg.deletedForMe && (
    <div className="flex items-center gap-1">
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

  <button
    type="button"
    onClick={() => handleReplyToMessage(msg)}
    className="p-1 rounded-md text-blue-500 hover:bg-blue-50 transition"
    title="پاسخ به پیام"
  >
    <CornerUpLeft size={14} />
  </button>

  <button
    type="button"
    onClick={() => handleForwardMessage(msg)}
    className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 transition"
    title="فوروارد پیام"
  >
    <Forward size={14} />
  </button>

  <button
    type="button"
    onClick={() => setMessageToDelete(msg)}
    className="p-1 rounded-md text-red-500 hover:bg-red-50 transition"
    title="حذف پیام"
  >
    <Trash2 size={14} />
  </button>
</div>
  )}

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
    onClick={() => handleReactToMessage(msg.id, emoji)}
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

          {isTyping && (input.trim() || filePreview || voicePreview) && (
            <div className="text-xs text-gray-400 px-1">
              در حال نوشتن...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* preview فایل */}
        {filePreview && (
  <div className="absolute bottom-20 left-3 bg-white border border-yellow-200 rounded-xl p-1.5 shadow z-10 relative max-w-[120px]">

    {/* ❌ دکمه حذف */}
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

    {/* preview */}
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

        {replyingToMessage && (
  <div className="border-t border-yellow-100 bg-yellow-50 px-3 py-2 flex items-start justify-between gap-3">
    <div className="min-w-0 text-right">
      <p className="text-[11px] font-semibold text-yellow-700">
        پاسخ به {replyingToMessage.senderName}
      </p>
      <p className="text-[11px] text-gray-600 truncate">
        {replyingToMessage.deletedForEveryone
          ? "این پیام حذف شده است"
          : replyingToMessage.text || "پیام بدون متن"}
      </p>
    </div>

    <button
      type="button"
      onClick={() => setReplyingToMessage(null)}
      className="shrink-0 p-1 rounded-md text-gray-500 hover:bg-yellow-100 transition"
      title="لغو پاسخ"
    >
      <X size={16} />
    </button>
  </div>
)}

{forwardingMessage && (
  <div className="border-t border-emerald-100 bg-emerald-50 px-3 py-2 flex items-start justify-between gap-3">
    <div className="min-w-0 text-right">
      <p className="text-[11px] font-semibold text-emerald-700">
        فوروارد پیام
      </p>
      <p className="text-[11px] text-gray-600 truncate">
        {forwardingMessage.type === "text"
          ? forwardingMessage.text || "پیام بدون متن"
          : forwardingMessage.type === "image"
          ? forwardingMessage.text || "تصویر"
          : "پیام"}
      </p>
    </div>

    <button
      type="button"
      onClick={() => setForwardingMessage(null)}
      className="shrink-0 p-1 rounded-md text-gray-500 hover:bg-emerald-100 transition"
      title="لغو فوروارد"
    >
      <X size={16} />
    </button>
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
  {isRecording && (
  <div className="absolute bottom-20 right-16 bg-white border border-red-200 rounded-xl px-3 py-2 shadow z-10">
    <p className="text-xs text-red-500 font-semibold">
      ضبط صدا... {remainingSeconds}
    </p>
  </div>
)}

{voicePreview && (
  <div className="absolute bottom-20 left-3 bg-white border border-yellow-200 rounded-xl p-2 shadow z-10 max-w-[220px]">
    <div className="flex items-center justify-between gap-2 mb-2">
      <p className="text-xs text-gray-700">
        پیام صوتی ({voicePreview.duration} ثانیه)
      </p>

      <button
        type="button"
        onClick={() => {
          if (voicePreview?.url?.startsWith("blob:")) {
            URL.revokeObjectURL(voicePreview.url);
          }
          setVoicePreview(null);
        }}
        className="text-red-500 hover:text-red-600"
        title="حذف پیام صوتی"
      >
        <X size={14} />
      </button>
    </div>

    <audio controls src={voicePreview.url} className="w-full" />
  </div>
)}

    <button
    type="button"
    onClick={isRecording ? stopVoiceRecordingAndSend : startVoiceRecording}
    className="p-2 rounded-lg hover:bg-yellow-100 shrink-0"
    title={isRecording ? "توقف ضبط" : "شروع ضبط"}
  >
    {isRecording ? (
      <Square size={20} className="text-red-500" />
    ) : (
      <Mic size={20} className="text-yellow-600" />
    )}
  </button>
  <button
    type="submit"
    className="bg-yellow-500 text-white px-3 rounded-xl h-[42px] flex items-center justify-center shrink-0"
  >
    <Send size={18} />
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
    type="button"
    onClick={() => setShowEmoji((prev) => !prev)}
    className="p-2 rounded-lg hover:bg-yellow-100 shrink-0"
  >
    <Smile size={20} className="text-yellow-600" />
  </button>

  <label className="p-2 rounded-lg hover:bg-yellow-100 cursor-pointer shrink-0">
    <ImageIcon size={20} className="text-yellow-600" />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
  </label>
</form>
      </motion.div>

      {showForwardPicker && (
  <div
    className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[80]"
    onClick={() => setShowForwardPicker(false)}
  >
    <div
      className="bg-white w-[90%] max-w-sm rounded-2xl shadow-xl border border-yellow-200 p-4 text-right max-h-[70vh] overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-sm font-bold text-gray-800 mb-2">
        انتخاب مقصد فوروارد
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        پیامی که انتخاب کرده‌ای برای کدام گفتگو ارسال شود؟
      </p>

      <div className="mb-3">
       <textarea
        value={forwardComment}
        onChange={(e) => setForwardComment(e.target.value)}
        placeholder="در صورت تمایل، پیام خودت را به فوروارد اضافه کن..."
        rows={2}
        className="w-full border border-yellow-200 rounded-xl px-3 py-2 text-sm outline-none resize-none"
       />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {isLoadingForwardTargets ? (
          <p className="text-sm text-gray-400 text-center py-6">
            در حال بارگذاری گفتگوها...
          </p>
        ) : forwardTargets.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            هنوز گفتگویی برای فوروارد پیدا نشد
          </p>
        ) : (
          forwardTargets.map((target) => (
          <button
             key={target.id}
             type="button"
             onClick={() => handleSendForwardToTarget(target.id)}
             className="w-full rounded-xl border border-yellow-100 hover:border-yellow-300 hover:bg-yellow-50 px-3 py-3 text-right transition"
          >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {target.name}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate mt-1">
                    {target.subtitle || "گفت‌وگوی خصوصی"}
                  </p>
                </div>

                {target.unreadCount > 0 && (
                  <span className="min-w-5 h-5 px-1 rounded-full bg-yellow-500 text-white text-[10px] flex items-center justify-center">
                    {target.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => setShowForwardPicker(false)}
          className="px-4 h-10 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          بستن
        </button>
      </div>
    </div>
  </div>
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
        آیا از حذف این پیام مطمئن هستی؟
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
          onClick={async () => {
           const success = await handleDeleteMessage(messageToDelete.id);
           if (success) {
           setMessageToDelete(null);
           }
         }}
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

      <a
        href={selectedImage}
        download
        className="absolute top-2 left-2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow"
        title="دانلود تصویر"
      >
        ⬇️
      </a>

      <img
        src={selectedImage}
        alt="full"
        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
      />
    </div>
  </div>
)}
    </div>
  );
}