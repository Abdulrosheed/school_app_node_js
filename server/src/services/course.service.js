const httpStatus = require('http-status');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (courseBody) => {
  
  return Course.create(courseBody);
};

/**
 * Query for courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCourses = async () => {
  const courses = await Course.find().populate(['students' , 'lecturers' , 'assignments']);
  return courses;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id) => {
  return Course.findById(id).populate(['students' , 'lecturers' , 'assignments']);
};

/**
 * Get course by email
 * @param {string} email
 * @returns {Promise<Course>}
 */
// const getCourseByEmail = async (email) => {
//   return Course.findOne({ email });
// };

/**
 * Update course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 */
const updateCourseById = async (courseId, updateBody) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  // if (updateBody.email && (await Course.isEmailTaken(updateBody.email, courseId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};
const addLecturerToCourse = async (courseId, lecturerId) => {
    const course = await getCourseById(courseId);
    console.log(course);
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
    }
    course.lecturers.push(lecturerId);
    await course.save()
    return course;
};
const addStudentToCourse = async (courseId, studentId) => {
    const course = await getCourseById(courseId);
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
    }
    course.students.push(studentId);
    await course.save()
    return course;
};
const addAssignmentToCourse = async (courseId, assignmentId) => {
    const course = await getCourseById(courseId);
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
    }
    course.courses.push(assignmentId);
    await course.save()
    return course;
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  await course.remove();
  return course;
};

module.exports = {
  createCourse,
  queryCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  addLecturerToCourse,
  addStudentToCourse,
  addAssignmentToCourse
};
