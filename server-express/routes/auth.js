const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
//never store private key 
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
const saltRounds = 10;

router.use(function(req, res, next) {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.hashedPassword = hash;
        next();
    });
});
});
//this is the router that handles the post request for register
//checks that username, password, and password conformation has ben passed, normally not done on the front end
//should be a hashed password
//new user is created if data is present
router.post("/register", async function (req, res, next) { 
    if (req.body.username && req.body.password && req.body.passwordConfirmation) {
      if (req.body.password === req.body.passwordConfirmation) {
        const user = new User({ 
          username: req.body.username,
          password: req.hashedPassword,
        });
        return await user
          .save()
          .then((savedUser) => {
             return res.status(201).json({
                id: savedUser._id,
                username: savedUser.username,
             });
          })
          .catch((error) => {
             return res.status(500).json({ error: error.message });
          });
       }
       res.status(400).json({ error: "Passwords not matching" });
    } else {
       res.status(400).json({ error: "Username or Password Missing" });
    }
  });
  //login schema
  //login endpoint expects 2 things: username and password
  //if you pass them on the mongoose user model we call find one where hte username 
  //== the passed in username
  //If we receive a result from the database, a comparison is made
  //text password is passed to bcryptand it compares the two passwords

  router.post("/login", async function (req, res, next) {
    if (req.body.username && req.body.password) {
      const user = await User.findOne()
        .where("username")
        .equals(req.body.username)
        .exec();
      if (user) {
        return bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
              if (result === true) {
                 const token = jwt.sign({ id: user._id }, privateKey, {
                    algorithm: "RS256",
                 });
                 return res.status(200).json({ access_token: token });
              } else {
                 return res.status(401).json({ error: "Invalid credentials." });
              }
          })
          .catch((error) => {
              return res.status(500).json({ error: error.message });
          });
      }
      return res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(400).json({ error: "Username or Password Missing" });
    }
  });
  

  module.exports = router;
//executes when someone issues a post request

//bcrypt is a library that enables you to salt and encrypt passwords

//what did we do
//created a user model
//auth routher that exposes 2 endpoints - register and login
//enables us to interact with the usermodel
//by creating user, reading user and making comparisons
