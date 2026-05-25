const app = require('./index');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр асаллаа`);
  console.log(`Schools:    http://localhost:${PORT}/api/schools`);
  console.log(`Courses:    http://localhost:${PORT}/api/courses`);
  console.log(`Categories: http://localhost:${PORT}/api/categories`);
  console.log(`Login:      POST http://localhost:${PORT}/api/login`);
});
