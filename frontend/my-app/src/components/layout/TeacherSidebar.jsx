import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  FileText,
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
import { useSelectStore } from "@/store/store";

// Constants for navigation sections
const NAVIGATION_SECTIONS = {
  CORE: "core",
  ASSESSMENTS: "assessments",
  CLASS: "class",
  PLATFORM: "platform",
};

// Navigation configuration
const NAV_ITEMS = {
  [NAVIGATION_SECTIONS.CORE]: [{ path: "/teacher-dashboard", label: "Dashboard", icon: LayoutDashboard, isDynamic: true }],
  [NAVIGATION_SECTIONS.ASSESSMENTS]: [
    { path: "/teacher-dashboard/assessments", label: "Assessments", icon: FileText, isDynamic: true },
    { path: "/teacher-dashboard/quizzes", label: "Quizzes", icon: FolderOpen, isDynamic: true },
    { path: "/teacher-dashboard/results", label: "Results", icon: BarChart3 },
    { path: "/teacher-dashboard/submissions", label: "Submission", icon: Inbox },
    { path: "/teacher-dashboard/resources/select-subject", label: "Resources", icon: FolderOpen },
  ],
  [NAVIGATION_SECTIONS.CLASS]: [{ path: "/teacher-dashboard/groups", label: "Groups", icon: FileText }],
  [NAVIGATION_SECTIONS.PLATFORM]: [
    { path: "/teacher-dashboard/settings", label: "Settings", icon: Settings },
    { path: "/teacher-dashboard/feedbacks", label: "Feedback", icon: ArrowUpToLine },
    { path: "/teacher-dashboard/messages", label: "Messages", icon: Bell },
  ],
};

// Section titles
const SECTION_TITLES = {
  [NAVIGATION_SECTIONS.CORE]: null,
  [NAVIGATION_SECTIONS.ASSESSMENTS]: "Assessments Engine",
  [NAVIGATION_SECTIONS.CLASS]: "CLASS",
  [NAVIGATION_SECTIONS.PLATFORM]: "Platform",
};

// Custom hook for teacher data
const useTeacherData = () => {
  const [teacher, setTeacher] = useState({});
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await API.get("/api/teachers/me");
        setTeacher(response.data.teacher || {});
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      }
    };
    fetchTeacher();
  }, []);

  return teacher;
};

// Navigation Link Component
const NavLink = ({ to, icon: Icon, label, isActive, className = "" }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-0.5 font-semibold transition-all duration-150 group no-underline ${className} ${
      isActive ? "text-[#00b39e] font-extrabold text-[16px]" : "text-gray-600 dark:text-gray-300 text-[15px] opacity-80 hover:opacity-90"
    }`}
  >
    <Icon className="w-4 h-4 shrink-0" />
    <span>{label}</span>
  </Link>
);

// Class Link Component
const ClassLink = ({ classData, isActive }) => {
  const path = `/teacher-dashboard/classes/${classData._id}`;
  return (
    <Link
      to={path}
      className={`block px-2 font-medium no-underline transition-all ${
        isActive(path) ? "border-[#00b39e] text-[#00b39e] text-bold text-[16px] border-l-2" : "text-[15px] opacity-70 hover:opacity-100 py-1"
      }`}
    >
      Section {classData.section}
    </Link>
  );
};

// Classes Dropdown Component
const ClassesDropdown = ({ classes, isClassOpen, toggleClasses }) => {
  const location = useLocation();

  if (!classes?.length) return null;

  return (
    <div className="space-y-1">
      <button
        onClick={toggleClasses}
        className="w-full flex justify-between items-center px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 opacity-80 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
      >
        <div className="flex items-center gap-3 font-semibold">
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>My Classes</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isClassOpen ? "rotate-180" : ""}`} />
      </button>

      {isClassOpen && (
        <div className="pr-1 space-y-1 border-l border-gray-200 dark:border-gray-700 ml-5 my-1">
          {classes.map((classItem) => (
            <ClassLink key={classItem._id} classData={classItem} isActive={(path) => location.pathname === path} />
          ))}
        </div>
      )}
    </div>
  );
};

