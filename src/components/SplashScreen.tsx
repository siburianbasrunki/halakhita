import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const word = "ᯂᯬᯒᯘ᯲"; //HORAS
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < word.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + word[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }

    if (currentIndex === word.length) {
      const hideTimer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => setShowSplash(false), 1000);
      }, 1000);
      return () => clearTimeout(hideTimer);
    }
  }, [currentIndex]);

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gray-900 origin-top-left transition-all duration-1000 ease-in-out ${
          isClosing
            ? "scale-x-0 scale-y-0 opacity-0"
            : "scale-x-100 scale-y-100 opacity-100"
        }`}
        style={{
          clipPath: isClosing
            ? "polygon(100% 100%, 100% 100%, 100% 100%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          transitionProperty: "clip-path, transform, opacity",
        }}
      ></div>

      <div
        className={`relative z-10 ${
          isClosing ? "opacity-0 transition-opacity duration-500" : ""
        }`}
      >
        <div className="flex">
          {displayText.split("").map((letter, index) => (
            <span
              key={index}
              className="text-6xl font-bold px-1 animate-bounce"
              style={{
                background: "linear-gradient(135deg, #e74c3c 0%, #ecf0f1 50%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
