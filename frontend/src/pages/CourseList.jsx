import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { Search, Plus, LayoutGrid, List, Filter, BookOpen } from "lucide-react";
import Course from "../components/Course";

export default function CourseList() {
  const { courses, categories, deleteCourse } = useLms();
  const [viewMode, setViewMode] = useState("card");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || course.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Хичээл</h1>
          <p className="text-sm text-gray-500 mt-1">Хичээлийн агуулгыг удирдах</p>
        </div>
        <Link
          to="/courses/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Хичээл үүсгэх
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all cursor-pointer"
            >
              <option value="all">Нийт ангилал</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded-md transition-all ${viewMode === "card" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            title="Card View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-md transition-all ${viewMode === "table" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const category = categories.find((c) => c.id === course.categoryId);
            return <Course key={course.id} course={course} category={category} viewMode={viewMode} handleDelete={handleDelete} />
          })}
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-gray-200 border-dashed">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Хичээл олдсонгүй</h3>
              <p className="text-sm text-gray-500 mt-1">Хайлтыг өөрчилж эсвэл шинэ хичээл үүсгээрэй.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-700">Хичээлийн нэр</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Ангилал</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Багш</th>
                  <th className="px-6 py-4 font-medium text-gray-700 text-right">Үйлдлүүд</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.map((course) => {
                  const category = categories.find((c) => c.id === course.categoryId);
                  return <Course key={course.id} course={course} category={category} viewMode={viewMode} handleDelete={handleDelete} />
                })}
              </tbody>
            </table>
          </div>
          {filteredCourses.length === 0 && (
            <div className="py-12 text-center border-t border-gray-100">
              <p className="text-gray-500">Хичээл олдсонгүй.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
