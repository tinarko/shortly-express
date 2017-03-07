var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  createUser: function(params, callback) {
    var cookie = utils.hashPassword(params[1]);
    var salt = cookie.salt;
    var passwordHash = cookie.passwordHash;
    db.query('INSERT INTO users (username, password, salt) VALUES (?,?,?)', [params[0], passwordHash, salt]);
    callback(err, result);
  }
};
