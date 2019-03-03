const config = require('./config');

const emailConfig = {};

const emailEndPoint = {};
emailEndPoint['intakeForm'] = config.EMAIL_SENDER_INTAKE;
emailEndPoint['applicationForServices'] = config.EMAIL_SENDER_INTAKE;
emailEndPoint['formAgreement'] = config.EMAIL_SENDER_INTAKE;
emailEndPoint['altMediaRequest'] = config.EMAIL_SENDER_ALT_MEDIA;
emailEndPoint['emergencyEvacInfo' ] = config.EMAIL_SENDER_INTAKE;
emailEndPoint['feedback'] = config.EMAIL_SENDER_FEEDBACK;
emailEndPoint['complaint'] = config.EMAIL_SENDER_COMPLAINT;
emailEndPoint['historyOfDisability'] = config.EMAIL_SENDER_INTAKE;

emailConfig['emailEndPoint'] = emailEndPoint;

emailConfig['from'] = '"Mission DSPS" <missiondsps@vannev.com>'; // sender address

emailConfig['host'] = config.EMAIL_HOST;
emailConfig['port'] = config.EMAIL_PORT;
emailConfig['authUser'] = config.EMAIL_AUTH_USER;
emailConfig['authPassword'] = config.EMAIL_AUTH_PASS;

emailConfig['emailNoEmail'] = config.EMAIL_NO_EMAIL;


module.exports = emailConfig;
