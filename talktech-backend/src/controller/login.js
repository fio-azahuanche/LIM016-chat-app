/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const { sendEmail } = require('../config/mail.config');

const { Client } = require('pg');
const jwt = require("jsonwebtoken");

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
});

client.connect();

const loginUser = async (req, res) => {
    const { email, password, verified } = req.body;
    if (verified === true){
        jwt.sign({ email, password },'secretkey',
            (error, token) => {
              const tokenUser = {
                token,
                email,
                password
              }
              res.send('receive_token', tokenUser);
            });
    } else{
        res.status(401).send({message: "Pending Account. Please Verify Your Email!",});
    }

};


const getTemplate = (name, email) => {
    console.log('entro getTemplate',name,email);
    return `
      Confirma para continuar, ${name} !
      <a href="http://localhost:3000"><button>Confirmar</button></a>
      `;
  };

const createUsers = async (req, res) => {
    const { email, password, name, verified, status } = req.body;
    const duplicate_user = await client.query(
      'SELECT * FROM users WHERE email_user = $1',
      [email]
    );
    const userData = duplicate_user.rows;
    console.log(name, email);
    if (userData.length === 0) {
      const template = getTemplate(name, email);
  
      //* Enviar email
      await sendEmail(email, 'Bienvenido a talktech', template);
      await client.query(
        `INSERT INTO users (email_user, password_user, name_user, verified_user, status_user) VALUES ($1, $2, $3, $4, $5)`,
        [email, password, name, verified, status]
      );
      res.status(200).json({
        message: 'user added successful',
        status:200,
        body: {
          user: {
            email,
            password,
            name,
            verified,
          },
        },
      });
    } else {
      res.status(202).json({
        message: 'email duplicated',
      });
    }
  };
module.exports = {
    loginUser,
    createUsers
  }