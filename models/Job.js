const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ['interview', 'declined', 'pending'],
        message: '{VALUE} not supported',
      },
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
