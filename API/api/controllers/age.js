const age_service = require("../services/age");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new age filter
exports.age_new = async (req, res) => {
  try{
    let age = await age_service.new(req.body);
    if ('error' in age){
      res.status(age['status']).json(age)
    }else{
      res.status(201).json(age)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list an age option
exports.age_option = async (req, res) => {
    try{
      let age = await age_service.get(req.params.ageID);
      if ('error' in age){
        res.status(age['status']).json(age)
      }else{
        res.status(200).json(age)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all age options
exports.age_all = async (req, res) =>{
    try{
      let all_ages_options  = await age_service.get_all();
      if("error" in all_ages_options){
        res.status(all_ages_options['status']).json(all_ages_options);
      }else{
        res.status(200).json(all_ages_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete age option
exports.age_delete = async (req, res) => {
    try{
      let delete_age_option = await age_service.delete(req.params.ageID);
      if("error" in delete_option){
        res.status(delete_age_option['status']).json(delete_age_option);
      }else{
        res.status(200).json(delete_age_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update age option
exports.age_update = async (req, res) => {
    try{
      let update_age  = await age_service.update(req.params.userID, req.body);
      if("error" in update_age){
        res.status(update_age['status']).json(update_age);
      }else{
        res.status(200).json(update_age);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }