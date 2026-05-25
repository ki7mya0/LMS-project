const schools = [
  {
    id: '1',
    name: 'Мэдээлэл, Холбоонй Технологийн сургууль',
    location: 'Улаанбаатар',
    contact: 'it-school@lms.mn',
    description: 'Сургалтын системийн технологи, програмчлал, мэдээллийн систем дээр төвлөрсөн боловсролын төв.',
  },
  {
    id: '2',
    name: 'Бизнесийн сургууль',
    location: 'Улаанбаатар',
    contact: 'business-school@lms.mn',
    description: 'Удирдлага, маркетинг, санхүү, хүний нөөцийн чиглэлээр мэргэшүүлэх курс.',
  }
];

const categories = [
  { id: '1', name: 'Компьютер шинжлэл' },
  { id: '2', name: 'Удирдлага' },
  { id: '3', name: 'Маркетинг' }
];

const courses = [
  {
    id: '1',
    name: 'Веб систем ба технологи',
    categoryId: '1',
    instructor: 'Dr. Alan Turing',
    schoolId: '1',
    description: 'React, Node ашиглан веб хөгжүүлэлт сурах анхан шатны курс.',
    order: 1,
  },
  {
    id: '2',
    name: 'Мэдээллийн сан',
    categoryId: '1',
    instructor: 'Prof. Grace Hopper',
    schoolId: '1',
    description: 'SQL, өгөгдлийн сангийн зохион байгуулалт ба практик даалгавар.',
    order: 2,
  },
  {
    id: '3',
    name: 'Удирдлагын үндэс',
    categoryId: '2',
    instructor: 'Dr. John Doe',
    schoolId: '2',
    description: 'Орчин үеийн менежмент, төсөөллийн бодлого, стратеги.',
    order: 3,
  }
];

const lessons = [
  {
    id: '1',
    courseId: '1',
    title: 'HTML үндэс',
    type: 'Lecture',
    duration: '45 mins',
    order: 1,
    youtubeEmbedUrl: '',
    materials: [],
  },
  {
    id: '2',
    courseId: '1',
    title: 'CSS загварчлал',
    type: 'Lecture',
    duration: '50 mins',
    order: 2,
    youtubeEmbedUrl: '',
    materials: [],
  },
  {
    id: '3',
    courseId: '2',
    title: 'SQL сангуудтай ажиллах',
    type: 'Lab',
    duration: '60 mins',
    order: 1,
    youtubeEmbedUrl: '',
    materials: [],
  }
];

const lessonTypes = [
  { id: 'Lecture', name: 'Lecture', priority: 1 },
  { id: 'Seminar', name: 'Seminar', priority: 2 },
  { id: 'Lab', name: 'Lab', priority: 3 },
  { id: 'Assignment', name: 'Assignment', priority: 4 },
  { id: 'Resources', name: 'Resources', priority: 5 }
];

const users = [
  { id: '1', username: 'admin', email: 'admin@lms.mn', password: '123', firstName: 'Админ', role: 'admin' },
  { id: '2', username: 'teacher', email: 'teacher@lms.mn', password: '123', firstName: 'Багш', role: 'instructor' },
  { id: '3', username: 'student', email: 'student@lms.mn', password: '123', firstName: 'Оюутан', role: 'student' }
];

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

module.exports = {
  schools,
  categories,
  courses,
  lessons,
  lessonTypes,
  users,
  newId,
};
