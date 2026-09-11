import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ admin: true }, process.env.ADMIN_JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
} 