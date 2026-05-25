const { lessonTypes } = require('../data/store');

exports.getAll = (req, res) => {
  res.json(lessonTypes.sort((a, b) => a.priority - b.priority));
};
