const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
//never store private key 
const privateKey = ``;
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
