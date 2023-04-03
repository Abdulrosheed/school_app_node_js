const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const lecturerValidation = require('../../validations/lecturer.validation');
const lecturerController = require('../../controllers/lecturer.controller');

const router = express.Router();


router.post('/lecturer/create', lecturerController.createLecturer);
router.post('/lecturer/assign/:id', lecturerController.addCourseToLecturer);
router.get('/lecturers' , lecturerController.getLecturers);
router.get('/lecturer/:id' , lecturerController.getLecturer);
// router.delete('/lecturer/delete/:id' , lecturerController.deleteLecturer);
// router.patch('/lecturer/update/:id' , lecturerController.updateLecturer);

module.exports = router;