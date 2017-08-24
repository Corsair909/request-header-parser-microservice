// init project
var http = require('http');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {
  
  // get IP
  var forwardedIpsStr = req.header('x-forwarded-for');
  var ip = '';
  
  if (forwardedIpsStr) {
      ip = forwardedIpsStr.split(',')[0];  
   }
  
  // get language
  var getLang = req.headers["accept-language"];
  var lang = '';
  
  if (getLang) {
    lang = getLang.split(',')[0];
  }
  
  // get software
  var software = req.headers['user-agent'].split(') ')[0].split(' (')[1];
  
  // send data
  res.set('Content-Type', 'application/json');
  res.send({ipaddress: ip, language: lang, software: software});
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
