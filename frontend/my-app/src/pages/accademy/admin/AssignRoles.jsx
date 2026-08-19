import { API } from "@/api/Axios";
import React, { useState } from "react";

const AssignRoles = () => {
  const [role, setRole] = useState("");

  const handleSubmit = async () => {
    const res = await API.post(`/api/users/change-role`, { role });
  };

  return (
    <div className="max-w-4xl px-2 py-4 mx-auto">
      <button
        onClick={() => {
          setRole("admin");
          handleSubmit();
        }}
        className="px-4 py-1 border rounded-full"
      >
        As Admin
      </button>
      <button
        onClick={() => {
          setRole("teacher");
          handleSubmit();
        }}
        className="px-4 py-1 border rounded-full"
      >
        As Teacher
      </button>
    </div>
  );
};

export default AssignRoles;
