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
import ResourceForm from "./ResourceForm";

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
      <div className="flex flex-col bg-white border divide-y shadow-lg divide-border border-border min-w-50">
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
      <ResourceForm
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
        note={resource?.note}
        subjectId={subjectId}
        setUpdateModal={setUpdateModal}
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
          className="sticky top-0 flex items-center w-full gap-2 p-5 text-sm font-medium transition-colors bg-white text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Subjects
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-3 md:items-start md:flex-row h-160">
        {/* Left Sidebar: Chapters & Topics */}
        <aside className="self-start w-full ml-1 overflow-hidden bg-white shadow-sm md:min-w-80 md:max-w-80 md:sticky top-7 min-h-160 dark:bg-slate-900 rounded-xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 p-4 text-sm font-bold text-slate-900 dark:text-white">
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
                    <div className="pl-3 mt-2 ml-3 space-y-1 border-l border-slate-300 dark:border-slate-700">
                      {topics.length === 0 ? (
                        <p className="py-1 text-xs text-slate-400">No topics available</p>
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

        <div className="flex flex-col w-full gap-1 lg:flex-row h-160">
          {/* Right Main Content Panel */}
          <main className="flex-1 w-full h-full p-6 overflow-y-scroll bg-white border rounded-lg shadow-sm small-scrollbar dark:bg-slate-950 border-slate-200 dark:border-slate-800">
            <div className="rounded-2xl">
              {!currentTopic ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <LayoutGrid className="w-12 h-12 mb-3 stroke-1" />
                  <p>Select a topic from the sidebar to view resources.</p>
                </div>
              ) : loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Resource Metadata Header */}
                  <header className="flex flex-col justify-between gap-4 pb-5 border-b sm:flex-row sm:items-center border-slate-200 dark:border-slate-800">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{currentTopic.name}</h1>
                      <p className="mt-1 text-xs text-slate-400">
                        Updated: {currentTopic.updatedAt ? new Date(currentTopic.updatedAt).toLocaleDateString() : "Recent"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <button className="flex gap-1.5 items-center hover:text-rose-600 transition-colors">
                        <Heart className="w-4 h-4" /> {currentTopic.num_likes || 0}
                      </button>
                      <button className="flex gap-1.5 items-center hover:text-indigo-600 transition-colors">
                        <Bookmark className="w-4 h-4" /> Save
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>

                      <div className="p-1.5 relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                        <EllipsisVertical onClick={() => setPopup(!popup)} className="w-4 h-4" />

                        {popup && (
                          <div className="absolute right-0 mt-2 top-full">
                            <PopupModal />
                          </div>
                        )}
                      </div>
                    </div>
                  </header>

                  {resource === null ? (
                    <div className="flex flex-col items-center justify-center">
                      <h2>No Resource</h2>
                      <div onClick={() => setUploadModal(true)} className="flex items-center gap-2 mt-4 btn btn-primary">
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
                                <div className="text-sm font-semibold border-b text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800">
                                  {video.title}
                                </div>
                                <div className="p-3 border bg-slate-100">
                                  <div className="mx-auto border max-h-80 aspect-video">
                                    <video src={video.url && video.url} controls className="w-full h-auto aspect-video dark:bg-black" />
                                  </div>
                                </div>

                                <h2 className="p-3 mt-5">
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
                        <div className="pt-6 prose border-t prose-slate dark:prose-invert max-w-none border-slate-100 dark:border-slate-800">
                          <div
                            className="prose max-w-none dark:prose-invert [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic"
                            dangerouslySetInnerHTML={{ __html: resource.note }}
                          />
                        </div>
                      )}

                      {/* Quizzes Section */}
                      {quizzes.length > 0 && (
                        <div className="pt-6 space-y-4 border-t border-slate-100 dark:border-slate-800">
                          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Practice Quizzes</h2>
                          {quizzes.map((quiz, i) => (
                            <div key={i} className="p-4 border rounded-lg border-slate-200 dark:border-slate-800">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{quiz.title}</h3>
                              <p className="text-xs text-slate-400 mt-0.5">{quiz.questions?.length || 0} Questions</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Discussions Forum Section */}
                      <div className="pt-6 mt-3 space-y-4 border-t border-slate-100 dark:border-slate-800">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200">
                          <MessageSquare className="w-5 h-5 text-indigo-500" /> Q&A Discussion
                        </h2>

                        <div className="pr-2 space-y-3 overflow-y-auto max-h-80">
                          {discussions.map((disc) => (
                            <div key={disc._id} className="flex gap-3 p-3 text-sm rounded-lg bg-slate-50 dark:bg-slate-950">
                              <img
                                src={disc.sender?.accountId?.profile_pic?.url || "/placeholder-avatar.png"}
                                alt="Profile"
                                className="object-cover w-8 h-8 rounded-full bg-slate-200"
                              />
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                  {disc.sender?.accountId?.name || "Anonymous User"}
                                </h4>
                                <p className="mt-1 text-slate-600 dark:text-slate-400">{disc.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* New Comment Text Box Input */}
                        <div className="flex items-end gap-2 p-2 border rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Ask a question or share your thoughts..."
                            className="flex-1 px-2 py-1 text-sm bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
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
                      <div className="flex items-center justify-between gap-2 p-4 mt-10">
                        <button className="px-3 py-1.5 border hover:shadow-lg hover:underline flex gap-2 items-center">
                          <ArrowLeftSquare size={15} />
                          Previous Session
                        </button>
                        <div className="flex items-center gap-2">
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

          <aside className="sticky bottom-0 w-full bg-white border-t lg:top-15 border-border dark:bg-slate-900 h-25 lg:min-h-160 lg:w-30">
            <div className="flex items-center w-full h-full gap-3 p-5 lg:flex-col">
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
