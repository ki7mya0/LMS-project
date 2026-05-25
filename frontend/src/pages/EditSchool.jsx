import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { ArrowLeft, Save, Building2, MapPin, Mail, FileText } from "lucide-react";

export const EditSchool = () => {
  const { school_id } = useParams();
  const { schools, createSchool, updateSchool } = useLms();
  const navigate = useNavigate();

  const isEditing = !!school_id;
  const existingSchool = isEditing ? schools.find((s) => s.id === school_id) : null;

  const [name, setName] = useState(existingSchool?.name || "");
  const [location, setLocation] = useState(existingSchool?.location || "");
  const [contact, setContact] = useState(existingSchool?.contact || "");
  const [description, setDescription] = useState(existingSchool?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && existingSchool) {
      await updateSchool(existingSchool.id, { name, location, contact, description });
    } else {
      await createSchool({ name, location, contact, description });
    }
    navigate("/schools");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link to="/schools" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Сургуулиуд руу буцах
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200 shadow-sm">
            <Building2 className="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {isEditing ? "Сургуулийг профайл засах" : "Шинэ сургууль үүсгэх"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isEditing ? "Сонгогдсон сургуулийн мэдээллийг шинэчлэх" : "Шинэ сургууль эсвэл байгууллага нэмэх."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Сургуулийн мэдээлэл</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Сургуулийн нэр</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="e.g. University of Technology"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Байршил</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Хот, аймаг"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Холбоо барих имэйл</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="contact@must.edu"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Тайлбар</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-y"
                    placeholder="Байгууллагын тухай товч тайлбар оруулна уу..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
            <Link
              to="/schools"
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

export const CreateSchool = EditSchool;
