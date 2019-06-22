var db = require('../db');
var dbArrayParser = require('../utills/dbArrayParser');
var lastLoginPeriod = require('../utills/lastLoginPeriod');
var password = require('../utills/passwordGenerator');

function adminDataQuering() {
    return new Promise(resolve => {
        db.get().query('SELECT * FROM admin;', (err, result) => {
            resolve(result)
        });
    });
};

function newsDataQuering() {
    return new Promise(resolve => {
        db.get().query('SELECT * FROM news;', (err, result) => {
            resolve(result)
        });
    });
};

function usersDataQuering() {
    return new Promise(resolve => {
        db.get().query('SELECT * FROM users WHERE `group` = 1 ORDER BY number;', (err, result)=>{
            resolve(result)
        });
    });
};

function groupsDataQuering() {
    return new Promise(resolve => {
        db.get().query('SELECT * FROM groups;', (err, result)=>{
            resolve(result)
        });
    });
};

exports.adminData = function(req, res, next) {
    async function adminDataAsync() {
        const adminData = await adminDataQuering();
        const newsData = await newsDataQuering();
        const dataObj = {adminData : adminData, newsData: newsData};
        return dataObj;
    };

    adminDataAsync().then((dataObj) => {
        res.locals.adminName = dbArrayParser(dataObj.adminData, 1, ["name"])[0];
        res.locals.adminSurname = dbArrayParser(dataObj.adminData, 1, ["surname"])[0];
        res.locals.adminLastLoginDate = lastLoginPeriod(dbArrayParser(dataObj.adminData, 1, ["last_login_date"])[0]);    
        res.locals.adminStatus = dbArrayParser(dataObj.adminData, 1, ["status"])[0];

        res.locals.newsTitle = dbArrayParser(dataObj.newsData, "all", ["title"]).reverse();
        res.locals.newsTitle.splice(6, res.locals.newsTitle.length-6);
        res.locals.newsContent = dbArrayParser(dataObj.newsData, "all", ["content"]).reverse();
        res.locals.newsDate = dbArrayParser(dataObj.newsData, "all", ["date"]).reverse();

        next();
    });
     
}

exports.adminUsersData = function(req, res, next) {
    async function adminUsersDataAsync() {
        const usersData = await usersDataQuering();
        const groupsData = await groupsDataQuering();
        const dataObj = {usersData : usersData, groupsData: groupsData};
        return dataObj;
    };

    adminUsersDataAsync().then((dataObj) => {
        res.locals.login = dbArrayParser(dataObj.usersData, "all", ["login"]);
        res.locals.userName = dbArrayParser(dataObj.usersData, "all", ["name"]);
        res.locals.userSurname = dbArrayParser(dataObj.usersData, "all", ["surname"]);
        res.locals.userLastLoginDate = lastLoginPeriod(dbArrayParser(dataObj.usersData, "all", ["last_login_date"]));    
        res.locals.userStatus = dbArrayParser(dataObj.usersData, "all", ["status"]);
        res.locals.userGroup = dbArrayParser(dataObj.usersData, "all", ["group"]);
        res.locals.userPassword = dbArrayParser(dataObj.usersData, "all", ["password"]);
        res.locals.userNumber = dbArrayParser(dataObj.usersData, "all", ["number"]);
        res.locals.userId = [];
        
        for(let i = 0; i < res.locals.userName.length; i++) {
            res.locals.userId[i] = {name : res.locals.userName[i] + ' ' + res.locals.userSurname[i], login : res.locals.login[i], number : res.locals.userNumber[i]};
        } 
        
        res.locals.groupName = dbArrayParser(dataObj.groupsData, "all", ["name"]);

        next();
    });

}

exports.adminGroupsData = function(req, res, next) {
    async function adminGroupDataAsync() {
        const groupsData = await groupsDataQuering();
        const dataObj = {groupsData: groupsData};
        return dataObj;
    };

    adminGroupDataAsync().then((dataObj) => {
        res.locals.groupId = dbArrayParser(dataObj.groupsData, "all", ["Id"]);
        res.locals.groupName = dbArrayParser(dataObj.groupsData, "all", ["name"]);

        next();
    });   
}

exports.adminSubjectData = function(req, res, next) {
    res.locals.groupName = 'XD';
    next();    
}

exports.adminNewsData = function(req, res, next) {
    res.locals.groupName = 'XD';
    next();    
}