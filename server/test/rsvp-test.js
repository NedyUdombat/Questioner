import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import meetups from '../models/v1/meetups';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('Questioner Server', () => {
  describe('POST /', () => {
    /*
    ** Testing Meetup rsvp
    */

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
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
        .post('/api/v1/meetups/1/rsvps')
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
    it('/api/v1/rsvps should respond with status code 200 and retrieve all rsvps', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all rsvps');
          done();
        });
    });

    it('/api/v1/rsvps should respond with status code 404 if no rsvps are available', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No available Rsvps at the moment');
          done();
        });
    });

    it('/api/v1/rsvps/<meetup-id> should respond with status code 200 and retrieve all rsvps for that meetup', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps-meetup/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all rsvps');
          done();
        });
    });

    it('/api/v1/rsvps/<meetup-id> should respond with status code 404 if no rsvps is availablefor that meetup', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps-meetup/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No rsvp is availablefor this meetup at the moment');
          done();
        });
    });

    it('/api/v1/rsvps/<user-id> should respond with status code 200 and retrieve all rsvps for that user', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps-user/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all your rsvps');
          done();
        });
    });

    it('/api/v1/rsvps/<user-id> should respond with status code 200 if no rsvp is availablefor that user', (done) => {
      chai.request(app)
        .get('/api/v1/rsvps-user/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No rsvp is availablefor this meetup at the moment');
          done();
        });
    });
  });
});
