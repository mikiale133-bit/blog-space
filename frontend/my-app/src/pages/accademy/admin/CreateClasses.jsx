import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateClasses = () => {
  const [creating, setCreating] = useState(false);
  const [classes, setClasses] = useState([]);

  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");

  const createClass = async (e) => {
    e.preventDefault();

    setCreating(true);
    try {
      const res = await API.post("/api/classes", { department, section });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setCreating(false);
    }
  };

  // fetch Classes
  useEffect(() => {
    const getClasses = async () => {
      const res = await API.get("api/classes");
      setClasses(res.data.classes);
    };
    getClasses();
  }, []);
  return (
    <div className="max-w-4xl p-3 mx-auto bg-background">
      <h2 className="mx-3 my-4 text-2xl font-bold">Create Class</h2>

      <form onSubmit={createClass}>
        <input
          type="department"
          name="department"
          id="department"
          placeholder="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="block p-2 border"
        />

        <input
          type="section"
          name="section"
          id="section"
          placeholder="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="block p-2 my-2 border"
        />
        <button type="submit" disabled={creating} className="px-4 py-1 border">
          {creating ? "Creating..." : "Create Class"}
        </button>
      </form>

      <h2 className="mx-3 my-4 text-2xl font-bold">Classes</h2>
      {classes.map((c) => (
        <div key={c._id} className="p-3 mb-2 bg-white border rounded-md border-border dark:bg-background">
          <Link to={`/my-classes/${c._id}`}>
            <h2>Section: {c.section}</h2>
            <h2>{c.department}</h2>
          </Link>
          <p>{c._id}</p>
        </div>
      ))}
    </div>
  );
};

export default CreateClasses;
