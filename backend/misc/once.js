const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

// set this to true only once. will create an admin user
if (false) {

  const pass = ''; // set this once, run it, then erase!
  const adminHash = bcrypt.hashSync(pass, 10);

  let user = new User({
    email: 'missiondsps@vannev.com',
    password: adminHash,
    name: 'Admin',
    isAdmin: true,
    isStaff: true,
    isStudent: false,
    isInstructor:false

  });

  user.save().then(createdUser => {
    console.log(createdUser);
  });
}

// test admin user

if (true) {
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
