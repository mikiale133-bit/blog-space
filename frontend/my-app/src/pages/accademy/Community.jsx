import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="flex flex-wrap gap-5 p-5">
      <Link to={"/add-class"} className="p-2 px-5 border rounded-full">
        Create New Class
      </Link>

      <Link to={"/teachers"} className="p-2 px-5 border rounded-full">
        Register as teacher
      </Link>

      <Link to={"/students/register"} className="p-2 px-5 border rounded-full">
        Register as student
      </Link>

      <Link to={"/manage-class"} className="p-2 px-5 border rounded-full">
        Manage Class
      </Link>

      <Link to={"/assign-subject"} className="p-2 px-5 border rounded-full">
        Assign a subject for teachers
      </Link>

      <Link to={"/create-subject"} className="p-2 px-5 border rounded-full">
        Create Subjects
      </Link>

      <Link to={"/create-chapters"} className="p-2 px-5 border rounded-full">
        Manage Subject
      </Link>

      <Link to={"/create-topic"} className="p-2 px-5 border rounded-full">
        Create Topics
      </Link>

      <Link to={"/assign-roles"} className="p-2 px-5 border rounded-full">
        Change User Rols
      </Link>

      {/* <Link to={"/students/register"} className="p-2 px-5 border rounded-full"></Link> */}
    </div>
  );
};

export default Community;
