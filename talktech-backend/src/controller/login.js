/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */

const { Client } = require('pg');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendConfirmationEmail } = require('../../config/mail.config');


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

/* 
const getTemplate = (name, tokenConfirm) => {
    console.log('entro getTemplate',name,tokenConfirm);
    return `
      Confirma para continuar, ${name} !
      <a href="http://localhost:3000/userconfirm/${tokenConfirm}"><button>Confirmar</button></a>
      `;
  }; */

const createUsers = async (req, res) => {
    const { email, password, name, verified, status } = req.body;
    
    const token = jwt.sign({email}, 'secret_key')
    const duplicate_user = await client.query(
      'SELECT * FROM users WHERE email_user = $1',
      [email]
    );
    const userData = duplicate_user.rows;
    console.log(name, email);
    if (userData.length === 0) {
     await client.query(
        `INSERT INTO users (email_user, password_user, name_user, verified_user, status_user,tokenup_user) VALUES ($1, $2, $3, $4, $5,$6)`,
        [email, bcrypt.hashSync(password,8), name, verified, status, token]
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
            status,
            token
          },
        },
      });/* 
      const template = getTemplate(name, token); */
  
      //* Enviar email
      await sendConfirmationEmail(email, name, token);
      
    } else {
      res.status(500).json({
        message: 'email duplicated',
      });
    }
  };
module.exports = {
    loginUser,
    createUsers
  }