import { API } from "@/api/Axios";
import {
  Bookmark,
  Heart,
  LayoutGrid,
  Share2,
  ArrowLeft,
  MessageSquare,
  Upload,
  ChevronDown,
  Text,
  DownloadCloud,
  NotebookPen,
  X,
  Circle,
  ArrowLeftSquare,
  ArrowRight,
  EllipsisVertical,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import UpdateResource from "./UpdateResource";
import { Link, useNavigate, useParams } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [popup, setPopup] = useState(false);

  const [uploadModal, setUploadModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // Selection States

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  // Data States
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resource, setResource] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Chapters when subject changes
  useEffect(() => {
    if (!subjectId) return;
    const getChapters = async () => {
      try {
        const res = await API.get(`/api/subjects/${subjectId}/chapters`);
        setChapters(res.data.chapters || []);

        // Reset  selections
        setSelectedChapter(null);
        setTopics([]);
        setCurrentTopic(null);
        setResource(null);
      } catch (err) {
        console.error("Error fetching chapters:", err);
      }
    };
    getChapters();
  }, [subjectId]);

  // Fetch Topics when chapter selected
  useEffect(() => {
    if (!selectedChapter) return;
    const getTopics = async () => {
      try {
        const res = await API.get(`/api/topics/${selectedChapter}`);
        setTopics(res.data.topics || []);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };
    getTopics();
  }, [selectedChapter]);

  // Fetch Resource when topic is selected
  useEffect(() => {
    if (!currentTopic?._id) return;
    const getResourceData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/resources/${currentTopic._id}`);
        setResource(res.data.resource || null);
        // If your API returns quizzes/discussions with the resource, set them here:
        setQuizzes(res.data.quizzes || []);
        setDiscussions(res.data.discussions || []);

        console.log("RESOURCE: ", res.data);
      } catch (err) {
        console.error("Error fetching resource:", err);
      } finally {
        setLoading(false);
      }
    };
    getResourceData();
  }, [currentTopic]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    // Add your API logic here to save comment
    setNewComment("");
  };

  const PopupModal = () => {
    return (
      <div className="flex divide-y divide-border flex-col bg-white shadow-lg border border-border min-w-50">
        <button onClick={() => setUpdateModal(true)} className="p-2 text-start hover:bg-muted">
          Update
        </button>
        <button className="p-2 text-start hover:bg-muted">Delete</button>
        <button className="p-2 text-start hover:bg-muted">Unpublish</button>
      </div>
    );
  };

  if (uploadModal) {
    return (
      <uploadModal
        topicId={currentTopic._id}
        chapterId={selectedChapter}
        // note={resource.note}
        subjectId={subjectId}
        setUploadModal={setUploadModal}
      />
    );
  }

  if (updateModal) {
    return (
      <UpdateResource
        topicId={currentTopic._id}
        chapterId={selectedChapter}
        note={resource.note}
        subjectId={subjectId}
        setUploadModal={setUploadModal}
      />
    );
  }
  // --- VIEW 2: SYLLABUS & CONTENT EXPLORER ---
  return (
    <div className="mx-auto">
      {/* Back Header Nav */}

      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex w-full bg-white sticky top-0 p-5 items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Subjects
        </button>
      </div>

      <div className="flex flex-col md:items-start mt-3 md:flex-row gap-2 h-160">
        {/* Left Sidebar: Chapters & Topics */}
        <aside className="w-full ml-1 md:min-w-80 md:max-w-80 md:sticky top-7 bg-white min-h-160 dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm self-start">
          <div className="flex justify-between items-center  border-b border-slate-200 dark:border-slate-800">
            <div className="p-4 flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <LayoutGrid className="w-4 h-4 text-indigo-600" />
              Syllabus Explorer
            </div>

            <X size={18} className="mr-3 text-gray-600 cursor-pointer" />
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {chapters.map((cha) => {
              const isChapterSelected = selectedChapter === cha._id;
              return (
                <div key={cha._id} className="p-2">
                  <h3
                    onClick={() => setSelectedChapter(cha._id)}
                    className={`text-sm font-semibold cursor-pointer p-2 transition-colors flex justify-between items-center ${
                      isChapterSelected ? "bg-blue-00" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cha.name}{" "}
                    <ChevronDown
                      size={18}
                      className={`${isChapterSelected ? "rotate-180 transition-all duration-300" : "transition-all duration-300"}`}
                    />
                  </h3>

                  {/* Render topics only underneath the actively selected chapter */}
                  {isChapterSelected && (
                    <div className="mt-2 ml-3 pl-3 border-l border-slate-300 dark:border-slate-700 space-y-1">
                      {topics.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">No topics available</p>
                      ) : (
                        topics.map((topic) => (
                          <button
                            key={topic._id}
                            onClick={() => setCurrentTopic(topic)}
                            className={`w-full flex gap-2 items-center text-left text-xs py-3 px-2 rounded transition-colors truncate ${
                              currentTopic?._id === topic._id
                                ? "bg-indigo-50 font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <Circle size={13} /> {topic.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <div className="flex gap-1 flex-col lg:flex-row w-full h-160">
          {/* Right Main Content Panel */}
          <main className="overflow-y-scroll small-scrollbar w-full h-full flex-1 bg-white rounded-lg dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="rounded-2xl">
              {!currentTopic ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <LayoutGrid className="w-12 h-12 mb-3 stroke-1" />
                  <p>Select a topic from the sidebar to view resources.</p>
                </div>
              ) : loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Resource Metadata Header */}
                  <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{currentTopic.name}</h1>
                      <p className="text-xs text-slate-400 mt-1">
                        Updated: {currentTopic.updatedAt ? new Date(currentTopic.updatedAt).toLocaleDateString() : "Recent"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                      <button className="flex gap-1.5 items-center hover:text-rose-600 transition-colors">
                        <Heart className="w-4 h-4" /> {currentTopic.num_likes || 0}
                      </button>
                      <button className="flex gap-1.5 items-center hover:text-indigo-600 transition-colors">
                        <Bookmark className="w-4 h-4" /> Save
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button className="p-1.5 relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                        <EllipsisVertical onClick={() => setPopup(!popup)} className="w-4 h-4" />

                        {popup && (
                          <div className="absolute top-full mt-2 right-0">
                            <PopupModal />
                          </div>
                        )}
                      </button>
                    </div>
                  </header>

                  {resource === null ? (
                    <div className="flex flex-col justify-center items-center">
                      <h2>No Resource</h2>
                      <div onClick={() => setUploadModal(true)} className="flex mt-4 btn btn-primary gap-2 items-center">
                        <Upload size={18} /> Upload One
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Video Content Section */}
                      {resource?.videos && resource.videos.length > 0 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Video Tutorials</h2>
                          <div className="">
                            {resource.videos.map((video, i) => (
                              <div key={i} className="w-full">
                                <div className="font-semibold text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                                  {video.title}
                                </div>
                                <div className="p-3 bg-slate-100 border">
                                  <div className="max-h-80 aspect-video mx-auto border">
                                    <video src={video.url && video.url} controls className="w-full h-auto aspect-video dark:bg-black" />
                                  </div>
                                </div>

                                <h2 className="mt-5 p-3">
                                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br /> Vitae maxime dolores veniam ipsum necessitatibus ut
                                  id libero ipsam laudantium earum ea, rerum doloremque accusantium, sapiente impedit error quibusdam a aliquam
                                  adipisci excepturi. <br /> Possimus cupiditate deleniti nostrum ad magni. Quaerat expedita eligendi vero praesentium
                                  sequi tempora ipsa vitae eum animi facere.
                                </h2>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rich Text Markdown Content Section */}
                      {resource?.note && (
                        <div className="prose prose-slate dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-800 pt-6">
                          <div
                            className="prose max-w-none dark:prose-invert [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic"
                            dangerouslySetInnerHTML={{ __html: resource.note }}
                          />
                        </div>
                      )}

                      {/* Quizzes Section */}
                      {quizzes.length > 0 && (
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Practice Quizzes</h2>
                          {quizzes.map((quiz, i) => (
                            <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{quiz.title}</h3>
                              <p className="text-xs text-slate-400 mt-0.5">{quiz.questions?.length || 0} Questions</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Discussions Forum Section */}
                      <div className="border-t mt-3 border-slate-100 dark:border-slate-800 pt-6 space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                          <MessageSquare className="w-5 h-5 text-indigo-500" /> Q&A Discussion
                        </h2>

                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                          {discussions.map((disc) => (
                            <div key={disc._id} className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg text-sm">
                              <img
                                src={disc.sender?.accountId?.profile_pic?.url || "/placeholder-avatar.png"}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover bg-slate-200"
                              />
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                  {disc.sender?.accountId?.name || "Anonymous User"}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{disc.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* New Comment Text Box Input */}
                        <div className="flex gap-2 items-end border border-slate-200 dark:border-slate-800 rounded-lg p-2 bg-slate-50 dark:bg-slate-950">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Ask a question or share your thoughts..."
                            className="flex-1 bg-transparent border-none text-sm outline-none px-2 py-1 text-slate-800 dark:text-slate-200 placeholder-slate-400"
                          />
                          <button
                            onClick={handlePostComment}
                            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-sm transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex gap-2 items-center justify-between p-4 mt-10">
                        <button className="px-3 py-1.5 border hover:shadow-lg hover:underline flex gap-2 items-center">
                          <ArrowLeftSquare size={15} />
                          Previous Session
                        </button>
                        <div className="flex gap-2 items-center">
                          <button className="btn btn-primary">Mark as completed</button>
                          <button className="px-3 py-1.5 border shadow-lg hover:underline hover:bg-slate-300 flex gap-2 items-center transition-all duration-300">
                            <span>Next session</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>

          <aside className="bg-white sticky bottom-0 lg:top-15 border-t border-border dark:bg-slate-900 h-25 w-full lg:min-h-160 lg:w-30">
            <div className="w-full h-full flex lg:flex-col gap-3 items-center p-5">
              <Text />
              <DownloadCloud />
              <NotebookPen />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Resources;
