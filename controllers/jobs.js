const { 
  CustomError, 
  BadRequest, 
  Unauthorized, 
  NotFound } = require("../errors");
  
const getAllJobs = (req, res) => {
  throw new BadRequest("Very bad request");
  res.send("get all jobs");
}

const createJob = (req, res) => {
  res.send("create job");
}

const getJob = (req, res) => {
  res.send("get a single job");
}

const updateJob = (req, res) => {
  res.send("update job");
}

const deleteJob = (req, res) => {
  res.send("delete a job");
}

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
}