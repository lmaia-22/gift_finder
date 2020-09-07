const mongoose = require("mongoose");

var Age = require("../models/age");

//new Age filter
exports.new = (age_details) => {
    return new Promise((resolve,reject) =>{
              const age = new Age({
                _id: new mongoose.Types.ObjectId(),
                name: age_details.name,
                max_age: age_details.max_age,
              });
              age
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    max_age: result.max_age,
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


//get an age option
exports.get = (age_id) => {
    return new Promise((resolve,reject) =>{
      Age.findById(age_id)
      .select("name max_age")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Age: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/ages"
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

//get all age options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Age.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        ages_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            max_age: doc.max_age,
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
  
//delete age option
exports.delete = (age_id) => {
    return new Promise((resolve,reject) => {
      Age.deleteOne({ _id: age_id })
      .exec()
      .then(result => {
        resolve({
          message: "User deleted"
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
  
  //update age option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Age.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            max_age:update_details.max_age}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  max_age: doc.max_age,
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