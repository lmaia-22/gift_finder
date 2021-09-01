
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');
const ageRoutes = require('./api/routes/age');
const genderRoutes = require('./api/routes/gender');
const jobRoutes = require('./api/routes/job');
const likeRoutes = require('./api/routes/like');
const childlikeRoutes = require('./api/routes/childlike');
const typeRoutes = require('./api/routes/type');
const categoryRoutes = require('./api/routes/category');
const childcategoryRoutes = require('./api/routes/childcategory');
const eventRoutes = require('./api/routes/event');
const traitRoutes = require('./api/routes/trait');
const productRoutes = require('./api/routes/product');
const rolesRoutes = require('./api/routes/roles');
const requestRoutes = require('./api/routes/request');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use((req, res, next) => {
      req.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
      res.header("Access-Control-Allow-Methods", "GET, POST","PUT", "DELETE");
      next();
    });
    
    app.use(cors({
      origin: true, // "true" will copy the domain of the request back
      // to the reply. If you need more control than this
      // use a function.
      
      credentials: true, // This MUST be "true" if your endpoint is
      // authenticated via either a session cookie
      // or Authorization header. Otherwise the
      // browser will block the response.
      
      methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
      // pre-flight OPTIONS requests
    }));
    
    // Routes which should handle requests
    app.use("/orders", orderRoutes);
    app.use("/users", userRoutes);
    app.use("/age", ageRoutes);
    app.use("/gender", genderRoutes);
    app.use("/job", jobRoutes);
    app.use("/type", typeRoutes);
    app.use("/like", likeRoutes);
    app.use("/childlike", childlikeRoutes);
    app.use("/category", categoryRoutes);
    app.use("/childcategory", childcategoryRoutes);
    app.use("/event", eventRoutes);
    app.use("/trait", traitRoutes);
    app.use("/product", productRoutes);
    app.use("/roles", rolesRoutes);
    app.use("/request", requestRoutes);
    
    app.use((req, res, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });
    
    app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message
        }
      });
    });
    
    app.use(cors());
    app.use(cors(corsOptions));
    
    module.exports = app;