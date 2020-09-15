const mongoose = require("mongoose");

var Gender = require("../models/gender");

//new Gender filter
exports.new = (gender_details) => {
    return new Promise((resolve,reject) =>{
              const gender = new Gender({
                _id: new mongoose.Types.ObjectId(),
                name: gender_details.name,
              });
              Gender
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


//get a gender option
exports.get = (gender_id) => {
    return new Promise((resolve,reject) =>{
      Gender.findById(gender_id)
      .select("name")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Gender: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/gender"
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

//get all gender options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Gender.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        gender_options: docs.map(doc => {
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
  
//delete a gender option
exports.delete = (gender_id) => {
    return new Promise((resolve,reject) => {
      Gender.deleteOne({ _id: gender_id })
      .exec()
      .then(result => {
        resolve({
          message: "Gender deleted"
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
      Gender.findOneAndUpdate(
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