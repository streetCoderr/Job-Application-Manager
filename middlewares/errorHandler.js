const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Try again later"
  }

  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `The provided id: ${err.value} is not a valid id`
  }

  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = Object.values(err.errors).map(val => val.message).join('; ')
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Please use another ${Object.keys(err.keyValue)}; ${Object.values(err.keyValue)} has been taken already`
  }
  return res.status(customError.statusCode).json({msg: customError.message});
}

module.exports = errorHandler