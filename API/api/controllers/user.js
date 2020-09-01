const user_service = require("../services/user");
const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};


//new user
exports.user_signup = async (req, res) => {
  try{
    let signup_status = await user_service.new(req.body);
    if ('error' in signup_status){
      res.status(signup_status['status']).json(signup_status)
    }else{
      res.status(201).json(signup_status)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a user
exports.user_profile = async (req, res) => {
  try{
    let user = await user_service.get(req.params.userID);
    if ('error' in user){
      res.status(user['status']).json(user)
    }else{
      res.status(200).json(user)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list all users
exports.users_all = async (req, res) =>{
  try{
    let all_users  = await user_service.get_all();
    if("error" in all_users){
      res.status(all_users['status']).json(all_users);
    }else{
      res.status(200).json(all_users);
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//login
exports.user_login = async (req, res) => {
  try{
    let login_details  = await user_service.login(req.body);
    if("error" in login_details){
      res.status(login_details['status']).json(login_details);
    }else{
      res.status(200).json(login_details);
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//apagar user
exports.user_delete = async (req, res) => {
  try{
    let delete_status  = await user_service.delete(req.params.userID);
    if("error" in delete_status){
      res.status(delete_status['status']).json(delete_status);
    }else{
      res.status(200).json(delete_status);
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//atualizar user
exports.user_update = async (req, res) => {
  try{
    let update_status  = await user_service.update(req.params.userID, req.body);
    if("error" in update_status){
      res.status(update_status['status']).json(update_status);
    }else{
      res.status(200).json(update_status);
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}
