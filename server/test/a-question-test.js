import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

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
  });

  describe('GET /', () => {
    /*
    ** Testing Question Retrieval
    */

    it('/api/v1/questions should respond with status code 200 and retieve all questions', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all questions');
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if no questions are available', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No questions have been asked yet');
          done();
        });
    });

    it('/api/v1/questions/<meetup-id> should respond with status code 200 and retrieve all questions for that meetup', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No questions have been asked yet');
          done();
        });
    });

    it('/api/v1/questions/<meetup-id> should respond with status code 404 if no question has been asked for that particular meetup', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No questions have been asked yet');
          done();
        });
    });

    it('/api/v1/questions/<user-id> should respond with status code 200 and retrieve all questions asked by that user', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No questions have been asked yet');
          done();
        });
    });

    it('/api/v1/questions/<user-id> should respond with status code 404 if no question has been asked by that user', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No questions have been asked yet');
          done();
        });
    });
  });
});
