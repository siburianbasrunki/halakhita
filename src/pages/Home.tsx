import { Link } from "react-router-dom";
import Background from "../assets/bg.png";
import { BookOpen } from "lucide-react";

export const HomeView = () => {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-center flex-col"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-yellow-400 mr-3 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
              HORAS
            </h1>
          </div>
          <p className="text-white/80 text-lg">
            Selamat datang di Portal Budaya Batak Toba
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <Link
            to="/about"
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20"
          >
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <span className="mr-2">📜</span> Sejarah Batak
            </h3>
            <p className="text-white/80 text-sm">
              Pelajari asal-usul dan budaya Batak Toba.
            </p>
          </Link>
          <Link
            to="/mini-quiz"
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20"
          >
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <span className="mr-2">🧠</span> Kuis
            </h3>
            <p className="text-white/80 text-sm">
              Uji pengetahuanmu tentang budaya Batak.
            </p>
          </Link>
          <Link
            to="/convertor"
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20"
          >
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <span className="mr-2">🔤</span> Konversi Aksara
            </h3>
            <p className="text-white/80 text-sm">
              Ubah teks latin ke aksara Batak secara instan.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};