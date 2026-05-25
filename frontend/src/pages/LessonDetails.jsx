import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { 
  ArrowLeft, Edit2, Trash2, Clock, 
  FileText, Play, UploadCloud, 
  X, CheckCircle, Video, PlayCircle
} from "lucide-react";

export const LessonDetails = () => {
  const { course_id, lesson_id } = useParams();
  const { lessons, courses, deleteLesson, fetchLessons, setLessons } = useLms();
  const navigate = useNavigate();

  const lesson = lessons.find((l) => l.id === lesson_id);
  const course = courses.find((c) => c.id === course_id);

  useEffect(() => {
    if (!lesson && course_id) {
      fetchLessons(course_id).catch(() => {});
    }
  }, [lesson, course_id, fetchLessons]);

  const [activeTab, setActiveTab] = useState("materials");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!lesson || !course) {
    return <div className="p-8 text-center text-gray-500">Lesson not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      await deleteLesson(course_id, lesson.id);
      navigate(`/courses/${course.id}`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    // Mock upload by adding file names to the lesson's materials
    const newMaterials = files.map(f => f.name);
    setLessons(prev => prev.map(l => {
      if (l.id === lesson.id) {
        return {
          ...l,
          materials: [...(l.materials || []), ...newMaterials]
        };
      }
      return l;
    }));
  };

  const removeMaterial = (index) => {
    setLessons(prev => prev.map(l => {
      if (l.id === lesson.id && l.materials) {
        const newMats = [...l.materials];
        newMats.splice(index, 1);
        return { ...l, materials: newMats };
      }
      return l;
    }));
  };

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = lesson.youtubeEmbedUrl ? extractYoutubeId(lesson.youtubeEmbedUrl) : null;
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link to={`/courses/${course.id}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Хөтөлбөр лүү буцах
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
          <div className="flex flex-col sm:flex-row justify-between gap-6 items-start">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-indigo-700 shadow-sm border border-indigo-100 uppercase tracking-wider">
                  Module {lesson.order}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 shadow-sm border border-gray-200 uppercase tracking-wider">
                  {lesson.type}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{lesson.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium pt-1">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-500" /> {lesson.duration}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span><Link to={`/courses/${course.id}`} className="text-indigo-600 hover:underline">{course.name}</Link></span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
              <Link
                to={`/courses/${course.id}/lessons/${lesson.id}/edit`}
                className="flex items-center justify-center gap-2 px-3 py-1.5 text-gray-600 text-sm font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Засах
              </Link>
              <div className="w-px h-6 bg-gray-200"></div>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 px-3 py-1.5 text-gray-600 text-sm font-medium rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Устгах
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white">
          <nav className="flex -mb-px overflow-x-auto px-6">
            <button
              onClick={() => setActiveTab("materials")}
              className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "materials"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Сурах материалууд
              </div>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "video"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Видео лекц
              </div>
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "assignments"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Даалгаврууд
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6 sm:p-8 bg-gray-50 min-h-[400px]">
          {activeTab === "materials" && (
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging ? "border-indigo-500 bg-indigo-50 scale-[1.01]" : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Суралцах материалууд оруулах</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                  PPT, PDF, DOCX, эсвэл зурган file-ууд чирж оруулах, эсвэл дарж сонгох.
                </p>
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Файл сонгох
                </button>
              </div>

              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  Оруулсан материалууд ({lesson.materials?.length || 0})
                </h4>
                
                {(!lesson.materials || lesson.materials.length === 0) ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <p className="text-sm text-gray-500">Оруулсан материал байхгүй байна.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {lesson.materials.map((mat, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-3 group hover:border-indigo-300 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-sm font-medium text-gray-900 truncate" title={mat}>{mat}</p>
                          <p className="text-xs text-gray-500 mt-1 uppercase">Document</p>
                        </div>
                        <button 
                          onClick={() => removeMaterial(i)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "video" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {embedUrl ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
                  <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden bg-black w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={embedUrl}
                      title="YouTube video player"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 mt-2 rounded-b-lg">
                    <p className="text-sm font-medium text-gray-900">Embedded Video Lecture</p>
                    <Link
                      to={`/courses/${course.id}/lessons/${lesson.id}/edit`}
                      className="text-xs font-medium text-indigo-600 hover:underline"
                    >
                      Change Video URL
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Video Embedded</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                    Enhance your lesson by embedding a YouTube lecture or demonstration video.
                  </p>
                  <Link
                    to={`/courses/${course.id}/lessons/${lesson.id}/edit`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Add YouTube URL
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-center py-16">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Даалгаврын хэсэг</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                Оюутнуудад зориулсан асуулт хариулт, эссе, код бичих даалгавруудыг үүсгэж, удирдаарай.
              </p>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Даалгавар үүсгэх
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
