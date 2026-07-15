import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateClasses = () => {
  const [creating, setCreating] = useState(false);
  const [classes, setClasses] = useState([]);

  const createClass = async () => {
    setCreating(true);
    try {
      const res = await API.post("/api/classes", { department: "freshman, pre_engineer", section: "5" });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Error");
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
    <div className="p-3 max-w-4xl mx-auto bg-background">
      <h2 className="font-bold text-2xl my-4 mx-3">Create Class</h2>

      <button disabled={creating} onClick={createClass} className="border px-4 py-1">
        {creating ? "Creating..." : "Create Class"}
      </button>

      <h2 className="font-bold text-2xl my-4 mx-3">Classes</h2>
      {classes.map((c) => (
        <div key={c._id} className="p-3 border border-border bg-white dark:bg-background rounded-md">
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
