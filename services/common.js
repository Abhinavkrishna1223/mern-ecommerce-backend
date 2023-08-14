const passport = require('passport');
 
 
 exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
  };

  


exports.sanitizeUser=(user)=>{
    return {id:user.id, role:user.role}
}

exports.SECRET_KEY = 'SECRET_KEY'