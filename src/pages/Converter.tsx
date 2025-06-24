import { useState, useEffect } from "react";
import { Copy, Volume2, BookOpen, Zap } from "lucide-react";
import Background from "../assets/bg.png";

const Converter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const consonants: Record<string, string> = {
    k: "ᯄ᯦",
    b: "ᯅ",
    p: "ᯇ",
    n: "ᯉ",
    w: "ᯋ",
    g: "ᯎ",
    j: "ᯐ",
    d: "ᯑ",
    r: "ᯒ",
    m: "ᯔ",
    t: "ᯖ",
    s: "ᯘ",
    y: "ᯛ",
    l: "ᯞ",
    c: "ᯡ",
    h: "ᯂ",
    f: "ᯇ",
    q: "ᯄ᯦",
    v: "ᯋ",
    x: "ᯘ",
    z: "ᯐ",
    ng: "ᯰ",
    ny: "ᯠ",
  };

  const vowelDiacritics: Record<string, string> = {
    i: "ᯪ",
    u: "ᯮ",
    e: "ᯩ",
    é: "ᯩ",
    o: "ᯬ",
  };

  const standaloneVowels: Record<string, string> = {
    a: "ᯀ",
    i: "ᯤ",
    u: "ᯥ",
    e: "ᯀᯩ",
    é: "ᯀᯩ",
    o: "ᯀᯬ",
  };

  const specialDiacritics: Record<string, string> = {
    k_ha_haborotan_i: "ᯄ᯦ᯪ",
  };

  const isVowel = (char: string): boolean => {
    return ["a", "i", "u", "e", "é", "o"].includes(char.toLowerCase());
  };

  const isBaseConsonant = (char: string): boolean => {
    return Object.keys(consonants).some(
      (key) => key.length === 1 && key === char.toLowerCase()
    );
  };

  const improvedLatinToBatak = (text: string): string => {
    if (!text.trim()) return "";

    let finalResult = "";
    let i = 0;

    while (i < text.length) {
      const char = text[i];
      const lowerChar = char.toLowerCase();

      if (char === " " || char === "\n" || char === "\t") {
        finalResult += " ";
        i++;
        continue;
      }

      if (!/[a-zA-Zé0-9]/.test(char)) {
        finalResult += char;
        i++;
        continue;
      }

      // Handle special case for "nki"
      if (
        lowerChar === "k" &&
        i > 0 &&
        text[i - 1].toLowerCase() === "n" &&
        i + 1 < text.length &&
        text[i + 1].toLowerCase() === "i"
      ) {
        finalResult += specialDiacritics["k_ha_haborotan_i"];
        i += 2;
        continue;
      }

      // Handle two-character consonants (ng, ny)
      if (i < text.length - 1) {
        const twoChar = text.substring(i, i + 2).toLowerCase();
        if (consonants[twoChar]) {
          finalResult += consonants[twoChar];
          i += 2;
          if (i < text.length) {
            const nextChar = text[i].toLowerCase();
            if (
              isVowel(nextChar) &&
              nextChar !== "a" &&
              vowelDiacritics[nextChar]
            ) {
              finalResult += vowelDiacritics[nextChar];
              i++;
            }
          }
          continue;
        }
      }

      // Handle single consonants
      if (isBaseConsonant(lowerChar)) {
        finalResult += consonants[lowerChar];

        if (i + 1 < text.length) {
          const nextChar = text[i + 1].toLowerCase();
          if (isVowel(nextChar)) {
            if (nextChar !== "a") {
              finalResult += vowelDiacritics[nextChar];
            }
            i++;
          } else {
            // Add virama if next character is consonant or end of word
            if (
              /[a-zA-Zé0-9]/.test(nextChar) ||
              i + 1 === text.length ||
              nextChar === " " ||
              nextChar === "\n" ||
              nextChar === "\t"
            ) {
              finalResult += "᯲";
            }
          }
        } else {
          finalResult += "᯲";
        }
        i++;
      } else if (isVowel(lowerChar)) {
        const prevCharLower = i > 0 ? text[i - 1].toLowerCase() : "";
        const prevResultChar = finalResult.slice(-1);

        // Check if this vowel should be standalone
        // It's standalone if:
        // 1. It's at the beginning of text
        // 2. Previous character is not alphanumeric
        // 3. Previous character had virama (᯲)
        // 4. For 'a': if previous consonant already has its inherent 'a', this 'a' should be standalone
        if (
          i === 0 ||
          !/[a-zA-Zé0-9]/.test(prevCharLower) ||
          prevResultChar === "᯲"
        ) {
          finalResult += standaloneVowels[lowerChar];
        } else if (lowerChar === "a") {
          // This is the key fix: 'a' after a consonant that already has inherent 'a'
          // should be treated as standalone
          if (isBaseConsonant(prevCharLower) || 
              (i >= 2 && consonants[text.substring(i-2, i).toLowerCase()])) {
            finalResult += standaloneVowels[lowerChar];
          }
          // If previous was vowel, this 'a' is standalone
          else if (isVowel(prevCharLower)) {
            finalResult += standaloneVowels[lowerChar];
          }
        } else {
          // For other vowels (i, u, e, o), if previous was a vowel, make it standalone
          if (isVowel(prevCharLower)) {
            finalResult += standaloneVowels[lowerChar];
          } else {
            finalResult += standaloneVowels[lowerChar];
          }
        }
        i++;
      } else {
        finalResult += char;
        i++;
      }
    }

    return finalResult;
  };

  useEffect(() => {
    if (inputText.trim() === "") {
      setOutputText("");
      return;
    }

    setIsAnimating(true);
    const timeoutId = setTimeout(() => {
      setOutputText(improvedLatinToBatak(inputText));
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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
              Converter Aksara Batak Toba
            </h1>
          </div>
          <p className="text-white/80 text-lg">
            Konversi teks Latin ke Aksara Batak dengan akurasi tinggi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                Teks Latin
              </h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Contoh: horas, basrunki, siburian"
                className="w-full h-40 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none text-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Volume2 className="w-6 h-6 mr-2 text-green-400" />
                  Aksara Batak
                </h3>
                <button
                  onClick={copyToClipboard}
                  disabled={!outputText}
                  className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 disabled:bg-gray-500/20 border border-green-400/30 rounded-lg px-4 py-2 text-green-300 disabled:text-gray-400 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Disalin!" : "Copy"}</span>
                </button>
              </div>
              <div
                className={`w-full h-40 bg-white/5 border border-white/20 rounded-xl p-4 text-white overflow-auto text-lg transition-all duration-300 ${
                  isAnimating
                    ? "opacity-50 transform scale-95"
                    : "opacity-100 transform scale-100"
                }`}
                style={{ fontFamily: "Noto Sans Batak, serif" }}
              >
                {outputText || (
                  <span className="text-white/50 italic">
                    Hasil konversi akan muncul di sini...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;