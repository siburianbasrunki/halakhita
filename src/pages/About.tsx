import { Link } from "react-router-dom";
import Background from "../assets/bg.png";
import { BookOpen, Home, Zap, ChevronRight } from "lucide-react";

export const AboutView = () => {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center flex-col py-12"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <div className="flex items-center text-white/80 mb-8 text-sm">
          <Link to="/" className="flex items-center hover:text-amber-400 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-amber-400">Tentang Batak Toba</span>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-amber-400 mr-3 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text">
              Batak Toba
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Mengenal Lebih Dekat Warisan Budaya dan Sejarah Masyarakat Batak Toba
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-amber-400/20 rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-amber-400" />
                Sejarah Singkat
              </h2>
              <div className="space-y-4 text-white/90">
                <p>
                  Suku Batak Toba merupakan salah satu kelompok etnis terbesar
                  di Sumatera Utara yang mendiami kawasan sekitar Danau Toba.
                  Mereka dikenal memiliki peradaban yang kuat serta struktur
                  sosial yang khas dan kaya akan nilai-nilai budaya.
                </p>
                <p>
                  Menurut legenda turun-temurun, nenek moyang orang Batak
                  berasal dari tokoh mitologis{" "}
                  <strong className="text-amber-300">Si Raja Batak</strong>{" "}
                  yang dipercaya pertama kali menetap di daerah{" "}
                  <span className="italic">Pusuk Buhit</span>, di barat Danau
                  Toba.
                </p>
                <p>
                  Sistem sosial Batak Toba sangat menjunjung tinggi nilai
                  kekeluargaan melalui filosofi{" "}
                  <span className="text-amber-300">Dalihan Na Tolu</span>, yang
                  berarti "tungku yang tiga", sebagai simbol relasi antar
                  kerabat:{" "}
                  <span className="italic">
                    "Somba Marhula-hula, Elek Marboru, Manat Mardongan Tubu"
                  </span>
                  .
                </p>
                <p className="text-white/60 text-sm">
                  Sumber:{" "}
                  <a
                    href="https://www.goodnewsfromindonesia.id/2024/07/17/mengenal-lebih-dekat-suku-batak-dari-sejarah-hingga-kebudayaannya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline transition-colors"
                  >
                    Good News From Indonesia
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-amber-400" />
                Keunikan Budaya
              </h2>
              <div className="space-y-4 text-white/90">
                <p>
                  <strong className="text-amber-300">Aksara Batak:</strong>{" "}
                  Termasuk dalam rumpun aksara Brahmi dengan karakteristik khas
                  yang disebut <span className="italic">surat batak</span>.
                </p>
                <p>
                  <strong className="text-amber-300">Ulos:</strong> Kain tenun
                  tradisional yang memiliki makna filosofis mendalam dalam
                  setiap motif dan warnanya.
                </p>
                <p>
                  <strong className="text-amber-300">Gondang:</strong> Musik
                  tradisional yang dimainkan dengan taganing, sarune, dan
                  gondang sebagai pengiring upacara adat.
                </p>
                <p>
                  <strong className="text-amber-300">Rumah Adat:</strong> Rumah
                  bolon dengan arsitektur khas atap melengkung dan ukiran
                  ornamen tradisional.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-amber-400/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">
            Galeri Budaya Batak Toba
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Aksara Batak",
                desc: "Sistem tulisan tradisional yang masih dilestarikan",
                emoji: "🔤",
              },
              {
                title: "Ulos",
                desc: "Kain tenun penuh makna filosofis",
                emoji: "🧣",
              },
              {
                title: "Tortor",
                desc: "Tarian adat penuh makna spiritual",
                emoji: "💃",
              },
              {
                title: "Rumah Bolon",
                desc: "Arsitektur tradisional yang megah",
                emoji: "🏠",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-amber-400/20 rounded-xl p-4 text-center hover:bg-amber-500/10 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 backdrop-blur-lg border border-amber-400/30 rounded-2xl p-8 text-center">
          <blockquote className="text-white/90 italic text-lg mb-4">
            "anakkon hi do hamoraon di au - Anakku adalah kekayaanku"
          </blockquote>
          <p className="text-amber-300">- Pepatah Batak Toba -</p>
        </div>

        <div className="mt-12 text-center mb-[80px]">
          <Link
            to="/convertor"
            className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
          >
            Coba Konverter Aksara Batak
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};