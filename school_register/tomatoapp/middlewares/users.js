var db = require('../db');
var dbArrayParser = require('../utills/dbArrayParser');
var lastLoginPeriod = require('../utills/lastLoginPeriod');

exports.userData = function(req, res, next) {
    db.get().query('SELECT * FROM users WHERE id="1";', (err, result) => {
        if (err) throw err;
        res.locals.userName = dbArrayParser(result, 1, ["name"])[0].toUpperCase();
        res.locals.userSurname = dbArrayParser(result, 1, ["surname"])[0].toUpperCase();
        res.locals.userLastLoginDate = lastLoginPeriod(dbArrayParser(result, 1, ["last_login_date"])[0]).toUpperCase();    
        res.locals.userStatus = dbArrayParser(result, 1, ["status"])[0].toUpperCase();
        next();
    });
     
}
