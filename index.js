const express = require("express");
const mongoose = require("mongoose");


const server = express();
const cors = require("cors")
const port = 8080 || process.env.PORT;
const passport = require("passport");
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



// Routes //
const productRouters = require("./routes/Products");
const categoryRouters = require("./routes/CategoryRoute");
const brandRouters = require("./routes/BrandsRoute");
const authRouters = require("./routes/AuthRouter");
const userRouters = require("./routes/UserRoute");
const cartRouters = require("./routes/CartRouter");
const { User } = require("./model/userSchema");
const { isAuth, sanitizeUser, SECRET_KEY } = require("./services/common");





//middlewares
server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

server.use(passport.authenticate('session'));

server.use(cors({
  exposedHeaders: ['X-Total-Count'] //It is used to expose the headers in cross origin to get total count of Products for pagination //
}));
server.use(passport.session())
server.use(express.json()); // --> To parse req.body //
server.use('/products',productRouters.router); // We also use JWt token 
server.use('/categories', categoryRouters.router);
server.use('/brands', brandRouters.router);
server.use('/auth', authRouters.router);
server.use('/users', userRouters.router);
server.use('/cart', cartRouters.router);




var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email:email }).exec()

      if (!user) {  
        return done(null, false, { message: 'invalid credentials(Email)' }); // for safety
      }

      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',async function (err, hashedPassword) {

        if(!crypto.timingSafeEqual( user.password,hashedPassword)){

          return done(null, false,{ message: 'invalid credentials' })
         
         }

         const token = jwt.sign(sanitizeUser(user), SECRET_KEY)

         return done(null,token); // this data sends to serialize //
    })

    } catch (err) {
      done(err);
    }
  })
);

// JWt Strategy //

passport.use('jwt', new JwtStrategy(opts, async function(jwt_payload, done) {

  console.log({jwt_payload, msg:"data aa gya"});

  try {
    const user = await User.findById(jwt_payload.id)
      if (user) {
          return done(null, sanitizeUser(user));
      } else {
          return done(null, false);
          // or you could create a new account
      }
  } catch (error) {
    return done(err, false);
  }

  
}))

// This creates a session variable req.user on being called //


passport.serializeUser(function (user, cb) {
  console.log('serialize', user);
  process.nextTick(function () {
    return cb(null, { id:user.id, role:user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log('de-serialize', user);
  process.nextTick(function () {
    return cb(null, user);
  });
});




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log("Database connected successfully");
}


server.get("/", (req, res) => {
  res.json({ status: "success" })
})




server.listen(port, () => {
  console.log("Server 8080 started successfully");
})