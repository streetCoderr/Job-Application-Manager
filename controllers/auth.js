require('dotenv').config();
const User = require('../models/User');

const { StatusCodes } = require('http-status-codes');
const { BadRequest, Unauthorized } = require("../errors");

const register = async (req, res) => {  
  const user = await User.create({...req.body});
  res.status(StatusCodes.CREATED).json({user: {name: user.name}, token: user.generateToken()});
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    throw new BadRequest("Please provide email and password")
  const user = await User.findOne({email: email.toLowerCase().trim()});
  if (!user) throw new Unauthorized('Invalid credentials');
  let correctPassword = await user.comparePassword(password);
  if (!correctPassword) throw new Unauthorized('Invalid credentials');
  res.status(StatusCodes.OK).json({user: {name: user.name}, token: user.generateToken()})
}


module.exports = {login, register};