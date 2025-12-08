// ذخیره توکن
export function saveToken(token) {
  localStorage.setItem("genino_token", token);
}

// گرفتن توکن
export function getToken() {
  return localStorage.getItem("genino_token");
}

// حذف توکن
export function logoutUser() {
  localStorage.removeItem("genino_token");
  localStorage.removeItem("genino_user");
  localStorage.removeItem("lifeStage");
}

// گرفتن اطلاعات کاربر
export function getUser() {
  const user = localStorage.getItem("genino_user");
  return user ? JSON.parse(user) : null;
}

// بررسی ورود
export function isLoggedIn() {
  return !!localStorage.getItem("genino_token");
}
