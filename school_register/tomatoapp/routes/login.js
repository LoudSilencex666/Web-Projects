var express = require('express');
var db = require('../db');
var dbArrayParser = require('../utills/dbArrayParser');

var router = express.Router();

let admin;

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('login', {
    title: 'School Register',
    layout: 'login-layout'});
});

router.post('/', function(req, res, next) {
  db.get().query('SELECT * FROM admin', (err, outcome) => {
    if (err) {
      throw err;
    }
    admin = dbArrayParser(outcome);
  });

  if (/*req.body.user_login === admin[1] && req.body.user_password === admin[2] */ 1>0) {
    req.session.authenticated = true;
    res.redirect('/adminpanel');
  } else {
    res.redirect('/');
  }
  
});


module.exports = router;
