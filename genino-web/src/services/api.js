const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthToken() {
  return localStorage.getItem("genino_token");
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
    res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });
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
    return {
      ok: false,
      status: res.status,
      message: (data && data.message) || `خطای سرور (${res.status})`,
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

// --- ثبت نام ---
export async function registerUser(formData) {
  return authFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

// --- ورود ---
export async function loginUser(credentials) {
  return authFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
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