/* eslint-disable @next/next/no-img-element */
// components/Footer.js

import { useRouter } from "next/navigation";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-zinc-900 text-white px-4 py-8 w-full shadow-md h-auto">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 mt-[30px]">
        {/* Logo хэсэг */}
        <div className="items-center justify-center flex">
          <img
            src="eslot-logo.png"
            alt="Eslot Logo"
            className="w-[145px] h-[35px] cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        <div className="text-center md:text-left">
          <ul className="flex flex-col md:flex-row gap-4 text-lg font-medium gap-10">
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E1306C] hover:text-white transition duration-300 drop-shadow-[0_0_15px_#E1306C]"
              >
                <FaInstagram size={34} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ef233c] hover:text-white transition duration-300 drop-shadow-[0_0_15px_#ef233c]"
              >
                <FaYoutube size={34} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#023e8a] hover:text-white transition duration-300 drop-shadow-[0_0_15px_#023e8a]"
              >
                <FaFacebook size={34} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
