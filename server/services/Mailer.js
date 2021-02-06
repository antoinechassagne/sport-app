const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL_ADDRESS,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

function sendMail(options) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({ ...options, from: process.env.APP_EMAIL_ADDRESS }, (error) => {
      if (error) return reject(error);
      return resolve();
    });
  });
}

module.exports = { sendMail };
