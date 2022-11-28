const chaiHttp = require('chai-http');
const chai = require('chai');

const should = chai.should();
const server = require('../server');

const events = require('../controllers/events');

chai.use(chaiHttp);

describe('Event', () => {
  describe('/GET events', () => {
    it('It should return all the events', (done) => {
      chai.request('http://localhost:8080/api/events')
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.should.not.redirect;
          done();
        });
    }).timeout(10000);
  });

  describe('/GET Event by id', () => {
    it('It return a single Event', (done) => {
      chai.request('http://localhost:8080/api/events')
        .get('/637ad15fe16a129364dc27fd')
        .end((err, res) => { // res is the response from the server and err is the error
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.should.be.json;
          res.should.not.redirect;
          res.body.should.have.property('description');
          res.body.should.have.property('date');
          res.body.should.have.property('link');
          res.body.should.have.property('title');
          res.body.should.have.property('time');
          res.body.should.have.property('location');
          res.body.should.have.property('organizer');
          done();
        }).timeout(10000);
    });
  });

  describe('/POST an Evebt', () => {
    it('It should post a new event to the exiting onces', (done) => {
      const event = {
        title: 'Test Event',
        description: 'This is a test event',
        date: '2020-01-01',
        time: '12:00',
        link: 'https://www.testevent.com',
        location: 'Test Location',
        organizer: 'Test Organizer',
        avatar: 'Test avatar',
      };
      chai.request('http://localhost:8080/api/events')
        .post('/')
        .send(event)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.should.be.json;
          res.should.not.redirect;
          res.body.should.have.property('title').eql('Test Event');
          res.body.should.have.property('description').eql('This is a test event');
          res.body.should.have.property('date').eql('2020-01-01T00:00:00.000Z');
          res.body.should.have.property('time').eql('12:00');
          res.body.should.have.property('location').eql('Test Location');
          res.body.should.have.property('organizer').eql('Test Organizer');
          res.body.should.have.property('avatar').eql('Test avatar');
          done();
        }).timeout(10000);
    });
  });

  describe('/PATCH an Event', () => {
    it('It should update an existing event', (done) => {
      const event = {
        title: 'Test updated Event',
        description: 'This is a updated test event',
        location: 'Test updated Location',
      };
      chai.request('http://localhost:8080/api/events')
        .patch('/63840157bc17a9f9aeadc9a1')
        .send(event)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.should.be.json;
          res.should.not.redirect;
          res.body.should.have.property('title').eql('Test updated Event');
          res.body.should.have.property('description').eql('This is a updated test event');
          res.body.should.have.property('date').eql('2020-01-01T00:00:00.000Z');
          res.body.should.have.property('time').eql('12:00');
          res.body.should.have.property('location').eql('Test updated Location');
          res.body.should.have.property('organizer').eql('Test Organizer');
          res.body.should.have.property('avatar').eql('Test avatar');
          done();
        }).timeout(10000);
    });
  });

  describe('/DELETE an Event', () => {
    it('It should delete an existing event', (done) => {
      chai.request('http://localhost:8080/api/events')
        .delete('/638402e62dbf07871a7c1444')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.should.be.json;
          res.should.not.redirect;
          res.body.should.have.property('message').eql('Event deleted successfully');
          done();
        }).timeout(10000);
    });
  });
});
