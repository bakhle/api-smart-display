'use strict'

const request = require('request');

const config = require('../config');
const newsApiKey = config.getNewsApiKey();
const personalGreetings = config.getPersonalGreetings();
const stocks = config.getStocks();
const userProfile = config.getUserProfile();

// change news source as needed
const newsApiBaseUrl = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + newsApiKey;


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
  res.json(stocks);
};


module.exports.returnUserProfile = (req, res) => {
  res.json(userProfile);
};
