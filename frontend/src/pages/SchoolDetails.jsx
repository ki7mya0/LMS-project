import React from "react";
import { useParams, Link } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { ArrowLeft, Building2, BookOpen, Users, MapPin } from "lucide-react";


export const SchoolDetails = () => {
  const { school_id } = useParams();
  const { schools } = useLms();

  const school = schools.find((s) => s.id === school_id);

  if (!school) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Сургууль олдсонгүй</h2>
        <Link to="/schools" className="text-indigo-600 hover:underline">Буцах</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link to="/schools" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Буцах
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{school.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {school.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {school.contact}</span>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              {school.description || "No detailed description available for this school."}
            </p>
          </div>
          
          <Link
            to={`/schools/${school.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm shrink-0"
          >
            Сургууль засах
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Холбоотой хичээлүүд
        </h2>
        
        {school.coursesCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center h-32">
              <p className="text-sm text-gray-500 italic">Өгөгдсөн хичээлүүд энд харагдана.</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-900">Хичээл олдсонгүй</h3>
            <p className="text-sm text-gray-500 mt-1">Энэ сургуулид хичээл өгөгдөөгүй байна.</p>
          </div>
        )}
      </div>
    </div>
  );
};
