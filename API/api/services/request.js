const mongoose = require("mongoose");

var Request = require("../models/request");

//new request filter
exports.new = (request_details) => {
    return new Promise((resolve,reject) =>{
              const request = new Request({
                _id: new mongoose.Types.ObjectId(),
                name: request_details.name,
                description: request_details.description
              });
              request
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


//get a request option
exports.get = (request_id) => {
    return new Promise((resolve,reject) =>{
      Request.findById(request_id)
      .select("name description field level")
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