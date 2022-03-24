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
const sendEmail = async (email, name, confirmationCode) => {
  try {
    await transporter.sendMail({
      from: `TalkTech <${mail.user}>`, // sender address
      to: email, // list of receivers
      subject: 'Confirmación de cuenta',
      html: `<h1>TalkTech</h1>
      <h2>Hola ${name}</h2>
      <p>Gracias por resgitrarte. Por favor confima tu correo haciendo click al siguiente link:</p>
      <a href=http://localhost:3000/confirm/${confirmationCode}> Click Aquí</a>
      </div>`,
    });
  } catch (error) {
    console.log('Algo no va bien con el email', error);
  }
};

module.exports = {
  sendEmail,
};
