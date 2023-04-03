const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { assignmentService } = require('../services');
const { courseService } = require('../services');

const createAssignment = catchAsync(async (req, res) => {
  const assignment = await assignmentService.createAssignment(req.file.path,req.body);
  courseService.addAssignmentToCourse(req.params.id , assignment.id);
  res.status(httpStatus.CREATED).send(assignment);
});

const getAssignmentsByCourseId = catchAsync(async (req, res) => {
  const result = await assignmentService.queryAssignments(req.params.id);
  res.send(result);
});

const getAssignment = catchAsync(async (req, res) => {
  const assignment = await assignmentService.getAssignmentById(req.params.id);
  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assignment not found');
  }
  res.send(assignment);
});

// const updateAssignment = catchAsync(async (req, res) => {
//   const assignment = await assignmentService.updateAssignmentById(req.params.assignmentId, req.body);
//   res.send(assignment);
// });

// const deleteAssignment = catchAsync(async (req, res) => {
//   await assignmentService.deleteAssignmentById(req.params.assignmentId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createAssignment,
  getAssignmentsByCourseId,
  getAssignment,
  
};
