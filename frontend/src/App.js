import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { LmsProvider } from "context/LmsContext";
import { AuthProvider } from "context/AuthContext";
import './index.css';

import { MainLayout } from "components/MainLayout";

// ── Named import болгох ──
import Login from "pages/Login";
import CourseList from "pages/CourseList";
import { CourseDetails } from "pages/CourseDetails";
import { EditCourse, CreateCourse } from "pages/EditCourse";

import { LessonDetails } from "pages/LessonDetails";
import { EditLesson, CreateLesson } from "pages/EditLesson";

import SchoolList from "pages/SchoolList";
import { SchoolDetails } from "pages/SchoolDetails";
import { EditSchool, CreateSchool } from "pages/EditSchool";

import CategoryList from "pages/CategoryList";
import { ReportPage } from "pages/ReportPage";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/courses" replace /> },

      { path: "courses", element: <CourseList /> },
      { path: "courses/create", element: <CreateCourse /> },
      { path: "courses/:course_id", element: <CourseDetails /> },
      { path: "courses/:course_id/edit", element: <EditCourse /> },
      { path: "courses/:course_id/report", element: <ReportPage /> },

      { path: "courses/:course_id/lessons/create", element: <CreateLesson /> },
      { path: "courses/:course_id/lessons/:lesson_id", element: <LessonDetails /> },
      { path: "courses/:course_id/lessons/:lesson_id/edit", element: <EditLesson /> },

      { path: "schools", element: <SchoolList /> },
      { path: "schools/create", element: <CreateSchool /> },
      { path: "schools/:school_id", element: <SchoolDetails /> },
      { path: "schools/:school_id/edit", element: <EditSchool /> },

      { path: "categories", element: <CategoryList /> },
      { path: "report", element: <ReportPage /> },

      { path: "*", element: <div className="p-8 text-center text-gray-500">Page not found</div> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <LmsProvider>
        <RouterProvider router={router} />
      </LmsProvider>
    </AuthProvider>
  );
}