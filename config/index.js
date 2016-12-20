'use strict'

const config = require('./config')
const personalGreetings = require('./greetings');
const stocks = require('./stocks');
const userProfile = require('./profile');


module.exports = {
  getNewsApiKey : function () {
    return config.apiKeys.newsApiOrg;
  },
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
