import { Edit2, Trash2, Heart } from "lucide-react";

export default function RoomCard({
  room,
  onClick,
  onEdit,
  onDelete,
  onFavorite,
  isCustom = false,
  isFavorite = false,
  showFavoriteButton = false,
}) {
  return (
    <div
      className={`${room.color} group relative rounded-3xl p-5 w-[250px] 
                  border border-transparent hover:border-yellow-300 transition-all duration-300 
                  shadow-sm hover:shadow-lg text-center`}
    >
      {isCustom && (
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(room);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-yellow-100 text-yellow-700 shadow-sm"
            title="ویرایش اتاق"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(room);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-red-100 text-red-500 shadow-sm"
            title="حذف اتاق"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {showFavoriteButton && (
  <div className="absolute top-3 right-3 z-10 flex flex-col items-center">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onFavorite?.(room);
      }}
      className={`p-2 rounded-full bg-white/90 shadow-sm transition ${
        isFavorite
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-400 hover:bg-pink-50 hover:text-red-400"
      }`}
      title={
        isFavorite
          ? "حذف از اتاق‌های مورد علاقه"
          : "افزودن به اتاق‌های مورد علاقه"
      }
    >
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    </button>

    <span className="mt-1 text-[11px] font-semibold text-gray-500 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
      {room.favoriteCount ?? 0}
    </span>
  </div>
)}

      <div onClick={() => onClick(room)} className="cursor-pointer">
        {room.imageUrl ? (
          <img
            src={room.imageUrl}
            alt={room.title}
            className="w-full h-32 object-cover rounded-2xl mb-4 border border-yellow-200"
          />
        ) : (
          <div className="mb-4 flex justify-center">{room.icon}</div>
        )}

        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          {room.title}
        </h2>

        <p className="text-gray-500 text-sm mb-3">{room.desc}</p>

        <div className="flex items-center justify-center gap-1 text-yellow-600 text-xs font-medium">
          <span>👥</span>
          <span>{room.onlineCount ?? 0} نفر آنلاین</span>
        </div>
      </div>
    </div>
  );
}