import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { userAccounts } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const { validUserAccount, validAdminAccount, nonExistentUser } = userAccounts;

let authToken;

describe('Questioner Server', () => {
  describe('POST /', () => {
    /*
    ** Testing Account Creation
    */
    it('/api/v1/auth/signup should respond with status code 201 and create a user account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(validUserAccount)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Account created');
          done();
        });
    });

    it('/api/v1/auth/signup should respond with status code 409 if account already exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(validUserAccount)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.eql('email is already in use, if that email belongs to you, kindly login');
          done();
        });
    });

    /*
    ** Testing Account Login
    */

    it('/api/v1/auth/login should respond with status code 404 if user does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(nonExistentUser)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).eql('User does not exist');
          done();
        });
    });

    it('/api/v1/auth/login should respond with status code 200 and log a user in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(validAdminAccount)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });

    /*
    ** Testing Account Logout
    */

    it('/api/v1/auth/logout should respond with status code 200 and log user out', (done) => {
      chai.request(app)
        .get('/api/v1/auth/logout')
        .set('Accept', 'application/json')
        .send(validAdminAccount)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.auth).eql(false);
          expect(res.body.token).eql(null);
          done();
        });
    });
  });
});
