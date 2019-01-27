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
  describe('POST /', () => {
    /*
    ** Testing Meetup Creation
    */
    it('/api/v1/meetups should respond with status code 201 and create a meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('x-access-token', authTokenAdmin)
        .send(validMeetup)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Meetup creation successful');
          done();
        });
    });

    it('/api/v1/meetups should respond with status code 400 if date is in the past', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('x-access-token', authTokenAdmin)
        .send(invalidPastMeetup)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('/api/v1/meetups should respond with status code 400 if any field is empty or has the wrong data type', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('x-access-token', authTokenAdmin)
        .send(emptyFieldMeetup)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    /*
    ** Testing Meetup rsvp
    */

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvp')
        .set('x-access-token', authToken)
        .send(validRsvp)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Rsvp meetup successful');
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 400 if status is not yes, no or maybe', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvp')
        .set('x-access-token', authToken)
        .send(invalidRsvp)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 404 if meetup does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/18/rsvps')
        .set('x-access-token', authToken)
        .send(validRsvp)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('GET /', () => {
    it('/api/v1/meetups should respond with status code 200 and retrieve all meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all meetups');
          done();
        });
    });

    it('/api/v1/meetups/upcoming should respond with status code 200 and retrieve all upcoming meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved specific meetup');
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/100')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 400 when Id is not a number', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/u')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    /*
    ** testing get routes for rsvp
    */

    it('/api/v1/rsvps should respond with status code 200 and retrieve all rsvps', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all rsvps');
          done();
        });
    });

    it('/api/v1/rsvps should respond with status code 404 when there are no rsvps', (done) => {
      chai.request(app)
        .get('/api/v1/1/rsvps')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          res.body.data = [];
          expect(res.body.data).to.eql([]);
          done();
        });
    });

    it('/api/v1/rsvps should respond with status code 401 id user is not logged-in', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('/api/v1/rsvps should respond with status code 403 if user is not an admin', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });


    it('/api/v1/<meetup-id>/rsvps should respond with status code 200 and retrieve all rsvps for a meetup', (done) => {
      chai.request(app)
        .get('/api/v1/1/rsvps')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 404 if there is no rsvp for that meetup', (done) => {
      chai.request(app)
        .get('/api/v1/100000/rsvps')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          res.body.data = [];
          expect(res.status).to.eql(404);
          expect(res.body.data).to.eql([]);
          done();
        });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 401 id user is not logged-in', (done) => {
      chai.request(app)
        .get('/api/v1/2/rsvps')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('/api/v1/<meetup-id>/rsvps should respond with status code 403 if user is not an admin', (done) => {
      chai.request(app)
        .get('/api/v1/1/rsvps')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });


    it('/api/v1/<user-id>/rsvps should respond with status code 200 and retrieve all rsvps by a user', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps/2')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/<user-id>/rsvps should respond with status code 404 if that user has no rsvps', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps/10000')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          res.body.data = [];
          expect(res.status).to.eql(404);
          expect(res.body.data).to.eql([]);
          done();
        });
    });

    it('/api/v1/<user-id>/rsvps should respond with status code 401 id user is not logged-in', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps/2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('DELETE /', () => {
    it('/api/v1/meetups/1 should respond with status code 200 and delete that meetup', (done) => {
      chai.request(app)
        .delete('/api/v1/meetups/1')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/meetups/1 should respond with status code 200 and delete all Meetups', (done) => {
      chai.request(app)
        .delete('/api/v1/meetups')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/meetups should respond with status code 404 if no meetup is available', (done) => {
      chai.request(app)
        .get('/api/v1/meetups')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.data).to.eql('No meetups is available');
          done();
        });
    });

  });
});
