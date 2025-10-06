import logo from "./assets/logo-genino.png";

export default function App() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Genino Logo"
          className="w-24 h-24 object-contain"
        />
        <div>
          <h1 className="text-4xl font-bold text-yellow-600">Genino</h1>
          <p className="mt-2 text-lg text-gray-600">دستیار هوشمند والدین</p>
        </div>
      </div>
    </main>
  );
}
