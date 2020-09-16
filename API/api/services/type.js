const mongoose = require("mongoose");

var Type = require("../models/type");

//new Type filter
exports.new = (type_details) => {
    return new Promise((resolve,reject) =>{
              const type = new Type({
                _id: new mongoose.Types.ObjectId(),
                name: type_details.name
                });
              type
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
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


//get a type option
exports.get = (type_id) => {
    return new Promise((resolve,reject) =>{
      Type.findById(type_id)
      .select("name description")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Type: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/type"
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

//get all type options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Type.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        type_options: docs.map(doc => {
          return doc = {
            name: doc.name,
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
  
//delete a type option
exports.delete = (type_id) => {
    return new Promise((resolve,reject) => {
      Type.deleteOne({ _id: type_id })
      .exec()
      .then(result => {
        resolve({
          message: "Type deleted"
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
  
  //update a type option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Type.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
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