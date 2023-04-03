const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const adminValidation = require('../../validations/admin.validation');
const adminController = require('../../controllers/student.controller');

const router = express.Router();


router.post('/student/create', adminController.createStudent);
router.post('/student/assign/:id', adminController.addCourseToStudent);

router.get('/students' , adminController.getStudents);
router.get('/student/:id' , adminController.getStudent);
// router.delete('/student/delete/:id' , adminController.deleteStudent);
// router.patch('/student/update/:id' , adminController.updateStudent);

module.exports = router;