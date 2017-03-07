var parseCookies = function(req, res, next) {

  var cookies = req.headers.cookie;

  
  if (cookies !== undefined) {
    var cookieArray = cookies.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookieArray.length; i++) {
      var currCookie = cookieArray[i].trim().split('=');
      cookieObj[currCookie[0]] = currCookie[1]; 
    }
    req.cookies = cookieObj;
  } else {
    req.cookies = {};
  }

  next();
};

module.exports = parseCookies;