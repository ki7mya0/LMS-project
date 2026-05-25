const { lessons, newId } = require('../data/store');

exports.getAll = (req, res) => {
  const courseId = req.params.courseId;
  const courseLessons = lessons
    .filter((lesson) => lesson.courseId === courseId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json(courseLessons);
};

exports.getById = (req, res) => {
  const { courseId, id } = req.params;
  const lesson = lessons.find((item) => item.id === id && item.courseId === courseId);
  if (!lesson) return res.status(404).json({ message: 'Сэдэв олдсонгүй' });
  res.json(lesson);
};

exports.create = (req, res) => {
  const lesson = {
    id: newId(),
    courseId: req.params.courseId,
    title: req.body.title || req.body.name || '',
    type: req.body.type || 'Lecture',
    duration: req.body.duration || '',
    order: req.body.order ?? (lessons.filter((item) => item.courseId === req.params.courseId).length + 1),
    youtubeEmbedUrl: req.body.youtubeEmbedUrl || req.body.youtubeUrl || '',
    materials: Array.isArray(req.body.materials) ? req.body.materials : [],
  };
  lessons.push(lesson);
  res.status(201).json(lesson);
};

exports.update = (req, res) => {
  const { courseId, id } = req.params;
  const index = lessons.findIndex((item) => item.id === id && item.courseId === courseId);
  if (index === -1) return res.status(404).json({ message: 'Сэдэв олдсонгүй' });

  lessons[index] = {
    ...lessons[index],
    ...req.body,
    id,
    courseId,
    title: req.body.title || req.body.name || lessons[index].title,
    youtubeEmbedUrl: req.body.youtubeEmbedUrl || req.body.youtubeUrl || lessons[index].youtubeEmbedUrl,
    materials: Array.isArray(req.body.materials) ? req.body.materials : lessons[index].materials,
  };
  res.json(lessons[index]);
};

exports.remove = (req, res) => {
  const { courseId, id } = req.params;
  const index = lessons.findIndex((item) => item.id === id && item.courseId === courseId);
  if (index === -1) return res.status(404).json({ message: 'Сэдэв олдсонгүй' });
  lessons.splice(index, 1);
  res.json({ message: 'Амжилттай устгагдлаа' });
};
