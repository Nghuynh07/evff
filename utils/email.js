const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1 Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //Activate in gmail "less secure app" option
  });
  //2 Define the email options
  const mailOptions = {
    from: `Huynh Nguyen <admin@test.io>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3 Actually send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
