const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); // Assuming your server.js exports the app
const expect = chai.expect;

chai.use(chaiHttp);

describe('RSVP API', () => {
  let eventSlug = 'test-wedding';

  before(async () => {
    // Create a test event before running tests
    // This is a simplified example, in a real app you'd have a proper setup
    // For now, we'll assume an event with slug 'test-wedding' exists or is created externally
  });

  it('should submit an RSVP for a public wedding page', (done) => {
    chai.request(app)
      .post(`/w/${eventSlug}/rsvp`)
      .send({
        guestName: 'John Doe',
        guestEmail: 'john.doe@example.com',
        attending: true,
        guestsCount: 2,
        dietaryRequirements: 'Vegetarian',
        message: 'Looking forward to it!'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('guestName', 'John Doe');
        expect(res.body).to.have.property('attending', true);
        done();
      });
  });

  it('should not submit RSVP without guest name', (done) => {
    chai.request(app)
      .post(`/w/${eventSlug}/rsvp`)
      .send({
        guestEmail: 'jane.doe@example.com',
        attending: true,
        guestsCount: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors[0]).to.have.property('msg', 'Guest name is required');
        done();
      });
  });
});
