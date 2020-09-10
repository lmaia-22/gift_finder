const childlikes_service = require("../services/childlikes");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new childlike filter
exports.childlike_new = async (req, res) => {
  try{
    let childlikes = await childlikes_service.new(req.body);
    if ('error' in childlikes){
      res.status(childlikes['status']).json(childlikes)
    }else{
      res.status(201).json(childlikes)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a childlike option
exports.childlike_option = async (req, res) => {
    try{
      let childlikes = await childlikes_service.get(req.params.childlikeID);
      if ('error' in childlikes){
        res.status(childlikes['status']).json(childlikes)
      }else{
        res.status(200).json(childlikes)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all childlike options
exports.childlike_all = async (req, res) =>{
    try{
      let all_childlikes_options  = await childlikes_service.get_all();
      if("error" in all_childlikes_options){
        res.status(all_childlikes_options['status']).json(all_childlikes_options);
      }else{
        res.status(200).json(all_childlikes_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a childlike option
exports.childlike_delete = async (req, res) => {
    try{
      let delete_childlikes_option = await childlikes_service.delete(req.params.childlikeID);
      if("error" in delete_childlikes_option){
        res.status(delete_childlikes_option['status']).json(delete_childlikes_option);
      }else{
        res.status(200).json(delete_childlikes_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a childlike option
exports.childlike_update = async (req, res) => {
    try{
      let update_childlike  = await childlikes_service.update(req.params.childlikeID, req.body);
      if("error" in update_childlike){
        res.status(update_childlike['status']).json(update_childlike);
      }else{
        res.status(200).json(update_childlike);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }