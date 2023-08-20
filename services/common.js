const passport = require('passport');


exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};


exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role }
}

exports.SECRET_KEY = 'SECRET_KEY'

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  // Saving the Specific user token for Testing purpose //
  return token;
};