import { API } from "@/api/Axios";
import AssessmentForm from "@/components/pages/AssessmentForm";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Quizzes = () => {
  const [modal, setModal] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [assessments, setAssessments] = useState([]);

  const [searchParams] = useSearchParams();
  const classId = searchParams?.get("class");

  // GET TEACHER
  useEffect(() => {
    try {
      const getTeacher = async () => {
        const res = await API.get(`/api/teachers/get-me`);
        setTeacher(res.data.teacher?._id || null);
      };
      getTeacher();
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching assessments");
    }
  }, [classId]);

  // Fetch assessments
  useEffect(() => {
    try {
      const getAssessments = async () => {
        const res = await API.get(`/api/classes/${classId}/assessments`);
        setAssessments(res.data.assessments || []);
        console.log(res.data);
      };
      getAssessments();
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching assessments");
    }
  }, [classId]);

  if (modal === "create-assessment") {
    return <AssessmentForm classId={classId} subjectId={teacher?.subject} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div>
        {assessments.map((ass) => (
          <div key={ass?._id} className="p-2 bg-white">
            <h2>{ass?.title}</h2>
          </div>
        ))}
        <button onClick={() => setModal("create-assessment")} className="px-5 py-3 text-white bg-teal-600">
          Create Assignment
        </button>
      </div>
    </div>
  );
};

export default Quizzes;
