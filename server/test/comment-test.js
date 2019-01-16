import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('Questioner Server', () => {
  describe('POST /', () => {
    /*
    ** Testing Question commenting
    */
    it('/api/v1/comments should respond with status code 201 and comment on a question', (done) => {
      chai.request(app)
        .post('/api/v1/comments')
        .set('Accept', 'application/json')
        .send(validComment)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Account successfully created');
          done();
        });
    });

    it('/api/v1/comments should respond with status code 400 if any field is empty or has the wrong data type', (done) => {
      chai.request(app)
        .post('/api/v1/comments')
        .set('Accept', 'application/json')
        .send(emptyFieldComment)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('GET /', () => {
    /*
    ** Testing Comments Retrieval
    */
    it('/api/v1/comments should respond with status code 200 and retrieve all comments', (done) => {
      chai.request(app)
        .get('/api/v1/comments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all comments');
          done();
        });
    });

    it('/api/v1/comments should respond with status code 404 and if there are no comments', (done) => {
      chai.request(app)
        .get('/api/v1/comments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('There are no comments');
          done();
        });
    });

    it('/api/v1/comments/<question-id> should respond with status code 200 and retrieve all comments for that question', (done) => {
      chai.request(app)
        .get('/api/v1/comments/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all comments for this question');
          done();
        });
    });

    it('/api/v1/comments/<question-id> should respond with status code 404 if there is comment for that question', (done) => {
      chai.request(app)
        .get('/api/v1/comments/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No comment');
          done();
        });
    });

    it('/api/v1/comments/<user-id>/<question-id> should respond with status code 200 and retrieve all comments by a user on a question', (done) => {
      chai.request(app)
        .get('/api/v1/comments/1/2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('success');
          done();
        });
    });

    it('/api/v1/comments/<user-id>/<question-id> should respond with status code 200 if there are no comments by that user on that question', (done) => {
      chai.request(app)
        .get('/api/v1/comments/100/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No comments');
          done();
        });
    });
  })
});
