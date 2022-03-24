const nodemailer = require('nodemailer');

const mail = {
  user: 'talktech.labo@gmail.com',
  pass: 'talktechLim016',
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
});
const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `TalkTech <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject,
      text: 'Holis, veamos si funciona', // plain text body
      html,
    });
  } catch (error) {
    console.log('Algo no va bien con el email', error);
  }
};

module.exports = {
  sendEmail,
};
