const BASE_URL =
  "https://genino-backend-app-409014d5ff-genino-registry.apps.ir-central1.arvancaas.ir/api";

// ✅ فقط localStorage
function getAuthToken() {
  return localStorage.getItem("genino_token");
}

// --- fetch اختصاصی با توکن ---
async function authFetch(url, options = {}) {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });
    return await res.json();
  } catch (err) {
    console.error("AUTH FETCH ERROR:", err);
    return { ok: false, message: "خطا در اتصال به سرور." };
  }
}

// --- ثبت نام ---
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

// --- پروفایل ---
export async function getUserProfile() {
  return await authFetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
  });
}

// --- آپدیت مرحله زندگی ---
export async function updateLifeStage(stage) {
  return await authFetch(`${BASE_URL}/auth/update-life-stage`, {
    method: "PUT",
    body: JSON.stringify({ lifeStage: stage }),
  });
}
