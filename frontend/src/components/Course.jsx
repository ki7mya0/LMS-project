import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye } from "lucide-react";

export default function Course({ course, category, viewMode, handleDelete }) {
  const navigate = useNavigate();

  if (viewMode === "card") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
        <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 relative p-4 flex flex-col justify-end">
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => navigate(`/courses/${course.id}/edit`)} className="p-1.5 bg-white/90 rounded-md text-gray-700 hover:text-indigo-600 shadow-sm backdrop-blur-sm transition-colors">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleDelete(course.id)} className="p-1.5 bg-white/90 rounded-md text-gray-700 hover:text-red-600 shadow-sm backdrop-blur-sm transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/80 text-indigo-800 backdrop-blur-sm w-fit mb-2">
            {category?.name || "Uncategorized"}
          </span>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{course.name}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{course.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-700">
                {course.instructor.charAt(0)}
              </div>
              <span className="text-xs text-gray-600">{course.instructor}</span>
            </div>
            <Link
              to={`/courses/${course.id}`}
              className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-700 group-hover:underline"
            >
              View Syllabus <Eye className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Table row view
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{course.name}</div>
        <div className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{course.description}</div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
          {category?.name || "Uncategorized"}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-600">
          {course.instructor.charAt(0)}
        </div>
        {course.instructor}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/courses/${course.id}`}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            title="View Syllabus"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            to={`/courses/${course.id}/edit`}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(course.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
