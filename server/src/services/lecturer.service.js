const httpStatus = require('http-status');
const { Lecturer } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Lecturer>}
 */
const createLecturer = async (courseBody) => {
  
  return Lecturer.create(courseBody);
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
const queryLecturers = async () => {
  const courses = await Lecturer.find().populate('courses');
  return courses;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<Lecturer>}
 */
const getLecturerById = async (id) => {
  return Lecturer.findById(id).populate('courses');
};

/**
 * Get course by email
 * @param {string} email
 * @returns {Promise<Lecturer>}
 */
// const getLecturerByEmail = async (email) => {
//   return Lecturer.findOne({ email });
// };

/**
 * Update course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Lecturer>}
 */
const updateLecturerById = async (courseId, updateBody) => {
  const course = await getLecturerById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lecturer not found');
  }
  // if (updateBody.email && (await Lecturer.isEmailTaken(updateBody.email, courseId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};
const addCourseToLecturer = async (lecturerId, courses) => {
    const lecturer = await getLecturerById(lecturerId);
    console.log(lecturer);
    if (!lecturer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
    }
    courses.forEach(element => {

        lecturer.courses.push(element);
    });
    await lecturer.save()
    return lecturer;
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Lecturer>}
 */
const deleteLecturerById = async (courseId) => {
  const course = await getLecturerById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lecturer not found');
  }
  await course.remove();
  return course;
};

module.exports = {
  createLecturer,
  queryLecturers,
  getLecturerById,
  updateLecturerById,
  deleteLecturerById,
  addCourseToLecturer
};
