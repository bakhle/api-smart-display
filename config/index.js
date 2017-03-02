'use strict'

const config = require('./config')
const personalGreetings = require('./greetings');
const stocks = require('./stocks');
const todos = require('./todos');
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
  getTodos : function () {
    return todos;
  },
  getUserProfile : function () {
    return userProfile;
  },
  getWeatherApiKey : function () {
    return config.apiKeys.openWeatherMap;
  }
}
