const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const assignmentSchema = new mongoose.Schema({
    image: {
        type : String,
        required:true
    },
    user_id: {
        type : String,
        required:true
    },
    course_id: {
        type : String,
        required:true
    },
    lastDateOfSubmission: {
        type : Date,
        required:true
    },
    assignmentSubmissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "assignmentSubmissiondb"
        }
    ]
   
    
});
assignmentSchema.plugin(toJSON);

const assignmentDb = mongoose.model('assignmentdb' , assignmentSchema);
module.exports = assignmentDb;
 
