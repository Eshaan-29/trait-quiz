import './App.css';
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
    if (step < questions.length - 1) setStep(step + 1);
    else setShowResult(true);
  };

  // Determine result key
  let resultKey = "balanced";
  if (scores.masculine > scores.feminine) resultKey = "masculine";
  else if (scores.feminine > scores.masculine) resultKey = "feminine";

  // Social share
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

  const progress = Math.round(
    ((step + (showResult ? 1 : 0)) / questions.length) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-indigo-100 to-cyan-100 flex items-center justify-center p-4">
      <div className="card max-w-lg w-full mx-auto">
        <h1 className="font-extrabold text-3xl text-center mb-4 text-indigo-800 tracking-tight drop-shadow">
          ✨ Trait Analyzer ✨
        </h1>
        <p className="text-center text-gray-500 mb-5 text-base">Discover your core energy style.</p>
        {/* Progress Bar */}
        <div className="progress mb-8">
          <div className="bar" style={{ width: `${progress}%` }} />
        </div>

        {!showResult ? (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-6 text-center">{questions[step].question}</h2>
              <div className="choices w-full flex flex-col gap-4">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.text}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition"
                    onClick={() => handleAnswer(opt.type)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 muted small text-center">
              Question {step + 1} of {questions.length}
            </div>
          </>
        ) : (
          <>
            {/* Results Display */}
            <div className="flex flex-col items-center gap-1 mb-3">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-300 via-indigo-200 to-cyan-200 rounded-full shadow-xl flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={results[resultKey].image}
                  alt={results[resultKey].title}
                  className="w-20 h-20 object-cover rounded-full"
                  style={{ background: "#fff" }}
                />
              </div>
              <h2 className="text-2xl font-extrabold text-pink-700 mb-1">{results[resultKey].title}</h2>
              <p className="text-center text-lg text-indigo-800 mb-2">{results[resultKey].message}</p>
              <button
                onClick={handleShare}
                className="button secondary my-2"
              >
                🚀 Share Your Result
              </button>
              {/* Buy Me a Coffee integration */}
              <a
                href="https://www.buymeacoffee.com/Ashforyou"
                target="_blank"
                rel="noopener noreferrer"
                className="block my-3"
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{ height: "45px", width: "162px" }}
                />
              </a>
              <button
                onClick={() => window.location.reload()}
                className="button ghost small"
              >
                🔁 Retake Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
