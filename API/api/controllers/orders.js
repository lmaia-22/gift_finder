const order_service = require("../services/orders");
const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};
 
this.responseProduct = {};
var port = 3000;
//get todas as orders
exports.orders_get_all = async (req,res) => {
  try{
    let all_orders = await order_service.get_all();
    if ('error' in all_orders){
      res.status(all_orders['status']).json(all_orders)
    }else{
      res.status(201).json(all_orders)
    }
  }catch(err){
    console.log("all orders")
    console.log(err)
    //res.status(500).json(fatal_error_status);
  }
};


//criar uma order
exports.orders_create_order = async (req, res) => {
  try{
    let order_status = await order_service.create(req.body);
    if ('error' in order_status){
      res.status(order_status['status']).json(order_status)
    }else{
      res.status(201).json(order_status)
    }
  }catch(err){
    console.log("create orders")
    console.log(err)
    //res.status(500).json(fatal_error_status);
  }
}

//get uma order
exports.orders_get_order = async (req, res) => {
  try{
    let order = await order_service.get(req.params.orderId);
    if ('error' in order){
      res.status(order['status']).json(order)
    }else{
      res.status(200).json(order)
    }
  }catch(err){
    console.log("get orders")
    console.log(err)
    //res.status(500).json(fatal_error_status);
  }
};

//edit uma order
exports.orders_update_order = async (req, res) => {
  try{
    let order_status = await order_service.update(req.params.orderId,req.body);
    if ('error' in order_status){
      res.status(order_status['status']).json(order_status)
    }else{
      res.status(200).json(order_status)
    }
  }catch(err){
    console.log("edit orders")
    console.log(err)
    //res.status(500).json(fatal_error_status);
  }
};

//apagar uma order
exports.orders_delete_order = async (req, res) => {
  try{
    let order_status = await order_service.delete(req.params.orderId);
    if ('error' in order_status){
      res.status(order_status['status']).json(order_status)
    }else{
      res.status(200).json(order_status)
    }
  }catch(err){
    console.log("delete orders")
    console.log(err)
    //res.status(500).json(fatal_error_status);
  }
};

//obter encomendas de usuario
exports.orders_get_order_by_user = async (req, res) => {
  try{
    let order = await order_service.get_by_user(req.params.userId);
    if ('error' in order){
      res.status(order['status']).json(order)
    }else{
      res.status(200).json(order)
    }
  }catch(err){
    console.log("orders by user")
    console.log(err)
    //res.status(500).json(fatal_error_status);
  }
};

//consultar prdutos mais vezes encomendados
exports.orders_get_most_ordered_products = async (req, res) => {
  try{
    let ordermost = await order_service.get_most_ordered_products();
    if ('error' in ordermost){
      res.status(ordermost['status']).json(ordermost)
    }else{
      res.status(200).json(ordermost)
    }
  }catch(err){
    console.log("most orders")
    console.log(err)
    res.status(500).json(fatal_error_status);
  }
}

//consultar prdutos mais vezes encomendados por quantidade
exports.orders_get_most_ordered_products_by_quantity = async (req, res) => {
  try{
    let ordermost = await order_service.get_most_ordered_products_by_quantity();
    if ('error' in ordermost){
      res.status(ordermost['status']).json(ordermost)
    }else{
      res.status(200).json(ordermost)
    }
  }catch(err){
    console.log("most orders")
    console.log(err)
    res.status(500).json(fatal_error_status);
  }
}

exports.orders_get_least_production_time_products = async (req, res) => {
  try{
    let ordermost = await order_service.get_least_production_time_products();
    if ('error' in ordermost){
      res.status(ordermost['status']).json(ordermost)
    }else{
      res.status(200).json(ordermost)
    }
  }catch(err){
    console.log("most orders")
    console.log(err)
    res.status(500).json(fatal_error_status);
  }
}
// var getProduct = new Promise(function(productId, resolve, reject){
//   request('http://localhost:44375/api/product/'+ productId, { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     resolve(res.body)
//   });
  
// })
