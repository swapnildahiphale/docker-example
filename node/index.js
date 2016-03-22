var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();

console.log(process.env.REDIS_PORT + ':' + process.env.REDIS_ADDRESS);

APPROACH 1: Using environment variables created by Docker
var client = redis.createClient(
	process.env.REDIS_PORT,
  	process.env.REDIS_ADDRESS
);


app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    res.send('This page has been viewed ' + counter + ' times!');
  });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});
