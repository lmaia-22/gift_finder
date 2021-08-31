const mongoose = require("mongoose");

var Role = require("../models/role");

//new role filter
exports.new = (role_details) => {
    return new Promise((resolve,reject) =>{
              const role = new Role({
                _id: new mongoose.Types.ObjectId(),
                name: role_details.name,
                rights: role_details.rights,
                access: role_details.access,
              });
              role
              .save()
              .then(result => {
                console.log(result);
                if (result) {
                  const response = {
                    name: result.name,
                    rights: result.rights,
                    access: result.access,
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


//get a role option
exports.get = (role_id) => {
    return new Promise((resolve,reject) =>{
      Role.findById(role_id)
      .select("name rights access")
      .exec()
      .then(doc => {
        if (doc) {
          resolve({
            Role: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/roles"
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

//get all role options
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    Role.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        role_options: docs.map(doc => {
          return doc = {
            name: doc.name,
            rights: doc.rights,
            access: doc.access,
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
  
//delete a role option
exports.delete = (role_id) => {
    return new Promise((resolve,reject) => {
      Role.deleteOne({ _id: role_id })
      .exec()
      .then(result => {
        resolve({
          message: "Role deleted"
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
  
  //update a role option
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      Role.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  rights: doc.rights,
                  access: doc.access,
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