const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const courseSchema = new mongoose.Schema({
    name: {
        type : String,
        required:true
    },
    courseCode: {
        type : String,
        required:true
    },
    description: {
        type : String,
        required:true
    },
    lecturers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "lecturerdb"
        }
    ],
    students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "studentdb"
        }
    ],
    assignments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "assignmentdb"
        }
    ]
    
});

courseSchema.plugin(toJSON);

const courseDb = mongoose.model('coursedb' , courseSchema);
 module.exports = courseDb;