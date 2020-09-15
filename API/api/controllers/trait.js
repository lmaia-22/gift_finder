const trait_service = require("../services/trait");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new trait filter
exports.trait_new = async (req, res) => {
  try{
    let trait = await trait_service.new(req.body);
    if ('error' in trait){
      res.status(trait['status']).json(trait)
    }else{
      res.status(201).json(trait)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a trait option
exports.trait_option = async (req, res) => {
    try{
      let trait = await trait_service.get(req.params.traitID);
      if ('error' in trait){
        res.status(trait['status']).json(trait)
      }else{
        res.status(200).json(trait)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all trait options
exports.trait_all = async (req, res) =>{
    try{
      let all_traits_options  = await trait_service.get_all();
      if("error" in all_traits_options){
        res.status(all_traits_options['status']).json(all_traits_options);
      }else{
        res.status(200).json(all_traits_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a trait option
exports.trait_delete = async (req, res) => {
    try{
      let delete_trait_option = await trait_service.delete(req.params.traitID);
      if("error" in delete_trait_option){
        res.status(delete_trait_option['status']).json(delete_trait_option);
      }else{
        res.status(200).json(delete_trait_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a trait option
exports.trait_update = async (req, res) => {
    try{
      let update_trait  = await trait_service.update(req.params.traitID, req.body);
      if("error" in update_trait){
        res.status(update_trait['status']).json(update_trait);
      }else{
        res.status(200).json(update_trait);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }