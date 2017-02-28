'use strict'

const _ = require('lodash');
const Evernote = require('evernote');
const request = require('request');

const config = require('../config');
const evernoteConsumerKey = config.getEvernoteConsumerKey();
const evernoteConsumerSecret = config.getEvernoteConsumerSecret();
const newsApiKey = config.getNewsApiKey();
const personalGreetings = config.getPersonalGreetings();
const stocks = config.getStocks();
const userProfile = config.getUserProfile();
const weatherApiKey = config.getWeatherApiKey();

// change news source as needed
const newsApiBaseUrl = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + newsApiKey;
const stocksApiBaseUrl = 'http://www.google.com/finance/info?q=';
const weatherByCityBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric' + '&appid=' + weatherApiKey + '&q=';
const evernoteCallbackUrl = "http://localhost:5000/users/evernote-oauth-callback";
const evernoteSandbox = false;


module.exports.evernoteOAuth = (req, res) => {
  const evernoteClient = new Evernote.Client({
    consumerKey: evernoteConsumerKey,
    consumerSecret: evernoteConsumerSecret,
    sandbox: evernoteSandbox,
    china: false
  });

  evernoteClient.getRequestToken(evernoteCallbackUrl, function(error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      console.log(error);
      res.end("Error - evernoteOAuth Controller");
    } else {
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;

      // redirect the user to authorize the token
      res.redirect(evernoteClient.getAuthorizeUrl(oauthToken));
    }
  });
};

module.exports.evernoteOAuthCallback = (req, res) => {
  const evernoteClient = new Evernote.Client({
    consumerKey: evernoteConsumerKey,
    consumerSecret: evernoteConsumerSecret,
    sandbox: evernoteSandbox,
    china: false
  });

  evernoteClient.getAccessToken(
    req.session.oauthToken,
    req.session.oauthTokenSecret,
    req.query.oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        console.log('error');
        console.log(error);
        res.end("Error - evernoteOAuthCallback Controller");
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        res.json(req.session);
      }
  });
};

module.exports.returnEvernoteData = (req, res) => {
  if (req.session.oauthAccessToken) {
   var token = req.session.oauthAccessToken;
   const evernoteClient = new Evernote.Client({
     token: token,
     sandbox: evernoteSandbox,
     china: false
   });
   evernoteClient.getNoteStore().listNotebooks().then((notebooks) => {
     req.session.notebooks = notebooks;
     res.json(req.session);
   }, (error) => {
     console.log(error);
     res.end("Error - returnEvernoteData Controller");
   });
 } else {
   res.json(req.session);
 }
};


module.exports.returnNews = (req, res) => {

  request(newsApiBaseUrl, function(error, response, body) {
    if (error) {
      console.log(error);
      return res.status(500).end();
    };
    body = JSON.parse(body);
    res.json(body.articles);
  });
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

    res.status(JSON.parse(body).cod).contentType("JSON").send(body);
  });
};
