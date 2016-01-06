var express = require('express');
var bodyParser = require('body-parser');
var FitbitClient = require('../src/index');

var app = express();

var clientId = '227HS8';
var clientSecret = '7b7ff41f5bafc532ebc7593c26743777';

var client = new FitbitClient(clientId, clientSecret);
var redirect_uri = 'http://localhost:3000/callback';

app.use(bodyParser());

app.get('/auth/fitbit', function(req, res) {

  var auth_url = client.getAuthorizationUrl('http://localhost:3000/callback', [ 'activity','profile', 'sleep', 'heartrate'], '', {expires_in: 2592000});

  res.redirect(auth_url);

});

app.get('/callback', function(req, res, next) {

  client.getToken(req.query.code, redirect_uri)
    .then(function(token) {

      // ... save your token on session or db ...

      // then redirect
      //res.redirect(302, '/user');

      res.send(token);

    })
    .catch(function(err) {
      // something went wrong.
      res.send(500, err);

    });

});

app.listen(3000);
