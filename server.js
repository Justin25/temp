// Basic required imports
var baseLink = "localhost:5000"
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//Create instance of express
var app = express();
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
MongoClient.connect('mongodb://Justin25:123456qwerty@ds028310.mlab.com:28310/web-app-test', function(err, db) {
    if (err) throw err;
    db.createCollection("test", function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
app.get('/test/*', function(req,res,next){
    res.send("Working get request");
});
app.listen(process.env.PORT || 3000, function(){
    console.log('working');
});