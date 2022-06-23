require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, Unauthorized } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequest("Please provide all fields")
  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({name, email, password: hashedPassword});
  if (!user) throw new Error();
  let token = jwt.sign({userId: user._id, name}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'});
  res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) 
    throw new BadRequest('Please provide both email and password');
  const user = await User.findOne({email});
  if (!user) throw new Unauthorized('Invalid credentials');
  let correctPassword = await bcrypt.compare(password, user.password)
  if (!correctPassword) throw new Unauthorized('Invalid credentials');
  let token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'});
  res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}


module.exports = {login, register};