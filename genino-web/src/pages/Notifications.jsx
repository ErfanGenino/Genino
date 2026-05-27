// 📄 src/pages/Notifications.jsx
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Trash2, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authFetch,
} from "../services/api";


export default function Notifications() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [roleChangeNotification, setRoleChangeNotification] = useState(null);
  const [changedFollowRole, setChangedFollowRole] = useState("");

  const followRoles = [
  { value: "sister", label: "خواهر" },
  { value: "brother", label: "برادر" },
  { value: "khale", label: "خاله" },
  { value: "amme", label: "عمه" },
  { value: "dayi", label: "دایی" },
  { value: "ammo", label: "عمو" },
  { value: "grandfather_paternal", label: "پدربزرگ پدری" },
  { value: "grandmother_paternal", label: "مادربزرگ پدری" },
  { value: "grandfather_maternal", label: "پدربزرگ مادری" },
  { value: "grandmother_maternal", label: "مادربزرگ مادری" },
  { value: "friend", label: "سایر دوستان" },
];


  const load = async () => {
  try {
    const res = await authFetch("/notifications");

    if (res?.ok) {
      setList(Array.isArray(res.notifications) ? res.notifications : []);
    } else {
      setList([]);
    }
  } catch (err) {
    console.error("خطا در دریافت اعلان‌ها:", err);
    setList([]);
  }
};


  useEffect(() => {
  load();
  

  const onStorage = () => {
    load();
    
  };

  window.addEventListener("genino_notifications_changed", load);
  

  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", load);
  document.addEventListener("visibilitychange", load);

  return () => {
    window.removeEventListener("genino_notifications_changed", load);
    

    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", load);
    document.removeEventListener("visibilitychange", load);
  };
}, []);



  const unreadCount = useMemo(
    () => list.filter((n) => !n.read).length,
    [list]
  );

  const markAllRead = () => {
    const updated = list.map((n) => ({ ...n, read: true }));
    localStorage.setItem("genino_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("genino_notifications_changed"));
    setList(updated);
  };

  const clearAll = async () => {
  const ok = window.confirm("همه اعلان‌ها حذف شوند؟");
  if (!ok) return;

  try {
    const res = await authFetch("/notifications", {
      method: "DELETE",
    });

    if (res?.ok) {
      setList([]);
      window.dispatchEvent(new Event("genino_notifications_changed"));
    } else {
      alert(res?.message || "حذف اعلان‌ها انجام نشد");
    }
  } catch (err) {
    console.error("خطا در حذف همه اعلان‌ها:", err);
    alert("حذف اعلان‌ها انجام نشد");
  }
};

  const markOneRead = async (id) => {
  try {
    const res = await authFetch(`/notifications/${id}/read`, {
      method: "PATCH",
    });

    if (res?.ok) {
      setList((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  } catch (err) {
    console.error("خطا در خواندن اعلان:", err);
  }
};

const deleteOneNotification = async (id) => {
  const ok = window.confirm("این اعلان حذف شود؟");
  if (!ok) return;

  try {
    const res = await authFetch(`/notifications/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      setList((prev) => prev.filter((n) => n.id !== id));
      window.dispatchEvent(new Event("genino_notifications_changed"));
    } else {
      alert(res?.message || "حذف اعلان انجام نشد");
    }
  } catch (err) {
    console.error("خطا در حذف اعلان:", err);
    alert("حذف اعلان انجام نشد");
  }
};

const handleAcceptInvitation = async (notification) => {
  const token = notification?.data?.token;

  if (!token) {
    alert("اطلاعات دعوت کامل نیست");
    return;
  }

  try {
    const res = await authFetch("/invitations/accept", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    if (res?.ok) {
      await markOneRead(notification.id);
      await load();

      // لیست کودکان مادر دوباره از سرور گرفته شود
      const children = await authFetch("/children");
      const childrenArr = Array.isArray(children)
        ? children
        : Array.isArray(children?.children)
        ? children.children
        : [];

      localStorage.setItem("children", JSON.stringify(childrenArr));

      if (res.childId) {
        localStorage.setItem("activeChildId", String(res.childId));
      }

      window.dispatchEvent(new Event("storage"));

      alert("دعوت با موفقیت پذیرفته شد");
      navigate("/mychild");
    } else {
      alert(res?.message || "پذیرش دعوت انجام نشد");
    }
  } catch (err) {
    console.error("خطا در پذیرش دعوت:", err);
    alert("پذیرش دعوت انجام نشد");
  }
};

const handleRejectInvitation = async (notification) => {
  const token = notification?.data?.token;

  if (!token) {
    alert("اطلاعات دعوت کامل نیست");
    return;
  }

  try {
    const res = await authFetch("/invitations/reject", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    if (res?.ok) {
      await markOneRead(notification.id);
      await load();
      alert("دعوت رد شد");
    } else {
      alert(res?.message || "رد دعوت انجام نشد");
    }
  } catch (err) {
    console.error("خطا در رد دعوت:", err);
    alert("رد دعوت انجام نشد");
  }
};


const handleAcceptFollowRequest = async (notification) => {
  try {
    const requestId = notification?.data?.requestId;

    const res = await authFetch(
      `/child-follow-requests/${requestId}/parent-decision`,
      {
        method: "POST",
        body: JSON.stringify({
          action: "ACCEPT",
        }),
      }
    );

    if (res?.ok) {
      await markOneRead(notification.id);
      await load();

      alert("درخواست فالو پذیرفته شد ✨");
    } else {
      alert(res?.message || "خطا در پذیرش درخواست");
    }
  } catch (err) {
    console.error(err);
    alert("خطا در پذیرش درخواست");
  }
};

const handleRejectFollowRequest = async (notification) => {
  try {
    const requestId = notification?.data?.requestId;

    const res = await authFetch(
      `/child-follow-requests/${requestId}/parent-decision`,
      {
        method: "POST",
        body: JSON.stringify({
          action: "REJECT",
        }),
      }
    );

    if (res?.ok) {
      await markOneRead(notification.id);
      await load();

      alert("درخواست فالو رد شد");
    } else {
      alert(res?.message || "خطا در رد درخواست");
    }
  } catch (err) {
    console.error(err);
    alert("خطا در رد درخواست");
  }
};

const handleChangeRoleFollowRequest = (notification) => {
  setChangedFollowRole("");
  setRoleChangeNotification(notification);
};

const submitChangedFollowRole = async () => {
  if (!roleChangeNotification || !changedFollowRole) {
    return;
  }

  try {
    const requestId =
      roleChangeNotification?.data?.requestId;

    const res = await authFetch(
      `/child-follow-requests/${requestId}/parent-decision`,
      {
        method: "POST",
        body: JSON.stringify({
          action: "CHANGE_ROLE",
          approvedRole: changedFollowRole,
        }),
      }
    );

    if (res?.ok) {
      await markOneRead(roleChangeNotification.id);
      await load();

      setRoleChangeNotification(null);
      setChangedFollowRole("");

      alert("نقش جدید ثبت شد ✨");
    } else {
      alert(res?.message || "خطا در تغییر نقش");
    }
  } catch (err) {
    console.error(err);
    alert("خطا در تغییر نقش");
  }
};

const handleAcceptChangedRole = async (notification) => {
  try {
    const requestId = notification?.data?.requestId;

    const res = await authFetch(
      `/child-follow-requests/${requestId}/requester-decision`,
      {
        method: "POST",
        body: JSON.stringify({
          action: "ACCEPT",
        }),
      }
    );

    if (res?.ok) {
      await markOneRead(notification.id);
      await load();

      alert("نقش جدید پذیرفته شد ✨");
    } else {
      alert(res?.message || "خطا در پذیرش نقش جدید");
    }
  } catch (err) {
    console.error(err);
    alert("خطا در پذیرش نقش جدید");
  }
};

const handleRejectChangedRole = async (notification) => {
  try {
    const requestId = notification?.data?.requestId;

    const res = await authFetch(
      `/child-follow-requests/${requestId}/requester-decision`,
      {
        method: "POST",
        body: JSON.stringify({
          action: "REJECT",
        }),
      }
    );

    if (res?.ok) {
      await markOneRead(notification.id);
      await load();

      alert("نقش جدید رد شد");
    } else {
      alert(res?.message || "خطا در رد نقش جدید");
    }
  } catch (err) {
    console.error(err);
    alert("خطا در رد نقش جدید");
  }
};

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffdf5] to-[#fff7d6] pt-24 pb-16 px-4"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-700 transition"
          >
            <ArrowRight size={18} />
            بازگشت
          </button>

          <div className="flex items-center gap-2">
            <Bell className="text-yellow-600" />
            <h1 className="text-lg sm:text-xl font-extrabold text-yellow-700">
              اعلان‌ها
            </h1>

            {unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              disabled={list.length === 0 || unreadCount === 0}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-xl border transition
                ${
                  list.length === 0 || unreadCount === 0
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-yellow-200 hover:bg-yellow-50"
                }`}
            >
              <CheckCircle2 size={18} />
              خواندن همه
            </button>

            <button
              onClick={clearAll}
              disabled={list.length === 0}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-xl border transition
                ${
                  list.length === 0
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-red-600 border-red-200 hover:bg-red-50"
                }`}
            >
              <Trash2 size={18} />
              پاک کردن
            </button>
          </div>
        </div>

        {/* Content */}
        
          <>
            {list.length === 0 ? (
              <div className="bg-white/80 border border-yellow-200 rounded-3xl p-8 text-center shadow-sm">
                <div className="text-3xl mb-3">🌿</div>
                <div className="text-gray-700 font-semibold mb-1">
                  اعلانی ندارید
                </div>
              
              </div>
            ) : (
              <div className="space-y-3">
                {list
                  .slice()
                  .reverse()
                  .map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white/90 border rounded-2xl p-4 shadow-sm transition
                        ${n.read ? "border-gray-200" : "border-yellow-300"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 text-right">
                          <div className="text-sm font-bold text-gray-800">
                            {n.title || "اعلان جدید"}
                          </div>
                          {n.body && (
                            <div className="text-xs text-gray-500 mt-1">
                              {n.body}
                            </div>
                          )}
                          {n.time && (
                            <div className="text-[11px] text-gray-400 mt-2">
                              {n.time}
                            </div>
                          )}

                          {n.type === "child_invitation" && !n.read && (
  <div className="flex items-center gap-2 mt-4">
    <button
      onClick={() => handleAcceptInvitation(n)}
      className="text-xs px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
    >
      قبول دعوت
    </button>

    <button
      onClick={() => handleRejectInvitation(n)}
      className="text-xs px-4 py-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition"
    >
      رد دعوت
    </button>
  </div>
)}

{n.type === "child_follow_request" && !n.read && (
  <div className="flex flex-wrap items-center gap-2 mt-4">
    <button
      onClick={() => handleAcceptFollowRequest(n)}
      className="text-xs px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
    >
      قبول
    </button>

    <button
      onClick={() => handleRejectFollowRequest(n)}
      className="text-xs px-4 py-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition"
    >
      رد
    </button>

    <button
      onClick={() => handleChangeRoleFollowRequest(n)}
      className="text-xs px-4 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
    >
      تغییر نقش
    </button>
  </div>
)}

{n.type === "child_follow_role_changed" && !n.read && (
  <div className="flex flex-wrap items-center gap-2 mt-4">
    <button
      onClick={() => handleAcceptChangedRole(n)}
      className="text-xs px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
    >
      قبول نقش جدید
    </button>

    <button
      onClick={() => handleRejectChangedRole(n)}
      className="text-xs px-4 py-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition"
    >
      رد نقش جدید
    </button>
  </div>
)}

                        </div>

                        <div className="flex flex-col gap-2">
  {!n.read && n.type !== "child_invitation" && (
    <button
      onClick={() => markOneRead(n.id)}
      className="text-xs px-3 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
    >
      خواندم
    </button>
  )}

  <button
    onClick={() => deleteOneNotification(n.id)}
    className="text-xs px-3 py-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition"
  >
    حذف
  </button>
</div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </>
        
      </div>


      {roleChangeNotification && (
  <div
    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4"
    onClick={() => setRoleChangeNotification(null)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] bg-white p-5 text-right shadow-2xl"
    >
      <h3 className="text-lg font-extrabold text-yellow-800 text-center">
        تغییر نقش فالو
      </h3>

      <p className="mt-3 text-sm text-gray-600 text-center leading-7">
        نقش مورد نظر والدین را انتخاب کنید.
      </p>

      <select
        value={changedFollowRole}
        onChange={(e) => setChangedFollowRole(e.target.value)}
        className="mt-5 w-full rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none"
      >
        <option value="">انتخاب نقش</option>
        {followRoles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setRoleChangeNotification(null)}
          className="flex-1 rounded-2xl border border-yellow-300 bg-white px-4 py-3 text-sm font-extrabold text-yellow-700"
        >
          انصراف
        </button>

        <button
          type="button"
          disabled={!changedFollowRole}
          onClick={submitChangedFollowRole}
          className={`flex-1 rounded-2xl px-4 py-3 text-sm font-extrabold text-white ${
            changedFollowRole
              ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
              : "bg-gray-300"
          }`}
        >
          ثبت نقش
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}
