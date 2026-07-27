import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  FileText,
  Video,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  Search,
  CheckCircle,
  Eye,
  Filter,
} from "lucide-react";

// Static Syllabus Architecture (Maths Focus)
const MATHS_SYLLABUS = {
  subjectName: "Grade 10 Mathematics",
  stats: { totalFiles: 34, totalSaves: 284, activeThreads: 5 },
  chapters: [
    {
      id: "ch-1",
      title: "Chapter 1: Trigonometry",
      topics: [
        { id: "tp-1-1", title: "Topic 1.1: The Sine Rule", count: 4 },
        { id: "tp-1-2", title: "Topic 1.2: The Cosine Rule", count: 2 },
        { id: "tp-1-3", title: "Topic 1.3: 3D Spatial Problems", count: 3 },
      ],
    },
    {
      id: "ch-2",
      title: "Chapter 2: Functions & Graphs",
      topics: [
        { id: "tp-2-1", title: "Topic 2.1: Quadratic Mappings", count: 5 },
        { id: "tp-2-2", title: "Topic 2.2: Hyperbolic Inverses", count: 2 },
      ],
    },
    {
      id: "ch-3",
      title: "Chapter 3: Differential Calculus",
      topics: [
        { id: "tp-3-1", title: "Topic 3.1: Limits Convergence", count: 6 },
        { id: "tp-3-2", title: "Topic 3.2: First Principles derivation", count: 4 },
      ],
    },
  ],
};

// Repository items linked directly back to specific Topic IDs
const INITIAL_RESOURCES = [
  {
    id: 101,
    topicId: "tp-1-1",
    title: "Comprehensive Sine Rule Derivation Notes",
    fileName: "sine_rule_lecture_notes_v4.pdf",
    type: "document",
    dateUploaded: "2026-06-12",
    likes: 45,
    saves: 22,
    reviews: [
      { id: 1, user: "Marcus Vance (Student)", text: "The second diagram on page 3 really helped clear up ambiguous cases!" },
      { id: 2, user: "Emily Wong (Student)", text: "Is there a companion video walkthrough for question 7?" },
    ],
  },
  {
    id: 102,
    topicId: "tp-1-1",
    title: "Visualizing the Ambiguous Case Interactively",
    fileName: "sine_ambiguous_case_render.mp4",
    type: "media",
    dateUploaded: "2026-06-14",
    likes: 89,
    saves: 61,
    reviews: [],
  },
  {
    id: 103,
    topicId: "tp-1-2",
    title: "Cosine Rule Proof & Practice Matrix",
    fileName: "cosine_rule_problems.pdf",
    type: "document",
    dateUploaded: "2026-06-18",
    likes: 14,
    saves: 9,
    reviews: [{ id: 3, user: "Principal Skinner", text: "Excellent alignment with standardized testing matrix objectives." }],
  },
];

