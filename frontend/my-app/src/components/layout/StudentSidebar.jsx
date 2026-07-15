import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, ClipboardList, HelpCircle, Award, FolderOpen, GraduationCap, X } from "lucide-react";
import { useToggleStore } from "@/store/toggle";

const StudentSidebar = () => {
  const location = useLocation();
  const closeSidebar = useToggleStore((s) => s.closeSidebar);
  const sidebarOpen = useToggleStore((s) => s.sidebarOpen);

  // Helper to check if a navigation link is currently active
  const isActive = (path) => location.pathname === path;

  // Shared Link Styling utility function using your custom theme tokens
  const linkStyles = (path) => `
    flex items-center gap-3 px-3 py-2.5 text-[15px] font-semibold rounded transition-all duration-150 group no-underline
    ${isActive(path) ? "bg-primary/80 text-white shadow-sm" : "text-[var(--text)] opacity-80 hover:opacity-100 hover:bg-[var(--muted-hover)]"}
  `;

  return (
    <div
      className={`${sidebarOpen ? "w-100 md:w-64 overflow-hidden" : "w-0 overflow-hidden"} overflow-hidden transition-all duration-300 max-md:fixed shrink left-0 bg-background border-r z-50 dark:bg-muted/50 border-[var(--border)] h-screen sticky top-0  overflow-y-auto`}
    >
      <div className={`w-64 p-3 h-screen flex flex-col justify-between`}>
        <div>
          {/* Sidebar Header - Student Branding */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 px-2 py-4 mb-6 border-b border-[var(--border-muted)]">
              <div className="p-2 bg-[var(--accent)] text-white rounded-lg shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[var(--text)] m-0 tracking-tight">Student Portal</h2>
              </div>
            </div>

            <X onClick={closeSidebar} />
          </div>

          {/* Main Learning Hub Navigation */}
          <div className="space-y-1">
            <div className="px-3 mb-2  font-bold uppercase tracking-wider text-[10px] text-[var(--text)] opacity-40">Academic Center</div>

            <Link to="/student-dashboard" className={linkStyles("/student-dashboard")}>
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard Home</span>
            </Link>

            <Link to="/student-dashboard/classes" className={linkStyles("/student-dashboard/classes")}>
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>My Classes</span>
            </Link>
          </div>

          {/* Deliverables & Tasks Section */}
          <div className="pt-6 mt-6 border-t border-[var(--border-muted)] space-y-1">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text)] opacity-40">My Tasks</div>

            <Link to="/student-dashboard/assessments" className={linkStyles("/student-dashboard/assessments")}>
              <ClipboardList className="w-4 h-4 shrink-0" />
              <span>Assignments</span>
            </Link>

            <Link to="/student-dashboard/quizzes" className={linkStyles("/student-dashboard/quizzes")}>
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Quizzes & Tests</span>
            </Link>

            <Link to="/student-dashboard/grades" className={linkStyles("/student-dashboard/grades")}>
              <Award className="w-4 h-4 shrink-0" />
              <span>Grades & Progress</span>
            </Link>

            <Link to="/student-dashboard/resources" className={linkStyles("/student-dashboard/resources")}>
              <FolderOpen className="w-4 h-4 shrink-0" />
              <span>Study Resources</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Footer Account Status */}
        <div className="p-3 bg-[var(--card)] border border-[var(--card-border)] rounded-lg text-center mt-auto">
          <div className="text-[10px] font-bold text-[var(--success)] uppercase tracking-wide flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full animate-pulse"></div>
            Account Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
