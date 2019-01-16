import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import meetups from '../models/v1/meetups';
import { mockMeetupDetails, mockRSVPDetails } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const { validMeetup, invalidPastMeetup, emptyFieldMeetup } = mockMeetupDetails;
const { validRsvp, invalidRsvp } = mockRSVPDetails;


describe('Questioner Server', () => {
  describe('POST /', () => {
    /*
    ** Testing Meetup Creation
    */
    it('/api/v1/meetups should respond with status code 201 and create a meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('Accept', 'application/json')
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
        .set('Accept', 'application/json')
        .send(invalidPastMeetup)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('/api/v1/meetups should respond with status code 400 if any field is empty or has the wrong data type', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('Accept', 'application/json')
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
        .set('Accept', 'application/json')
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
        .set('Accept', 'application/json')
        .send(invalidRsvp)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 404 if meetup does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/18/rsvps')
        .set('Accept', 'application/json')
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
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all meetups');
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetup/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved specific meetup');
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', (done) => {
      chai.request(app)
        .get('/api/v1/meetup/100')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 400 when Id is not a number', (done) => {
      chai.request(app)
        .get('/api/v1/meetup/u')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    // it('/api/v1/me/etups/upcoming should respond with status code 200 and retrieve all upcoming meetup', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/upcoming')
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
    //       done();
    //     });
    // });
    //
    // it('/api/v1/meetups should respond with status code 404 when there are no meetups', (done) => {
    //   meetups.splice(0, 7);
    //   chai.request(app)
    //     .get('/api/v1/meetups')
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(404);
    //       done();
    //     });
    // });
    //
    // it('/api/v1/meetups/upcoming should respond with status code 404 when there are no upcoming meetups', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/meetups/upcoming')
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(404);
    //       expect(res.body.message).to.eql('There are no upcoming meetups');
    //       done();
    //     });
    // });
  });
});
