const { schools, courses, lessons, newId } = require('../data/store');

const getSchoolWithCount = (school) => ({
  ...school,
  coursesCount: courses.filter((course) => course.schoolId === school.id).length,
});

exports.getAll = (req, res) => {
  const list = schools
    .map(getSchoolWithCount)
    .sort((a, b) => a.name.localeCompare(b.name));
  res.json(list);
};

exports.getById = (req, res) => {
  const school = schools.find((item) => item.id === req.params.id);
  if (!school) return res.status(404).json({ message: 'Сургууль олдсонгүй' });
  res.json(getSchoolWithCount(school));
};

exports.create = (req, res) => {
  const school = {
    id: newId(),
    name: req.body.name || '',
    location: req.body.location || '',
    contact: req.body.contact || '',
    description: req.body.description || '',
  };
  schools.push(school);
  res.status(201).json(getSchoolWithCount(school));
};

exports.update = (req, res) => {
  const index = schools.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Сургууль олдсонгүй' });

  schools[index] = {
    ...schools[index],
    ...req.body,
    id: req.params.id,
  };
  res.json(getSchoolWithCount(schools[index]));
};

exports.remove = (req, res) => {
  const index = schools.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Сургууль олдсонгүй' });

  const schoolId = schools[index].id;
  schools.splice(index, 1);

  // Remove related courses and lessons
  const removedCourseIds = courses.filter((course) => course.schoolId === schoolId).map((course) => course.id);
  for (const id of removedCourseIds) {
    const courseIndex = courses.findIndex((course) => course.id === id);
    if (courseIndex !== -1) courses.splice(courseIndex, 1);
  }
  for (let i = lessons.length - 1; i >= 0; i -= 1) {
    if (removedCourseIds.includes(lessons[i].courseId)) lessons.splice(i, 1);
  }

  res.json({ message: 'Амжилттай устгагдлаа' });
};
