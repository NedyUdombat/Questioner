import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Meetups", () => {
    describe("GET /", () => {
        // Test to get all meetup record
        it("should get all meetup record", (done) => {
             chai.request(app)
                 .get('/api/v1/meetups')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test to get single meetup record
        it("should get a single meetup record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/api/v1/meetup/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to get a non available meetup student record
        it("should not get a single meetup record", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/api/v1/meetup/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});