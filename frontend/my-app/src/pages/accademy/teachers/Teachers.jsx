import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teachers = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);

  // fetch Classes
  useEffect(() => {
    const getClasses = async () => {
      const res = await API.get("api/classes");
      setClasses(res.data.classes);
    };
    getClasses();
  }, []);

  // fetch Subjects
  useEffect(() => {
    const getSubjects = async () => {
      const res = await API.get("api/subjects");
      setSubjects(res.data.subjects);
    };
    getSubjects();
  }, []);

  const toggleSellection = (classId) => {
    selectedClasses.includes(classId)
      ? setSelectedClasses(selectedClasses.filter((c) => c !== classId))
      : setSelectedClasses([...selectedClasses, classId]);
  };

  // Create teacher
  const registerTeacher = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/api/teachers`, {
        subjectId: selectedSubject,
        classes: selectedClasses,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-5xl px-3 pt-10 mx-auto">
      <form onSubmit={registerTeacher} className="p-3 m-3 border">
        <h2 className="mt-10 text-lg font-bold">Select your classes</h2>

        {subjects.map((sub) => (
          <div key={sub._id} className="flex items-center gap-2 ">
            <h2 onClick={() => setSelectedSubject(sub._id)}>{sub.name}</h2>
            {selectedSubject === sub._id && "✓"}
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3 my-3 space-y-3">
          {classes.map((c) => (
            <div
              key={c._id}
              onClick={() => {
                toggleSellection(c._id);
              }}
              className={`card flex justify-between items-center`}
            >
              <div>
                <h2>{c.department}</h2>
                <p>{c.section}</p>
              </div>
              {selectedClasses.includes(c._id) ? <h2>✓</h2> : ""}
            </div>
          ))}
        </div>
        <button type="submit" className="px-3 py-1 m-3 border">
          Register
        </button>
      </form>
    </div>
  );
};

export default Teachers;
