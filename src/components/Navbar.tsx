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
      className="fixed left-1/2 bottom-8 z-20 flex gap-3 p-3 rounded-full bg-opacity-80 backdrop-blur-lg transform -translate-x-1/2 border border-red-300 shadow-lg"
     style={{
  background: `linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(180, 83, 9, 0.8) 100%)`,
  boxShadow: "0 4px 30px rgba(245, 158, 11, 0.3)"
}}
    >
      <Link
        to="/"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/" 
            ? "bg-white text-red-600 shadow-md" 
            : "text-white hover:bg-white/30 hover:text-white"
        }`}
      >
        <AiOutlineHome />
      </Link>
      <Link
        to="/about"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/about" 
            ? "bg-white text-red-600 shadow-md" 
            : "text-white hover:bg-white/30 hover:text-white"
        }`}
      >
        <MdOutlineWorkHistory />
      </Link>

      <Link
        to="/aksara"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/aksara" 
            ? "bg-white text-red-600 shadow-md" 
            : "text-white hover:bg-white/30 hover:text-white"
        }`}
      >
        <BiBook />
      </Link>

      <Link
        to="/mini-quiz"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/mini-quiz" 
            ? "bg-white text-red-600 shadow-md" 
            : "text-white hover:bg-white/30 hover:text-white"
        }`}
      >
        <MdOutlineQuiz />
      </Link>
      <Link
        to="/mini-game"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/mini-game" 
            ? "bg-white text-red-600 shadow-md" 
            : "text-white hover:bg-white/30 hover:text-white"
        }`}
      >
        <VscSymbolParameter />
      </Link>

      <Link
        to="/convertor"
        className={`p-3 rounded-full flex text-xl transition-all duration-300 ${
          location.pathname === "/convertor" 
            ? "bg-white text-red-600 shadow-md" 
            : "text-white hover:bg-white/30 hover:text-white"
        }`}
      >
        <SiConvertio />
      </Link>
    </nav>
  );
};

export default Nav;