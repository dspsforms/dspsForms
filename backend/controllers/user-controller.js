
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require("../config/config");

const User = require("../models/user-model");

/*
preventing nosql injections:

strategies:
https://stackoverflow.com/questions/13436467/javascript-nosql-injection-prevention-in-mongodb#

in general, mongoose will most likely work. but we are also adding
mongo-sanitize.

mongo-sanitize will strip out strings that start with $
see : https://github.com/vkarpov15/mongo-sanitize
*/

const sanitize = require('mongo-sanitize');

exports.addStaff = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const sanitizedEmail = sanitize(req.body.email);
    const sanitizedName = sanitize(req.body.name);
    const sanitizedIsStaff = sanitize(req.body.isStaff);
    const sanitizedIsAdmin = sanitize(req.body.isAdmin);
    const currentTime = new Date();
     // no query will be run on the password field, so no need to sanitize password before hashing
    const user = new User({
      email: sanitizedEmail,
      name: sanitizedName,
      password: hash,
      isAdmin: sanitizedIsAdmin,
      isStaff: sanitizedIsStaff,
      created: currentTime,
      lastMod: currentTime
    });
    console.log("user to be added=", user);

    /*
    res.status(200).json({
      message: "User to be added",
      result: user
    });
    */


    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User " + result.name + " added"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: "User creation failed. "
        });
      });

  });
}

exports.login = (req, res, next) => {
  console.log("in login");
  let fetchedUser;
  const sanitizedEmail = sanitize(req.body.email);
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
          userId: fetchedUser._id,
          isAdmin: fetchedUser.isAdmin,
          isStaff: fetchedUser.isStaff,
          isStudent: fetchedUser.isStudent,
          isInstructor: fetchedUser.isInstructor
        },
        config.JSON_WEB_TOKEN_SERVER_KEY,
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
}

exports.checkAndUpdatePassword = (req, res, next) => {
  console.log("in checkAndUpdatePassword");
  let fetchedUser;

  /*
  from extract-userId.js
  req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
  */
  const sanitizedUserId = sanitize(req.userData.userId);
  console.log("orig: ", req.userData.userId, "sanitized: ", sanitizedUserId);
  User.findOne({ _id: sanitizedUserId })
    .then(user => {
      if (!user) {
        console.log("no matching user for _id " + sanitizedUserId);
        return res.status(401).json({
          message: "Auth failed. Please login again and try. ",
          err: 'no user found. user may not be logged on, or login may have expired'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.oldPassword, user.password);
    }, err => {
        console.log(err);
    })
    .then(result => {

      // if the previous then failed, we have already sent client an error message
      if (!fetchedUser) {
        return null;
      }
      if (!result) {
        console.log("password match failed for user._id = ", sanitizedUserId);
        return res.status(200).json({
          message: "Auth failed.",
          err: 'The existing password you supplied did not match the one in the system.'
        });
      }

      console.log("changing password for " + sanitizedUserId);

      bcrypt.hash(req.body.newPassword, 10).then(hash => {
        //   User.update(
        //     { _id: sanitizedUserId },
        //     {
        //       $set: {
        //         password: hash,
        //         lastMod: new Date()
        //       }
        //     }
        //   ).then(status => {

        //   })
        // }

        User.findByIdAndUpdate(

          // the id of the user to find
          mongoose.Types.ObjectId(sanitizedUserId),

          // the change to be made. Mongoose will smartly combine your existing
          // document with this change, which allows for partial updates too
          // req.body,
          {
            password: hash,
            lastMod: new Date()
          },

          // an option that asks mongoose to return the updated version
          // of the document instead of the pre-updated one.
          { new: true },

          // the callback function
          (err, result) => {

            // result is an instance of User

            // Handle any possible database errors
            if (err) {
              throw (err);
            } else {
              console.log(result);
              res.status(201).json({
                message: "Password updated for " + result.name
              });
            }; // else -- no error
          } // callback of findByIdAndUpdate

        ); // findByIdAndUpdate


      }) // bcrypt then
        .catch(err => {
          console.log(err);
          return res.status(401).json({
            message: "Auth failed " + err
          });
        });

    }); // User.findOne.then()

}  // checkAndUpdatePassword

exports.list = (req, res, next) => {
  console.log("in list");

  User.find().then(userList => {
    console.log(userList);
    if (!userList) {
      return res.status(401).json({
        message: "No users could be returned"
      });
    }
    const cleanUserList = userList.map(user => {
      // deleting the property should work, no? need to debug.
      // for now, we are recreating the rest of the fields (except _v0)
      // delete user.password;
      // return user;
      return {
        _id: user._id, email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        created: user.created || null,
        lastMod: user.lastMod || null
      };
    });
    console.log("cleanUserList", cleanUserList);
    return res.status(200).json({
      message: "User List",
      users: cleanUserList

    });

  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "List failed " + err
    });
  });

}
