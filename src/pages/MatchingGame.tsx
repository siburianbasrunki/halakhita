import { useState, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { shuffle } from "lodash";
import Background from "../assets/bg.png";

interface CharacterPair {
  batak: string;
  latin: string;
}

const initialPairs: CharacterPair[] = [
  { batak: "ᯂ", latin: "ha" },
  { batak: "ᯔ", latin: "ma" },
  { batak: "ᯉ", latin: "na" },
  { batak: "ᯒ", latin: "ra" },
  { batak: "ᯖ", latin: "ta" },
  { batak: "ᯘ", latin: "sa" },
  { batak: "ᯑ", latin: "da" },
  { batak: "ᯎ", latin: "ga" },
  { batak: "ᯐ", latin: "ja" },
  { batak: "ᯅ", latin: "ba" },
  { batak: "ᯞ", latin: "la" },
  { batak: "ᯇ", latin: "pa" },
  { batak: "ᯤ", latin: "i" },
  { batak: "ᯥ", latin: "u" },
];

const GAME_DURATION = 120;
const TIME_PENALTY = 5;

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

  // Initialize game characters when component mounts
  useEffect(() => {
    initGame();
  }, []);

  // Timer logic
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
  };

  const startGame = () => {
    const shuffled = shuffle([...initialPairs]);
    setBatakChars(shuffled);
    setLatinChars(shuffle([...shuffled]));
    setGameStatus("playing");
    setMessage("Game dimulai! Cocokkan aksara dengan benar!");
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
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center flex-col py-20 px-4"
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

      <div className="max-w-4xl w-full mx-auto relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
          Cocokkan Aksara Batak
          <br />
          <span className="text-sm">(sian siamun tu hambirang)</span>
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-yellow-400">
            Waktu: {formatTime(timeLeft)}
          </div>
          {gameStatus === "playing" && (
            <div className="text-xl font-semibold text-green-400">
              Skor:{" "}
              {Math.floor(
                (Object.keys(matches).length / initialPairs.length) * 100
              )}
              %
            </div>
          )}
          {gameStatus === "finished" && (
            <div className="text-xl font-semibold text-green-400">
              Skor Akhir: {score}%
            </div>
          )}
        </div>

        {message && (
          <div
            className={`p-4 mb-6 rounded-lg text-center ${
              message.includes("Benar") ||
              message.includes("Sempurna") ||
              message.includes("Bagus")
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {gameStatus === "waiting" && (
          <div className="text-center mb-8">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-lg text-green-300 text-xl font-bold transition-all duration-200 transform hover:scale-105"
            >
              Mulai Game
            </button>
          </div>
        )}

        {(gameStatus === "playing" || gameStatus === "finished") && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Batak Characters */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                  Aksara Batak
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {batakChars.map(({ batak }) => (
                    <BatakCharacter
                      key={batak}
                      char={batak}
                      matchedLatin={matches[batak]}
                      onDrop={handleDrop}
                      disabled={gameStatus === "finished"}
                    />
                  ))}
                </div>
              </div>

              {/* Latin Characters */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                  Huruf Latin
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {latinChars.map(({ latin }) => (
                    <LatinCharacter
                      key={latin}
                      char={latin}
                      isMatched={Object.values(matches).includes(latin)}
                      disabled={gameStatus === "finished"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={initGame}
                className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 rounded-lg text-yellow-300 transition-all duration-200 transform hover:scale-105"
              >
                Main Lagi
              </button>
              {/* {gameStatus === "finished" && (
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-lg text-green-300 transition-all duration-200 transform hover:scale-105"
                >
                  Coba Lagi
                </button>
              )} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface BatakCharacterProps {
  char: string;
  matchedLatin?: string;
  onDrop: (batak: string, latin: string) => void;
  disabled: boolean;
}

const BatakCharacter = ({
  char,
  matchedLatin,
  onDrop,
  disabled,
}: BatakCharacterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "BATAK",
    item: { batak: char },
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "LATIN",
    drop: (item: { latin: string }) => onDrop(char, item.latin),
    canDrop: () => !disabled,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center h-20 w-full rounded-lg border-2 transition-all ${
        matchedLatin
          ? "border-green-500/50 bg-green-500/10"
          : isOver
          ? "border-yellow-500/50 bg-yellow-500/10"
          : "border-white/20 bg-white/5"
      } ${isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"} ${
        disabled ? "cursor-not-allowed" : "cursor-move"
      }`}
    >
      <div
        className="text-4xl text-white text-center"
        style={{ fontFamily: "Noto Sans Batak, serif" }}
      >
        {char}
      </div>
      {matchedLatin && (
        <div className="absolute bottom-1 right-1 text-xs bg-green-500/50 rounded px-1 text-white">
          {matchedLatin}
        </div>
      )}
    </div>
  );
};

interface LatinCharacterProps {
  char: string;
  isMatched: boolean;
  disabled: boolean;
}

const LatinCharacter = ({ char, isMatched, disabled }: LatinCharacterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "LATIN",
    item: { latin: char },
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center h-20 w-full rounded-lg border-2 transition-all ${
        isMatched
          ? "border-green-500/50 bg-green-500/10"
          : "border-white/20 bg-white/5"
      } ${isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"} ${
        disabled || isMatched ? "cursor-not-allowed" : "cursor-move"
      }`}
    >
      <div className="text-4xl text-white text-center font-bold">{char}</div>
    </div>
  );
};

export default MatchingGame;
