const event_service = require("../services/event");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new event filter
exports.event_new = async (req, res) => {
  try{
    let event = await event_service.new(req.body);
    if ('error' in event){
      res.status(event['status']).json(event)
    }else{
      res.status(201).json(event)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list an event option
exports.event_option = async (req, res) => {
    try{
      let event = await event_service.get(req.params.eventID);
      if ('error' in event){
        res.status(event['status']).json(event)
      }else{
        res.status(200).json(event)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all event options
exports.event_all = async (req, res) =>{
    try{
      let all_event_options  = await event_service.get_all();
      if("error" in all_event_options){
        res.status(all_event_options['status']).json(all_event_options);
      }else{
        res.status(200).json(all_event_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete an event option
exports.event_delete = async (req, res) => {
    try{
      let delete_event_option = await event_service.delete(req.params.eventID);
      if("error" in delete_event_option){
        res.status(delete_event_option['status']).json(delete_event_option);
      }else{
        res.status(200).json(delete_event_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update an event option
exports.event_update = async (req, res) => {
    try{
      let update_event  = await event_service.update(req.params.eventID, req.body);
      if("error" in update_event){
        res.status(update_event['status']).json(update_event);
      }else{
        res.status(200).json(update_event);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }