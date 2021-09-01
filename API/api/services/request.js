const mongoose = require("mongoose");

var Request = require("../models/request");

//new request filter
exports.new = (request_details) => {
    return new Promise((resolve,reject) =>{
              const request = new Request({
                _id: new mongoose.Types.ObjectId(),
                current_user: request_details.current_user,
                name: request_details.name,
                amount_to_spend: request_details.amount_to_spend,
                age: request_details.age,
                gender: request_details.gender,
                job: request_details.job,
                trait: request_details.trait,
                like: request_details.like,
                type: request_details.type,
                event: request_details.event,
                location: request_details.location,
                timestamp: request_details.timestamp,
              });
              request
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    current_user: result.current_user,
                    name: result.name,
                    amount_to_spend: result.amount_to_spend,
                    age: result.age,
                    gender: result.gender,
                    job: result.job,
                    trait: result.trait,
                    like: result.like,
                    type: result.type,
                    event: result.event,
                    location: result.location,
                    timestamp: result.timestamp,
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


//get a request option
exports.get = (request_id) => {
    return new Promise((resolve,reject) =>{
      Request.findById(request_id)
      .select("current_user name amount_to_spend age gender job trait like type event location timestamp")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Request: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/request"
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

//get all request options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Request.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        request_options: docs.map(doc => {
          return doc = {
            current_user: doc.current_user,
            name: doc.name,
            amount_to_spend: doc.amount_to_spend,
            age: doc.age,
            gender: doc.gender,
            job: doc.job,
            trait: doc.trait,
            like: doc.like,
            type: doc.type,
            event: doc.event,
            location: doc.location,
            timestamp: doc.timestamp,
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
  
//delete a request option
exports.delete = (request_id) => {
    return new Promise((resolve,reject) => {
      Request.deleteOne({ _id: request_id })
      .exec()
      .then(result => {
        resolve({
          message: "request deleted"
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
  
  //update gender option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Request.findOneAndUpdate(
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