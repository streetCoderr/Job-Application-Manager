require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'provide your name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please ensure you are putting a valid email address'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please provide your password'],
    minlength: 6
  }
})

UserSchema.pre('save', async function() {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.generateToken = function() {
  return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'});
}

UserSchema.methods.comparePassword = async function(password) {
  let correctPassword = await bcrypt.compare(password, this.password);
  return correctPassword;
}

module.exports = mongoose.model('User', UserSchema);