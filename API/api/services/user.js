const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var User = require("../models/user");

//get all users
exports.get_all = () => {
  return new Promise((resolve,reject) =>{
    User.find()
    .select()
    .exec()
    .then(docs => {
      resolve({
        count: docs.length,
        users: docs.map(doc => {
          return doc = {
            name: doc.name,
            email: doc.email,
            address: doc.address,
            role:doc.role,
            actions: doc.actions,
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

//list a user
exports.get = (user_id) => {
  return new Promise((resolve,reject) =>{
    //const id = req.params.userID;
    User.findById(user_id)
    .select("name email address role actions")
    .exec()
    .then(doc => {
      if (doc) {
        resolve({
          User: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/users"
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

//user signup
exports.new = (user_details) => {
  return new Promise((resolve,reject) =>{
    User.find({ email: user_details.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        resolve({
          error: "Mail exists",
          status: 409
        });
      } else {
        bcrypt.hash(user_details.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            reject({
              error: err,
              status: 500
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: user_details.name,
              email: user_details.email,
              password: hash,
              address: user_details.address,
              role: user_details.role,
              actions: user_details.actions,
            });
            user
            .save()
            .then(result => {
              if (result) {
                const response = {
                  name: result.name,
                  email: result.email,
                  address: result.address,
                  role: result.role,
                  actions: result.actions,
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
          }
        });
      }
    });
  });
}

//login
exports.login = (login_details) => {
  return new Promise((resolve, reject)=>{
    User.find({ email: login_details.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        resolve({
          error: "Auth failed",
          status: 401
        });
      }
      bcrypt.compare(login_details.password, user[0].password, (err, result) => {
        if (err) {
          resolve({
            error: "Auth failed",
            status: 401
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role,
              actions: user[0].actions
            },
            process.env.JWT_KEY,
            {
              expiresIn: "2h"
            }
            );
            resolve({
              message: "Auth successful",
              token: token,
              userId: user[0]._id,
              role: user[0].role
            });
          }else{
            resolve({
              error: "Auth failed",
              status: 401
            });
          }
        });
      })
      .catch(err => {
        //console.log(err);
        reject({
          error: err,
          status: 500
        });
      });
    });
  }
  
  //apagar user
  exports.delete = (user_id) => {
    return new Promise((resolve,reject) => {
      User.deleteOne({ _id: user_id })
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
  
  //atualizar user
  exports.update = (id, update_details) => {
    return new Promise((resolve,reject) =>{
      User.findOneAndUpdate(
        {_id: id},{
          $set:{
            name:update_details.name,
            address:update_details.address,
            role:update_details.role,
            actions:update_details.actions}},
            {new:true})
            .then(doc => {
              if (doc) {
                const response = {
                  name: doc.name,
                  email: doc.email,
                  address: doc.address,
                  role: doc.role,
                  actions: doc.actions,
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