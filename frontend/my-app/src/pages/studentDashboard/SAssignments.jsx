import { API } from "@/api/Axios";
import { BookOpen, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SAssignments = () => {
  const [assessments, setAssessments] = useState([]);
  const [student, setStudent] = useState([]);

  // FETCH STUDENT
  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await API.get(`/api/students/get-me`);
        setStudent(res.data.student || {});
      } catch (err) {
        console.error("Error fetching student profile:", err);
      }
    };
    getStudent();
  }, []);

  // Fetch assessments

  useEffect(() => {
    if (!student?.classId) return;
    try {
      const getAssessments = async () => {
        const res = await API.get(`/api/classes/${student?.classId}/assessments`);
        setAssessments(res.data.assessments || []);
        console.log(res.data);
      };
      getAssessments();
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching assessments");
    }
  }, [student?.classId]);

  return (
    <div>
      {/* Assessments section */}
      <div className="card mt-8">
        <header className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold mb-4">ASSESSMENTS</h2>
          <button className="btn btn-primary">Add Assignment</button>
        </header>

        {assessments.length === 0 ? (
          <div className="card">
            <div className="flex flex-col gap- items-center justify-center p-5 text-gray-500">
              <BookOpen size={40} className="" />
              <h2 className="text-lg font-semibold italic">No quizzes yet !</h2>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((ass) => (
              <Link to={`/student-dashboard/assessments/${ass._id}`} key={ass._id} className="bg-muted p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{ass.title}</h3>
                  <p className="text-sm text-foreground/80">{ass.description}</p>
                </div>
                <div>
                  <X />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SAssignments;
