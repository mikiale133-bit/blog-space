import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, FolderOpen, Bell, Settings, Menu, X } from "lucide-react";
import { API } from "@/api/Axios";
import { useToggleStore } from "@/store/toggle";
import { useSelectStore } from "@/store/store";

// Simplified navigation items
const NAV_ITEMS = [
  { path: "/teacher-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/teacher-dashboard/assessments", label: "Assessments", icon: FileText },
  { path: "/teacher-dashboard/quizzes", label: "Quizzes", icon: FolderOpen },
  { path: "/teacher-dashboard/resources/select-subject", label: "Resources", icon: FolderOpen },
  { path: "/teacher-dashboard/groups", label: "Groups", icon: FileText },
  { path: "/teacher-dashboard/messages", label: "Messages", icon: Bell },
  { path: "/teacher-dashboard/settings", label: "Settings", icon: Settings },
];

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
const NavLink = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 border-b-2 transition-all duration-200 whitespace-nowrap ${
      isActive ? "bg-gray-100 border-teal-200 textsteal-600 font-semibold" : "text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    <Icon className="w-4 h-4 shrink-0" />
    <span className="text-sm">{label}</span>
  </Link>
);

// Mobile Menu Button
const MobileMenuButton = ({ isOpen, toggle }) => (
  <button onClick={toggle} className="p-2 transition-colors rounded-lg hover:bg-gray-100 md:hidden" aria-label="Toggle navigation">
    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
  </button>
);

// Main Component
const TeacherSidebar = () => {
  const closeSidebar = useToggleStore((s) => s.closeTeacherSidebar);
  const selectedClass = useSelectStore((s) => s.selectedClass);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const teacher = useTeacherData();

  const getDynamicPath = (path) => {
    if (path.includes("?")) {
      return `${path}&class=${selectedClass}`;
    }
    return `${path}?class=${selectedClass}`;
  };

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) closeSidebar();
  };

  return (
    <>
      {/* Mobile Menu Button - Always visible on mobile */}
      <div className="absolute z-10 md:hidden top-6 left-4">
        <MobileMenuButton isOpen={mobileMenuOpen} toggle={toggleMobileMenu} />
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40
          ${mobileMenuOpen ? "w-72 shadow-lg" : "w-0"}        
          md:relative md:w-auto md:shadow-none md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Teacher Panel</h2>
            <button onClick={toggleMobileMenu} className="p-1 rounded-lg md:hidden hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation - Horizontal scroll on desktop, vertical on mobile */}
          <div className="flex-1 p-4 overflow-x-auto overflow-y-auto">
            <nav className="flex flex-col md:flex-row flex-nowrap gap-2 md:flex-wrap md:gap-1.5">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.path} to={getDynamicPath(item.path)} icon={item.icon} label={item.label} isActive={isActive(item.path)} />
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100 md:hidden">v2.4.0 • Enterprise License</div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 z-30 bg-opacity-50 bg-black/10 md:hidden" onClick={toggleMobileMenu} />}
    </>
  );
};

export default TeacherSidebar;
