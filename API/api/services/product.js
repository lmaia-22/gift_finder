const mongoose = require("mongoose");

var Product = require("../models/product");
var Age = require("../models/age");
var Gender = require("../models/gender");
var Job = require("../models/job");
var Trait = require("../models/trait");
var Type = require("../models/type");
var Event = require("../models/event");

//new product 
exports.new = (product_details) => {
    return new Promise((resolve,reject) =>{
        
        //Age filter
        Age.findById(product_details.filters.age.age_id)
            .then(age => {
                if (!age) {
                    resolve({
                    error: "Age not found",
                    status: 404
                    });
                 }

        //Gender Filter
        Gender.findById(product_details.filters.gender.gender_id)
            .then(gender => {
                if (!gender) {
                    resolve({
                    error: "Gender not found",
                    status: 404
                    });
                }

        //Job Filter
        Job.findById(product_details.filters.job.job_id)
            .then(job => {
                if (!job) {
                    resolve({
                    error: "Job not found",
                    status: 404
                    });
                }

        //Traits Filter
        Trait.findById(product_details.filters.traits.trait)
            .then(trait => {
                if (!trait) {
                    resolve({
                    error: "Trait not found",
                    status: 404
                    });
                }

        //Type Filter
        Type.findById(product_details.filters.type.type_id)
            .then(type => {
                if (!type) {
                    resolve({
                    error: "Type not found",
                    status: 404
                    });
                }

        //Event Filter
        Event.findById(product_details.filters.event.event_id)
        .then(event => {
            if (!event) {
                resolve({
                error: "Event not found",
                status: 404
                });
            }
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: product_details.name,
                description: product_details.description,
                filters: [{
                    age: product_details.filters.age,
                    gender: product_details.filters.gender,
                    job: product_details.filters.job,
                    traits: [{
                        trait: product_details.filters.traits.trait,
                        percentage: product_details.filters.traits.percentage
                    }],
                    type: product_details.filters.type,
                    event: product_details.filters.event,
                    average_price: {
                        min: product_details.filters.average_price.min,
                        max: product_details.filters.average_price.max,
                    }
                }]
              });
              product
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    description: result.description,
                    filters: [{
                        age: result.filters.age.age_id,
                        gender: result.filters.gender.gender_id,
                        job: result.filters.job.job_id,
                        traits: [{
                            trait: result.filters.traits.trait,
                            percentage: result.filters.traits.percentage
                        }],
                        type: result.filters.type.type_id,
                        event: result.filters.event.event_id,
                        average_price: {
                            min: result.filters.average_price.min,
                            max: result.filters.average_price.max,
                        }
                    }],
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
    )}
    )}
    )}
    )}
    )}
    )};



//get a product option
exports.get = (product_id) => {
    return new Promise((resolve,reject) =>{
      Product.findById(product_id)
      .select("name description filters")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Product: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/product"
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

//get all product options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Product.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        Products: docs.map(doc => {
          return doc = {
            name: doc.name,
            description: doc.description,
            filters: [{
                age: doc.filters.age,
                gender: doc.filters.gender,
                job: doc.filters.job,
                traits: [{
                    trait: doc.filters.traits.trait,
                    percentage: doc.filters.traits.percentage
                }],
                type: doc.filters.type,
                event: doc.filters.event,
                average_price: {
                    min: doc.filters.average_price.min,
                    max: doc.filters.average_price.max,
                        }
                    }],
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
  
//delete a product option
exports.delete = (product_id) => {
    return new Promise((resolve,reject) => {
      Product.deleteOne({ _id: product_id })
      .exec()
      .then(result => {
        resolve({
          message: "Product deleted"
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
  
  //update a product option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Product.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            description: update_details.description,
            filters: [{
                age: update_details.filters.age,
                gender: update_details.filters.gender,
                job: update_details.filters.job,
                traits: [{
                    trait: update_details.filters.traits.trait,
                    percentage: update_details.filters.traits.percentage
                }],
                type: update_details.filters.type,
                event: update_details.filters.event,
                average_price: {
                    min: update_details.filters.average_price.min,
                    max: update_details.filters.average_price.max,
                }
            }],
            }},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                    name: doc.name,
                    description: doc.description,
                    filters: [{
                        age: doc.filters.age,
                        gender: doc.filters.gender,
                        job: doc.filters.job,
                        traits: [{
                            trait: doc.filters.traits.trait,
                            percentage: doc.filters.traits.percentage
                        }],
                        type: doc.filters.type,
                        event: doc.filters.event,
                        average_price: {
                            min: doc.filters.average_price.min,
                            max: doc.filters.average_price.max,
                                }
                            }],
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