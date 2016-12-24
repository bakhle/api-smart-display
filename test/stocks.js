'use strict'

const baseURL = 'http://localhost:3000';
const stocksURL = '/users/stocks'

const config = require('../config');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Stocks Tests', function() {

  /*
   *Test cases
   */

  describe('GET /users/stocks', () => {
    it('response status should be 200', (done) => {
      chai.request(baseURL)
        .get(stocksURL)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});
