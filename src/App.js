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
      navigator.share({
        title: "My Personality Result",
        text: shareText,
        url: window.location.href,
      }).catch(()=>{});
    } else {
      navigator.clipboard.writeText(`${shareText} \n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  // Progress Bar Width
  const progress = Math.round(((step + (showResult ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Masculine or Feminine Traits Quiz</h1>
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!showResult ? (
          <>
            {/* Current Question */}
            <h2 className="text-lg font-medium mb-4">{questions[step].question}</h2>
            <div className="flex flex-col gap-4">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.text}
                  className="py-2 px-4 bg-blue-100 hover:bg-blue-300 rounded transition text-left"
                  onClick={() => handleAnswer(opt.type)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              Question {step + 1} of {questions.length}
            </div>
          </>
        ) : (
          <>
            {/* Results Display */}
            <div className="flex flex-col items-center">
              {/* Optional image: <img src={results[resultKey].image} alt={results[resultKey].title} className="w-24 h-24 mb-4" /> */}
              <div className="mb-2 text-3xl font-bold text-blue-700">{results[resultKey].title}</div>
              <p className="mb-2 text-xl text-blue-600">{results[resultKey].message}</p>
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="bg-blue-500 text-white py-2 px-6 rounded shadow hover:bg-blue-700 transition"
              >
                Share Result
              </button>
                {/* Buy Me a Coffee integration */}
  <a
    href="https://www.buymeacoffee.com/Ashforyou"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6"
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
              className="mt-6 text-blue-500 underline"
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
