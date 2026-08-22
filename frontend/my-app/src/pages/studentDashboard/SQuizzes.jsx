import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { BookOpen, Clock, User, Calendar, CheckCircle2, AlertCircle, ArrowLeft, ChevronRight } from "lucide-react";

const SQuizzes = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const classId = student?.classId;

  // FETCH STUDENT
  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await API.get(`/api/students/get-me`);
        setStudent(res.data.student || {});
      } catch (err) {
        console.error("Error fetching student profile:", err);
        setError("Failed to load profile data.");
      }
    };
    getStudent();
  }, []);

  // FETCH CLASS QUIZZES FOR A SUBJECT
  useEffect(() => {
    if (!classId) return;

    const getQuizzes = async () => {
      try {
        setIsLoading(true);
        const res = await API.get(`/api/classes/${classId}/quizzes/${subjectId}`);

        // Safety filter: Only let students look at Published items
        const publishedOnly = (res.data.quizzes || []).filter((quiz) => quiz.status === "Published");
        setQuizzes(publishedOnly);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load assigned quizzes.");
      } finally {
        setIsLoading(false);
      }
    };
    getQuizzes();
  }, [classId, subjectId]);

  const handleBackToSubjects = () => {
    navigate(-1);
  };

  // Loading State
  if (isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center opacity-80 min-h-[50vh]">
        <div className="w-8 h-8 mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
        <p className="text-sm font-medium tracking-wide">Loading assignment schedules...</p>
      </div>
    );
  }

  // Error Banner State
  if (error) {
    return (
      <div className="flex items-start max-w-lg gap-3 mx-auto my-8 border-l-4 card border-error">
        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
        <p className="m-0 font-medium text-error">{error}</p>
      </div>
    );
  }

  // Step 2: Quizzes List View for Selected Subject
  return (
    <div className="py-3 mx-auto md:p-6 max-w-7xl">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between mb-6 ml-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToSubjects}
            className="flex items-center justify-center p-2 rounded-lg btn btn-ghost hover:bg-muted"
            title="Back to subjects"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold tracking-tight">Maths Quizzes</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State Banner */}
      {quizzes.length === 0 ? (
        <div className="px-4 py-12 text-center border-dashed opacity-75 card">
          <p className="m-0 text-base font-medium">🎉 All caught up! No pending quizzes assigned for Maths.</p>
        </div>
      ) : (
        /* Quiz Grid Area */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="flex flex-col justify-between gap-5 transition-shadow card min-h-70 hover:shadow-md">
              {/* Card Header row */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="m-0 text-base font-bold leading-snug">{quiz.title}</h3>
                  <span className="flex items-center gap-1 badge badge-success shrink-0 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {quiz.duration} Mins
                  </span>
                </div>
                {quiz.description && <p className="mt-2 mb-0 text-sm leading-relaxed opacity-70 line-clamp-2">{quiz.description}</p>}
              </div>

              {/* Instructions Box layout */}
              {quiz.instructions && quiz.instructions.length > 0 && (
                <div className="p-3 text-xs border rounded-lg bg-muted border-border-muted">
                  <span className="font-bold block uppercase tracking-wider opacity-75 mb-1.5">Instructions:</span>
                  <div className="space-y-1">
                    {quiz.instructions.map((ins, index) => (
                      <p key={index} className="flex items-start gap-2 m-0 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="opacity-90">{ins}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta information strip footer */}
              <div className="flex items-center justify-between pt-4 mt-auto text-xs border-t border-border opacity-80">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <User className="w-5 h-5 -ml-1 text-primary" />
                    <span>
                      Instructor: <strong className="opacity-90">{quiz.createdBy?.name || "Teacher"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 opacity-70" />
                    <span>Date: {quiz.scheduleDate ? new Date(quiz.scheduleDate).toLocaleDateString() : "Immediate"}</span>
                  </div>
                </div>

                <Link
                  to={`/student-dashboard/quizzes/${quiz._id}`}
                  className="px-4 py-2 text-xs font-semibold tracking-wide no-underline shadow-sm btn btn-primary"
                >
                  Start Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SQuizzes;
