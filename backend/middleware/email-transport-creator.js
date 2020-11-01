const nodemailer = require("nodemailer");

module.exports = (emConfig) => {

    // create reusable transporter object using the default SMTP transport
    let transporter;
    
    if (emConfig.emailType && emConfig.emailType === 'TLS_WITH_CYPHER') {
        transporter = nodemailer.createTransport({
            host: emConfig.host,  // "mail.authsmtp.com",
            port: emConfig.port, // 465,
            // secure: true, // true for 465, false for other ports
            secureConnection: false, // TLS requires secureConnection to be false
            auth: {
                user: emConfig.authUser,
                pass: emConfig.authPassword
            },
            // https://stackoverflow.com/a/19621282
            tls: {
                ciphers: 'SSLv3'
            }
        });

    } else {
        transporter = nodemailer.createTransport({
            host: emConfig.host ,  // "mail.authsmtp.com",
            port: emConfig.port, // 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: emConfig.authUser,
              pass: emConfig.authPassword
            }
          });
    }
    
    return transporter;
}
