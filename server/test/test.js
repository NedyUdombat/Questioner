import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { mockMeetupDetails } from './mocks/mockData'


// Configure chai
chai.use(chaiHttp);
chai.should();

//deconstructure all mock data
const { validMeetup, emptyFieldMeetup } = mockMeetupDetails;

describe('Meetups', () => {
  describe('GET /', () => {
    // Test to get all meetup record
    it('should get all meetup record', (done) => {
      chai.request(app)
        .get('/api/v1/meetups')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    // Test to get single meetup record
    it('should get a single meetup record', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test to get a non available meetup student record
    it('should not get a single meetup record that does not exist', (done) => {
      const id = String;
      chai.request(app)
        .get(`/api/v1/meetup/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /', () => {
    // Test to get all meetup record
    it('should create a meetup record', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(validMeetup)
        .end((err, res) => {
          res.should.have.status(201);
          // res.should.have.body('Create meetup successful');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not create a meetup record with an empty field', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(emptyFieldMeetup)
        .end((err, res) => {
          res.should.have.status(400);
          // res.should.have.body('Create meetup successful');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not create a meetup record if meetup already exists', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(validMeetup)
        .end((err, res) => {
          res.should.have.status(409);
          // res.should.have.body('Create meetup successful');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not create a meetup record if meetup already exists', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(validMeetup)
        .end((err, res) => {
          res.should.have.status(409);
          // res.should.have.body('Create meetup successful');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
