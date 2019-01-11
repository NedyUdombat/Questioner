import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import meetups from '../models/v1/meetups';
import { mockMeetupDetails, mockQuestionDetails, mockRSVPDetails, mockVoteDetails } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

// deconstructure all mock data
const { validMeetup, emptyFieldMeetup, nonAdminMeetup } = mockMeetupDetails;
const { validQuestion, invalidUserQuestion, invalidMeetupQuestion, invalidFieldQuestion } = mockQuestionDetails;
const { validRsvp, invalidRsvp } = mockRSVPDetails;
const { validVoter, invalidVoter, invalidVoterDataType } = mockVoteDetails;

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
          expect(res.body.message).to.eql('Meetup successfully created');
          done();
        });
    });

    it('/api/v1/meetups should respond with status code 401 if user is not an admin', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('Accept', 'application/json')
        .send(nonAdminMeetup)
        .end((err, res) => {
          expect(res.status).to.equal(403);
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
    ** Testing Question Creation
    */

    it('/api/v1/questions should respond with status code 201 and ask a question', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('Accept', 'application/json')
        .send(validQuestion)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Question asked successfully');
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if user does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('Accept', 'application/json')
        .send(invalidUserQuestion)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if meetup does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('Accept', 'application/json')
        .send(invalidMeetupQuestion)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if meetup does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('Accept', 'application/json')
        .send(invalidFieldQuestion)
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

  describe('PATCH /', () => {
    /*
    ** Testing question upvote
    */

    it('/api/v1/question/<question-id>/upvote should respond with status code 200 and upvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('Accept', 'application/json')
        .send(validVoter)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Upvote successful');
          done();
        });
    });

    it('/api/v1/question/<question-id>/upvote should respond with status code 404 if the user doesnt exist(logged in or signed up)', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('Accept', 'application/json')
        .send(invalidVoter)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/question/<question-id>/upvote should respond with status code 400 if the input is of the wrong data type', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('Accept', 'application/json')
        .send(invalidVoterDataType)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    /*
    ** Testing Question Downvote
    */
    it('/api/v1/question/<question-id>/downvote should respond with status code 200 and downvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/2/downvote')
        .set('Accept', 'application/json')
        .send(validVoter)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 404 if the user doesnt exist(logged in or signed up)', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/2/downvote')
        .set('Accept', 'application/json')
        .send(invalidVoter)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 400 if the input is of the wrong data type', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/2/downvote')
        .set('Accept', 'application/json')
        .send(invalidVoterDataType)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('GET /', () => {
    it('should respond with status code 200', (done) => {
      chai.request(app)
        .get('/')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api! Visit /api/v1 for the Version 1 of out api');
          done();
        });
    });

    it('should respond with status code 200 at /api/v1', (done) => {
      chai.request(app)
        .get('/api/v1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api!');
          done();
        });
    });

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
        .get('/api/v1/meetup/2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved specific meetup');
          done();
        });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 404 when meetup is not available', (done) => {
      chai.request(app)
        .get('/api/v1/meetup/10')
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

    it('/api/v1/meetups/upcoming should respond with status code 200 and retrieve all upcoming meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
          done();
        });
    });

    it('/api/v1/meetups should respond with status code 404 when there are no meetups', (done) => {
      meetups.splice(0, 7);
      chai.request(app)
        .get('/api/v1/meetups')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('/api/v1/meetups/upcoming should respond with status code 404 when there are no upcoming meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('There are no upcoming meetups');
          done();
        });
    });
  });
});
