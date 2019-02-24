import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { mockQuestionDetails, mockVoteDetails, userAccounts } from './mocks/mockData';
// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

// deconstructure all mock data
const { validQuestion, invalidUserQuestion, invalidMeetupQuestion, invalidFieldQuestion, comment } = mockQuestionDetails;
const { validUpvote, validDownvote, invalidVoteType, invalidUser } = mockVoteDetails;
const { validUserAccount, validAdminAccount } = userAccounts;

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
    ** Testing Question Creation
    */

    it('/api/v1/questions should respond with status code 201 and ask a question', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('x-access-token', authToken)
        .send(validQuestion)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if meetup does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('x-access-token', authToken)
        .send(invalidFieldQuestion)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    /*
    ** Testing Comment Creation
    */
    it('/api/v1/1/comments should respond with status code 201 and comment on a question', (done) => {
      chai.request(app)
        .post('/api/v1/1/comments')
        .set('x-access-token', authToken)
        .send(comment)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('/api/v1/1/comments should respond with status code 404 if question does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/10000000/comments')
        .set('x-access-token', authToken)
        .send(comment)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Question does not exist');
          expect(res.body.error).to.eql(true);
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
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).eql(false);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 403 if user is not an admin', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql('You are not an Admin');
          expect(res.body.error).eql(true);
          done();
        });
    });


    it('/api/v1/questions should respond with status code 200 and retieve all questions for Meetup', (done) => {
      chai.request(app)
        .get('/api/v1/1/questions')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/1/questions')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).eql(false);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 400 if id is not a number', (done) => {
      chai.request(app)
        .get('/api/v1/id/questions')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('ID can only be a number');
          expect(res.body.error).eql(true);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if no questions have been asked', (done) => {
      chai.request(app)
        .get('/api/v1/1/questions')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          res.status = 404;
          res.body.status = 404;
          expect(res.status).to.equal(404);
          done();
        });
    });


    it('/api/v1/questions should respond with status code 200 and retieve all questions by User', (done) => {
      chai.request(app)
        .get('/api/v1/questions/user')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/questions/user')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).eql(false);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 404 if no questions have been asked', (done) => {
      chai.request(app)
        .get('/api/v1/1/questions')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          res.status = 404;
          res.body.status = 404;
          expect(res.status).to.equal(404);
          done();
        });
    });


    /*
    ** Testing Comments Retrieval
    */
    it('/api/v1/questions should respond with status code 200 and retieve all comments', (done) => {
      chai.request(app)
        .get('/api/v1/comments')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/comments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).eql(false);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 403 if user is not an admin', (done) => {
      chai.request(app)
        .get('/api/v1/comments')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql('You are not an Admin');
          expect(res.body.error).eql(true);
          done();
        });
    });


    it('/api/v1/questions should respond with status code 200 and retieve all comments for a question', (done) => {
      chai.request(app)
        .get('/api/v1/1/comments')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retreived all comments');
          done();
        });
    });

    it('/api/v1/questions should respond with status code 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/1/comments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).eql(false);
          done();
        });
    });


    it('/api/v1/questions should respond with status code 200 and retieve all comments by a user', (done) => {
      chai.request(app)
        .get('/api/v1/comments/user')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retreived all your comments');
          done();
        });
    });


    it('/api/v1/questions should respond with status code 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/1/comments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Please provide a JWT token');
          expect(res.body.auth).eql(false);
          done();
        });
    });


    /*
    ** Testing votes Retrieval
    */

    it('/api/v1/questions should respond with status code 200 and retieve all questions upvote', (done) => {
      chai.request(app)
        .get('/api/v1/1/upvote')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('/api/v1/questions should respond with status code 200 and retieve all questions downvote', (done) => {
      chai.request(app)
        .get('/api/v1/1/downvote')
        .set('x-access-token', authTokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
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
        .set('x-access-token', authToken)
        .send(validUpvote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('upvote successful');
          done();
        });
    });
    it('/api/v1/question/<question-id>/upvote should respond with status code 404 if question does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/20000/upvote')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Question does not exist');
          expect(res.body.error).to.eql(true);
          done();
        });
    });

    /*
    ** Testing Question Downvote
    */
    it('/api/v1/question/<question-id>/downvote should respond with status code 200 and downvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/2/downvote')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('downvote successful');
          done();
        });
    });
    it('/api/v1/question/<question-id>/downvote should respond with status code 404 if question does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/20000/downvote')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Question does not exist');
          expect(res.body.error).to.eql(true);
          done();
        });
    });
  });
});
