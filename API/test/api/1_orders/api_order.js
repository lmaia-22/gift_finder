process.env.NODE_ENV = 'test';
process.env.JWT_KEY = 'test'

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/database.js');

process.env.LOGIN_TOKEN = '';
process.env.USER_ID = '';
process.env.ORDER_ID = '';


describe('/orders', () => {
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
    
    it('OK, order list is empty', (done) => {
        request(app).post('/users/login')
        .send({
            email: "alberto5@gmail.com",
            password: "12345"
        })
        .then((res) =>{
            process.env.LOGIN_TOKEN = res.body.token
            process.env.USER_ID = res.body.userId
            request(app).get('/orders')
            .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
            .then((res) => {
                const orders = res.body.orders;
                expect(orders.length).to.equal(0);
                done();
            })
            .catch((err) => done(err));
        });
    })
    
    it('OK, can post an order', (done) => {
        request(app).post('/orders')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .send({
            productId: 3,
            userId: process.env.USER_ID,
            quantity:12
        })
        .then((res)=>{
            console.log(res.body)
            process.env.ORDER_ID = res.body.createdOrder._id
            const body = res.body;
            expect(body).to.contain.property('message');
            expect(body).to.contain.property('createdOrder');
            done();
        })
        .catch((err) => done(err));
    })
    
    it('OK, order list have orders', (done) => {
        request(app).post('/orders')
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .send({
            productId: 3,
            userId: process.env.USER_ID,
            quantity:12
        })
        .then((res)=>{
            request(app).get('/orders')
            .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
            .then((res) => {
                const orders = res.body.orders;
                expect(orders.length).to.greaterThan(0);
                done();
            })
        })
        .catch((err) => done(err));
    })
    
    it('OK, can get order from user created', (done) => {
        request(app).get('/orders/user/' + process.env.USER_ID)
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res) =>{
            const orders = res.body.orders
            expect(orders.length).to.greaterThan(0);        
            done();
        })
        
    })
    
    it('OK, i can edit an order', (done) => {
        request(app).put('/orders/' + process.env.ORDER_ID)
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .send({
            productId: 3,
            status: "processada",
            quantity:6
        })
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('message');
            done();
        })
        .catch((err) => done(err));
    })
    
    it('OK, i can delete an order', (done) => {
        request(app).delete('/orders/' + process.env.ORDER_ID)
        .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('message');
            done();
        })
        .catch((err) => done(err));
    })
    
})