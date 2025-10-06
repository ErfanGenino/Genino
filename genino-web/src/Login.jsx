export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800">
      <h1 className="text-3xl font-bold text-yellow-600 mb-8">ورود به ژنینو 🌱</h1>
      
      <form className="bg-gray-50 p-6 rounded-2xl shadow-md w-80">
        <label className="block mb-4">
          <span className="text-sm text-gray-600">ایمیل</span>
          <input
            type="email"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm text-gray-600">رمز عبور</span>
          <input
            type="password"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
