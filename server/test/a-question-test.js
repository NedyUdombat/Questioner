import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { mockQuestionDetails, mockVoteDetails } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

// deconstructure all mock data
const { validQuestion, invalidUserQuestion, invalidMeetupQuestion, invalidFieldQuestion } = mockQuestionDetails;
const { validUpvote, validDownvote, invalidVoteType, invalidUser } = mockVoteDetails;

describe('Questioner Server', () => {
  describe('POST /', () => {
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
  });

  describe('PATCH /', () => {
    /*
    ** Testing question upvote
    */

    it('/api/v1/question/<question-id>/upvote should respond with status code 200 and upvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('Accept', 'application/json')
        .send(validUpvote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Question upvote successful');
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
        .send(validDownvote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
