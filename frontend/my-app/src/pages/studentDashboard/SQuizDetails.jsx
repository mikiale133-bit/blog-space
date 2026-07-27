import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, HelpCircle, CheckSquare, Award, ArrowLeft, Send } from "lucide-react";

const SQuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Key Value pairs tracking student input: { [questionId]: "Selected/Typed Answer" }
  const [answers, setAnswers] = useState({});

  // FETCH QUIZ
  useEffect(() => {
    const getQuiz = async () => {
      try {
        setIsLoading(true);
        // Note: Recommended to make a direct /api/quizzes/:id endpoint on backend
        // to bypass needing classId on the client routing params!
        const res = await API.get(`/api/classes/class/quizzes/${id}`);
        setQuiz(res.data.quiz || null);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Could not load the quiz assignment.");
      } finally {
        setIsLoading(false);
      }
    };
    getQuiz();
  }, [id]);

  // Handle tracking student selection changes
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Submit test answers object payload to the backend
  const handleSubmitQuiz = async () => {
    // Basic verification check before submission
    const totalQuestions = quiz?.questions?.length || 0;
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < totalQuestions) {
      const confirmLeave = window.confirm(`You have only answered ${answeredCount}/${totalQuestions} questions. Are you sure you want to submit?`);
      if (!confirmLeave) return;
    }

    try {
      setIsSubmitting(true);

      // Send the answers dictionary to your submission endpoint
      await API.post(`/api/quizzes/${id}/submit`, {
        answers: answers, // Sends data formatted as e.g., { "q_id_1": "Paris", "q_id_2": "True" }
      });

      alert("Quiz submitted successfully!");
      navigate("/student/quizzes"); // Route back to student dashboard feed
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit quiz responses. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mb-3"></div>
        <p className="text-sm opacity-80 font-medium">Loading test package variables...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="card max-w-xl mx-auto my-12 text-center border-t-4 border-[var(--error)]">
        <p className="text-[var(--error)] font-medium m-0">{error || "Quiz entry data not found."}</p>
        <button onClick={() => navigate(-1)} className="btn btn-outline mt-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-1 sm:p-3 max-w-4xl mx-auto text-[var(--text)]">
      {/* Quiz Workspace Navigation Header Row */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline mb-6 flex items-center gap-2 text-xs border-none bg-[var(--muted)] hover:bg-[var(--muted-hover)] py-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Panel
      </button>

      {/* Quiz Master Information Meta Card Banner */}
      <div className="card mb-8 bg-[var(--muted)] border-none flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="badge badge-info mb-2 flex items-center gap-1 w-max">
            <Award className="w-3 h-3" /> Assessment Active
          </span>
          <h1 className="text-xl font-bold m-0 tracking-tight leading-tight">{quiz.title}</h1>
          {quiz.description && <p className="text-sm opacity-75 mt-2 mb-0 max-w-2xl">{quiz.description}</p>}
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] rounded-lg shadow-sm w-max shrink-0 self-start sm:self-center">
          <Clock className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-sm font-bold">{quiz.duration} Minutes Remaining</span>
        </div>
      </div>

      {/* Core Question Processing Engine List Wrapper */}
      <div className="space-y-1">
        {quiz.questions?.map((que, index) => {
          const isAnswered = answers[que._id] !== undefined && answers[que._id] !== "";

          return (
            <div
              key={que._id}
              className={`relative card transition-all duration-200 ${
                isAnswered ? "border-l-4 border-l-[var(--accent)]" : "border-l-4 border-l-[var(--border-muted)]"
              }`}
            >
              {/* Question Header Metadata Label Row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-base pt-1 font-semibold m-0 flex items-start gap-2 leading-relaxed">
                  <span className="opacity-50 select-none font-mono text-sm mt-0.5">{String(index + 1).padStart(2, "0")}.</span>
                  <span>{que.questionText || que.question}</span>
                </h3>
                <span className="text-[10px] absolute top-1 right-1 font-bold uppercase tracking-wider opacity-60 bg-[var(--muted)] px-2 py-0.5 rounded border border-[var(--border)] shrink-0">
                  {que.type === "TrueFalse" || que.type === "trueFalse" ? "T/F" : que.type}
                </span>
              </div>

              {/* TF*/}
              {(que.type === "TrueFalse" || que.type === "trueFalse") && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {["True", "False"].map((opt) => {
                    const isSelected = answers[que._id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleAnswerChange(que._id, opt)}
                        className={`btn text-left justify-start px-4 py-3 rounded-lg w-full font-medium transition-all ${
                          isSelected
                            ? "bg-[var(--primary)] text-white shadow-sm"
                            : "bg-[var(--muted)] hover:bg-[var(--muted-hover)] border border-[var(--border)] text-[var(--text)]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 shrink-0 ${
                            isSelected ? "border-white bg-white" : "border-[var(--outline)]"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />}
                        </div>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MCQ */}
              {que.type === "MCQ" && (
                <div className="grid grid-cols-1 gap-2.5 mt-2">
                  {(que.options || que.choices || []).map((choice, i) => {
                    const isSelected = answers[que._id] === choice;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleAnswerChange(que._id, choice)}
                        className={`flex gap-1 items-center text-left justify-start px-4 py-3 rounded w-full font-medium  ${
                          isSelected ? "bg-primary/80 text-white shadow-sm" : "bg-muted hover:bg-muted-hover border border-border text-text"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 shrink-0 ${
                            isSelected ? "border-white/80 bg-white/80" : "border-[var(--outline)]"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />}
                        </div>
                        <span className="leading-snug">{choice}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* SHORT ANSWER */}
              {que.type === "ShortAnswer" && (
                <div className="mt-2">
                  <textarea
                    rows={2}
                    className="input w-full p-3 resize-none bg-[var(--muted)] focus:bg-[var(--card)]"
                    placeholder="Type your answer..."
                    value={answers[que._id] || ""}
                    onChange={(e) => handleAnswerChange(que._id, e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Form Context Control Confirmation Bar */}
      <div className="mt-10 pt-6 border-t border-[var(--border)] flex justify-end">
        <button
          onClick={handleSubmitQuiz}
          disabled={isSubmitting}
          className="btn btn-primary px-8 py-3 font-semibold shadow-md tracking-wide flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          {isSubmitting ? (
            <>Uploading Package Responses...</>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit Complete Assessment
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SQuizDetails;
