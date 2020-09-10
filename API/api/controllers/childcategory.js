const childcategory_service = require("../services/childcategory");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new childcategory - category filter
exports.childcategory_new = async (req, res) => {
  try{
    let childcategory = await childcategory_service.new(req.body);
    if ('error' in childcategory){
      res.status(childcategory['status']).json(childcategory)
    }else{
      res.status(201).json(childcategory)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a childcategory - like option
exports.childcategory_option = async (req, res) => {
    try{
      let childcategory = await childcategory_service.get(req.params.childcategoryID);
      if ('error' in childcategory){
        res.status(childcategory['status']).json(childcategory)
      }else{
        res.status(200).json(childcategory)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all childcategory - category options
exports.childcategory_all = async (req, res) =>{
    try{
      let all_childcategory_options  = await childcategory_service.get_all();
      if("error" in all_childcategory_options){
        res.status(all_childcategory_options['status']).json(all_childcategory_options);
      }else{
        res.status(200).json(all_childcategory_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a childcategory - category option
exports.childcategory_delete = async (req, res) => {
    try{
      let delete_childcategory_option = await childcategory_service.delete(req.params.childcategoryID);
      if("error" in delete_childcategory_option){
        res.status(delete_childcategory_option['status']).json(delete_childcategory_option);
      }else{
        res.status(200).json(delete_childcategory_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a childcategory - category option
exports.category_update = async (req, res) => {
    try{
      let update_childcategory  = await childcategory_service.update(req.params.childcategoryID, req.body);
      if("error" in update_childcategory){
        res.status(update_childcategory['status']).json(update_childcategory);
      }else{
        res.status(200).json(update_childcategory);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }