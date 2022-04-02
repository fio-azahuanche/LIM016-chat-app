/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */

const { Client } = require('pg');

const client = new Client({
  host: 'default-database.ccbljtzwelwv.us-east-1.rds.amazonaws.com',
  user: 'adminlab',
  port: 5432,
  database: 'default-database',
  password: 'pgadmin123',
});

client.connect();

const addContact = async (req, res) => {

  const {email_contact,id_user} =  req.body;
  const contact_founded = await client.query('SELECT id_user FROM users WHERE email_user =$1 AND verified_user=true',[email_contact]);// existe el contacto como usuario de la aplicacion

  if(contact_founded.rows.length!==0){
    
    const id_contact = contact_founded.rows[0].id_user;
    const contact_repetido =await client.query('SELECT * FROM contact WHERE id_user=$1 AND id_contact=$2',[id_user,id_contact]);// si yo(con id_user) ya lo tengo como contacto

    if(contact_repetido.rows.length===0){

      await client.query('INSERT INTO contact (id_user,id_contact) VALUES ($1,$2)',[id_user,id_contact]);
      const contact_added_recently=await client.query('SELECT name_user FROM users WHERE email_user =$1',[email_contact])
      console.log('recently',contact_added_recently.rows);
      // encontrar un canal en el que estamos juntas
      const individualChat = await client.query(`SELECT * FROM channels WHERE integrantes @> ARRAY[${id_user},${id_contact}] AND active_group=false`);
      
      if(individualChat.rows.length===0){
        client.query(`INSERT INTO channels (integrantes, active_group) VALUES (ARRAY[${id_user},${id_contact}],false)`); 
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

  };

  const addChannel = async (req, res) => {
    const {nameChannel, members} = req.body;
    const channelExist = await client.query('SELECT * FROM channels WHERE name_channel=$1',[nameChannel]);
    if(channelExist.rows.length===0){
      await client.query('INSERT INTO channels(name_channel,integrantes,active_group) VALUES ($1,$2,true)',[nameChannel,members]);
      res.status(200).send('Added group channel')
    }else{
      res.status(300).send('Channel exist')
    }
  }



  const getContacts = async (req, res) => {
    const idUser =  req.params.id_user;
    const responseContacts=await client.query("SELECT u.id_user, u.name_user,u.email_user, c.id_channel FROM users u, contact d ,channels c WHERE d.id_user=$1 AND u.id_user=d.id_contact AND c.integrantes @> ARRAY[d.id_contact, d.id_user]",[idUser])
    res.status(200).json(responseContacts.rows);
  };




  /**/
  const getPrivateChannel = async (req, res) => {
    const idUser =  req.params.id_user;
    const response = await client.query(`SELECT * FROM channels WHERE integrantes @> ARRAY[${idUser}] AND active_group=false`)
    console.log(response.rows);
    res.status(200).json(response.rows);
  };


  const getGroupChannels = async (req, res) => {
    const idUser =  req.params.id_user;
    const response = await client.query(`SELECT * FROM channels WHERE integrantes @> ARRAY[${idUser}] AND active_group=true`)
    console.log(response.rows);
    res.status(200).json(response.rows);
  }
  /**/



  const getHistoryMsg = async (req, res) =>{
    const id_canal = req.params.idCanal;
    const history = await client.query("SELECT h.id_history,h.message_history,h.date_history at time zone 'utc' ,u.name_user as name_author ,h.id_author FROM history h, users u WHERE h.id_author=u.id_user AND h.id_channel=$1 ORDER BY date_history", [id_canal]);
    console.log('historyyy',history.rows);
    res.status(200).json(history.rows);
  }

  module.exports = {
      addContact,
      getContacts,
      getPrivateChannel,
      getGroupChannels,
      getHistoryMsg,
      addChannel
  }