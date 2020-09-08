const gender_service = require("../services/gender");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new gender filter
exports.gender_new = async (req, res) => {
  try{
    let gender = await gender_service.new(req.body);
    if ('error' in gender){
      res.status(gender['status']).json(gender)
    }else{
      res.status(201).json(gender)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a gender option
exports.gender_option = async (req, res) => {
    try{
      let gender = await gender_service.get(req.params.ageID);
      if ('error' in gender){
        res.status(gender['status']).json(gender)
      }else{
        res.status(200).json(gender)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all gender options
exports.gender_all = async (req, res) =>{
    try{
      let all_genders_options  = await gender_service.get_all();
      if("error" in all_genders_options){
        res.status(all_genders_options['status']).json(all_genders_options);
      }else{
        res.status(200).json(all_genders_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a gender option
exports.gender_delete = async (req, res) => {
    try{
      let delete_gender_option = await gender_service.delete(req.params.ageID);
      if("error" in delete_gender_option){
        res.status(delete_gender_option['status']).json(delete_gender_option);
      }else{
        res.status(200).json(delete_gender_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a gender option
exports.age_update = async (req, res) => {
    try{
      let update_gender  = await gender_service.update(req.params.genderID, req.body);
      if("error" in update_gender){
        res.status(update_gender['status']).json(update_gender);
      }else{
        res.status(200).json(update_gender);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }