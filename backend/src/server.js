const express = require('express');
const cors = require('cors');
const authRoutes = require('./controllers/authController');
const prisma = require('./prismaClient');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

// Allow CORS for local development
app.use(cors({
  origin: 'http://localhost:3000', // Matches Next.js default port
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, '../public')));

// Auth routes
app.post('/api/auth/send-code', authRoutes.sendCode);
app.post('/api/auth/verify-code', authRoutes.verifyCode);
app.get('/api/auth/dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = { email: decoded.email };
    authRoutes.getUserProfile(req, res);
  });
});
app.put('/api/auth/update-profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = { email: decoded.email };
    authRoutes.updateProfile(req, res);
  });
});
app.put('/api/auth/update-profile-pic', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = { email: decoded.email };
    authRoutes.updateProfilePic(req, res);
  });
});
app.post('/api/auth/logout', authRoutes.logoutUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));