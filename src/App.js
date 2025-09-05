import React, { useState } from "react";
import { questions } from "./questions";
import { results } from "./results";

function App() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ masculine: 0, feminine: 0 });
  const [showResult, setShowResult] = useState(false);

  // Handle answer click
  const handleAnswer = (type) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  // Calculate Result
  let resultKey = "balanced";
  if (scores.masculine > scores.feminine) resultKey = "masculine";
  else if (scores.feminine > scores.masculine) resultKey = "feminine";

  // Social Share
  const handleShare = () => {
    const shareText = `I got "${results[resultKey].title}": ${results[resultKey].message}`;
    if (navigator.share) {
      navigator
        .share({
          title: "My Personality Result",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText} \n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  // Progress Bar Width
  const progress = Math.round(
    ((step + (showResult ? 1 : 0)) / questions.length) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-cyan-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-md w-full flex flex-col gap-6">
        <h1 className="font-extrabold text-3xl text-center mb-2 text-indigo-700 tracking-tight drop-shadow-sm">
          Masculine or Feminine Traits Quiz
        </h1>
        <p className="text-center text-gray-500 mb-2">Discover your core energy style</p>
        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-pink-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!showResult ? (
          <>
            {/* Current Question */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2 text-center">
              {questions[step].question}
            </h2>
            <div className="flex flex-col gap-4">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={opt.text}
                  className="w-full py-4 rounded-xl bg-indigo-100 hover:bg-indigo-300 active:scale-95 transition
                      border-2 border-transparent hover:border-indigo-500 text-indigo-800 text-base font-semibold shadow"
                  onClick={() => handleAnswer(opt.type)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            <div className="mt-2 text-gray-400 text-xs text-center tracking-widest">
              Question {step + 1} of {questions.length}
            </div>
          </>
        ) : (
          <>
            {/* Results Display */}
            <div className="flex flex-col items-center gap-2 my-4">
              <img
                src={results[resultKey].image}
                alt={results[resultKey].title}
                className="w-24 h-24 mb-2 rounded-full bg-white shadow"
              />
              <h2 className="text-2xl font-bold text-pink-700 mb-2">{results[resultKey].title}</h2>
              <p className="text-center text-lg text-gray-700 mb-3">{results[resultKey].message}</p>
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="mt-2 bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 text-white font-semibold py-2 px-7 rounded-full shadow-lg hover:scale-105 transition"
              >
                Share Result
              </button>
              {/* Buy Me a Coffee integration */}
              <a
                href="https://www.buymeacoffee.com/Ashforyou"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{ height: "45px", width: "162px" }}
                />
              </a>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-gray-700 underline hover:text-indigo-700 transition"
            >
              Retake Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
