'use strict'

const _ = require('lodash');
const request = require('request');

const config = require('../config');
const newsApiKey = config.getNewsApiKey();
const personalGreetings = config.getPersonalGreetings();
const stocks = config.getStocks();
const userProfile = config.getUserProfile();

// change news source as needed
const newsApiBaseUrl = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + newsApiKey;
const stocksApiBaseUrl = 'http://www.google.com/finance/info?q=';


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
  })
};


module.exports.returnUserProfile = (req, res) => {
  res.json(userProfile);
};
