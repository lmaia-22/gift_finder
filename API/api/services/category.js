const mongoose = require("mongoose");

var Category = require("../models/category");

//new Category - like filter
exports.new = (category_details) => {
    return new Promise((resolve,reject) =>{
              const category = new Category({
                _id: new mongoose.Types.ObjectId(),
                name: category_details.name
              });
              category
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


//get a category - like option
exports.get = (category_id) => {
    return new Promise((resolve,reject) =>{
      Category.findById(category_id)
      .select("name")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Category: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/category"
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

//get all category - like options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Category.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        category_options: docs.map(doc => {
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
  
//delete a category - like option
exports.delete = (category_id) => {
    return new Promise((resolve,reject) => {
      Like.deleteOne({ _id: category_id })
      .exec()
      .then(result => {
        resolve({
          message: "Category deleted"
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
  
  //update a category - like option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
        Category.findOneAndUpdate(
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