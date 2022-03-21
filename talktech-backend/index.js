/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const { Server } = require('socket.io');

const { Client } = require('pg');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const http = require('http');
const cors = require('cors');

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
          // ! AQUI poner condicionales para mandar mensaje de error al fronted, tal como , correo o contraseña invalidos
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
            }
          );
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

// * Socket.io to Register
io.on('connection', (socket) => {
  socket.on('signup_user', (data) => {
    client.query( `SELECT * FROM  users WHERE email_user = '${data.email}'`,
      (err, res) => {
        const userData = res.rows[0];
        if (userData === undefined) {
          client.query(`INSERT INTO users (id_user, email_user, password_user, name_user) VALUES ('${socket.id}','${data.email}', '${data.password}' ,'${data.name}')`
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
