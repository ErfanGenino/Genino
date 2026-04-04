import { Edit2, Trash2 } from "lucide-react";

export default function RoomCard({
  room,
  onClick,
  onEdit,
  onDelete,
  isCustom = false,
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
              onDelete?.(room.id);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-red-100 text-red-500 shadow-sm"
            title="حذف اتاق"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div onClick={() => onClick(room)} className="cursor-pointer">
        {room.image ? (
          <img
            src={room.image}
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
          <span>۱۲ نفر آنلاین</span>
        </div>
      </div>
    </div>
  );
}