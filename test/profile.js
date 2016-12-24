'use strict'

const baseURL = 'http://localhost:3000';
const profileURL = '/users'

const config = require('../config');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Profile Tests', function() {

  /*
   *Test cases
   */

  describe('GET /users', () => {
    it('response status should be 200', (done) => {
      chai.request(baseURL)
        .get(profileURL)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('dob');
          expect(res.body).to.have.property('city');
          expect(res.body).to.have.property('region');
          expect(res.body).to.have.property('country');
          expect(res.body).to.have.property('location');
          done();
        });
    });
  });
});
