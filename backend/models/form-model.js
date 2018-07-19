const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  // form: { type: String },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date }
});

module.exports = mongoose.model('form', formSchema);
