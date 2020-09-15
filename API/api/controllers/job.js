const job_service = require("../services/job");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new job filter
exports.job_new = async (req, res) => {
  try{
    let job = await job_service.new(req.body);
    if ('error' in job){
      res.status(job['status']).json(job)
    }else{
      res.status(201).json(job)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a job option
exports.job_option = async (req, res) => {
    try{
      let job = await job_service.get(req.params.jobID);
      if ('error' in job){
        res.status(job['status']).json(job)
      }else{
        res.status(200).json(job)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all job options
exports.job_all = async (req, res) =>{
    try{
      let all_jobs_options  = await job_service.get_all();
      if("error" in all_jobs_options){
        res.status(all_jobs_options['status']).json(all_jobs_options);
      }else{
        res.status(200).json(all_jobs_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete job option
exports.job_delete = async (req, res) => {
    try{
      let delete_job_option = await job_service.delete(req.params.jobID);
      if("error" in delete_job_option){
        res.status(delete_job_option['status']).json(delete_job_option);
      }else{
        res.status(200).json(delete_job_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update job option
exports.job_update = async (req, res) => {
    try{
      let update_job  = await job_service.update(req.params.jobID, req.body);
      if("error" in update_job){
        res.status(update_job['status']).json(update_job);
      }else{
        res.status(200).json(update_job);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }