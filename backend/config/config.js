module.exports = {
  RECAPTCHA_SERVER_KEY: process.env.RECAPTCHA_SERVER_KEY || '1234567890abcdefg' ,
  JWS_TOKEN_KEY: process.env.JWS_TOKEN_KEY || 'something_very_large',
  RECAPTCHA_URL: 'https://www.google.com/recaptcha/api/siteverify'
}
