const type_service = require("../services/type");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new type filter
exports.type_new = async (req, res) => {
  try{
    let type = await type_service.new(req.body);
    if ('error' in type){
      res.status(type['status']).json(type)
    }else{
      res.status(201).json(type)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a type option
exports.type_option = async (req, res) => {
    try{
      let type = await type_service.get(req.params.jobID);
      if ('error' in type){
        res.status(type['status']).json(type)
      }else{
        res.status(200).json(type)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all type options
exports.type_all = async (req, res) =>{
    try{
      let all_types_options  = await type_service.get_all();
      if("error" in all_types_options){
        res.status(all_types_options['status']).json(all_types_options);
      }else{
        res.status(200).json(all_types_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete type option
exports.type_delete = async (req, res) => {
    try{
      let delete_type_option = await type_service.delete(req.params.typeID);
      if("error" in delete_type_option){
        res.status(delete_type_option['status']).json(delete_type_option);
      }else{
        res.status(200).json(delete_type_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update type option
exports.type_update = async (req, res) => {
    try{
      let update_type  = await type_service.update(req.params.typeID, req.body);
      if("error" in update_type){
        res.status(update_type['status']).json(update_type);
      }else{
        res.status(200).json(update_type);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }