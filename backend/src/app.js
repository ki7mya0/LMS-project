const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/schools');
const categoryRoutes = require('./routes/categories');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');
const lessonTypeRoutes = require('./routes/lessonTypes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/courses', lessonRoutes);
app.use('/api/lesson-types', lessonTypeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

module.exports = app;
