import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

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

  const toggleSubject = (subId) => {
    selectedSubjects.includes(subId)
      ? setSelectedSubjects(selectedSubjects.filter((c) => c !== subId))
      : setSelectedSubjects([...selectedSubjects, subId]);
  };

  // Create teacher
  const registerTeacher = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/api/teachers`, {
        subjects: selectedSubjects,
        classes: selectedClasses,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await API.get("/api/teachers");

        setTeachers(res.data.teachers);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);

  return (
    <div className="max-w-5xl px-3 pt-10 mx-auto">
      <form onSubmit={registerTeacher} className="p-3 m-3 border">
        <h2 className="mt-10 text-lg font-bold">Select your classes</h2>

        {subjects.map((sub) => (
          <div key={sub._id} className="flex items-center gap-2 ">
            <h2 onClick={() => toggleSubject(sub._id)}>{sub.name}</h2>
            {selectedSubjects.includes(sub._id) && "✓"}
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
      <h2 className="mt-10 mb-3 text-2xl font-bold">Teachers from your Campus</h2>
      <div className="grid grid-cols-2 gap-3">
        {teachers?.map((t) => (
          <div key={t._id} className="py-2 card">
            <h2>Name: {t.accountId?.name}</h2>
            <h2>Email: {t.accountId?.email}</h2>
            <h2>Subject: {t.subject}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
