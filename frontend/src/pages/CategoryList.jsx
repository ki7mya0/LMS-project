import React, { useState } from "react";
import { useLms } from "context/LmsContext";
import { Plus, LayoutGrid, X, Check } from "lucide-react";
import Category from "../components/Category";

export default function CategoryList() {
  const { categories, createCategory, updateCategory, deleteCategory, courses } = useLms();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Ангилалыг устгах уу? Энэ ангилалд хамаарах бүх курсуудын ангилал 'Тодорхойгүй' болно.")) {
      await deleteCategory(id);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) return;
    await updateCategory(id, { name: editName });
    setEditingId(null);
  };

  const saveNew = async () => {
    if (!newName.trim()) return;
    await createCategory({ name: newName });
    setNewName("");
    setIsCreating(false);
  };

  const getCourseCount = (categoryId) => {
    return courses.filter((c) => c.categoryId === categoryId).length;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ангилал</h1>
          <p className="text-sm text-gray-500 mt-1">Хичээлийн ангилалыг удирдах</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          disabled={isCreating}
        >
          <Plus className="w-4 h-4" />
          Ангилал үүсгэх
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-700 w-2/3">Ангилал</th>
                <th className="px-6 py-4 font-medium text-gray-700 text-center">Холбоотой курсууд</th>
                <th className="px-6 py-4 font-medium text-gray-700 text-right">Үйлдлүүд</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isCreating && (
                <tr className="bg-indigo-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                        <LayoutGrid className="w-4 h-4 text-indigo-600" />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveNew()}
                        className="flex-1 px-3 py-1.5 bg-white border border-indigo-300 rounded-md text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        placeholder="Enter category name..."
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 text-xs italic">Хүлээгдэж байна...</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={saveNew} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Хадгалах">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setIsCreating(false)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Болих">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              
              {categories.map((cat) => {
                return (
                  <Category 
                    key={cat.id} 
                    category={cat} 
                    editingId={editingId}
                    editName={editName}
                    setEditName={setEditName}
                    saveEdit={saveEdit}
                    startEdit={startEdit}
                    handleDelete={handleDelete}
                    getCourseCount={getCourseCount}
                    setEditingId={setEditingId}
                  />
                );
              })}
              
              {categories.length === 0 && !isCreating && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    <LayoutGrid className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900">Ангилал олдсонгүй</p>
                    <p className="text-xs mt-1">Эхний ангилалаа үүсгэж эхлээрэй.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
