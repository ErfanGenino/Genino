//src/pages/social/Feed.jsx

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  MessageSquare,
  Heart,
  Baby,
  User,
  X,
  Search,
  Trash2,
} from "lucide-react";
import GoldenDivider from "@components/Core/GoldenDivider.jsx";
import ChatRoom from "./ChatRoom.jsx";
import PrivateChat from "./PrivateChat.jsx";
import RoomCard from "../../components/Social/RoomCard";
import CreateRoomModal from "../../components/Social/CreateRoomModal";
import {
  searchGeninoUsers,
  getConversations,
  updateSocialPresence,
  getOnlineUsers,
  getRoomPresence,
  getChatRooms,
  createChatRoom,
  deleteChatRoom,
  updateChatRoom,
  presignChatRoomImageUpload,
  putFileToPresignedUrl,
  getMyFavoriteChatRooms,
  addFavoriteChatRoom,
  removeFavoriteChatRoom,
} from "../../services/api";
import { io } from "socket.io-client";

function SocialAvatar({ person, size = "w-10 h-10", active = false, color = "yellow" }) {
  const fallback = "/avatars/101.png";
  const avatarUrl = person?.avatarUrl || fallback;
  const firstLetter = person?.name?.charAt(0) || "ژ";

  const colorClass =
    color === "green"
      ? active
        ? "bg-green-200 text-green-800"
        : "bg-green-100 text-green-700"
      : color === "blue"
      ? "bg-blue-100 text-blue-700"
      : active
      ? "bg-yellow-300 text-yellow-800"
      : "bg-yellow-200 text-yellow-700";

  return (
    <div
      className={`${size} rounded-full overflow-hidden flex items-center justify-center font-bold text-sm ${colorClass}`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={person?.name || "کاربر ژنینو"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        firstLetter
      )}
    </div>
  );
}

export default function Feed() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [activePrivateUser, setActivePrivateUser] = useState(null);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roomOnlineCounts, setRoomOnlineCounts] = useState({});
  const socketRef = useRef(null);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [favoriteRoomIds, setFavoriteRoomIds] = useState([]);
  const [roomToFavorite, setRoomToFavorite] = useState(null);
  const [activeRoomTab, setActiveRoomTab] = useState("all");
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [isCreateRoomNoticeOpen, setIsCreateRoomNoticeOpen] = useState(false);

  const currentUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("genino_user") || "null");
  } catch {
    return null;
  }
})();

