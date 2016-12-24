'use strict'

const _ = require('lodash');
const request = require('request');

const config = require('../config');
const newsApiKey = config.getNewsApiKey();
const personalGreetings = config.getPersonalGreetings();
const stocks = config.getStocks();
const userProfile = config.getUserProfile();
const weatherApiKey = config.getWeatherApiKey();

// change news source as needed
const newsApiBaseUrl = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + newsApiKey;
const stocksApiBaseUrl = 'http://www.google.com/finance/info?q=';
const weatherByCityBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric' + '&appid=' + weatherApiKey + '&q=';


module.exports.returnNews = (req, res) => {

  request(newsApiBaseUrl, function (error, response, body) {
    if (error) {
      console.log(error);
      return res.status(500).end();
    };
    body = JSON.parse(body);
    res.json(body.articles);
  })
};


module.exports.returnPersonalGreetings = (req, res) => {
  res.json(personalGreetings);
};


module.exports.returnStocks = (req, res) => {

  let requestUrl = stocksApiBaseUrl;

  // add all specified stocks to url
  for(let key in stocks) {
    requestUrl += stocks[key] + ',';
  };

  request(requestUrl, function (error, response, body) {
    if (error) {
      console.log(error);
      return res.status(500).end();
    };

    // returns json but 1st two chars are `//`
    // slice them off to parse the json
    body = _.trim(body);
    body = _.replace(body, '//', '' );
    body = JSON.parse(body);

    res.contentType("JSON").json(body);
  });
};


module.exports.returnUserProfile = (req, res) => {
  res.json(userProfile);
};


module.exports.returnWeatherData = (req, res) => {

  let requestUrl = weatherByCityBaseUrl;

  requestUrl += userProfile.city + ',' + userProfile.country;

  request(requestUrl, function (error, response, body) {
    if (error) {
      console.log(error);
      return res.status(500).end();
    };

    console.log(requestUrl);
    res.status(JSON.parse(body).cod).contentType("JSON").send(body);
  });
};
