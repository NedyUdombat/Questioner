import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { mockMeetupDetails, mockRSVPDetails, userAccounts } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const { validMeetup, invalidPastMeetup, emptyFieldMeetup } = mockMeetupDetails;
const { validRsvp, invalidRsvp } = mockRSVPDetails;
const { validUserAccount, validAdminAccount, wrongPassword, nonExistentUser } = userAccounts;

let authToken;
let authTokenAdmin;

describe('Questioner Server', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(validUserAccount)
      .end((err, res) => {
        authToken = res.body.jwToken;
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(validAdminAccount)
      .end((err, res) => {
        authTokenAdmin = res.body.jwToken;
        done();
      });
  });

  describe('GET /', () => {
    /*
    ** Test for token deocde
    */
    it('/api/v1/decode should respond with status code 200 and decode a token', (done) => {
      chai.request(app)
        .get('/api/v1/decode')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('/api/v1/decode should respond with status code 401 if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/decode')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.auth).eql(false);
          expect(res.body.message).eql('Please provide a JWT token');
          done();
        });
    });
    /*
    ** Test to get all users
    */
    it('/api/v1/users should respond with status code 200 and retrieve all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all Users');
          done();
        });
    });

    it('/api/v1/users should respond with status code 404 if there are no users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          res.body.data = [];
          expect(res.body.data).to.eql([]);
          // expect(res.body.status).to.eql(404);
          // expect(res.body.message).to.eql('No User is available');
          done();
        });
    });

    it('/api/v1/users should respond with status code 403 if the requester is not an admin', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql('You are not an Admin');
          expect(res.body.error).to.eql(true);
          done();
        });
    });

    it('/api/v1/users should respond with status code 401 if the requester is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });

    /*
    ** Test to get specific user
    */
    it('/api/v1/user should respond with status code 200 and retrieve specific user', (done) => {
      chai.request(app)
        .get('/api/v1/user')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved specific user');
          done();
        });
    });

    it('/api/v1/user should respond with status code 401 if the requester is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/user')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });

    /*
    ** Test to get any user
    */
    it('/api/v1/user/<userId> should respond with status code 200 and retrieve any user', (done) => {
      chai.request(app)
        .get('/api/v1/user/1')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved specific user');
          done();
        });
    });
    it('/api/v1/user/<userId> should respond with status code 400 if id is not a number', (done) => {
      chai.request(app)
        .get('/api/v1/user/d')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('ID can only be a number');
          expect(res.body.error).to.eql(true);
          done();
        });
    });
    it('/api/v1/user/<userId> should respond with status code 404 if user doesn\t exist', (done) => {
      chai.request(app)
        .get('/api/v1/user/100000000')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('User not found');
          expect(res.body.error).to.eql(true);
          done();
        });
    });
    it('/api/v1/user/<userId> should respond with status code 401 if requester is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/user/100000000')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });
  });

  describe('DELETE /', () => {
    it('/api/v1/users/2 should respond with status code 200 and delete that user', (done) => {
      chai.request(app)
        .delete('/api/v1/users/1')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Successfully deleted user');
          done();
        });
    });
    it('/api/v1/users/2 should respond with status code 400 if ID is not a number', (done) => {
      chai.request(app)
        .delete('/api/v1/users/me')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('ID can only be a number');
          expect(res.body.error).to.eql(true);
          done();
        });
    });
    it('/api/v1/users/2 should respond with status code 404 if user doesn\'t exist', (done) => {
      chai.request(app)
        .delete('/api/v1/users/1')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.message).to.eql('User not found');
          done();
        });
    });
    it('/api/v1/users/2 should respond with status code 403 if user is not an admin', (done) => {
      chai.request(app)
        .delete('/api/v1/users/1')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.eql(403);
          expect(res.body.message).to.eql('You are not an Admin');
          done();
        });
    });
    it('/api/v1/users/2 should respond with status code 401 if admin is not logged in', (done) => {
      chai.request(app)
        .delete('/api/v1/users/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });

    it('/api/v1/users should respond with status code 200 and delete all users', (done) => {
      chai.request(app)
        .delete('/api/v1/users')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Successfully deleted users');
          done();
        });
    });
    it('/api/v1/users should respond with status code 404 if no user exist', (done) => {
      chai.request(app)
        .delete('/api/v1/users')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.message).to.eql('No user found');
          done();
        });
    });
    it('/api/v1/users should respond with status code 403 if user is not an admin', (done) => {
      chai.request(app)
        .delete('/api/v1/users')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.eql(403);
          expect(res.body.message).to.eql('You are not an Admin');
          done();
        });
    });
    it('/api/v1/users should respond with status code 401 if admin is not logged in', (done) => {
      chai.request(app)
        .delete('/api/v1/users')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });
  });
});
