/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */

const { Client } = require('pg');



const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
});

client.connect();

const addContact = async (req, res) => {
    /* const { email } = req.body;
    
    const findUser = await client.query(
      'SELECT * FROM users WHERE email_user = $1',
      [email]
    );
    const userData = findUser.rows;

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
      }); */
      /* 
      const template = getTemplate(name, token); */
  
      //* Enviar email
      // await sendConfirmationEmail(email, name, token);
      
    // } else {
      // res.status(500).json({
        // message: 'email duplicated',
      // });
    // }
  };

  /* const getContactById = (arrayIdContacts) => {
    const prueba = arrayIdContacts.forEach( async (item) => {
        const response = await client.query('SELECT * FROM contacts WHERE id_contact =$1',
        [item.id_contact]);
        console.log(response.rows);
        return response.rows[0];
    })
    return prueba;
  } */

  const getContacts = async (req, res) => {
    const idUser =  req.params.id_user;
    const response = await client.query('SELECT * FROM user_contact WHERE id_user =$1',
    [idUser]);
    const arrayIdContacts = response.rows;
    arrayIdContacts.forEach( async (item) => {
        await client.query('SELECT * FROM contacts WHERE id_contact =$1',
        [item.id_contact]);
        // if (arrayIdContacts === )
        res.status(200).json(response.rows);
    })
    

  };

  module.exports = {
      addContact,
      getContacts
  }