const role_service = require("../services/role");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new role filter
exports.role_new = async (req, res) => {
  try{
    let role = await role_service.new(req.body);
    if ('error' in role){
      res.status(role['status']).json(role)
    }else{
      res.status(201).json(role)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a role option
exports.role_option = async (req, res) => {
    try{
      let role = await role_service.get(req.params.roleID);
      if ('error' in role){
        res.status(role['status']).json(role)
      }else{
        res.status(200).json(role)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all role options
exports.role_all = async (req, res) =>{
    try{
      let all_roles_options  = await role_service.get_all();
      if("error" in all_roles_options){
        res.status(all_roles_options['status']).json(all_roles_options);
      }else{
        res.status(200).json(all_roles_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a role option
exports.role_delete = async (req, res) => {
    try{
      let delete_role_option = await role_service.delete(req.params.roleID);
      if("error" in delete_role_option){
        res.status(delete_role_option['status']).json(delete_role_option);
      }else{
        res.status(200).json(delete_role_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a role option
exports.role_update = async (req, res) => {
    try{
      let update_role  = await role_service.update(req.params.roleID, req.body);
      if("error" in update_role){
        res.status(update_role['status']).json(update_role);
      }else{
        res.status(200).json(update_role);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }