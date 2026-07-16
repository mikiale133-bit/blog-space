import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="p-5 flex gap-5 flex-wrap">
      <Link to={"/add-class"} className="p-2 px-5 border rounded-full">
        Create New Class
      </Link>
      <Link to={"/teachers"} className="p-2 px-5 border rounded-full">
        Register as teacher
      </Link>
      <Link to={"/students/register"} className="p-2 px-5 border rounded-full">
        Register as student
      </Link>
    </div>
  );
};

export default Community;
