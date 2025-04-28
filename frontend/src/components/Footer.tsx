// components/Footer.js


const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 ">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Бидэнтэй Холбогдох
          </h3>
          <ul>
            <li className="mb-2">
              <span className="font-semibold">📧</span> И-мэйл:{" "}
              <a
                href="mailto:metaesport@gmail.com"
                className="text-blue-400 hover:text-blue-500"
              >
                metaesport@gmail.com
              </a>
            </li>
            <li className="mb-2">
              <span className="font-semibold">📞</span> Утас:{" "}
              <a className="text-blue-400 hover:text-blue-500">
                +976 7555-5555
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;