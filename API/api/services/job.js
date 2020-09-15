const mongoose = require("mongoose");

var Job = require("../models/job");

//new Job filter
exports.new = (job_details) => {
    return new Promise((resolve,reject) =>{
              const job = new Job({
                _id: new mongoose.Types.ObjectId(),
                name: job_details.name,
                description: job_details.description,
                field: job_details.field,
                level: job_details.level
              });
              job
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    description: result.description,
                    field: result.field,
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


//get a job option
exports.get = (job_id) => {
    return new Promise((resolve,reject) =>{
      Job.findById(job_id)
      .select("name description field level")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Job: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/job"
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

//get all job options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Job.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        job_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            description: doc.description,
            field: doc.field,
            level: doc.level,
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
  
//delete a job option
exports.delete = (job_id) => {
    return new Promise((resolve,reject) => {
      Job.deleteOne({ _id: job_id })
      .exec()
      .then(result => {
        resolve({
          message: "Job deleted"
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
      Job.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            description:update_details.description,
            field:update_details.field,
            level:update_details-level}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  description: doc.description,
                  field: doc.field,
                  level: doc.level,
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