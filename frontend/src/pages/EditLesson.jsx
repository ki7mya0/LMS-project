import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { ArrowLeft, Save, Play, Video, FileText, Beaker, PenTool, BookOpen } from "lucide-react";

export const EditLesson = () => {
  const { course_id, lesson_id } = useParams();
  const { lessons, courses, fetchLessons, createLesson, updateLesson } = useLms();
  const navigate = useNavigate();

  const isEditing = !!lesson_id;
  const course = courses.find((c) => c.id === course_id);
  const existingLesson = isEditing ? lessons.find((l) => l.id === lesson_id) : null;

  const [title, setTitle] = useState(existingLesson?.title || "");
  const [type, setType] = useState(existingLesson?.type || "Lecture");
  const [duration, setDuration] = useState(existingLesson?.duration || "");
  const [youtubeUrl, setYoutubeUrl] = useState(existingLesson?.youtubeEmbedUrl || "");
  const [previewId, setPreviewId] = useState(null);

  useEffect(() => {
    const extractYoutubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    if (youtubeUrl) {
      setPreviewId(extractYoutubeId(youtubeUrl));
    } else {
      setPreviewId(null);
    }
  }, [youtubeUrl]);

  useEffect(() => {
    if (!existingLesson && course_id) {
      fetchLessons(course_id).catch(() => {});
    }
  }, [existingLesson, course_id, fetchLessons]);

  if (!course) return <div className="p-8">Хичээл олдсонгүй</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && existingLesson) {
      await updateLesson(course.id, existingLesson.id, { title, type, duration, youtubeEmbedUrl: youtubeUrl });
      navigate(`/courses/${course.id}/lessons/${existingLesson.id}`);
    } else {
      await createLesson(course.id, {
        title,
        type,
        duration,
        order: lessons.filter((l) => l.courseId === course.id).length + 1,
        youtubeEmbedUrl: youtubeUrl,
        materials: []
      });
      navigate(`/courses/${course.id}`);
    }
  };

  const types = [
    { value: "Lecture", label: "Lecture", icon: <Video className="w-5 h-5 text-blue-500" />, desc: "Стандарт бичлэг эсвэл ppt" },
    { value: "Seminar", label: "Seminar", icon: <FileText className="w-5 h-5 text-indigo-500" />, desc: "Интерактив хэлэлцүүлгийн хэсэг" },
    { value: "Lab", label: "Lab", icon: <Beaker className="w-5 h-5 text-emerald-500" />, desc: "Практик хэрэгжүүлэх үйл ажиллагаа" },
    { value: "Assignment", label: "Assignment", icon: <PenTool className="w-5 h-5 text-orange-500" />, desc: "Багийн ажил" },
    { value: "Resources", label: "Resources", icon: <BookOpen className="w-5 h-5 text-gray-500" />, desc: "Унших материалууд" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link to={isEditing ? `/courses/${course.id}/lessons/${lesson_id}` : `/courses/${course.id}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Буцах
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {isEditing ? "Хичээл засах" : "Шинэ хичээл үүсгэх"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? `"${existingLesson?.title}" мэдээллийг засах` : `${course.name}-д шинэ хэсэг нэмэх`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Ерөнхий мэдээлэл</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Хичээлийн нэр</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. Introduction to React Hooks"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Үргэлжлэх хугацаа</label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. 45 mins"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-gray-700">Хичээлийн төрөл</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {types.map((t) => (
                  <label
                    key={t.value}
                    className={`relative flex items-start p-4 cursor-pointer rounded-xl border-2 transition-all ${
                      type === t.value
                        ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="lessonType"
                      value={t.value}
                      checked={type === t.value}
                      onChange={(e) => setType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${type === t.value ? "bg-white shadow-sm" : "bg-gray-50"}`}>
                        {t.icon}
                      </div>
                      <div>
                        <span className={`block text-sm font-semibold ${type === t.value ? "text-indigo-900" : "text-gray-900"}`}>
                          {t.label}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">{t.desc}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" /> YouTube бичлэгийн холбоос
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">YouTube бичлэгийн холбоос</label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500">Энэ хэсэгт лекцийн бичлэгийн холбоосын замыг хуулж оруулна уу</p>
              </div>

              {previewId && (
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                  <div className="p-3 bg-white border-b border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Real-time үзүүлэлт</span>
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Баталгаат URL
                    </span>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 relative bg-black w-full max-w-2xl mx-auto my-4 rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${previewId}`}
                      title="YouTube video player preview"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
            <Link
              to={isEditing ? `/courses/${course.id}/lessons/${lesson_id}` : `/courses/${course.id}`}
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

export const CreateLesson = EditLesson;
