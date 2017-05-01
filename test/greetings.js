'use strict'

const baseURL = 'http://localhost:5000';
const greetingsURL = '/users/greetings';

const config = require('../config');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Greetings Tests', function() {

  /*
   *Test cases
   */

  describe('GET /users/greetings', () => {
    it('response status should be 200', (done) => {
      chai.request(baseURL)
        .get(greetingsURL)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});
