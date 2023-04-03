const httpStatus = require('http-status');
const { Assignment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a assignment
 * @param {Object} assignmentBody
 * @returns {Promise<Assignment>}
 */
const createAssignment = async (path , assignmentBody) => {
  assignmentBody.image = path;
  return Assignment.create(assignmentBody);
};


/**
 * Query for assignments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAssignments = async (courseId) => {
  const assignments = await Assignment.find({course_id:courseId}).populate("assignmentSubmissions");;
  return assignments;
};

/**
 * Get assignment by id
 * @param {ObjectId} id
 * @returns {Promise<Assignment>}
 */
const getAssignmentById = async (id) => {
  return Assignment.findById(id).populate("assignmentSubmissions");
};

/**
 * Get assignment by email
 * @param {string} email
 * @returns {Promise<Assignment>}
 */
// const getAssignmentByEmail = async (email) => {
//   return Assignment.findOne({ email });
// };

/**
 * Update assignment by id
 * @param {ObjectId} assignmentId
 * @param {Object} updateBody
 * @returns {Promise<Assignment>}
 */
const updateAssignmentById = async (assignmentId, updateBody) => {
  const assignment = await getAssignmentById(assignmentId);
  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
  }
  // if (updateBody.email && (await Assignment.isEmailTaken(updateBody.email, assignmentId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(assignment, updateBody);
  await assignment.save();
  return assignment;
};
const addassignmentSubmissionToAssignment = async (assignmentId, assignmentSubmissionId) => {
    const assignment = await getAssignmentById(assignmentId);
    if (!assignment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
    }
    assignment.assignmentSubmissions.push(assignmentSubmissionId);
    await assignment.save()
    return assignment;
};


/**
 * Delete assignment by id
 * @param {ObjectId} assignmentId
 * @returns {Promise<Assignment>}
 */
const deleteAssignmentById = async (assignmentId) => {
  const assignment = await getAssignmentById(assignmentId);
  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
  }
  await assignment.remove();
  return assignment;
};

module.exports = {
  createAssignment,
  queryAssignments,
  getAssignmentById,
  updateAssignmentById,
  deleteAssignmentById,
  addassignmentSubmissionToAssignment
};
