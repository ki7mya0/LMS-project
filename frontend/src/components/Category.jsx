import React from "react";
import { Edit2, Trash2, LayoutGrid, Check, X } from "lucide-react";

export default function Category({ category, editingId, editName, setEditName, saveEdit, startEdit, handleDelete, getCourseCount, setEditingId }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            <LayoutGrid className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition-colors" />
          </div>
          {editingId === category.id ? (
            <input
              type="text"
              autoFocus
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(category.id)}
              className="flex-1 px-3 py-1.5 bg-white border border-indigo-300 rounded-md text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm max-w-md"
            />
          ) : (
            <div className="font-medium text-gray-900">{category.name}</div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center justify-center min-w-[2rem] px-2 h-7 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-100">
          {getCourseCount(category.id)}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        {editingId === category.id ? (
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => saveEdit(category.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Save">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Cancel">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => startEdit(category)}
              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              title="Edit Category"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
