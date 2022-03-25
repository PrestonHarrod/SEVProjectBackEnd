// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNum = process.env.TWILIO_PHONE_NUMBER;
const serviceEmail = process.env.SERVICE_EMAIL;
const emailToken = process.env.EMAIL_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.findAll = (req, res) => {
  if (req.contactPref == "Phone") {
    client.messages
      .create({
        body: 'Tutor Session Scheduled',
        from: phoneNum,
        to: req.body.phoneNumber
      })
      .then(message => console.log(message.sid));
  }
  else {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: serviceEmail,
        pass: emailToken,
      },
    });

    var mailOptions = {
      from: "octutorservice@gmail.com",
      to: req.body.email,
      subject: "Tutor Session Scheduled",
      text: "",
    };


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}