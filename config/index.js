'use strict'

const config = require('./config')
const personalGreetings = require('./greetings');
const stocks = require('./stocks');
const userProfile = require('./profile');


module.exports = {
  getEvernoteConsumerKey : () => {
    return config.apiKeys.evernoteConsumerKey;
  },
  getEvernoteConsumerSecret : () => {
    return config.apiKeys.evernoteConsumerSecret;
  },
  getNewsApiKey : () => {
    return config.apiKeys.newsApiOrg;
  },
  getPersonalGreetings : () => {
    return personalGreetings;
  },
  getStocks : () => {
    return stocks;
  },
  getUserProfile : () => {
    return userProfile;
  },
  getWeatherApiKey : () => {
    return config.apiKeys.openWeatherMap;
  }
}
