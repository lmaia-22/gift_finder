const mongoose = require("mongoose");

var Childlike = require("../models/childlike");

//new childlike filter
exports.new = (childlike_details) => {
    return new Promise((resolve,reject) =>{
              const childlike = new Childlike({
                _id: new mongoose.Types.ObjectId(),
                name: childlike_details.name,
                like: childlike_details.like,
                subcategory: childlike_details.subcategory
              });
              like
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    like: result.like,
                    subcategory: result.childlike_details,
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


//get a childlike option
exports.get = (childlike_id) => {
    return new Promise((resolve,reject) =>{
      Childlike.findById(childlike_id)
      .select("name like subcategory")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            ChildLike: doc,
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

//get all childlike options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Childlike.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        childlike_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            like: doc.like,
            subcategory: doc.subcategory,
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
  
//delete a childlike option
exports.delete = (childlike_id) => {
    return new Promise((resolve,reject) => {
      Like.deleteOne({ _id: childlike_id })
      .exec()
      .then(result => {
        resolve({
          message: "ChildLike deleted"
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
  
  //update a childlike option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Childlike.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            like:update_details.like,
            subcategory:update_details.subcategory }},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  like: doc.like,
                  subcategory: doc.subcategory,
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