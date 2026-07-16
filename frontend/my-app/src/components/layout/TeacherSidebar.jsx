import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  FileText,
  HelpCircle,
  FolderOpen,
  BarChart3,
  Inbox,
  School,
  Settings,
  Bell,
  ArrowUpToLine,
  ChevronUp,
  X,
} from "lucide-react";
import { API } from "@/api/Axios";
import { useToggleStore } from "@/store/toggle";

const TeacherSidebar = () => {
  const closeSidebar = useToggleStore((s) => s.closeSidebar);
  const sidebarOpen = useToggleStore((s) => s.sidebarOpen);

  const location = useLocation();
  const [teacher, setTeacher] = useState({});
  const [classesOpen, setClassesOpen] = useState(true);

  // fetch teacher
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await API.get("/api/teachers/me");
        setTeacher(res.data.teacher || []);
        console.log(res.data.teacher.classes);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacher();
  }, []);

  // Helper to check if a navigation link is currently active
  const isActive = (path) => location.pathname === path;

  // Shared Link Styling utility function using theme tokens
  const linkStyles = (path) => `
    flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all duration-150 group no-underline
    ${isActive(path) ? "bg-muted dark:text-white shadow-sm border-x-4 dark:border-primary/60" : "text-[var(--text)] opacity-80 hover:opacity-100 hover:bg-[var(--muted-hover)]"}
  `;

  return (
    <div
      className={`${sidebarOpen ? "w-100 md:w-64 overflow-hidden" : "w-0 overflow-hidden"} overflow-hidden transition-all duration-300 max-md:fixed shrink left-0 bg-background border-r z-50 dark:bg-muted/50 border-[var(--border)] h-screen sticky top-0 z-50 overflow-y-auto`}
    >
      <div className="w-64 p-3 h-screen flex flex-col justify-between ">
        {/* Sidebar Header Brand Identity */}
        <div className="flex mb-4 border-b border-[var(--border-muted)] items-center justify-between">
          <div className="flex items-center gap-2 px-2 py-4 ">
            <div className="p-2 bg-[var(--primary)] text-white rounded-lg shadow-sm">
              <School className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[var(--text)] m-0 tracking-tight">Teacher Panel</h2>
          </div>
          <X onClick={closeSidebar} />
        </div>
        <main className="overflow-y-auto no-scrollbar">
          {/* Core Navigation Cluster */}
          <div className="space-y-1">
            <Link to="/teacher-dashboard" className={linkStyles("/teacher-dashboard")}>
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </Link>

            {/* Interactive Classes Dropdown Block */}
            <div className="space-y-1">
              <button
                onClick={() => setClassesOpen(!classesOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 text-sm font-medium rounded-lg text-[var(--text)] opacity-80 hover:opacity-100 hover:bg-[var(--muted-hover)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>My Classes</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${classesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Nested Subdocument Section Mapping */}
              {classesOpen && (
                <div className="pl-6 pr-1 space-y-1 border-l border-border ml-5 my-1">
                  {teacher?.classes?.map((c, idx) => {
                    const path = `/teacher-dashboard/my-classes/${c._id}`;
                    return (
                      <Link
                        key={idx}
                        to={path}
                        className={`block px-4 font-medium  no-underline transition-colors ${
                          isActive(path) ? "border-r-3 bg-muted py-1 border-x-3" : "text-text] opacity-70 hover:opacity-100 hover:bg-muted py-1"
                        }`}
                      >
                        Section {c.section}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Structural Metadata Group Partition */}
          <div className="pt-6 mt-6 border-t border-[var(--border-muted)] space-y-1">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text)] opacity-40">Assessments Engine</div>

            <Link to="/teacher-dashboard/assessments" className={linkStyles("/teacher-dashboard/assessments")}>
              <FileText className="w-4 h-4 shrink-0" />
              <span>Assessment</span>
            </Link>

            <Link to="/teacher-dashboard/resources" className={linkStyles("/teacher-dashboard/resources")}>
              <FolderOpen className="w-4 h-4 shrink-0" />
              <span>Resources</span>
            </Link>

            <Link to="/teacher-dashboard/results" className={linkStyles("/teacher-dashboard/results")}>
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Results</span>
            </Link>

            <Link to="/teacher-dashboard/submissions" className={linkStyles("/teacher-dashboard/submissions")}>
              <Inbox className="w-4 h-4 shrink-0" />
              <span>Submission</span>
            </Link>
          </div>

          <div className="pt-6 mt-6 border-t border-[var(--border-muted)] space-y-1">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text)] opacity-40">Platform</div>

            <Link to="/teacher-dashboard/settings" className={linkStyles("/teacher-dashboard/settings")}>
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </Link>

            <Link to="/teacher-dashboard/feedbacks" className={linkStyles("/teacher-dashboard/feedbacks")}>
              <ArrowUpToLine className="w-4 h-4 shrink-0" />
              <span>Feedback</span>
            </Link>

            <Link to="/teacher-dashboard/messages" className={linkStyles("/teacher-dashboard/messages")}>
              <Bell className="w-4 h-4 shrink-0" />
              <span>Messages</span>
            </Link>
          </div>
        </main>

        {/* Decorative Sticky Footnote Context */}
        <div className="border-t p-3 border-muted">
          <div className="flex gap-2 items-center">
            <div className="-space-y-2 mt-1.5">
              <ChevronUp className="w-4 h-4" />
              <ChevronDown className="w-4 h-4 p-0" />
            </div>
            Account
          </div>
          <div className=" flex-1 text-[10px] font-medium opacity-40   mt-auto pt-4">v2.4.0 • Enterprise License</div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
