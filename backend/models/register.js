const mongoose = require('mongoose');

const NewUserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
      },
    email:{
        type: String,
        required: true
      },
    password:{
        type: String,
        required: true
      },
    confirmpassword:{
        type: String,
        required: true
      }
},
{ timestamps: true }
);

const NewUser = mongoose.model('NewUser', NewUserSchema);

module.exports = NewUser;
