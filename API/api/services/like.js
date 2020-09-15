const mongoose = require("mongoose");

var Like = require("../models/like");

//new like filter
exports.new = (like_details) => {
    return new Promise((resolve,reject) =>{
              const like = new Like({
                _id: new mongoose.Types.ObjectId(),
                name: like_details.name,
                trust: like_details.trust,
              });
              like
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    trust: result.trust,
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


//get a like option
exports.get = (like_id) => {
    return new Promise((resolve,reject) =>{
      Like.findById(like_id)
      .select("name trust")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Like: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/like"
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

//get all like options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Like.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        like_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            trust: doc.trust,
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
  
//delete a like option
exports.delete = (like_id) => {
    return new Promise((resolve,reject) => {
      Like.deleteOne({ _id: like_id })
      .exec()
      .then(result => {
        resolve({
          message: "Like deleted"
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
  
  //update a like option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Like.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  trust: doc.trust,
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