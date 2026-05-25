import React from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Building2 } from "lucide-react";

export default function School({ school, handleDelete }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{school.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{school.contact}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
          {school.location}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-100">
          {school.coursesCount}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/schools/${school.id}/edit`}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            title="Edit School"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(school.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete School"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
