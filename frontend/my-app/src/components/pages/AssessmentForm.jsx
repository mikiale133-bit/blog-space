import { API } from "@/api/Axios";

const AssessmentForm = ({ classId, subjectId }) => {
  const createAssessment = async () => {
    try {
      const res = await API.post(`/api/classes/${classId}/assessments`, {
        classId,
        subjectId,
        title: "Assessment Title 1",
        description: "Assessment Description 1",
        tags: ["Tag 1", "Tag 2"],
        instructions: ["Ins 1", "Ins 2"],
        content: "Assessment Content 1",
        dueDate: "12, july, 2026",
      });

      alert("Success: ", res.data.message);
      console.log(res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={createAssessment} className="btn btn-primary m-3">
        Create Assignment
      </button>

      {/* Group Ass: */}
    </div>
  );
};

export default AssessmentForm;
