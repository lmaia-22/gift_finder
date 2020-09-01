process.env.NODE_ENV = 'test';
process.env.JWT_KEY = 'test'

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/database.js');
const Order = require("../../../api/models/order");

process.env.LOGIN_TOKEN = '';
process.env.USER_ID = '';
process.env.ORDER_ID = '';


describe('/orders it4', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
    
    after((done) => {
        conn.close()
        .then(() => done())
        .catch((err) => done(err));
    })
    
    it("OK, most ordered products doesn't have content", (done) => {
        request(app).post('/users/login')
        .send({
            email: "alberto@gmail.com",
            password: "12345"
        })
        .then((res) =>{
            //clear the order list
            Order.find()
            .deleteMany()
            .exec()
            .then(() =>{
                process.env.LOGIN_TOKEN = res.body.token
                process.env.USER_ID = res.body.userId
                request(app).get('/orders/mostorderedproducts')
                .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
                .then((res) => {
                    expect(res.status).to.equal(204);
                    done();
                })
                .catch((err) => done(err));
            })
        });
    })

    it("OK, most ordered products by quantity doesn't have content", (done) => {
        request(app).get('/orders/mostorderedproductsbyquantity')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res) => {
            expect(res.status).to.equal(204);
            done();
        })
        .catch((err) => done(err));
    })

    it("OK, least production time doesn't have content", (done) => {
        request(app).get('/orders/leastproductiontimeproducts')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res) => {
            expect(res.status).to.equal(204);
            done();
        })
        .catch((err) => done(err));
    })

    function add_new_order(){
        return new Promise((resolve, reject) => {
        request(app).post('/orders')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .send({
            productId: Math.floor(Math.random() * 3) + 1 ,
            userId: process.env.USER_ID,
            quantity: Math.floor(Math.random() * 100) + 1 
        })
        .then((res)=>{
            resolve(true)
        })
        .catch((err) => {
            reject(err)
        })
    })
    }

    it("OK, least duration products are beign ordered correctly", async () => {
        for(var i = 0; i< 10; i++){
            await add_new_order()
        }
        request(app).get('/orders/leastproductiontimeproducts')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res) => {
            const least_duration = res.body.least_duration
            var current_duration = 0
            for(let element in least_duration){
                //console.log("element duration",least_duration[element].duration,">=current duration",current_duration)
                if (least_duration[element].duration >= current_duration){
                    current_duration = least_duration[element].duration
                }else{
                    throw new Error('not ordering properly')
                }
            }
            expect(res.status).to.equal(200);
            //done()
        })
        //.catch((err) => done(err));
    })

    it("most ordered products by occurence are beign ordered correctly", (done) => {
        request(app).get('/orders/mostorderedproducts')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res) => {
            var most_occurences = res.body
            //console.log(most_occurences)
            var occurences = most_occurences[0].occurences
            for(let element in most_occurences){
                if (most_occurences[element].occurences <= occurences){
                    occurences = most_occurences[element].occurences
                }else{
                    throw new Error('not ordering properly')
                }
            }
            expect(res.status).to.equal(200);
            done();
        })
        .catch((err) => done(err));
    })

    it("most ordered products by quantity are beign ordered correctly", (done) => {
        request(app).get('/orders/mostorderedproductsbyquantity')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res) => {
            var most_quantity = res.body
            //console.log(most_quantity)
            var quantity = most_quantity[0].total_quantity
            for(let element in most_quantity){
                //console.log("element"+most_quantity[element].total_quantity+" currant "+quantity)
                if (most_quantity[element].total_quantity <= quantity){
                    quantity = most_quantity[element].total_quantity
                }else{
                    throw new Error('not ordering properly')
                }
            }
            expect(res.status).to.equal(200);
            done();
        })
        .catch((err) => done(err));
    })

    it('creates a client user', (done) =>{
        request(app).post('/users/signup')
        .send({
        name: "test_normal_client",
        email:"test_normal_client@gmail.com",
        password: "12345",
        address: "Rua de cima"
        })
        .then((res) =>{
            process.env.NORMAL_USER_LOGIN_TOKEN = res.body.token
            process.env.NORMAL_USER_ID = res.body.userId
            expect(res.status).to.equal(201)
        })
    })

    it('creates an admin user', (done) =>{
        request(app).post('/users/signup')
        .send({
        name: "test_admin",
        email:"test_admin@gmail.com",
        password: "12345",
        address: "Rua de cima",
        role: 1
        })
        .then((res) =>{
            process.env.ADMIN_USER_LOGIN_TOKEN = res.body.token
            process.env.ADMIN_USER_ID = res.body.userId
            expect(res.status).to.equal(201)
        })
    })
})