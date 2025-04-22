export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-sky-900">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
          Билиярд
        </h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 lg:px-16 pb-16">
        {/* Game Types Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Билиярдын Төрлүүд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pool */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-green-800 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Америк Пул
                </h3>
                <p className="text-gray-300">
                  Америк пул нь 16 бөмбөгтэй тоглогддог билиярдын түгээмэл
                  хувилбар юм.
                </p>
                <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
                  Дэлгэрэнгүй
                </button>
              </div>
            </div>

            {/* Snooker */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-green-800 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 rounded-full bg-red-500 border-2 border-white"
                      ></div>
                    ))}
                    <div className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-white"></div>
                    <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Англи Снукер
                </h3>
                <p className="text-gray-300">
                  Снукер нь өнгөт бөмбөгүүдийг тодорхой дарааллаар оруулдаг
                  нарийн дүрэмтэй.
                </p>
                <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
                  Дэлгэрэнгүй
                </button>
              </div>
            </div>

            {/* Russian Billiards */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-green-800 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 rounded-full bg-white border-2 border-gray-200"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Орос Билиярд
                </h3>
                <p className="text-gray-300">
                  Орос билиярд нь том ширээ, том бөмбөгүүдтэй билиярдын нэг
                  төрөл юм.
                </p>
                <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
                  Дэлгэрэнгүй
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-10">
            Тоглох Газрууд
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gray-800 rounded-xl overflow-hidden h-80">
              {/* Газрын зураг оруулах хэсэг (Google Map iframe) */}
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.331097346298!2d106.90574107555966!3d47.92037227123701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692a032ef91cb%3A0xcdbb4be1f18484a5!2sUB%20Billiards%20Club!5e0!3m2!1sen!2smn!4v1648273219234!5m2!1sen!2smn"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Улаанбаатар хотын билиярдын газрууд
              </h3>
              <ul className="space-y-4 text-lg">
                {["Кингс Билиярд Клуб", "Гранд Билиярд", "Олимп Билиярд"].map(
                  (place, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                      {place}
                    </li>
                  )
                )}
              </ul>
              <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full">
                Бүх газруудыг харах
              </button>
            </div>
          </div>
        </section>

        {/* Tournaments Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Тэмцээнүүд</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                      Тэмцээний нэр {num}
                    </h3>
                    <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                      Удахгүй
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    2025 оны 5-р сарын {num + 10} өдөр
                  </p>
                  <p className="text-gray-300 mb-4">
                    Билиярдын уралдаан тэмцээний тухай товч мэдээлэл энд
                    байрлана.
                  </p>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
                    Бүртгүүлэх
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Билиярд</h2>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Нүүр
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Төрлүүд
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Тоглох Газрууд
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Тэмцээнүүд
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Холбоо барих
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2025 Билиярд. Бүх эрх хамгаалагдсан.</p>
        </div>
      </footer>
    </div>
  );
}
