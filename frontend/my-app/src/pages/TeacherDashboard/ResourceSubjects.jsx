import { API } from "@/api/Axios";
import { ChevronLeft } from "lucide-react";

import { Link, useParams } from "react-router-dom";

const ResourceSubjects = () => {
  const { subjectId } = useParams();
  // Fetch Subjects on mount

  // --- VIEW 1: SUBJECT SELECTION SCREEN ---

  return (
    <div className="max-w-4xl px-4 py-12 mx-auto">
      <header className="flex items-center gap-2 mb-6">
        <button className="flex items-center gap-1 p-1 bg-muted">
          <ChevronLeft textAnchor="25" />
        </button>
        <h1 className="text-2xl font-bold">Study Resource</h1>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link to={`/resources/${subjectId}`} className="card">
          Note
        </Link>
        <Link to={`/subjects/${subjectId}/chapters`} className="card">
          Questions
        </Link>
        <Link to={`/subjects/${subjectId}/assessments`} className="card">
          Assessments
        </Link>

        <Link to={`/subjects/${subjectId}/quizzes`} className="card">
          general Quizzes
        </Link>
      </div>
    </div>
  );
};

export default ResourceSubjects;
