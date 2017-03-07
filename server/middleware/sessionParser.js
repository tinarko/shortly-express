var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
  // create empty session
  req.session = {};

  // if REQ does NOT have shortlyid in cookie
  if (req.cookies.shortlyid === undefined) { 
  
    // create REQ session object
    req.session.hash = 'ssssfdsa';
    
    // create new SESSION: create cookie object with shortlyid object and send back in RES
    res.cookies = {};
    res.cookies.shortlyid = {};
    res.cookies.shortlyid.value = req.session.hash;

  // if REQ DOES have shortly in cookie, that means there is a prior open session
  } else {
    // set the REQ session to be the REQ shortly session hash
    req.session.hash = req.cookies.shortlyid; 

  }

  next();
};

module.exports = createSession;
