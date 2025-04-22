import { Briefcase, Clock, ThumbsUp, Users } from "lucide-react"

export const Stats = () => {
    return(
        <section className="mb-12 bg-gray-900/70 backdrop-blur-md rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Our Impact By Numbers
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="bg-gray-800/70 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="text-amber-500" size={24} />
              </div>
              <div className="text-3xl font-bold text-amber-500 mb-1">50K+</div>
              <div className="text-gray-400 text-sm">Users</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-gray-800/70 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Briefcase className="text-teal-500" size={24} />
              </div>
              <div className="text-3xl font-bold text-teal-500 mb-1">1.2M</div>
              <div className="text-gray-400 text-sm">Projects</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-gray-800/70 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <ThumbsUp className="text-sky-500" size={24} />
              </div>
              <div className="text-3xl font-bold text-sky-500 mb-1">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>

            {/* Stat 4 */}
            <div className="bg-gray-800/70 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="text-slate-500" size={24} />
              </div>
              <div className="text-3xl font-bold text-slate-500 mb-1">24/7</div>
              <div className="text-gray-400 text-sm">Support</div>
            </div>
          </div>
        </section>
    )
}