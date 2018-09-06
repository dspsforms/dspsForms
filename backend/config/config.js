module.exports = {
  RECAPTCHA_SERVER_KEY: process.env.RECAPTCHA_SERVER_KEY || '1234567890abcdefg',
  RECAPTCHA_URL: 'https://www.google.com/recaptcha/api/siteverify',
  JSON_WEB_TOKEN_SERVER_KEY: process.env.JSON_WEB_TOKEN_SERVER_KEY || 'something_that_should_be_larger',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/dbName',
  FIRST_TIME: process.env.FIRST_TIME || 0
}
