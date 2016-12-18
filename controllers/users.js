'use strict'

const config = require('../config');
const userProfile = config.getUserProfile();
const personalGreetings = config.getPersonalGreetings();
const stocks = config.getStocks();


module.exports.returnNews = (req, res) => {
  res.json({News: "News Headlines"});
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
