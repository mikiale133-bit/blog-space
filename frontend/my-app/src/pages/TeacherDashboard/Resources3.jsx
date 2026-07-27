import React, { useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  BookOpenText,
  HelpCircle,
  MessageSquare,
  Heart,
  Bookmark,
  Share2,
  CheckCircle2,
  CornerDownRight,
  ChevronRight,
  ChevronDown,
  Calendar,
  LayoutGrid,
} from "lucide-react";

// Sidebar Navigation Tree Structure (Maths Core)
const SYLLABUS_SIDEBAR = [
  {
    id: "ch-1",
    title: "Chapter 1: Trigonometry",
    topics: [
      { id: "tp-1-1", title: "Topic 1.1: The Sine Rule" },
      { id: "tp-1-2", title: "Topic 1.2: The Cosine Rule" },
      { id: "tp-1-3", title: "Topic 1.3: 3D Vectors" },
    ],
  },
  {
    id: "ch-2",
    title: "Chapter 2: Functions",
    topics: [
      { id: "tp-2-1", title: "Topic 2.1: Quadratics" },
      { id: "tp-2-2", title: "Topic 2.2: Inverses" },
    ],
  },
];

// Rich Multi-Format Blog Content (Mocked specifically for Topic 1.1)
const TOPIC_DETAILS_DATA = {
  subject: "Grade 10 Mathematics",
  chapter: "Chapter 1: Trigonometry",
  topicName: "Topic 1.1: The Sine Rule & The Ambiguous Case",
  lastUpdated: "July 15, 2026",
  stats: { likes: 142, saves: 88 },

  videoIntro: {
    title: "Understanding the Law of Sines Visually",
    duration: "12:45 mins",
    fileName: "sine_rule_visual_intro.mp4",
  },

  textNotes: `The Law of Sines establishes a core proportional relationship between the sides of a triangle and the sines of its opposite angles: a/sin(A) = b/sin(B) = c/sin(C). 
  
  However, when managing the 'Ambiguous Case' (Side-Side-Angle configuration), if given two sides and a non-included acute angle, there are three potential outcomes: zero triangles exist, exactly one right triangle exists, or two distinct valid triangles can be formed simultaneously.`,

  documents: [
    { id: "doc-1", name: "Ambiguous_Case_Proof_Steps.pdf", size: "2.4 MB" },
    { id: "doc-2", name: "Classwork_Trig_Identities_Sheet.docx", size: "840 KB" },
  ],

  quiz: {
    question: "If angle A = 30°, side a = 6, and side b = 8 in an SSA configuration, how many distinct triangles can be formed?",
    options: ["Zero triangles", "Exactly one triangle", "Two distinct triangles", "Infinite loops"],
    correctIndex: 2,
  },

  discussions: [
    {
      id: "c1",
      author: "Marcus Vance (Student)",
      timestamp: "2 days ago",
      text: "On page 2 of the PDF handout, why does the vector flip orientation when checking the obtuse angle boundary?",
      replies: [{ id: "r1", author: "You (Teacher)", text: "Excellent catch, Marcus. That occurs because sin(180 - x) = sin(x)." }],
    },
  ],
};

