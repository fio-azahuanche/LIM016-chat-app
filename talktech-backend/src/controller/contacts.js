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
  const {email_contact,id_user} =  req.body;
  // existe el contacto como usuario de la aplicacion
  const contact_founded = await client.query('SELECT id_user FROM users WHERE email_user =$1',[email_contact]);
  if(contact_founded.rows.length!==0){
    const id_contact = contact_founded.rows[0].id_user;
    // si yo(con id_user) ya lo tengo como contacto
    const contact_repetido =await client.query('SELECT * FROM contact WHERE id_user=$1 AND id_contact=$2',[id_user,id_contact]);
    if(contact_repetido.rows.length===0){
      await client.query('INSERT INTO contact (id_user,id_contact) VALUES ($1,$2)',[id_user,id_contact]);
      const contact_added_recently=await client.query('SELECT name_user FROM users WHERE email_user =$1',[email_contact])
      console.log('recently',contact_added_recently.rows);
      // encontrar un canal en el que estamos juntas
      const canal_founded = await client.query(`SELECT * FROM channels WHERE integrantes = '${id_user},${id_contact}'`);
      if(canal_founded.rows.length===0){
        client.query(`INSERT INTO channels (integrantes) VALUES '${id_user},${id_contact}')`); 
      }
      res.status(200).json({
        message: 'contact added successful',
        status:200,
        body: {
            email_contact,
            name_contact:contact_added_recently.rows[0].name_user
        },
      });
    }else{
      res.status(300).json({
        message: 'contacto existente en tu lista',
        status:300
      });

    }
    
  } else {
    res.status(400).send('User no founded');
  }

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
   /*  const response = await client.query('SELECT users.id_user, email_user, name_user FROM users LEFT JOIN contact ON users.id_user = contact.id_contact WHERE contact.id_user=$1 AND users.status_user=$2',
    [idUser,'disconnect'])
    const arrayContacts = response.rows
    console.log( arrayContacts); */
    const responseContacts=await client.query("SELECT u.id_user, u.name_user,u.email_user, c.id_canal FROM users u, contact d ,channels c WHERE d.id_user=$1 AND u.id_user=d.id_contact AND c.integrantes LIKE '%'||d.id_contact||'%' AND c.integrantes LIKE '%'||d.id_user||'%'",[idUser])
    res.status(200).json(responseContacts.rows);
  };

  const getCanals = async (req, res) => {
    const idUser =  req.params.id_user;
   /*  const response = await client.query('SELECT users.id_user, email_user, name_user FROM users LEFT JOIN contact ON users.id_user = contact.id_contact WHERE contact.id_user=$1 AND users.status_user=$2',
    [idUser,'disconnect'])
    const arrayContacts = response.rows
    console.log( arrayContacts); */
    const response = await client.query(`SELECT * FROM channels WHERE integrantes LIKE '%${idUser}%'`)
    console.log(response.rows);
    res.status(200).json(response.rows);
  };
  /* const getContacts = async (req, res) => {
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
    

  }; */
  const getHistoryMsg = async (req, res) =>{
    const data = req.params.idCanal;
    const history = await client.query('SELECT * FROM history WHERE id_canal=$1', [data]);
    res.status(200).json(history.rows);
  }

  module.exports = {
      addContact,
      getContacts,
      getCanals,
      getHistoryMsg
  }