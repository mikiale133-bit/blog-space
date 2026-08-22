import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chapters = () => {
  const { subjectId } = useParams();

  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const fetchChapters = async () => {
      const res = API.get(`/api/subjects/${subjectId}/chapters`);
      setChapters((await res).data.chapters || []);
    };
    fetchChapters();
  }, [subjectId]);
  return (
    <div className="max-w-5xl py-3 mx-auto">
      <div>
        {chapters.map((cha) => (
          <div key={cha._id}>
            <h2>{cha.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
