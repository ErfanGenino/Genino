//src/services/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE URL IS:", BASE_URL);

function getAuthToken() {
  return localStorage.getItem("genino_token");
}

function getRefreshToken() {
  return localStorage.getItem("genino_refresh_token");
}

function saveTokens(token, refreshToken) {
  if (token) {
    localStorage.setItem("genino_token", token);
  }

  if (refreshToken) {
    localStorage.setItem("genino_refresh_token", refreshToken);
  }
}

function clearTokens() {
  localStorage.removeItem("genino_token");
  localStorage.removeItem("genino_refresh_token");
  localStorage.removeItem("genino_user");
  // پاک‌کردن اطلاعات نشست فروشنده
  localStorage.removeItem("genino_vendor_id");

  window.dispatchEvent(new Event("genino_token_changed"));
  window.dispatchEvent(new Event("genino_vendor_changed"));
}

export async function authFetch(url, options = {}) {
  const token = getAuthToken();

  const headers = {
    ...(options.headers || {}),
  };

  // فقط وقتی body داریم Content-Type بذار (برای GET بهتره نذاری)
  const hasBody = options.body !== undefined && options.body !== null;
  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    console.log("AUTH FETCH URL:", `${BASE_URL}${url}`);
    console.log("AUTH FETCH METHOD:", options.method || "GET");
    console.log("AUTH FETCH HAS TOKEN:", !!token);
    const doRequest = () =>
  fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    cache: "no-store",
  });

res = await doRequest();

// ✅ اگر access token منقضی شد، با refresh token توکن جدید می‌گیریم
if ((res.status === 401 || res.status === 403) && token) {

  const vendorId = localStorage.getItem("genino_vendor_id");

  console.log(
    "🚨 AUTH ERROR:",
    url,
    "STATUS:",
    res.status,
    "VENDOR:",
    vendorId
  );


  // اگر کاربر فروشنده است و خطا مربوط به درخواست کاربر بود،
  // کل نشست را پاک نکن
  if (vendorId && !url.includes("/vendors")) {
    console.warn(
      "⚠️ Vendor token used on non vendor endpoint:",
      url
    );

    return {
      ok: false,
      status: res.status,
      message: "دسترسی فروشنده به این بخش مجاز نیست"
    };
  }


  console.warn("ACCESS TOKEN EXPIRED - TRYING REFRESH TOKEN");

  const refreshToken = getRefreshToken();

  if (!refreshToken) {

    console.error(
      "🚨 TOKEN CLEAR BECAUSE NO REFRESH TOKEN",
      "URL:",
      url,
      "STATUS:",
      res.status
    );

    clearTokens();

    window.location.href = "/";

    return {
      ok: false,
      status: 401,
      message: "نشست شما به پایان رسیده است.",
    };
}

  try {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json();

    if (refreshRes.ok && refreshData?.token) {
      saveTokens(refreshData.token, refreshData.refreshToken);

      headers["Authorization"] = `Bearer ${refreshData.token}`;

      res = await doRequest();
    } else {

      console.error(
        "🚨 TOKEN CLEAR AFTER REFRESH FAILED",
        "URL:",
        url,
        "STATUS:",
        res.status
      );

      clearTokens();

      window.location.href = "/";

      return {
        ok: false,
        status: 401,
        message:
          refreshData?.message ||
          "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.",
      };
    }
  } catch (err) {
    console.error("REFRESH TOKEN ERROR:", err);

    clearTokens();

    window.location.href = "/";

    return {
      ok: false,
      status: 401,
      message: "خطا در بازیابی نشست کاربری.",
    };
  }
}

  } catch (err) {
    console.error("AUTH FETCH NETWORK ERROR:", err);
    return { ok: false, message: "خطا در اتصال به سرور.", status: 0 };
  }

  // تلاش برای parse پاسخ (JSON یا text)
  const contentType = res.headers.get("content-type") || "";
  let data = null;

  try {
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = text ? { message: text } : null;
    }
  } catch (err) {
    // اگر body خراب بود
    data = null;
  }

  // اگر بک‌اند خودش ok می‌دهد، همان را نگه می‌داریم؛
  // ولی اگر نداد، از status می‌سازیم
  if (data && typeof data === "object" && "ok" in data) {
    return { ...data, status: res.status };
  }

  // هندل استاندارد
    // اگر خطا بود
  if (!res.ok) {
  let message =
    (data && data.message) || `خطای سرور (${res.status})`;

  const lowerMessage = String(message).toLowerCase();

  const isAuthError =
    res.status === 401 ||
    res.status === 403 ||
    lowerMessage.includes("token") ||
    lowerMessage.includes("jwt") ||
    lowerMessage.includes("expired") ||
    lowerMessage.includes("unauthorized");

  if (isAuthError) {
    message =
      "ارتباط حساب کاربری شما نیاز به تازه‌سازی دارد. لطفاً یک‌بار از حساب خارج شوید و دوباره وارد شوید 💛";
  }

  return {
    ok: false,
    status: res.status,
    message,
    data,
  };
}

  // ✅ نکته مهم: اگر خروجی آرایه بود، آرایه را دستکاری نکن
  if (Array.isArray(data)) {
    // فقط ok/status را به عنوان property روی آرایه می‌گذاریم (آرایه می‌ماند آرایه)
    data.ok = true;
    data.status = res.status;
    return data;
  }

  // اگر آبجکت بود، مثل قبل ok/status اضافه کن
  return {
    ok: true,
    status: res.status,
    ...(data && typeof data === "object" ? data : {}),
  };

}

