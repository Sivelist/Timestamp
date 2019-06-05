// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var  bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//timestamp empty endpoint
app.get("/api/timestamp", function (req, res) {
  var currentDate = new Date(Date.now());
  var utcDate = currentDate.toUTCString();
  console.log(currentDate.toUTCString());
  var unixDate = new Date().getTime();
  res.json({unix: unixDate, utc: utcDate});
});


// time stamp endpoint
app.get("/api/timestamp/:date_string?", function (req,res){
  var date = new Date(req.params.date_string);
  
  if(date == "Invalid Date"){
    var tempUnix = req.params.date_string * 1000;
    date = new Date(tempUnix);
    if(date == "Invalid Date"){
      res.json({error : "Invalid Date"});
    }else{
    var utcDate = date.toUTCString();
    var unixDate = date.getTime()
    res.json({unix: unixDate, utc: utcDate});
    }
      }else{
        var utcDate = date.toUTCString()
        var unixDate = date.getTime()
        res.json({unix: unixDate, utc: utcDate});
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});