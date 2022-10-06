let chaiHttp = require('chai-http');
let chai = require('chai');
let should = chai.should();
let server = require('../server');

let events = require('../controllers/events');
chai.use(chaiHttp)

describe('Event', () => {
    describe('/GET events', () => {
        it('It should return all the events', (done) => {
           chai.request('http://localhost:8080/api')
           .get('/')
           .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.should.be.json;
            res.should.not.redirect;
            done()
           })
        })
    })

    describe('/GET Event by id', () => {
        it('It return a single Event', (done) => {
           chai.request('http://localhost:8080/api')
           .get('/1')
           .end((err, res) => { // res is the response from the server and err is the error
               res.should.have.status(200);
               res.body.should.be.an('object');
               res.should.be.json;
               res.should.not.redirect;
               res.body.should.have.property('description');
               res.body.should.have.property('date');
               res.body.should.have.property('image');
               res.body.should.have.property('name');
                res.body.should.have.property('time');
                res.body.should.have.property('location');
                res.body.should.have.property('organizer');
               done()
           })
        })
    })

    describe('/POST an Evebt', () => {
        it('It should post a new event to the exiting onces', (done) => {
            const event = {
                    name: 'Test Event',
                    description: 'This is a test event',
                    date: '2020-01-01',
                    time: '12:00',
                    location: 'Test Location',
                    organizer: 'Test Organizer',
                    image: 'Test Image'
                }
           chai.request('http://localhost:8080/api')
           .post('/')
              .send(event)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.should.be.json;
                res.should.not.redirect;
                res.body.should.have.property('Success').eql('Event created successfully');
                res.body.should.have.property('Event');
                res.body.Event.should.have.property('name').eql('Test Event');
                res.body.Event.should.have.property('description').eql('This is a test event');
                res.body.Event.should.have.property('date').eql('2020-01-01');
                res.body.Event.should.have.property('time').eql('12:00');
                res.body.Event.should.have.property('location').eql('Test Location');
                res.body.Event.should.have.property('organizer').eql('Test Organizer');
                res.body.Event.should.have.property('image').eql('Test Image');
                done()
              })
            })
        })

        describe('/PATCH an Event', () => {
            it('It should update an existing event', (done) => {
                const event = {
                        name: 'Test Event',
                        description: 'This is a test event',
                        date: '2020-01-01',
                        time: '12:00',
                        location: 'Test Location',
                        organizer: 'Test Organizer',
                        image: 'Test Image'
                    }
               chai.request('http://localhost:8080/api')
               .patch('/1')
                  .send(event)
                  .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.should.be.json;
                    res.should.not.redirect;
                    res.body.should.have.property('Success').eql('Event updated successfully');
                    res.body.should.have.property('Event');
                    res.body.Event.should.have.property('name').eql('Test Event');
                    res.body.Event.should.have.property('description').eql('This is a test event');
                    res.body.Event.should.have.property('date').eql('2020-01-01');
                    res.body.Event.should.have.property('time').eql('12:00');
                    res.body.Event.should.have.property('location').eql('Test Location');
                    res.body.Event.should.have.property('organizer').eql('Test Organizer');
                    res.body.Event.should.have.property('image').eql('Test Image');
                    done()
                })
        })
    })

    describe('/DELETE an Event', () => {
        it('It should delete an existing event', (done) => {
           chai.request('http://localhost:8080/api')
           .delete('/1')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.should.be.json;
                res.should.not.redirect;
                res.body.should.have.property('Success').eql('Event deleted successfully');
                done()
              }
              )
        })
    })
})

