const mongoose = require('mongoose');

const savedFormSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: mongoose.Schema.Types.Mixed,
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: {type: String}
});

module.exports = mongoose.model('SavedForm', savedFormSchema);

