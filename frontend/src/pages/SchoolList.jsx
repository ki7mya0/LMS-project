import React from "react";
import { Link } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { Plus, Building2 } from "lucide-react";
import School from "../components/School";

export default function SchoolList() {
  const { schools, deleteSchool } = useLms();

  const handleDelete = async (id) => {
    if (window.confirm("Сургууль устгах уу? Энэ сургуулийн бүх курсууд мөн устах болно.")) {
      await deleteSchool(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Сургуулиуд</h1>
          <p className="text-sm text-gray-500 mt-1">Сургуулиудыг удирдах.</p>
        </div>
        <Link
          to="/schools/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Сургууль үүсгэх
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-700">Сургуулийн нэр</th>
                <th className="px-6 py-4 font-medium text-gray-700">Байршил</th>
                <th className="px-6 py-4 font-medium text-gray-700 text-center">Хичээл</th>
                <th className="px-6 py-4 font-medium text-gray-700 text-right">Үйлдлүүд</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schools.map((school) => {
                return <School key={school.id} school={school} handleDelete={handleDelete} />
              })}
              {schools.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900">Сургууль олдсонгүй</p>
                    <p className="text-xs mt-1">Шинэ сургууль үүсгэж эхлээрэй.</p>
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
