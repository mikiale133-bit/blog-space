import { API } from "@/api/Axios";
import { Plus, X, Users, UserPlus, Trash2, Edit2, Check, ChevronRight, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClassDetails = () => {
  const [subjectModal, setSubjectModal] = useState(false);

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeClassId, setActiveClassId] = useState(null);

  // fetch classes
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await API.get("/api/classes");
        setClasses(res.data.classes || []);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);

  // fetch class subjects
  useEffect(() => {
    const getTeacher = async () => {
      if (!activeClassId) return;
      try {
        const res = await API.get(`/api/classes/${activeClassId}/subjects`);
        setSubjects(res.data.subjects || []);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, [activeClassId]);

  const createSubject = async () => {
    await API.post(`/api/classes/${activeClassId}/subjects`, {
      classId: activeClassId,
      name: "English",
    });
  };

  if (subjectModal) {
    return (
      <div className="flex h-150 justify-center items-center p-3">
        <div className="max-w-100 border border-border flex gap-3 items-center p-5">
          <button onClick={() => setSubjectModal(false)} className="btn btn-primary">
            Cancel
          </button>
          <button onClick={createSubject} className="btn btn-primary">
            Create Subject
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Class Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">ADMINISTRATOR</h1>
        <p className="ml-2">Assign Subject For Classes</p>
      </div>

      {/* Class Subjects */}
      <div className="card my-8">
        <header className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold mb-4">Class Subjects</h2>
          <button onClick={() => setSubjectModal(true)} className="btn btn-primary">
            Add Subject
          </button>
        </header>

        <div className="grid grid-cols-2">
          {classes.map((c) => (
            <div
              onClick={() => {
                setActiveClassId(c._id);
              }}
              key={c._id}
              className={`card m-2`}
            >
              <h2>{c.department}</h2>
              <h2>Section {c.section}</h2>
              {activeClassId === c._id && "✓"}
            </div>
          ))}
        </div>

        {subjects.length === 0 ? (
          <div>
            <h2>No subjects yet.</h2>
          </div>
        ) : (
          <div>
            {subjects.map((sub) => (
              <div key={sub._id}>
                <h2>{sub.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;
