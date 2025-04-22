export const UsersSay = () => {
    return(
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 relative pl-4 border-l-4 border-pink-500 text-white">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800 relative">
              <div className="text-4xl absolute top-3 left-3 text-pink-500/20 font-serif"></div>
              <p className="text-gray-300 mb-4 relative z-10">
                DreamApp has completely transformed how our team collaborates.
                The intuitive interface and powerful features have boosted our
                productivity by at least 40%.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mr-3">
                  TB
                </div>
                <div>
                  <div className="font-medium text-white">Tserenbal B.</div>
                  <div className="text-gray-400 text-sm">Product Manager</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800 relative">
              <div className="text-4xl absolute top-3 left-3 text-pink-500/20 font-serif"></div>
              <p className="text-gray-300 mb-4 relative z-10">
                Ive tried dozens of similar tools, but DreamApp stands out with
                its attention to detail and excellent customer support. Its been
                a game-changer for my business.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mr-3">
                  SO
                </div>
                <div>
                  <div className="font-medium text-white">Sainbayar O.</div>
                  <div className="text-gray-400 text-sm">Entrepreneur</div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}