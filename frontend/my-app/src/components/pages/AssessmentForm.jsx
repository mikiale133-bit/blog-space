import { API } from "@/api/Axios";

const AssessmentForm = ({ classId }) => {
  const createAssessment = async () => {
    const res = await API.post(`/api/classes/${classId}/assessments`, {
      classId,
      title: "Assessment Title 1",
      description: "Assessment Description 1",
      tags: ["Tag 1", "Tag 2"],
      instructions: ["Ins 1", "Ins 2"],
      content: "Assessment Content 1",
      dueDate: "12, july, 2026",
    });

    alert("Success: ", res.data.message);
  };
  return (
    <div>
      <button onClick={createAssessment}>Create Assignment</button>

      {/* 
      
      Group Ass: 
      
      */}
    </div>
  );
};

export default AssessmentForm;
