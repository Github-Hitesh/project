const { User, Course, Enrollment } = require('../models');


// get stud profile 

exports.getProfile = async (req, res) => {
  try {

    const studentId = req.user.userId;

    
    const studentData = await User.findByPk(studentId, {
      attributes: ['id', 'username', 'email', 'createdAt'], 
      include: {
        model: Course,
        through: { attributes: [] } 
      }
    });

    
    if (!studentData) {
      return res.status(404).json({ message: 'Student profile record could not be found.' });
    }

    
    return res.status(200).json(studentData);

  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal Server Error while retrieving profile data.', 
      error: error.message 
    });
  }
};


// get available 

exports.getAllCourses = async (req, res) => {
  try {

    const courseCatalog = await Course.findAll();
    
    return res.status(200).json(courseCatalog);

  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal Server Error while retrieving course catalog.', 
      error: error.message 
    });
  }
};


// course enroll 

exports.enrollInCourse = async (req, res) => {
  try {
    const studentId = req.user.userId; 
    const { courseId } = req.body;     

    if (!courseId) {
      return res.status(400).json({ message: 'A course selection ID parameter is required.' });
    }

    const targetCourse = await Course.findByPk(courseId);
    if (!targetCourse) {
      return res.status(404).json({ message: 'The requested course does not exist in our system.' });
    }

    const duplicateEnrollment = await Enrollment.findOne({
      where: {
        userId: studentId,
        courseId: courseId
      }
    });

    if (duplicateEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course.' });
    }


    await Enrollment.create({
      userId: studentId,
      courseId: courseId
    });

    return res.status(201).json({ 
      message: `Successfully enrolled in course: ${targetCourse.courseName}!` 
    });

  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal Server Error during the course enrollment transaction.', 
      error: error.message 
    });
  }
};
