import React, { useState } from "react";
import { API } from "@/api/Axios";

const QuizForm = ({ classId }) => {
  // Quiz Metadata States
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The actual array of questions that will be saved
  const [questions, setQuestions] = useState([]);

  // Local states for the "Active Question Builder"
  const [currentType, setCurrentType] = useState("MCQ");
  const [currentQuestionText, setCurrentQuestionText] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [mcqOptions, setMcqOptions] = useState(["", "", "", ""]); // 4 blank slots for MCQ

  // Handle updating a single MCQ option text field
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...mcqOptions];
    updatedOptions[index] = value;
    setMcqOptions(updatedOptions);
  };

  // Push the locally built question into the main quiz array
  const addQuestionToQuiz = (e) => {
    e.preventDefault();
    if (!currentQuestionText.trim()) return alert("Please enter question text.");
    if (!currentAnswer.trim()) return alert("Please specify the correct answer.");

    const newQuestion = {
      type: currentType,
      question: currentQuestionText,
      correctAnswer: currentAnswer,
    };

    if (currentType === "MCQ") {
      // Filter out any blank choices
      const filteredOptions = mcqOptions.filter((opt) => opt.trim() !== "");
      if (filteredOptions.length < 2) return alert("Please provide at least 2 options for an MCQ.");
      newQuestion.options = filteredOptions;
    }

    // Append to list and reset the builder fields
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionText("");
    setCurrentAnswer("");
    setMcqOptions(["", "", "", ""]);
  };

  // Final submit handler for Draft or Publish
  const handleSaveQuiz = async (statusType) => {
    if (!title.trim()) return alert("Quiz title is required");
    if (questions.length === 0 && statusType === "Published") {
      return alert("Cannot publish an empty quiz! Save as Draft instead or add questions.");
    }
    setIsSubmitting(true);

    try {
      await API.post(`/api/classes/${classId}/quizzes`, {
        title,
        status: statusType,
        topic,
        description,
        instructions: ["Read questions carefully"],
        scheduleDate: new Date(),
        duration: 30,
        questions,
      });

      alert(`Quiz successfully saved as ${statusType}!`);
      // Optional: Clear form on success
      if (statusType === "Published") setQuestions([]);
    } catch (error) {
      console.error(error);
      alert("Failed to save quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "900px", margin: "2rem auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 1. Header & Title Meta */}
      <div>
        <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Interactive Quiz Builder</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
          <input
            type="text"
            className="input"
            placeholder="Quiz Title (e.g., Week 2 Pop Quiz)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="text" className="input" placeholder="Topic (e.g., Photosynthesis)" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid var(--border)" }} />

      {/* 2. Dynamic Question Builder Section */}
      <div style={{ padding: "1rem", border: "1px dashed var(--border)", borderRadius: "8px" }}>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>Add a Question</h3>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {["MCQ", "TrueFalse", "ShortAnswer"].map((type) => (
            <button
              key={type}
              type="button"
              className={`btn ${currentType === type ? "btn-primary" : "btn-outline"}`}
              onClick={() => {
                setCurrentType(type);
                setCurrentAnswer("");
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input
            type="text"
            className="input"
            placeholder="Type your question prompt here..."
            value={currentQuestionText}
            onChange={(e) => setCurrentQuestionText(e.target.value)}
          />

          {/* Conditional Layout fields for MCQ Options */}
          {currentType === "MCQ" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {mcqOptions.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  className="input"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                />
              ))}
            </div>
          )}

          {/* Conditional Layout fields for Answer Selection */}
          <div>
            <label style={{ fontSize: "0.85rem", display: "block", marginBottom: "0.25rem" }}>Correct Answer</label>
            {currentType === "TrueFalse" ? (
              <select className="input" value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)}>
                <option value="">Select...</option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            ) : (
              <input
                type="text"
                className="input"
                placeholder={currentType === "MCQ" ? "Must match one of the options exactly" : "Expected response text"}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
            )}
          </div>

          <button type="button" className="btn btn-secondary" style={{ marginTop: "0.5rem" }} onClick={addQuestionToQuiz}>
            + Add Question to List
          </button>
        </div>
      </div>

      {/* 3. Staged Questions Live Feed */}
      {questions.length > 0 && (
        <div style={{ background: "var(--muted)", padding: "1rem", borderRadius: "8px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>Staged Questions ({questions.length})</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {questions.map((q, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--card)",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                  border: "1px solid var(--card-border)",
                }}
              >
                <span>
                  {idx + 1}. <strong>[{q.type}]</strong> {q.question}
                </span>
                <button
                  className="btn"
                  style={{ padding: "2px 6px", background: "var(--error-bg)", color: "var(--error)" }}
                  onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Submission Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
        <button className="btn btn-outline" onClick={() => handleSaveQuiz("Draft")} disabled={isSubmitting}>
          Save as Draft
        </button>
        <button className="btn btn-primary" onClick={() => handleSaveQuiz("Published")} disabled={isSubmitting || questions.length === 0}>
          Publish to Class
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
