import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Building2, LayoutGrid, FileText, LogOut, Search, Bell } from "lucide-react";

export const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex gap-8 items-center h-full">
              <div className="flex-shrink-0 flex items-center gap-2 text-indigo-600 cursor-pointer" onClick={() => navigate("/courses")}>
                <BookOpen size={28} className="text-indigo-600" />
                <span className="font-bold text-xl tracking-tight text-gray-900">LMS SICT</span>
              </div>
              <nav className="hidden md:flex space-x-1 h-full">
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`
                  }
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Хичээлүүд
                </NavLink>
                <NavLink
                  to="/schools"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`
                  }
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Сургуулиуд
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`
                  }
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Ангиллууд
                </NavLink>
                <NavLink
                  to="/report"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`
                  }
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Тайлан
                </NavLink>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors gap-2 p-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Гарах</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
