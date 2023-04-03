const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lecturerService, userService } = require('../services');
const { courseService } = require('../services');


const createLecturer = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.email , req.body.passWord ,  "Lecturer");
  console.log(user);
  req.body.user_id = user.id;
    const lecturer = await lecturerService.createLecturer(req.body);
    // courseService.addLecturerToCourse(req.body.course_id , lecturer.id);
    // lecturerService.addCourseToLecturer(lecturer.id , req.body.courses);
  res.status(httpStatus.CREATED).send(lecturer);
});
const addCourseToLecturer = catchAsync(async (req, res) => {
  req.body.courses.forEach(element => {
    courseService.addLecturerToCourse(element , req.params.id);

  });
    const lecturer = await lecturerService.addCourseToLecturer(req.params.id , req.body.courses);
  res.status(httpStatus.CREATED).send(lecturer);
});

const getLecturers = catchAsync(async (req, res) => {
  const result = await lecturerService.queryLecturers();
  res.send(result);
});

const getLecturer = catchAsync(async (req, res) => {
  const lecturer = await lecturerService.getLecturerById(req.params.id);
  if (!lecturer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lecturer not found');
  }
  res.send(lecturer);
});

// const updateLecturer = catchAsync(async (req, res) => {
//   const lecturer = await lecturerService.updateLecturerById(req.params.lecturerId, req.body);
//   res.send(lecturer);
// });

// const deleteLecturer = catchAsync(async (req, res) => {
//   await lecturerService.deleteLecturerById(req.params.lecturerId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createLecturer,
  getLecturers,
  getLecturer,
  addCourseToLecturer
};
