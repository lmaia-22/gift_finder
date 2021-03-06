const mongoose = require("mongoose");

function connect(){
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            
            mockgoose.prepareStorage()
            .then(() => {
                mongoose.connect(
                    "mongodb+srv://dbAdmin:" +
                    process.env.MONGO_ATLAS_PW +
                    "@db-giftfinder.swntv.azure.mongodb.net/giftfinder?retryWrites=true&w=majority",
                    {   
                        useNewUrlParser: true,
                        useFindAndModify: false,
                        useCreateIndex: true,
                        useUnifiedTopology: true,
                        reconnectTries: 30,
                        reconnectInterval: 500, // in ms
                    })
                    .then((res,err) => {
                        if(err){
                            console.error(error);
                            return reject(err);
                        }
                        console.log("connected to the database")
                        resolve();
                    })
                })
            }else{
                mongoose.connect(
                    "mongodb+srv://dbAdmin:" +
                    process.env.MONGO_ATLAS_PW +
                    "@db-giftfinder.swntv.azure.mongodb.net/giftfinder?retryWrites=true&w=majority",
                    {   
                        useNewUrlParser: true,
                        useFindAndModify: false,
                        useCreateIndex: true,
                        useUnifiedTopology: true,
                        reconnectTries: 30,
                        reconnectInterval: 500, // in ms
                    })
                    .then((res,err) => {
                        if(err){
                            console.error(error);
                            return reject(err);
                        }
                        console.log("connected to the database")
                        resolve();
                    })
                }
            })
        }
        
        function close(){
            return mongoose.disconnect()
        }
        
        module.exports = {connect, close}