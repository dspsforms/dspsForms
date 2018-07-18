const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

// set this to true only once. will create an admin user
if (true) {

  const pass = '123'; // set this once, run it, then erase!
  const adminHash = bcrypt.hashSync(pass, 10);

  const currentTime = new Date();
  let user = new User({
    email: 't2@test.com', // 'missiondsps@vannev.com',
    password: adminHash,
    name: 'staff',
    isAdmin: false,
    isStaff: true,
    isStudent: false,
    isInstructor: false,
    created: currentTime,
    lastMod: currentTime

  });

  user.save().then(createdUser => {
    console.log(createdUser);
  });
}

// test admin user

if (false) {
  const pass = ''; // set this for testing, run it, then erase!
  User.findOne({ email: 'missiondsps@vannev.com' })
    .then(user => {
      const match = bcrypt.compareSync(pass, user.password);
      console.log("match=", match);
      return match;
    }), err => {
      console.log(err);
    };
}
