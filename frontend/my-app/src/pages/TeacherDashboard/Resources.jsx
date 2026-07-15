import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Star,
  Download,
  Eye,
  BookOpen,
  FileText,
  PenTool,
  Video,
  File,
  Clock,
  User,
  Tag,
  Heart,
  Share2,
  Plus,
  Grid3x3,
  List,
  ChevronDown,
} from "lucide-react";

const resourcesData = [
  {
    id: 1,
    title: "Algebra Formula Sheet",
    type: "notes",
    subject: "Math",
    grade: "Grade 10",
    author: "Mr. Johnson",
    date: "2026-07-12",
    downloads: 145,
    starred: true,
    size: "2.4 MB",
    pages: 6,
    description: "Complete formula reference for quadratic equations",
  },
  {
    id: 2,
    title: "Photosynthesis Explained",
    type: "notes",
    subject: "Science",
    grade: "Grade 9",
    author: "Ms. Williams",
    date: "2026-07-10",
    downloads: 89,
    starred: false,
    size: "1.8 MB",
    pages: 4,
    description: "Step-by-step breakdown of photosynthesis process",
  },
  {
    id: 3,
    title: "World War II Timeline",
    type: "handout",
    subject: "History",
    grade: "Grade 11",
    author: "Mr. Thompson",
    date: "2026-07-08",
    downloads: 234,
    starred: true,
    size: "3.1 MB",
    pages: 8,
    description: "Interactive timeline with key events and figures",
  },
  {
    id: 4,
    title: "Essay Writing Guide",
    type: "book",
    subject: "English",
    grade: "Grade 10-12",
    author: "Mrs. Davis",
    date: "2026-07-14",
    downloads: 312,
    starred: false,
    size: "5.6 MB",
    pages: 42,
    description: "Complete guide to academic essay structure",
  },
  {
    id: 5,
    title: "Geometry Video Series",
    type: "video",
    subject: "Math",
    grade: "Grade 8-10",
    author: "Mr. Anderson",
    date: "2026-07-11",
    downloads: 67,
    starred: false,
    size: "120 MB",
    pages: 0,
    description: "Video tutorials on geometry proofs",
  },
  {
    id: 6,
    title: "Chemistry Lab Safety",
    type: "handout",
    subject: "Science",
    grade: "Grade 9-12",
    author: "Ms. Brown",
    date: "2026-07-13",
    downloads: 156,
    starred: true,
    size: "1.2 MB",
    pages: 3,
    description: "Safety protocols for chemistry laboratory",
  },
];

const typeIcons = {
  book: { icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", label: "Book" },
  notes: { icon: PenTool, color: "text-purple-600", bg: "bg-purple-50", label: "Notes" },
  handout: { icon: FileText, color: "text-orange-600", bg: "bg-orange-50", label: "Handout" },
  video: { icon: Video, color: "text-red-600", bg: "bg-red-50", label: "Video" },
  file: { icon: File, color: "text-gray-600", bg: "bg-gray-50", label: "File" },
};

const subjects = ["All", "Math", "Science", "History", "English", "Art"];
const types = ["All", "Book", "Notes", "Handout", "Video", "File"];
const grades = ["All", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export default function Resources() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState("All");

  const filteredData = resourcesData.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === "All" || item.subject === subjectFilter;
    const matchType = typeFilter === "All" || item.type === typeFilter.toLowerCase();
    const matchGrade = gradeFilter === "All" || item.grade.includes(gradeFilter.replace("Grade ", ""));
    return matchSearch && matchSubject && matchType && matchGrade;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resource Library</h1>
          <p className="text-sm text-gray-500">Access books, notes, handouts and more</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> Upload Resource
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {grades.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          <div className="flex gap-1 border rounded-lg p-1 ml-auto">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded ${view === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded ${view === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-6 text-sm text-gray-600">
        <span>{filteredData.length} resources found</span>
        <span className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          {resourcesData.filter((r) => r.starred).length} starred
        </span>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredData.map((item) => {
            const TypeIcon = typeIcons[item.type]?.icon || File;
            const typeInfo = typeIcons[item.type] || typeIcons.file;

            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition group">
                {/* Header with Type Badge */}
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-lg ${typeInfo.bg}`}>
                    <TypeIcon size={20} className={typeInfo.color} />
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                      <Heart size={16} className={item.starred ? "fill-red-500 text-red-500" : "text-gray-400"} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                      <Share2 size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                </div>

                {/* Metadata */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{item.subject}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{item.grade}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{item.pages} pages</span>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{item.downloads} downloads</span>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                      <Download size={14} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredData.map((item, index) => {
            const TypeIcon = typeIcons[item.type]?.icon || File;
            const typeInfo = typeIcons[item.type] || typeIcons.file;

            return (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition ${
                  index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className={`p-2 rounded-lg ${typeInfo.bg} flex-shrink-0`}>
                  <TypeIcon size={18} className={typeInfo.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer truncate">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 flex-shrink-0">{typeInfo.label}</span>
                    {item.starred && <Star size={14} className="fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-0.5">
                    <span>{item.subject}</span>
                    <span>•</span>
                    <span>{item.grade}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{item.pages} pages</span>
                    <span>•</span>
                    <span>{item.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition">
                    <Heart size={16} className={item.starred ? "fill-red-500 text-red-500" : "text-gray-400"} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition text-blue-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition text-blue-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="bg-white rounded-xl p-16 text-center">
          <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium text-gray-600">No resources found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or upload a new resource</p>
        </div>
      )}
    </div>
  );
}
