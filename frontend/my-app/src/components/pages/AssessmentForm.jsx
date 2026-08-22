import { API } from "@/api/Axios";

const AssessmentForm = ({ classId, subjectId }) => {
  const createAssessment = async () => {
    try {
      const res = await API.post(`/api/classes/assessments`, {
        classId,
        subjectId,
        title: "Chemistry: Arhenius Acid-Base Definitions",
        tags: ["Tag 1", "Tag 2"],
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil atque tempora ipsa odio architecto porro. Eligendi labore quibusdam, incidunt at quod saepe. Quo deleniti, laboriosam omnis temporibus voluptas, id illo pariatur unde harum modi eos facilis suscipit numquam, dolor eligendi maxime similique quam consectetur? Optio magnam ullam eos illum exercitationem nesciunt adipisci quidem nam ipsa nobis culpa odit dolor veniam nisi fugit voluptas, similique vel ex ea delectus? Nemo esse reprehenderit qui nesciunt assumenda at vero eos quae sint ipsa quibusdam quos tenetur, dolorem ullam sequi voluptatem animi rem expedita dolorum aliquid explicabo autem fugiat! Dolore quaerat dolorum expedita officia?",
        dueDate: "12, july, 2026",
      });

      alert("Success: ", res.data.message);
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      <button onClick={createAssessment} className="m-3 btn btn-primary">
        Create Assignment
      </button>

      {/* Group Ass: */}
    </div>
  );
};

export default AssessmentForm;
