process.env.NODE_ENV = 'test';
process.env.JWT_KEY = 'test'

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/database.js');

process.env.LOGIN_TOKEN = '';
process.env.USER_ID = '';
process.env.ORDER_ID = '';

describe('/users', () => {
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
  
  it('OK, users list is empty', (done) => {
    request(app).get('/users')
    .then((res) => {
      const users = res.body.users;
      expect(users.length).to.equal(0);
      done();
    })
    .catch((err) => done(err));
  });

  it('OK, user cant login', (done) => {
    request(app).post('/users/login')
    .send({
      email:"testingdummy",
      password: "qwewtretyy",
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('error');
      done();
    })
    .catch((err) => done(err));
  });
  
  it('OK, user can register', (done) => {
    request(app).post('/users/signup')
    .send({
      name: "alberto2",
      email:"alberto5@gmail.com",
      password: "12345",
      address: "Rua de cima"
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('name');
      expect(body).to.contain.property('email');
      expect(body).to.contain.property('address');
      expect(body).to.contain.property('role');
      expect(body).to.contain.property('_id');
      done();
    })
    .catch((err) => done(err));
  });
  
  it('OK, user can login', (done) => {
    request(app).post('/users/login')
    .send({
      email:"alberto5@gmail.com",
      password: "12345",
    })
    .then((res) => {
      const body = res.body;
      process.env.LOGIN_TOKEN = body.token;
      process.env.USER_ID = body.userId;
      expect(body).to.contain.property('message');
      expect(body).to.contain.property('token');
      expect(body).to.contain.property('userId');
      expect(body).to.contain.property('role');
      done();
    })
    .catch((err) => done(err));
  });
  
  it('OK, users has 1 user', (done) => {
    request(app).get('/users')
    .then((res) => {
      const users = res.body.users;
      expect(users.length).to.equal(1);
      done();
    })
    .catch((err) => done(err));
  });
  
  it('OK, can get a single user', (done) => {
    request(app)
    .get('/users/'+process.env.USER_ID)
    .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
    .then((res) => {
      const user = res.body.User._id;
      expect(user).to.equal(process.env.USER_ID);
      done();
    })
    .catch((err) => done(err));
  })
  
  it('OK, user can be edited', (done) => {
    request(app).put('/users/' + process.env.USER_ID)
    .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
    .send({
      name: "testput",
      address: "addresstest"
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('name');
      expect(body).to.contain.property('email');
      expect(body).to.contain.property('address');
      expect(body).to.contain.property('role');
      expect(body).to.contain.property('_id');
      done();
    })
    .catch((err) => done(err));
  })
  
  it('OK, user can be deleted', (done) => {
    request(app).post('/users/signup')
    .send({
      name: "alberto2",
      email:"alberto69@gmail.com",
      password: "12345",
      address: "Rua de cima"
    })
    .then((res)=>{
      const userId = res.body._id
      request(app).delete('/users/' + userId)
      .set("Authorization", "Bearer " + process.env.LOGIN_TOKEN)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('message');
        done();
      })
    })
    .catch((err) => done(err));                               
  })
  
})