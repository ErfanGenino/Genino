const BASE_URL = "https://genino-backend-app-409014d5ff-genino-registry.apps.ir-central1.arvancaas.ir/api";

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


// --- ورود کاربر ---
export async function loginUser(credentials) {
  return await authFetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// --- دریافت پروفایل کاربر ---
export async function getUserProfile() {
  return await authFetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
  });
}
