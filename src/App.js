import './App.css';
import React, { useState } from "react";
import { questions } from "./questions";
import { results } from "./results";

function App() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ masculine: 0, feminine: 0 });
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // Handle answer click, allow change anytime
  const handleAnswer = (type) => {
    const updatedAnswers = [...answers];
    const prevType = answers[step];
    updatedAnswers[step] = type;
    setAnswers(updatedAnswers);

    setScores((prev) => {
      let nextScores = { ...prev };
      if (prevType && prevType !== type) nextScores[prevType]--;
      nextScores[type]++;
      return nextScores;
    });

    if (step < questions.length - 1) setStep(step + 1);
    else setShowResult(true);
  };

  const handleBack = () => {
    if (step === 0) return;
    const prevStep = step - 1;
    const prevType = answers[prevStep];
    if (prevType) {
      setScores((prev) => ({ ...prev, [prevType]: prev[prevType] - 1 }));
    }
    setStep(prevStep);
  };

  // Result calculation
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
      <div className="max-w-md w-full mx-auto bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <h1 className="font-extrabold text-3xl text-center mb-4 text-indigo-800 tracking-tight drop-shadow">
          ✨ Trait Analyzer ✨
        </h1>
        <p className="text-center text-gray-500 mb-5 text-base">Discover your core energy style.</p>
        {/* Progress Bar */}
        <div className="w-full h-3 rounded bg-blue-100 mb-8 overflow-hidden">
          <div
            className="h-full bg-blue-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!showResult ? (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">{questions[step].question}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", alignItems: "center" }}>
              {questions[step].options.map((opt) => {
                const selected = answers[step] === opt.type;
                return (
                  <button
                    key={opt.text}
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      padding: "12px 0",
                      borderRadius: "14px",
                      background: selected ? "#fff" : "#2563eb",
                      color: selected ? "#2563eb" : "white",
                      fontWeight: "bold",
                      border: selected ? "3px solid #2563eb" : "none",
                      boxShadow: "0 2px 8px rgba(37,99,235,0.09)",
                      transition: "background 0.2s, border 0.2s, color 0.2s",
                      fontSize: "1rem",
                      cursor: "pointer"
                    }}
                    onClick={() => handleAnswer(opt.type)}
                  >
                    {opt.text}
                  </button>
                );
              })}

              {/* Back Button Below Options and Styled To Match */}
              {step > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    padding: "12px 0",
                    borderRadius: "14px",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.09)",
                    fontSize: "1rem",
                    cursor: "pointer",
                    marginTop: "16px"
                  }}>
                  ← Back
                </button>
              )}
            </div>

            <div className="mt-6 text-gray-400 text-sm text-center">
              Question {step + 1} of {questions.length}
            </div>
          </div>
        ) : (
          // ---- RESULT CARD ----
          <div className="flex flex-col items-center w-full gap-5">
            <img
              src={results[resultKey].image}
              alt={results[resultKey].title}
              className="max-h-60 max-w-xs object-contain rounded-xl shadow bg-white mx-auto"
              style={{ display: "block" }}
            />
            <h2 className="text-2xl font-extrabold text-pink-700 text-center">{results[resultKey].title}</h2>
            <p className="text-center text-lg text-indigo-800 mb-2">{results[resultKey].message}</p>
            <div className="flex flex-col gap-3 w-full items-center">
              <button
                onClick={handleShare}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow transition w-full max-w-xs"
              >
                🚀 Share Your Result
              </button>
              <a
                href="https://www.buymeacoffee.com/Ashforyou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
                style={{ maxWidth: "162px" }}
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{ height: "45px", width: "162px" }}
                />
              </a>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-100 text-gray-700 font-semibold py-2 px-6 rounded-xl shadow hover:bg-gray-200 w-full max-w-xs"
              >
                🔁 Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
