const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  // form: { type: String },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: {type: String}
});

/*
this doesn't work. Mongoose does't like you creating a model from a schema more
than once.

OverwriteModelError: Cannot overwrite `intakeForm` model once compiled.
*/
exports.IntakeForm = mongoose.model('intakeForm', formSchema);
exports.AltMediaRequest = mongoose.model('altMediaRequest', formSchema);
exports.ApplicationForServices = mongoose.model('applicationForServices', formSchema);
exports.EmergencyEvacInfo = mongoose.model('emergencyEvacInfo', formSchema);

exports.formMap = {};

formMap['intakeForm'] = IntakeForm;
formMap['altMediaRequest'] = AltMediaRequest;
formMap['applicationForServices'] = ApplicationForServices;
formMap['emergencyEvacInfo'] = EmergencyEvacInfo;
