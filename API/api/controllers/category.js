const category_service = require("../services/category");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new category - like filter
exports.category_new = async (req, res) => {
  try{
    let category = await category_service.new(req.body);
    if ('error' in category){
      res.status(category['status']).json(category)
    }else{
      res.status(201).json(category)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a category - like option
exports.category_option = async (req, res) => {
    try{
      let category = await category_service.get(req.params.categoryID);
      if ('error' in category){
        res.status(category['status']).json(category)
      }else{
        res.status(200).json(category)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all category - like options
exports.category_all = async (req, res) =>{
    try{
      let all_category_options  = await category_service.get_all();
      if("error" in all_category_options){
        res.status(all_category_options['status']).json(all_category_options);
      }else{
        res.status(200).json(all_category_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a category - like option
exports.category_delete = async (req, res) => {
    try{
      let delete_category_option = await category_service.delete(req.params.categoryID);
      if("error" in delete_category_option){
        res.status(delete_category_option['status']).json(delete_category_option);
      }else{
        res.status(200).json(delete_category_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a category - like option
exports.category_update = async (req, res) => {
    try{
      let update_category  = await category_service.update(req.params.categoryID, req.body);
      if("error" in update_category){
        res.status(update_category['status']).json(update_category);
      }else{
        res.status(200).json(update_category);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }