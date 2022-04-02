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

const isVerifiedPassword = (password, passwordReceived) => {
  return bcrypt.compare(password, passwordReceived) 
    /* function (err, result) {
    if (result === false) {
      respuestaBycrypt= false;
      return result

    } 
    let payload = {subject: user._id};
    let token = jwt.sign(payload, 'secretKey'); 
    res.status(200).send({message:'iguales'});
    respuestaBycrypt= true
    console.log('son iguales by bcrypt',respuestaBycrypt);
    return result */
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userLogged = await client.query(
      'SELECT * FROM users WHERE email_user = $1',
      [email]
    );
     const userData = userLogged.rows[0];
    console.log('este es userData del login',userData);
     

     const resultCompare = await isVerifiedPassword(password,userData.password_user);
     console.log('este es el resutado de passwords',resultCompare);
    if (userData.verified_user === true && resultCompare===true  && userData.email_user===email){
        console.log('entro al if del login');
        jwt.sign({ email, password },'secretkey',
            (error, token) => {
              const dataUser = {
                token,
                email: userData.email_user,
                name: userData.name_user,
                id: userData.id_user,
                imgProfile:userData.img_profile
              }
              res.status(200).json({message:'receive_token', dataUser});
              client.query('UPDATE users SET status_user=$1 WHERE email_user=$2',
              ['connect',email])
            });


    } else{
      console.log('entro al else de login');
        res.status(401).json({message: "Pending Account. Please Verify Your Email!",});
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
    const { email, password, name, verified, status ,imgProfile} = req.body;
    
    const token = jwt.sign({email}, 'secret_key')
    const duplicate_user = await client.query(
      'SELECT * FROM users WHERE email_user = $1',
      [email]
    );
    const userData = duplicate_user.rows;
    console.log(name, email);
    if (userData.length === 0) {
     await client.query(
        `INSERT INTO users (email_user, password_user, name_user, verified_user, status_user,tokenup_user, img_profile) VALUES ($1, $2, $3, $4, $5,$6,$7)`,
        [email, bcrypt.hashSync(password,8), name, verified, status, token,imgProfile]
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
            token,
            imgProfile
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