import { API } from "@/api/Axios";
import DocumentViewer from "@/components/pages/DocumentViewer";
import { BookOpen, Dot, X, Eye, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const chapters = [
  {
    id: 1,
    name: "Electromagnetism",
    chapNo: 1,
  },
  {
    id: 2,
    name: "Thermodynamics",
    chapNo: 2,
  },
  {
    id: 3,
    name: "Mechanics",
    chapNo: 3,
  },
];

const subjects = [
  {
    id: 1,
    name: "Physics",
    chapters: 5,
  },
  {
    id: 2,
    name: "Maths",
    chapNo: 2,
    chapters: 4,
  },
  {
    id: 3,
    name: "English",
    chapters: 6,
  },
];

const SResources = () => {
  const [resources, setResources] = useState([]);
  const [student, setStudent] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [tab, setTab] = useState("note");
  const [loading, setLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState("subject");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState({});

  // FETCH STUDENT
  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await API.get(`/api/students/get-me`);
        setStudent(res.data.student || {});
      } catch (err) {
        console.error("Error fetching student profile:", err);
      }
    };
    getStudent();
  }, []);

  // Fetch resources
  const id = student?.classId;
  useEffect(() => {
    if (!id) return;
    const getResources = async () => {
      setLoading(true);
      try {
        const res = await API.post(`/api/classes/${id}/resources/by-type`, { type: tab });
        setResources(res.data.resources || []);
        console.log("RES: ", res.data.resources);
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching resources");
      } finally {
        setLoading(false);
      }
    };
    getResources();
  }, [id, tab]);

  if (selectedResource) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg w-full  flex flex-col overflow-hidden">
          <div className="p-3 flex justify-between items-center bg-gray-200">
            <span className="font-bold text-gray-800">Viewing: {selectedResource.title}</span>
            <button onClick={() => setSelectedResource(null)} className="p-1 rounded-full hover:bg-gray-200 transition text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="bg-gray-100">
            {/* Pass BOTH the URL and the original file name */}
            <DocumentViewer url={selectedResource?.fileUrl?.url} originalName={selectedResource?.fileMetadata?.originalName} />
          </div>
        </div>
      </div>
    );
  }

  if (selectionMode === "subject") {
    return (
      <div className="max-h-screen h-[90vh] overflow-hidden flex flex-col justify-center items-center">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            onClick={() => {
              setSelectionMode("chapter");
              setSelectedSubject(sub.name);
            }}
            className="max-w-100 w-full card my-1 cursor-pointer"
          >
            <h2>{sub.name}</h2>
            <p>{sub.chapters} Chapters</p>
          </div>
        ))}
      </div>
    );
  }

  if (selectionMode === "chapter") {
    return (
      <div className="max-h-screen h-[90vh] overflow-hidden flex flex-col justify-center items-center">
        {chapters.map((cha) => (
          <div
            key={cha.id}
            onClick={() => {
              setSelectionMode("");
              setSelectedChapter({ cha: cha.chapNo, name: cha.name });
            }}
            className="max-w-100 w-full card my-1 cursor-pointer"
          >
            <h2>Chapter {cha.chapNo}</h2>
            <p>{cha.name}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Materials List Section */}
      <div className="mt-8">
        <header className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-1">
            Maths Uploads <Dot /> {resources.length} found
          </h2>
        </header>

        <h2 className="font-semibold tex-lg mb-3">
          {selectedSubject}, Chapter {selectedChapter.cha}, {selectedChapter.name} Uploads 🔦
        </h2>
        {/* Tabs */}
        <div className="flex gap-3 items-center card mb-3">
          <button onClick={() => setTab("note")}>Notes</button>
          <button onClick={() => setTab("video")}>Videos</button>
          <button onClick={() => setTab("document")}>Document</button>
          <button onClick={() => setTab("image")}>Images</button>
        </div>

        {resources.length === 0 ? (
          <div className="card">
            <div className="flex flex-col items-center justify-center p-5 text-gray-500">
              <BookOpen size={40} />
              <h2 className="text-lg font-semibold italic mt-2">No {tab}s yet !</h2>
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col gap-2 justify-center items-center min-h-50">
            <Loader className="animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resources
              .filter((res) => res.resourceType === tab)
              .map((res) => (
                <div key={res._id} className="card bg-muted p-4 rounded flex justify-between items-center border">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">Title: {res.title}</h3>
                    <p className="text-sm text-foreground/80">Des: {res.description}</p>
                    <p className="text-sm text-foreground/80">Topic: {res.topic}</p>

                    {res.resourceType === "image" && (
                      <div className="mt-2">
                        <img src={res?.fileUrl?.url} alt="img" className="w-full h-full max-h-40 object-contain rounded" />
                      </div>
                    )}

                    {res.resourceType === "video" && (
                      <div className="mt-2">
                        <video width="640" controls>
                          <source src={res?.fileUrl?.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Document Trigger Button */}
                    {res.resourceType === "document" && (
                      <button
                        onClick={() => setSelectedResource(res)} // Pass the whole resource object
                        className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded text-sm transition"
                      >
                        <Eye size={16} /> View Document
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SResources;
