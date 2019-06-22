var db = require('../db');
var randomLogin = require('../utills/passwordGenerator');
var dbArrayParser = require('../utills/dbArrayParser');
var lastLoginPeriod = require('../utills/lastLoginPeriod');

exports.loadUserData = function(socket, io){
    socket.on('loadUserData', function(data) {
        let dbData = {};

        db.get().query('SELECT * FROM users WHERE login ="' + data + '";', (err, result)=>{
            if (err) throw err;
            dbData.userLogin = dbArrayParser(result, "all", ["login"])[0]
            dbData.userName = dbArrayParser(result, "all", ["name"])[0]
            dbData.userSurname = dbArrayParser(result, "all", ["surname"])[0]
            dbData.userLastLoginDate = lastLoginPeriod(dbArrayParser(result, 1, ["last_login_date"])[0])    
            dbData.userStatus = dbArrayParser(result, "all", ["status"])[0]
            dbData.userGroup = dbArrayParser(result, "all", ["group"])[0]
            dbData.userPassword = dbArrayParser(result, "all", ["password"])[0];
            dbData.userNumber = dbArrayParser(result, "all", ["number"])[0];

            io.emit('loadUserData', dbData);
        });

    });

}

exports.loadGroupElements = function(socket, io) {
    socket.on('loadGroupElements', function(data) {
        let dbData = {};

        function userGroup() {
            return new Promise(resolve => {
                db.get().query('SELECT id FROM groups WHERE name ="' + data + '";', (err, result) => {
                    console.log(result)
                    resolve(result)
                });
            });
        };

        async function test() {
            const userGroupData = await userGroup();
            return userGroupData;
        }

        test().then((userGroupData) => {
            let group = dbArrayParser(userGroupData, 1, ["id"])[0];

            db.get().query('SELECT * FROM users WHERE `group` ="' + group + '" ORDER BY number;', (err, result)=>{
                console.log(result)
                if (err) throw err;
                dbData.userLogin = dbArrayParser(result, "all", ["login"]);
                dbData.userName = dbArrayParser(result, "all", ["name"]);
                dbData.userSurname = dbArrayParser(result, "all", ["surname"]);
                dbData.userNumber = dbArrayParser(result, "all", ["number"]);

                console.log(dbData)
                io.emit('loadGroupElements', dbData);
            });
        });
    })
}

exports.addUserData = function(socket, io){
    socket.on('addUserData', function(data) {
        let dbData = { 
            login: randomLogin(8, 'login')
        };

        for (const prop in data) {
            dbData[prop] = data[prop];
        }
        
        function userGroup() {
            return new Promise(resolve => {
                db.get().query('SELECT id FROM groups WHERE name ="' + dbData.group + '";', (err, result) => {
                    resolve(result)
                });
            });
        };

        async function test() {
            const userGroupData = await userGroup();
            return userGroupData;
        }

        test().then((userGroupData) => {
            dbData.group = dbArrayParser(userGroupData, 1, ["id"])[0];

            db.get().query('INSERT INTO users SET ?;', dbData, (err, result) => {
                if (err) throw err;
                console.log(dbData)
            });
            
            io.emit('addUserData', dbData);
        });
               
    });

};

exports.editUserData = function(socket, io){
    socket.on('editUserData', function(data) {
        let dbData = {};
        for (const prop in data) {
            dbData[prop] = data[prop];
        }
        console.log(dbData);
        db.get().query('UPDATE users SET ? WHERE login = "' + data.login + '";', dbData, (err, result) => {
            if (err) throw err;
        });
        
        io.emit('editUserData', dbData);
    });

}

exports.deleteUserData = function(socket, io){
    socket.on('deleteUserData', function(data) {
        db.get().query('DELETE FROM users WHERE login = "' + data.login + '";', (err, result) => {
            if (err) throw err;
        });
        
        //io.emit('editUserData', dbData);
    });

}