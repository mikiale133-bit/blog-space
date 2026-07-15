import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Send, AlertCircle } from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is computer?",
      choices: {
        a: "An electronic device for processing data",
        b: "A mechanical calculator",
        c: "A type of smartphone",
        d: "A gaming console",
      },
      answer: "a",
    },
    {
      id: 2,
      question: "What is Web Development?",
      choices: {
        a: "Creating mobile applications",
        b: "Building and maintaining websites",
        c: "Designing graphics",
        d: "Writing system software",
      },
      answer: "b",
    },
    {
      id: 3,
      question: "What is school?",
      choices: {
        a: "A place for entertainment",
        b: "A business organization",
        c: "A sports facility",
        d: "An educational institution",
      },
      answer: "d",
    },
  ];

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, choiceKey) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: choiceKey,
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        correct++;
      }
    });
    return correct;
  };

  const isAnswered = (questionId) => {
    return selectedAnswers[questionId] !== undefined;
  };

  const getAnswerStatus = (questionId, choiceKey) => {
    if (!isSubmitted) return null;
    const question = questions.find((q) => q.id === questionId);
    if (choiceKey === question.answer) return "correct";
    if (selectedAnswers[questionId] === choiceKey && choiceKey !== question.answer) return "incorrect";
    return null;
  };

  const currentQ = questions[currentQuestion];
  const score = calculateScore();
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  if (showResults) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h2>
              <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                {score}/{totalQuestions}
              </div>

              <div className="text-gray-600 mt-4"></div>
            </div>

            <div>
              <h2>Skipped: {totalQuestions - answeredCount}</h2>
              <h2>Answered: {answeredCount}</h2>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => {
                const isCorrect = selectedAnswers[q.id] === q.answer;
                const isAnswered_ = isAnswered(q.id);
                return (
                  <div key={q.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0">
                        {isAnswered_ ? (
                          isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">
                          {index + 1}. {q.question}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Your answer: {isAnswered_ ? q.choices[selectedAnswers[q.id]] : "Not answered"}</p>
                        {!isCorrect && isAnswered_ && <p className="text-sm text-green-600 mt-1">Correct answer: {q.choices[q.answer]}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-4">
              <button className="p-1 border w-full rounded-lg font-semibold">Share Your Results</button>

              <button className="p-1 border w-full rounded-lg font-semibold">Submit to Instructor</button>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header with Timer and Progress */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span className="text-sm text-gray-500">({answeredCount} answered)</span>
            </div>
            <div className={`flex items-center gap-2 font-mono text-lg ${timeLeft < 30 ? "text-red-500 animate-pulse" : "text-gray-700"}`}>
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>

          <div className="space-y-3">
            {Object.entries(currentQ.choices).map(([key, value]) => {
              const status = getAnswerStatus(currentQ.id, key);
              const isSelected = selectedAnswers[currentQ.id] === key;

              let bgColor = "bg-white hover:bg-gray-50";
              let borderColor = "border-gray-200";
              let icon = null;

              if (isSubmitted) {
                if (status === "correct") {
                  bgColor = "bg-green-50";
                  borderColor = "border-green-500";
                  icon = <CheckCircle className="w-5 h-5 text-green-500" />;
                } else if (status === "incorrect") {
                  bgColor = "bg-red-50";
                  borderColor = "border-red-500";
                  icon = <XCircle className="w-5 h-5 text-red-500" />;
                }
              } else if (isSelected) {
                bgColor = "bg-blue-50";
                borderColor = "border-blue-500";
              }

              return (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(currentQ.id, key)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-lg border-2 ${borderColor} ${bgColor} transition-all duration-200 flex items-center justify-between`}
                >
                  <span className="font-medium">
                    {key.toUpperCase()}. {value}
                  </span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentQuestion === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentQuestion === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentQuestion ? "bg-blue-500 w-6" : isAnswered(q.id) ? "bg-green-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
