import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(
  `${BASE_URL}/admin-auth/login`,
  {
    username,
    password,
  }
);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));

      console.log(data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "خطا در ورود به پنل مدیریت"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          ورود مدیران ژنینو
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-3"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </div>
    </div>
  );
}