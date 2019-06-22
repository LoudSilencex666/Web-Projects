const mysql = require('mysql');

var pool  = null;
exports.connect = function() {
  pool = mysql.createPool({
    host     : '83.15.215.203',
    port     : '3306',
    user     : 'root',
    password : 'pHT2yU6B_-NB',
    database : 'test'
  });
}
exports.get = function() {
  return pool;
}

//TWORZY USERÓW
 /* db.get().query('\
  CREATE TABLE `news` ( \
     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
     `title` VARCHAR(64) NOT NULL, \
     `content` VARCHAR(350) NOT NULL,\
     `date` DATE, \
          PRIMARY KEY (`id`), \
      UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
  )', err => {
    if(err) throw err
  });

*/