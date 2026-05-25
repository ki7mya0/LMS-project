const { courses, lessons, newId } = require('../data/store');

exports.getAll = (req, res) => {
  const { schoolId, categoryId } = req.query;
  let list = [...courses];

  if (schoolId) {
    list = list.filter((course) => course.schoolId === schoolId);
  }
  if (categoryId) {
    list = list.filter((course) => course.categoryId === categoryId);
  }

  res.json(list.sort((a, b) => a.order - b.order));
};

exports.getById = (req, res) => {
  const course = courses.find((item) => item.id === req.params.id);
  if (!course) return res.status(404).json({ message: 'Хичээл олдсонгүй' });
  res.json(course);
};

exports.create = (req, res) => {
  const course = {
    id: newId(),
    name: req.body.name || '',
    categoryId: req.body.categoryId || '',
    instructor: req.body.instructor || '',
    schoolId: req.body.schoolId || '',
    description: req.body.description || '',
    order: req.body.order ?? (courses.length + 1),
  };
  courses.push(course);
  res.status(201).json(course);
};

exports.update = (req, res) => {
  const index = courses.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Хичээл олдсонгүй' });
  courses[index] = {
    ...courses[index],
    ...req.body,
    id: req.params.id,
  };
  res.json(courses[index]);
};

exports.remove = (req, res) => {
  const index = courses.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Хичээл олдсонгүй' });

  const courseId = courses[index].id;
  courses.splice(index, 1);

  for (let i = lessons.length - 1; i >= 0; i -= 1) {
    if (lessons[i].courseId === courseId) lessons.splice(i, 1);
  }

  res.json({ message: 'Амжилттай устгагдлаа' });
};
