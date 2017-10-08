const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view options', { layout:'setview.ejs' });
var db;
var curSet;
MongoClient.connect('mongodb://Justin25:<password>@ds028310.mlab.com:28310/web-app-test', (err, database) => {
  if (err) throw err;
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})
app.post('/setcur', (req,res) => {
  curSet = req.body.name;
})
app.get('/open', (req, res) => {
  db.collection(curSet).find().toArray((err, result) => {
    if (err) {
      console.log(err);
    }
    res.render('setview', {quotes: result});
  })
})
app.get('/', (req, res) => {
  db.listCollections().toArray(function(err, result) {
    if (err) {
      console.log(err);
    }
    var sets = [];
    result.forEach(function(e) {
      if (e.name !== "system.indexes") {
        sets.push(e.name);
      }
    });
    sets.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
  });
    res.render('index.ejs', {cards: sets})
  });
})
app.post('/quotes', (req, res) => {
  db.collection(curSet).save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
  })
  db.collection(curSet).find().toArray((err, result) => {
    if (err) {
      console.log(err);
    }
    return res.json(result);
  })
})
app.post('/new', (req, res) => {
  db.createCollection(req.body.name);
  setTimeout(function(){
    curSet = req.body.name;
    res.redirect('/');
}, 100);
})
