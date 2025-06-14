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
      className="fixed left-1/2 bottom-8 z-20 flex gap-3 p-3 rounded-full bg-opacity-80 backdrop-blur-lg transform -translate-x-1/2 border border-gray-200/20 shadow-lg"
      style={{
        background: `linear-gradient(135deg, rgba(231, 76, 60, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)`,
      }}
    >
      <Link
        to="/"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/" 
            ? "bg-red-600 text-white shadow-md" 
            : "text-gray-800 hover:bg-gray-200/70 hover:text-black"
        }`}
      >
        <AiOutlineHome />
      </Link>
      <Link
        to="/about"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/about" 
            ? "bg-red-600 text-white shadow-md" 
            : "text-gray-800 hover:bg-gray-200/70 hover:text-black"
        }`}
      >
        <MdOutlineWorkHistory />
      </Link>

      <Link
        to="/aksara"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/aksara" 
            ? "bg-red-600 text-white shadow-md" 
            : "text-gray-800 hover:bg-gray-200/70 hover:text-black"
        }`}
      >
        <BiBook />
      </Link>

      <Link
        to="/mini-quiz"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/mini-quiz" 
            ? "bg-red-600 text-white shadow-md" 
            : "text-gray-800 hover:bg-gray-200/70 hover:text-black"
        }`}
      >
        <MdOutlineQuiz />
      </Link>
      <Link
        to="/mini-game"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/mini-game" 
            ? "bg-red-600 text-white shadow-md" 
            : "text-gray-800 hover:bg-gray-200/70 hover:text-black"
        }`}
      >
        <VscSymbolParameter />
      </Link>

      <Link
        to="/convertor"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/convertor" 
            ? "bg-red-600 text-white shadow-md" 
            : "text-gray-800 hover:bg-gray-200/70 hover:text-black"
        }`}
      >
        <SiConvertio />
      </Link>

      
    </nav>
  );
};

export default Nav;