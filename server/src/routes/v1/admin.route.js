const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const assignmentSubmissionValidation = require('../../validations/assignmentSubmission.validation');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();


router.post('/admin/create', adminController.createAdmin);
router.get('/admins' , adminController.getAdmins);
router.get('/admin/:id' , adminController.getAdmin);
// router.delete('/lecturer/delete/:id' , adminController.deleteAdmin);
// router.get('/assignmentSubmissions' , assignmentSubmissionController.getStudents);
// router.get('/as/:id' , assignmentSubmissionController.getAssignmentSubmission);


module.exports = router;