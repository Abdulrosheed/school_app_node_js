const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const studentSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required:true
    },
    lastName: {
        type : String,
        required:true
    },
    phoneNumber: {
        type : String,
        required:true
    },
    courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "coursedb"
        }
    ],
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "userdb",
        required:true
    }
});

studentSchema.plugin(toJSON);

 const studentDb = mongoose.model('studentdb' , studentSchema);
 module.exports = studentDb;