
const mongoose = require('mongoose');

const commonFormSchemaV1 = require('./common-form-schema-v1');


/*
this doesn't work. Mongoose does't like you creating a model from a schema more
than once.

OverwriteModelError: Cannot overwrite `intakeForm` model once compiled.
*/
exports.IntakeForm = mongoose.model('intakeForm', commonFormSchemaV1);
exports.AltMediaRequest = mongoose.model('altMediaRequest', commonFormSchemaV1);
exports.ApplicationForServices = mongoose.model('applicationForServices', commonFormSchemaV1);
exports.EmergencyEvacInfo = mongoose.model('emergencyEvacInfo', commonFormSchemaV1);

exports.formMap = {};

formMap['intakeForm'] = IntakeForm;
formMap['altMediaRequest'] = AltMediaRequest;
formMap['applicationForServices'] = ApplicationForServices;
formMap['emergencyEvacInfo'] = EmergencyEvacInfo;
