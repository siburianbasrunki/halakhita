import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../assets/bg.png";
import { Home, ChevronRight, Award, Clock, Check, X } from "lucide-react";
import { quizData } from "../utils/quizData";

export const QuizView = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(300);
  };

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      setQuizCompleted(true);
      setShowResult(true);
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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

      <div className="max-w-4xl mx-auto relative z-10 px-4 w-full">
        <div className="flex items-center text-white/80 mb-8 text-sm">
          <Link to="/" className="flex items-center hover:text-yellow-400">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-yellow-400">Kuis Batak Toba</span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Award className="w-8 h-8 mr-2 text-yellow-400" />
            Kuis Budaya Batak Toba
          </h1>
          <div className="flex items-center bg-white/10 border border-white/20 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 mr-2 text-yellow-400" />
            <span className="text-white font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {!showResult ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-yellow-400 font-semibold">
                Soal {currentQuestion + 1} dari {quizData.length}
              </span>
              <span className="text-white/70">
                Skor: {score}/{quizData.length}
              </span>
            </div>

            <h2 className="text-2xl text-white mb-6">
              {quizData[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quizData[currentQuestion].answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selectedAnswer === answer.id
                      ? answer.id === quizData[currentQuestion].correctAnswer
                        ? "bg-green-500/20 border-green-400"
                        : "bg-red-500/20 border-red-400"
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedAnswer === answer.id
                          ? answer.id === quizData[currentQuestion].correctAnswer
                            ? "bg-green-500"
                            : "bg-red-500"
                          : "bg-white/10 border border-white/20"
                      }`}
                    >
                      {selectedAnswer === answer.id ? (
                        answer.id === quizData[currentQuestion].correctAnswer ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <X className="w-4 h-4 text-white" />
                        )
                      ) : (
                        <span className="text-white/80">
                          {String.fromCharCode(65 + parseInt(answer.id) - 1)}
                        </span>
                      )}
                    </div>
                    <span className="text-white">{answer.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
              >
                {currentQuestion < quizData.length - 1 ? "Lanjut" : "Selesai"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Hasil Kuis Anda
              </h2>
              <p className="text-white/80">
                Anda telah menyelesaikan kuis tentang Budaya Batak Toba
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white mb-2">{score}</div>
                <div className="text-white/80 mb-4">
                  dari {quizData.length} soal terjawab benar
                </div>
                <div
                  className={`text-xl font-semibold ${
                    score >= quizData.length * 0.8
                      ? "text-green-400"
                      : score >= quizData.length * 0.5
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {score >= quizData.length * 0.8
                    ? "Luar Biasa! Anda sangat memahami budaya Batak"
                    : score >= quizData.length * 0.5
                    ? "Bagus! Masih bisa ditingkatkan lagi"
                    : "Perlu belajar lebih banyak lagi"}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {quizData.map((question, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    question.correctAnswer === selectedAnswer
                      ? "bg-green-500/10 border-green-400/30"
                      : "bg-red-500/10 border-red-400/30"
                  }`}
                >
                  <h3 className="text-white font-semibold mb-2">
                    {index + 1}. {question.question}
                  </h3>
                  <p className="text-white/80 mb-3">
                    Jawaban benar:{" "}
                    <span className="text-green-400">
                      {
                        question.answers.find(
                          (a) => a.id === question.correctAnswer
                        )?.text
                      }
                    </span>
                  </p>
                  <p className="text-white/70 text-sm">{question.explanation}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleRestartQuiz}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
              >
                Coba Lagi
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};