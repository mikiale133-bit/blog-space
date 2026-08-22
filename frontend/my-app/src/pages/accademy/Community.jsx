import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="max-w-5xl gap-5 p-5 mx-auto">
      <div className="mb-5 text-center">
        <h2>1.Teacher</h2>
        <h2>2.Student</h2>
      </div>
      <div className="flex flex-wrap gap-5">
        <Link to={"/add-class"} className="p-2 px-5 border rounded-full">
          Create New Class
        </Link>

        <Link to={"/teachers/register"} className="p-2 px-5 border rounded-full">
          Register as teacher
        </Link>

        <Link to={"/students/register"} className="p-2 px-5 border rounded-full">
          Register as student
        </Link>

        <Link to={"/create-subject"} className="p-2 px-5 border rounded-full">
          Create Subjects
        </Link>

        <Link to={"/create-chapters"} className="p-2 px-5 border rounded-full">
          Manage Subject
        </Link>
      </div>
    </div>
  );
};

export default Community;