// Navigation Section Component
const NavigationSection = ({ sectionKey, items, selectedClass, location, classes, isClassOpen, toggleClasses }) => {
  const isActive = (path) => location.pathname === path;
  const title = SECTION_TITLES[sectionKey];

  const getDynamicPath = (item) => {
    if (item.isDynamic) {
      return item.path.includes("?") ? `${item.path}&class=${selectedClass}` : `${item.path}?class=${selectedClass}`;
    }
    return item.path;
  };

  return (
    <div className={`${title ? "pt-6 mt-6 border-t border-slate-100 dark:border-white/5" : ""} space-y-1`}>
      {title && <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 opacity-40">{title}</div>}

      {sectionKey === NAVIGATION_SECTIONS.CORE && (
        <>
          {items.map((item) => (
            <NavLink key={item.path} to={getDynamicPath(item)} icon={item.icon} label={item.label} isActive={isActive(item.path)} />
          ))}
          <ClassesDropdown classes={classes} isClassOpen={isClassOpen} toggleClasses={toggleClasses} />
        </>
      )}

      {sectionKey !== NAVIGATION_SECTIONS.CORE &&
        items.map((item) => <NavLink key={item.path} to={getDynamicPath(item)} icon={item.icon} label={item.label} isActive={isActive(item.path)} />)}
    </div>
  );
};

// Sidebar Footer Component
const SidebarFooter = () => (
  <div className="border-t border-muted p-3">
    <div className="flex gap-2 items-center">
      <div className="-space-y-2 mt-1.5">
        <ChevronUp className="w-4 h-4" />
        <ChevronDown className="w-4 h-4 p-0" />
      </div>
      Account
    </div>
    <div className="flex-1 text-[10px] font-medium opacity-40 mt-auto pt-4">v2.4.0 • Enterprise License</div>
  </div>
);

// Sidebar Header Component
const SidebarHeader = ({ closeSidebar }) => (
  <div className="flex mb-4 border-b border-muted items-center justify-between">
    <div className="flex items-center gap-2 px-2 py-4">
      <div className="p-2 bg-teal-500 text-white rounded-lg shadow-sm">
        <School className="w-5 h-5" />
      </div>
      <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 m-0 tracking-tight">Teacher Panel</h2>
    </div>
    <X onClick={closeSidebar} className="cursor-pointer" />
  </div>
);

// Main Component
const TeacherSidebar = () => {
  const closeSidebar = useToggleStore((s) => s.closeTeacherSidebar);
  const sidebarOpen = useToggleStore((s) => s.teacherSidebarOpened);
  const selectedClass = useSelectStore((s) => s.selectedClass);
  const location = useLocation();

  const teacher = useTeacherData();
  const [isClassOpen, setIsClassOpen] = useState(true);

  const toggleClasses = () => setIsClassOpen(!isClassOpen);

  return (
    <div
      className={`${
        sidebarOpen ? "w-100 md:w-64 overflow-hidden" : "w-0 overflow-hidden"
      } h-screen overflow-hidden transition-all duration-300 max-md:fixed shrink-0 left-0 overflow-y-auto bg-white dark:bg-muted`}
    >
      <div className="w-64 p-3 h-screen flex flex-col justify-between">
        <SidebarHeader closeSidebar={closeSidebar} />

        <main className="overflow-y-auto no-scrollbar">
          {Object.values(NAVIGATION_SECTIONS).map((sectionKey) => (
            <NavigationSection
              key={sectionKey}
              sectionKey={sectionKey}
              items={NAV_ITEMS[sectionKey]}
              selectedClass={selectedClass}
              location={location}
              classes={teacher.classes}
              isClassOpen={isClassOpen}
              toggleClasses={toggleClasses}
            />
          ))}
        </main>

        <SidebarFooter />
      </div>
    </div>
  );
};

export default TeacherSidebar;
