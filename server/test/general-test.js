import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { mockQuestionDetails, mockVoteDetails } from './mocks/mockData';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

// deconstructure all mock data
const { validQuestion, invalidUserQuestion, invalidMeetupQuestion, invalidFieldQuestion } = mockQuestionDetails;
const { validVoter, invalidVoter, invalidVoterDataType } = mockVoteDetails;

describe('Questioner Server', () => {
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

    it('should respond with status code 404 at /api/v1 if page does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/y')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('The page you are looking for does not exist');
          done();
        });
    });
  });
});
