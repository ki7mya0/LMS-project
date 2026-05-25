import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from 'hooks/useLocalStorage';

const CourseReport = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { get, set } = useLocalStorage();
  const fetchedRef = useRef(false);

  useEffect(() => {
    fetchedRef.current = false;
  }, [course_id]);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const cachedCourse = get(`course_${course_id}`);
    const cachedLessons = get(`lessons_${course_id}`);
    if (cachedCourse) setCourse(cachedCourse);
    if (cachedLessons) setLessons(cachedLessons);

    if (!cachedCourse) {
      axios.get(`http://localhost:5000/api/courses/${course_id}`)
        .then(r => { set(`course_${course_id}`, r.data); setCourse(r.data); })
        .catch(console.error);
    }
    if (!cachedLessons) {
      axios.get(`http://localhost:5000/api/courses/${course_id}/lessons`)
        .then(r => { set(`lessons_${course_id}`, r.data); setLessons(r.data); })
        .catch(console.error);
    }
  }, [course_id]);

  const typeCounts = lessons.reduce((acc, l) => {
    acc[l.type] = (acc[l.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/courses">Хичээлүүд</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to={`/courses/${course_id}`}>{course?.name}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>Тайлан</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Хичээлийн тайлан</h1>
          <p className="page-subtitle">{course?.name}</p>
        </div>
      </div>
      <div className="stats-grid">
        {[
          { label: 'Нийт хичээл', value: lessons.length },
          { label: 'Лекц', value: typeCounts['Lecture'] || 0 },
          { label: 'Лаборатори', value: typeCounts['Laboratory'] || 0 },
          { label: 'Даалгавар', value: typeCounts['Assignment'] || 0 },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: '20px 22px' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Хичээлийн задаргаа</h2>
        {lessons.length === 0 ? (
          <div style={{ color: '#9ca3af', fontSize: 14 }}>Мэдээлэл байхгүй байна</div>
        ) : (
          Object.entries(typeCounts).map(([type, count]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ width: 100, fontSize: 13, color: '#374151' }}>{type}</span>
              <div style={{ flex: 1, background: '#f3f4f6', borderRadius: 20, height: 10, overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((count / lessons.length) * 100)}%`, height: '100%', background: '#6366f1', borderRadius: 20 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, width: 24, textAlign: 'right' }}>{count}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseReport;