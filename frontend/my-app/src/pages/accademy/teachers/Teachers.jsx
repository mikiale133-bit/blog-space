import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [subject, setSubject] = useState("");

  // fetch Classes
  useEffect(() => {
    const getClasses = async () => {
      const res = await API.get("api/classes");
      setClasses(res.data.classes);
    };
    getClasses();
  }, []);

  const toggleSellection = (classId) => {
    selectedClasses.includes(classId)
      ? setSelectedClasses(selectedClasses.filter((c) => c !== classId))
      : setSelectedClasses([...selectedClasses, classId]);
  };

  // Create teacher
  const createTeacher = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/api/teachers`, {
        subject: subject,
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
    <div className="max-w-5xl mx-auto px-3 pt-10">
      <form onSubmit={createTeacher} className="p-3 border m-3">
        <select name="subject" id="subject" onChange={(e) => setSubject(e.target.value)} value={subject} className="border p-2">
          <option value="">Select Subject</option>
          <option value="maths">Maths</option>
          <option value="physics">Physics</option>
          <option value="biology">Biology</option>
          <option value="chemistry">Chemistry</option>
        </select>
        <h2 className="mt-10 text-lg font-bold">Select your classes</h2>
        <div className="space-y-3 my-3 grid grid-cols-2 gap-3">
          {classes.map((c) => (
            <div key={c._id} onClick={() => toggleSellection(c._id)} className={`card flex justify-between items-center`}>
              <div>
                <h2>{c.department}</h2>
                <p>{c.section}</p>
              </div>
              {selectedClasses.includes(c._id) ? <h2>✓</h2> : ""}
            </div>
          ))}
        </div>
        <button type="submit" className="px-3 py-1 border m-3">
          Register
        </button>
      </form>
      <h2 className="font-bold text-2xl mb-3 mt-10">Teachers from your Campus</h2>
      <div className="grid grid-cols-2 gap-3">
        {teachers?.map((t) => (
          <div key={t._id} className="card py-2">
            <Link to={`/teachers/${t._id}`}>
              <h2>Name: {t.accountId?.name}</h2>
              <h2>Email: {t.accountId?.email}</h2>
              <h2>Subject: {t.subject}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
