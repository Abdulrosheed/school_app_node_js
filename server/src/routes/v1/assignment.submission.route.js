const express = require('express');
const multer = require('multer');

// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const assignmentSubmissionValidation = require('../../validations/assignmentSubmission.validation');
const assignmentSubmissionController = require('../../controllers/assignment.submission.controller');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'assets/assignmentSubmissionImages/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype);
    }
  });
const upload = multer({ storage: storage });


router.post('/assignmentSubmission/create', upload.single('image'),assignmentSubmissionController.createAssignmentSubmission);
// router.get('/assignmentSubmissions' , assignmentSubmissionController.getStudents);
router.get('/assignmentSubmission/:id' , assignmentSubmissionController.getAssignmentSubmission);


module.exports = router;