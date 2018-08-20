const sanitize = require('mongo-sanitize');
const debug = require('../constants/debug');
const config = require('../config/config');

// https://www.npmjs.com/package/request-promise
const reqPromise = require('request-promise');


module.exports = (req, res, next) => {
  try {
    console.log("verify-captchav3: req.body", req.body);
    console.log("config= ", config);
    console.log("debug= ", debug);
    const reCaptchaV3Token = req.body.reCaptchaV3Token;
    if (reCaptchaV3Token) {
      // get score for this token

      const options = {
        uri: config.RECAPTCHA_URL,
        qs: {
          'secret': config.RECAPTCHA_SERVER_KEY,
          'response' : reCaptchaV3Token
          // 'remoteip': remoteIP // optional
        },
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
      };

      reqPromise(options).then(response => {

        /*
        format:
          {
            success: true,
            challenge_ts: '2018-08-19T22:16:55Z',
            hostname: 'localhost',
            score: 0.1,
            action: 'applicationForServices'
          }
        */

        if (debug.RECAPTCHA_V3) {
          console.log('verify-captcha-v3: response', response);
        }

        let score;
        if (response.success && response.score) {
          score = parseFloat(response.score);
        }

        // if score is a number
        if (score && !isNaN(score)) {
          req.body.captchaScore = score;
          next();
        }
        else {
          res.status(401).json({ message: "verifying reCaptcha V3 failed. " + JSON.stringify(response) });
        }

      })
      .catch(function (err) {
        console.log("recaptcha score failed", err);
        res.status(401).json({ message: "verifying reCaptcha V3 failed" });
      });

    } else {
      res.status(401).json({ message: "no reCaptcha V3 token. verifying reCaptcha V3 failed." });
    }

  } catch (error) {
    res.status(401).json({ message: "verifying reCaptcha V3 failed." });
  }
};

