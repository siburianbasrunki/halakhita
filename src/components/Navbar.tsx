import { AiOutlineHome } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { MdOutlineQuiz, MdOutlineWorkHistory } from "react-icons/md";
import { SiConvertio } from "react-icons/si";
import { VscSymbolParameter } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed left-1/2 bottom-8 z-20 flex gap-3 p-3 rounded-full bg-opacity-80 backdrop-blur-lg transform -translate-x-1/2 border border-yellow-400/30 shadow-lg"
      style={{
        background: `linear-gradient(135deg, rgba(234, 179, 8, 0.8) 0%, rgba(249, 115, 22, 0.8) 100%)`,
        boxShadow: "0 4px 30px rgba(249, 115, 22, 0.3)"
      }}
    >
      <Link
        to="/"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/" 
            ? "bg-yellow-500 text-gray-900 shadow-md" 
            : "text-gray-900 hover:bg-yellow-400/70 hover:text-gray-900"
        }`}
      >
        <AiOutlineHome />
      </Link>
      <Link
        to="/about"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/about" 
            ? "bg-yellow-500 text-gray-900 shadow-md" 
            : "text-gray-900 hover:bg-yellow-400/70 hover:text-gray-900"
        }`}
      >
        <MdOutlineWorkHistory />
      </Link>

      <Link
        to="/aksara"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/aksara" 
            ? "bg-yellow-500 text-gray-900 shadow-md" 
            : "text-gray-900 hover:bg-yellow-400/70 hover:text-gray-900"
        }`}
      >
        <BiBook />
      </Link>

      <Link
        to="/mini-quiz"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/mini-quiz" 
            ? "bg-yellow-500 text-gray-900 shadow-md" 
            : "text-gray-900 hover:bg-yellow-400/70 hover:text-gray-900"
        }`}
      >
        <MdOutlineQuiz />
      </Link>
      <Link
        to="/mini-game"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/mini-game" 
            ? "bg-yellow-500 text-gray-900 shadow-md" 
            : "text-gray-900 hover:bg-yellow-400/70 hover:text-gray-900"
        }`}
      >
        <VscSymbolParameter />
      </Link>

      <Link
        to="/convertor"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/convertor" 
            ? "bg-yellow-500 text-gray-900 shadow-md" 
            : "text-gray-900 hover:bg-yellow-400/70 hover:text-gray-900"
        }`}
      >
        <SiConvertio />
      </Link>
    </nav>
  );
};

export default Nav;