const request_service = require("../services/request");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new request filter
exports.request_new = async (req, res) => {
  try{
    let request = await request_service.new(req.body);
    if ('error' in request){
      res.status(request['status']).json(request)
    }else{
      res.status(201).json(request)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a request option
exports.request_option = async (req, res) => {
    try{
      let request = await request_service.get(req.params.requestID);
      if ('error' in request){
        res.status(request['status']).json(request)
      }else{
        res.status(200).json(request)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//list a user request option
exports.request_option = async (req, res) => {
    try{
      let request = await request_service.get(req.params.userID);
      if ('error' in request){
        res.status(request['status']).json(request)
      }else{
        res.status(200).json(request)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all user request options
exports.request_all = async (req, res) =>{
    try{
      let all_requests_options  = await request_service.get_all();
      if("error" in all_requests_options){
        res.status(all_requests_options['status']).json(all_requests_options);
      }else{
        res.status(200).json(all_requests_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a user request option
exports.request_delete = async (req, res) => {
    try{
      let delete_request_option = await request_service.delete(req.params.requestID);
      if("error" in delete_request_option){
        res.status(delete_request_option['status']).json(delete_request_option);
      }else{
        res.status(200).json(delete_request_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a user request
exports.request_update = async (req, res) => {
    try{
      let update_request  = await request_service.update(req.params.requestID, req.body);
      if("error" in update_request){
        res.status(update_request['status']).json(update_request);
      }else{
        res.status(200).json(update_request);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }