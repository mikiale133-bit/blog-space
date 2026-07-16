import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RegisterStudent = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // fetch Classes
  useEffect(() => {
    const getClasses = async () => {
      const res = await API.get("api/classes");
      setClasses(res.data.classes);
    };
    getClasses();
  }, []);

  // Create teacher
  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(`/api/students`, {
        classId: selectedClass,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  // Get Students
  useEffect(() => {
    if (!selectedClass) return;
    const getTeacher = async () => {
      try {
        const res = await API.get(`/api/students/${selectedClass}`);
        setStudents(res.data.students);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, [selectedClass]);
  return (
    <div className="max-w-5xl mx-auto px-3 pt-10">
      <form onSubmit={register} className="p-3 border m-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((c) => (
            <div
              onClick={() => setSelectedClass(c._id)}
              key={c._id}
              className="p-3 border border-border bg-white dark:bg-background rounded-md flex justify-between items-center"
            >
              <div>
                <h2>{c.department}</h2>
                <p>{c.section}</p>
              </div>
              {selectedClass === c._id ? <h2>✓</h2> : ""}
            </div>
          ))}
        </div>
        <button type="submit" className="px-3 py-1 border m-3">
          Register
        </button>
      </form>

      <h2 className="font-bold text-2xl mb-3 mt-10">Is This Your Class</h2>
      {students.length === 0 ? (
        <h2>No students found for this class</h2>
      ) : (
        <div>
          {students?.map((s) => (
            <div key={s._id} className="card py-2">
              <Link to={`/teachers/${s._id}`}>
                <h2>Name: {s.accountId?.name}</h2>
                <h2>Email: {s.accountId?.email}</h2>
                <h2>Subject: {s.role}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisterStudent;