export default function Resources3() {
  const [activeTopic, setActiveTopic] = useState("tp-1-1");
  const [expandedChapters, setExpandedChapters] = useState({ "ch-1": true, "ch-2": false });
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [discussionFeed, setDiscussionFeed] = useState(TOPIC_DETAILS_DATA.discussions);
  const [newCommentText, setNewCommentText] = useState("");

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleChapter = (id) => {
    setExpandedChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setDiscussionFeed([
      ...discussionFeed,
      {
        id: Date.now().toString(),
        author: "You (Teacher)",
        timestamp: "Just now",
        text: newCommentText,
        replies: [],
      },
    ]);
    setNewCommentText("");
  };

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. LEFT SIDEBAR NAVIGATOR */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2 text-slate-900 font-black text-sm">
          <LayoutGrid className="w-4 h-4 text-indigo-600" /> Syllabus Content Explorer
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {SYLLABUS_SIDEBAR.map((chapter) => (
            <div key={chapter.id} className="space-y-1">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-left font-bold text-xs text-slate-700"
              >
                <span className="truncate pr-1">{chapter.title}</span>
                {expandedChapters[chapter.id] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {expandedChapters[chapter.id] && (
                <div className="pl-3 border-l border-slate-100 ml-2.5 space-y-0.5">
                  {chapter.topics.map((topic) => {
                    const isSelected = activeTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopic(topic.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all ${
                          isSelected ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        {topic.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. RIGHT CONTENT VIEWPORT: THE BLOG DETAILS STREAM */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <article className="bg-white border border-slate-200 shadow-2xs rounded-2xl overflow-hidden">
          {/* HEADER HERO BANNER */}
          <div className="p-6 md:p-8 bg-slate-900 text-white">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-indigo-400 mb-2">
              <span>{TOPIC_DETAILS_DATA.subject}</span>
              <span className="text-slate-700">•</span>
              <span>{TOPIC_DETAILS_DATA.chapter}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-4">{TOPIC_DETAILS_DATA.topicName}</h1>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4 text-xs text-slate-400">
              <div className="md:flex gap-4 items-center">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Updated {TOPIC_DETAILS_DATA.lastUpdated}
                </span>

                <div className="w-1 h-1 rounded-full bg-gray-100"></div>

                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> 2 discussions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${liked ? "bg-rose-500/20 text-rose-400 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
                  <span>{liked ? TOPIC_DETAILS_DATA.stats.likes + 1 : TOPIC_DETAILS_DATA.stats.likes}</span>
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${saved ? "bg-amber-500/20 text-amber-400 font-bold" : "hover:bg-slate-800 text-slate-300"}`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
                  <span>{saved ? "Saved" : "Save"}</span>
                </button>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* STREAM CONTENT BLOCK STACK */}
          <div className="p-6 md:p-8 space-y-8 divide-y divide-slate-100">
            {/* INLINE VIDEO COMPONENT */}
            <div className="block-section">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-500" /> Topic Presentation File
              </h2>
              <div className="aspect-video bg-slate-900 rounded-xl relative overflow-hidden group flex flex-col justify-end p-4 border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-xs rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-lg">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1"></div>
                  </div>
                </div>
                <div className="z-20">
                  <p className="text-white text-sm font-bold">{TOPIC_DETAILS_DATA.videoIntro.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">
                    {TOPIC_DETAILS_DATA.videoIntro.fileName} • {TOPIC_DETAILS_DATA.videoIntro.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* SYNTHESIS TEXT STUDY NOTES */}
            <div className="block-section pt-6">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <BookOpenText className="w-4 h-4 text-indigo-500" /> Core Topic Notes
              </h2>
              <div className="text-xs leading-relaxed text-slate-600 font-medium whitespace-pre-line bg-slate-50 border border-slate-100 p-4 rounded-xl">
                {TOPIC_DETAILS_DATA.textNotes}
              </div>
            </div>

            {/* CURRICULUM DOCUMENTS */}
            <div className="block-section pt-6">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Handouts & Materials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOPIC_DETAILS_DATA.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-2xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{doc.size}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* CHECKPOINT QUIZ */}
            <div className="block-section pt-6">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" /> Topic Checkpoint Quiz
              </h2>
              <div className="border border-amber-100 bg-amber-50/20 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-900 mb-3">{TOPIC_DETAILS_DATA.quiz.question}</p>
                <div className="space-y-2">
                  {TOPIC_DETAILS_DATA.quiz.options.map((option, idx) => {
                    const isChosen = selectedQuizOption === idx;
                    const isCorrect = idx === TOPIC_DETAILS_DATA.quiz.correctIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedQuizOption(idx)}
                        className={`w-full flex items-center justify-between p-2.5 text-xs rounded-lg border text-left transition-all ${
                          isChosen
                            ? isCorrect
                              ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                              : "bg-rose-50 border-rose-300 text-rose-800 font-bold"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{option}</span>
                        {isChosen && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CLASSROOM DISCUSSION FORUM */}
            <div className="block-section pt-6">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-500" /> Questions & Threads
              </h2>

              <div className="space-y-4 mb-6">
                {discussionFeed.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800">{comment.author}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{comment.timestamp}</span>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed">{comment.text}</p>
                    </div>

                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2 pl-6 items-start">
                        <CornerDownRight className="w-4 h-4 text-slate-300 mt-1 shrink-0" />
                        <div className="bg-indigo-50/50 border border-indigo-100/40 rounded-xl p-3 text-xs flex-1">
                          <span className="font-bold text-indigo-900 block mb-0.5">{reply.author}</span>
                          <p className="text-indigo-800 font-medium leading-relaxed">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <form onSubmit={handlePostComment} className="space-y-2">
                <textarea
                  rows="3"
                  placeholder="Post an official clarification response to this topic stream..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-indigo-400 resize-none"
                />
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs">
                    Post Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
