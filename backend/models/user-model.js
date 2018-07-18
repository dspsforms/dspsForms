const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true ,  unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true},
  isAdmin: { type: Boolean },
  isStaff: { type: Boolean },
  isStudent: { type: Boolean },
  isInstructor: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date }
});

module.exports = mongoose.model('user', userSchema);
