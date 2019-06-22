var express = require('express');
var router = express.Router();
var db = require('../db');
var dbArrayParser = require('../utills/dbArrayParser');
let testnames = [];
let testaddresses = [];
router.get('/', function(req, res, next) {
    
    db.get().query('SELECT * FROM zipa', (err, result)=>{
      if (err) throw err;
      testnames = dbArrayParser(result, "all", ["name"]);
      testaddresses = dbArrayParser(result, "all", ["address"]);
    });
    res.render('work-in-progress', {
      title: 'Cool zipa',
      kutas: testnames,
      kutas2: testaddresses
    });
});

router.post('/send', (req, res, next)=>{
  db.get().query('INSERT INTO zipa SET ?;', {name: req.body.name, address: req.body.address}, (err, result)=>{
    if (err) throw err;
    console.log(result);
    res.redirect('/dbtest');
  })
})

module.exports = router;