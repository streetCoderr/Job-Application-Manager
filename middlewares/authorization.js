require('dotenv').config()
const jwt = require("jsonwebtoken")
const { Unauthorized } = require("../errors")

const authorize = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer "))
    throw new Unauthorized("Authorization failed. Login to continue");
  const token = req.headers.authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = {userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new Unauthorized("Authorization failed. Login to continue");
  }
}

module.exports = authorize