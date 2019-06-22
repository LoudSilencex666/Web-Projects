var express = require('express');
var router = express.Router();
var db = require('../db');
var adminData = require('../middlewares/admin');
var adminpanelController = require('../controllers/adminpanelController');


/* GET home page. */
router.get('/', adminData.adminData, adminpanelController.adminPanel);

router.get('/user-management', adminData.adminData, adminData.adminUsersData, adminpanelController.userManagement);

router.get('/group-management', adminData.adminData, adminData.adminGroupsData, adminpanelController.groupManagement);

router.get('/subject-management', adminData.adminData, adminData.adminSubjectData, adminpanelController.subjectManagement);

router.get('/news-management', adminData.adminData, adminData.adminNewsData, adminpanelController.newsManagement);

module.exports = router;
