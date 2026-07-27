import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, User, Calendar, CheckCircle2, AlertCircle, ArrowLeft, ChevronRight } from "lucide-react";

const SQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectionMode, setSelectionMode] = useState(true);

  const classId = student?.classId;

  console.log(classId);

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

  // FETCH SUBJECTS TO SELECT ONE
  useEffect(() => {
    const getSubjects = async () => {
      try {
        setIsLoading(true);
        const res = await API.get(`/api/subjects`);
        setSubjects(res.data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to load subjects.");
      } finally {
        setIsLoading(false);
      }
    };
    getSubjects();
  }, []);

  // FETCH CLASS QUIZZES FOR A SUBJECT
  useEffect(() => {
    if (!classId || !selectedSubject?._id) return;

    const getQuizzes = async () => {
      try {
        setIsLoading(true);
        const res = await API.get(`/api/classes/${classId}/quizzes/${selectedSubject._id}`);

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
  }, [classId, selectedSubject]);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSelectionMode(false);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setQuizzes([]);
    setSelectionMode(true);
  };

  // Loading State
  if (isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center opacity-80 min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-sm font-medium tracking-wide">Loading assignment schedules...</p>
      </div>
    );
  }

  // Error Banner State
  if (error) {
    return (
      <div className="card max-w-lg mx-auto my-8 border-l-4 border-error flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
        <p className="text-error font-medium m-0">{error}</p>
      </div>
    );
  }

  // Step 1: Subject Selection View
  if (selectionMode) {
    return (
      <div className="py-3 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6 ml-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold tracking-tight">Select Subject</h2>
        </div>

        {subjects.length === 0 ? (
          <div className="card text-center py-12 px-4 opacity-75 border-dashed">
            <p className="text-base font-medium m-0">No subjects available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((sub) => (
              <div
                key={sub._id}
                onClick={() => handleSelectSubject(sub)}
                className="card p-5 cursor-pointer flex items-center justify-between transition-all hover:shadow-md border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold m-0">{sub.name}</h3>
                    {sub.code && <span className="text-xs opacity-60">{sub.code}</span>}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Step 2: Quizzes List View for Selected Subject
  return (
    <div className="py-3 md:p-6 max-w-7xl mx-auto">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between mb-6 ml-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToSubjects}
            className="btn btn-ghost p-2 hover:bg-muted rounded-lg flex items-center justify-center"
            title="Back to subjects"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold tracking-tight">{selectedSubject?.name} Quizzes</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State Banner */}
      {quizzes.length === 0 ? (
        <div className="card text-center py-12 px-4 opacity-75 border-dashed">
          <p className="text-base font-medium m-0">🎉 All caught up! No pending quizzes assigned for {selectedSubject?.name}.</p>
        </div>
      ) : (
        /* Quiz Grid Area */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="card flex flex-col justify-between gap-5 min-h-70 hover:shadow-md transition-shadow">
              {/* Card Header row */}
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-base font-bold m-0 leading-snug">{quiz.title}</h3>
                  <span className="badge badge-success flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {quiz.duration} Mins
                  </span>
                </div>
                {quiz.description && <p className="text-sm opacity-70 mt-2 mb-0 line-clamp-2 leading-relaxed">{quiz.description}</p>}
              </div>

              {/* Instructions Box layout */}
              {quiz.instructions && quiz.instructions.length > 0 && (
                <div className="bg-muted p-3 rounded-lg text-xs border border-border-muted">
                  <span className="font-bold block uppercase tracking-wider opacity-75 mb-1.5">Instructions:</span>
                  <div className="space-y-1">
                    {quiz.instructions.map((ins, index) => (
                      <p key={index} className="m-0 flex items-start gap-2 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="opacity-90">{ins}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta information strip footer */}
              <div className="border-t border-border pt-4 mt-auto flex justify-between items-center text-xs opacity-80">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <User className="w-5 h-5 text-primary -ml-1" />
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
                  className="btn btn-primary no-underline px-4 py-2 text-xs font-semibold shadow-sm tracking-wide"
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
