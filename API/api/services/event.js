const mongoose = require("mongoose");

var Event = require("../models/event");

//new Event filter
exports.new = (event_details) => {
    return new Promise((resolve,reject) =>{
              const event = new Event({
                _id: new mongoose.Types.ObjectId(),
                event: event_details.name,
                description: event_details.description
              });
              event
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    description: result.description,
                    _id: result._id
                  }
                  resolve(response);
                }
              })
              .catch(err => {
                console.log(err);
                reject({
                  error: err,
                  status: 500
                });
              });
          });
        }


//get an event option
exports.get = (event_id) => {
    return new Promise((resolve,reject) =>{
      Event.findById(event_id)
      .select("name description")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Event: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/event"
            }
          });
        } else {
          resolve({
            error: "No valid entry found for provided ID",
            status: 404
          })
        }
      })
      .catch(err => {
        reject({
          error: err,
          status: 500
        })
      });
    })
  };

//get all event options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Event.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        event_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            description: doc.description,
            _id: doc._id
          };
        })
      });
    })
    .catch(err => {
      reject({
        error: err,
        status: 500
      });
    });
  })
}
  
//delete an event option
exports.delete = (event_id) => {
    return new Promise((resolve,reject) => {
      Event.deleteOne({ _id: event_id })
      .exec()
      .then(result => {
        resolve({
          message: "Event deleted"
        })
      })
      .catch(err => {
        reject({
          error: err,
          status: 500
        });
      });
    })
  }
  
  //update an event option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Event.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            description:update_details.description}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  description: doc.description,
                  _id: doc._id
                }
                resolve(response);
              } else {
                resolve({
                  error: "No valid entry found for provided ID",
                  status: 404
                });
              }
            })
            .catch(err => {
              reject({
                error: err,
                status: 500
              });
            });
          })
        }