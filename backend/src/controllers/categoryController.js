const { categories, courses, newId } = require('../data/store');

const getCategoryWithCount = (category) => ({
  ...category,
  coursesCount: courses.filter((course) => course.categoryId === category.id).length,
});

exports.getAll = (req, res) => {
  const list = categories
    .map(getCategoryWithCount)
    .sort((a, b) => a.name.localeCompare(b.name));
  res.json(list);
};

exports.getById = (req, res) => {
  const category = categories.find((item) => item.id === req.params.id);
  if (!category) return res.status(404).json({ message: 'Ангилал олдсонгүй' });
  res.json(getCategoryWithCount(category));
};

exports.create = (req, res) => {
  const category = {
    id: newId(),
    name: req.body.name || '',
  };
  categories.push(category);
  res.status(201).json(getCategoryWithCount(category));
};

exports.update = (req, res) => {
  const index = categories.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Ангилал олдсонгүй' });

  categories[index] = {
    ...categories[index],
    ...req.body,
    id: req.params.id,
  };
  res.json(getCategoryWithCount(categories[index]));
};

exports.remove = (req, res) => {
  const index = categories.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Ангилал олдсонгүй' });
  categories.splice(index, 1);
  res.json({ message: 'Амжилттай устгагдлаа' });
};
