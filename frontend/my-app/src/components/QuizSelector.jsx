import { Plus } from "lucide-react";
import React from "react";

const QuizSelector = () => {
  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Quiz
      </button>
    </div>
  );
};

export default QuizSelector;
