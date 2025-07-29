const express = require('express');
const { sendCode, verifyCode, getUserProfile, logoutUser, updateProfile, updateProfilePic } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/send-code', sendCode);
router.post('/verify-code', verifyCode);
router.get('/dashboard', verifyToken, getUserProfile);
router.post('/logout', logoutUser);
router.put('/update-profile', verifyToken, updateProfile);
router.put('/update-profile-pic', verifyToken, upload.single('profilePic'), updateProfilePic);

module.exports = router;