async function adminFetch(url, options = {}) {
  const token = localStorage.getItem("adminToken");

  const headers = {
    ...(options.headers || {}),
  };

  const hasBody =
    options.body !== undefined &&
    options.body !== null;

  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  return {
    status: res.status,
    ...data,
  };
}

// --- ثبت نام ---
export async function registerUser(formData) {
  const res = await authFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (res?.ok && res?.token) {
    saveTokens(res.token, res.refreshToken);
  }

  return res;
}

// --- ورود ---
export async function loginUser(credentials) {
  const res = await authFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (res?.ok && res?.token) {
    saveTokens(res.token, res.refreshToken);
  }

  return res;
}

// --- پروفایل ---
export async function getUserProfile() {
  return authFetch("/auth/profile", {
    method: "GET",
  });
}

// --- آپدیت مرحله زندگی ---
export async function updateLifeStage(stage) {
  return authFetch("/auth/update-life-stage", {
    method: "PUT",
    body: JSON.stringify({ lifeStage: stage }),
  });
}

// --- آپدیت پروفایل (me) ---
export async function updateUserProfile(payload) {
  return authFetch("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// --- Inspiration (الهام روزانه) ---
export async function getInspirationToday(mode = "calm") {
  return authFetch(`/inspiration/today?mode=${encodeURIComponent(mode)}`, {
    method: "GET",
  });
}

export async function getInspirationWeek(mode = "calm") {
  return authFetch(`/inspiration/week?mode=${encodeURIComponent(mode)}`, {
    method: "GET",
  });
}

export async function setInspirationComplete({ mode = "calm", dateKey, completed = true }) {
  return authFetch("/inspiration/complete", {
    method: "POST",
    body: JSON.stringify({ mode, dateKey, completed }),
  });
}

export async function setInspirationSave({ mode = "calm", dateKey, saved = true }) {
  return authFetch("/inspiration/save", {
    method: "POST",
    body: JSON.stringify({ mode, dateKey, saved }),
  });
}

export async function setInspirationNote({ mode = "calm", dateKey, note = "" }) {
  return authFetch("/inspiration/note", {
    method: "POST",
    body: JSON.stringify({ mode, dateKey, note }),
  });
}

export async function getInspirationHistory(mode = "calm", take = 30) {
  return authFetch(
    `/inspiration/history?mode=${encodeURIComponent(mode)}&take=${encodeURIComponent(take)}`,
    { method: "GET" }
  );
}

export async function getInspirationSaved(mode = "calm", take = 50) {
  return authFetch(
    `/inspiration/saved?mode=${encodeURIComponent(mode)}&take=${encodeURIComponent(take)}`,
    { method: "GET" }
  );
}

// --- Reminders ---
export async function getReminders() {
  return authFetch("/reminders", { method: "GET" });
}

export async function createReminder(payload) {
  return authFetch("/reminders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteReminder(id) {
  return authFetch(`/reminders/${id}`, {
    method: "DELETE",
  });
}

// --- MyCycle (چرخه بانوان) ---
export async function getMyCycle() {
  return authFetch("/my-cycle", { method: "GET" });
}

export async function updateMyCycle(payload) {
  return authFetch("/my-cycle", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// --- Women Health Reports (تست سلامت بانوان) ---
export async function createWomenHealthReport(payload) {
  return authFetch("/women-health/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getWomenHealthReports(take = 20) {
  return authFetch(`/women-health/reports?take=${encodeURIComponent(take)}`, {
    method: "GET",
  });
}

export async function deleteWomenHealthReport(id) {
  return authFetch(`/women-health/reports/${id}`, {
    method: "DELETE",
  });
}

// --- Men Health Reports (تست سلامت آقایان) ---
export async function createMenHealthReport(payload) {
  return authFetch("/men-health/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMenHealthReports(take = 20) {
  return authFetch(`/men-health/reports?take=${encodeURIComponent(take)}`, {
    method: "GET",
  });
}

export async function deleteMenHealthReport(id) {
  return authFetch(`/men-health/reports/${id}`, {
    method: "DELETE",
  });
}

// --- Medical Records (پرونده‌های پزشکی) ---

export async function listMedicalRecords(childId = null) {
  const url = childId
    ? `/medical-records?childId=${childId}`
    : "/medical-records";

  return authFetch(url, {
    method: "GET",
  });
}

export async function createMedicalRecord(payload) {
  return authFetch("/medical-records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateMedicalRecord(id, payload) {
  return authFetch(`/medical-records/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteMedicalRecord(id) {
  return authFetch(`/medical-records/${id}`, {
    method: "DELETE",
  });
}

export async function getMedicalRecordById(id) {
  return authFetch(`/medical-records/${id}`, { method: "GET" });
}

export async function addMedicalAttachment(recordId, payload) {
  return authFetch(`/medical-records/${recordId}/attachments`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Uploads (Presign) ---
export async function presignMedicalAttachmentUpload(payload) {
  // payload: { recordId, ext, contentType, fileName, fileSize }
  return authFetch("/uploads/presign/medical-attachment", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function presignChatImageUpload(payload) {
  // payload: { ext, contentType, fileSize }
  return authFetch("/uploads/presign/chat-image", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function presignChatVoiceUpload(payload) {
  // payload: { ext, contentType, fileSize }
  return authFetch("/uploads/presign/chat-voice", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function presignChatRoomImageUpload(payload) {
  // payload: { ext, contentType, fileSize }
  return authFetch("/uploads/presign/chat-room-image", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- S3 PUT upload to presigned url ---
export async function putFileToPresignedUrl(uploadUrl, file) {
  try {
    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type, // خیلی مهم
      },
      body: file,
    });

    if (!res.ok) {
      return { ok: false, status: res.status, message: `آپلود ناموفق (${res.status})` };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, message: "خطا در اتصال هنگام آپلود." };
  }
}

export async function deleteMedicalAttachment(recordId, attachmentId) {
  return authFetch(`/medical-records/${recordId}/attachments/${attachmentId}`, {
    method: "DELETE",
  });
}

// --- Private Chat ---

export async function getPrivateConversation(userId) {
  return authFetch(`/chat/${userId}`, {
    method: "GET",
  });
}

export async function sendPrivateMessage(userId, payload) {
  return authFetch(`/chat/${userId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deletePrivateMessage(messageId) {
  return authFetch(`/chat/messages/${messageId}`, {
    method: "DELETE",
  });
}

export async function reactToPrivateMessage(messageId, emoji) {
  return authFetch(`/chat/messages/${messageId}/reaction`, {
    method: "POST",
    body: JSON.stringify({ emoji }),
  });
}

export async function searchGeninoUsers(query = "") {
  const url = query.trim()
    ? `/users/search?q=${encodeURIComponent(query)}`
    : "/users/search";

  return authFetch(url, {
    method: "GET",
  });
}

export async function getConversations() {
  try {
    const res = await authFetch(`/chat`)
    return res;
  } catch (err) {
    console.error("getConversations error:", err);
    return { ok: false };
  }
}

export async function updateSocialPresence() {
  return authFetch("/users/social-presence", {
    method: "POST",
  });
}

export async function getOnlineUsers() {
  return authFetch("/users/online", {
    method: "GET",
  });
}

// --- Chat Rooms ---

export async function getRoomMessages(roomId) {
  return authFetch(`/chat-rooms/${roomId}/messages`, {
    method: "GET",
  });
}

export async function sendRoomMessage(roomId, payload) {
  return authFetch(`/chat-rooms/${roomId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteRoomMessage(messageId) {
  return authFetch(`/chat-rooms/messages/${messageId}`, {
    method: "DELETE",
  });
}

export async function reactToRoomMessage(messageId, emoji) {
  return authFetch(`/chat-rooms/messages/${messageId}/reaction`, {
    method: "POST",
    body: JSON.stringify({ emoji }),
  });
}

export async function getMutedRoomUsers(roomId) {
  return authFetch(`/chat-rooms/${roomId}/mutes`, {
    method: "GET",
  });
}

export async function muteRoomUser(roomId, userId) {
  return authFetch(`/chat-rooms/${roomId}/mutes/${userId}`, {
    method: "POST",
  });
}

export async function unmuteRoomUser(roomId, userId) {
  return authFetch(`/chat-rooms/${roomId}/mutes/${userId}`, {
    method: "DELETE",
  });
}

// --- Chat Room Presence ---

export async function upsertRoomPresence(roomId) {
  return authFetch(`/chat-rooms/${roomId}/presence`, {
    method: "POST",
  });
}

export async function getRoomPresence(roomId) {
  return authFetch(`/chat-rooms/${roomId}/presence`, {
    method: "GET",
  });
}

// --- Chat Rooms (Custom) ---

export async function getChatRooms() {
  return authFetch("/chat-rooms", {
    method: "GET",
  });
}

export async function createChatRoom(payload) {
  return authFetch("/chat-rooms", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteChatRoom(roomId) {
  return authFetch(`/chat-rooms/${roomId}`, {
    method: "DELETE",
  });
}

export async function updateChatRoom(roomId, payload) {
  return authFetch(`/chat-rooms/${roomId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function getMyFavoriteChatRooms() {
  return authFetch("/chat-rooms/favorites/me", {
    method: "GET",
  });
}

export async function addFavoriteChatRoom(roomId) {
  return authFetch(`/chat-rooms/${roomId}/favorite`, {
    method: "POST",
  });
}

export async function removeFavoriteChatRoom(roomId) {
  return authFetch(`/chat-rooms/${roomId}/favorite`, {
    method: "DELETE",
  });
}

// --- Memory Albums ---

export async function getChildMemoryAlbums(childId) {
  return authFetch(`/memory-albums/child/${childId}`, {
    method: "GET",
  });
}

export async function createMemoryAlbum(childId, payload) {
  // payload: { title, description }
  return authFetch(`/memory-albums/child/${childId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function presignMemoryAlbumPhotoUpload(payload) {
  // payload: { albumId, ext, contentType, fileName, fileSize }
  return authFetch("/uploads/presign/memory-album-photo", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function presignAmbassadorDocumentUpload(payload) {
  return authFetch("/uploads/presign/ambassador-document", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function addMemoryAlbumPhoto(albumId, payload) {
  // payload: { url, fileName, mimeType, fileSize, caption? }
  return authFetch(`/memory-albums/${albumId}/photos`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteMemoryAlbumPhoto(photoId) {
  return authFetch(`/memory-albums/photos/${photoId}`, {
    method: "DELETE",
  });
}

export async function deleteMemoryAlbum(albumId) {
  return authFetch(`/memory-albums/${albumId}`, {
    method: "DELETE",
  });
}

export async function toggleMemoryAlbumLike(albumId) {
  return authFetch(`/memory-albums/${albumId}/like`, {
    method: "POST",
  });
}

export async function addMemoryAlbumComment(albumId, text) {
  return authFetch(`/memory-albums/${albumId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export async function deleteMemoryAlbumComment(commentId) {
  return authFetch(`/memory-albums/comments/${commentId}`, {
    method: "DELETE",
  });
}

// --- Genino Children ---

export async function getMyChildren() {
  return authFetch("/children", {
    method: "GET",
  });
}

export async function getGeninoChildren() {
  return authFetch("/children/public", {
    method: "GET",
  });
}

export async function getFollowedGeninoChildren() {
  return authFetch("/children/followed", {
    method: "GET",
  });
}

export async function createChildFollowRequest(payload) {
  return authFetch("/child-follow-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createSpiritualChildAchievement({ childId, title, description }) {
  return authFetch("/child-achievements/spiritual", {
    method: "POST",
    body: JSON.stringify({
      childId,
      title,
      description,
    }),
  });
}

export async function logoutUser() {
  const refreshToken = getRefreshToken();

  try {
    if (refreshToken) {
      await authFetch("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    }
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
  }

  clearTokens();
}

// --- Favorite Articles ---

export async function getFavoriteArticles() {
  return authFetch("/articles/favorites", {
    method: "GET",
  });
}

export async function saveFavoriteArticle(payload) {
  return authFetch("/articles/favorites", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function removeFavoriteArticle(slug) {
  return authFetch(`/articles/favorites/${slug}`, {
    method: "DELETE",
  });
}

// --- Favorite Products ---

export async function getFavoriteProducts() {
  return authFetch("/favorite-products", {
    method: "GET",
  });
}

export async function getFavoriteProductIds() {
  return authFetch("/favorite-products/ids", {
    method: "GET",
  });
}

export async function saveFavoriteProduct(productId) {
  return authFetch(`/favorite-products/${productId}`, {
    method: "POST",
  });
}

export async function removeFavoriteProduct(productId) {
  return authFetch(`/favorite-products/${productId}`, {
    method: "DELETE",
  });
}

// --- Child Favorite Products ---

export async function getChildFavoriteProductStatus(productId) {
  return authFetch(
    `/child-favorite-products/product/${productId}/status`,
    {
      method: "GET",
    }
  );
}


export async function saveChildFavoriteProduct(childId, productId) {
  return authFetch(
    `/child-favorite-products/${childId}/${productId}`,
    {
      method: "POST",
    }
  );
}


export async function removeChildFavoriteProduct(childId, productId) {
  return authFetch(
    `/child-favorite-products/${childId}/${productId}`,
    {
      method: "DELETE",
    }
  );
}

export async function getPublicChildFavoriteProducts(childId) {
  return authFetch(
    `/child-favorite-products/public/${childId}`,
    {
      method: "GET",
    }
  );
}

export async function getChildFavoriteProducts(childId) {
  return authFetch(
    `/child-favorite-products/${childId}`,
    {
      method: "GET",
    }
  );
}

export async function updateChildGiftVisibility(
  childId,
  productId,
  showInGiftGame
) {

  return authFetch(
    `/child-favorite-products/${childId}/${productId}/visibility`,
    {
      method:"PATCH",
      body:JSON.stringify({
        showInGiftGame,
      }),
    }
  );

}

// تغییر وضعیت نمایش محصول در هدیه‌بازی
export async function updateGiftVisibility(
  productId,
  showInGiftGame
) {
  return authFetch(
    `/favorite-products/${productId}/gift-visibility`,
    {
      method: "PATCH",
      body: JSON.stringify({
        showInGiftGame,
      }),
    }
  );
}

// دریافت علاقه‌مندی‌های عمومی یک کاربر برای هدیه‌بازی
export async function getGiftWishlist(userId) {
  return authFetch(
    `/favorite-products/gift/${userId}`,
    {
      method: "GET",
    }
  );
}

// --- Gift Selected Users ---

export async function getGiftSelectedUsers() {
  return authFetch("/gift/selected-users", {
    method: "GET",
  });
}


export async function addGiftSelectedUser(userId) {
  return authFetch(`/gift/selected-users/${userId}`, {
    method: "POST",
  });
}


export async function removeGiftSelectedUser(userId) {
  return authFetch(`/gift/selected-users/${userId}`, {
    method: "DELETE",
  });
}

export async function getFollowedChildren() {
  return authFetch("/children/followed", {
    method: "GET",
  });
}

// --- Relationship Assessments ---

export async function getRelationshipAssessments() {
  return authFetch("/relationship-assessments", {
    method: "GET",
  });
}

export async function createRelationshipAssessment(payload) {
  return authFetch("/relationship-assessments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Ambassadors ---

export async function registerAmbassador(payload) {
  return authFetch("/ambassadors/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMyAmbassador() {
  return authFetch("/ambassadors/me", {
    method: "GET",
  });
}

// --- Vendors ---

export async function registerVendor(payload) {

  const res = await authFetch("/vendors/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res?.ok && res?.token) {
    saveTokens(
      res.token,
      res.refreshToken
    );
  }

  return res;
}

export async function loginVendor(payload) {
  const res = await authFetch("/vendors/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res?.ok && res?.token) {
    saveTokens(res.token, res.refreshToken);
  }

  return res;
}

export async function getVendorById(id) {
  return authFetch(`/vendors/${id}`, {
    method: "GET",
  });
}

// دریافت اطلاعات حساب فروشنده لاگین‌شده
export async function getVendorProfile() {
  return authFetch("/vendors/me", {
    method: "GET",
  });
}

// ویرایش اطلاعات حساب فروشنده لاگین‌شده
export async function updateVendorProfile(payload) {
  return authFetch("/vendors/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function confirmVendorPackage(payload) {
  return authFetch(`/vendors/${payload.vendorId}/confirm-package`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateVendorBankingInfo(vendorId, payload) {
  return authFetch(`/vendors/${vendorId}/banking`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function presignVendorDocumentUpload(payload) {
  return authFetch("/uploads/presign/vendor-document", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Vendor School Header Image Upload ---
export async function presignVendorSchoolHeaderUpload(payload) {
  return authFetch("/uploads/presign/vendor-school-header",{
      method:"POST",
      body:JSON.stringify(payload),
    });
  }

export async function presignVendorSchoolStaffUpload(payload) {
  return authFetch(
    "/uploads/presign/vendor-school-staff",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

// --- Vendor Kindergarten Image Upload ---

export async function presignVendorKindergartenHeaderUpload(payload) {
  return authFetch(
    "/uploads/presign/vendor-kindergarten-header",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export async function presignVendorKindergartenStaffUpload(payload) {
  return authFetch(
    "/uploads/presign/vendor-kindergarten-staff",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}



export async function presignVendorAvatarUpload(payload) {
  return authFetch("/uploads/presign/vendor-avatar", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function addVendorDocument(vendorId, payload) {
  return authFetch(
    `/vendor-documents/${vendorId}/documents`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export async function listVendorDocuments(vendorId) {
  return authFetch(
    `/vendor-documents/${vendorId}/documents`,
    {
      method: "GET",
    }
  );
}

export async function deleteVendorDocument(
  vendorId,
  documentId
) {
  return authFetch(
    `/vendor-documents/${vendorId}/documents/${documentId}`,
    {
      method: "DELETE",
    }
  );
}

export async function acceptVendorContract(vendorId) {
  return authFetch(`/vendors/${vendorId}/accept-contract`, {
    method: "POST",
  });
}


// --- Vendor Packages ---

export async function getVendorPackages() {
  return authFetch("/vendor-packages", {
    method: "GET",
  });
}

export async function validateDiscountCode(code) {
  return authFetch("/discount-codes/validate", {
    method: "POST",
    body: JSON.stringify({
      code,
    }),
  });
}

export async function validateAmbassadorCode(code, vendorId) {
  return authFetch("/ambassadors/validate-code", {
    method: "POST",
    body: JSON.stringify({
      code,
      vendorId,
    }),
  });
}

export async function useDiscountCode(code, vendorId) {
  return authFetch("/discount-codes/use", {
    method: "POST",
    body: JSON.stringify({
      code,
      vendorId,
    }),
  });
}

export async function getFinanceSettings() {
  return authFetch("/admin/finance-settings", {
    method: "GET",
  });
}

export async function getAdminVendors() {
  return adminFetch("/admin/vendors");
}

export async function getVendorReviewHistory(vendorId) {
  return adminFetch(`/admin/vendors/${vendorId}/review-history`, {
    method: "GET",
  });
}

export async function approveAdminVendor(vendorId) {
  return adminFetch(`/admin/vendors/${vendorId}/approve`, {
    method: "POST",
  });
}

export async function requestCorrectionAdminVendor(
  vendorId,
  reason,
  fields
) {
  return adminFetch(`/admin/vendors/${vendorId}/request-correction`, {
    method: "POST",
    body: JSON.stringify({
      reason,
      fields,
    }),
  });
}

export async function rejectAdminVendor(vendorId, reason) {
  return adminFetch(`/admin/vendors/${vendorId}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}


// --- Vendor School Profile ---

export async function getVendorSchoolProfile(vendorId){
  return authFetch(
    `/vendor-school/${vendorId}`, {
      method:"GET",
    });
}


export async function saveVendorSchoolProfile(
  vendorId,
  payload
){
  return authFetch(
    `/vendor-school/${vendorId}`, {
      method:"PUT",
      body:JSON.stringify(payload),
    });
}




// --- Vendor Kindergarten Profile ---

export async function getVendorKindergartenProfile(
  vendorId
) {
  return authFetch(
    `/vendor-kindergarten/${vendorId}`,
    {
      method: "GET",
    }
  );
}


export async function saveVendorKindergartenProfile(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-kindergarten/${vendorId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

// --- Vendor Playhouse Profile ---

export async function getVendorPlayhouseProfile(
  vendorId
) {
  return authFetch(
    `/vendor-playhouse/${vendorId}`,
    {
      method: "GET",
    }
  );
}


export async function saveVendorPlayhouseProfile(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-playhouse/${vendorId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}


// --- Vendor Education Class Profile ---

export async function getVendorEducationClassProfile(
  vendorId
) {
  return authFetch(
    `/vendor-education-class/${vendorId}`,
    {
      method: "GET",
    }
  );
}

export async function saveVendorEducationClassProfile(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-education-class/${vendorId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}


// --- Vendor Art Class Profile ---

export async function getVendorArtClassProfile(
  vendorId
) {
  return authFetch(
    `/vendor-art-class/${vendorId}`,
    {
      method: "GET",
    }
  );
}


export async function saveVendorArtClassProfile(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-art-class/${vendorId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

// --- Vendor Sport Class Profile ---

export async function getVendorSportClassProfile(
  vendorId
) {
  return authFetch(
    `/vendor-sport-class/${vendorId}`,
    {
      method: "GET",
    }
  );
}


export async function saveVendorSportClassProfile(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-sport-class/${vendorId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}


// --- Vendor Private Teacher Profile ---

export async function getVendorPrivateTeacherProfile(
  vendorId
) {
  return authFetch(
    `/vendor-private-teacher/${vendorId}`,
    {
      method: "GET",
    }
  );
}


export async function saveVendorPrivateTeacherProfile(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-private-teacher/${vendorId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}


// --- Vendor Children (Shared) ---

export async function searchVendorChildren(q = "") {
  return authFetch(
    `/vendor-children/search?q=${encodeURIComponent(q)}`,
    {
      method: "GET",
    }
  );
}



export async function getVendorChildren() {
  return authFetch(
    "/vendor-children",
    {
      method: "GET",
    }
  );
}


export async function addVendorChild(
  childId,
  relationType
) {
  return authFetch(
    "/vendor-children/add",
    {
      method: "POST",
      body: JSON.stringify({
        childId,
        relationType,
      }),
    }
  );
}


export async function removeVendorChild(
  childId
) {
  return authFetch(
    `/vendor-children/${childId}`,
    {
      method: "DELETE",
    }
  );
}


// --- Vendor School Students ---
export async function searchSchoolChildren(q=""){
  return authFetch(
    `/vendor-school-students/search?q=${encodeURIComponent(q)}`, {
      method:"GET",
    });
}



export async function addSchoolStudent(
  schoolId,
  childId
){
return authFetch("/vendor-school-students/add",
    {method:"POST",
      body:JSON.stringify({
        schoolId,
        childId
      })
    });
}



export async function getSchoolStudents(
  schoolId
){
  return authFetch(
    `/vendor-school-students/${schoolId}`,
    {
      method:"GET",
    });
}


export async function removeSchoolStudent(
  schoolId,
  childId
){
  return authFetch(
    `/vendor-school-students/${schoolId}/${childId}`,
    {
      method:"DELETE",
    }
  );
}

// --- Vendor School Achievement ---

export async function createSchoolAchievement(
  vendorId,
  payload
){
  return authFetch(
    `/vendor-school/${vendorId}/achievement`,
    {
      method:"POST",
      body:JSON.stringify(payload),
    }
  );
}


export async function getSchoolAchievements(
  vendorId
){
  return authFetch(
    `/vendor-school/${vendorId}/achievements`
  );
}

// --- Vendor Kindergarten Achievement ---

export async function createKindergartenAchievement(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-kindergarten/${vendorId}/achievement`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export async function getKindergartenAchievements(
  vendorId
) {
  return authFetch(
    `/vendor-kindergarten/${vendorId}/achievements`,
    {
      method: "GET",
    }
  );
}

// --- Vendor Art Class Achievement ---

export async function createArtClassAchievement(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-art-class/${vendorId}/achievement`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}


export async function getArtClassAchievements(
  vendorId
) {
  return authFetch(
    `/vendor-art-class/${vendorId}/achievements`,
    {
      method: "GET",
    }
  );
}

// --- Vendor Sport Class Achievement ---

export async function createSportClassAchievement(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-sport-class/${vendorId}/achievement`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}


export async function getSportClassAchievements(
  vendorId
) {
  return authFetch(
    `/vendor-sport-class/${vendorId}/achievements`,
    {
      method: "GET",
    }
  );
}

// --- Vendor Playhouse Achievement ---

export async function createPlayhouseAchievement(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-playhouse/${vendorId}/achievement`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}


export async function getPlayhouseAchievements(
  vendorId
) {
  return authFetch(
    `/vendor-playhouse/${vendorId}/achievements`,
    {
      method: "GET",
    }
  );
}



// --- Vendor Private Teacher Achievement ---

export async function createPrivateTeacherAchievement(
  vendorId,
  payload
) {
  return authFetch(
    `/vendor-private-teacher/${vendorId}/achievement`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}


export async function getPrivateTeacherAchievements(
  vendorId
) {
  return authFetch(
    `/vendor-private-teacher/${vendorId}/achievements`,
    {
      method: "GET",
    }
  );
}