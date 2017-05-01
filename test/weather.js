'use strict'

const baseURL = 'http://localhost:5000';
const weatherURL = '/users/weather';

const config = require('../config');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Weather Tests', function() {

  /*
   *Test cases
   */

  describe('GET /users/weather', () => {
    it('response status should be 200', (done) => {
      chai.request(baseURL)
        .get(weatherURL)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('main');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('sys');
          expect(res.body).to.have.property('weather');
          expect(res.body).to.have.property('wind');
          done();
        });
    });
  });
});
