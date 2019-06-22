const mysql = require('mysql');

var pool  = null;
exports.connect = function() {

  // there should go environmental variables
  pool = mysql.createPool({
    host     : 'env host',
    port     : 'env port',
    user     : 'env db user',
    password : 'env db user pass',
    database : 'env db name'
  });
}
exports.get = function() {
  return pool;
}

// Creating users
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