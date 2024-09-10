require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nodemailer = require("nodemailer");


 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.K_EMAIL,
    pass: process.env.K_E_PASS,
  },
});

transporter.verify()
  .then(() => {
    console.log('Ready to send emails');
  })
  .catch((error) => {
    console.error('Error verifying transporter:', error);
  });

module.exports = { transporter };