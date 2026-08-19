import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, HelpCircle, FolderOpen, Bell, Settings, MessageCircle, Menu, X } from "lucide-react";

// Navigation items configuration
const NAV_ITEMS = [
  { path: "/student-dashboard", label: "Dashboard Home", icon: LayoutDashboard },
  { path: "/student-dashboard/assessments", label: "Assignments", icon: ClipboardList },
  { path: "/student-dashboard/quizzes", label: "Quizzes & Tests", icon: HelpCircle },
  { path: "/student-dashboard/my-group", label: "My Group", icon: HelpCircle },
  { path: "/student-dashboard/resources/select-subject", label: "Study Resources", icon: FolderOpen },
  { path: "/student-dashboard/messages", label: "Messages", icon: Bell },
  { path: "/student-dashboard/settings", label: "Settings", icon: Settings },
  { path: "/student-dashboard/chat", label: "Chat", icon: MessageCircle },
];

// Navigation Link Component
const NavLink = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive ? "bg-teal-50 text-teal-600 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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

const StudentSidebar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed z-10 md:hidden top-4 left-4">
        <MobileMenuButton isOpen={mobileMenuOpen} toggle={toggleMobileMenu} />
      </div>

      {/* Navigation Bar */}
      <div className="relative">
        {/* Desktop Navigation */}
        <div className="hidden px-4 py-3 bg-white border-b border-gray-200 md:block">
          <nav className="flex flex-wrap items-center gap-1.5">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} icon={item.icon} label={item.label} isActive={isActive(item.path)} />
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`
            fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-40
            ${mobileMenuOpen ? "w-72" : "w-0"}
            md:hidden
          `}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`${mobileMenuOpen ? "flex" : "hidden"} items-center justify-between px-4 py-4 border-b border-gray-100`}>
              <h2 className="text-lg font-bold text-gray-800">Student Panel</h2>
              <button onClick={toggleMobileMenu} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive(item.path) ? "bg-teal-50 text-teal-600 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">v2.4.0 • Student Portal</div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && <div className="fixed inset-0 z-30 bg-opacity-50 bg-black/10 md:hidden" onClick={toggleMobileMenu} />}
      </div>
    </>
  );
};

export default StudentSidebar;
