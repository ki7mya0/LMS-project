import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLms } from "context/LmsContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  GripVertical, 
  Plus, 
  Edit2, 
  Trash2, 
  Video, 
  FileText, 
  Beaker, 
  PenTool, 
  MoreVertical,
  ArrowLeft,
  Calendar,
  Clock,
  Play
} from "lucide-react";

const ItemType = "LESSON";

const DraggableLesson = ({ lesson, index, moveLesson, onEdit, onDelete, courseId }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveLesson(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: () => {
      return { id: lesson.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const getIconForType = (type) => {
    switch (type) {
      case "Lecture": return <Video className="w-4 h-4 text-blue-500" />;
      case "Seminar": return <FileText className="w-4 h-4 text-indigo-500" />;
      case "Lab": return <Beaker className="w-4 h-4 text-emerald-500" />;
      case "Assignment": return <PenTool className="w-4 h-4 text-orange-500" />;
      default: return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-handler-id={handlerId}
      className="bg-white rounded-lg border border-gray-200 shadow-sm mb-3 group hover:border-indigo-200 transition-colors"
    >
      <div className="flex items-center p-3">
        <div className="cursor-grab active:cursor-grabbing p-1.5 text-gray-400 hover:text-gray-600 mr-2" ref={preview}>
          <GripVertical className="w-4 h-4" />
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors mr-2"
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 border border-gray-100">
          {getIconForType(lesson.type)}
        </div>
        
        <div className="flex-1">
          <Link to={`/courses/${courseId}/lessons/${lesson.id}`} className="font-medium text-gray-900 hover:text-indigo-600 hover:underline inline-block text-sm">
            Module {index + 1}: {lesson.title}
          </Link>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
            <span className="px-2 py-0.5 rounded-full bg-gray-100 font-medium">{lesson.type}</span>
            {lesson.youtubeEmbedUrl && (
              <span className="flex items-center gap-1 text-red-600"><Play className="w-3 h-3" /> Video included</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/courses/${courseId}/lessons/${lesson.id}/edit`}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(lesson.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50/50 rounded-b-lg ml-12 pl-10 border-l-2 border-l-indigo-200">
          <p className="text-sm text-gray-600 mb-3">Энэ хичээлийн хөтөлбөр:</p>
          {(!lesson.materials?.length && !lesson.youtubeEmbedUrl) ? (
            <p className="text-xs text-gray-400 italic">Хавсралт оруулаагүй байна.</p>
          ) : (
            <ul className="space-y-2">
              {lesson.youtubeEmbedUrl && (
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <Play className="w-4 h-4 text-red-500" />
                  Embedded Video Lecture
                </li>
              )}
              {lesson.materials?.map((mat, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText className="w-4 h-4 text-gray-400" />
                  {mat}
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-4 pt-3 border-t border-gray-200/60 flex gap-3">
            <Link
              to={`/courses/${courseId}/lessons/${lesson.id}`}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Хичээлийн дэлгэрэнгүй →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export const CourseDetails = () => {
  const { course_id } = useParams();
  const { courses, categories, lessons, setLessons, fetchLessons, deleteLesson } = useLms();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === course_id);
  const category = categories.find((c) => c.id === course?.categoryId);
  
  const courseLessons = lessons
    .filter((l) => l.courseId === course_id)
    .sort((a, b) => a.order - b.order);

  const [localLessons, setLocalLessons] = useState(courseLessons);

  // Sync when context updates
  React.useEffect(() => {
    setLocalLessons(
      lessons.filter((l) => l.courseId === course_id).sort((a, b) => a.order - b.order)
    );
  }, [lessons, course_id]);

  const moveLesson = useCallback((dragIndex, hoverIndex) => {
    setLocalLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      const draggedLesson = newLessons[dragIndex];
      newLessons.splice(dragIndex, 1);
      newLessons.splice(hoverIndex, 0, draggedLesson);
      
      // Update order in context as well (simulating API call)
      const updatedOrder = newLessons.map((l, idx) => ({ ...l, order: idx + 1 }));
      setLessons((globalLessons) => {
        return globalLessons.map(gl => {
          if (gl.courseId === course_id) {
            const updated = updatedOrder.find(ul => ul.id === gl.id);
            return updated ? updated : gl;
          }
          return gl;
        });
      });
      
      return updatedOrder;
    });
  }, [course_id, setLessons]);

  useEffect(() => {
    if (course_id) {
      fetchLessons(course_id).catch(() => {});
    }
  }, [course_id, fetchLessons]);

  const handleDeleteLesson = async (id) => {
    if (window.confirm("Delete this lesson?")) {
      await deleteLesson(course_id, id);
    }
  };

  if (!course) {
    return <div className="p-8 text-center text-gray-500">Хичээл олдсонгүй</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link to="/courses" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Хичээл рүү буцах
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 mb-3 uppercase tracking-wider">
                {category?.name || "Uncategorized"}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{course.name}</h1>
            </div>
            <p className="text-gray-600 max-w-2xl leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Instructor</p>
                  <p className="text-sm font-semibold text-gray-900">{course.instructor}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Үргэлжлэх хугацаа</p>
                  <p className="text-sm font-semibold text-gray-900">{localLessons.length} Хэсэг</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              to={`/courses/${course.id}/edit`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              Хичээлийн тохиргоо
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Хичээлийн хөтөлбөр</h2>
            <p className="text-sm text-gray-500 mt-1">Хичээлийг эрэмблэхийн тулд чирж байрлуулна уу.</p>
          </div>
          <Link
            to={`/courses/${course.id}/lessons/create`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Хичээл нэмэх
          </Link>
        </div>
        
        <div className="p-6">
          <DndProvider backend={HTML5Backend}>
            {localLessons.length > 0 ? (
              <div className="space-y-1">
                {localLessons.map((lesson, index) => (
                  <DraggableLesson
                    key={lesson.id}
                    index={index}
                    lesson={lesson}
                    moveLesson={moveLesson}
                    onEdit={() => navigate(`/courses/${course.id}/lessons/${lesson.id}/edit`)}
                    onDelete={handleDeleteLesson}
                    courseId={course.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Хөтөлбөр хоосон</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4 max-w-sm mx-auto">Хичээлийн хөтөлбөрийг бүтээхийн тулд анхны хичээл нэмж эхлэнэ үү.</p>
                <Link
                  to={`/courses/${course.id}/lessons/create`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Хамгийн эхний хичээл нэмэх
                </Link>
              </div>
            )}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};
