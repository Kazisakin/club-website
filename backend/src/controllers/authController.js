const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

require('dotenv').config();

// Configure multer for local file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

let verificationCodes = {};

const sendCode = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith('@unb.ca')) {
    return res.status(400).json({ error: 'Please use a valid @unb.ca email address.' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your UNB BSS Login Code',
    text: `Your login code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    verificationCodes[email] = code;
    console.log(`Verification code ${code} sent to ${email}`);
    res.json({ message: 'Code sent to your email.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send code' });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!verificationCodes[email]) {
    return res.status(400).json({ error: 'No code sent for this email' });
  }

  if (verificationCodes[email] === code) {
    try {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: { 
            email, 
            firstName: 'New', 
            lastName: 'User', 
            studentId: 'TEMPORARY_ID', 
            facultyStatus: 'Engineering',
            membership: false 
          },
        });
        console.log(`New user created with ID: ${user.id}`);
      }
      delete verificationCodes[email];
      res.json({ message: 'Login successful', token, userId: user.id }); // Return user ID for reference
    } catch (error) {
      console.error('Error in verifyCode:', error);
      res.status(500).json({ error: 'Internal server error during verification' });
    }
  } else {
    res.status(400).json({ error: 'Invalid code' });
  }
};

const getUserProfile = async (req, res) => {
  const { email } = req.user;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    id: user.id, // Include unique ID
    firstName: user.firstName,
    lastName: user.lastName,
    studentId: user.studentId || '',
    facultyStatus: user.facultyStatus,
    profilePic: user.profilePic || '/default-profile.jpg',
    membershipExpire: user.membershipExpire ? user.membershipExpire.toISOString() : '',
  });
};

const updateProfile = async (req, res) => {
  const { email } = req.user;
  const { firstName, lastName, studentId, facultyStatus } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { firstName, lastName, studentId, facultyStatus, updatedAt: new Date() },
    });
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Middleware to handle file upload
const uploadMiddleware = upload.single('profilePic');

const updateProfilePic = async (req, res) => {
  const { email } = req.user;

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`; // Relative path for database
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      await prisma.user.update({
        where: { email },
        data: { profilePic: filePath, updatedAt: new Date() },
      });

      res.json({ message: 'Profile picture updated successfully', profilePic: filePath });
    } catch (error) {
      console.error('Update profile pic error:', error);
      await fs.unlink(path.join(__dirname, '../public', filePath.slice(1))).catch((e) => console.error('Failed to delete file:', e));
      res.status(500).json({ error: 'Failed to update profile picture' });
    }
  });
};

const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = { sendCode, verifyCode, getUserProfile, logoutUser, updateProfile, updateProfilePic };