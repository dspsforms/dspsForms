const sanitize = require('mongo-sanitize');
const debug = require('../constants/debug');
const emailConfig = require('../config/emailConfig');

const nodemailer = require("nodemailer");

// https://www.npmjs.com/package/request-promise
const reqPromise = require('request-promise');


module.exports = (req, res, next) => {

  let formName = null;
  try {
    console.log("emailConfig= ", emailConfig);

    if (emailConfig.emailNoEmail) {
      // do not send email
      console.log("no email sent, in accordance with emailConfig");
      return;
    }

    formName = sanitize(req.params.formName);
    console.log("formName= ", formName);

    if (formName) {
      newFormSubmittedNotification(emailConfig, formName).catch(console.error);
    }

  } catch (error) {
    res.status(401).json({ message: "email notification failed. formName=" + formName });
  }
};

// async..await is not allowed in global scope, must use a wrapper
async function newFormSubmittedNotification(emConfig, formName){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: emConfig.host ,  // "mail.authsmtp.com",
    port: emConfig.port, // 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emConfig.authUser,
      pass: emConfig.authPassword
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: emConfig.from,  // '"Mission DSPS" <missiondsps@vannev.com>', // sender address
    to: emConfig.emailEndPoint[formName] , // list of receivers, comma separated
    subject: "new form submitted for " + formName, // Subject line
    text: "A new form has been submitted for " + formName, // plain text body
    html: "A new form has been submitted for <b> " + formName +  " </b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

