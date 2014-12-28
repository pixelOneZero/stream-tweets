var express = require('express');
var Twitter = require('twitter');
var router = express.Router();

// Set authentication to access Twitter API
var client = new Twitter({
	  consumer_key: 'qSgfYT7Hgl0rEUt5189STfcfj',
	  consumer_secret: 'vmSQPHXAdEWPm9pQa3OVAF7potulHMJSMlsWAqA0BpIhJCVSjk',
	  access_token_key: '2695990926-W3mnjioFOlEsGnKf5fcMoSo27o3skWHYdc2lAc4',
	  access_token_secret: 'qktruJyZmpVdkh4aVv9Fb6eDkVPX9A2PcGPh3ytm6qSNd'
	});

// Request tweets containing 'sephora' from Twitter API
var tweetResults;
client.get('search/tweets.json', {q: 'sephora', lang: 'en'}, function(error, params, response){
  if(error) throw error;
  tweetResults = params.statuses;
});


// Get views/index.jade template, and pass it tweet json
router.get('/', function(req, res) {
  res.render('index', { title: 'Sephora Tweets', tweetResults: tweetResults });
});

module.exports = router;
