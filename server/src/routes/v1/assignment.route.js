const express = require('express');
const multer = require('multer');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const assignmentSubmissionValidation = require('../../validations/assignmentSubmission.validation');
const assignmentController = require('../../controllers/assignment.controller');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'assets/assignmentImages/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype);
    }
  });
const upload = multer({ storage: storage });
router.post('/assignment/create', upload.single('image'), assignmentController.createAssignment);
// router.get('/assignmentSubmissions' , assignmentSubmissionController.getStudents);
router.get('/assignment/:id' , assignmentController.getAssignmentsByCourseId);


module.exports = router;