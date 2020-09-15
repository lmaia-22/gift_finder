const mongoose = require("mongoose");

var Trait = require("../models/trait");

//new trait filter
exports.new = (trait_details) => {
    return new Promise((resolve,reject) =>{
              const trait = new Trait({
                _id: new mongoose.Types.ObjectId(),
                name: trait_details.name,
                description: trait_details.description,
              });
              trait
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


//get a trait option
exports.get = (trait_id) => {
    return new Promise((resolve,reject) =>{
      Trait.findById(trait_id)
      .select("name description")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Trait: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/trait"
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

//get all trait options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Trait.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        trait_options: docs.map(doc => {
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
  
//delete a trait option
exports.delete = (trait_id) => {
    return new Promise((resolve,reject) => {
      Trait.deleteOne({ _id: trait_id })
      .exec()
      .then(result => {
        resolve({
          message: "Trait deleted"
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
  
  //update a trait option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Like.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            description: update_details.description}},
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