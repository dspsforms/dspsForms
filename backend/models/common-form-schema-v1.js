const mongoose = require('mongoose');

const commonFormSchemaV1 = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: { type: String },
  state: {type: String}
});

module.exports = commonFormSchemaV1;
