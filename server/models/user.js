var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  findUser: function(username) {
    var queryStr = 'SELECT username FROM users where username = ?';
    return db.queryAsync(queryStr, username);
  },


  createUser: function(username, password) {
    
    // Promisified code. Beautiful!
    var cookie = utils.hashPassword(password);
    var salt = cookie.salt;
    var passwordHash = cookie.passwordHash;
    //creating user in database
    return db.queryAsync('INSERT INTO users (username, password, salt) VALUES (?,?,?)', [username, passwordHash, salt]);


    // NOT promisified code... LOL!!!

    // db.query('SELECT username FROM users where username = ?', params[0], function(error, results, fields) {
    //   if (results.length === 0) {
    //     var cookie = utils.hashPassword(params[1]);
    //     var salt = cookie.salt;
    //     var passwordHash = cookie.passwordHash;
    //     db.query('INSERT INTO users (username, password, salt) VALUES (?,?,?)', [params[0], passwordHash, salt], 
    //       function(err, result) {
    //         callback(null, result);
    //       }
    //     );
    //   } else {
    //     var error = new Error('User already exists');
    //     callback(error, null);
    //   }
    // });
   
  },

  validateUser: function(params, callback) {
    //validate the user is already in database
    // if not, direct to login page
    // if yes,  retrieve salt from db and hash(password), check hashedPassword
    //          if hashedPassword is incorrect, direct to login page
    //          else create a session 
    db.query('SELECT username, salt, password FROM users where username = ?', params[0], function(error, results, fields) {
      if (results.length === 0) {
        var error = new Error('User does not exist, please sign up');
        callback(error, null);
      } else {
        var salt = results[0].salt;
        var password = params[1]; //user entered password plaintext
        var hashedPassword = utils.hashPassword(password, salt); // 
        if (hashedPassword.passwordHash === results[0].password) {
          callback(null, results);

        } else {
          var error = new Error('Password incorrect, try again');
          callback(error, null);
        }
      }
    });

  }
};