export default function Resources2() {
  // UI State Controls
  const [activeTopic, setActiveTopic] = useState("tp-1-1");
  const [mediaFilter, setMediaFilter] = useState("all"); // options: 'all', 'document', 'media'
  const [expandedChapters, setExpandedChapters] = useState({ "ch-1": true, "ch-2": true, "ch-3": false });
  const [expandedReviewDrawers, setExpandedReviewDrawers] = useState({});

  // Toggle tree hierarchy folders open or closed
  const toggleChapterView = (chapterId) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  // Toggle feedback drawers hidden under individual cards
  const toggleReviewDrawer = (resourceId) => {
    setExpandedReviewDrawers((prev) => ({ ...prev, [resourceId]: !prev[resourceId] }));
  };

  // Filter content matching active syllabus topic context AND type selector filters
  const filteredResources = INITIAL_RESOURCES.filter((res) => {
    const matchesTopic = res.topicId === activeTopic;
    const matchesType = mediaFilter === "all" || res.type === mediaFilter;
    return matchesTopic && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-slate-50 min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. TOP GLOBAL SUBJECT SUMMARY CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" /> Curriculum Core
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{MATHS_SYLLABUS.subjectName}</h1>
          </div>

          {/* Dynamic Search Interface Anchor */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search across all curriculum materials..."
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* High Level Course Audit Analytics Strip */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Materials</span>
            <span className="text-xl font-extrabold text-slate-900">{MATHS_SYLLABUS.stats.totalFiles} Uploads</span>
          </div>
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Student Study Saves</span>
            <span className="text-xl font-extrabold text-slate-900">{MATHS_SYLLABUS.stats.totalSaves} Bookmarks</span>
          </div>
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Review Questions</span>
            <span className="text-xl font-extrabold text-indigo-600 flex items-center gap-1.5">{MATHS_SYLLABUS.stats.activeThreads} Pending</span>
          </div>
        </div>
      </div>

      {/* 2. THE TWO-COLUMN APPLICATION WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COMPONENT COLUMN: SYLLABUS DIRECTORY EXPLORER */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sticky top-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-3">
            Syllabus Navigation Tree
          </h2>

          <nav className="space-y-2">
            {MATHS_SYLLABUS.chapters.map((chapter) => (
              <div key={chapter.id} className="space-y-1">
                {/* Chapter Base Folder Row Control */}
                <button
                  onClick={() => toggleChapterView(chapter.id)}
                  className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors text-left font-bold text-xs text-slate-700"
                >
                  <span className="truncate pr-2">{chapter.title}</span>
                  {expandedChapters[chapter.id] ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Sub-Topic Asset Nodes (Conditionally Rendered) */}
                {expandedChapters[chapter.id] && (
                  <div className="pl-4 border-l border-slate-100 ml-3 space-y-1 my-1">
                    {chapter.topics.map((topic) => {
                      const isTargetActive = activeTopic === topic.id;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setActiveTopic(topic.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all text-left ${
                            isTargetActive
                              ? "bg-indigo-50 font-bold text-indigo-700 shadow-2xs"
                              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate">{topic.title}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                              isTargetActive ? "bg-indigo-200/50 text-indigo-800" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {topic.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* RIGHT COMPONENT COLUMN: LIVE WORKSPACE FEED AND REVIEW TRACKER */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Action Strip with Critical Format Sorting Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 pl-1">
              <Filter className="w-3.5 h-3.5 text-indigo-500" /> Filter Media Type:
            </div>

            {/* Critical Toggle Controls */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setMediaFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${mediaFilter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                All Formats
              </button>
              <button
                onClick={() => setMediaFilter("document")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${mediaFilter === "document" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" /> Documents
              </button>
              <button
                onClick={() => setMediaFilter("media")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${mediaFilter === "media" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                <Video className="w-3.5 h-3.5 text-rose-500" /> Video & Media
              </button>
            </div>
          </div>

          {/* Dynamic Feed Resource Engine Layout rendering stacked rows */}
          <div className="space-y-3">
            {filteredResources.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium">No files matching selected filter tags under this topic node.</p>
              </div>
            ) : (
              filteredResources.map((resource) => {
                const isDrawerOpen = !!expandedReviewDrawers[resource.id];
                return (
                  <div key={resource.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all">
                    {/* File Row Metadata Info Block */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`p-3 rounded-xl border shrink-0 ${
                          resource.type === "media" ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                        }`}
                      >
                        {resource.type === "media" ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-black text-slate-900 leading-tight mb-1">{resource.title}</h3>
                        <p className="text-xs font-mono text-slate-400 truncate">{resource.fileName}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md self-start uppercase tracking-wider shrink-0">
                        {resource.dateUploaded}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 my-3"></div>

                    {/* Standard Social Engagement Interaction Panel Strip */}
                    <div className="flex justify-between items-center text-slate-400 text-xs">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100/60">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-50" />
                          <span>{resource.likes} Likes</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-semibold text-indigo-600 bg-indigo-50/50 px-2 py-1 rounded-md border border-indigo-100/40">
                          <Bookmark className="w-3.5 h-3.5 text-indigo-500 fill-indigo-50" />
                          <span>{resource.saves} Student Saves</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-50 hover:text-slate-600 rounded-lg transition-colors" title="Generate Share Token">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleReviewDrawer(resource.id)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isDrawerOpen ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{resource.reviews.length} Threads</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable Student Review / Questions Thread Grid Drawer */}
                    {isDrawerOpen && (
                      <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 rounded-xl p-3 border border-slate-100/80 space-y-3">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Lesson Queries</div>

                        {resource.reviews.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No historical student inquiries linked to this note profile node.</p>
                        ) : (
                          <div className="space-y-2">
                            {resource.reviews.map((review) => (
                              <div key={review.id} className="bg-white border border-slate-100 p-2.5 rounded-xl shadow-3xs text-xs">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-slate-700">{review.user}</span>
                                  <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-100">
                                    Awaiting Response
                                  </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed font-medium">{review.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Interactive UI Action Reply Block placeholder */}
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Type an official classroom response or addendum notice..."
                            disabled
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs opacity-60 cursor-not-allowed outline-none"
                          />
                          <button className="px-3 py-1.5 bg-slate-200 text-slate-400 rounded-xl text-xs font-bold cursor-not-allowed">Reply</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
