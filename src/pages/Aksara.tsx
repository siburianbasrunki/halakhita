import { Link } from "react-router-dom";
import Background from "../assets/bg.png";
import { BookOpen, Home, ChevronRight, Copy } from "lucide-react";

export const AksaraView = () => {
  const aksaraDasar = [
    { char: "ᯀ", latin: "a", name: "A" },
    { char: "ᯂ", latin: "ha", name: "Ha" },
    { char: "ᯅ", latin: "ba", name: "Ba" },
    { char: "ᯇ", latin: "pa", name: "Pa" },
    { char: "ᯉ", latin: "na", name: "Na" },
    { char: "ᯋ", latin: "wa", name: "Wa" },
    { char: "ᯎ", latin: "ga", name: "Ga" },
    { char: "ᯐ", latin: "ja", name: "Ja" },
    { char: "ᯑ", latin: "da", name: "Da" },
    { char: "ᯒ", latin: "ra", name: "Ra" },
    { char: "ᯔ", latin: "ma", name: "Ma" },
    { char: "ᯗ", latin: "ta", name: "Ta" },
    { char: "ᯘ", latin: "sa", name: "Sa" },
    { char: "ᯛ", latin: "ya", name: "Ya" },
    { char: "ᯝ", latin: "nga", name: "Nga" },
    { char: "ᯞ", latin: "la", name: "La" },
    { char: "ᯠ", latin: "nya", name: "Nya" },
    { char: "ᯤ", latin: "i", name: "I (ina ni surat)" },
    { char: "ᯥ", latin: "u", name: "U (ina ni surat)" },
  ];

  const diakritik = [
    { char: "ᯪ", latin: "i", name: "Diakritik i (ulua)" },
    { char: "ᯮ", latin: "u", name: "Diakritik u (boruta)" },
    { char: "ᯆᯰ", latin: "ng", name: "Diakritik ng (ng)" },
    { char: "ᯩ", latin: "é", name: "Diakritik é (talingan)" },
    { char: "ᯬ", latin: "o", name: "Diakritik o (siala ulu)" },
  ];

  const contohKalimat = [
    {
      aksara: "ᯂᯬᯒᯘ᯲ ᯑᯪᯂᯪᯖ ᯘᯞᯮᯂᯮᯖ᯲ᯉ",
      latin: "Horas dihita saluhutna",
      arti: "salam buat semua orang",
    },
    {
      aksara: "ᯅᯖᯄ᯦᯲ ᯖᯬᯅ",
      latin: "Batak Toba",
      arti: "Batak Toba",
    },
    {
      aksara: "ᯂᯬᯒᯘ᯲",
      latin: "Horas",
      arti: "ucapan salam",
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

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
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <div className="flex items-center text-white/80 mb-8 text-sm">
          <Link to="/" className="flex items-center hover:text-yellow-400">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-yellow-400">Aksara Batak Toba</span>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-yellow-400 mr-3 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
              Aksara Batak Toba
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Mengenal dan mempelajari aksara tradisional masyarakat Batak Toba
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Tentang Aksara Batak
          </h2>
          <div className="space-y-4 text-white/90">
            <p>
              Surat Batak, disebut juga sebagai{" "}
              <span className="text-yellow-300">Surat na Sampulu Sia</span>{" "}
              (kesembilan belas huruf), Si Sia-sia, atau Aksara Batak, adalah
              salah satu aksara tradisional Indonesia yang berkembang di wilayah
              masyarakat Batak, Sumatera Utara. Surat Batak terdiri dari
              beberapa varian yang digunakan untuk menulis enam rumpun bahasa
              Batak: Batak Angkola, Batak Karo, Batak Mandailing, Batak Pakpak,
              Batak Simalungun, dan Batak Toba.
            </p>
            <p>
              Aksara ini merupakan turunan dari aksara Brahmi India melalui
              perantara aksara Kawi. Surat Batak aktif digunakan oleh masyarakat
              Batak setidaknya sejak abad ke-18 hingga penggunaannya
              berangsur-angsur memudar pada abad ke-20. Aksara ini masih
              diajarkan di Sumatera Utara sebagai bagian dari muatan lokal,
              tetapi dengan penerapan yang terbatas dalam kehidupan sehari-hari.
            </p>
            <p>
              Surat Batak adalah sistem tulisan abugida yang terdiri dari 19
              aksara dasar dengan tambahan beberapa aksara pada varian tertentu.
              Seperti aksara Brahmi lainnya, setiap konsonan merepresentasikan
              satu suku kata dengan vokal inheren /a/ yang dapat diubah dengan
              pemberian diakritik tertentu. Surat Batak dibaca dari kiri ke
              kanan. Secara tradisional, aksara ini ditulis tanpa spasi
              antarkata (scriptio continua) dengan tanda baca yang minimal.
            </p>
            <p className="pt-4 text-white/70 italic text-sm">
              Sumber:{" "}
              <a
                href="https://id.wikipedia.org/wiki/Surat_Batak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:underline"
              >
                Wikipedia - Surat Batak
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Aksara Dasar (Induk)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {aksaraDasar.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-200"
              >
                <div
                  className="text-4xl mb-2 cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() => copyToClipboard(item.char)}
                  style={{ fontFamily: "Noto Sans Batak, serif" }}
                >
                  {item.char}
                </div>
                <div className="text-white/90 font-medium">{item.latin}</div>
                <div className="text-sm text-white/60">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Diakritik (Tanda Vokal)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {diakritik.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-200"
              >
                <div
                  className="text-4xl mb-2 cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() => copyToClipboard(item.char)}
                  style={{ fontFamily: "Noto Sans Batak, serif" }}
                >
                  {item.char}
                </div>
                <div className="text-white/90 font-medium">{item.latin}</div>
                <div className="text-sm text-white/60">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-[80px]">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Contoh Kalimat
          </h2>
          <div className="space-y-6">
            {contohKalimat.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div
                      className="text-3xl mb-2 leading-relaxed cursor-pointer hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(item.aksara)}
                      style={{ fontFamily: "Noto Sans Batak, serif" }}
                    >
                      {item.aksara}
                    </div>
                    <div className="text-white/90 italic">{item.latin}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.aksara)}
                    className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white/80 hover:bg-white/20 transition-all"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Salin
                  </button>
                </div>
                <div className="text-white/70">
                  <span className="text-yellow-300">Arti:</span> {item.arti}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