const currentUserId = Number(currentUser?.id || 0);

  const fixedRooms = [
    {
      id: "1",
      title: "اتاق عمومی",
      desc: "گفت‌وگو آزاد بین کاربران ژنینو",
      color: "bg-green-50",
      icon: <MessageSquare size={42} className="text-green-500" />,
      onlineCount: roomOnlineCounts[1] ?? 0,
    },
    {
      id: "2",
      title: "کودکان",
      desc: "رشد، بازی و آموزش کودک",
      color: "bg-yellow-50",
      icon: <Baby size={42} className="text-yellow-500" />,
      onlineCount: roomOnlineCounts[2] ?? 0,
    },
    {
      id: "3",
      title: "بانوان",
      desc: "موضوعات مربوط به بانوان و مادران",
      color: "bg-pink-50",
      icon: <Heart size={42} className="text-pink-400" />,
      onlineCount: roomOnlineCounts[3] ?? 0,
    },
    {
      id: "4",
      title: "آقایان",
      desc: "گفت‌وگوهای ویژه آقایان",
      color: "bg-blue-50",
      icon: <User size={42} className="text-blue-500" />,
      onlineCount: roomOnlineCounts[4] ?? 0,
    },
  ];

  const [customRooms, setCustomRooms] = useState([]);

  const [conversations, setConversations] = useState([]);

  const [privateMessagesByUser, setPrivateMessagesByUser] = useState({});

  const filteredConversations = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) return conversations;

    return conversations.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized)
    );
  }, [searchTerm, conversations]);

  useEffect(() => {
  const loadSearchResults = async () => {
    const normalized = searchTerm.trim();

    if (!normalized) {
      setSearchedUsers([]);
      return;
    }

    const res = await searchGeninoUsers(normalized);

    console.log("SEARCH TERM:", normalized);
    console.log("SEARCH RESPONSE:", res);

    if (!res?.ok) {
      console.log("SEARCH FAILED");
      setSearchedUsers([]);
      return;
    }

    console.log("SEARCH ITEMS:", res.items);

    const conversationIds = new Set(conversations.map((item) => item.id));

    const mapped = (res.items || [])
      .filter((item) => item.id && !conversationIds.has(item.id))
      .map((item) => ({
        id: item.id,
        name:
          item.fullName?.trim() ||
          `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
          item.username ||
          "کاربر ژنینو",
        username: item.username || "",
        online: false,
        avatarUrl: item.avatarUrl || null,
      }));

    console.log("SEARCH MAPPED:", mapped);

    setSearchedUsers(mapped);
  };

  loadSearchResults();
}, [searchTerm, conversations]);

useEffect(() => {
  let isMounted = true;

  const loadConversations = async () => {
    const res = await getConversations();

    if (!isMounted) return;

    if (!res?.ok) {
      setConversations([]);
      return;
    }

    setConversations(res.items || []);
  };

  loadConversations();

  const intervalId = setInterval(() => {
    loadConversations();
  }, 5000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, []);

useEffect(() => {
  updateSocialPresence();

  const intervalId = setInterval(() => {
    updateSocialPresence();
  }, 30000);

  return () => {
    clearInterval(intervalId);
  };
}, []);

useEffect(() => {
  let isMounted = true;

  const loadOnlineUsers = async () => {
    const res = await getOnlineUsers();

    if (!isMounted) return;

    if (!res?.ok) {
      setOnlineUsers([]);
      return;
    }

    const mapped = (res.items || []).map((item) => ({
      id: item.id,
      name:
        item.fullName?.trim() ||
        `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
        item.username ||
        "کاربر ژنینو",
      username: item.username || "",
      online: true,
      avatarUrl: item.avatarUrl || null,
    }));

    setOnlineUsers(mapped);
  };

  loadOnlineUsers();

  const intervalId = setInterval(() => {
    loadOnlineUsers();
  }, 5000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, []);

useEffect(() => {
  let isMounted = true;

  const roomIds = fixedRooms.map((room) => Number(room.id)).filter(Boolean);

  const loadRoomPresenceCounts = async () => {
    const results = await Promise.all(
      roomIds.map(async (roomId) => {
        const res = await getRoomPresence(roomId);

        return {
          roomId,
          count: res?.ok ? Number(res.count || 0) : 0,
        };
      })
    );

    if (!isMounted) return;

    const mappedCounts = results.reduce((acc, item) => {
      acc[item.roomId] = item.count;
      return acc;
    }, {});

    setRoomOnlineCounts((prev) => ({
  ...prev,
  ...mappedCounts,
}));
  };

  loadRoomPresenceCounts();

  const intervalId = setInterval(() => {
    loadRoomPresenceCounts();
  }, 5000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, []);

useEffect(() => {
  const socketBaseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

  const socket = io(socketBaseUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  socketRef.current = socket;

  socket.on("connect", () => {
    console.log("🟢 Feed socket connected:", socket.id);
  });

  socket.on("room_presence_updated", async ({ roomId }) => {
    const numericRoomId = Number(roomId);
    if (!numericRoomId) return;

    const res = await getRoomPresence(numericRoomId);

    if (!res?.ok) return;

    setRoomOnlineCounts((prev) => ({
      ...prev,
      [numericRoomId]: Number(res.count || 0),
    }));
  });

  socket.on("disconnect", () => {
    console.log("🔴 Feed socket disconnected:", socket.id);
  });

  return () => {
    socket.disconnect();
  };
}, []);

useEffect(() => {
  let isMounted = true;

  const loadChatRooms = async () => {
    const res = await getChatRooms();

    if (!isMounted) return;

    if (!res?.ok) {
      setCustomRooms([]);
      return;
    }

    const mapped = (res.items || []).map((room) => ({
  id: room.id,
  title: room.title,
  desc: room.description || "اتاق ساخته‌شده توسط کاربر",
  imageUrl: room.imageUrl || "",
  creatorId: Number(room.creatorId || 0),

  creatorName:
    room.creator?.fullName?.trim() ||
    `${room.creator?.firstName || ""} ${room.creator?.lastName || ""}`.trim() ||
    room.creator?.username ||
    "مدیر نامشخص",

  favoriteCount: Number(room?._count?.favoritedBy || 0),
  color: "bg-gray-50",
  icon: <MessageSquare size={42} className="text-gray-500" />,
  onlineCount: roomOnlineCounts[Number(room.id)] ?? 0,
}));

    setCustomRooms(mapped);
  };

  loadChatRooms();

  return () => {
    isMounted = false;
  };
}, [roomOnlineCounts]);

useEffect(() => {
  let isMounted = true;

  const loadFavoriteRooms = async () => {
    const res = await getMyFavoriteChatRooms();

    if (!isMounted) return;

    if (!res?.ok) {
      setFavoriteRoomIds([]);
      return;
    }

    const ids = (res.items || [])
      .map((item) => Number(item.roomId))
      .filter(Boolean);

    setFavoriteRoomIds(ids);
  };

  loadFavoriteRooms();

  return () => {
    isMounted = false;
  };
}, []);

const filteredOnlineUsers = useMemo(() => {
  const normalized = searchTerm.trim().toLowerCase();

  if (!normalized) return onlineUsers;

  return onlineUsers.filter((item) =>
    (item.name || "").toLowerCase().includes(normalized)
  );
}, [searchTerm, onlineUsers]);

const visibleCustomRooms = useMemo(() => {
  if (activeRoomTab === "favorites") {
    return customRooms.filter((room) =>
      favoriteRoomIds.includes(Number(room.id))
    );
  }

  if (activeRoomTab === "mine") {
    return customRooms.filter(
      (room) => Number(room.creatorId) === currentUserId
    );
  }

  return customRooms;
}, [activeRoomTab, customRooms, favoriteRoomIds, currentUserId]);

const filteredVisibleCustomRooms = useMemo(() => {
  const normalized = roomSearchTerm.trim().toLowerCase();

  if (!normalized) return visibleCustomRooms;

  return visibleCustomRooms.filter((room) => {
    const title = (room.title || "").toLowerCase();
    const desc = (room.desc || "").toLowerCase();

    return title.includes(normalized) || desc.includes(normalized);
  });
}, [roomSearchTerm, visibleCustomRooms]);

const roomTabCounts = useMemo(() => {
  const allCount = customRooms.length;

  const favoritesCount = customRooms.filter((room) =>
    favoriteRoomIds.includes(Number(room.id))
  ).length;

  const myRoomsCount = customRooms.filter(
    (room) => Number(room.creatorId) === currentUserId
  ).length;

  return {
    all: allCount,
    favorites: favoritesCount,
    mine: myRoomsCount,
  };
}, [customRooms, favoriteRoomIds, currentUserId]);

  const handleCreateRoom = async (roomData) => {
  const res = await createChatRoom({
    title: roomData.title,
    description: roomData.desc,
    imageUrl: roomData.imageUrl || "",
  });

  if (!res?.ok || !res.item) {
    alert(res?.message || "ساخت اتاق انجام نشد.");
    return;
  }

  const newRoom = {
  id: res.item.id,
  title: res.item.title,
  desc: res.item.description || "اتاق ساخته‌شده توسط کاربر",
  imageUrl: res.item.imageUrl || "",
  creatorId: Number(res.item.creatorId || 0),
  favoriteCount: Number(res.item?._count?.favoritedBy || 0),
  color: "bg-gray-50",
  icon: <MessageSquare size={42} className="text-gray-500" />,
  onlineCount: 0,
};

  setCustomRooms((prev) => [newRoom, ...prev]);
};

  const handleDeleteRoom = (room) => {
  if (!room) return;
  setRoomToDelete(room);
};

const confirmDeleteRoom = async () => {
  if (!roomToDelete?.id) return;

  const roomId = roomToDelete.id;

  const res = await deleteChatRoom(roomId);

  if (!res?.ok) {
    alert(res?.message || "حذف اتاق انجام نشد.");
    return;
  }

  setCustomRooms((prev) => prev.filter((room) => room.id !== roomId));

  if (activeRoom?.id === roomId) {
    setActiveRoom(null);
  }

  setRoomToDelete(null);
};

  const handleStartEditRoom = (room) => {
  setEditingRoom(room);
  setEditTitle(room.title || "");
  setEditDesc(room.desc || "");
  setEditImagePreview(
    room.imageUrl
      ? {
          url: room.imageUrl,
          blob: null,
          contentType: "",
          ext: "",
          fileSize: 0,
        }
      : null
  );
};

const handleAskFavoriteRoom = (room) => {
  if (!room?.id) return;
  setRoomToFavorite(room);
};

const confirmFavoriteRoom = async () => {
  if (!roomToFavorite?.id) return;

  const roomId = Number(roomToFavorite.id);
  const isAlreadyFavorite = favoriteRoomIds.includes(roomId);

  const res = isAlreadyFavorite
    ? await removeFavoriteChatRoom(roomId)
    : await addFavoriteChatRoom(roomId);

  if (!res?.ok) {
    alert(res?.message || "عملیات اتاق‌های مورد علاقه انجام نشد.");
    return;
  }

  setFavoriteRoomIds((prev) =>
    isAlreadyFavorite
      ? prev.filter((id) => id !== roomId)
      : [...prev, roomId]
  );

  setCustomRooms((prev) =>
    prev.map((room) =>
      Number(room.id) === roomId
        ? {
            ...room,
            favoriteCount: Math.max(
              0,
              Number(room.favoriteCount || 0) + (isAlreadyFavorite ? -1 : 1)
            ),
          }
        : room
    )
  );

  if (activeRoom?.id === roomId) {
    setActiveRoom((prev) =>
      prev
        ? {
            ...prev,
            favoriteCount: Math.max(
              0,
              Number(prev.favoriteCount || 0) + (isAlreadyFavorite ? -1 : 1)
            ),
          }
        : prev
    );
  }

  setRoomToFavorite(null);
};

const closeFavoriteModal = () => {
  setRoomToFavorite(null);
};

  const handleSaveEditRoom = async () => {
  if (!editingRoom?.id) return;

  if (!editTitle.trim()) {
    alert("نام اتاق الزامی است.");
    return;
  }

  let uploadedImageUrl = editingRoom.imageUrl || "";

  if (editImagePreview?.blob) {
    const presignRes = await presignChatRoomImageUpload({
      ext: editImagePreview.ext,
      contentType: editImagePreview.contentType,
      fileSize: editImagePreview.fileSize,
    });

    if (!presignRes?.ok || !presignRes.uploadUrl || !presignRes.publicUrl) {
      alert(presignRes?.message || "آماده‌سازی آپلود عکس اتاق انجام نشد.");
      return;
    }

    const uploadRes = await putFileToPresignedUrl(
      presignRes.uploadUrl,
      new File([editImagePreview.blob], `chat-room-image.${editImagePreview.ext}`, {
        type: editImagePreview.contentType,
      })
    );

    if (!uploadRes?.ok) {
      alert(uploadRes?.message || "آپلود عکس اتاق انجام نشد.");
      return;
    }

    uploadedImageUrl = presignRes.publicUrl;
  }

  const res = await updateChatRoom(editingRoom.id, {
    title: editTitle.trim(),
    description: editDesc.trim() || "اتاق ساخته‌شده توسط کاربر",
    imageUrl: uploadedImageUrl || "",
  });

  if (!res?.ok || !res.item) {
    alert(res?.message || "ویرایش اتاق انجام نشد.");
    return;
  }

  setCustomRooms((prev) =>
    prev.map((room) =>
      room.id === editingRoom.id
        ? {
            ...room,
            title: res.item.title,
            desc: res.item.description || "اتاق ساخته‌شده توسط کاربر",
            imageUrl: res.item.imageUrl || "",
            creatorId: Number(res.item.creatorId || 0),
          }
        : room
    )
  );

  if (activeRoom?.id === editingRoom.id) {
    setActiveRoom((prev) =>
      prev
        ? {
            ...prev,
            title: res.item.title,
            desc: res.item.description || "اتاق ساخته‌شده توسط کاربر",
            imageUrl: res.item.imageUrl || "",
            creatorId: Number(res.item.creatorId || 0),
          }
        : prev
    );
  }

  setEditingRoom(null);
  setEditTitle("");
  setEditDesc("");
  setEditImagePreview(null);
};

  const moveConversationToTop = (userData, updater) => {
    setConversations((prev) => {
      const existing = prev.find((item) => item.id === userData.id);

      const updatedItem = updater(
        existing || {
          id: userData.id,
          name: userData.name,
          subtitle: "گفت‌وگوی جدید",
          online: !!userData.online,
          unreadCount: 0,
        }
      );

      const rest = prev.filter((item) => item.id !== userData.id);
      return [updatedItem, ...rest];
    });
  };

  const handleOpenPrivateChat = (person) => {
    setActivePrivateUser(person);

    moveConversationToTop(person, (existing) => ({
      ...existing,
      id: person.id,
      name: person.name,
      online: typeof person.online === "boolean" ? person.online : existing.online,
      subtitle:
        existing.subtitle && existing.subtitle.trim()
          ? existing.subtitle
          : "گفت‌وگوی جدید",
      unreadCount: 0,
    }));
  };

  const handleDeleteConversation = (personId) => {
    setConversations((prev) => prev.filter((item) => item.id !== personId));

    if (activePrivateUser?.id === personId) {
      setActivePrivateUser(null);
    }
  };

  const buildConversationSubtitle = (message) => {
    if (message.type === "image") {
      return message.text?.trim()
        ? `آخرین گفتگو: ${message.text}`
        : "آخرین گفتگو: تصویر";
    }

    if (message.type === "video") {
      return message.text?.trim()
        ? `آخرین گفتگو: ${message.text}`
        : "آخرین گفتگو: ویدیو";
    }

    return `آخرین گفتگو: ${message.text || ""}`;
  };

  const handlePrivateMessageSend = (targetUser, message) => {
    setPrivateMessagesByUser((prev) => {
      const prevMessages = prev[targetUser.id] || [];
      return {
        ...prev,
        [targetUser.id]: [...prevMessages, message],
      };
    });

    moveConversationToTop(targetUser, (existing) => ({
      ...existing,
      id: targetUser.id,
      name: targetUser.name,
      online:
        typeof targetUser.online === "boolean"
          ? targetUser.online
          : existing.online,
      subtitle: buildConversationSubtitle(message),
      unreadCount: 0,
    }));
  };

  const isActiveUser = (personId) => activePrivateUser?.id === personId;

  return (
    <main className="min-h-screen bg-[#1f2fb2] pt-20 pb-16 px-4 md:px-6 relative overflow-hidden">
      {/* بک‌گراند مخملی آبی */}
<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_80%_15%,rgba(0,0,0,0.22),transparent_28%),radial-gradient(circle_at_25%_80%,rgba(0,0,0,0.20),transparent_30%),linear-gradient(135deg,#0b2f5b,#15508c_45%,#08284f)]" />

{/* بافت طرح‌دار پارچه */}
<div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-soft-light bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_12px),repeating-linear-gradient(-45deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_16px)]" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* عنوان */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-yellow-600 mb-3"
          >
            شبکه اجتماعی ژنینو 
          </motion.h1>
          <p className="text-white font-semibold text-sm max-w-md mx-auto drop-shadow-sm">
            وارد یکی از اتاق‌های گفتگو شو یا اتاق خودت رو بساز 
          </p>
        </div>

        {/* لایوت اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 items-start">
          {/* ستون کناری */}
          <aside className="bg-white/90 backdrop-blur-sm rounded-3xl border border-yellow-200 shadow-sm p-4 lg:sticky lg:top-24">
            {/* سرچ */}
            <div className="relative mb-5">
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در کاربران ژنینو..."
                className="w-full rounded-2xl border border-yellow-200 bg-white pr-10 pl-3 py-2.5 text-sm outline-none focus:border-yellow-400"
              />
            </div>

            {/* گفتگوها */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-yellow-700">گفتگوها</h2>
                <span className="text-[11px] text-gray-400">
                  {filteredConversations.length} نفر
                </span>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {filteredConversations.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    هنوز گفت‌وگویی نداری
                  </p>
                ) : (
                  filteredConversations.map((person) => (
                    <div
                      key={person.id}
                      className="w-full flex items-center gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenPrivateChat(person)}
                        className={`flex-1 text-right flex items-center gap-3 rounded-2xl border px-3 py-3 transition min-w-0 ${
                          isActiveUser(person.id)
                            ? "border-yellow-300 bg-yellow-100 shadow-sm"
                            : "border-yellow-100 bg-yellow-50/50 hover:bg-yellow-100"
                        }`}
                      >
                        <div className="relative shrink-0">
                          <SocialAvatar
                            person={person}
                            size="w-10 h-10"
                            active={isActiveUser(person.id)}
                            color="yellow"
                          />

                          <span
                            className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-white ${
                              person.online ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-gray-700 truncate">
                              {person.name}
                            </p>

                            {person.unreadCount > 0 && (
                              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-green-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                {person.unreadCount}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {person.subtitle}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteConversation(person.id)}
                        className="shrink-0 p-2 rounded-xl bg-white border border-red-100 text-red-500 hover:bg-red-50 transition"
                        title="حذف از لیست"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* نتایج جستجو */}
            {searchTerm.trim() && (
              <>
                <GoldenDivider width="w-24" margin="my-5" />

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-yellow-700">
                      نتایج جستجو
                    </h2>
                    <span className="text-[11px] text-gray-400">
                      {searchedUsers.length} نفر
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {searchedUsers.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4">
                        کاربر جدیدی پیدا نشد
                      </p>
                    ) : (
                      searchedUsers.map((person) => (
                        <button
                          key={person.id}
                          type="button"
                          onClick={() => handleOpenPrivateChat(person)}
                          className="w-full text-right flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 hover:bg-blue-100 px-3 py-3 transition"
                        >
                          <div className="relative shrink-0">
                            <SocialAvatar
                              person={person}
                              size="w-10 h-10"
                              color="blue"
                            />

                            <span
                              className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-white ${
                                person.online ? "bg-green-500" : "bg-gray-300"
                              }`}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-700 truncate">
                              {person.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              برای شروع گفتگو کلیک کن
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            <GoldenDivider width="w-24" margin="my-5" />

            {/* کاربران آنلاین */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-yellow-700">
                  آنلاین در ژنینو
                </h2>
                <span className="text-[11px] text-gray-400">
                  {filteredOnlineUsers.length} نفر
                </span>
              </div>

              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {filteredOnlineUsers.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    کاربر آنلاینی پیدا نشد
                  </p>
                ) : (
                  filteredOnlineUsers.map((person) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => handleOpenPrivateChat(person)}
                      className={`w-full text-right flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition ${
                        isActiveUser(person.id)
                          ? "border-green-300 bg-green-100 shadow-sm"
                          : "border-green-100 bg-green-50/70 hover:bg-green-100"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <SocialAvatar
                          person={person}
                          size="w-9 h-9"
                          active={isActiveUser(person.id)}
                          color="green"
                        />

                        <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {person.name}
                        </p>
                        <p className="text-[11px] text-green-600">آنلاین</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* بخش اصلی */}
          <section className="min-w-0">
            <div className="flex justify-center items-center gap-6 flex-wrap mb-8">
              {fixedRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onClick={setActiveRoom}
                />
              ))}
            </div>

            <GoldenDivider width="w-48" margin="my-12" />

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="flex justify-center mt-8"
>
  <button
    onClick={() => setIsCreateRoomNoticeOpen(true)}
    className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-7 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all"
  >
    <PlusCircle size={20} className="opacity-90" />
    ساخت اتاق جدید
  </button>
</motion.div>

<div className="flex justify-center mt-4">
  <div className="relative w-full max-w-xs">
    <Search
      size={16}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      value={roomSearchTerm}
      onChange={(e) => setRoomSearchTerm(e.target.value)}
      placeholder="جستجو در اتاق‌ها..."
      className="w-full rounded-full border border-yellow-100 bg-white/80 pr-9 pl-3 py-2 text-xs text-gray-700 shadow-sm outline-none focus:border-yellow-300 focus:bg-white transition"
    />
  </div>
</div>

<div className="flex justify-center gap-3 flex-wrap mt-8 mb-8">
  <button
    type="button"
    onClick={() => setActiveRoomTab("all")}
    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
      activeRoomTab === "all"
        ? "bg-yellow-500 text-white shadow-md"
        : "bg-white border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
    }`}
  >
   همه اتاق‌ها ({roomTabCounts.all}) 
  </button>

  <button
    type="button"
    onClick={() => setActiveRoomTab("favorites")}
    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
      activeRoomTab === "favorites"
        ? "bg-yellow-500 text-white shadow-md"
        : "bg-white border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
    }`}
  >
   اتاق‌های مورد علاقه من ({roomTabCounts.favorites})
  </button>

  <button
    type="button"
    onClick={() => setActiveRoomTab("mine")}
    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
      activeRoomTab === "mine"
        ? "bg-yellow-500 text-white shadow-md"
        : "bg-white border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
    }`}
  >
   اتاق‌های من ({roomTabCounts.mine})
  </button>
</div>

<div className="flex justify-center items-center gap-6 flex-wrap mt-6">
  {filteredVisibleCustomRooms.length === 0 ? (
    <p className="text-sm text-gray-400 text-center">
      در این بخش هنوز اتاقی برای نمایش وجود ندارد
    </p>
  ) : (
    filteredVisibleCustomRooms.map((room) => (
      <RoomCard
        key={room.id}
        room={room}
        onClick={setActiveRoom}
        onEdit={handleStartEditRoom}
        onDelete={handleDeleteRoom}
        onFavorite={handleAskFavoriteRoom}
        isCustom={room.creatorId === currentUserId}
        isFavorite={favoriteRoomIds.includes(Number(room.id))}
        showFavoriteButton={true}
      />
    ))
  )}
</div>

          </section>
        </div>
      </div>

      {/* پنجره چت روم */}
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
              <button
                onClick={() => setActiveRoom(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
              >
                <X size={20} />
              </button>

              <ChatRoom room={activeRoom} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isCreateRoomNoticeOpen && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[75]"
    onClick={() => setIsCreateRoomNoticeOpen(false)}
  >
    <div
      dir="rtl"
      className="w-[92%] max-w-md bg-white rounded-3xl border border-yellow-200 shadow-xl p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold text-yellow-700 mb-3">
        نکات مهم ساخت اتاق
      </h2>

      <div className="space-y-3 text-sm text-gray-600 leading-7">
        <p>
          اگر در اتاق ساخته‌شده به مدت{" "}
          <span className="font-semibold text-gray-800">۷ روز</span>{" "}
          هیچ فعالیتی انجام نشود، آن اتاق به‌صورت خودکار حذف خواهد شد.
        </p>

        <p>
          همچنین محتوای منتشرشده در اتاق باید{" "}
          <span className="font-semibold text-gray-800">
            مطابق با قوانین کشور
          </span>{" "}
          باشد.
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={() => {
            setIsCreateRoomNoticeOpen(false);
            setIsCreateRoomOpen(true);
          }}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
        >
          متوجه شدم
        </button>

        <button
          type="button"
          onClick={() => setIsCreateRoomNoticeOpen(false)}
          className="flex-1 bg-white border border-yellow-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all"
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
)}

      <CreateRoomModal
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
        onCreate={handleCreateRoom}
      />

      {editingRoom && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]">
          <div
            dir="rtl"
            className="w-[92%] max-w-md bg-white rounded-3xl border border-yellow-200 shadow-xl p-5"
          >
            <h2 className="text-lg font-bold text-yellow-700 mb-4">
              ویرایش اتاق
            </h2>

            <div className="space-y-4">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-600">نام اتاق</span>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-600">توضیح کوتاه</span>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
                />
              </label>

              <label className="flex flex-col gap-2">
  <span className="text-xs text-gray-600">عکس اتاق</span>

  <label className="inline-flex items-center gap-2 w-fit cursor-pointer rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm text-yellow-700 hover:bg-yellow-50">
    انتخاب عکس
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

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

              setEditImagePreview({
                url,
                blob,
                contentType: "image/jpeg",
                ext: "jpg",
                fileSize: blob.size,
              });
            },
            "image/jpeg",
            0.8
          );
        };

        reader.readAsDataURL(file);
      }}
    />
  </label>

  {editImagePreview?.url && (
    <img
      src={editImagePreview.url}
      alt="preview"
      className="w-full h-40 object-cover rounded-2xl border border-yellow-200"
    />
  )}
</label>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveEditRoom}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
                >
                  ذخیره تغییرات
                </button>

                <button
                  onClick={() => {
                    setEditingRoom(null);
                    setEditTitle("");
                    setEditDesc("");
                    setEditImagePreview(null);
                  }}
                  className="flex-1 bg-white border border-yellow-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {roomToDelete && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[80]"
    onClick={() => setRoomToDelete(null)}
  >
    <div
      dir="rtl"
      className="w-[92%] max-w-md bg-white rounded-3xl border border-yellow-200 shadow-xl p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold text-yellow-700 mb-3">
        حذف اتاق
      </h2>

      <p className="text-sm text-gray-600 leading-7">
        آیا از حذف اتاق{" "}
        <span className="font-semibold text-gray-800">
          {roomToDelete.title}
        </span>{" "}
        مطمئن هستی؟
      </p>

      <p className="text-xs text-gray-400 mt-2">
        این عملیات قابل بازگشت نیست.
      </p>

      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={confirmDeleteRoom}
          className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 transition-all"
        >
          بله، حذف شود
        </button>

        <button
          type="button"
          onClick={() => setRoomToDelete(null)}
          className="flex-1 bg-white border border-yellow-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all"
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
)}


{roomToFavorite && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[85]"
    onClick={closeFavoriteModal}
  >
    <div
      dir="rtl"
      className="w-[92%] max-w-md bg-white rounded-3xl border border-yellow-200 shadow-xl p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold text-yellow-700 mb-3">
        {favoriteRoomIds.includes(Number(roomToFavorite.id))
          ? "حذف از اتاق‌های مورد علاقه"
          : "افزودن به اتاق‌های مورد علاقه"}
      </h2>

      <p className="text-sm text-gray-600 leading-7">
        {favoriteRoomIds.includes(Number(roomToFavorite.id)) ? (
          <>
            آیا دوست دارید اتاق{" "}
            <span className="font-semibold text-gray-800">
              {roomToFavorite.title}
            </span>{" "}
            از لیست اتاق‌های مورد علاقه شما حذف شود؟
          </>
        ) : (
          <>
            آیا دوست دارید اتاق{" "}
            <span className="font-semibold text-gray-800">
              {roomToFavorite.title}
            </span>{" "}
            به لیست اتاق‌های مورد علاقه شما اضافه شود؟
          </>
        )}
      </p>

      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={confirmFavoriteRoom}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
        >
          بله
        </button>

        <button
          type="button"
          onClick={closeFavoriteModal}
          className="flex-1 bg-white border border-yellow-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all"
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
)}

      {activePrivateUser && (
        <PrivateChat
          user={activePrivateUser}
          initialMessages={privateMessagesByUser[activePrivateUser.id] || []}
          onSendMessage={handlePrivateMessageSend}
          onClose={() => setActivePrivateUser(null)}
        />
      )}
    </main>
  );
}