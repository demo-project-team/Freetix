import { Gamepad2, Headset, MicVocal,  } from "lucide-react";

export const Powerful = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 relative pl-4 border-l-4 border-pink-500 text-white">
        Powerful Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all">
            <Gamepad2 className="text-red-500" size={22} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            Lightning Fast
          </h3>
          <p className="text-gray-400">
            Experience unparalleled speed and performance with our optimized
            platform architecture.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-pink-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all">
            <MicVocal className="text-emerald-500" size={22} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            Secure & Reliable
          </h3>
          <p className="text-gray-400">
            Your data is protected with enterprise-grade security and redundant
            backup systems.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all">
            <Headset className="text-orange-500" size={22} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            Smart Features
          </h3>
          <p className="text-gray-400">
            AI-powered tools to help you maximize productivity and achieve
            better results.
          </p>
        </div>
      </div>
    </section>
  );
};
