import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { ArrowLeft, Save, BookOpen, Users, Building2, LayoutGrid, FileText } from "lucide-react";

export const EditCourse = () => {
  const { course_id } = useParams();
  const { courses, categories, schools, createCourse, updateCourse } = useLms();
  const navigate = useNavigate();

  const isEditing = !!course_id;
  const existingCourse = isEditing ? courses.find((c) => c.id === course_id) : null;

  const [name, setName] = useState(existingCourse?.name || "");
  const [categoryId, setCategoryId] = useState(existingCourse?.categoryId || (categories[0]?.id || ""));
  const [instructor, setInstructor] = useState(existingCourse?.instructor || "");
  const [schoolId, setSchoolId] = useState(existingCourse?.schoolId || (schools[0]?.id || ""));
  const [description, setDescription] = useState(existingCourse?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && existingCourse) {
      await updateCourse(existingCourse.id, { name, categoryId, instructor, schoolId, description });
      navigate(`/courses/${existingCourse.id}`);
    } else {
      await createCourse({ name, categoryId, instructor, schoolId, description });
      navigate("/courses");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link to={isEditing ? `/courses/${course_id}` : "/courses"} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Буцах
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200 shadow-sm">
            <BookOpen className="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {isEditing ? "Хичээлийг засах" : "Шинэ хичээл үүсгэх"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isEditing ? "Энэ хичээлийн өгөгдөл болон даалгавруудыг шинэчлэх" : "Шинэ хичээлийн үндсэн бүтцийг тодорхойлох"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Хичээлийн мэдээлэл</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Хичээлийн нэр</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. Advanced Data Structures"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Ангилал</label>
                <div className="relative">
                  <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Ангилал сонгох</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Багшийн нэр</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="e.g. Dr. Alan Turing"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Холбоотой сургууль / байгууллага</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    required
                    value={schoolId}
                    onChange={(e) => setSchoolId(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Сургууль сонгох</option>
                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Хичээлийн тайлбар</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-y"
                    placeholder="Энэ хичээлээр сурах зүйлсийг дүрслэнэ үү"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
            <Link
              to={isEditing ? `/courses/${course_id}` : "/courses"}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Буцах
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {isEditing ? "Хадгалах" : "Үүсгэх"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CreateCourse = EditCourse;
