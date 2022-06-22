const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Try again later"
  }
  return res.status(error.statusCode).json({msg: error.message});
}

module.exports = errorHandler