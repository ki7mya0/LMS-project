const { users } = require('../data/store');

exports.login = (req, res) => {
  const { username, email, password } = req.body;
  const input = (username || email || '').toString().trim().toLowerCase();
  const user = users.find(
    (u) =>
      ((u.username && u.username.toLowerCase() === input) ||
       (u.email && u.email.toLowerCase() === input)) &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' });
  }

  const { password: _password, ...safeUser } = user;
  res.json({
    token: `fake-token-${user.id}-${Date.now()}`,
    user: safeUser,
  });
};

exports.me = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token байхгүй' });

  const userId = token.split('-')[2];
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(401).json({ message: 'Хэрэглэгч олдсонгүй' });

  const { password: _password, ...safeUser } = user;
  res.json(safeUser);
};
