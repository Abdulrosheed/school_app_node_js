const mongoose = require('mongoose');

const connectionString = async () =>
{

    mongoose.connect("mongodb+srv://admin:admin12345@cluster0.x9x0bmj.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
    })
  .catch((error) => {
        console.log('Error connecting to database: ', error);
  });
    
}

module.exports = connectionString;