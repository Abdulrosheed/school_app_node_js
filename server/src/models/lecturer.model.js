const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const lecturerSchema = new mongoose.Schema({
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
lecturerSchema.plugin(toJSON);

 const lecturerDb = mongoose.model('lecturerdb' , lecturerSchema);
 module.exports = lecturerDb;