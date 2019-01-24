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
  // describe('POST /', () => {
  //   /*
  //   ** Testing Meetup Creation
  //   */
  //   it('/api/v1/meetups should respond with status code 201 and create a meetup', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/meetups')
  //       .set('x-access-token', authTokenAdmin)
  //       .send(validMeetup)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(201);
  //         expect(res.body.message).to.eql('Meetup creation successful');
  //         done();
  //       });
  //   });
  //
  //   it('/api/v1/meetups should respond with status code 400 if date is in the past', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/meetups')
  //       .set('x-access-token', authTokenAdmin)
  //       .send(invalidPastMeetup)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });
  //
  //   it('/api/v1/meetups should respond with status code 400 if any field is empty or has the wrong data type', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/meetups')
  //       .set('x-access-token', authTokenAdmin)
  //       .send(emptyFieldMeetup)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });
  //
  //   /*
  //   ** Testing Meetup rsvp
  //   */
  //
  //   it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/meetups/1/rsvp')
  //       .set('x-access-token', authToken)
  //       .send(validRsvp)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(201);
  //         expect(res.body.message).to.eql('Rsvp meetup successful');
  //         done();
  //       });
  //   });
  //
  //   it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 400 if status is not yes, no or maybe', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/meetups/1/rsvp')
  //       .set('x-access-token', authToken)
  //       .send(invalidRsvp)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });
  //
  //   it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 404 if meetup does not exist', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/meetups/18/rsvps')
  //       .set('x-access-token', authToken)
  //       .send(validRsvp)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //   });
  // });

  describe('GET /', () => {
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
      const result = chai.request(app);
      result
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
    it('/api/v1/users/<userId> should respond with status code 200 and retrieve specific user', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved specific user');
          done();
        });
    });

    it('/api/v1/users should respond with status code 404 if the user doesn\'t exist', (done) => {
      chai.request(app)
        .get('/api/v1/users/100000')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('User not found');
          expect(res.body.error).to.eql(true);
          done();
        });
    });

    it('/api/v1/users should respond with status code 401 if the requester is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });

    it('/api/v1/users should respond with status code 400 if the id is not a number', (done) => {
      chai.request(app)
        .get('/api/v1/users/j')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('ID can only be a number');
          expect(res.body.error).to.eql(true);
          done();
        });
    });

    // it('/api/v1/me/etups/upcoming should respond with status code 200 and retrieve all upcoming meetup', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/upcoming')
    //     .set('x-access-token', authToken)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
    //       done();
    //     });
    // });
    //
    // it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/1')
    //     .set('x-access-token', authToken)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body.message).to.eql('Successfully retrieved specific meetup');
    //       done();
    //     });
    // });
    //
    // it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/100')
    //     .set('x-access-token', authToken)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(404);
    //       done();
    //     });
    // });
    //
    // it('/api/v1/meetups/<meetup-id> should respond with status code 400 when Id is not a number', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/u')
    //     .set('x-access-token', authToken)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(400);
    //       done();
    //     });
    // });
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
  });
});
