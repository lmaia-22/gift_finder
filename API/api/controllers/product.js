const product_service = require("../services/product");

const fatal_error_status ={'error': 'a fatal error occured, please contact admin for details'};

//new product
exports.product_new = async (req, res) => {
  try{
    let product = await product_service.new(req.body);
    if ('error' in product){
      res.status(product['status']).json(product)
    }else{
      res.status(201).json(product)
    }
  }catch(err){
    res.status(500).json(fatal_error_status);
  }
}

//list a product
exports.product_option = async (req, res) => {
    try{
      let product = await product_service.get(req.params.productID);
      if ('error' in product){
        res.status(product['status']).json(product)
      }else{
        res.status(200).json(product)
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//get all product
exports.product_all = async (req, res) =>{
    try{
      let all_product_options  = await product_service.get_all();
      if("error" in all_product_options){
        res.status(all_product_options['status']).json(all_product_options);
      }else{
        res.status(200).json(all_product_options);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }

//delete a product
exports.product_delete = async (req, res) => {
    try{
      let delete_product_option = await product_service.delete(req.params.productID);
      if("error" in delete_product_option){
        res.status(delete_product_option['status']).json(delete_product_option);
      }else{
        res.status(200).json(delete_product_option);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }
  
//update a category - like option
exports.product_update = async (req, res) => {
    try{
      let update_product  = await product_service.update(req.params.productID, req.body);
      if("error" in update_product){
        res.status(update_product['status']).json(update_product);
      }else{
        res.status(200).json(update_product);
      }
    }catch(err){
      res.status(500).json(fatal_error_status);
    }
  }