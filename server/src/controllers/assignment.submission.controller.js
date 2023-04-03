const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { assignmentSubmissionService } = require('../services');
const { assignmentService } = require('../services');

const createAssignmentSubmission = catchAsync(async (req, res) => {
  const assignmentSubmission = await assignmentSubmissionService.createAssignmentSubmission(req.body);
  assignmentService.addassignmentSubmissionToAssignment(req.body.id , assignmentSubmission.id)
  res.status(httpStatus.CREATED).send(assignmentSubmission);
});

const getAssignmentSubmissionsByAssignmentId = catchAsync(async (req, res) => {
  const result = await assignmentSubmissionService.queryAssignmentSubmissions(req.params.id);
  res.send(result);
});

const getAssignmentSubmission = catchAsync(async (req, res) => {
  const assignmentSubmission = await assignmentSubmissionService.getAssignmentSubmissionById(req.params.id);
  if (!assignmentSubmission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AssignmentSubmission not found');
  }
  res.send(assignmentSubmission);
});

// const updateAssignmentSubmission = catchAsync(async (req, res) => {
//   const assignmentSubmission = await assignmentSubmissionService.updateAssignmentSubmissionById(req.params.assignmentSubmissionId, req.body);
//   res.send(assignmentSubmission);
// });

// const deleteAssignmentSubmission = catchAsync(async (req, res) => {
//   await assignmentSubmissionService.deleteAssignmentSubmissionById(req.params.assignmentSubmissionId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createAssignmentSubmission,
  getAssignmentSubmissionsByAssignmentId,
  getAssignmentSubmission,
};
