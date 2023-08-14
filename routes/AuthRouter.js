const express = require("express");
const { createUser, loginUser, checkUser } = require("../controller/Auth");
const passport = require("passport");


const router = express.Router();

// '/products' is already added in base path //
router.post('/signup', createUser)
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/check', passport.authenticate('jwt'),async (req, res) => {
        // Now you can access the authenticated user using req.user
        if (req.user) {
          res.json({ status: 'success', user: req.user });
        } else {
          res.json({ status: 'error', message: 'User not authenticated' });
        }
      });


exports.router = router;