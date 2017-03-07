var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  createUser: function(params, callback) {

    db.query('SELECT username FROM users where username = ?', params[0], function(error, results, fields) {
      if (results.length === 0) {
        var cookie = utils.hashPassword(params[1]);
        var salt = cookie.salt;
        var passwordHash = cookie.passwordHash;
        db.query('INSERT INTO users (username, password, salt) VALUES (?,?,?)', [params[0], passwordHash, salt], function(err, result) {
          callback(null, result);
        });
      } else {
        var error = new Error('user already exists');
        callback(error, null);
      }

    });

    // db.queryAsync for when we use promisify
   
  }
};
