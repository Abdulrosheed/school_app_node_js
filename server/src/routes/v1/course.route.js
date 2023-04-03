const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const courseValidation = require('../../validations/course.validation');
const courseController = require('../../controllers/course.controller');

const router = express.Router();


router.post('/course/create', courseController.createCourse);
router.get('/courses' , courseController.getCourses);
router.get('/course/:id' , courseController.getCourse);
// router.delete('/course/delete/:id' , courseController.deleteCourse);
// router.patch('/course/update/:id' , courseController.updateCourse);

module.exports = router;