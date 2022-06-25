const Job = require("../models/Job")
const { StatusCodes } = require("http-status-codes")
const { BadRequest, NotFound } = require("../errors");
  
const getAllJobs = async (req, res) => {
  const createdBy = req.user.userId;
  const jobs = await Job.find({createdBy});
  res.status(StatusCodes.OK).json({jobs})
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
}

const getJob = async (req, res) => {
  const createdBy = req.user.userId;
  const jobID = req.params.id
  const job = await Job.findOne({createdBy, _id: jobID})
  if (!job) throw new NotFound(`The given id: ${jobID} has no job associated with it`)
  res.status(StatusCodes.OK).json(job)
}

const updateJob = async (req, res) => {
  const createdBy = req.user.userId;
  const jobID = req.params.id
  const { company, position, status } = req.body;
  if (!company || !position || !status)
    throw new BadRequest("Please provide all necessay fields")
  const job = await Job.findOneAndUpdate({createdBy, _id: jobID},
     {company,position, status}, {new: true});
  if (!job) throw new NotFound(`The given id: ${jobID} has no job associated with it`)
  res.status(StatusCodes.OK).json(job);
}

const deleteJob = async (req, res) => {
  const createdBy = req.user.userId;
  const jobID = req.params.id;
  const job = await Job.findOneAndDelete({createdBy, _id: jobID});
  if (!job) throw new NotFound(`The given id: ${jobID} has no job associated with it`);
  res.status(StatusCodes.OK).send();
}

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
}