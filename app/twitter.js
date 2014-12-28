var express = require('express');
var Twitter = require('twitter');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {

	var client = new Twitter({
	  consumer_key: 'qSgfYT7Hgl0rEUt5189STfcfj',
	  consumer_secret: 'vmSQPHXAdEWPm9pQa3OVAF7potulHMJSMlsWAqA0BpIhJCVSjk',
	  access_token_key: '2695990926-W3mnjioFOlEsGnKf5fcMoSo27o3skWHYdc2lAc4',
	  access_token_secret: 'qktruJyZmpVdkh4aVv9Fb6eDkVPX9A2PcGPh3ytm6qSNd'
	});

  var tweetResults;
	client.get('search/tweets.json', {q: 'sephora'}, function(error, params, response){
	    if(error) throw error;
      
      tweetResults = response;
	    
      for (var i = 0; i < params.statuses.length; i++) {
	    	console.log(params.statuses[i].created_at + ' ' + params.statuses[i].text);  // The favorites.
	    	console.log('--------------------------------');
	    }
	});

  res.send('Hello World!');
});



app.use('/', routes);
app.use('/users', users);

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


