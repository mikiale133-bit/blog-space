import { API } from "@/api/Axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterStudent = () => {
  const [classes, setClasses] = React.useState([]);

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
      {/* Only classId, Needed */}
      <h2>Register As Student</h2>

      <form>
        <div className="mb-4">
          <label htmlFor="classId" className="block mb-1 font-medium">
            Class ID
          </label>
          <input type="text" id="classId" className="input p-2" placeholder="Enter class ID" />
        </div>
      </form>

      <h2 className="font-bold text-2xl my-4 mx-3">Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((c) => (
          <div key={c._id} className="p-3 border border-border bg-white dark:bg-background rounded-md">
            <Link to={`/my-classes/${c._id}`}>
              <h2>Section: {c.section}</h2>
              <h2 className="uppercase">{c.department}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterStudent;
