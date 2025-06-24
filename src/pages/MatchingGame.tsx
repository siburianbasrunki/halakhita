import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  initialPairs,
  GAME_DURATION,
  TIME_PENALTY,
  type CharacterPair,
} from "../utils/gameType";

import Background from "../assets/bg.png";
import LatinCharacter from "../components/game/LatinChar";
import BatakCharacter from "../components/game/BatakChar";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

const MatchingGame = () => {
  const [batakChars, setBatakChars] = useState<CharacterPair[]>([]);
  const [latinChars, setLatinChars] = useState<CharacterPair[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [gameStatus, setGameStatus] = useState<
    "waiting" | "playing" | "finished"
  >("waiting");
  const [showTutorial, setShowTutorial] = useState<boolean>(true);
  
  const [selectedLatin, setSelectedLatin] = useState<string | null>(null);
  const [highlightedBatak, setHighlightedBatak] = useState<string | null>(null);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let timer: number;

    if (gameStatus === "playing" && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      finishGame();
    }

    return () => window.clearInterval(timer);
  }, [gameStatus, timeLeft]);

  useEffect(() => {
    if (
      Object.keys(matches).length === initialPairs.length &&
      gameStatus === "playing"
    ) {
      finishGame();
    }
  }, [matches, gameStatus]);

  const initGame = () => {
    const shuffled = shuffle([...initialPairs]);
    setBatakChars(shuffled);
    setLatinChars(shuffle([...shuffled]));
    setMatches({});
    setMessage("");
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStatus("waiting");
    setSelectedLatin(null);
    setHighlightedBatak(null);
  };

  const startGame = () => {
    const shuffled = shuffle([...initialPairs]);
    setBatakChars(shuffled);
    setLatinChars(shuffle([...shuffled]));
    setGameStatus("playing");
    setMessage("Game dimulai! Cocokkan aksara dengan benar!");
    setShowTutorial(false);
  };

  const applyTimePenalty = () => {
    setTimeLeft((prev) => Math.max(0, prev - TIME_PENALTY));
    setMessage(`Salah! Waktu dikurangi ${TIME_PENALTY} detik`);
    setTimeout(() => setMessage(""), 1500);
  };

  const finishGame = () => {
    setGameStatus("finished");
    const correctMatches = Object.entries(matches).filter(
      ([batak, latin]) =>
        initialPairs.find((p) => p.batak === batak)?.latin === latin
    ).length;

    const finalScore = Math.floor((correctMatches / initialPairs.length) * 100);
    setScore(finalScore);

    if (finalScore === 100) {
      setMessage(`Sempurna! Skor Anda: ${finalScore}`);
    } else if (finalScore >= 70) {
      setMessage(`Bagus! Skor Anda: ${finalScore}`);
    } else {
      setMessage(`Skor Anda: ${finalScore}. Ayo coba lagi!`);
    }
  };

  const handleDrop = (droppedBatak: string, droppedLatin: string) => {
    if (gameStatus !== "playing") return;

    const correctLatin = initialPairs.find(
      (p) => p.batak === droppedBatak
    )?.latin;
    const isCorrect = correctLatin === droppedLatin;

    const newMatches = { ...matches };
    if (newMatches[droppedBatak]) {
      delete newMatches[droppedBatak];
    }

    const existingLatinMatch = Object.entries(newMatches).find(
      ([, latin]) => latin === droppedLatin
    );
    if (existingLatinMatch) {
      delete newMatches[existingLatinMatch[0]];
    }

    if (isCorrect) {
      newMatches[droppedBatak] = droppedLatin;
      setMessage("Benar!");
      setTimeout(() => setMessage(""), 1500);
    } else {
      applyTimePenalty();
    }

    setMatches(newMatches);
    
    if (isMobile) {
      setSelectedLatin(null);
      setHighlightedBatak(null);
    }
  };

  const handleLatinClick = (latinChar: string) => {
    if (selectedLatin === latinChar) {
      setSelectedLatin(null); 
    } else {
      setSelectedLatin(latinChar);
      setMessage("Sekarang klik aksara Batak yang sesuai!");
      setTimeout(() => {
        if (selectedLatin === latinChar) setMessage("");
      }, 2000);
    }
  };

  const handleBatakClick = (batakChar: string) => {
    if (selectedLatin) {
      handleDrop(batakChar, selectedLatin);
    } else {
      setMessage("Pilih huruf Latin terlebih dahulu!");
      setHighlightedBatak(batakChar);
      setTimeout(() => {
        setMessage("");
        setHighlightedBatak(null);
      }, 1500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center flex-col py-10 px-4"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        className="max-w-4xl w-full mx-auto relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          Cocokkan Aksara Batak
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-xl font-semibold text-yellow-400">
            Waktu: {formatTime(timeLeft)}
          </div>

          {gameStatus === "playing" && (
            <motion.div
              className="text-xl font-semibold text-green-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Skor:{" "}
              {Math.floor(
                (Object.keys(matches).length / initialPairs.length) * 100
              )}
              %
            </motion.div>
          )}

          {gameStatus === "finished" && (
            <div
              className={`text-xl font-semibold ${
                score >= 70 ? "text-green-400" : "text-yellow-400"
              }`}
            >
              Skor Akhir: {score}%
            </div>
          )}
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              className={`p-4 mb-6 rounded-lg text-center ${
                message.includes("Benar") ||
                message.includes("Sempurna") ||
                message.includes("Bagus")
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {showTutorial && (
          <motion.div
            className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-yellow-400 font-bold mb-2">Cara Bermain:</h3>
            <ul className="list-disc pl-5 text-white space-y-1 text-sm">
              {isMobile ? (
                <>
                  <li>Klik huruf Latin, lalu klik aksara Batak yang sesuai</li>
                  <li>Huruf Latin yang dipilih akan ditandai dengan tanda centang</li>
                </>
              ) : (
                <li>Drag dan drop teks Latin ke kotak Aksara Batak yang sesuai</li>
              )}
              <li>Setiap jawaban benar akan menambah skor</li>
              <li>Jawaban salah akan mengurangi waktu bermain</li>
              <li>
                Selesaikan sebelum waktu habis untuk mendapatkan skor tertinggi
              </li>
            </ul>
            <div className="mt-3 text-sm text-white">
              <span className="text-yellow-400">Note:</span> Sebelum mulai bisa
              cek aksara di page{" "}
              <Link to="/aksara" className="text-yellow-300 underline">
                ini
              </Link>
            </div>
          </motion.div>
        )}

        {gameStatus === "waiting" && (
          <div className="text-center mb-8">
            <motion.button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 rounded-lg text-white text-xl font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Game
            </motion.button>
          </div>
        )}

        {(gameStatus === "playing" || gameStatus === "finished") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4 text-center bg-blue-500/20 py-2 rounded-lg">
                  Huruf Latin {isMobile && selectedLatin && "(Pilih Aksara)"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {latinChars.map(({ latin }) => (
                    <LatinCharacter
                      key={latin}
                      char={latin}
                      isMatched={Object.values(matches).includes(latin)}
                      disabled={gameStatus === "finished"}
                      isSelected={selectedLatin === latin}
                      onClick={() => handleLatinClick(latin)}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4 text-center bg-purple-500/20 py-2 rounded-lg">
                  Aksara Batak
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {batakChars.map(({ batak }) => (
                    <BatakCharacter
                      key={batak}
                      char={batak}
                      matchedLatin={matches[batak]}
                      onDrop={handleDrop}
                      disabled={gameStatus === "finished"}
                      isHighlighted={highlightedBatak === batak}
                      onClick={() => handleBatakClick(batak)}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4 mb-[80px]">
              <motion.button
                onClick={initGame}
                className="px-6 py-3 bg-yellow-500/80 hover:bg-yellow-500 rounded-lg text-white font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Main Lagi
              </motion.button>

              {gameStatus === "finished" && (
                <motion.button
                  onClick={startGame}
                  className="px-6 py-3 bg-yellow-500/80 hover:bg-yellow-500 rounded-lg text-white font-medium shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Coba Lagi
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MatchingGame;