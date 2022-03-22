/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const { v4 } = require('uuid');
const { Server } = require('socket.io');

const { Client } = require('pg');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const http = require('http');
const cors = require('cors');
const { sendEmail } = require('./config/mail.config');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// * This is the postgres connection to node
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
}); // ? OTRA FORMA: const client= new Client('postgres://postgres:postgres@localhost:15432/default_database')

client.connect();

/* 
  * Intento de autenticación
 io.use((socket,next)=>{
  const email=socket.handshake.auth.email;
  if(!email){
    return next(new Error("Invalid email"))
  }
  socket.email=email,
  socket.userId=
}) */

// * Socket.io to Login
io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);

  socket.on('login_user', (dataUser) => {
    client.query(
      `SELECT * FROM  users WHERE email_user = '${dataUser.email}' AND password_user = '${dataUser.password}'`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          const userData = res.rows[0];
          if(userData.verified_user === true) {
            jwt.sign(
              { email: userData.email_user, password: userData.password_user },
              'secretkey',
              (error, token) => {
                const tokenUser = {
                  token,
                  userData,
                };
                console.log(token, tokenUser);
                socket.emit('receive_token', tokenUser);
                client.query(`SELECT * FROM  contacts`, (er, response)=> {
                  console.log(response.rows);
                  socket.emit('receives_contacts', response.rows)
                })
              }
            );
          } else {
            console.log('msg_error', 'Por favor, confirme correo electrónico.');
          }          
        }
      }
    );
  });
  /*  client.query(`SELECT id_user, email_user, password_user FROM  users WHERE '${data.email}'= email_user and '${data.password}'= password_user`, (err, res)=>{
      if (err) {
          console.error(err);
      }else{
        const userData=res.rows[0];
          jwt.sign({userData},'secretkey',(error,token)=>{
           const tokenUser=({
            token,
            userData
          })
          // console.log(tokenUser);
          
        });
         //  socket.to(data.token).emit('receive_login', data);
       
      }
      client.end();
    }) */
});

function validate(email) {
  io.on('connection', () => {
   client.query(`UPDATE users SET verified_user = true WHERE email_user='${email}'`)
  });
} 

const getTemplate = (name,email) => {
    return `
      Mensajeeeee para ${name}
      <a href="http://localhost:3000"><button onclick="${validate(email)}">Confirmar</button></a>
      `
}

// * Socket.io to Register
io.on('connection', (socket) => {
  socket.on('signup_user', (data) => {
    client.query( `SELECT * FROM  users WHERE email_user = '${data.email}'`,
      async (err, res) => {
        const userData = res.rows;
        console.log('antes del if', userData.length);
        if (userData.length === 0) {
          console.log('dentro del if', userData.length);
          // * Obtener un template
          const template = getTemplate(data.name, data.email);

          //* Enviar email
          await sendEmail(data.email, 'Esto es una prueba', template);

          client.query(`INSERT INTO users (id_user, email_user, password_user, name_user, verified_user) VALUES ('${socket.id}','${data.email}', '${data.password}' ,'${data.name}', false)`
          /** 
           * TODO: preguntar para que sirve esto
            , (error, resp)=>{
            if (error) {
                console.error(error);
                return;
            }
            client.end();
            } */
          );
          socket.emit('receives_duplicate', 'Registro correcto');
        } else {
          socket.emit('receives_duplicate', 'Cuenta existente');
          console.log('fuera del INSERT',err);
        }
      }
    );
  });
});

// * Socket.io to Add new contact
io.on('connection', (socket) => {
  socket.on('add_contact', (data) => {
    console.log('Esto es dataaaaaa',data);
    client.query(
      `SELECT * FROM  users WHERE email_user = '${data.email}'`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          const dataContact = res.rows[0];
          const idContact = v4();
          client.query(`INSERT INTO contacts (id_contact, email_contact, name_contact, id_user) VALUES ('${idContact}','${dataContact.email_user}', '${dataContact.name_user}', '${data.idUser}' )`)
          console.log(data.email);
          client.query(`SELECT * FROM  contacts WHERE email_contact='${data.email}'`, (error, response)=> {
            console.log(response.rows[0]);
            socket.emit('receives_contact1', response.rows[0])
          })
          // socket.emit('receives_contact', res.rows[0])
          // console.log(res.rows[0]);
        }
      }
    )
  });
});

/* io.on('connection', (socket) => {
  client.query(`SELECT * FROM  contacts`, (error, response)=> {
    console.log(response.rows);
    socket.emit('receives_contact', response.rows)
  })
}); */


io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('join_canal', (data) => {
    socket.join(data);
    console.log('user con id: ', socket.id, ' unido al canal: ', data);
  });
  socket.on('send_message', (data) => {
    socket.to(data.canal).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('user desconectado', socket.id);
  });
});
server.listen(3001, () => {
  console.log(`Servidor inicializado`);
});
// eslint-disable-next-line no-unused-vars
/* client.query(`insert into usuarios (id, nombre) values ( ${socket.id}, 'Will' )`, (err, res)=>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    }) */

/*     pgadmin:
    image: 'dpage/pgadmin4:5.6'
    depends_on:
      - postgres
    ports:
      - 15432:80
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@pgadmin.com
      PGADMIN_DEFAULT_PASSWORD: pgadmin
      PGADMIN_LISTEN_PORT: 80
    volumes:
      - pgadmin:/var/lib/pgadmin
volumes:
  postgres:
  pgadmin:
 */

/* 
client.query('Select * from users', (err,res)=>{
  if(!err){
    console.log(res.rows);
  }else{
    console.log(err.message);
  }
   client.end();
})
 */
