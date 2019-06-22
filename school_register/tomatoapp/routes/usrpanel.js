var express = require('express');
var router = express.Router();
var db = require('../db');
var userData = require('../middlewares/users');
var userpanelController = require('../controllers/userpanelController');

/* GET home page. */
router.get('/', userData.userData, userpanelController.userPanel);


module.exports = router;
