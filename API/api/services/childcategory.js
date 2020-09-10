const mongoose = require("mongoose");

var Childcategory = require("../models/childcategory");

//new Childcategory - category filter
exports.new = (childcategory_details) => {
    return new Promise((resolve,reject) =>{
              const childcategory = new Childcategory({
                _id: new mongoose.Types.ObjectId(),
                name: childcategory_details.name,
                category: childcategory.category
              });
              Childcategory
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    category:result.category,
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


//get a childcategory - category option
exports.get = (childcategory_id) => {
    return new Promise((resolve,reject) =>{
      Childcategory.findById(childcategory_id)
      .select("name category")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Childcategory: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/childcategory"
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

//get all childcategory - category options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Childcategory.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        childcategory_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            category: doc.category,
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
  
//delete a childcategory - category option
exports.delete = (childcategory_id) => {
    return new Promise((resolve,reject) => {
      Childcategory.deleteOne({ _id: childcategory_id })
      .exec()
      .then(result => {
        resolve({
          message: "Childcategory deleted"
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
  
  //update a childcategory - category option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
        Childcategory.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            category:update_details.category}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  category: doc.category,
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