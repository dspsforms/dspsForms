const mongoose = require('mongoose');

const historyOfDisabilitySchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: { type: String },
  state: {type: String}
});

module.exports = mongoose.model('historyOfDisability', historyOfDisabilitySchema);
