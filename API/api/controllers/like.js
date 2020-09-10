const like_service = require("../services/like");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new like filter
exports.like_new = async (req, res) => {
  try{
    let like = await like_service.new(req.body);
    if ('error' in like){
      res.status(like['status']).json(like)
    }else{
      res.status(201).json(like)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a like option
exports.like_option = async (req, res) => {
    try{
      let like = await like_service.get(req.params.likeID);
      if ('error' in like){
        res.status(like['status']).json(like)
      }else{
        res.status(200).json(like)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all like options
exports.like_all = async (req, res) =>{
    try{
      let all_likes_options  = await like_service.get_all();
      if("error" in all_likes_options){
        res.status(all_likes_options['status']).json(all_likes_options);
      }else{
        res.status(200).json(all_likes_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a like option
exports.like_delete = async (req, res) => {
    try{
      let delete_like_option = await like_service.delete(req.params.likeID);
      if("error" in delete_like_option){
        res.status(delete_like_option['status']).json(delete_like_option);
      }else{
        res.status(200).json(delete_like_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a like option
exports.like_update = async (req, res) => {
    try{
      let update_like  = await like_service.update(req.params.likeID, req.body);
      if("error" in update_like){
        res.status(update_like['status']).json(update_like);
      }else{
        res.status(200).json(update_like);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }