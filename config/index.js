'use strict'

const userProfile = require('./profile');
const personalGreetings = require('./greetings');
const stocks = require('./stocks');


module.exports = {
  getPersonalGreetings : function () {
    return personalGreetings;
  },
  getStocks : function () {
    return stocks;
  },
  getUserProfile : function () {
    return userProfile;
  }
}
