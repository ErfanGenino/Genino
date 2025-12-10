const BASE_URL = "http://185.220.227.31/api";

// --- یک fetch اختصاصی که اتوماتیک Token اضافه می‌کند ---
async function authFetch(url, options = {}) {
  const token = localStorage.getItem("genino_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(url, config);
    return await res.json();
  } catch (err) {
    console.error("AUTH FETCH ERROR:", err);
    return { ok: false, message: "خطا در اتصال به سرور." };
  }
}

// --- ثبت نام کاربر ---
export async function registerUser(formData) {
  return await authFetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

// --- ورود ---
export async function loginUser(credentials) {
  return await authFetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// --- دریافت پروفایل ---
export async function getUserProfile() {
  return await authFetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
  });
}

// --- آپدیت مرحله زندگی ---
export async function updateLifeStage(stage) {
  return await authFetch(`${BASE_URL}/auth/update-life-stage`, {
    method: "PUT",
    body: JSON.stringify({ lifeStage: stage }),   // ← درست شد
  });
}

console.log("BASE_URL =>", BASE_URL);
