import AssessmentForm from "@/components/pages/AssessmentForm";
import React, { useState } from "react";

const Quizzes = () => {
  const [modal, setModal] = useState(null);
  if (modal === "create-assessment") {
    return <AssessmentForm />;
  }

  return (
    <div className="min-h-full flex items-center justify-center flex-col">
      <div>
        <button onClick={() => setModal("create-assessment")} className="px-5 py-3 bg-teal-600 text-white">
          Assign a Task
        </button>

        <h2 className="text-xl font-semibold italic mt-5">Available Tasks</h2>
      </div>
    </div>
  );
};

export default Quizzes;
