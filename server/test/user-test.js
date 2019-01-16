import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('Questioner Server', () => {
  describe('POST /', () => {
    /*
    ** Testing User Account Creation
    */
    it('/api/v1/auth/signup should respond with status code 201 and create a user account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Account successfully created');
          done();
        });
    });

    it('/api/v1/auth/signup should respond with status code 409 if user already exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.eql('User already exists try logging in');
          done();
        });
    });

    it('/api/v1/auth/signup should respond with status code 400 if any field is empty or has the wrong data type', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(emptyFieldUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    /*
    ** Testing User Account login
    */

    it('/api/v1/auth/login should respond with status code 201 and log a user in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql('Account successfully created');
          done();
        });
    });

    it('/api/v1/auth/login should respond with status code 404 if user doesnt exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(nonExistentUser)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('User doesnt exists try creating an account');
          done();
        });
    });

    it('/api/v1/auth/login should respond with status code 409 if any field is empty or has the wrong data type', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send(loginEmptyFieldUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
  });

  describe('GET /', () => {
    /*
    ** Testing User Account Retrieval
    */
    it('/api/v1/users should respond with status code 200 and retieve all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Successfully retrieved all users');
          done();
        });
    });

    it('/api/v1/users should respond with status code 404 and if there are no users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('There are no users');
          done();
        });
    });

    it('/api/v1/users/<user-id> should respond with status code 200 and retieve that users', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('User successfully retrieved');
          done();
        });
    });

    it('/api/v1/users/<user-id> should respond with status code 404 and if user does not exists', (done) => {
      chai.request(app)
        .get('/api/v1/users/8')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('This user does not exist');
          done();
        });
    });
  })
});
