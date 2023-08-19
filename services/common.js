const passport = require('passport');


exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};


exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role }
}

exports.SECRET_KEY = 'SECRET_KEY'

exports.cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }

  // Saving the Specific user token for Testing purpose //

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDljYmVkMWQyOWFmZDQxMmQ5MjcyOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyMDkwMTMzfQ.qP78JfToAj4LscasYXPMSiYkLKGsL5g_8enBDIoIrSE"

  return token;
};