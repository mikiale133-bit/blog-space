import AssessmentForm from "@/components/pages/AssessmentForm";
import React, { useState } from "react";

const GroupsPage = () => {
  const [modal, setModal] = useState(null);
  if (modal === "create-group") {
    return <AssessmentForm />;
  }

  return (
    <div className="min-h-full flex items-center justify-center flex-col">
      <div>
        <button onClick={() => setModal("create-group")} className="px-5 py-3 bg-teal-600 text-white">
          Manage Group
        </button>

        <h2 className="text-xl font-semibold italic mt-5">Available Tasks</h2>
      </div>
    </div>
  );
};

export default GroupsPage;
