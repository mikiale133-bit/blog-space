import { API } from "@/api/Axios";
import React, { useEffect, useState } from "react";
import { Plus, ArrowLeft, BookOpen, Layers, List, Loader2, ChevronRight, FolderOpen, AlertCircle, CheckCircle } from "lucide-react";

const CreateChapters = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);

  const [modal, setModal] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newChapterName, setNewChapterName] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        const response = await API.get("/api/subjects");
        setSubjects(response.data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to load subjects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch subject chapters when a subject is selected
  useEffect(() => {
    if (!selectedSubject) return;

    const fetchChapters = async () => {
      setIsLoading(true);
      try {
        setError("");
        const response = await API.get(`/api/subjects/${selectedSubject}/chapters`);
        setChapters(response.data.chapters || []);
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setError("Failed to load chapters for this subject.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapters();
  }, [selectedSubject]);

  // Fetch chapter topics when a chapter is selected
  useEffect(() => {
    if (!selectedSubject || !selectedChapter) return;

    const fetchTopics = async () => {
      setIsLoading(true);
      try {
        setError("");
        const response = await API.get(`/api/chapters/${selectedChapter}/topics`);
        setTopics(response.data.topics || []);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics for this chapter.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [selectedSubject, selectedChapter]);

  // Handle creating a new chapter
  const handleCreateChapter = async (e) => {
    e.preventDefault();
    if (!newChapterName.trim()) {
      setError("Please enter a chapter name.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/api/chapters", {
        subjectId: selectedSubject,
        name: newChapterName.trim(),
      });
      setSuccess("Chapter created successfully!");
      setNewChapterName("");
      // Refresh chapters
      const response = await API.get(`/api/subjects/${selectedSubject}/chapters`);
      setChapters(response.data.chapters || []);
    } catch (err) {
      console.error("Error creating chapter:", err);
      setError(err.response?.data?.message || "Failed to create chapter.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle creating a new topic
  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) {
      setError("Please enter a topic name.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await API.post(`/api/chapters/${selectedChapter}/topics`, {
        chapterId: selectedChapter,
        name: newTopic.trim(),
      });
      setSuccess("Topic created successfully!");
      setNewTopic("");
      // Refresh topics
      const response = await API.get(`/api/subjects/${selectedSubject}/chapters/${selectedChapter}/topics`);
      setTopics(response.data.topics || []);
    } catch (err) {
      console.error("Error creating topic:", err);
      setError(err.response?.data?.message || "Failed to create topic.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError("");
    setSuccess("");
    if (modal === "create-chapter") {
      setSelectedSubject(null);
      setModal("select-subject");
    } else if (modal === "add-topic") {
      setSelectedChapter(null);
      setModal("create-chapter");
    }
  };

  const getSubjectName = () => {
    const subject = subjects.find((s) => s._id === selectedSubject);
    return subject?.name || "Subject";
  };

  const getChapterName = () => {
    const chapter = chapters.find((c) => c._id === selectedChapter);
    return chapter?.name || "Chapter";
  };

  console.log("Selected Subject: ", selectedSubject);
  console.log("Selected Chapter: ", selectedChapter);

  // Selected Subject:  6a5a2c1f57f7f7b34031adcb
  // Selected Chapter:  6a5c806767e246712417bc26

  //  Selected Subject:  6a5a2c1f57f7f7b34031adcb
  //  Selected Chapter:  6a5c807667e246712417bc2b

  if (modal === "select-subject") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Select a Subject</h1>
            </div>
            <p className="text-gray-500 mb-6 ml-11">Choose a subject to manage its chapters and topics</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-3 text-gray-600">Loading subjects...</span>
              </div>
            ) : subjects.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No subjects available</p>
                <p className="text-gray-400 text-sm">Contact your administrator to add subjects</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((sub) => (
                  <button
                    key={sub._id}
                    onClick={() => {
                      setSelectedSubject(sub._id);
                      setModal("create-chapter");
                    }}
                    className="group relative p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{sub.name}</h3>
                          <p className="text-sm text-gray-500">Manage chapters & topics</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (modal === "create-chapter") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Layers className="w-7 h-7 text-blue-600" />
                  Manage Chapters
                </h1>
                <p className="text-gray-500 text-sm">
                  {getSubjectName()} • {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"} total
                </p>
              </div>
            </div>

            {/* Success/Error messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Creation Form */}
            <form onSubmit={handleCreateChapter} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter new chapter name..."
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Chapter
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Chapters List */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-gray-500" />
                Existing Chapters
              </h3>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
              ) : chapters.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400">No chapters created yet</p>
                  <p className="text-gray-400 text-sm">Use the form above to add your first chapter</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chapters.map((cha) => (
                    <div
                      key={cha._id}
                      className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">{chapters.indexOf(cha) + 1}</span>
                        </div>
                        <span className="font-medium text-gray-800">{cha.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setModal("add-topic");
                          setSelectedChapter(cha._id);
                        }}
                        className="px-4 py-2 text-sm bg-white hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all border border-blue-200 hover:border-blue-600 flex items-center gap-2"
                      >
                        <Layers className="w-4 h-4" />
                        Manage Topics
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (modal === "add-topic") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">Manage Topics</h1>
                <p className="text-gray-500 text-sm">
                  {getSubjectName()} → {getChapterName()} • {topics.length} {topics.length === 1 ? "topic" : "topics"} total
                </p>
              </div>
            </div>

            {/* Success/Error messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Creation Form */}
            <form onSubmit={handleCreateTopic} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter new topic name..."
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Topic
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Topics List */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-gray-500" />
                Existing Topics
              </h3>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
              ) : topics.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400">No topics created yet</p>
                  <p className="text-gray-400 text-sm">Use the form above to add your first topic</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {topics.map((topic, index) => (
                    <div
                      key={topic._id}
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-blue-200"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-800">{topic.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial state - landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Content Management</h2>
          <p className="text-gray-500 mb-8">Create and organize chapters and topics for your subjects</p>

          <button
            onClick={() => setModal("select-subject")}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            Get Started
          </button>

          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Subjects
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Chapters
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Topics
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChapters;
