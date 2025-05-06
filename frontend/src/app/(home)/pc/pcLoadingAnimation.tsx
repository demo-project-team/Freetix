export default function PcLoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* Power Button Pulse */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center shadow-lg">
          <svg width="24" height="24" fill="none" stroke="#22d3ee" strokeWidth="2">
            <path d="M12 2v6" />
            <circle cx="12" cy="14" r="8" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full animate-ping bg-cyan-400 opacity-75" />
      </div>

      {/* GPU Diagnostics Bar */}
      <div className="w-64 h-3 mt-8 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-400 animate-[progress_3s_linear_infinite]" />
      </div>

      {/* Blinking LEDs */}
      <div className="flex space-x-2 mt-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-green-500"
            style={{
              animation: `blink 1.5s ${i * 0.2}s infinite`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Booting Text */}
      <div className="mt-6 text-lg text-cyan-300 tracking-wide animate-fade-in">
        PC Loading...
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
