var express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const neworder = require('../middleware/new-order');
const vieworder = require('../middleware/view-order');
const editorder = require('../middleware/view-order');

var OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", vieworder, OrdersController.orders_get_all);

router.post("/", neworder, OrdersController.orders_create_order);

router.get("/mostorderedproducts/", vieworder, OrdersController.orders_get_most_ordered_products);

router.get("/mostorderedproductsbyquantity", vieworder, OrdersController.orders_get_most_ordered_products_by_quantity);

router.get("/leastproductiontimeproducts", vieworder, OrdersController.orders_get_least_production_time_products);

router.get("/:orderId", vieworder, OrdersController.orders_get_order);

router.put("/:orderId", editorder, OrdersController.orders_update_order);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

router.get("/user/:userId", vieworder, OrdersController.orders_get_order_by_user);

module.exports = router;