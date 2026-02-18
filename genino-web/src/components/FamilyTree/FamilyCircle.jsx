// src/components/FamilyTree/FamilyCircle.jsx
export default function FamilyCircle({
  nodeStatus = "EMPTY", // EMPTY | PENDING | CONNECTED
  emoji = "👤",
  photo = null,
  fullName = null,
  relationLabel = "",
  onClick,
  onDelete,
}) {
  const clickable = nodeStatus === "EMPTY" || nodeStatus === "PENDING";

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div
          onClick={() => {
            if (!onClick) return;
            if (clickable) onClick();
          }}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition shadow-sm
            ${
              nodeStatus === "CONNECTED"
                ? "bg-green-100 border border-green-400 cursor-default"
                : nodeStatus === "PENDING"
                ? "bg-yellow-100 border border-yellow-400 cursor-pointer opacity-90 hover:shadow-md hover:scale-105"
                : "bg-white border border-gray-300 cursor-pointer hover:scale-105 hover:shadow-md"
            }
          `}
        >
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="absolute bottom-1 right-1 bg-white/90 border border-gray-300
                         rounded-full p-[3px] opacity-0 group-hover:opacity-100 transition"
              title="حذف"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M6 8a1 1 0 011-1h6a1 1 0 011 1v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm3-5a1 1 0 00-1 1v1H4.5a.5.5 0 000 1h11a.5.5 0 000-1H12V4a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {photo ? (
            <img
              src={photo}
              alt={fullName || relationLabel}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-2xl">{emoji}</span>
          )}

          {nodeStatus === "CONNECTED" && (
            <div
              className="absolute -top-1 -left-1 z-10 w-6 h-6 rounded-full
                         bg-green-500 text-white flex items-center justify-center
                         text-xs font-bold border-2 border-white shadow-md"
            >
              ✓
            </div>
          )}
        </div>

        {nodeStatus === "EMPTY" && (
          <div
            className="absolute inset-0 rounded-full
               bg-black/70 text-white text-[10px]
               flex items-center justify-center text-center px-2
               opacity-0 group-hover:opacity-100 transition
               pointer-events-none z-[9999]"
          >
            برای ارسال دعوت کلیک کنید
          </div>
        )}

        {nodeStatus === "PENDING" && (
          <div
            className="absolute inset-0 rounded-full
               bg-black/70 text-white text-[10px]
               flex items-center justify-center text-center px-2
               opacity-0 group-hover:opacity-100 transition
               pointer-events-none z-[9999]"
          >
            دعوت ارسال شده – برای دیدن لینک کلیک کنید
          </div>
        )}

        {nodeStatus === "CONNECTED" && (
          <div
            className="absolute inset-0 rounded-full
               bg-black/70 text-white text-[10px]
               flex items-center justify-center text-center px-2
               opacity-0 group-hover:opacity-100 transition
               pointer-events-none z-[9999]"
          >
            ✅ متصل شده
          </div>
        )}
      </div>

      {nodeStatus === "CONNECTED" && fullName && (
        <p className="mt-2 text-sm font-semibold text-gray-800 text-center">
          {fullName}
        </p>
      )}

      {relationLabel && (
        <p className="text-xs text-gray-500 text-center">{relationLabel}</p>
      )}
    </div>
  );
}
