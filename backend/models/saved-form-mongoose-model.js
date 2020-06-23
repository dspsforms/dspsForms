const mongoose = require('mongoose');

const commonFormSchemaV1 = require('./common-form-schema-v1');

module.exports = mongoose.model('SavedForm', commonFormSchemaV1);

