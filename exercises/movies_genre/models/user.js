const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255
    },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
  },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
  return token;
}

const User = mongoose.model('User', userSchema); 

// We can user npm i joi-password-complexity to give passowrd a pattern

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;