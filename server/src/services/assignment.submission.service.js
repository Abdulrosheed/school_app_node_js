const httpStatus = require('http-status');
const { AssignmentSubmission } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a assignmentSubmission
 * @param {Object} assignmentSubmissionBody
 * @returns {Promise<AssignmentSubmission>}
 */
const createAssignmentSubmission = async (assignmentSubmissionBody) => {
  
  return AssignmentSubmission.create(assignmentSubmissionBody);
};

/**
 * Query for assignmentSubmissions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAssignmentSubmissions = async (assignmentId) => {
  const assignmentSubmissions = await AssignmentSubmission.find({assignment_id : assignmentId});
  return assignmentSubmissions;
};

/**
 * Get assignmentSubmission by id
 * @param {ObjectId} id
 * @returns {Promise<AssignmentSubmission>}
 */
const getAssignmentSubmissionById = async (id) => {
  return AssignmentSubmission.findById(id);
};

/**
 * Get assignmentSubmission by email
 * @param {string} email
 * @returns {Promise<AssignmentSubmission>}
 */
// const getAssignmentSubmissionByEmail = async (email) => {
//   return AssignmentSubmission.findOne({ email });
// };

/**
 * Update assignmentSubmission by id
 * @param {ObjectId} assignmentSubmissionId
 * @param {Object} updateBody
 * @returns {Promise<AssignmentSubmission>}
 */
const updateAssignmentSubmissionById = async (assignmentSubmissionId, updateBody) => {
  const assignmentSubmission = await getAssignmentSubmissionById(assignmentSubmissionId);
  if (!assignmentSubmission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AssignmentSubmission not found');
  }
  // if (updateBody.email && (await AssignmentSubmission.isEmailTaken(updateBody.email, assignmentSubmissionId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(assignmentSubmission, updateBody);
  await assignmentSubmission.save();
  return assignmentSubmission;
};


/**
 * Delete assignmentSubmission by id
 * @param {ObjectId} assignmentSubmissionId
 * @returns {Promise<AssignmentSubmission>}
 */
const deleteAssignmentSubmissionById = async (assignmentSubmissionId) => {
  const assignmentSubmission = await getAssignmentSubmissionById(assignmentSubmissionId);
  if (!assignmentSubmission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AssignmentSubmission not found');
  }
  await assignmentSubmission.remove();
  return assignmentSubmission;
};

module.exports = {
  createAssignmentSubmission,
  queryAssignmentSubmissions,
  getAssignmentSubmissionById,
  updateAssignmentSubmissionById,
  deleteAssignmentSubmissionById,
};
