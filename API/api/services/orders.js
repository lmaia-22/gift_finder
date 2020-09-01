const mongoose = require("mongoose");
const request = require('sync-request');

const User = require("../models/user");
const Order = require("../models/order");

this.responseProduct = {};
var port = 3000;


exports.get_all = () => {
    return new Promise((resolve, reject) =>{
    Order.find()
      .select("user quantity product _id date changestatusorder estimateddeliverydate status ")
      .populate("user", "name address")
      .exec()
      .then(docs => {
        //console.log(docs);
        resolve({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              date: doc.date,
              changestatusorder: doc.changestatusorder,
              estimateddeliverydate: doc.estimateddeliverydate,
              user: doc.user,
              status: doc.status,
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id
              }
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
  };

//criar uma order
exports.create = (order_details) => {
  return new Promise((resolve, reject) =>{
  User.findById(order_details.userId)
    .then(user => {
      if (!user) {
        resolve({
          error: "User not found",
          status: 404
        });
      }

      try{
        var res = request('GET', "https://api.thecatapi.com/v1/images/search");
      }catch(err){
        resolve({
          error:"MDP is not avaliable",
          status: 500
        })
      }

      var prod = JSON.parse(res.getBody('utf8'));
    
      try{
        var resdur = request('GET', "http://localhost:44375/api/fabricplan/"+ prod.fabricPlanId);
      }catch(err){
        resolve({
          error:"MDP is not avaliable",
          status: 500
        })
      }

      var proddur = JSON.parse(resdur.getBody('utf8'));

      var datedev = new Date();

        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          user: order_details.userId,
          product: {
            productId: prod.id,
            name: prod.name,
            price: prod.price,
            duration: proddur.duration
          },
          quantity: order_details.quantity,
          estimateddeliverydate: datedev.setDate(datedev.getDate() + proddur.duration)
      });
      return order.save();
    })
    .then(result => {
      resolve({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          user: result.user,
          product: result.product,
          quantity:result.quantity,
          date: result.date,
          changestatusorder: result.changestatusorder,
          estimateddeliverydate: result.estimateddeliverydate,
          status: result.status,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      reject({
        error: err,
        status: 500
      });
    });
  })
};

//get uma order
exports.get = (id) => {
  return new Promise((resolve, reject) =>{
  Order.findById(id)
    .populate("user", "name address")
    .exec()
    .then(order => {
      if (!order) {
        resolve({
          error: "Order not found",
          status: 404
        });
      }
      resolve({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      reject({
        error: err,
        status: 500
      });
    });
  })
};

//edit uma order
exports.update = (id, order_details) => {
  return new Promise((resolve, reject) =>{
  const updateOps = {};
  //console.log(order_details)
  /*for (const ops of order_details) {
    updateOps[ops.propName] = ops.value;
  }*/
  //Order.update({ _id: id }, { $set: updateOps })
  //console.log("id",id)
  Order.updateOne({ _id: id }, { $set: order_details })
    .exec()
    .then(result => {
      resolve({
        message: "Order updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + id
        }
      });
    })
    .catch(err => {
      reject({
        error: err,
        status: 500
      });
    });
  })
};

//apagar uma order
exports.delete = (id) => {
  return new Promise((resolve, reject) =>{
  //console.log("id is ",id)
  Order.deleteMany()
    .exec()
    .then(result => {
      resolve({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      reject({
        error: err,
        status: 500
      });
    });
  })
};

//obter encomendas de utilizador
exports.get_by_user = (id) => {
  return new Promise((resolve, reject) =>{
  Order.find({user: id})
    .populate( "user", "name address")
    .exec()
    .then(order => {
      if (!order) {
        resolve({
          error: "User has no orders",
          status: 404
        });
      }
      resolve({
        orders: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      reject({
        error: err,
        status: 500
      });
    });
  })
};

//obter produtos mais vezes encomendados
exports.get_most_ordered_products = () => {
  return new Promise((resolve, reject) =>{
  Order.find()
      .select("product")
      .exec()
      .then(mostordered => {
        //console.log(mostordered)
        //get all products id
        if(mostordered.length === 0){
          resolve({
            error:"order list is empty",
            status:204
          })
        }
        let id_arr = []
        mostordered.forEach(element =>
          id_arr.push(element.product.productId)
        )
        //make an object with the ids and corresponding quantities
        let id_quantities = id_arr.reduce(function(m,v){
          m[v] = (m[v]||0)+1; return m;
        }, {});
        //console.log("id_quantities is")
        //console.log(id_quantities)
        //order an array by quantity
        var id_ordered_quantities = Object.keys(id_quantities).sort((a, b) => (id_quantities[a] < id_quantities[b]) ? 1 : -1);
        //console.log("id_ordered_quantities is")
        //console.log(id_ordered_quantities)
        //make a list ordered for return
        let output_data = []
        for (let [i, element] of id_ordered_quantities.entries()) {
          let product_description = mostordered.find(index => index.product.productId == parseInt(element))
          //console.log(product_description)
          let quantity = id_quantities[element]
          //console.log("qiantuytu", quantity)
          //console.log("order",i+1)
          output_data.push({
            rank:i+1,
            productId:product_description.product.productId,
            name:product_description.product.name,
            price:product_description.product.price,
            occurences:quantity
          })
        };
        resolve(output_data);
      })
      .catch(err => {
        console.log(err);
          reject({
              error: err,
              status: 500
          });
      });
    })
  };

//obter produtos mais vezes encomendados por quantidade
exports.get_most_ordered_products_by_quantity = () => {
  return new Promise((resolve, reject) =>{
  Order.find()
      .select("product quantity")
      .exec()
      .then(mostordered => {
        if(mostordered.length === 0){
          resolve({
            error:"order list is empty",
            status:204
          })
        }
        //console.log(mostordered)
        //makes a list with all products ids and corresponding quantities
        let id_arr_qty = []
        mostordered.forEach(element =>
          id_arr_qty.push({
            id:element.product.productId,
            quantity:element.quantity
          })
        )
        //console.log(id_arr_qty)
        //sums the quantities of the repeated products
        id_arr_qty_sum = []
        for(let iterator of id_arr_qty){
          const found = id_arr_qty_sum.find(index => index.id == parseInt(iterator.id))
          if (found)
            found.quantity += iterator.quantity
          else 
            id_arr_qty_sum.push({
              id:iterator.id,
              quantity:iterator.quantity
            })
        }
        //console.log(id_arr_qty_sum)
        //order an array by quantity
        id_arr_qty_sum.sort((a, b) => (a.quantity < b.quantity) ? 1 : -1);
        //console.log(id_arr_qty_sum)
        //make an object to output the info
        let output_data = []
        for (let [i, element] of id_arr_qty_sum.entries()) {
          let product_description = mostordered.find(index => index.product.productId == parseInt(element.id))
          //console.log(product_description)
          let quantity = element.quantity
          //console.log("qiantuytu", quantity)
          //console.log("order",i+1)
          output_data.push({
            rank:i+1,
            productId:product_description.product.productId,
            name:product_description.product.name,
            price:product_description.product.price,
            total_quantity:quantity
          })
        };
        //console.log(mostordered)
        resolve(output_data)
      })
      .catch(err => {
        reject({
          error: err,
          status: 500
        })
      })
  })
}

//produtos com men
exports.get_least_production_time_products = () => {
  return new Promise((resolve, reject) =>{
  Order.find()
      .select("product")
      .exec()
      .then(leastproductiontime => {
        if(leastproductiontime.length === 0){
          resolve({
            error:"order list is empty",
            status:204
          })
        }
        //console.log(leastproductiontime)
        const product_object = []
        leastproductiontime.forEach(element =>
          product_object.push({
            productId:element.product.productId,
            name:element.product.name,
            price:element.product.price,
            duration:element.product.duration
          })
        )
        //get only single products
        var least_duration = []
        for(let iterator of product_object){
          const found = least_duration.find(index => index.productId == parseInt(iterator.productId))
          if (!Boolean(found))
            least_duration.push({
              productId:iterator.productId,
              name:iterator.name,
              price:iterator.price,
              duration:iterator.duration
            })
        }
        //order the products by duration and add rank
        least_duration.sort((a, b) => (a.duration > b.duration) ? 1 : -1);
        for (let [i, element] of least_duration.entries()) {
          element.rank = i+1
          //delete element.productId
        }
        //console.log(least_duration)
        resolve({
          least_duration
        })
      })
      .catch(err =>{
        reject({
          error: err,
          status: 500
        })
      })
    })
  }