import { Clock } from "lucide-react";

export default function LocationSection() {
  const hours = [
    { day: "Даваа", time: "09:00 - 19:00" },
    { day: "Мягмар", time: "Амрана" },
    { day: "Лхагва", time: "09:00 - 19:00" },
    { day: "Пүрэв", time: "Амрана" },
    { day: "Баасан", time: "09:00 - 19:00", isOpen: true },
    { day: "Бямба", time: "Амрана" },
    { day: "Ням", time: "09:00 - 19:00" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
      {/* Google Map iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!..." // map embed URL
        className="w-full h-64 rounded border"
        loading="lazy"
      ></iframe>

      {/* Opening hours */}
      <div className="space-y-1 text-sm">
        {hours.map((h) => (
          <div key={h.day} className="flex justify-between items-center">
            <span>{h.day}</span>
            <span className={h.time === "Амрана" ? "text-gray-500" : ""}>
              {h.time}{" "}
              {h.isOpen && (
                <span className="text-green-600 flex items-center gap-1">
                  <Clock className="w-4 h-4 stroke-[1.5]" />
                  Нээлттэй
                </span>
              )}
            </span>
          </div>
        ))}
        <p className="text-xs text-gray-500 mt-2">
          Шинэ гэмтэлийн автобусны буудал 74байр
        </p>
      </div>
    </div>
  );
}
