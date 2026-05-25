import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LmsContext = createContext(undefined);

const API = 'http://localhost:5000/api';
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

// ── localStorage cache helper ──────────────────────────────
const cache = {
  get: (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const { data, timestamp } = JSON.parse(raw);
      if (Date.now() - timestamp > CACHE_TTL) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch { return null; }
  },
  set: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key); } catch {}
  },
  clear: (prefix) => {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => localStorage.removeItem(k));
    } catch {}
  }
};

// ── axios-д token автоматаар нэмэх ────────────────────────
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = {
  get:    (url)       => axios.get(`${API}${url}`,        { headers: authHeader() }),
  post:   (url, data) => axios.post(`${API}${url}`, data,  { headers: authHeader() }),
  put:    (url, data) => axios.put(`${API}${url}`, data,   { headers: authHeader() }),
  delete: (url)       => axios.delete(`${API}${url}`,      { headers: authHeader() }),
};

// ──────────────────────────────────────────────────────────

export const LmsProvider = ({ children }) => {
  const [schools,     setSchools]     = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [courses,     setCourses]     = useState([]);
  const [lessons,     setLessons]     = useState([]);
  const [lessonTypes, setLessonTypes] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const fetchedRef = useRef(false);

  // ── Эхний ачаалалт ──────────────────────────────────────
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const endpoints = [
      { key: 'lms_schools',     setter: setSchools,     url: '/schools' },
      { key: 'lms_categories',  setter: setCategories,  url: '/categories' },
      { key: 'lms_courses',     setter: setCourses,     url: '/courses' },
      { key: 'lms_lessonTypes', setter: setLessonTypes, url: '/lesson-types' },
    ];

    Promise.all(
      endpoints.map(async ({ key, setter, url }) => {
        const cached = cache.get(key);
        if (cached) { setter(cached); return; }
        try {
          const res = await api.get(url);
          cache.set(key, res.data);
          setter(res.data);
        } catch (err) {
          console.warn(`${url} fetch failed:`, err.message);
        }
      })
    ).finally(() => setLoading(false));
  }, []);

  // ── SCHOOL CRUD ─────────────────────────────────────────

  const createSchool = async (data) => {
    const res = await api.post('/schools', data);
    cache.remove('lms_schools');
    setSchools(prev => [...prev, res.data]);
    return res.data;
  };

  const updateSchool = async (id, data) => {
    const res = await api.put(`/schools/${id}`, data);
    cache.remove('lms_schools');
    cache.remove(`lms_school_${id}`);
    setSchools(prev => prev.map(s => s.id === id || s._id === id ? res.data : s));
    return res.data;
  };

  const deleteSchool = async (id) => {
    await api.delete(`/schools/${id}`);
    cache.remove('lms_schools');
    cache.remove(`lms_school_${id}`);
    setSchools(prev => prev.filter(s => s.id !== id && s._id !== id));
  };

  // ── CATEGORY CRUD ────────────────────────────────────────

  const createCategory = async (data) => {
    const res = await api.post('/categories', data);
    cache.remove('lms_categories');
    setCategories(prev => [...prev, res.data]);
    return res.data;
  };

  const updateCategory = async (id, data) => {
    const res = await api.put(`/categories/${id}`, data);
    cache.remove('lms_categories');
    setCategories(prev => prev.map(c => c.id === id || c._id === id ? res.data : c));
    return res.data;
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    cache.remove('lms_categories');
    setCategories(prev => prev.filter(c => c.id !== id && c._id !== id));
  };

  // ── COURSE CRUD ──────────────────────────────────────────

  const createCourse = async (data) => {
    const res = await api.post('/courses', data);
    cache.remove('lms_courses');
    setCourses(prev => [...prev, res.data]);
    return res.data;
  };

  const updateCourse = async (id, data) => {
    const res = await api.put(`/courses/${id}`, data);
    cache.remove('lms_courses');
    cache.remove(`lms_course_${id}`);
    setCourses(prev => prev.map(c => c.id === id || c._id === id ? res.data : c));
    return res.data;
  };

  const deleteCourse = async (id) => {
    await api.delete(`/courses/${id}`);
    cache.remove('lms_courses');
    cache.remove(`lms_course_${id}`);
    cache.clear(`lms_lessons_${id}`);
    setCourses(prev => prev.filter(c => c.id !== id && c._id !== id));
    setLessons(prev => prev.filter(l => l.course_id !== id && l.courseId !== id));
  };

  // ── LESSON CRUD ──────────────────────────────────────────

  const fetchLessons = async (course_id) => {
    const key = `lms_lessons_${course_id}`;
    const cached = cache.get(key);
    if (cached) {
      setLessons(prev => {
        const others = prev.filter(l => l.course_id !== course_id && l.courseId !== course_id);
        return [...others, ...cached];
      });
      return cached;
    }
    const res = await api.get(`/courses/${course_id}/lessons`);
    cache.set(key, res.data);
    setLessons(prev => {
      const others = prev.filter(l => l.course_id !== course_id && l.courseId !== course_id);
      return [...others, ...res.data];
    });
    return res.data;
  };

  const createLesson = async (course_id, data) => {
    const res = await api.post(`/courses/${course_id}/lessons`, data);
    cache.remove(`lms_lessons_${course_id}`);
    setLessons(prev => [...prev, res.data]);
    return res.data;
  };

  const updateLesson = async (course_id, lesson_id, data) => {
    const res = await api.put(`/courses/${course_id}/lessons/${lesson_id}`, data);
    cache.remove(`lms_lessons_${course_id}`);
    cache.remove(`lms_lesson_${lesson_id}`);
    setLessons(prev => prev.map(l =>
      l.id === lesson_id || l._id === lesson_id ? res.data : l
    ));
    return res.data;
  };

  const deleteLesson = async (course_id, lesson_id) => {
    await api.delete(`/courses/${course_id}/lessons/${lesson_id}`);
    cache.remove(`lms_lessons_${course_id}`);
    cache.remove(`lms_lesson_${lesson_id}`);
    setLessons(prev => prev.filter(l => l.id !== lesson_id && l._id !== lesson_id));
  };

  return (
    <LmsContext.Provider value={{
      // State
      schools, categories, courses, lessons, lessonTypes, loading,

      // Legacy direct setters (хуучин код ажиллуулахын тулд)
      setSchools, setCategories, setCourses, setLessons,

      // School
      createSchool, updateSchool, deleteSchool,

      // Category
      createCategory, updateCategory, deleteCategory,

      // Course
      createCourse, updateCourse, deleteCourse,

      // Lesson
      fetchLessons, createLesson, updateLesson, deleteLesson,
    }}>
      {children}
    </LmsContext.Provider>
  );
};

export const useLms = () => {
  const context = useContext(LmsContext);
  if (!context) throw new Error('useLms must be used within an LmsProvider');
  return context;
};