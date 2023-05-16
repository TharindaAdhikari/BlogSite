import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import request from "supertest";
import User from "../models/user.js";


chai.use(chaiHttp);
chai.should();
chai.expect();

//Test case for register user enpoint
describe("/POST/", () => {
    it("it should be create a new users", (done) => {
      const user = {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123'
      }
  
      chai.request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User created successfully');
        done();
      });
    });

    // it('should return 409 if user already exists', (done) => {
    //   const user = {
    //     username: 'johndoe',
    //     email: 'johndoe@example.com',
    //     password: 'password123'
    //   };
  
    //   chai.request(app)
    //     .post('/api/auth/register')
    //     .send(user)
    //     .end((err, res) => {
    //       res.should.have.status(409);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('message').eql('User already exists');
    //       done();
    //     });
    // });


  });


//Test the login endpoint
describe('POST /login', () => {

  it('should login an existing user', (done) => {
    const user = {
      username: 'johndoe',
      password: 'password123'
    };

    chai.request(app)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('username').eql(user.username);
        res.body.should.have.property('email').eql('johndoe@example.com');
        res.body.should.not.have.property('password');
        done();
      });
  });

  it('should return 404 if user does not exist', (done) => {
    const user = {
      username: 'janedoe',
      password: 'password123'
    };

    chai.request(app)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('string');
        res.body.should.eql('User not found!');
        done();
      });
  });

  it('should return 400 if password is incorrect', (done) => {
    const user = {
      username: 'johndoe',
      password: 'wrongpassword'
    };

    chai.request(app)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('string');
        res.body.should.eql('Wrong username or password!');
        done();
      });
  });

});
