import React, { useState } from "react";
import { useLms } from "context/LmsContext";
import { Download, Filter, Search, GraduationCap, BarChart2, CheckCircle, Clock } from "lucide-react";

export const ReportPage = () => {
  const { schools, courses, categories } = useLms();
  const [filterSchool, setFilterSchool] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock data for reports since we don't have student tracking in the system yet
  const mockReports = [
    { id: 1, student: "Алис Смит", courseId: "1", completion: 85, assignmentStatus: "Pending", lastActive: "2 өдрийн өмнө" },
    { id: 2, student: "Боб Джонсон", courseId: "1", completion: 100, assignmentStatus: "Completed", lastActive: "Today" },
    { id: 3, student: "Чарльз Браун", courseId: "2", completion: 45, assignmentStatus: "Pending", lastActive: "1 долоо хоногийн өмнө" },
    { id: 4, student: "Диана Принс", courseId: "3", completion: 10, assignmentStatus: "Overdue", lastActive: "1 сарын өмнө" },
    { id: 5, student: "Иван Райт", courseId: "2", completion: 100, assignmentStatus: "Completed", lastActive: "Өчигдөр" },
  ];

  const filteredReports = mockReports.filter(r => {
    if (filterCourse !== "all" && r.courseId !== filterCourse) return false;
    
    const course = courses.find(c => c.id === r.courseId);
    if (!course) return false;
    
    if (filterSchool !== "all" && course.schoolId !== filterSchool) return false;
    if (filterCategory !== "all" && course.categoryId !== filterCategory) return false;
    
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Overdue": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Оюутны ахиц дэвшлийн тайлан</h1>
          <p className="text-sm text-gray-500 mt-1">Сургуулийн хэмжээнд оролцоо болон гүйцэтгэлийн үзүүлэлтүүдийг хянах.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            CSV экспортлох
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            PDF экспортлох
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Нийт оюутнууд</p>
            <p className="text-2xl font-bold text-gray-900">1,248</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Дундаж гүйцэтгэл</p>
            <p className="text-2xl font-bold text-gray-900">68%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Хүлээгдэж буй даалгаврууд</p>
            <p className="text-2xl font-bold text-gray-900">342</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <BarChart2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Идэвхтэй хичээлүүд</p>
            <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 w-full md:w-auto pr-4 border-r border-transparent md:border-gray-200">
          <Filter className="w-4 h-4 text-gray-400" />
          Filters
        </div>
        <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
          <select
            value={filterSchool}
            onChange={(e) => setFilterSchool(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all cursor-pointer"
          >
            <option value="all">Нийт сургуулиуд</option>
            {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all cursor-pointer"
          >
            <option value="all">Нийт ангиллууд</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all cursor-pointer"
          >
            <option value="all">Нийт хичээлүүд</option>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-700">Оюутны нэр</th>
                <th className="px-6 py-4 font-medium text-gray-700">Хичээл</th>
                <th className="px-6 py-4 font-medium text-gray-700">Гүйцэтгэл %</th>
                <th className="px-6 py-4 font-medium text-gray-700">Бүртгэлийн статус</th>
                <th className="px-6 py-4 font-medium text-gray-700">Сүүлийн идэвхтэй</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => {
                const course = courses.find((c) => c.id === report.courseId);
                return (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
                          {report.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="font-medium text-gray-900">{report.student}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{course?.name || "Unknown Course"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div 
                            className={`h-2 rounded-full ${report.completion === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} 
                            style={{ width: `${report.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{report.completion}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(report.assignmentStatus)}`}>
                        {report.assignmentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {report.lastActive}
                    </td>
                  </tr>
                );
              })}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p>Ангилалд хамаарсан өгөгдөл олдсонгүй.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
