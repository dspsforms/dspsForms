module.exports = {
  RECAPTCHA_SERVER_KEY: process.env.RECAPTCHA_SERVER_KEY || '1234567890abcdefg',
  RECAPTCHA_URL: 'https://www.google.com/recaptcha/api/siteverify',
  JSON_WEB_TOKEN_SERVER_KEY: process.env.JSON_WEB_TOKEN_SERVER_KEY || 'something_that_should_be_larger',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/dbName',
  FIRST_TIME: process.env.FIRST_TIME || 0,

  EMAIL_SENDER_INTAKE: process.env.EMAIL_SENDER_INTAKE || '',
  EMAIL_SENDER_ALT_MEDIA: process.env.EMAIL_SENDER_ALT_MEDIA || '',
  EMAIL_SENDER_FEEDBACK: process.env.EMAIL_SENDER_FEEDBACK || '',
  EMAIL_SENDER_COMPLAINT: process.env.EMAIL_SENDER_COMPLAINT || '',
  EMAIL_HOST: process.env.EMAIL_HOST || '',
  EMAIL_PORT: process.env.EMAIL_PORT || 0,
  EMAIL_SENDER: process.env.EMAIL_SENDER || '',
  EMAIL_REPLYTO: process.env.EMAIL_REPLYTO || '',
  EMAIL_TYPE: process.env.EMAIL_TYPE || '',
  EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER || '',
  EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS || '',
  EMAIL_NO_EMAIL: process.env.EMAIL_NO_EMAIL || 0,

  RECAPTCHA_BYPASS: process.env.RECAPTCHA_BYPASS || 0
}
// hard wired email notification end points
