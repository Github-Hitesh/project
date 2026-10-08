const express = require('express');
const router = express.Router();
const { getProfile, getAllCourses, enrollInCourse } = require('../controllers/studentController');
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, getProfile);       
router.get('/courses', verifyToken, getAllCourses);     
router.post('/enroll', verifyToken, enrollInCourse);     

module.exports = router;
