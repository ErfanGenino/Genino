const BASE_URL = "https://genino-backend-app-409014d5ff-genino-registry.apps.ir-central1.arvancaas.ir/api";

// --- ثبت نام کاربر ---
export async function registerUser(formData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return { ok: false, message: "خطا در اتصال به سرور." };
  }
}

// --- ورود کاربر ---
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return await response.json();
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return { ok: false, message: "خطا در اتصال به سرور." };
  }
}
