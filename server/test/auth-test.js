import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { userAccounts } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const { validUserAccount, validAdminAccount } = userAccounts;


describe('Questioner Server', () => {
  describe('POST /', () => {
    /*
    ** Testing Meetup Creation
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

    it('/api/v1/auth/signup should respond with status code 201 and create an admin account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(validAdminAccount)
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
          expect(res.body.message).to.eql('email is already in use taken');
          done();
        });
    });
  });
});
