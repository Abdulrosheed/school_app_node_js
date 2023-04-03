const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const assignmentSubmissionSchema = new mongoose.Schema({
    image: {
        type : String,
        required:true
    },
    user_id: {
        type : String,
        required:true
    },
    assignment_id: {
        type : String,
        required:true
    },
    dateOfSubmission: {
        type : Date,
        required:true
    }
   
    
});

assignmentSubmissionSchema.plugin(toJSON);

const assignmentSubmissionDb = mongoose.model('assignmentSubmissiondb' , assignmentSubmissionSchema);
module.exports = assignmentSubmissionDb;
 
