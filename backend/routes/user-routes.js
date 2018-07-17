const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const router = express.Router();

/*
preventing nosql injections:

strategies:
https://stackoverflow.com/questions/13436467/javascript-nosql-injection-prevention-in-mongodb#

in general, mongoose will most likely work. but we are also adding
mongo-sanitize.

mongo-sanitize will strip out strings that start with $
see : https://github.com/vkarpov15/mongo-sanitize
*/

const sanitze = require('mongo-sanitize');

// post /api/user/addstaff
router.post("/addstaff", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const sanitizedEmail = sanitze(req.body.email);
    console.log("orig: ", req.body.email, "sanitized: ", sanitizedEmail);
    // no query will be run on the password field, so no need to sanitize password before hashing
    const user = new User({
      email: sanitizedEmail,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User added",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

// post /api/user/login
router.post("/login", (req, res, next) => {
  console.log("in login");
  let fetchedUser;
  const sanitizedEmail = sanitze(req.body.email);
  console.log("orig: ", req.body.email, "sanitized: ", sanitizedEmail);
  User.findOne({ email: sanitizedEmail })
    .then(user => {
      if (!user) {
        console.log("no matching user for email " + sanitizedEmail);
        return res.status(401).json({
          message: "Auth failed. Please check the email address you submitted"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      // if the previous then failed, we have already sent client an error message
      if (!fetchedUser) {
        return null;
      }
      if (!result) {
        console.log("password match failed for email " + sanitizedEmail);
        return res.status(401).json({
          message: "Auth failed. Please check your password."
        });
      }

      console.log("new login from " + sanitizedEmail);
      // fetchedUser's email was sanitized before it was entered into db
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      // we are sending back the isAdmin/isStaff etc info, but if client uses these,
      // they will be re verified at the server. i.e., the info is for efficient client side
      // UI, but will be double checked.
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        isAdmin: fetchedUser.isAdmin,
        isStaff: fetchedUser.isStaff,
        isStudent: fetchedUser.isStudent,
        isInstructor: fetchedUser.isInstructor
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed " + err
      });
    });
});

module.exports = router;
