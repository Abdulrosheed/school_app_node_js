const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');
const { courseService } = require('../services');
const { userService } = require('../services');


const createStudent = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.email , req.body.passWord ,  "Student");
  console.log(user);
  req.body.user_id = user.id;
    const student = await studentService.createStudent(req.body);
  res.status(httpStatus.CREATED).send(student);
});

const getStudents = catchAsync(async (req, res) => {
  const result = await studentService.queryStudents();
  res.send(result);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  res.send(student);
});
const addCourseToStudent = catchAsync(async (req, res) => {
  const student = await studentService.addCourseToStudent(req.params.id , req.body.courses);
  req.body.courses.forEach(element => {
     courseService.addStudentToCourse(element , req.params.id);

  });
 res.status(httpStatus.CREATED).send(student);
});

// const updateStudent = catchAsync(async (req, res) => {
//   const student = await studentService.updateStudentById(req.params.studentId, req.body);
//   res.send(student);
// });

// const deleteStudent = catchAsync(async (req, res) => {
//   await studentService.deleteStudentById(req.params.studentId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  addCourseToStudent
};
