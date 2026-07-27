import QuizForm from "@/components/pages/QuizForm";
import React, { useState } from "react";

const Quizzes = () => {
  const [modal, setModal] = useState(null);
  if (modal === "create-quiz") {
    return <QuizForm />;
  }

  return (
    <div className="min-h-full flex items-center justify-center flex-col">
      <div>
        <button onClick={() => setModal("create-quiz")} className="px-5 py-3 bg-teal-600 text-white">
          Create Quiz
        </button>

        <h2 className="text-xl font-semibold italic mt-5">Available Quizzes</h2>
      </div>
    </div>
  );
};

export default Quizzes;
